import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material';

import { Observable, Subject } from 'rxjs';

import { select, Store } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromAuth from 'src/app/auth/@store';
import * as fromLayoutAction from 'src/app/@store/layout';
import { takeUntil, take, skip } from 'rxjs/operators';

import { NgxZendeskWebwidgetService } from 'ngx-zendesk-webwidget';

import { LanguageType } from 'src/app/shared/models';

export enum MobileMenu {
  navigation = 'navigation',
  logOff = 'logOff',
  logIn = 'logIn',
  resetPassword = 'resetPassword',
  signUp = 'signUp',
}

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent implements OnInit, OnDestroy {

  public showContent: string = MobileMenu.logOff;

  public isLoggedIn$: Observable<boolean>;

  public theme$: Observable<string>;

  public language$: Observable<LanguageType>;

  public languages: LanguageType[] = ['en', 'ar'];

  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private store: Store<fromRoot.State>,
    private _ngxZendeskWebwidgetService: NgxZendeskWebwidgetService,
  ) {
    this.theme$ = this.store.pipe(select(fromRoot.selectTheme));
    this.language$ = this.store.pipe(select(fromRoot.selectLanguage));
  }

  ngOnInit() {
    this.subscribeToLogIn();

    this._ngxZendeskWebwidgetService.zE('webWidget', 'hide');
  }

  close() {
    this.store.dispatch(new fromLayoutAction.ToggleHeaderNavbar());
  }

  changePage(page: string) {
    this.showContent = page;
  }

  onChange(ob: MatButtonToggleChange): void {
    this.store.dispatch(new fromLayoutAction.ChangeTheme(ob.value));
  }

  selectLanguage(lang: LanguageType): void {
    this.store.dispatch(new fromLayoutAction.ChangeLanguage(lang));
  }

  private subscribeToLogIn(): void {
    this.isLoggedIn$ = this.store.pipe(select(fromAuth.selectIsLoggedIn));

    this.isLoggedIn$.pipe(take(1))
      .subscribe((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          this.showContent = MobileMenu.navigation;
        }
      });

    this.isLoggedIn$.pipe(skip(1), takeUntil(this.unsubscribe$))
      .subscribe((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          this.close();
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();

    this._ngxZendeskWebwidgetService.zE('webWidget', 'show');
  }

}

