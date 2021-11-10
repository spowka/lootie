import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromLayout from 'src/app/@store/layout';

import { BattleModel, BattleStatuses } from 'src/app/battle/models';
import { CasesService } from 'src/app/cases/services/cases.service';
import { LayoutService } from 'src/app/@store/services/layout.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: '[app-battle-list-item]',
  templateUrl: './battle-list-item.component.html',
  styleUrls: ['./battle-list-item.component.scss'],
})
export class BattleListItemComponent implements OnInit {
  @Input() battle: BattleModel;
  @Input() finished: boolean;

  public colors: string[] = [];
  public battleStatuses = BattleStatuses;
  public isMobile$: Observable<boolean>;
  public isTablet$: Observable<boolean>;
  public theme$: Observable<string>;
  public platform: string;

  constructor(
    private store: Store<fromRoot.State>,
    private fromService: CasesService,
    private fromLayoutService: LayoutService,
  ) {
    this.theme$ = this.store.pipe(select(fromRoot.selectTheme));
    this.isTablet$ = this.store.pipe(select(fromLayout.selectIsTablet));
    this.isMobile$ = this.store.pipe(select(fromLayout.selectIsMobile));
    this.platform = this.fromLayoutService.getBrowserName();
  }

  ngOnInit() {
    this.battle.cases.map(_ => {
      this.colors.push(this.fromService.generateColor());
    });
  }
}
