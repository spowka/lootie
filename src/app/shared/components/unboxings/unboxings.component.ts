import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { takeUntil, skip, take } from 'rxjs/operators';
import * as fromAuth from 'src/app/auth/@store';
import * as fromRoot from 'src/app/@store';
import * as fromLayout from 'src/app/@store/layout';
import * as fromHistory from 'src/app/@store/history';
import * as fromRouter from 'src/app/@store/router';

import { User } from 'src/app/auth/models';
import { Pagination } from 'src/app/shared/models';
import { CaseUnboxingModel } from 'src/app/cases/models';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogVerifyComponent } from '../dialog-verify/dialog-verify.component';

@Component({
  selector: 'app-unboxings',
  templateUrl: './unboxings.component.html',
  styleUrls: ['./unboxings.component.scss']
})
export class UnboxingsComponent implements OnInit, OnDestroy {
  public isMobile$: Observable<boolean>;

  public isTablet$: Observable<boolean>;

  public isVerifyModalOpened$: Observable<boolean>;

  public unboxings: CaseUnboxingModel[] = [];

  public loading$: Observable<boolean>;

  public pagination: Pagination;

  public isHistory: boolean;

  private user$: Observable<User>;

  private userId: string;

  public _unboxings$: Observable<CaseUnboxingModel[]>;

  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private store: Store<fromRoot.State>,
    public dialog: MatDialog,
    private readonly router: Router
  ) {
    this.user$ = this.store.pipe(select(fromAuth.selectUser));
    this._unboxings$ = this.store.pipe(select(fromHistory.selectUnboxings));
    this.loading$ = this.store.pipe(select(fromHistory.selectLoading));
    this.isMobile$ = this.store.pipe(select(fromLayout.selectIsMobile));
    this.isTablet$ = this.store.pipe(select(fromLayout.selectIsTablet));
    this.isVerifyModalOpened$ = this.store.pipe(select(fromRoot.selectVerifyModalOpened));

    this.user$.pipe(takeUntil(this.unsubscribe$))
      .subscribe(user => {
        if (!user) {
          return;
        }

        this.userId = user._id;
        this.pagination = { limit: 10, offset: 0 };
        this.loadUnboxings();
      });

    router.events.pipe(takeUntil(this.unsubscribe$)).subscribe(event => {
      if (event instanceof NavigationEnd) {
        (event.urlAfterRedirects === '/history/unboxings') ?
          this.isHistory = true :
          this.isHistory = false;
      }
    });

    this._unboxings$.pipe(takeUntil(this.unsubscribe$), skip(1))
      .subscribe(unboxings => {
        if (!unboxings) {
          return;
        }

        unboxings.map(unboxing => this.unboxings.push(unboxing));
      });
  }

  ngOnInit() {
    this.isVerifyModalOpened$.pipe(takeUntil(this.unsubscribe$))
    .subscribe(opened => {
      if (opened) {
        DialogVerifyComponent.show(this.dialog, this.unboxings);
      }
    });
  }

  onScroll() {
    this.pagination = {
      limit: this.pagination.limit,
      offset: this.pagination.offset + 1,
    };

    this.loadUnboxings();
  }

  loadUnboxings() {
    this.store.dispatch(new fromHistory.LoadUnboxings({
      userId: this.userId,
      pagination: this.pagination,
    }));
  }

  openModalVerify(id: string) {
    this.store.dispatch(new fromHistory.UnboxingId(id));
    this.store.dispatch(new fromRoot.OpenVerifyModal());
  }

  goBack() {
    this.store.dispatch(new fromRouter.Back());
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
