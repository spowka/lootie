import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FilterTypes, FilterModel } from '../../models/filter.model';
import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromShop from 'src/app/shop/@store';

@Component({
  selector: 'app-shop-filter-sidebar',
  templateUrl: './shop-filter-sidebar.component.html',
  styleUrls: ['./shop-filter-sidebar.component.scss'],
})
export class ShopFilterSidebarComponent implements OnInit {
  @Input() sidebarFilters: FilterModel;

  @Output() filtersChange: EventEmitter<any> = new EventEmitter<any>();

  public filters: any;

  public sidebarTypes = FilterTypes;

  public objectKeys = Object.keys;

  public subCategories: { title: string, data: string[] }[] = [];

  public subItemsCategories: string[] = [];

  constructor(
    private store: Store<fromRoot.State>,
  ) {
    this.store.dispatch(new fromShop.LoadCategories());

    this.store.pipe(select(fromShop.selectCategories))
      .subscribe((response: any) => {
        this.filters = response;
      });
  }

  ngOnInit() {}

  public selectFilterItem(filter, k: string): void {
    this.filtersChange.emit({
      ...this.sidebarFilters,
      [k]: filter
    });
  }

  public selectedSubCategories(value: string, filters: any, k: string): void {
    if (this.sidebarFilters[k] !== value) {
      this.sidebarFilters = {
        ...this.sidebarFilters,
        pKey: '',
        sKey: ''
      };

      this.subCategories = [];
      this.subItemsCategories = [];

      for (const key of Object.keys(filters)) {
        this.subCategories.push({ title: key, data: filters[key] });
      }

      this.selectFilterItem(value, k);
    }
  }

  public selectedSubItems(filter: { title: string, data: string[] }, k: string): void {
    if (this.sidebarFilters[k] !== filter.title) {
      this.sidebarFilters = {
        ...this.sidebarFilters,
        sKey: ''
      };
    }

    this.subItemsCategories = filter.data;
    this.selectFilterItem(filter.title, k);
  }

  public getFilterState(value: string, key: string): boolean {
    if (
      this.sidebarFilters &&
      this.sidebarFilters[key] &&
      this.sidebarFilters[key] === value
    ) {
      return true;
    }
    return false;
  }

  public clearSubCategories(key: string): void {
    switch (key) {
      case 'mKey':
        this.subCategories = [];
        this.subItemsCategories = [];
        break;
      case 'pKey':
        this.subItemsCategories = [];
        break;
      default:
        break;
    }
  }
}
