import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { take, pairwise, takeUntil } from 'rxjs/operators';

import * as fromRoot from 'src/app/@store';
import * as fromAuth from 'src/app/auth/@store';
import * as fromLayoutAction from 'src/app/@store/layout';

import { mobileMenuAnimation } from '../shared/utils/animations';
import { User } from 'src/app/auth/models';
import { MatDialog } from '@angular/material';
import { AuthDialogComponent } from '../core/components';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss'],
  animations: [mobileMenuAnimation]
})
export class MobileHeaderComponent implements OnInit, OnDestroy {
  public countUpOptions = {
    startVal: 0,
    decimalPlaces: 2,
    duration: 5,
    prefix: '$ ',
  };

  public user$: Observable<User>;

  public user: User;

  public isLoggedIn$: Observable<boolean>;

  public isHeaderNavbarOpened$: Observable<boolean>;

  public isLoginModalOpened$: Observable<boolean>;

  public isForgotModalOpened$: Observable<boolean>;

  public isSignUpModalOpened$: Observable<boolean>;

  private unsubscribe$: Subject<void> = new Subject();

  userMenu = [
    { name: 'Profile', link: '/account', icon: 'assets/images/icons/withdraw.svg' },
    { name: 'Affiliates', link: '/affiliates', icon: 'assets/images/icons/affiliates.svg' },
    { name: 'My Boxes', link: '/mysterybox/my', icon: 'assets/images/icons/box.svg' },
    { name: 'Inventory', link: '/inventory', icon: 'assets/images/icons/inventory.svg' },
    { name: 'History', link: '/history', icon: 'assets/images/icons/history.svg' },
  ];

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router,
    private renderer: Renderer2,
    public dialog: MatDialog
  ) {
    this.user$ = this.store.pipe(select(fromAuth.selectUser));
    this.user$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(user => (this.user = user));
    this.isLoggedIn$ = this.store.pipe(select(fromAuth.selectIsLoggedIn));
    this.isHeaderNavbarOpened$ = this.store.pipe(select(fromRoot.selectHeaderNavbarOpened));
    this.isLoginModalOpened$ = this.store.pipe(select(fromRoot.selectLoginModalOpened));
    this.isForgotModalOpened$ = this.store.pipe(select(fromRoot.selectForgotModalOpened));
    this.isSignUpModalOpened$ = this.store.pipe(select(fromRoot.selectSignUpModalOpened));
  }

  public ngOnInit() {
    this.isLoginModalOpened$.subscribe(opened => {
      if (opened) {
        const dialogRef = AuthDialogComponent.show(this.dialog, 'login');
      }
    });

    this.isForgotModalOpened$.subscribe(opened => {
      if (opened) {
        const dialogRef = AuthDialogComponent.show(
          this.dialog,
          'forgot-password'
        );
      }
    });

    this.isSignUpModalOpened$.subscribe(opened => {
      if (opened) {
        const dialogRef = AuthDialogComponent.show(this.dialog, 'register');
      }
    });
  }

  login(): void {
    this.store.dispatch(new fromLayoutAction.OpenLoginModal());
  }

  public goToPage(page: string): void {
    this.router.navigate([page]);
    this.store.dispatch(new fromLayoutAction.CloseHeaderNavbar());
  }

  public toggleHeaderNavbar() {
    this.isLoginModalOpened$.pipe(take(1)).subscribe(opened => {
      if (opened) {
        this.store.dispatch(new fromRoot.CloseLoginModal());
      }
    });

    this.store.dispatch(new fromLayoutAction.ToggleHeaderNavbar());
  }

  public logout(): void {
    this.store.dispatch(new fromAuth.Logout());
    this.store.dispatch(new fromLayoutAction.CloseHeaderNavbar());
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
