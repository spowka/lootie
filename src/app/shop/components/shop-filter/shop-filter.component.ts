import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { SortBy } from 'src/app/shared/models';

import { SortOptionModel } from '../../models/sort-option.model';
import { FilterModel } from '../../models/filter.model';

@Component({
  selector: 'app-shop-filter',
  templateUrl: './shop-filter.component.html',
  styleUrls: ['./shop-filter.component.scss'],
})
export class ShopFilterComponent implements OnInit {
  @Input() set filters(value: FilterModel) {
    this._filters = value;
  }
  @Output() filtersChange: EventEmitter<FilterModel> = new EventEmitter<FilterModel>();

  @Output() sidebarFiltersChange: EventEmitter<FilterModel> = new EventEmitter<FilterModel>();

  readonly sortOptions: SortOptionModel[] = [
    {
      value: 'price_high',
      label: 'Price High',
      description: '',
      sortBy: 'value',
      sortDir: 'desc',
    },
    {
      value: 'price_low',
      label: 'Price Low',
      description: '',
      sortBy: 'value',
      sortDir: 'asc',
    },
  ];

  filterExpanded = false;
  filterSidebarExpanded = false;
  _filters: FilterModel = {
    sortBy: 'value',
    sortDir: 'desc',
    search: '',
  };

  constructor() {}

  ngOnInit() {}

  get currentSort() {
    return (
      this.sortOptions.find(
        (opt) =>
          opt.sortBy === this._filters.sortBy &&
          opt.sortDir === this._filters.sortDir
      ) || { value: '', label: '' }
    );
  }

  toggleFilter(filter: string, filterClose: string, expanded: boolean) {
    this[filter] = expanded;
    this[filterClose] = false;
  }

  updateSort(sort: string) {
    const sortOption = this.sortOptions.find((opt) => opt.value === sort);
    this._filters.sortBy = sortOption.sortBy;
    this._filters.sortDir = sortOption.sortDir;
    this.filterExpanded = false;
    this.filtersChange.emit(this._filters);
  }

  updateSearch(search: string) {
    this._filters.search = search;
    this.filtersChange.emit(this._filters);
  }

  public filtersChanges(event): void {
    this.sidebarFiltersChange.emit(event);
  }

  public getSelectedFilters(): number {
    let value = 0;
    const keys = ['mKey', 'pKey', 'sKey', 'priceFrom', 'priceTo'];

    keys.forEach(k => {
      if (this._filters[k]) {
        value++;
      }
    });

    return value;
  }
}
