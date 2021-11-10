import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import * as fromRoot from 'src/app/@store';
import * as fromLayout from 'src/app/@store/layout';
import * as fromRouter from 'src/app/@store/router';
import * as fromCases from 'src/app/cases/@store';
import { skip, takeUntil } from 'rxjs/operators';

import { ClaimAndStatsItem, Pagination } from 'src/app/shared/models/index';
import { CaseModel } from 'src/app/cases/models';

@Component({
  selector: 'app-my-cases',
  templateUrl: './my-cases.component.html',
  styleUrls: ['./my-cases.component.scss']
})
export class MyCasesComponent implements OnInit, OnDestroy {
  public myCases: CaseModel[] = [];

  public totalCount = 0;

  public myCasesClaimAndStats: ClaimAndStatsItem[] = [];

  public isMobile$: Observable<boolean>;

  public loading$: Observable<boolean>;

  public pagination: Pagination;

  private _myCases$: Observable<{ cases: CaseModel[], totalCount: number }>;

  currentUrl$: Observable<string>;

  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private router: Router,
    private store: Store<fromRoot.State>,
    private titleService: Title
  ) {
    this.pagination = { limit: 12, offset: 0 };
    this.loadMyCases();

    this._myCases$ = this.store.pipe(select(fromCases.selectMyCases));
    this.loading$ = this.store.pipe(select(fromCases.selectLoading));
    this.isMobile$ = this.store.pipe(select(fromLayout.selectIsMobile));
    this.currentUrl$ = this.store.pipe(select(fromRoot.selectgetActiveUrl));

    this.titleService.setTitle('My Boxes | Lootie');

    this._myCases$
      .pipe(skip(1), takeUntil(this.unsubscribe$))
      .subscribe(caseInfo => {
        if (caseInfo) {
          caseInfo.cases.forEach(item => {
            const index = this.myCases.findIndex(_v => _v._id === item._id);
            (index < 0) ?
              this.myCases.push(item) :
              this.myCases.splice(index, 1, item);
          });
        }
        this.totalCount = caseInfo.totalCount;

        this.initClaimAndStats();
      });
  }

  public ngOnInit() { }

  public createCase(): void {
    this.router.navigate(['/mysterybox/create']);
  }

  public unboxCase(myCase: CaseModel): void {
    this.router.navigate(['mysterybox/unbox', myCase._id]);
  }

  public deleteCase(myCase: CaseModel): void {
    this.store.dispatch(new fromCases.DeleteCase(myCase._id));
    this.myCases = this.myCases.filter(c => c._id !== myCase._id);
  }

  public copyCase(): void {}

  public onClaimEarnings(e: Event): void {
    this.store.dispatch(new fromCases.ClaimEarnings());
  }

  public goBack() {
    this.store.dispatch(new fromRouter.Back());
  }

  private initClaimAndStats() {
    if (!this.myCases.length) {
      return [];
    }

    let totalUnboxes = 0;
    let biggestUnboxCount = this.myCases[0].unboxCounts;
    let popularCase = this.myCases[0].name;
    const totalCases = this.totalCount;

    this.myCases.map(myCase => {
      totalUnboxes += myCase.unboxCounts;
      if (myCase.unboxCounts > biggestUnboxCount) {
        biggestUnboxCount = myCase.unboxCounts;
        popularCase = myCase.name;
      }
    });

    this.myCasesClaimAndStats = [
      { title: 'CLAIM_AND_STATS.TOTAL_UNBOXES', value: totalUnboxes },
      { title: 'CLAIM_AND_STATS.POPULAR_BOX', value: totalUnboxes > 0 ? popularCase : 'CLAIM_AND_STATS.NO_POPULAR_BOX' },
      { title: 'CLAIM_AND_STATS.MY_BOXES', value: totalCases }
    ];
  }

  onScroll() {
    this.pagination = {
      limit: this.pagination.limit,
      offset: this.pagination.offset + 1
    };

    this.loadMyCases();
  }

  loadMyCases(): void {
    this.store.dispatch(
      new fromCases.LoadMyCases({
        pagination: this.pagination
      })
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
