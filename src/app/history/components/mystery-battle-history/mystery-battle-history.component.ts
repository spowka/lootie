import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromLayout from 'src/app/@store/layout';
import * as fromAuth from 'src/app/auth/@store';
import * as fromBattles from 'src/app/battle/@store';

import { Pagination } from 'src/app/shared/models';
import { BattleModel } from 'src/app/battle/models';
import { takeUntil, skip } from 'rxjs/operators';
import { User } from 'src/app/auth/models';
import { Router } from '@angular/router';
import { CasesService } from 'src/app/cases/services/cases.service';

@Component({
  selector: 'app-mystery-battle-history',
  templateUrl: './mystery-battle-history.component.html',
  styleUrls: ['./mystery-battle-history.component.scss'],
})
export class MysteryBattleHistoryComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('slider', { read: ElementRef, static: false }) public slider: ElementRef<any>;

  @ViewChild('sliderContent', { read: ElementRef, static: false }) public sliderContent: ElementRef<any>;

  public scroll = 0;

  public arrowRight = false;

  public isMobile$: Observable<boolean>;

  public battles$: Observable<BattleModel[]>;

  public isLoading$: Observable<boolean>;

  public pagination: Pagination;

  public colors = [];

  public battles: BattleModel[] = [];

  private user$: Observable<User>;

  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private store: Store<fromRoot.State>,
    private fromService: CasesService,
    private router: Router
  ) {
    this.isMobile$ = this.store.pipe(select(fromLayout.selectIsMobile));
    this.user$ = this.store.pipe(select(fromAuth.selectUser));
    this.battles$ = this.store.pipe(select(fromBattles.selectBattles));
    this.isLoading$ = this.store.pipe(select(fromBattles.selectLoading));
    this.pagination = { limit: 10, offset: 0 };

    this.battles$.pipe(
      takeUntil(this.unsubscribe$),
      skip(1)
    ).subscribe(battles => {
      battles.forEach(item => {
        this.battles.push(item);

        const colorsData = [];
        if (item && item.cases) {
          item.cases.forEach(c => {
            colorsData.push(this.fromService.generateColor());
          });
          this.colors.push(colorsData);
        }
      });
    });
  }

  ngOnInit() {
    this.loadBattleHistory();
  }

  ngAfterViewInit() {
    // const sliderWidth = this.slider.nativeElement.offsetWidth;
    // const sliderContentWidth = this.sliderContent.nativeElement.offsetWidth;
    // if (sliderContentWidth > sliderWidth) {
    //   this.arrowRight = true;
    // }
  }

  public loadBattleHistory(): void {
    this.store.dispatch(new fromBattles.LoadBattles({
      type: 'history',
      pagination: this.pagination
    }));
  }

  public onScroll(): void {
    this.pagination = {
      limit: this.pagination.limit,
      offset: this.pagination.offset + 1
    };

    this.loadBattleHistory();
  }

  public goToWatchBattle(battle: BattleModel): void {
    this.router.navigate([`/battle/${battle._id}`]);
  }

  public scrollRight() {
    const sliderWidth = this.slider.nativeElement.offsetWidth;
    const sliderContentWidth = this.sliderContent.nativeElement.offsetWidth;
    this.scroll = Math.min(this.scroll + sliderWidth / 3, sliderContentWidth);
    if (this.scroll + sliderWidth >= sliderContentWidth) {
      this.arrowRight = false;
    } else if (!this.arrowRight && this.scroll + sliderWidth < sliderContentWidth) {
      this.arrowRight = true;
    }
  }

  public scrollLeft() {
    const sliderWidth = this.slider.nativeElement.offsetWidth;
    const sliderContentWidth = this.sliderContent.nativeElement.offsetWidth;
    this.scroll = Math.max(this.scroll - sliderWidth / 3, 0);
    if (!this.arrowRight && this.scroll + sliderWidth < sliderContentWidth) {
      this.arrowRight = true;
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
