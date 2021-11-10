import { Component, EventEmitter, OnInit, Input, Output, AfterContentInit, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import * as fromRoot from 'src/app/@store';
import * as fromAuth from 'src/app/auth/@store';
import * as fromLayout from 'src/app/@store/layout';
import * as fromCases from 'src/app/cases/@store';

import { User } from 'src/app/auth/models';
import { ClaimAndStatsItem } from 'src/app/shared/models/index';
import { CaseModel } from 'src/app/cases/models';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-claim-and-stats',
  templateUrl: './claim-and-stats.component.html',
  styleUrls: ['./claim-and-stats.component.scss']
})
export class ClaimAndStatsComponent implements OnInit, OnDestroy {
  @Input() claimAndStats: ClaimAndStatsItem[];

  @Output() claim: EventEmitter<any> = new EventEmitter();

  public user$: Observable<User>;

  public isMobile$: Observable<boolean>;

  private _myCases$: Observable<any>;

  public myCases: CaseModel[] = [];

  private unsubscribe$: Subject<void> = new Subject();

  public countUpOptions = {
    startVal: 0,
    decimalPlaces: 2,
    duration: 5,
    prefix: '$ '
  };

  constructor(private store: Store<fromRoot.State>) {
    this.user$ = this.store.pipe(select(fromAuth.selectUser));
    this.isMobile$ = this.store.pipe(select(fromLayout.selectIsMobile));
    this._myCases$ = this.store.pipe(select(fromCases.selectMyCases_));

    this._myCases$.pipe(takeUntil(this.unsubscribe$)).subscribe(cases => {
      this.myCases.push(cases);
    });
  }

  ngOnInit() {}

  claimEarnings(): void {
    this.claim.emit();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
