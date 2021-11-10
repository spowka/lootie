import {
  Component,
  OnInit,
  Inject,
  OnDestroy,
  ViewChild,
  ElementRef,
  Renderer2,
  AfterViewInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material';

import { Observable, Subject } from 'rxjs';
import { takeUntil, take, skip } from 'rxjs/operators';

import { select, Store } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromAuth from 'src/app/auth/@store';
import * as fromWithdraw from 'src/app/withdraw/@store/withdraw';
import * as fromLayout from 'src/app/@store/layout';

import { InventoryItemsModel, SiteItemsModel, Pagination, Filters } from 'src/app/shared/models';
import { User } from 'src/app/auth/models/user-profile';
import { CaseFilters } from 'src/app/cases/models';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dialog-withdraw-add-items',
  templateUrl: './dialog-withdraw-add-items.component.html',
  styleUrls: ['./dialog-withdraw-add-items.component.scss'],
})
export class DialogWithdrawAddItemsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('wrapper', { static: false }) wrapper: ElementRef;

  public inventoryItems: InventoryItemsModel[] = [];

  public selectedItems: InventoryItemsModel[] = [];

  public selectedItemsIds: string[] = [];

  public pagination: Pagination;
  public filters: Filters;
  public search: string;
  public isScrollDisabled = false;

  public isSelectAllSelected = false;

  public theme$: Observable<string>;

  public isLoading$: Observable<boolean>;

  public isMobile$: Observable<boolean>;

  public isLandscape$: Observable<boolean>;

  private _inventoryItems$: Observable<InventoryItemsModel[]>;

  private _user$: Observable<User>;

  private unsubscribe$: Subject<void> = new Subject();
  static show(dialog: MatDialog, selectedItems: InventoryItemsModel[]): any {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'added-dialog-container';
    dialogConfig.height = 'auto';
    dialogConfig.data = selectedItems;

    return dialog.open(DialogWithdrawAddItemsComponent, dialogConfig);
  }

  constructor(
    private store: Store<fromRoot.State>,
    public dialogRef: MatDialogRef<DialogWithdrawAddItemsComponent>,
    private renderer: Renderer2,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this._inventoryItems$ = this.store.pipe(select(fromWithdraw.selectInventoryItems));
    this.isLoading$ = this.store.pipe(select(fromWithdraw.selectIsLoading));
    this._user$ = this.store.pipe(select(fromAuth.selectUser));
    this.isLandscape$ = this.store.pipe(select(fromLayout.selectIsLandscape));
    this.isMobile$ = this.store.pipe(select(fromLayout.selectIsMobile));

    if (data && data.length) {
      this.selectedItems = [...data];
      this.selectedItemsIds = data.map((item) => item._id);
    }

    this.pagination = { limit: 15, offset: 0 };
    this.filters = { orderBy: 'value', orderDir: 'desc' };
    this.loadInventoryItems();

    this._inventoryItems$
      .pipe(skip(1), takeUntil(this.unsubscribe$))
      .subscribe((inventoryItems) => {
        inventoryItems.map((item) => {
          this.inventoryItems = this.inventoryItems.filter(
            (inventoryItem) => inventoryItem._id !== item._id
          );
          this.inventoryItems.push(item);
        });

        this.inventoryItems.some((item) => {
          if (!this.selectedItemsIds.includes(item._id)) {
            this.isSelectAllSelected = false;
            return true;
          }
        });

        this.isScrollDisabled = false;
      });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.subscribeToThemeChange();
  }

  close() {
    this.dialogRef.close();
  }

  addToSelectedItems(item: SiteItemsModel): void {
    const inventoryItem = this.inventoryItems.find((inventory) => {
      return inventory.item === item;
    });
    this.selectedItems = [inventoryItem];
    this.selectedItemsIds = [inventoryItem._id];
  }

  removeFromSelectedItems(item: SiteItemsModel): void {
    const inventoryItem = this.inventoryItems.find((inventory) => inventory.item === item);
    this.selectedItems = this.selectedItems.filter(
      (inventory) => inventory._id !== inventoryItem._id
    );
    this.selectedItemsIds = this.selectedItemsIds.filter((id) => id !== inventoryItem._id);

    if (this.isSelectAllSelected) {
      this.isSelectAllSelected = false;
    }
  }

  selectItems(): void {
    const feePayload = [];
    this.selectedItems.forEach((v) => {
      if (v.item.availableVariants.length === 1) {
        feePayload.push({
          id: v._id,
          siteItemId: v.item._id,
          variantId: v.item.availableVariants[0]._id,
        });
      }
    });

    if (feePayload.length) {
      this.store.dispatch(new fromWithdraw.GetAdditionalFee(feePayload));
    }

    this.dialogRef.close(this.selectedItems);
  }

  onFiltersChange(filter: CaseFilters): void {
    if (filter.sort) {
      this.filters = {
        orderBy: 'value',
        orderDir: filter.sort === 'Low' ? 'asc' : 'desc',
      };
    }

    if (filter.search !== undefined) {
      this.search = filter.search;
    }

    this.pagination = { limit: 15, offset: 0 };
    this.inventoryItems = [];
    this.isScrollDisabled = true;
    this.loadInventoryItems();
  }

  onScroll() {
    this.pagination = {
      limit: this.pagination.limit,
      offset: this.pagination.offset + 1,
    };

    this.loadInventoryItems();
  }

  loadInventoryItems(): void {
    this._user$.pipe(take(1)).subscribe((user) => {
      this.store.dispatch(
        new fromWithdraw.LoadInventoryItems({
          user: user._id,
          pagination: this.pagination,
          filters: this.filters,
          search: this.search,
        })
      );
    });
  }

  subscribeToThemeChange() {
    this.theme$ = this.store.pipe(select(fromRoot.selectTheme));

    this.theme$.pipe(takeUntil(this.unsubscribe$)).subscribe((theme: string) => {
      if (this.wrapper.nativeElement.classList.contains('dialog-wrapper__dark')) {
        this.renderer.removeClass(this.wrapper.nativeElement, 'dialog-wrapper__dark');
      }
      if (this.wrapper.nativeElement.classList.contains('dialog-wrapper__light')) {
        this.renderer.removeClass(this.wrapper.nativeElement, 'dialog-wrapper__light');
      }
      if (theme === 'light') {
        this.renderer.addClass(this.wrapper.nativeElement, 'dialog-wrapper__light');
        return;
      }
      this.renderer.addClass(this.wrapper.nativeElement, 'dialog-wrapper__dark');
    });
  }

  ngOnDestroy() {
    this.store.dispatch(new fromWithdraw.CloseAddWithdrawModal());
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
