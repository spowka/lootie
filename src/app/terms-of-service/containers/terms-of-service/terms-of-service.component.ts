import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromAuth from 'src/app/auth/@store';
import * as fromLayout from 'src/app/@store/layout';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/models/user-profile';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-terms-of-service',
  templateUrl: './terms-of-service.component.html',
  styleUrls: ['./terms-of-service.component.scss']
})
export class TermsOfServiceComponent implements OnInit {
  public user$: Observable<User>;
  public isAuthenticated$: Observable<boolean>;
  public isMobile$: Observable<boolean>;
  currentUrl$: Observable<string>;

  constructor(private store: Store<fromRoot.State>, private titleService: Title) {
    this.user$ = this.store.pipe(select(fromAuth.selectUser));
    this.isAuthenticated$ = this.store.pipe(select(fromAuth.selectIsLoggedIn));
    this.isMobile$ = this.store.pipe(select(fromLayout.selectIsMobile));
    this.currentUrl$ = this.store.pipe(select(fromRoot.selectgetActiveUrl));


    this.titleService.setTitle('Terms of Service | Lootie');
  }

  ngOnInit() {
  }

  decline(): void {
    this.store.dispatch(new fromAuth.ApproveTos(false));
  }

  accept(): void {
    this.store.dispatch(new fromAuth.ApproveTos(true));
  }
}
