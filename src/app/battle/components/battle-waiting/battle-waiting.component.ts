import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

import { Observable, Subject, combineLatest } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromBattles from 'src/app/battle/@store';
import * as fromProvablyFair from 'src/app/@store/provably-fair';
import * as fromAuth from 'src/app/auth/@store';
import * as fromLayout from 'src/app/@store/layout';
import { take, takeUntil, skip } from 'rxjs/operators';

import { BattleModel, BattleStatuses } from 'src/app/battle/models';
import { User } from 'src/app/auth/models';

@Component({
  selector: 'app-battle-waiting',
  templateUrl: './battle-waiting.component.html',
  styleUrls: ['./battle-waiting.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('300ms', style({ opacity: 0 }))
      ]),
    ]),
  ]
})
export class BattleWaitingComponent implements OnInit, OnDestroy {
  public battleId: string;

  public battle$: Observable<BattleModel>;

  public isLoading$: Observable<boolean>;

  public isMobile$: Observable<boolean>;

  public user$: Observable<User>;

  public clientSeed$: Observable<string>;

  public isChatOpened$: Observable<boolean>;

  currentUrl$: Observable<string>;

  public sessions: any[];

  public isJoined = false;

  private unsubscribe$: Subject<void> = new Subject();

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<fromRoot.State>) {
    this.battle$ = this.store.pipe(select(fromBattles.selectBattle));
    this.isLoading$ = this.store.pipe(select(fromBattles.selectLoading));
    this.isMobile$ = this.store.pipe(select(fromRoot.selectIsMobile));
    this.user$ = this.store.pipe(select(fromAuth.selectUser));
    this.clientSeed$ = this.store.pipe(select(fromProvablyFair.selectClientSeed));
    this.isChatOpened$ = this.store.pipe(select(fromLayout.selectChatOpened));
    this.currentUrl$ = this.store.pipe(select(fromRoot.selectgetActiveUrl));
  }

  ngOnInit() {
    this.store.dispatch(new fromBattles.SetUrlFrom('battle'));

    this.battleId = this.route.snapshot.paramMap.get('id');

    this.battle$.pipe(take(1)).subscribe(battle => {
      if (!battle || (battle && battle._id !== this.battleId)) {
        return this.store.dispatch(new fromBattles.LoadBattle(this.battleId));
      }

      if (battle.status === BattleStatuses.cancelled) {
        return this.router.navigate(['/battle']);
      }

      if (battle.status !== BattleStatuses.pending) {
        return this.router.navigate(['/battle', battle._id]);
      }

      this.sessions = [...battle.sessions, ...new Array(battle.userCount - battle.sessions.length)];

      this.user$.pipe(take(1)).subscribe(user => {
        for (let i = 0; i < this.sessions.length; i++) {
          const _session = this.sessions[i];
          if (!_session) {
            continue;
          }

          if (_session.user._id === user._id) {
            this.isJoined = true;
            break;
          }
        }
      });
    });

    this.battle$.pipe(skip(1), takeUntil(this.unsubscribe$)).subscribe(battle => {
      if (!battle) {
        return;
      }

      if (battle.status === BattleStatuses.cancelled) {
        return this.router.navigate(['/battle']);
      }

      if (battle._id === this.battleId && battle.sessions[0].rounds.length) {
        this.router.navigate(['/battle', battle._id]);
      }

      this.sessions = [...battle.sessions, ...new Array(battle.userCount - battle.sessions.length)];

      this.user$.pipe(take(1)).subscribe(user => {
        for (let i = 0; i < this.sessions.length; i++) {
          const _session = this.sessions[i];
          if (!_session) {
            continue;
          }

          if (_session.user._id === user._id) {
            this.isJoined = true;
            break;
          }
        }
      });
    });
  }

  joinBattle(): void {
    combineLatest(this.battle$, this.clientSeed$).pipe(take(1)).subscribe(([battle, seed]) => {
      this.store.dispatch(new fromBattles.JoinBattle({ id: battle._id, seed }));
    });
  }

  quitBattle(): void {
    combineLatest(this.battle$, this.clientSeed$).pipe(take(1)).subscribe(([battle, seed]) => {
      this.store.dispatch(new fromBattles.QuitBattle({ id: battle._id, seed }));
    });

    this.router.navigate(['/battle']);
  }

  cancelBattle(): void {
    this.battle$.pipe(take(1)).subscribe(battle => {
      this.store.dispatch(new fromBattles.CancelBattle(battle._id));
    });
  }

  startNow(): void {
    this.battle$.pipe(take(1)).subscribe(battle => {
      this.store.dispatch(new fromBattles.StartBattleNow(battle._id));
    });
  }

  goToProvablyFair(): void {
    this.store.dispatch(new fromProvablyFair.SetUrlFrom(this.router.url));
    this.battle$.pipe(take(1)).subscribe(battle => {
      this.store.dispatch(new fromProvablyFair.SetId(battle.dice._id));
      this.store.dispatch(new fromProvablyFair.SetHashedServerSeed([{ id: battle.dice._id, seed: battle.dice.seedHash }]));
      this.router.navigate(['/provably-fair/unboxings']);
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
