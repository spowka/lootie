import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { empty, Observable, of } from 'rxjs';

import { AuthService as SocialAuthService, SocialUser, GoogleLoginProvider } from 'angularx-social-login';

import { environment } from '../../../environments/environment';

import { JwtHelperService } from '@auth0/angular-jwt';
import {
  User,
  ShippingInfo,
  ForgotPassword,
  ResetPassword,
  LoginContext,
  LoginProvider
} from 'src/app/auth/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    private socialAuthService: SocialAuthService) {
  }

  login(loginContext: LoginContext, provider: LoginProvider, referralCode?: string, d?: any) {
    const body = { ...loginContext, referralCode, d };

    switch (provider) {
      case 'local':
        return this.http.post(`${environment.apiUrl}/users/authenticate/email`, body);

      case 'steam':
      case 'opskins':
        this.setToken(loginContext.token);
        return this.http.get(`${environment.apiUrl}/users/info`);

      case 'google':
        return this.http.post(`${environment.apiUrl}/users/authenticate/google`, body);

      default:
        return empty();
    }
  }


  forgotPassword(context: ForgotPassword) {
    return this.http.get(`${environment.apiUrl}/users/forgot-password?email=${context.email}`);
  }

  verifyEmail(context: {email: string, token: string}) {
    return this.http.get(`${environment.apiUrl}/users/verify-email?email=${context.email}&token=${context.token}`);
  }

  resetPassword(context: ResetPassword) {
    return this.http.post(`${environment.apiUrl}/users/reset-password`, context);
  }

  async googleSignIn(): Promise<SocialUser> {
    return this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signUp(user: User, referralCode?: string,  d?: any) {
    const body = { ...user, referralCode, d };

    return this.http.post(`${environment.apiUrl}/users`, body);
  }

  refreshToken() {
    const token = this.getRefreshToken();

    if (!token) {
      return of({});
    }

    return this.http.post(`${environment.apiUrl}/users/refresh-token`, { token });
  }

  claimEmail() {
    return this.http.get(`${environment.apiUrl}/reward/claim-email`);
  }

  setToken(token) {
    localStorage.setItem('token', token);
    localStorage.setItem('lastSynced', Date.now().toString());
  }

  setRefreshToken(token) {
    localStorage.setItem('refreshToken', token);
  }

  setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      return user;
    } catch (err) {
      return null;
    }
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getRefreshToken(): string {
    return localStorage.getItem('refreshToken');
  }

  updateUserAvatar(profileImageUrl: string) {
    return this.http.put(`${environment.apiUrl}/users/update-info`, { profileImageUrl });
  }

  updateUserInfo() {
    if (!this.getToken()) {
      return of({});
    }

    return this.http.get(`${environment.apiUrl}/users/info`);
  }

  approvedTos(tosApproved: boolean) {
    return this.http.put(`${environment.apiUrl}/users/update-info`, { tosApproved });
  }

  applyReferralCode(refCode: string) {
    return this.http.post(`${environment.apiUrl}/affiliate/apply-ref-code`, { refCode });
  }

  updateShippingAddress(body: ShippingInfo) {
    return this.http.post(`${environment.apiUrl}/withdrawals/update-shipping-address`, body);
  }

  updateTradeUrl(tradeUrl: string) {
    return this.http.post(`${environment.apiUrl}/deposit/update-trade-url`, { tradeUrl });
  }

  getShippingCountries() {
    return this.http.get(`${environment.apiUrl}/withdrawals/shipping-countries`);
  }

  removeAuth() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('lastSynced');
  }

  public isTokenExpired(): boolean {
    const token = this.getToken();
    return new JwtHelperService().isTokenExpired(token);
  }
}
