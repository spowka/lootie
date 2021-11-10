import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { takeUntil, skip } from 'rxjs/operators';
import * as fromAuth from 'src/app/auth/@store';
import * as fromRoot from 'src/app/@store';
import * as fromHistory from 'src/app/@store/history';

import { User } from 'src/app/auth/models';
import { Pagination } from 'src/app/shared/models';
import { UpgradingModel } from 'src/app/upgrade/models';

@Component({
  selector: 'app-upgrades',
  templateUrl: './upgrades.component.html',
  styleUrls: ['./upgrades.component.scss']
})
export class UpgradesComponent implements OnInit, OnDestroy {
  public upgrades: UpgradingModel[] = [];

  public loading$: Observable<boolean>;

  public pagination: Pagination;

  private user$: Observable<User>;

  private userId: string;

  private _upgrades$: Observable<UpgradingModel[]>;

  private unsubscribe$: Subject<void> = new Subject();

  constructor(private store: Store<fromRoot.State>) {
    this.user$ = this.store.pipe(select(fromAuth.selectUser));
    this._upgrades$ = this.store.pipe(select(fromHistory.selectUpgrades));
    this.loading$ = this.store.pipe(select(fromHistory.selectLoading));

    this.user$.pipe(takeUntil(this.unsubscribe$))
      .subscribe(user => {
        if (!user) {
          return;
        }

        this.userId = user._id;
        this.pagination = { limit: 10, offset: 0 };
        this.loadUpgrades();
      });

    this._upgrades$.pipe(takeUntil(this.unsubscribe$), skip(1))
      .subscribe(upgrades => {
        if (!upgrades) {
          return;
        }

        upgrades.map(upgrade => this.upgrades.push(upgrade));
      });
  }

  ngOnInit() {
  }

  onScroll() {
    this.pagination = {
      limit: this.pagination.limit,
      offset: this.pagination.offset + 1,
    };

    this.loadUpgrades();
  }

  loadUpgrades() {
    this.store.dispatch(new fromHistory.LoadUpgrades({
      userId: this.userId,
      pagination: this.pagination,
    }));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
