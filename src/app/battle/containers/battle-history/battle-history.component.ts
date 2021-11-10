import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, animate, style, state, group } from '@angular/animations';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, skip } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromRouter from 'src/app/@store/router';
import * as fromLayout from 'src/app/@store/layout';
import * as fromBattles from 'src/app/battle/@store';

import { BattleModel, BattleTypes } from 'src/app/battle/models';
import { Pagination } from 'src/app/shared/models';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-battle-history',
  templateUrl: './battle-history.component.html',
  styleUrls: ['./battle-history.component.scss'],
  animations: [
    trigger('fadeUp', [
      state('in', style({ height: '*', opacity: 0 })),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),

        group([
          animate('1s', style({ height: 0 })),
          animate('500ms 500ms ease-in-out', style({ opacity: '0' })),
        ]),
      ]),
      transition(':enter', [
        style({ height: '0', opacity: 0 }),

        group([
          animate('1s', style({ height: '*' })),
          animate('500ms 500ms ease-in-out', style({ opacity: '1' })),
        ]),
      ]),
    ]),
  ],
})
export class BattleHistoryComponent implements OnInit {
  public battleTypes = BattleTypes;
  public isChatOpened$: Observable<boolean>;
  public theme$: Observable<string>;
  public isMobile$: Observable<boolean>;
  public isTablet$: Observable<boolean>;
  public battleType: string;
  public battles$: Observable<BattleModel[]>;
  public isLoading$: Observable<boolean>;
  public isLoaded$: Observable<boolean>;
  currentUrl$: Observable<string>;
  public isChecked = true;

  public isScrollDisabled = false;
  public pagination: Pagination;
  public initialLimit: number;

  public battles: BattleModel[] = [];

  private unsubscribe$: Subject<void> = new Subject();

  constructor(private store: Store<fromRoot.State>, private router: Router, private titleService: Title) {
    this.isChatOpened$ = this.store.pipe(select(fromLayout.selectChatOpened));
    this.theme$ = this.store.pipe(select(fromRoot.selectTheme));
    this.battleType =
      this.router.url.indexOf('/finished') > -1 ? BattleTypes.history : BattleTypes.mine;
    this.battles$ = this.store.pipe(select(fromBattles.selectBattles));
    this.isMobile$ = this.store
      .pipe(select(fromLayout.selectIsMobile));
    this.isTablet$ = this.store.pipe(select(fromLayout.selectIsTablet));
    this.isLoading$ = this.store.pipe(select(fromBattles.selectLoading));
    this.isLoaded$ = this.store.pipe(select(fromBattles.selectLoaded));
    this.currentUrl$ = this.store.pipe(select(fromRoot.selectgetActiveUrl));

    this.titleService.setTitle(
      'Mystery Battles | History Battle | Lootie'
    );

    this.pagination = { limit: 10, offset: 0 };
    this.initialLimit = 10;

    this.battles$.pipe(takeUntil(this.unsubscribe$)).subscribe(_battles => {
      _battles.filter(bl => bl.status === 'COMPLETED').map(_battle => this.battles.push(_battle));
    });

    this.loadBattleHistory();
  }

  ngOnInit() {
    this.store.dispatch(new fromBattles.SetUrlFrom(this.router.url));
  }

  onScroll() {
    this.pagination = {
      limit: this.pagination.limit,
      offset: this.pagination.offset + 1
    };

    this.loadBattleHistory();
  }

  loadBattleHistory() {
    this.store.dispatch(new fromBattles.LoadBattles({
      type: this.battleType,
      pagination: this.pagination
    }));
  }

  goBack() {
    this.router.navigate(['battle']);
    this.store.dispatch(new fromBattles.SetUrlFrom('battle'));
  }

  identifyItem(index, item) {
    return item._id;
  }
}
