import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import * as fromLayoutAction from './layout.action';

import { Observable, fromEvent, of, EMPTY } from 'rxjs';
import { debounceTime, map, tap, exhaustMap, catchError } from 'rxjs/operators';

import { SocketService } from 'src/app/core/socket/services/socket.service';
import { LanguageType, Languages } from 'src/app/shared/models';
import { LayoutService } from '../services/layout.service';
import { Router } from '@angular/router';

@Injectable()
export class LayoutEffects {
  constructor(
    private actions$: Actions,
    private socketService: SocketService,
    private layoutService: LayoutService,
    private router: Router
  ) { }

  @Effect()
  windowResize$: Observable<fromLayoutAction.ResizeWindow> = fromEvent(window, 'resize').pipe(
    debounceTime(300),
    map((e: Event) => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      return new fromLayoutAction.ResizeWindow({ width, height });
    })
  );

  @Effect({ dispatch: false })
  changeTheme$: Observable<fromLayoutAction.LayoutActions> = this.actions$
    .pipe(
      ofType(fromLayoutAction.CHANGE_THEME),
      tap((action) => {
        localStorage.setItem('theme', action['payload']);
      })
    );

  @Effect()
  themeCheck$: Observable<fromLayoutAction.ThemeCheckSuccess | fromLayoutAction.ThemeCheckFail> = this.actions$
    .pipe(
      ofType<fromLayoutAction.ThemeCheck>(fromLayoutAction.THEME_CHECK),
      debounceTime(10),
      exhaustMap(() => {
        const theme = localStorage.getItem('theme');
        if (!theme) {
          return of(new fromLayoutAction.ThemeCheckFail());
        }
        return of(new fromLayoutAction.ThemeCheckSuccess(theme));
      })
    );

  @Effect({ dispatch: false })
  changeLanguage$ = this.actions$
    .pipe(
      ofType(fromLayoutAction.CHANGE_LANGUAGE),
      tap((action) => {
        localStorage.setItem('language', action['payload']);
        this.socketService.emit('lang.set', { lang: action['payload'] });
      })
    );

  @Effect({ dispatch: false })
  checkStatus$ = this.actions$.pipe(
    ofType(fromLayoutAction.CHECK_STATUS),
    debounceTime(1000),
    exhaustMap(() => {
      return this.layoutService.getStatus().pipe(
        map(_ => {
          const rollbackUrl = sessionStorage.getItem('offlineUrl');
          sessionStorage.removeItem('offlineUrl');
          this.router.navigate([rollbackUrl || '/']);
        }), catchError((res: Error) => {
          console.log('res', res);
          return EMPTY;
        })
      );
    }
    ));

  @Effect()
  languageCheck$: Observable<fromLayoutAction.LanguageCheckSuccess | fromLayoutAction.LanguageCheckFail> = this.actions$
    .pipe(
      ofType<fromLayoutAction.LanguageCheck>(fromLayoutAction.LANGUAGE_CHECK),
      debounceTime(1000),
      exhaustMap(() => {
        const lang = <LanguageType>localStorage.getItem('language');
        this.socketService.emit('lang.set', { lang: lang || Languages.en });
        if (!lang) {
          return of(new fromLayoutAction.LanguageCheckFail());
        }
        return of(new fromLayoutAction.LanguageCheckSuccess(lang));
      })
    );
}
