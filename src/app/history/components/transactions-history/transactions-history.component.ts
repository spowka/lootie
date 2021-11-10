import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pagination, DepositModel } from 'src/app/shared/models';
import { Observable, Subject } from 'rxjs';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromLayout from 'src/app/@store/layout';
import * as fromAuth from 'src/app/auth/@store';
import * as fromHistory from 'src/app/@store/history';

import { User } from 'src/app/auth/models';
import { takeUntil, skip } from 'rxjs/operators';

@Component({
  selector: 'app-transactions-history',
  templateUrl: './transactions-history.component.html',
  styleUrls: ['./transactions-history.component.scss'],
})
export class TransactionsHistoryComponent implements OnInit, OnDestroy {
  public isMobile$: Observable<boolean>;

  public transactions: DepositModel[] = [];

  public loading$: Observable<boolean>;

  public pagination: Pagination;

  private user$: Observable<User>;

  public _transactions$: Observable<DepositModel[]>;

  public loadingData: boolean;

  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private store: Store<fromRoot.State>
  ) {
    this.isMobile$ = this.store.pipe(select(fromLayout.selectIsMobile));
    this.user$ = this.store.pipe(select(fromAuth.selectUser));
    this._transactions$ = this.store.pipe(select(fromHistory.selectDeposits));
    this.loading$ = this.store.pipe(select(fromHistory.selectLoading));
    this.pagination = { limit: 10, offset: 0 };
    this.loadingData = true;

    this._transactions$.pipe(
      takeUntil(this.unsubscribe$),
      skip(1)
    ).subscribe(transactions => {
      if (!transactions) {
        this.loadingData = false;
        return;
      }

      transactions.map(transaction => this.transactions.push(transaction));
      this.loadingData = false;
    });
  }

  ngOnInit() {
    this.loadTransactions();
  }

  public onScroll(): void {
    this.pagination = {
      limit: this.pagination.limit,
      offset: this.pagination.offset + 1,
    };

    this.loadTransactions();
  }

  public loadTransactions(): void {
    this.store.dispatch(new fromHistory.LoadDeposits({
      pagination: this.pagination,
    }));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
