import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, EMPTY, TimeoutError, of, timer } from 'rxjs';
import { tap, switchMap, timeout } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import sha256 from 'crypto-js/sha256';
import * as Sentry from "@sentry/browser";

import * as fromRoot from 'src/app/@store';
import * as fromAuth from 'src/app/auth/@store';
import * as fromLayout from 'src/app/@store/layout';

import { AuthService } from 'src/app/auth/services/auth.service';
import { Languages } from 'src/app/shared/models';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

const EXPIRATION_PERIOD = 15 * 60000;

const whitelist = ['/users/refresh-token'];

@Injectable()

export class InterceptService implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private store: Store<fromRoot.State>,
    private router: Router,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();
    const language = localStorage.getItem('language') || Languages.en;

    return this.checkTokenValid(request.url).pipe(
      switchMap(() => this.getServerTimestamp()),
      switchMap(
        (ts: number) => {
          const apiToken = sha256(`${environment.apiToken}_lootiekey_${ts}`).toString();

          request = request.clone({
            setHeaders: {
              'Authorization': token ? `Bearer ${token}` : '',
              'Lang': language,
              'ApiToken': apiToken,
              'Timestamp': ts.toString()
            }
          });


          return next.handle(request)
            .pipe(
              timeout(30000),
              tap(
                (event: any) => { },
                (response: HttpErrorResponse | TimeoutError) => {
                  if (response instanceof TimeoutError) {
                    const rollbackUrl = sessionStorage.getItem('offlineUrl');
                    if (!rollbackUrl) {
                      sessionStorage.setItem('offlineUrl', this.router.url);
                    }

                    this.sendError(request);
                    this.router.navigate(['/offline']);
                  }

                  if (response instanceof HttpErrorResponse) {
                    if (response.statusText === 'Unknown Error' && !window.navigator.onLine) {
                      const rollbackUrl = sessionStorage.getItem('offlineUrl');
                      if (!rollbackUrl) {
                        sessionStorage.setItem('offlineUrl', this.router.url);
                      }

                      this.sendError(request);
                      this.router.navigate(['/offline']);
                    }

                    if (response.message === 'jwt expired' || (response.error && response.error.name === 'TokenExpiredError')) {
                      this.store.dispatch(new fromAuth.Logout());
                      this.store.dispatch(new fromLayout.OpenLoginModal());
                    }
                  }

                })
            );
        }
      )
    );
  }

  getServerTimestamp(): Observable<number> {
    return new Observable(obs => {
      const checkTimestamp = (timer) => {
        const timestamp = +localStorage.getItem('svt');
        if (timestamp > 0) {
          obs.next(timestamp);
          obs.complete();
          if (timer) {
            clearInterval(timer);
          }
        }
      }

      const timer = setInterval(() => {
        checkTimestamp(timer);
      }, 1000);

      checkTimestamp(timer);
    });
  }

  checkTokenValid(url: string): Observable<boolean> {
    const shouldSkip = url.indexOf('api.lootie.com/v1/') < 0
      || whitelist.some(u => url.indexOf(u) >= 0);

    if (shouldSkip) {
      return of(true);
    }

    return new Observable(obs => {
      const checkSynced = (timer) => {
        const lastSynced = +(localStorage.getItem('lastSynced') || 0);
        const refreshToken = localStorage.getItem('refreshToken');
        const currentTs = Date.now();

        if (!refreshToken || (currentTs - lastSynced) <= EXPIRATION_PERIOD) {
          obs.next(true);
          obs.complete();
          if (timer) {
            clearInterval(timer);
          }
        } else {
          console.log('Blocked URL: ', url);
        }
      };

      const timer = setInterval(() => {
        checkSynced(timer);
      }, 1000);

      checkSynced(timer);
    });
  }

  private sendError(request: HttpRequest<any>) {
    let reqBody = '';
    let userID = '';
    try {
      reqBody = JSON.stringify(request.body);
      const userObj = JSON.parse(localStorage.getItem('user') || '{}');
      if (userObj) {
        userID = userObj._id;
      }
    } catch (e) {}
    const err = new Error(
      `Going offline due to network failure.\nRequest URL: ${request.url}\nPayload:\n  ${reqBody}\nCurrent URL: ${location.href}\nUserID: ${userID}`
    );
    err.name = 'OfflineError';
    Sentry.captureException(err);
  }
}
