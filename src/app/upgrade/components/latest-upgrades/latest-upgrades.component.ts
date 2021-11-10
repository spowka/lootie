import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { modalAnimation } from 'src/app/shared/utils/animations';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { skip } from 'rxjs/operators';
import * as fromRoot from 'src/app/@store';
import * as fromLayout from 'src/app/@store/layout';
import * as fromUpgrade from 'src/app/upgrade/@store';

import { UpgradingModel } from 'src/app/upgrade/models';

@Component({
  selector: 'app-latest-upgrades',
  templateUrl: './latest-upgrades.component.html',
  styleUrls: ['./latest-upgrades.component.scss'],
  animations: [modalAnimation,
    trigger('newItemAnimation', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(400px)' }),
        animate('.3s ease-in-out', style({ transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class LatestUpgradesComponent implements OnInit {
  public isMobile$: Observable<boolean>;
  public isTablet$: Observable<boolean>;
  public isLaptop$: Observable<boolean>;
  public isDesktop$: Observable<boolean>;
  public isLatestUpgradesOpened$: Observable<boolean>;

  public latestUpgrades$: Observable<UpgradingModel[]>;

  constructor(private store: Store<fromRoot.State>) {
    this.isMobile$ = this.store.pipe(select(fromRoot.selectIsMobile));
    this.isTablet$ = this.store.pipe(select(fromRoot.selectIsTablet));
    this.isLaptop$ = this.store.pipe(select(fromRoot.selectIsLaptop));
    this.isDesktop$ = this.store.pipe(select(fromRoot.selectIsDesktop));
    this.latestUpgrades$ = this.store.pipe(skip(1), select(fromUpgrade.selectUpgrades));
    this.isLatestUpgradesOpened$ = this.store.pipe(select(fromLayout.selectLatestUpgradesOpened));

    this.store.dispatch(new fromUpgrade.LoadUpgrades());
  }

  ngOnInit() { }

  closeLatestUpgrades(): void {
    this.store.dispatch(new fromLayout.ToggleLatestUpgrades());
  }

}
