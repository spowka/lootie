import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromAuth from 'src/app/auth/@store';
import * as fromLayoutAction from 'src/app/@store/layout';

import { User } from 'src/app/auth/models/user-profile';
import { MobileMenu } from '../../containers/mobile-menu/mobile-menu.component';
import { MatButtonToggleChange } from '@angular/material';

@Component({
  selector: 'app-mobile-navigation',
  templateUrl: './mobile-navigation.component.html',
  styleUrls: ['./mobile-navigation.component.scss']
})
export class MobileNavigationComponent implements OnInit, OnDestroy {
  public navigationItems = [
    {
      name: 'HEADER.MYSTERY_BOXES',
      link: '/',
      className: 'boxes',
      badge: false,
      background: true,
    },
    {
      name: 'HEADER_MENU.PARTNERSHIP',
      link: '/partner',
      className: 'partner',
      badge: false,
      background: true,
    },
    {
      name: 'HISTORY.NAVBAR.UNBOXINGS',
      link: '/unboxings',
      className: 'unboxings',
      badge: false,
      background: true,
    },
    // {
    //   name: 'HEADER_MENU.MYSTERY_BATTLES',
    //   link: '/battle',
    //   className: 'battle',
    //   badge: true,
    //   background: true,
    // },
    {
      name: 'HEADER_MENU.PROFILE',
      link: '/account',
      className: 'account',
      badge: false,
      background: false,
    },
    {
      name: 'HEADER_MENU.AFILIATES',
      link: '/affiliates',
      className: 'affiliates',
      badge: false,
      background: false,
    },
    {
      name: 'HEADER_MENU.MY_BOXES',
      link: '/mysterybox/my',
      className: 'my-boxes',
      badge: false,
      background: false,
    },
    {
      name: 'HEADER_MENU.INVENTORY',
      link: '/inventory',
      className: 'inventory',
      badge: false,
      background: false,
    },
    {
      name: 'HEADER_MENU.HISTORY',
      link: '/history',
      className: 'history-unboxings',
      badge: false,
      background: false,
    },
    {
      name: 'HEADER_MENU.WITHDRAW',
      link: '/withdraw',
      className: 'withdraw',
      badge: false,
      background: false,
    }
  ];

  public MobileMenu = MobileMenu;

  public user$: Observable<User>;

  public theme$: Observable<string>;

  private unsubscribe$: Subject<void> = new Subject();

  @Output() changePage: EventEmitter<string> = new EventEmitter();

  constructor(private store: Store<fromRoot.State>, private router: Router) {
    this.user$ = this.store.pipe(select(fromAuth.selectUser));
    this.theme$ = this.store.pipe(select(fromRoot.selectTheme));
  }

  ngOnInit() {}

  goToPage(page: string): void {
    this.close();
    this.router.navigate([page]);
  }

  onChangePage(page: string): void {
    this.changePage.emit(page);
  }

  onChange(ob: MatButtonToggleChange): void {
    this.store.dispatch(new fromLayoutAction.ChangeTheme(ob.value));
  }

  close() {
    this.store.dispatch(new fromLayoutAction.ToggleHeaderNavbar());
  }

  logout(): void {
    this.store.dispatch(new fromAuth.Logout());
    this.onChangePage(MobileMenu.logOff);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
