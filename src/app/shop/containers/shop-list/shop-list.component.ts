import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  HostListener,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { throttle } from 'lodash';
import { Subscription, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { MatDialog } from '@angular/material';

import * as fromRoot from 'src/app/@store';
import * as fromShop from 'src/app/shop/@store';
import * as fromAuth from 'src/app/auth/@store';
import * as fromLayout from 'src/app/@store/layout';
import { SiteItemsModel } from 'src/app/shared/models';
import { ConfirmDialogComponent } from 'src/app/shared/components';

import { ProductModel } from '../../models/product.model';
import { FilterModel } from '../../models/filter.model';
import { ShopFilterSidebarComponent } from '../../components/shop-filter-sidebar/shop-filter-sidebar.component';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss'],
})
export class ShopListComponent implements AfterViewInit, OnDestroy {
  @ViewChild('itemsContainer', { static: false }) itemsContainer: ElementRef<HTMLDivElement>;

  @ViewChild(ShopFilterSidebarComponent, { static: false }) shopFilterSidebarComponent: ShopFilterSidebarComponent;

  public page = 1;

  public pageLimit = 12;

  public totalPages = 0;

  public windowWidthSub: Subscription;

  public isLoading$: Observable<boolean>;

  public siteItems$: Observable<SiteItemsModel[]>;

  public siteItemsCategories$: Observable<any>;

  public hasNoItems$: Observable<boolean>;

  public isChatOpened$: Observable<boolean>;

  public isLoggedIn$: Observable<boolean>;

  public filters: FilterModel = {
    sortBy: 'value',
    sortDir: 'desc',
    search: '',
    mKey: '',
    pKey: '',
    sKey: '',
    priceFrom: '',
    priceTo: '',
  };

  updatePageLimit: () => void;

  constructor(
    private store: Store<fromRoot.State>,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {
    this.updatePageLimit = throttle(this._updatePageLimit, 300);
    this.isLoading$ = this.store.pipe(select(fromShop.selectLoading));
    this.siteItems$ = this.store.pipe(select(fromShop.selectItems));
    this.siteItemsCategories$ = this.store.pipe(select(fromShop.selectCategories));
    this.hasNoItems$ = this.store.pipe(select(fromShop.selectHasNoItems));
    this.isLoggedIn$ = this.store.pipe(select(fromAuth.selectIsLoggedIn));
    this.isChatOpened$ = this.store.pipe(select(fromLayout.selectChatOpened));
    this.store.pipe(select(fromShop.selectTotal))
      .subscribe((total: number) => {
        this.totalPages = Math.ceil(total / this.pageLimit);
      });
  }

  ngAfterViewInit() {
    this.windowWidthSub = this.store
      .pipe(select(fromRoot.selectWindowSize))
      .subscribe((size: any) => {
        this.updatePageLimit();
      });
  }

  ngOnDestroy() {
    this.windowWidthSub.unsubscribe();
  }

  public buyItem(item: ProductModel): void {
    const dlgRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Buy item',
        message: `Do you want to buy ${item.name}?`,
        confirmButton: 'Buy',
        cancelButton: 'Cancel'
      }
    });

    dlgRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new fromShop.BuyItem(item._id));
      }
    });
  }

  public changePage(page: number): void {
    this.page = page;
    this.loadItems();
  }

  public filtersChanges(filter: FilterModel): void {
    if (this.shopFilterSidebarComponent && filter.typeFilter) {
      this.shopFilterSidebarComponent.clearSubCategories(filter.typeFilter);
      filter.typeFilter = '';
    }

    console.log(filter);
    console.log('123========');
    this.filters = Object.assign({}, filter);

    this.changePage(1);
  }

  public deleteAllFilter(): void {
    this.filters = {
      ...this.filters,
      mKey: '',
      pKey: '',
      sKey: '',
      priceFrom: '',
      priceTo: ''
    };

    if (this.shopFilterSidebarComponent) {
      this.shopFilterSidebarComponent.clearSubCategories('mKey');
    }

    this.changePage(1);
  }

  public updateFilters(filters: FilterModel): void {
    this.page = 1;
    this.filters = filters;
    this.loadItems();
  }

  private loadItems(): void {
    this.store.dispatch(new fromShop.LoadItems({
      pagination: {
        limit: this.pageLimit,
        offset: this.page - 1
      },
      filters: {
        orderDir: this.filters.sortDir,
        orderBy: this.filters.sortBy,
      },
      sidebarFilters: {
        mKey: this.filters.mKey,
        pKey: this.filters.pKey,
        sKey: this.filters.sKey,
        priceFrom: this.filters.priceFrom,
        priceTo: this.filters.priceTo,
      },
      search: this.filters.search
    }));
    this.cdr.detectChanges();
  }

  private _updatePageLimit(): void {
    const container = this.itemsContainer.nativeElement;
    if (container) {
      const countPerRow = Math.floor((container.clientWidth + 16) / 211);
      const pageLimit = Math.max(2, countPerRow) * 4;

      if (this.pageLimit !== pageLimit) {
        this.pageLimit = pageLimit;
        this.loadItems();
      }
    }
  }
}

