import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AffiliatesService {

  constructor(
    private http: HttpClient
  ) { }

  getReferralInfo() {
    return this.http.get(`${environment.apiUrl}/affiliate/get-info`);
  }

  getClaimEarnings() {
    return this.http.get(`${environment.apiUrl}/affiliate/claim-fee`);
  }

  createReferralCode(refCode: string) {
    return this.http.post(`${environment.apiUrl}/affiliate/set-ref-code`, { refCode });
  }

  sendInvite(email: string) {
    return this.http.post(`${environment.apiUrl}/affiliate/send-invite`, { email });
  }
}
