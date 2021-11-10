import {
  Component,
  OnInit,
  Inject,
  OnDestroy,
  ViewChild,
  ElementRef,
  Renderer2,
  AfterViewInit
} from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig
} from '@angular/material';

import { Observable, Subject } from 'rxjs';
import { takeUntil, map, skip } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { select, Store } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromLayout from 'src/app/@store/layout';
import * as fromUpgrade from 'src/app/upgrade/@store/upgrade';

import {
  InventoryItemsModel,
  SiteItemsModel,
  Pagination,
  Filters
} from 'src/app/shared/models';
import { CaseFilters } from 'src/app/cases/models';

@Component({
  selector: 'app-dialog-site-items',
  templateUrl: './dialog-site-items.component.html',
  styleUrls: ['./dialog-site-items.component.scss']
})
export class DialogSiteItemsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('wrapper', { static: false }) wrapper: ElementRef;

  public siteItems: SiteItemsModel[] = [];

  public selectedItems: SiteItemsModel[] = [];

  public selectedItemsIds: string[] = [];

  public selectedItemsTotal = 0;

  public selectedInventoryItemsTotal = 0;

  public pagination: Pagination;
  public filters: Filters;
  public search: string;
  public initialLimit: number;
  public isScrollDisabled = false;

  public isSelectAllSelected = false;

  public theme$: Observable<string>;

  public isLoading$: Observable<boolean>;

  public isMobile$: Observable<boolean>;

  public _siteItems$: Observable<SiteItemsModel[]>;

  private _selectedInventoryItems$: Observable<InventoryItemsModel[]>;

  private unsubscribe$: Subject<void> = new Subject();

  static show(dialog: MatDialog): any {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'added-dialog-container';
    dialogConfig.height = 'auto';

    return dialog.open(DialogSiteItemsComponent, dialogConfig);
  }

  constructor(
    private store: Store<fromRoot.State>,
    public dialogRef: MatDialogRef<DialogSiteItemsComponent>,
    private renderer: Renderer2,
    private toast: ToastrService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this._siteItems$ = this.store.pipe(select(fromUpgrade.selectSiteItems));
    this._selectedInventoryItems$ = this.store.pipe(
      select(fromUpgrade.selectSelectedInventoryItems)
    );
    this.isLoading$ = this.store.pipe(select(fromUpgrade.selectIsLoading));
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
    this.loadSiteItems();

    this._siteItems$
      .pipe(skip(1), takeUntil(this.unsubscribe$))
      .subscribe(inventoryItems => {
        inventoryItems.map(item => {
          this.siteItems = this.siteItems.filter(siteItem => siteItem !== item);
          this.siteItems.push(item);
        });

        this.siteItems.some(item => {
          if (!this.selectedItemsIds.includes(item._id)) {
            this.isSelectAllSelected = false;
            return true;
          }
        });

        this.isScrollDisabled = false;
      });

    this._selectedInventoryItems$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((inventoryItems: InventoryItemsModel[]) => {
        this.selectedInventoryItemsTotal = 0;
        inventoryItems.map(inventory => {
          this.selectedInventoryItemsTotal += inventory.item.value;
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
    this.selectedItemsIds = [...this.selectedItemsIds, item._id];
    this.selectedItems = [...this.selectedItems, item];
    this.selectedItemsTotal = +(this.selectedItemsTotal + item.value).toFixed(
      2
    );
  }

  removeFromSelectedItems(item: SiteItemsModel): void {
    this.selectedItems = this.selectedItems.filter(
      selectedItem => selectedItem !== item
    );
    this.selectedItemsIds = this.selectedItemsIds.filter(id => id !== item._id);
    this.selectedItemsTotal = +(this.selectedItemsTotal - item.value).toFixed(
      2
    );

    if (this.isSelectAllSelected) {
      this.isSelectAllSelected = false;
    }
  }

  selectAllItems(isChecked: boolean): void {
    if (!this.siteItems.length) {
      return;
    }

    if (isChecked) {
      this.isSelectAllSelected = true;
      this.selectedItems = [
        ...this.selectedItems,
        ...this.siteItems.filter(_item => {
          return !this.selectedItems.find(item => item._id === _item._id);
        })
      ];
      this.selectedItemsIds = [
        ...this.selectedItemsIds,
        ...this.siteItems.map(item => item._id)
      ];
      this.selectedItemsTotal = +this.siteItems
        .reduce((a, b) => a + (b.value || 0), 0)
        .toFixed(2);
      return;
    }

    this.isSelectAllSelected = false;

    this.siteItems.map(item => {
      this.selectedItems = this.selectedItems.filter(
        _item => _item._id !== item._id
      );
      this.selectedItemsIds = this.selectedItemsIds.filter(
        id => id !== item._id
      );
    });
    this.selectedItemsTotal = +this.selectedItems
      .reduce((a, b) => a + (b.value || 0), 0)
      .toFixed(2);
  }

  selectItems(): void {
    if (this.selectedInventoryItemsTotal * 1.01 > this.selectedItemsTotal) {
      return;
    }

    this.close();
    this.store.dispatch(new fromUpgrade.SelectSiteItems(this.selectedItems));
  }

  onFiltersChange(filter: CaseFilters): void {
    if (filter.sort) {
      this.filters = {
        orderBy: 'value',
        orderDir: filter.sort === 'Low' ? 'asc' : 'desc'
      };
    }

    if (filter.search !== undefined) {
      this.search = filter.search;
    }

    this.pagination = { limit: this.initialLimit, offset: 0 };
    this.siteItems = [];
    this.isScrollDisabled = true;
    this.loadSiteItems();
  }

  public onScroll() {
    this.pagination = {
      limit: this.initialLimit,
      offset: this.pagination.offset + 1
    };

    this.loadSiteItems();
  }

  loadSiteItems(): void {
    this.store.dispatch(
      new fromUpgrade.LoadSiteItems({
        pagination: this.pagination,
        filters: this.filters,
        search: this.search
      })
    );
  }

  subscribeToThemeChange() {
    this.theme$ = this.store.pipe(select(fromRoot.selectTheme));

    this.theme$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((theme: string) => {
        if (
          this.wrapper.nativeElement.classList.contains('dialog-wrapper__dark')
        ) {
          this.renderer.removeClass(
            this.wrapper.nativeElement,
            'dialog-wrapper__dark'
          );
        }
        if (
          this.wrapper.nativeElement.classList.contains('dialog-wrapper__light')
        ) {
          this.renderer.removeClass(
            this.wrapper.nativeElement,
            'dialog-wrapper__light'
          );
        }
        if (theme === 'light') {
          this.renderer.addClass(
            this.wrapper.nativeElement,
            'dialog-wrapper__light'
          );
          return;
        }
        this.renderer.addClass(
          this.wrapper.nativeElement,
          'dialog-wrapper__dark'
        );
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
