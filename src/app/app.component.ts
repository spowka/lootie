import {
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
  OnDestroy,
  AfterViewInit,
  HostListener
} from '@angular/core';
import { NgxZendeskWebwidgetService } from 'ngx-zendesk-webwidget';
import { ToastrService } from 'ngx-toastr';
import { ZendeskConfig } from './core/configs/zendesk.config';
import { SocketService } from './core/socket/services/socket.service';
import { AuthService } from './auth/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromAuth from 'src/app/auth/@store/auth/auth.action';
import * as fromAuthSelector from 'src/app/auth/@store/auth/auth.selector';
import * as fromLayout from 'src/app/@store/layout/layout.action';
import * as fromLayoutSelector from 'src/app/@store/layout/layout.selector';
import * as fromProvablyFair from 'src/app/@store/provably-fair/provably-fair.action';
import * as fromHistory from 'src/app/@store/history/history.action';
import * as fromUpgrades from 'src/app/upgrade/@store/upgrade/upgrade.action';
import * as fromDeposit from 'src/app/deposit/@store/deposit/deposit.action';
import * as fromCases from 'src/app/cases/@store/cases/cases.action';
import * as fromAffiliates from 'src/app/affiliates/@store/affiliates/affiliates.action';
import * as fromBattles from 'src/app/battle/@store/battle/battle.action';
import * as fromBattlesSelector from 'src/app/battle/@store/battle/battle.selector';
import { Observable, Subject, combineLatest, timer, of } from 'rxjs';
import * as fromChat from './chat/@store';
import { config as afConfig } from 'src/app/affiliates/affiliates-constants';
import {
  Router,
  ActivatedRoute,
  NavigationEnd,
  RoutesRecognized,
  NavigationStart,
  NavigationCancel,
  NavigationError,
  RouteConfigLoadStart,
  ResolveStart
} from '@angular/router';
import { take, takeUntil, pairwise, retryWhen, catchError } from 'rxjs/operators';
import { LanguageType, Languages } from './shared/models';
import { User } from './auth/models';
import { BattleModel } from './battle/models';
import { genericRetryStrategy } from './shared/utils/retry-request-strategy';

const REFRESH_INTERVAL = 13 * 60000;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'skinworld-app';
  currentUrl$: Observable<string>;
  isChatOpened$: Observable<boolean>;
  isMobile$: Observable<boolean>;
  isTablet$: Observable<boolean>;
  isLaptop$: Observable<boolean>;
  isDesktop$: Observable<boolean>;
  isScrollDisabled$: Observable<boolean>;
  isLiveFeed$: Observable<boolean>;
  language$: Observable<LanguageType>;
  theme$: Observable<string>;
  user$: Observable<User>;
  public battles$: Observable<BattleModel>;
  timer: any;
  public isUnavailable: string;

  private isInitZendesk = false;
  private unsubscribe$: Subject<void> = new Subject();
  @ViewChild('mainWrapper', { static: false }) mainWrapper: ElementRef;

  constructor(
    private store: Store<fromRoot.State>,
    private renderer: Renderer2,
    private _ngxZendeskWebwidgetService: NgxZendeskWebwidgetService,
    private socket: SocketService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private translate: TranslateService
  ) {
    localStorage.removeItem('lastSynced');
    if (localStorage.getItem('token') && !localStorage.getItem('refreshToken')) {
      localStorage.setItem('refreshToken', 'ANY');
    }
    this.startRefreshToken();
    this.store.dispatch(new fromAuth.AuthCheck());
    this.store.dispatch(new fromAuth.UpdateUserInfo());
    this.isMobile$ = this.store.pipe(select(fromRoot.selectIsMobile));
    this.isTablet$ = this.store.pipe(select(fromRoot.selectIsTablet));
    this.isLaptop$ = this.store.pipe(select(fromRoot.selectIsLaptop));
    this.isDesktop$ = this.store.pipe(select(fromRoot.selectIsDesktop));
    this.isLiveFeed$ = this.store.pipe(select(fromLayoutSelector.selectIsLiveFeed));
    this.socket.connect();
    this.translate.addLangs([Languages.en, Languages.ar, Languages.ru]);
    this.currentUrl$ = this.store.pipe(select(fromRoot.selectgetActiveUrl));
    this.user$ = this.store.pipe(select(fromAuthSelector.selectUser));
    this.battles$ = this.store.pipe(select(fromBattlesSelector.selectBattle));
    this.route.queryParams.subscribe(params => {
      if (params['redirectType']) {
        this.toast.success('Your account has been verified');
        this.router.navigate(['/']);
      }
    });

    this.theme$ = this.store.pipe(select(fromRoot.selectTheme));
    this.theme$
      .pipe(pairwise(), takeUntil(this.unsubscribe$))
      .subscribe(([previous, next]) => {
        const body = document.body;

        if (previous) {
          this.renderer.removeClass(body, `sw-theme-${previous}`);
        }

        this.renderer.addClass(body, `sw-theme-${next}`);
      });

    // Load theme manually
    const theme = localStorage.getItem('theme');
    if (theme && theme !== 'dark') {
      this.renderer.removeClass(document.body, 'sw-theme-dark');
      this.renderer.addClass(document.body, `sw-theme-${theme}`);
    }

    // Set language manually
    const lang = <LanguageType>localStorage.getItem('language');
    if (lang && lang !== Languages.en) {
      this.socket.emit('lang.set', lang);
      this.translate.use(lang);
    }

    this.router.events.subscribe(event => {
      this.isUnavailable = localStorage.getItem('unavailableUser');

      switch (true) {

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          if (this.isUnavailable) {
            if (this._ngxZendeskWebwidgetService && this._ngxZendeskWebwidgetService.zE) {
              setTimeout(() => this._ngxZendeskWebwidgetService.zE('webWidget', 'hide'), 500);
            }
          }
          break;
        }
        default: {
          break;
        }
      }

      if (
        event instanceof RoutesRecognized &&
        event.url !== '/unavailable' &&
        this.isUnavailable
      ) {
        this.isInitZendesk = true;
        if (
          this._ngxZendeskWebwidgetService &&
          this._ngxZendeskWebwidgetService.zE &&
          !this.isInitZendesk
        ) {
          this._ngxZendeskWebwidgetService.zE('webWidget', 'hide');
        }
        this.router.navigate(['/unavailable']);
      } else if (!this.isInitZendesk && !this.isUnavailable) {
        this.initZendesk();
      }

      if (event instanceof NavigationEnd) {
        window.analytics.page(event.urlAfterRedirects);
      }
    });
  }

  ngAfterViewInit() {
    this.store.dispatch(new fromLayout.ThemeCheck());
    this.store.dispatch(new fromLayout.LanguageCheck());
    this.store.dispatch(new fromProvablyFair.SetClientSeed());
    this.store.dispatch(new fromHistory.LoadLatestDrops());

    this.subscribeToLanguage();
    this.subscribeToScroll();
    this.subscribeToSocket();
    this.checkTokenExpiration();

  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  onActivate() {
    this.isMobile$.pipe(take(1)).subscribe(isMobile => {
      if (
        this.router.routerState.snapshot.url.includes('mysterybox/unbox') &&
        isMobile
      ) {
        setTimeout(_ => (this.mainWrapper.nativeElement.scrollTop = 190));
      } else if (
        this.router.routerState.snapshot.url.includes('deposit') &&
        isMobile
      ) {
        setTimeout(_ => (this.mainWrapper.nativeElement.scrollTop = 180));
      } else {
        this.mainWrapper.nativeElement.scrollTop = 0;
      }
    });
  }

  subscribeToScroll() {
    this.isScrollDisabled$ = this.store.pipe(
      select(fromRoot.selectIsScrollDisabled)
    );

    this.isScrollDisabled$.subscribe((isDisabled: boolean) => {
      if (isDisabled) {
        this.renderer.addClass(document.body, 'noscroll');
        this.renderer.addClass(this.mainWrapper.nativeElement, 'noscroll');
        return;
      }

      this.renderer.removeClass(document.body, 'noscroll');
      this.renderer.removeClass(this.mainWrapper.nativeElement, 'noscroll');
    });
  }

  subscribeToLanguage() {
    this.language$ = this.store.pipe(select(fromLayoutSelector.selectLanguage));

    this.language$.subscribe((language: LanguageType) =>
      this.translate.use(language)
    );
  }

  private subscribeToSocket() {
    this.socket.on('messages.new').subscribe(res => {
      this.store.dispatch(new fromChat.ReceiveMessage(res));
    });

    this.socket.on('case.opening').subscribe(res => {
      this.isLiveFeed$.subscribe(isLiveFeed => {
        if (isLiveFeed) {
          this.store.dispatch(new fromHistory.AddLatestDrop(res));
        }
      });
    });

    this.socket.on('case.opened').subscribe(res => {
      this.toast.success(res.message);
      this.store.dispatch(new fromAuth.CaseOpened(res.availableEarnings));
      this.store.dispatch(new fromCases.CaseOpened(res.caseId));
    });

    this.socket.on('upgrade.latest').subscribe(res => {
      this.store.dispatch(new fromUpgrades.AddLatestUpgrade(res));
    });

    this.socket.on('user.balance').subscribe(res => {
      this.store.dispatch(
        new fromAuth.UpdateUserBalance({
          type: res.type,
          balance: res.balance,
          deposited: res.deposited
        })
      );

      if (res.type === 'DEPOSIT') {
        this.store.dispatch(new fromDeposit.SetSuccessStatus());
      }

      if (res.type === 'G2A_DEPOSIT_FAIL') {
        this.store.dispatch(new fromDeposit.SetFailStatus('g2a_fail'));
      }

      if (res.type === 'PAYOP_DEPOSIT_FAIL') {
        this.store.dispatch(new fromDeposit.SetFailStatus('payop_fail'));
      }

      if (res.message) {
        this.toast.toastrConfig.preventDuplicates = false;
        this.toast.success(res.message);
      }
    });

    this.socket.on('users.online')
      .subscribe((res) => {
        this.store.dispatch(new fromChat.UpdateOnlineUsers(res.count));
      });

    this.socket.on('user.muteChat').subscribe(res => {
      if (res.message) {
        this.toast.error(res.message);
      }

      const timestamp = new Date().toISOString();
      this.store.dispatch(
        new fromAuth.MuteUser({ minute: +res.value, timestamp })
      );
    });

    this.socket.on('user.referred').subscribe(res => {
      this.store.dispatch(new fromAuth.UpdateReferralInfo(res));
      this.store.dispatch(
        new fromAffiliates.LoadReferralInfoSuccess({
          personal: {
            totalReferrals: res.referredUserCount,
            referralReceives:
              afConfig.referralCutLevels[res.referralLevel] *
              afConfig.rewardUnit
          }
        } as any)
      );

      if (res.message) {
        this.toast.success(res.message);
      }
    });

    this.socket.on('battle.user.join').subscribe(res => {
      this.store.dispatch(new fromBattles.UpdateBattle(res));
    });

    this.socket.on('battle.user.ready').subscribe(res => {
      this.store.dispatch(new fromBattles.SetReadyPlayer(res));
    });

    this.socket.on('battle.round').subscribe(res => {
      this.store.dispatch(new fromBattles.SetBattleRound(res));
    });

    this.socket.on('battle.new').subscribe(res => {
      this.store.dispatch(new fromBattles.AddBattleSuccess(res.battle));
    });

    this.socket.on('battle.user.leave').subscribe(res => {
      this.store.dispatch(new fromBattles.LeaveBattle(res));
    });

    this.socket.on('battle.cancel').subscribe(res => {
      this.store.dispatch(new fromBattles.CancelBattleSuccess(res.battle));
    });

    this.socket.on('battle.start').subscribe(res => {
      combineLatest(this.battles$, this.user$).pipe(takeUntil(this.unsubscribe$)).subscribe(([battle, user]) => {
        battle.sessions.map(session => {

          if (battle._id === res.battle && session.user._id === user._id) {
            this.toast.success(`Go to battle`);
          }
        });
      });

      this.store.dispatch(new fromBattles.StartBattle(res.battle));
    });

    this.socket.on('battle.end').subscribe(res => {
      this.store.dispatch(new fromBattles.EndBattle(res.battle));
    });

    this.socket.on('seg').subscribe((res) => {
      const { action, event, data } = res;
      window.analytics[action](event, data);
    });
  }

  private initZendesk() {
    this.isInitZendesk = true;
    this._ngxZendeskWebwidgetService.initZendesk(new ZendeskConfig())
      .then(() => {
        this.store.pipe(select(fromAuthSelector.selectUser))
          .subscribe(user => {
            const email = user ? user.email : '';
            const name = user ? user.shippingAddress
              ? `${user.shippingAddress.firstName} ${user.shippingAddress.lastName}`.trim()
              : user.username
              : '';

            this._ngxZendeskWebwidgetService.zE('webWidget', 'prefill', {
              name: {
                value: name,
              },
              email: {
                value: email,
              },
            });
          });
      })
      .catch(err => {
        setTimeout(this.initZendesk.bind(this), 1000);
      });
  }

  private checkTokenExpiration() {
    this.timer = setInterval(() => {
      if (localStorage.token && this.authService.isTokenExpired()) {
        this.toast.success(`Logged out due to inactivity`);
        this.store.dispatch(new fromAuth.Logout());
      }
    }, 5000);
  }

  private startRefreshToken() {
    timer(0, REFRESH_INTERVAL).subscribe(() => {
      this.authService.refreshToken()
        .pipe(
          retryWhen(genericRetryStrategy())
        )
        .subscribe(
          (res: any) => {
            if (res.data && res.data.token) {
              this.authService.setToken(res.data.token);
            }
          },
          () => {
            this.translate.get('TOKEN_EXPIRED').subscribe((response: string) => {
              this.toast.error(response);
            });

            this.store.dispatch(new fromAuth.Logout());
          }
        );
    });
  }
}
