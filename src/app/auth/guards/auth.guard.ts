import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Observable, combineLatest } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { select, Store } from '@ngrx/store';
import * as fromAuth from 'src/app/auth/@store';
import * as fromLayout from 'src/app/@store/layout';
import * as fromRoot from 'src/app/@store';
import * as fromRouter from 'src/app/@store/router';

import { AuthDialogComponent } from 'src/app/core/components';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isAuthenticated$: Observable<boolean>;

  isMobile$: Observable<boolean>;
  isTablet$: Observable<boolean>;
  currentUrl$: Observable<string>;

  constructor(
    private store: Store<fromRoot.State>,
    private dialog: MatDialog,
    private authService: AuthService,
  ) {
    this.isMobile$ = this.store.pipe(select(fromLayout.selectIsMobile));
    this.isTablet$ = this.store.pipe(select(fromLayout.selectIsTablet));
    this.currentUrl$ = this.store.pipe(select(fromLayout.selectgetActiveUrl));
    this.isAuthenticated$ = this.store.pipe(select(fromAuth.selectIsLoggedIn)).pipe(
      map((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          if (this.authService.isTokenExpired()) {
            this.store.dispatch(new fromAuth.Logout());
            return false;
          }

          return true;
        }

        combineLatest(this.isMobile$, this.isTablet$, this.currentUrl$)
          .pipe(take(1))
          .subscribe(([isMobile, isTablet, url]) => {
            if (isMobile || isTablet) {
              this.store.dispatch(new fromLayout.ToggleHeaderNavbar());
            } else {
              AuthDialogComponent.show(this.dialog);
            }

            localStorage.setItem('loginToRoute', url);
            this.store.dispatch(new fromRouter.Go({ path: ['/'] }));
          });

        return false;
      })
    );
  }

  canActivate(): Observable<boolean> {
    return this.isAuthenticated$;
  }
}
