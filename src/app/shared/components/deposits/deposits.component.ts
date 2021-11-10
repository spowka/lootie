import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { takeUntil, skip } from 'rxjs/operators';
import * as fromRoot from 'src/app/@store';
import * as fromHistory from 'src/app/@store/history';
import * as fromLayout from 'src/app/@store/layout';

import { Pagination, DepositModel } from 'src/app/shared/models';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-deposits',
  templateUrl: './deposits.component.html',
  styleUrls: ['./deposits.component.scss']
})

export class DepositsComponent implements OnInit, OnDestroy {
  public deposits: DepositModel[] = [];

  public loading$: Observable<boolean>;

  public pagination: Pagination;

  public isMobile$: Observable<boolean>;

  public _deposits$: Observable<DepositModel[]>;

  public loadingData: boolean;

  private unsubscribe$: Subject<void> = new Subject();

  constructor(private store: Store<fromRoot.State>, private titleService: Title) {
    this.loadingData = true;
    this._deposits$ = this.store.pipe(select(fromHistory.selectDeposits));
    this.loading$ = this.store.pipe(select(fromHistory.selectLoading));
    this.isMobile$ = this.store.pipe(select(fromLayout.selectIsMobile));

    this.titleService.setTitle('History | Lootie');

    this.pagination = { limit: 10, offset: 0 };
    this.loadDeposits();

    this._deposits$.pipe(takeUntil(this.unsubscribe$), skip(1))
      .subscribe(deposits => {
        if (!deposits) {
          this.loadingData = false;
          return;
        }

        this.deposits = this.deposits.concat(deposits);
        this.loadingData = false;
      });
  }

  ngOnInit() {
  }

  onScroll() {
    this.pagination = {
      limit: this.pagination.limit,
      offset: this.pagination.offset + 1,
    };

    this.loadDeposits();
  }

  loadDeposits() {
    this.store.dispatch(new fromHistory.LoadDeposits({
      transactionType: 'DEPOSIT',
      pagination: this.pagination,
    }));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
