import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Pagination } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root',
})
export class LeaderBoardService {
  constructor(private http: HttpClient) {}

  getMonthlyTopDrop(pagination: Pagination) {
    let params = '';

    if (pagination) {
      const { limit, offset } = pagination;
      params = `limit=${limit}&offset=${offset}`;
    }

    return this.http.get(`${environment.apiUrl}/rewards/top-drops?${params}`);
  }

  getTopDropHistory(pagination: Pagination) {
    let params = '';

    if (pagination) {
      const { limit, offset } = pagination;
      params = `limit=${limit}&offset=${offset}`;
    }

    return this.http.get(`${environment.apiUrl}/rewards/history?${params}`);
  }
}
