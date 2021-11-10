import { Component, OnInit, Inject, OnDestroy, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material';

import { Observable, Subject } from 'rxjs';
import { takeUntil, map, take, skip } from 'rxjs/operators';

import { select, Store } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromAuth from 'src/app/auth/@store';
import * as fromUpgrade from 'src/app/upgrade/@store/upgrade';
import * as fromLayout from 'src/app/@store/layout';

import { InventoryItemsModel, SiteItemsModel, Pagination, Filters } from 'src/app/shared/models';
import { CaseFilters } from 'src/app/cases/models';
import { User } from 'src/app/auth/models';

@Component({
  selector: 'app-dialog-inventory',
  templateUrl: './dialog-inventory.component.html',
  styleUrls: ['./dialog-inventory.component.scss']
})
export class DialogInventoryComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('wrapper', { static: false }) wrapper: ElementRef;

  public inventoryItems: InventoryItemsModel[] = [];

  public selectedItems: InventoryItemsModel[] = [];

  public selectedItemsIds: string[] = [];

  public selectedItemsTotal = 0;

  public selectedSiteItemsTotal = 0;

  public pagination: Pagination;
  public filters: Filters;
  public search: string;
  public initialLimit: number;
  public isScrollDisabled = false;

  public isSelectAllSelected = false;

  public theme$: Observable<string>;

  public isLoading$: Observable<boolean>;

  public isMobile$: Observable<boolean>;

  public isLandscape$: Observable<boolean>;

  private _inventoryItems$: Observable<InventoryItemsModel[]>;

  private _selectedSiteItems$: Observable<SiteItemsModel[]>;

  private _user$: Observable<User>;

  private unsubscribe$: Subject<void> = new Subject();

  static show(dialog: MatDialog): any {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'added-dialog-container';
    dialogConfig.height = 'auto';

    return dialog.open(DialogInventoryComponent, dialogConfig);
  }

  constructor(
    private store: Store<fromRoot.State>,
    public dialogRef: MatDialogRef<DialogInventoryComponent>,
    private renderer: Renderer2,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this._inventoryItems$ = this.store.pipe(select(fromUpgrade.selectInventoryItems));
    this._selectedSiteItems$ = this.store.pipe(select(fromUpgrade.selectSelectedSiteItems));
    this.isLoading$ = this.store.pipe(select(fromUpgrade.selectIsLoading));
    this._user$ = this.store.pipe(select(fromAuth.selectUser));
    this.isLandscape$ = this.store.pipe(select(fromLayout.selectIsLandscape));
    this.isMobile$ = this.store.pipe(select(fromLayout.selectIsMobile));

    this.pagination = { limit: 20, offset: 0 };
    this.initialLimit = 20;

    const width = window.innerWidth;
    if (width <= 1137 && width > 924) {
      this.initialLimit = this.pagination.limit = 16;
    } else if (width <= 924 && width > 712) {
      this.initialLimit = this.pagination.limit = 12;
    } else if (width <= 712) {
      this.initialLimit = this.pagination.limit = 8;
    }

    this.filters = { orderBy: 'value', orderDir: 'desc' };
    this.loadInventoryItems();

    this._inventoryItems$.pipe(skip(1), takeUntil(this.unsubscribe$)).subscribe(inventoryItems => {
      inventoryItems.map((item) => {
        this.inventoryItems = this.inventoryItems.filter(inventoryItem => inventoryItem._id !== item._id);
        this.inventoryItems.push(item);
      });

      this.inventoryItems.some(item => {
        if (!this.selectedItemsIds.includes(item._id)) {
          this.isSelectAllSelected = false;
          return true;
        }
      });

      this.isScrollDisabled = false;
    });

    this._selectedSiteItems$.pipe(takeUntil(this.unsubscribe$)).subscribe((siteItems: SiteItemsModel[]) => {
      this.selectedSiteItemsTotal = 0;
      siteItems.map(item => {
        this.selectedSiteItemsTotal += item.value;
      });
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.subscribeToThemeChange();
  }

  close() {
    this.dialogRef.close(!!this.selectedItems.length);
  }

  addToSelectedItems(item: SiteItemsModel): void {
    const inventoryItem = this.inventoryItems.find(inventory => {
      return inventory.item === item;
    });
    this.selectedItems = [...this.selectedItems, inventoryItem];
    this.selectedItemsIds = [...this.selectedItemsIds, inventoryItem._id];
    this.selectedItemsTotal = +(this.selectedItemsTotal + item.value).toFixed(2);
  }

  removeFromSelectedItems(item: SiteItemsModel): void {
    const inventoryItem = this.inventoryItems.find(inventory => inventory.item === item);
    this.selectedItems = this.selectedItems.filter(inventory => inventory._id !== inventoryItem._id);
    this.selectedItemsIds = this.selectedItemsIds.filter(id => id !== inventoryItem._id);
    this.selectedItemsTotal = +(this.selectedItemsTotal - item.value).toFixed(2);

    if (this.isSelectAllSelected) {
      this.isSelectAllSelected = false;
    }
  }

  selectAllItems(isChecked: boolean): void {
    if (!this.inventoryItems.length) {
      return;
    }

    if (isChecked) {
      this.isSelectAllSelected = true;
      this.selectedItems = [...this.selectedItems, ...this.inventoryItems.filter(inventory => {
        return !(this.selectedItems.find(item => item._id === inventory._id));
      })];
      this.selectedItemsIds = [...this.selectedItemsIds, ...this.inventoryItems.map(item => item._id)];
      this.selectedItemsTotal = +(this.selectedItems.reduce((a, b) => a + (b.item.value || 0), 0)).toFixed(2);
      return;
    }

    this.isSelectAllSelected = false;
    this.inventoryItems.map(inventoryItem => {
      this.selectedItems = this.selectedItems.filter(inventory => inventory._id !== inventoryItem._id);
      this.selectedItemsIds = this.selectedItemsIds.filter(id => id !== inventoryItem._id);
    });
    this.selectedItemsTotal = +(this.selectedItems.reduce((a, b) => a + (b.item.value || 0), 0)).toFixed(2);
  }

  selectItems(): void {
    this.close();
    this.store.dispatch(new fromUpgrade.SelectInventoryItems(this.selectedItems));
  }

  onFiltersChange(filter: CaseFilters): void {
    if (filter.sort) {
      this.filters = { orderBy: 'value', orderDir: filter.sort === 'Low' ? 'asc' : 'desc' };
    }

    if (filter.search !== undefined) {
      this.search = filter.search;
    }

    this.pagination = { limit: this.initialLimit, offset: 0 };
    this.inventoryItems = [];
    this.isScrollDisabled = true;
    this.loadInventoryItems();
  }

  onScroll() {
    this.pagination = { limit: this.initialLimit, offset: this.pagination.offset + 1 };

    this.loadInventoryItems();
  }

  loadInventoryItems(): void {
    this._user$.pipe(take(1)).subscribe(user => {
      this.store.dispatch(new fromUpgrade.LoadInventoryItems({
        user: user._id,
        pagination: this.pagination,
        filters: this.filters,
        search: this.search,
      }));
    });
  }

  subscribeToThemeChange() {
    this.theme$ = this.store.pipe(select(fromRoot.selectTheme));

    this.theme$.pipe(takeUntil(this.unsubscribe$))
      .subscribe((theme: string) => {
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
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
