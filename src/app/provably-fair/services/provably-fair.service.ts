import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProvablyFairService {

  constructor(
    private http: HttpClient
  ) { }

  generateClientSeed() {
    return Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
  }

  changeClientSeed(id: string, clientSeed: string) {
    return this.http.post(`${environment.apiUrl}/case-openings/${id}/change-client-seed`, { clientSeed });
  }

  updateServerSeed(id: string, diceId: string) {
    return this.http.post(`${environment.apiUrl}/case-openings/${id}/dices/${diceId}/change-seed`, {});
  }

  getProvablyFair(id: string) {
    return this.http.get(`${environment.apiUrl}/provably-fairs/${id}`);
  }
}
