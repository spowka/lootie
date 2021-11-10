import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromLayout from 'src/app/@store/layout';
import { Observable } from 'rxjs';

import { NavbarItem } from 'src/app/shared/models';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss']
})
export class RewardsComponent implements OnInit {
  public isMobile$: Observable<boolean>;

  currentUrl$: Observable<string>;

  public navItems: NavbarItem[] = [
    { url: '/rewards', title: 'Community Rewards', icon: 'assets/images/icons/reward.svg' },
    { url: '/mysterybox/daily', title: 'Daily Box', icon: 'assets/images/icons/daily-case.svg' },
  ];

  constructor(private store: Store<fromRoot.State>, private titleService: Title) {
    this.isMobile$ = this.store.pipe(select(fromLayout.selectIsMobile));
    this.currentUrl$ = this.store.pipe(select(fromRoot.selectgetActiveUrl));

    this.titleService.setTitle('Rewards | Social Media Interactions for Lootie Cash');
  }

  ngOnInit() {
  }

}
