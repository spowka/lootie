import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { CaseModel, CasesType, CaseType, CaseUnboxModel } from 'src/app/cases/models';
import { Pagination } from 'src/app/shared/models/pagination';
import { Filters } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class CasesService {
  public addFundsButtonClicked = false;
  private prevColor: string;
  private readonly caseColors = ['#19bd66', '#9d63d2', '#4fc1e3', '#f3893a', '#f34747'];

  constructor(
    private http: HttpClient
  ) { }

  getCases(caseType: CasesType, pagination: Pagination, filters: Filters, name?: string) {
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

  getCase(id: string) {
    return this.http.get(`${environment.apiUrl}/cases/${id}`);
  }

  getDailyCase() {
    return this.http.get(`${environment.apiUrl}/cases/daily`);
  }

  getSpinnerItems(id: string) {
    return this.http.get(`${environment.apiUrl}/cases/${id}/ordered-items`);
  }

  getMyCases(pagination: Pagination) {
    const { limit, offset } = pagination;

    return this.http.get(`${environment.apiUrl}/cases/mine?limit=${limit}&offset=${offset}`);
  }

  getCasePrice(body) {
    return this.http.post(`${environment.apiUrl}/cases/price`, body);
  }

  getCaseLogos() {
    return this.http.get(`${environment.apiUrl}/cases/images`);
  }

  getSiteItems(pagination: Pagination, filters: Filters, search: string, tag: string) {
    let params = '';
    if (pagination) {
      const { limit, offset } = pagination;
      params = `limit=${limit}&offset=${offset}&`;
    }

    if (filters) {
      const { orderBy, orderDir } = filters;
      params += `sortBy=${orderBy}&sortDirection=${orderDir}&`;
    }

    if (tag) {
      params += `tag=${tag}&`;
    }

    if (search && search !== '') {
      params += `search=${encodeURIComponent(search)}`;
    }

    return this.http.get(`${environment.apiUrl}/site-items?${params}`);
  }

  createCase(body: CaseModel) {
    return this.http.post(`${environment.apiUrl}/cases`, body);
  }

  updateCase(id: string, editedCase: CaseModel) {
    return this.http.put(`${environment.apiUrl}/cases/${id}`, editedCase);
  }

  addCaseCategory(caseId: string, category: string) {
    return this.http.post(`${environment.apiUrl}/cases/add-cat`, { caseId, category });
  }

  removeCaseCategory(caseId: string, category: string) {
    return this.http.post(`${environment.apiUrl}/cases/remove-cat`, { caseId, category });
  }

  unboxCase(body: CaseUnboxModel) {
    return this.http.post(`${environment.apiUrl}/case-openings`, body);
  }

  redeemCode(freeCode: string) {
    return this.http.post(`${environment.apiUrl}/case-openings/redeem`, { freeCode });
  }

  rollAnUnboxing(id: string) {
    return this.http.post(`${environment.apiUrl}/case-openings/${id}/roll`, {});
  }

  sellItems(ids: Array<string>) {
    return this.http.post(`${environment.apiUrl}/user-items/sell`, { items: ids });
  }

  deleteCase(id: string) {
    return this.http.delete(`${environment.apiUrl}/cases/${id}`);
  }

  claimCaseEarnings() {
    return this.http.post(`${environment.apiUrl}/cases/claim-case-earnings`, {});
  }

  getItemDetails(id: string) {
    return this.http.get(`${environment.apiUrl}/site-items/${id}`);
  }

  generateColor() {
    const color = this.caseColors[Math.floor(Math.random() * this.caseColors.length)];
    if (color === this.prevColor) {
      return this.generateColor();
    }

    this.prevColor = color;
    return color;
  }

  generateSeed() {
    return Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
  }
}
