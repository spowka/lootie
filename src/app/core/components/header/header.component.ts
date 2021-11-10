import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Renderer2,
  OnDestroy
} from '@angular/core';
import {
  trigger,
  style,
  state,
  transition,
  animate
} from '@angular/animations';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Observable, Subject } from 'rxjs';
import { takeUntil, pairwise } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromAuth from 'src/app/auth/@store';
import * as fromLayoutAction from 'src/app/@store/layout';


import { User } from 'src/app/auth/models/user-profile';
import { LanguageType } from 'src/app/shared/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0deg)' })),
      state('rotated', style({ transform: 'rotate(-180deg)' })),
      transition('default <=> rotated', animate('300ms ease-in-out'))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn$: Observable<boolean>;
  isTablet$: Observable<boolean>;
  isLaptop$: Observable<boolean>;
  isDesktop$: Observable<boolean>;
  isUserMenuOpened$: Observable<boolean>;
  isForgotModalOpened$: Observable<boolean>;
  isLoginModalOpened$: Observable<boolean>;
  isSignUpModalOpened$: Observable<boolean>;
  user$: Observable<User>;
  language$: Observable<LanguageType>;
  unsubscribe$: Subject<void> = new Subject();

  userMenu = [
    {
      name: 'HEADER_MENU.PROFILE',
      link: '/account',
      className: 'user'
    },
    {
      name: 'HEADER_MENU.AFILIATES',
      link: '/affiliates',
      className: 'affiliates'
    },
    {
      name: 'HEADER_MENU.MY_BOXES',
      link: '/mysterybox/my',
      className: 'box'
    },
    {
      name: 'HEADER_MENU.INVENTORY',
      link: '/inventory',
      className: 'invent'
    },
    {
      name: 'HEADER_MENU.HISTORY',
      link: '/history',
      className: 'history'
    },
    {
      name: 'HEADER_MENU.WITHDRAW',
      link: '/withdraw',
      className: 'withdraw'
    }
  ];

  preloadingImages = [
    '/assets/images/header/gift.svg',
    '/assets/images/header/gift-light.svg',
    '/assets/images/header/gift-dark.svg',
    '/assets/images/header/gift-hover.svg',
    '/assets/images/header/info-with-circle.svg',
    '/assets/images/header/info-with-circle-hover.svg',
    '/assets/images/icons/us.svg',
    '/assets/images/icons/ar.svg',
    '/assets/images/icons/ru.svg',
    '/assets/images/header/box.svg',
    '/assets/images/icons/upgrade.png',
    '/assets/images/icons/help.png',
    '/assets/images/icons/free-box.svg',
    '/assets/images/header/photocamera.svg',
    '/assets/images/header/handshake.svg',
    '/assets/images/header/box-active.svg',
    '/assets/images/icons/upgrade-hover.svg',
    '/assets/images/icons/help-hover.svg',
    '/assets/images/icons/free-box-hover.svg',
    '/assets/images/header/photocamera-active.svg',
    '/assets/images/header/handshake-active.svg',
    '/assets/images/header/Box_fill_hover.svg',
    '/assets/images/header/Unbox_fill_hover.svg',
    '/assets/images/header/Partners_fill_hover.svg',
    '/assets/images/icons/user-active.svg',
    '/assets/images/icons/affiliates-active.svg',
    '/assets/images/icons/box-small-active.svg',
    '/assets/images/icons/invent-active.svg',
    '/assets/images/icons/history-active.svg',
    '/assets/images/icons/withdraw-active.svg',
    '/assets/images/icons/user.svg',
    '/assets/images/icons/affiliates.svg',
    '/assets/images/icons/invent.svg',
    '/assets/images/icons/history.svg',
    '/assets/images/icons/withdraw.svg'
  ];

  countUpOptions = {
    startVal: 0,
    decimalPlaces: 2,
    duration: 5,
    prefix: '$ '
  };

  public currentTheme: string;
  public selectedLanguage: LanguageType;
  public languages: any[] = [
    {
      id: 'en',
      name: 'English'
    },
    {
      id: 'ar',
      name: 'Arabian'
    },
    {
      id: 'ru',
      name: 'Russian'
    }
  ];
  public user: User;

  private themeSubject$: Subject<{
    previous: string;
    next: string;
  }> = new Subject();

  constructor(
    private router: Router,
    private store: Store<fromRoot.State>,
    private renderer: Renderer2,
    public dialog: MatDialog
  ) {
    this.isLoggedIn$ = this.store.pipe(select(fromAuth.selectIsLoggedIn));
    this.isTablet$ = this.store.pipe(select(fromRoot.selectIsTablet));
    this.isLaptop$ = this.store.pipe(select(fromRoot.selectIsLaptop));
    this.isDesktop$ = this.store.pipe(select(fromRoot.selectIsDesktop));
    this.isUserMenuOpened$ = this.store.pipe(
      select(fromRoot.selectUserSidebarOpened)
    );
    this.isLoginModalOpened$ = this.store.pipe(
      select(fromRoot.selectLoginModalOpened)
    );
    this.isForgotModalOpened$ = this.store.pipe(
      select(fromRoot.selectForgotModalOpened)
    );
    this.isSignUpModalOpened$ = this.store.pipe(
      select(fromRoot.selectSignUpModalOpened)
    );
    this.user$ = this.store.pipe(select(fromAuth.selectUser));
    this.user$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(user => (this.user = user));
    this.language$ = this.store.pipe(select(fromRoot.selectLanguage));
    this.language$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(language => (this.selectedLanguage = language));
  }

  ngOnInit() {
  }

  signup(): void {
    this.store.dispatch(new fromLayoutAction.OpenSignUpModal());
  }

  login(): void {
    this.store.dispatch(new fromLayoutAction.OpenLoginModal());
  }

  selectLanguage(lang: LanguageType): void {
    this.store.dispatch(new fromLayoutAction.ChangeLanguage(lang));
  }

  onChange(value: string): void {
    this.store.dispatch(new fromLayoutAction.ChangeTheme(value));
  }

  toggleUserSidebar() {
    this.store.dispatch(new fromLayoutAction.ToggleUserSidebar());
  }

  goToPage(page: string): void {
    this.router.navigate([page]);
  }

  logout(): void {
    this.store.dispatch(new fromAuth.Logout());
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
