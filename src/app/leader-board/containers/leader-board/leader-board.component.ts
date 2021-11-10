import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject, Observable } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';
import { Pagination, LeaderBoardDataItem, LeaderBoardModel } from 'src/app/shared/models';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromRouter from 'src/app/@store/router';
import * as fromLeaderBoard from 'src/app/leader-board/@store/leader-board';

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.scss'],
})
export class LeaderBoardComponent implements OnInit, OnDestroy {
  public leaderBoardMonthlyTopDrop$: Observable<LeaderBoardModel>;

  public leadersItems: LeaderBoardDataItem[];

  public isLoading$: Observable<boolean>;

  public pagination: Pagination;

  public endDate: string;

  private unsubscribe$: Subject<void> = new Subject();

  constructor(private store: Store<fromRoot.State>) {
    this.isLoading$ = this.store.pipe(select(fromLeaderBoard.selectLoading));
    this.leaderBoardMonthlyTopDrop$ = this.store.pipe(select(fromLeaderBoard.selectLeaderBoardMonthlyTopDrop));

    this.pagination = { limit: 10, offset: 0 };
    this.loadLeaderBoard();
    this.store.dispatch(
      new fromLeaderBoard.LoadLeaderBoardMonthlyTopDrop({
        pagination: this.pagination
      })
    );

    this.leaderBoardMonthlyTopDrop$
      .pipe(
        skip(1),
        takeUntil(this.unsubscribe$)
      ).subscribe((leaders: LeaderBoardModel) => {
        if (leaders && leaders.endDate) {
          this.endDate = leaders.endDate;
        }
        if (leaders && leaders.topdrops) {
          this.leadersItems = leaders.topdrops.filter((leader) => {
            if (
              leader.ranking === 1 ||
              leader.ranking === 2 ||
              leader.ranking === 3
            ) {
              return leader;
            }
          });
        }
      });
  }

  ngOnInit() {}

  public onLoadLeaderBoard(): void {
    this.pagination = {
      limit: this.pagination.limit,
      offset: this.pagination.offset + 1,
    };

    this.loadLeaderBoard();
  }

  public loadLeaderBoard(): void {
    this.store.dispatch(
      new fromLeaderBoard.LoadLeaderBoardMonthlyTopDrop({
        pagination: this.pagination,
      })
    );
  }

  public goBack(): void {
    this.store.dispatch(new fromRouter.Back());
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
