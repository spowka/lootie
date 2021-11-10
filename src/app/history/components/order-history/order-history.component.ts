import { Component, OnInit, OnDestroy } from '@angular/core';
import { CasesService } from 'src/app/cases/services/cases.service';
import { Observable, Subject } from 'rxjs';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromLayout from 'src/app/@store/layout';
import * as fromAuth from 'src/app/auth/@store';
import * as fromHistory from 'src/app/@store/history';

import { Pagination } from 'src/app/shared/models';
import { takeUntil, skip } from 'rxjs/operators';
import { User } from 'src/app/auth/models';
import { WithdrawalsModel } from 'src/app/withdraw/models';

export enum OrderStatuses {
  pending = 'PENDING',
  ordered = 'ORDERED',
  shipped = 'SHIPPED',
}

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent implements OnInit, OnDestroy {
  public isMobile$: Observable<boolean>;

  public colors: string[] = [];

  public orders: WithdrawalsModel[] = [];

  public loading$: Observable<boolean>;

  public pagination: Pagination;

  private user$: Observable<User>;

  public statuses = OrderStatuses;

  public _orders$: Observable<WithdrawalsModel[]>;

  public loadingData: boolean;

  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private fromService: CasesService,
    private store: Store<fromRoot.State>
  ) {
    this.isMobile$ = this.store.pipe(select(fromLayout.selectIsMobile));
    this.user$ = this.store.pipe(select(fromAuth.selectUser));
    this._orders$ = this.store.pipe(select(fromHistory.selectWithdrawals));
    this.loading$ = this.store.pipe(select(fromHistory.selectLoading));
    this.pagination = { limit: 10, offset: 0 };
    this.loadingData = true;

    this._orders$.pipe(
      takeUntil(this.unsubscribe$),
      skip(1)
    ).subscribe(orders => {
      if (!orders) {
        this.loadingData = false;
        return;
      }

      this.orders = this.orders.concat(orders);
      this.colors = orders.map(() => this.fromService.generateColor());
      this.loadingData = false;
    });
  }

  ngOnInit() {
    this.loadOrders();
  }

  public onScroll(): void {
    this.pagination = {
      limit: this.pagination.limit,
      offset: this.pagination.offset + 1,
    };

    this.loadOrders();
  }

  public loadOrders(): void {
    this.store.dispatch(new fromHistory.LoadWithdrawals({
      pagination: this.pagination,
    }));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
