import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Filters, Pagination, SidebarFilters } from 'src/app/shared/models';
import { ItemColor } from '../models/item-color.model';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private prevColor: ItemColor = {};
  private readonly itemColors: ItemColor[] = [
    { hex: '#19bd66', r: 25, g: 189, b: 102 },
    { hex: '#9d63d2', r: 157, g: 99, b: 210 },
    { hex: '#4fc1e3', r: 79, g: 193, b: 227 },
    { hex: '#f3893a', r: 243, g: 137, b: 58 },
    { hex: '#f34747', r: 243, g: 71, b: 71 },
  ];

  constructor(private http: HttpClient) {}

  getSiteItems(pagination: Pagination, filters: Filters, sidebarFilters: SidebarFilters, search: string, tag: string) {
    let params = '';
    if (pagination) {
      const { limit, offset } = pagination;
      params = `limit=${limit}&offset=${offset}&`;
    }

    if (filters) {
      const { orderBy, orderDir } = filters;
      params += `sortBy=${orderBy}&sortDirection=${orderDir}&`;
    }

    if (sidebarFilters) {
      const { mKey, pKey, sKey, priceFrom, priceTo } = sidebarFilters;

      if (mKey) {
        params += `mKey=${mKey.toString()}&`;
      }
      if (pKey) {
        params += `pKey=${pKey.toString()}&`;
      }
      if (sKey) {
        params += `sKey=${sKey.toString()}&`;
      }
      if (priceFrom) {
        params += `priceFrom=${priceFrom.toString()}&`;
      }
      if (priceTo) {
        params += `priceTo=${priceTo.toString()}&`;
      }
    }

    if (tag) {
      params += `tag=${tag}&`;
    }

    if (search && search !== '') {
      params += `search=${encodeURIComponent(search)}`;
    }

    return this.http.get(`${environment.apiUrl}/site-items?${params}`);
  }

  getSiteItemsCategories() {
    return this.http.get(`${environment.apiUrl}/site-items/categories`);
  }


  buyItem(itemId: string) {
    return this.http.post(`${environment.apiUrl}/user-items/buy`, { item: itemId });
  }

  generateColor() {
    const color = this.itemColors[Math.floor(Math.random() * this.itemColors.length)];
    if (color.hex === this.prevColor.hex) {
      return this.generateColor();
    }

    this.prevColor = color;
    return color;
  }
}
