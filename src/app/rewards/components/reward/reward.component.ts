import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
declare var FB: any;

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromAuth from 'src/app/auth/@store';
import * as fromRewards from 'src/app/rewards/@store';

import { User } from 'src/app/auth/models/user-profile';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnInit {
  public user$: Observable<User>;

  public refCode: FormControl;

  public discordToken: string;

  public facebookSignedRequest = false;

  public twitterSignedRequest = false;

  public twitterToken: string;

  constructor(private store: Store<fromRoot.State>, private router: Router) {
    this.user$ = this.store.pipe(select(fromAuth.selectUser));

    this.refCode = new FormControl('', Validators.compose([Validators.minLength(4), Validators.maxLength(10), Validators.required]));
  }

  ngOnInit() {
    const routerUrl = this.router.url;

    if (routerUrl.includes('discord')) {
      const queryParamsStr = routerUrl.split('#')[1];
      if (queryParamsStr && queryParamsStr.includes('access_token')) {
        const queryParams = new HttpParams({ fromString: queryParamsStr });
        this.discordToken = queryParams.get('access_token');
      }
    } else if (routerUrl.includes('twitter')) {

    }

    (window as any).fbAsyncInit = function () {
      FB.init({
        appId: '2632466226785089',
        cookie: true,
        xfbml: true,
        version: 'v3.1'
      });
      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      let js; const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  redeemCode(): void {
    if (this.refCode.invalid) {
      return;
    }

    this.store.dispatch(new fromAuth.ApplyReferralCode(this.refCode.value));
    this.router.navigate(['/mysterybox/free']);
  }

  openTwitter(): void {
    setTimeout(_ => {
      this.twitterSignedRequest = true;
    }, 10000);
    window.open('https://twitter.com/LootieCom', '_blank');
  }

  openFacebook(): void {
    setTimeout(_ => {
      this.facebookSignedRequest = true;
    }, 10000);
    window.open('https://www.facebook.com/LootieCom/', '_blank');
  }

  joinDiscord(): void {
    window.location.href = environment.discordApiUrl;
  }

  claimEmail(): void {
    this.store.dispatch(new fromRewards.ClaimEmail());
  }

  claimDiscord(): void {
    if (!this.discordToken) {
      return;
    }

    this.store.dispatch(new fromRewards.ClaimDiscord(this.discordToken));
    delete this.discordToken;
  }

  claimFacebook(): void {
    if (!this.facebookSignedRequest) {
      return;
    }

    this.store.dispatch(new fromRewards.ClaimFacebook());
    delete this.facebookSignedRequest;
  }

  claimTwitter(): void {
    if (!this.twitterSignedRequest) {
      return;
    }

    this.store.dispatch(new fromRewards.ClaimTwitter());
    delete this.twitterSignedRequest;
  }

  subscribe(): void {

  }

}
