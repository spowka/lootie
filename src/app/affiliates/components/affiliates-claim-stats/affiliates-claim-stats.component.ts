import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromAffiliates from 'src/app/affiliates/@store/affiliates';
import * as fromAuthSelector from 'src/app/auth/@store/auth/auth.selector';
import * as fromLayoutSelector from 'src/app/@store/layout/layout.selector';

import { ReferralInfoModel } from 'src/app/affiliates/models';
import { Title } from '@angular/platform-browser';
import { User } from 'src/app/auth/models';

@Component({
  selector: 'app-affiliates-claim-stats',
  templateUrl: './affiliates-claim-stats.component.html',
  styleUrls: ['./affiliates-claim-stats.component.scss']
})
export class AffiliatesClaimStatsComponent implements OnInit {
  public referralInfo$: Observable<ReferralInfoModel>;

  public user$: Observable<User>;

  public isMobile$: Observable<boolean>;

  public isDesktop$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>, private titleService: Title) {
    this.referralInfo$ = this.store.pipe(select(fromAffiliates.selectReferralInfo));
    this.user$ = this.store.pipe(select(fromAuthSelector.selectUser));
    this.isMobile$ = this.store.pipe(select(fromLayoutSelector.selectIsMobile));
    this.isDesktop$ = this.store.pipe(select(fromLayoutSelector.selectIsDesktop));

    this.store.dispatch(new fromAffiliates.LoadReferralInfo());

    this.titleService.setTitle('My Affilates | Lootie');
  }

  ngOnInit() {
  }

  claimEarnings(): void {
    this.store.dispatch(new fromAffiliates.ClaimEarnings());
  }


}
