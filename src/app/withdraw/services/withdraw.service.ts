import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Pagination, Filters } from 'src/app/shared/models';
import { WithdrawalQueryModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class WithdrawService {

  constructor(
    private http: HttpClient
  ) { }

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

  getWithdrawals(pagination: Pagination) {
    const { limit, offset } = pagination;

    return this.http.get(`${environment.apiUrl}/withdrawals?limit=${limit}&offset=${offset}`);
  }

  createWithdrawal(body: WithdrawalQueryModel) {
    return this.http.post(`${environment.apiUrl}/withdrawals`, body);
  }

  getAdditionalFee(payload) {
    return this.http.post(`${environment.apiUrl}/withdrawals/get-additional-fees`, payload);
  }

  getShippingCountries() {
    return this.http.get(`${environment.apiUrl}/withdrawals/shipping-countries`);
  }
}
