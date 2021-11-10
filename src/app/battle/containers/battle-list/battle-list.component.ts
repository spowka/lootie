import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style, state, group } from '@angular/animations';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromLayout from 'src/app/@store/layout';
import * as fromBattles from 'src/app/battle/@store';

import { BattleModel, BattleTypes } from 'src/app/battle/models';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-battle-list',
  templateUrl: './battle-list.component.html',
  styleUrls: ['./battle-list.component.scss'],
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
export class BattleListComponent implements OnInit {
  public isChatOpened$: Observable<boolean>;
  public theme$: Observable<string>;
  public battles$: Observable<BattleModel[]>;
  public isMobile$: Observable<boolean>;
  public isLoading$: Observable<boolean>;
  public isLoaded$: Observable<boolean>;
  currentUrl$: Observable<string>;
  public isChecked = false;

  constructor(private store: Store<fromRoot.State>, private titleService: Title) {
    this.isChatOpened$ = this.store.pipe(select(fromLayout.selectChatOpened));
    this.theme$ = this.store.pipe(select(fromRoot.selectTheme));
    this.battles$ = this.store.pipe(select(fromBattles.selectBattles));
    this.isMobile$ = this.store.pipe(select(fromLayout.selectIsMobile));
    this.isLoading$ = this.store.pipe(select(fromBattles.selectLoading));
    this.isLoaded$ = this.store.pipe(select(fromBattles.selectLoaded));
    this.currentUrl$ = this.store.pipe(select(fromRoot.selectgetActiveUrl));

    this.titleService.setTitle(
      'Mystery Battles | Lootie'
    );
  }

  ngOnInit() {
    this.store.dispatch(new fromBattles.LoadBattles({type: BattleTypes.list}));
  }

  onChange(newValue) {
    this.store.dispatch(new fromBattles.SetBattleSort(newValue ? 'createdAt' : 'price'));
  }

  identifyItem(index, item) {
    return item._id;
  }
}
