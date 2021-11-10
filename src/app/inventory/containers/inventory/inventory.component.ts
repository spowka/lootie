import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromAuth from 'src/app/auth/@store';
import * as fromLayout from 'src/app/@store/layout';
import * as fromRouter from 'src/app/@store/router';
import * as fromInventory from 'src/app/inventory/@store/inventory';

import { User } from 'src/app/auth/models/user-profile';
import {
  Pagination,
  Filters,
  InventoryItemsModel,
  SiteItemsModel
} from 'src/app/shared/models';
import { takeUntil, take, skip } from 'rxjs/operators';
import { CaseFilters } from 'src/app/cases/models';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit, OnDestroy {
  public isMobile$: Observable<boolean>;

  public inventoryItems: InventoryItemsModel[] = [];

  public selectedItems: InventoryItemsModel[] = [];

  public selectedItemsIds: string[] = [];

  public selectedItemsTotal = 0;

  public pagination: Pagination;
  public filters: Filters;
  public search: string;
  public initialLimit: number;
  public isScrollDisabled = false;

  public isSelectAllSelected = false;

  public theme$: Observable<string>;

  public isLoading$: Observable<boolean>;

  private _inventoryItems$: Observable<InventoryItemsModel[]>;

  private _user$: Observable<User>;

  currentUrl$: Observable<string>;

  private sellProcess = false;

  private totalSelected = 0;

  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private store: Store<fromRoot.State>,
    private titleService: Title
  ) {
    this._user$ = this.store.pipe(select(fromAuth.selectUser));
    this._inventoryItems$ = this.store.pipe(
      select(fromInventory.selectInventoryItems)
    );
    this.isLoading$ = this.store.pipe(select(fromInventory.selectLoading));
    this.isMobile$ = this.store.pipe(select(fromLayout.selectIsMobile));
    this.currentUrl$ = this.store.pipe(select(fromRoot.selectgetActiveUrl));

    this.pagination = { limit: 28, offset: 0 };
    this.initialLimit = 28;

    this.titleService.setTitle('My Inventory | Open Mystery Boxes at Lootie');

    const height = window.innerHeight;
    const width = window.innerWidth;
    if (width <= 1680 && width > 1440) {
      this.initialLimit = this.pagination.limit = 24;
    } else if (width <= 1440 && width > 1310) {
      this.initialLimit = this.pagination.limit = 20;
    } else if (width <= 1310 && width > 763) {
      this.initialLimit = this.pagination.limit = 16;
    } else if (width <= 763 && width > 587) {
      this.initialLimit = this.pagination.limit = 12;
    } else if (width <= 587 && width > 320) {
      this.initialLimit = this.pagination.limit = 8;
    }

    if (height >= 1100) {
      this.initialLimit = this.pagination.limit *= 2;
    }

    this.filters = { orderBy: 'value', orderDir: 'desc' };
    this.loadInventoryItems();

    this._inventoryItems$
      .pipe(skip(1), takeUntil(this.unsubscribe$))
      .subscribe(inventoryItems => {
        inventoryItems.map(item => {
          this.inventoryItems = this.inventoryItems.filter(
            inventoryItem => inventoryItem._id !== item._id
          );
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

    this.isLoading$.subscribe((isLoading: any) => {
      if (!isLoading.sell && this.sellProcess) {
        this.selectedItemsIds.map(id => {
          this.inventoryItems.splice(
            this.inventoryItems.findIndex(_item => _item._id === id),
            1
          );
        });
        this.selectedItems = [];
        this.selectedItemsIds = [];
        this.selectedItemsTotal = 0;
        this.sellProcess = false;
      }
    });
  }

  ngOnInit() { }

  sell(): void {
    if (!this.selectedItems.length) {
      return;
    }

    this.sellProcess = true;
    this.store.dispatch(new fromInventory.SellItem(this.selectedItems));
  }

  addToSelectedItems(item: SiteItemsModel): void {
    const inventoryItem = this.inventoryItems.find(inventory => {
      return inventory.item === item;
    });
    this.selectedItems = [...this.selectedItems, inventoryItem];
    this.selectedItemsIds = [...this.selectedItemsIds, inventoryItem._id];
    this.totalSelected += Math.round((item.value) * 100) / 100;
    this.selectedItemsTotal = +(this.selectedItemsTotal + item.value).toFixed(
      2
    );
    if (this.selectedItems.length === this.inventoryItems.length) {
      this.isSelectAllSelected = true;
    }
  }

  removeFromSelectedItems(item): void {
    const inventoryItem = this.inventoryItems.find(
      inventory => inventory.item === item
    );
    this.selectedItems = this.selectedItems.filter(
      inventory => inventory._id !== inventoryItem._id
    );
    this.selectedItemsIds = this.selectedItemsIds.filter(
      id => id !== inventoryItem._id
    );
    this.totalSelected -= Math.round(item.value * 100) / 100;
    this.selectedItemsTotal = +(this.selectedItemsTotal - item.value).toFixed(
      2
    );
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
      this.selectedItems = [
        ...this.selectedItems,
        ...this.inventoryItems.filter(inventory => {
          return !this.selectedItems.find(item => item._id === inventory._id);
        })
      ];
      this.selectedItemsIds = [
        ...this.selectedItemsIds,
        ...this.inventoryItems.map(item => item._id)
      ];
      this.selectedItemsTotal = +this.selectedItems
        .reduce((a, b) => a + (b.item.value || 0), 0)
        .toFixed(2);

      this.loadInventoryItems();
      return;
    }

    this.isSelectAllSelected = false;
    this.inventoryItems.map(inventoryItem => {
      this.selectedItems = this.selectedItems.filter(
        inventory => inventory._id !== inventoryItem._id
      );
      this.selectedItemsIds = this.selectedItemsIds.filter(
        id => id !== inventoryItem._id
      );
    });
    this.selectedItemsTotal = +this.selectedItems
      .reduce((a, b) => a + (b.item.value || 0), 0)
      .toFixed(2);
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
    this.inventoryItems = [];
    this.isScrollDisabled = true;
    this.loadInventoryItems();
  }

  onScroll() {
    setTimeout(() => {
      this.pagination = {
        limit: this.pagination.limit,
        offset: this.pagination.offset + 1
      };

      this.loadInventoryItems();
    }, 400);
  }

  loadInventoryItems(): void {
    this._user$.pipe(take(1)).subscribe(user => {
      this.store.dispatch(
        new fromInventory.LoadInventoryItems({
          user: user._id,
          pagination: this.pagination,
          filters: this.filters,
          search: this.search
        })
      );
    });
  }

  goBack(): void {
    this.store.dispatch(new fromRouter.Back());
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
