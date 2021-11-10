import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { trigger, style, transition, animate, state, keyframes } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import * as _Array from 'lodash';

import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromBattles from 'src/app/battle/@store';
import * as fromProvablyFair from 'src/app/@store/provably-fair';
import * as fromLayout from 'src/app/@store/layout';
import { takeUntil, take } from 'rxjs/operators';
import { LayoutService } from 'src/app/@store/services/layout.service';

import { DialogWinnerComponent } from '../../components';

import { BattleModel, BattleStatuses, BattleSession } from 'src/app/battle/models';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('500ms', style({ opacity: 0 }))
      ]),
    ]),

    trigger('delayFadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms 3s', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('500ms', style({ opacity: 0 }))
      ]),
    ]),

    trigger('delayFadeInOut', [
      transition('* => void', [animate('0s')]),
      transition('* => *', [
        style({ opacity: 0 }),
        animate('500ms 3s', style({ opacity: 1 }))
      ]),
    ])
  ]
})
export class BattleComponent implements OnInit, OnDestroy {
  @ViewChild('indicator', { static: false }) indicator: ElementRef;

  public battleId: string;

  public battle: BattleModel;

  public sessions: BattleSession[] = [];

  public showResult = false;

  public joinedOnLastRound = false;

  public fleshIndex: number;

  public resultData = [];

  public totalRounds = [];

  public indicatorPosition: Subject<number> = new BehaviorSubject(0);

  public reelAudio: HTMLAudioElement;
  public itemAudio: HTMLAudioElement;
  public counterAudio: HTMLAudioElement;

  private _battle$: Observable<BattleModel>;

  private unsubscribe$: Subject<void> = new Subject();

  public isChatOpened$: Observable<boolean>;

  public isMobile$: Observable<boolean>;

  currentUrl$: Observable<string>;

  public platform: string;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRoot.State>,
    private fromLayoutService: LayoutService,
    private titleService: Title,
  ) {
    this._battle$ = this.store.pipe(select(fromBattles.selectBattle));
    this.isChatOpened$ = this.store.pipe(select(fromLayout.selectChatOpened));
    this.isMobile$ = this.store.pipe(select(fromLayout.selectIsMobile));
    this.platform = this.fromLayoutService.getBrowserName();
    this.currentUrl$ = this.store.pipe(select(fromRoot.selectgetActiveUrl));

    this.titleService.setTitle('Mystery Battles | Case Battle | Lootie');
  }

  ngOnInit() {
    this.initAudio();

    this.battleId = this.route.snapshot.paramMap.get('id');
    this._battle$.pipe(takeUntil(this.unsubscribe$)).subscribe(battle => {
      if (!battle || (battle && battle._id !== this.battleId)) {
        this.store.dispatch(new fromBattles.LoadBattle(this.battleId));
        this.joinedOnLastRound = true;
        return;
      }

      if (battle.status === BattleStatuses.cancelled) {
        return this.router.navigate(['/battle']);
      }

      // 30 - item width | +20 - 50px selected item width
      this.indicatorPosition.next(((battle.currentRound + 1) * -30) + 20);

      if (this.joinedOnLastRound && battle.status !== BattleStatuses.completed) {
        this.joinedOnLastRound = false;
      }

      if (!this.counterAudio) {
        if (battle.totalRounds >= 10) {
          this.counterAudio = new Audio('/assets/audio/counter-short.wav');
        } else {
          this.counterAudio = new Audio('/assets/audio/counter.wav');
        }
        this.counterAudio.load();
      }

      this.battle = _Array.cloneDeep(battle);

      if (!this.joinedOnLastRound) {
        this.stopReelAudio();
        this.reelAudio.play();
      }

      if (!this.sessions.length) {
        const sessions = _Array.cloneDeep(this.battle.sessions);
        if (this.battle.currentRound === 0) {
          sessions.forEach(session => session.rounds = []);
          this.sessions = sessions;
          this.addRoundItem();
        } else {
          this.sessions = sessions;
        }
      } else {
        this.addRoundItem();
      }

      if (!this.totalRounds.length) {
        this.totalRounds = new Array(battle.totalRounds);
      }

      if (battle.status === BattleStatuses.completed) {
        this.store.dispatch(new fromProvablyFair.SetPreviousSeeds({
          clientSeed: battle.dice.clientSeed,
          serverSeed: [battle.dice.seed],
          serverSeedHashed: [battle.dice.seedHash],
        }));

        if (this.joinedOnLastRound) {
          this.initResultData();
          return this.showResult = true;
        } else {
          this.initResultData();
          setTimeout(_ => {
            this.showResult = true;
          }, 6000);
        }
      }
    });
  }

  initResultData() {
    const sessionResults = [];
    const winnerIndex = this.sessions.findIndex(session => session.user._id === this.battle.winner._id);

    this.battle.sessions.map(session => {
      const results = { winning: 0, rounds: [] };
      session.rounds.map((round, ri) => {
        results.rounds.push({ value: 0, isWin: false });

        results.rounds[ri].value = round.item.value;
        results.winning = round.item.value;
        if (results.rounds[ri - 1]) {
          results.rounds[ri].value += results.rounds[ri - 1].value;
          results.winning += results.rounds[ri - 1].value;
        }
      });

      sessionResults.push(results);
    });

    sessionResults.forEach((sr, si) => {
      sr.rounds.forEach((round, ri) => {
        for (let i = 0; i < sessionResults.length; i++) {
          if (i === si) {
            continue;
          }

          const _sr = sessionResults[i];

          if (ri === sr.rounds.length - 1) {
            if (si === winnerIndex) {
              round.isWin = true;
            } else {
              round.isWin = false;
            }
            break;
          }

          if (round.value < _sr.rounds[ri].value || (round.value === _sr.rounds[ri].value && si !== 0)) {
            round.isWin = false;
            break;
          }

          round.isWin = true;
        }
      });
    });

    this.resultData = sessionResults;
  }

  onResultCountStep(index) {
    const roundsCount = Math.floor((this.indicator.nativeElement.offsetWidth / 30) / 2);

    if (this.battle.totalRounds > roundsCount) {
      let left: number;
      if (index >= this.battle.currentRound - roundsCount) {
        left = ((this.battle.currentRound + 1) * -30) + 20;
      } else {
        left = Math.ceil(index / roundsCount) * (roundsCount * -30);
      }

      this.indicatorPosition.pipe(take(1)).subscribe(pos => {
        if (left !== pos) {
          this.indicatorPosition.next(left);
        }
      });
    }

    this.fleshIndex = index;
    this.stopCounterAudio();
    this.counterAudio.play();
  }

  onResultCountDone() {
    delete this.fleshIndex;
    this.moveItems(true, () => this.openWinnerDialog());
  }

  addRoundItem(): void {
    this.sessions.map((session, si) => {
      const nextRound = this.battle.sessions[si].rounds[this.battle.sessions[si].rounds.length - 1];
      if (nextRound) {
        setTimeout(_ => {
          this.itemAudio.play();
          session.rounds.push(nextRound);
        }, 3000);
      }
    });
  }

  moveItems(isAnimated: boolean, callback: Function) {
    const winnerIndex = this.sessions.findIndex(session => session.user._id === this.battle.winner._id);
    this.sessions.map(session => {
      if (session.user._id !== this.battle.winner._id) {
        if (isAnimated) {
          const timer = setInterval(_ => {
            if (!session.rounds.length) {
              clearInterval(timer);
              if (!this.dialog.openDialogs.length) {
                callback();
              }
              return;
            }

            this.sessions[winnerIndex].rounds.push(...session.rounds.splice(session.rounds.length - 1, 1));
          }, 500);
        } else {
          this.sessions[winnerIndex].rounds.push(...session.rounds.splice(session.rounds.length - 1, 1));
        }
      }
    });
  }

  openWinnerDialog() {
    DialogWinnerComponent.show(this.dialog);
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  goToProvablyFair(): void {
    this.store.dispatch(new fromProvablyFair.SetUrlFrom(this.router.url));
    this.router.navigate(['/provably-fair/unboxings']);
  }

  initAudio(): void {
    this.reelAudio = new Audio('/assets/audio/reel.wav');
    this.reelAudio.load();
    this.reelAudio.volume = 0.5;

    this.itemAudio = new Audio('/assets/audio/item.wav');
    this.itemAudio.load();
  }

  stopReelAudio(): void {
    if (this.reelAudio && !this.reelAudio.paused) {
      this.reelAudio.pause();
      this.reelAudio.currentTime = 0;
    }
  }

  stopItemAudi(): void {
    if (this.itemAudio && !this.itemAudio.paused) {
      this.itemAudio.pause();
      this.itemAudio.currentTime = 0;
    }
  }

  stopCounterAudio(): void {
    if (this.counterAudio && !this.counterAudio.paused) {
      this.counterAudio.pause();
      this.counterAudio.currentTime = 0;
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.stopReelAudio();
    this.stopItemAudi();
    this.stopCounterAudio();
    this.store.dispatch(new fromBattles.SetUrlFrom('battle'));
  }
}
