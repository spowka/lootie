import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { FilterModel } from '../../models/filter.model';

@Component({
  selector: 'app-shop-filter-header',
  templateUrl: './shop-filter-header.component.html',
  styleUrls: ['./shop-filter-header.component.scss'],
})
export class ShopFilterHeaderComponent implements OnInit, OnChanges {
  @Input() sidebarFilters: FilterModel;

  @Output() deleteFilter: EventEmitter<FilterModel> = new EventEmitter<FilterModel>();

  @Output() deleteAllFilters: EventEmitter<void> = new EventEmitter<void>();

  public filters: FilterModel;

  public objectKeys = Object.keys;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sidebarFilters'].currentValue) {
      const changesFilters = changes['sidebarFilters'].currentValue;

      this.filters = {
        mKey: changesFilters.mKey,
        pKey: changesFilters.pKey,
        sKey: changesFilters.sKey,
        priceFrom: changesFilters.priceFrom,
        priceTo: changesFilters.priceTo,
      };
    }
  }

  public deleteFilterItem(key: string): void {
    switch (key) {
      case 'mKey':
        this.filters = { ...this.filters, mKey: '', pKey: '', sKey: '' };
        break;
      case 'pKey':
        this.filters = { ...this.filters, pKey: '', sKey: '' };
        break;
      case 'sKey':
        this.filters = { ...this.filters, sKey: '' };
        break;
      default:
        break;
    }

    this.deleteFilter.emit({
      ...this.sidebarFilters,
      ...this.filters,
      typeFilter: key
    });
  }

  public deleteAllSidebarFilters(): void {
    this.deleteAllFilters.emit();
  }
}
