import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Pagination, Filters } from 'src/app/shared/models';
import { CreateUpgradeModel } from 'src/app/upgrade/models';

@Injectable({
  providedIn: 'root'
})
export class UpgradeService {

  constructor(
    private http: HttpClient
  ) { }

  getSiteItems(pagination: Pagination, filters: Filters, search: string) {
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
    return this.http.get(`${environment.apiUrl}/site-items?${params}`);
  }

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

  getUpgrades() {
    return this.http.get(`${environment.apiUrl}/upgrades/latest`);
  }

  createUpgrade(body: CreateUpgradeModel) {
    return this.http.post(`${environment.apiUrl}/upgrades`, body);
  }

  rollAnUpgrade(id: string) {
    return this.http.post(`${environment.apiUrl}/upgrades/${id}/roll`, {});
  }

  getSuggestItem(price: number, multiplier: number) {
    return this.http.get(`${environment.apiUrl}/site-items/closest?price=${price}&multiplier=${multiplier}`);
  }

  deleteUpgrade(id: string) {
    return this.http.delete(`${environment.apiUrl}/upgrades/${id}`);
  }
}
