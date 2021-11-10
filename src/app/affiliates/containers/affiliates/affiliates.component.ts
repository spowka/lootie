import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromAuth from 'src/app/auth/@store';
import * as fromLayout from 'src/app/@store/layout';
import * as fromAffiliates from 'src/app/affiliates/@store/affiliates';
import { takeUntil } from 'rxjs/operators';

import { User } from 'src/app/auth/models/user-profile';
import { ReferralInfoModel } from 'src/app/affiliates/models';
import { config as afConfig } from 'src/app/affiliates/affiliates-constants';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-affiliates',
  templateUrl: './affiliates.component.html',
  styleUrls: ['./affiliates.component.scss']
})
export class AffiliatesComponent implements OnInit, OnDestroy {
  public referralInfo: ReferralInfoModel;

  public isMobile$: Observable<boolean>;

  public isDesktop$: Observable<boolean>;

  public loading$: Observable<boolean>;

  currentUrl$: Observable<string>;

  public referralCode: FormControl;

  public referralEmail: FormControl;

  public referrerLink = '';

  public hoveredIndex: number;

  public user$: Observable<User>;

  private refPercents = [
    { referral: 5000, percent: 100 },
    { referral: 1000, percent: 75 },
    { referral: 200, percent: 50 },
    { referral: 50, percent: 25 },
    { referral: 0, percent: 0 },
  ];

  private _referralInfo$: Observable<ReferralInfoModel>;

  private unsubscribe$: Subject<void> = new Subject();

  nextRefLevel: number;
  affiliatesProgress = 0;
  afConfig = afConfig;

  constructor(
    private store: Store<fromRoot.State>,
    private route: ActivatedRoute,
    private toast: ToastrService,
    private translate: TranslateService) {

    this.loading$ = this.store.pipe(select(fromAffiliates.selectLoading));
    this.isMobile$ = this.store.pipe(select(fromLayout.selectIsMobile));
    this.isDesktop$ = this.store.pipe(select(fromLayout.selectIsDesktop));
    this.user$ = this.store.pipe(select(fromAuth.selectUser));
    this._referralInfo$ = this.store.pipe(select(fromAffiliates.selectReferralInfo));
    this.currentUrl$ = this.store.pipe(select(fromRoot.selectgetActiveUrl));

    this.store.dispatch(new fromAffiliates.LoadReferralInfo());

    this.user$.pipe(takeUntil(this.unsubscribe$)).subscribe(user => {
      if (!user) {
        return;
      }

      if (user.referralCode) {
        this.referrerLink = `https://lootie.com/r/${user.referralCode}`;
      }

      this.referralCode = new FormControl(
        user.referralCode || '', Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(10),
          Validators.pattern(/^[0-9a-zA-Z$_-]+$/),
          Validators.required
        ])
      );
    });

    this.referralEmail = new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
    ]));

    this._referralInfo$.pipe(takeUntil(this.unsubscribe$)).subscribe(refInfo => {
      if (!refInfo) {
        return;
      }

      const totalReferrals = refInfo.personal.totalReferrals;

      const nearestReferralIndex = [...this.refPercents].findIndex(rp => rp.referral <= totalReferrals);

      const nearestReferral = this.refPercents[nearestReferralIndex].referral;
      const remainReferral = totalReferrals - nearestReferral;

      let resultPercent = this.refPercents[nearestReferralIndex].percent;

      if (this.refPercents[nearestReferralIndex - 1]) {
        resultPercent += (remainReferral / (this.refPercents[nearestReferralIndex - 1].referral - nearestReferral)) * 25;
      }

      this.referralInfo = refInfo;
      this.affiliatesProgress = 100 - resultPercent;
      this.nextRefLevel = this.getNextRefLevel();
    });
  }

  ngOnInit() {
  }

  createCode(): void {
    if (!this.referralCode.value || this.referralCode.value.length > 10 || this.referralCode.value.length < 4) {
      return;
    }

    this.store.dispatch(new fromAffiliates.CreateReferralCode(this.referralCode.value));
  }

  getNextRefLevel() {
    for (let i = 0; i < afConfig.refStages.length; i++) {
      if (afConfig.refStages[i] > this.referralInfo.personal.totalReferrals) {
        return i + 1;
      }
    }
  }

  sendInvitation(): void {
    if (this.referralEmail.invalid) {
      return;
    }

    this.store.dispatch(new fromAffiliates.SendInvite(this.referralEmail.value));
  }

  onCopySuccess() {
    this.translate.get('AFFILIATES.LINK_COPIED').subscribe((response: string) => {
      this.toast.success(response);
    });
    window.analytics.track('Referral Link Copied', {
      ReferralLink: this.referrerLink
    });
  }

  onCopyFailure() {
    this.translate.get('AFFILIATES.COPY_FAILED').subscribe((response: string) => {
      this.toast.error(response);
    });
  }

  onClaimEarnings(e): void {
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
