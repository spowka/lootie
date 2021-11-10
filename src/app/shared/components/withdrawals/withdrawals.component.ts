import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { takeUntil, skip } from 'rxjs/operators';
import * as fromRoot from 'src/app/@store';
import * as fromHistory from 'src/app/@store/history';

import { Pagination } from 'src/app/shared/models';
import { WithdrawalsModel } from 'src/app/withdraw/models';

@Component({
  selector: 'app-withdrawals',
  templateUrl: './withdrawals.component.html',
  styleUrls: ['./withdrawals.component.scss']
})
export class WithdrawalsComponent implements OnInit, OnDestroy {
  public withdrawals: WithdrawalsModel[] = [];

  public loading$: Observable<boolean>;

  public pagination: Pagination;

  public _withdrawals$: Observable<WithdrawalsModel[]>;

  private unsubscribe$: Subject<void> = new Subject();

  constructor(private store: Store<fromRoot.State>) {
    this._withdrawals$ = this.store.pipe(select(fromHistory.selectWithdrawals));
    this.loading$ = this.store.pipe(select(fromHistory.selectLoading));

    this.pagination = { limit: 10, offset: 0 };
    this.loadWithdrawals();

    this._withdrawals$.pipe(takeUntil(this.unsubscribe$), skip(1))
      .subscribe(withdrawals => {
        if (!withdrawals) {
          return;
        }

        withdrawals.map(withdrawal => this.withdrawals.push(withdrawal));
      });
  }

  ngOnInit() {
  }

  onScroll() {
    this.pagination = {
      limit: this.pagination.limit,
      offset: this.pagination.offset + 1,
    };

    this.loadWithdrawals();
  }

  loadWithdrawals() {
    this.store.dispatch(new fromHistory.LoadWithdrawals({
      pagination: this.pagination,
    }));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
