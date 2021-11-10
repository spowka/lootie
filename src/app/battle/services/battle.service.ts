import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Pagination, Filters } from 'src/app/shared/models';
import { CasesType, CaseType } from 'src/app/cases/models';

@Injectable({
  providedIn: 'root',
})
export class BattleService {
  constructor(private http: HttpClient) { }

  getBattles(type: string, pagination: Pagination) {
    let params = '';
    if (pagination) {
      const { limit, offset } = pagination;
      params = `&limit=${limit}&offset=${offset}&`;
    }

    return this.http.get(`${environment.apiUrl}/battles?type=${type}${params}`);
  }

  getBattle(id: string) {
    return this.http.get(`${environment.apiUrl}/battles/${id}`);
  }

  joinBattle(id: string, seed: string) {
    return this.http.post(`${environment.apiUrl}/battles/${id}/join`, { seed });
  }

  cancelBattle(id: string) {
    return this.http.post(`${environment.apiUrl}/battles/${id}/cancel`, {});
  }

  quitBattle(id: string, seed: string) {
    return this.http.post(`${environment.apiUrl}/battles/${id}/quit`, { seed });
  }

  startBattle(id: string) {
    return this.http.post(`${environment.apiUrl}/battles/${id}/ready`, {});
  }

  createBattle(body) {
    return this.http.post(`${environment.apiUrl}/battles`, body);
  }

  getBoxes(caseType: CasesType, pagination: Pagination, filters: Filters, name?: string) {
    let params = '';
    if (pagination) {
      const { limit, offset } = pagination;
      params = `limit=${limit}&offset=${offset}&`;
    }

    if (filters) {
      const { orderBy, orderDir } = filters;
      params += `sortBy=${orderBy}&sortDirection=${orderDir}&`;
    }

    if (name && name !== '') {
      params += `name=${encodeURIComponent(name)}&`;
    }

    if (caseType !== CaseType.all) {
      params += `caseType=${caseType}&`;
    }

    return this.http.get(`${environment.apiUrl}/cases?${params}`);
  }
}
