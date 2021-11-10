import { Component, OnInit, Input, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { CaseItemModel } from 'src/app/cases/models';

import { battleAnimations } from '../../animations/spinner-animation';
import { SiteItemsModel } from 'src/app/shared/models';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';

import { take } from 'rxjs/operators';

@Component({
  selector: 'app-battle-spinner',
  templateUrl: './battle-spinner.component.html',
  styleUrls: ['./battle-spinner.component.scss'],
  animations: battleAnimations,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BattleSpinnerComponent implements OnInit, AfterViewInit {
  @Input() items: CaseItemModel[];

  @Input() winItem: SiteItemsModel;

  public isMobile$: Observable<boolean>;

  public spinnerItems = [];

  public spinnerState: string;
  public infoState: string;

  public start = 0;
  public stop = 0;

  private spinnerOptions = {
    total: 45,
    itemHeight: 150,
    winItemHeight: 200,
    screenHeight: 270,
    winItemIndex: 1,
  };

  constructor(private store: Store<fromRoot.State>) {
    this.isMobile$ = this.store.pipe(select(fromRoot.selectIsMobile));

    this.isMobile$.pipe(take(1)).subscribe(isMobile => {
      if (isMobile) {
        this.spinnerOptions.itemHeight = 45;
        this.spinnerOptions.winItemHeight = 75;
        this.spinnerOptions.screenHeight = 142;
      }

      const winItemGap = ((this.spinnerOptions.screenHeight - this.spinnerOptions.winItemHeight) / 2);
      this.start = (this.spinnerOptions.itemHeight - winItemGap) * -1;

      const fullHeight = (this.spinnerOptions.itemHeight * (this.spinnerOptions.total - 1)) + this.spinnerOptions.winItemHeight;
      const itemGap = (this.spinnerOptions.screenHeight - this.spinnerOptions.itemHeight) / 2;
      this.stop = (fullHeight - this.spinnerOptions.screenHeight - (this.spinnerOptions.itemHeight - itemGap)) * -1;

      this.spinnerState = 'stop';
      this.infoState = 'hide';
    });
  }

  ngOnInit() {
    this.initSpinnerItems();
  }

  ngAfterViewInit(): void {
    this.spinnerState = 'start';
  }

  onAnimationDone(e) {
    if (e.fromState === 'stop' && e.toState === 'start') {
      this.infoState = 'show';
    }
  }

  initSpinnerItems(): void {
    while (this.spinnerItems.length < this.spinnerOptions.total) {
      this.spinnerItems.push(this.items[Math.floor(Math.random() * this.items.length)].item);
    }

    this.spinnerItems.splice(this.spinnerOptions.winItemIndex, 1, this.winItem);
  }
}
