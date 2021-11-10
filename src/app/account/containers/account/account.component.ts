import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable, Subject, fromEvent } from 'rxjs';
import { take, tap, debounceTime, takeLast, takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatMenuTrigger, MatSelect } from '@angular/material';
import { JwtHelperService } from '@auth0/angular-jwt';
import { pickBy, identity } from 'lodash';

import { select, Store } from '@ngrx/store';
import * as fromAuth from 'src/app/auth/@store';
import * as fromRoot from 'src/app/@store';
import * as fromRouter from 'src/app/@store/router';
import * as fromLayout from 'src/app/@store/layout';
import { AuthService } from 'src/app/auth/services/auth.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tradeUrlValidator } from 'src/app/shared/utils/trade-url.validator';

import { User, ShippingCountry } from 'src/app/auth/models';

import { AuthDialogComponent } from 'src/app/core/components';
import { Title } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {

  public user$: Observable<User>;

  public isMobile$: Observable<boolean>;

  public isTablet$: Observable<boolean>;

  public isDesktop$: Observable<boolean>;

  currentUrl$: Observable<string>;

  public shippingAddressForm: FormGroup;

  // public steamTradeUrl: FormControl;

  public isScroll = false;

  public shippingCountries$: Observable<ShippingCountry[]>;

  public readonly countries = [
    { code: 'Canada', title: 'Canada (CA)' },
    { code: 'France', title: 'France (FR)' },
    { code: 'United States', title: 'United States (US)' }
  ];

  public readonly states = [
    { code: 'СA', title: 'California' },
    { code: 'FL', title: 'Florida' },
    { code: 'WA', title: 'Washington' }
  ];

  public readonly steps = [
    { label: 'Item Shipped', date: '' },
    { label: 'Berlin, Germany', date: '' },
    { label: 'Vienna, Austria', date: '' },
    { label: 'Estimated Delivery', date: '' }
  ];

  public readonly avatars = [...Array(30).keys()].map(
    i => `https://www.lootie.com/assets/images/profile/male-${i + 1}.svg`
  );

  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private store: Store<fromRoot.State>,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private dialog: MatDialog,
    private titleService: Title,
    public datepipe: DatePipe
  ) {
    this.user$ = this.store.pipe(select(fromAuth.selectUser));
    this.isMobile$ = this.store.pipe(select(fromLayout.selectIsMobile));
    this.isTablet$ = this.store.pipe(select(fromLayout.selectIsTablet));
    this.isDesktop$ = this.store.pipe(select(fromLayout.selectIsDesktop));
    this.shippingCountries$ = this.store.pipe(
      select(fromAuth.selectShippingCountries)
    );
    this.currentUrl$ = this.store.pipe(select(fromRoot.selectgetActiveUrl));

    this.titleService.setTitle('My Profile | Lootie');

    this.shippingAddressForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
      address: ['', Validators.compose([Validators.required, this.noWhitespaceValidator])],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.compose([Validators.required, this.noWhitespaceValidator])],
      province: ['', Validators.compose([Validators.required, this.noWhitespaceValidator])]
    });

    // this.steamTradeUrl = new FormControl('', Validators.required);

    this.store.dispatch(new fromAuth.GetShippingCountries());

    this.user$.pipe(take(1))
      .subscribe(user => {
        if (!user) {
          return this.route.queryParams.subscribe(params => {
            const token = params.token;
            const refreshToken = params.refreshToken;
            const destination = params.destination;
            const isNew = params.new;

            if (token && !(new JwtHelperService().isTokenExpired(token))) {
              this.authService.setToken(token);
              this.authService.setRefreshToken(refreshToken);
              this.authService.updateUserInfo().subscribe(res => {
                if (res['data']) {
                  this.authService.setUser(res['data']);
                  this.store.dispatch(new fromAuth.AuthCheck());
                }

                if (isNew) {
                  const boxId = localStorage.getItem('boxId');

                  if (boxId) {
                    const boxName = localStorage.getItem('boxName');

                    window.analytics.identify(user._id, pickBy(
                      {
                        email: user.email,
                        username: user.username,
                        name: user.username,
                        SignupMethod: 'Facebook ID',
                        SignupDate: this.datepipe.transform(user.createdAt, 'MMM d, y, h:mm:ss a'),
                        TotalDepositAmount: user.depositedValue,
                        ReferralsCount: user.referredUserCount,
                        FreeBoxCode: user.referredCode,
                      },
                      identity,
                    ));

                    window.analytics.track('Registration', {
                      SignupMethod: 'Facebook ID',
                      SignupDate: this.datepipe.transform(user.createdAt, 'MMM d, y, h:mm:ss a'),
                      BoxIDLedToSignup: boxId,
                      BoxNameLedToSignup: boxName,
                    });
                  }
                } else {
                  window.analytics.identify(user._id, pickBy(
                    {
                      email: user.email,
                      username: user.username,
                      name: user.username,
                      phone: user.shippingAddress? user.shippingAddress.phoneNumber : '',
                      LoginMethod: 'facebook',
                      LoginCount: user.loggedCount,
                      TotalDepositAmount: user.depositedValue,
                      ReferralsCount: user.referredUserCount,
                      FreeBoxCode: user.referredCode,
                    },
                    identity,
                  ));
                  window.analytics.track('Login', pickBy(
                    {
                      email: user.email,
                      userName: user.username,
                      name: user.username,
                      TotalDepositAmount: user.depositedValue,
                      LoginMethod: 'facebook',
                      LoginCount: user.loggedCount,
                      ReferralsCount: user.referredUserCount,
                      FreeBoxCode: user.referredCode,
                    },
                    identity,
                  ));
                }
              });
              if (destination) {
                this.store.dispatch(new fromRouter.Go({ path: [destination] }));
              }
            } else {
              this.store.dispatch(new fromRouter.Go({ path: ['/'] }));
              AuthDialogComponent.show(this.dialog, 'login');
            }
          });
        }

        if (this.authService.isTokenExpired()) {
          return this.store.dispatch(new fromAuth.Logout());
        }

        if (user.shippingAddress) {
          this.shippingAddressForm.patchValue(
            {
              firstName: user.shippingAddress.firstName,
              lastName: user.shippingAddress.lastName,
              phoneNumber: user.shippingAddress.phoneNumber,
              address: user.shippingAddress.address,
              address2: user.shippingAddress.address,
              postalCode: user.shippingAddress.postalCode,
              country: user.shippingAddress.country,
              city: user.shippingAddress.city,
              province: user.shippingAddress.province
            },
            { emitEvent: false }
          );
        }

        // if (user.steam) {
        //   this.steamId = user.steam.id;

        //   if (user.steam.tradeUrl) {
        //     this.steamTradeUrl.setValue(user.steam.tradeUrl, { emitEvent: false });
        //   }
        // }
      });

    // this.steamTradeUrl.valueChanges.pipe(
    //   debounceTime(1000),
    //   distinctUntilChanged()
    // ).subscribe(() => {
    //   if (this.steamTradeUrl.invalid) {
    //     return;
    //   }

    //   this.updateTradeUrl();
    // });
  }

  ngOnInit() { }

  // toStreamProfile(): void {
  //   if (!this.steamId) {
  //     return;
  //   }

  //   window.open(`https://steamcommunity.com/profiles/${this.steamId}/tradeoffers/privacy`, '_blank');
  // }

  openedChange(isOpen: boolean): void {
    this.isMobile$.pipe(takeUntil(this.unsubscribe$)).subscribe(isMobile => {
      if (isMobile && isOpen) {
        return this.store.dispatch(new fromLayout.DisableLayoutScroll());
      }
      this.store.dispatch(new fromLayout.EnableLayoutScroll());
    });
  }

  public noWhitespaceValidator(control: FormGroup) {
    if (!control.value) {
      return { 'whitespace': true };
    }

    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  updateShippingAddress(): void {
    if (this.shippingAddressForm.invalid) {
      return;
    }

    this.store.dispatch(
      new fromAuth.UpdateShippingAddress(this.shippingAddressForm.value)
    );
  }

  // updateTradeUrl(): void {
  //   if (this.steamTradeUrl.invalid) {
  //     return;
  //   }

  //   this.store.dispatch(new fromAuth.UpdateTradeUrl(this.steamTradeUrl.value));
  // }

  fillInAddress(location_obj) {
    if (!location_obj) {
      const city = this.shippingAddressForm.value.city;
      if (!city || city.length === 0) {
        this.shippingAddressForm.controls['city'].setErrors({ 'incorrect': true });
      }
      return;
    }

    this.shippingAddressForm.patchValue(location_obj);
  }

  onChooseAvatar(url: string): void {
    if (!url) {
      return;
    }

    this.store.dispatch(new fromAuth.UpdateUserAvatar(url));
  }

  signOut(): void {
    this.store.dispatch(new fromAuth.Logout());
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
