import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Pagination, Filters } from 'src/app/shared/models';
import { SelectInventoryItems } from 'src/app/upgrade/@store';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(private http: HttpClient) {}

  getInventoryItems(user: string, pagination: Pagination, filters: Filters, search: string) {
    let params = '';
    if (pagination) {
      const { limit, offset } = pagination;
      params = `limit=${limit}&offset=${offset}&`;
    }

    if (filters) {
      const { orderBy, orderDir } = filters;
      params += `sortBy=${orderBy}&sortDirection=${orderDir}&`;
    }

    if (search && search !== '') {
      params += `search=${encodeURIComponent(search)}`;
    }

    return this.http.get(`${environment.apiUrl}/user-items?user=${user}&${params}`);
  }

  sellItems(items: SelectInventoryItems[]) {
    return this.http.post(`${environment.apiUrl}/user-items/sell`, { items });
  }

  getInventoryItemsForBattle(battle: string) {
    return this.http.get(`${environment.apiUrl}/user-items?battle=${battle}`);
  }
}
