import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RewardsService {

  constructor(
    private http: HttpClient
  ) { }

  getRewards() {
    return this.http.get(`${environment.apiUrl}/rewards`)
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  claimEmail() {
    return this.http.get(`${environment.apiUrl}/reward/claim-email`);
  }

  claimDiscord(accessToken: string) {
    return this.http.post(`${environment.apiUrl}/reward/claim-discord`, { accessToken });
  }

  claimFacebook() {
    return this.http.post(`${environment.apiUrl}/reward/claim-facebook`, null);
  }

  claimTwitter() {
    return this.http.post(`${environment.apiUrl}/reward/claim-twitter`, null);
  }
}
