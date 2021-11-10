import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromProvablyFair from 'src/app/@store/provably-fair/provably-fair.selector';
import * as fromRouter from 'src/app/@store/router/router.action';
import * as fromBattle from 'src/app/battle/@store';
import * as fromLayout from 'src/app/@store/layout';
import { Observable, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';

import { DialogBoxesComponent } from '../../components/dialog-boxes/dialog-boxes.component';
import { CaseModel } from 'src/app/cases/models';
import { LayoutService } from 'src/app/@store/services/layout.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-battle',
  templateUrl: './create-battle.component.html',
  styleUrls: ['./create-battle.component.scss']
})
export class CreateBattleComponent implements OnInit, OnDestroy {
  public theme$: Observable<string>;

  public platform: string;

  public clientSeed$: Observable<string>;

  public isLoading$: Observable<boolean>;

  public isBattleModalOpened$: Observable<boolean>;

  public selectedBoxes: CaseModel[];

  public battleCost = 0;

  public rounds = 0;

  public players = [
    { value: 2, label: '2 Players' },
    { value: 3, label: '3 Players' },
    { value: 4, label: '4 Players' },
  ];

  public selectedPlayer: number;

  public isPrivate = false;

  private _selectedBoxes$: Observable<CaseModel[]>;

  private unsubscribe$: Subject<void> = new Subject();

  public isChatOpened$: Observable<boolean>;

  public isMobile$: Observable<boolean>;

  currentUrl$: Observable<string>;

  constructor(
    public dialog: MatDialog,
    private store: Store<fromRoot.State>,
    private router: Router,
    private fromLayoutService: LayoutService,
    private titleService: Title
  ) {
    this.isChatOpened$ = this.store.pipe(select(fromLayout.selectChatOpened));
    this.isBattleModalOpened$ = this.store.pipe(select(fromBattle.selectBattleBoxModalOpened));
    this.clientSeed$ = this.store.pipe(select(fromProvablyFair.selectClientSeed));
    this.theme$ = this.store.pipe(select(fromRoot.selectTheme));
    this.isLoading$ = this.store.pipe(select(fromBattle.selectLoading));
    this.isMobile$ = this.store.pipe(select(fromLayout.selectIsMobile));
    this._selectedBoxes$ = this.store.pipe(select(fromBattle.selectSelectedBoxes));
    this.selectedPlayer = this.players[0].value;
    this.platform = this.fromLayoutService.getBrowserName();
    this.currentUrl$ = this.store.pipe(select(fromRoot.selectgetActiveUrl));

    this._selectedBoxes$.pipe(takeUntil(this.unsubscribe$)).subscribe(selectedBoxes => {
      this.battleCost = 0;
      this.rounds = 0;

      this.selectedBoxes = selectedBoxes.map(box => {
        const selectedBox = this.selectedBoxes.find(sb => sb._id === box._id);
        if (selectedBox) {
          this.battleCost += (selectedBox.price * selectedBox.count);
          this.rounds += selectedBox.count;
          return selectedBox;
        }

        this.battleCost += (box.price * (box.count || 1));
        this.rounds += box.count || 1;
        return { count: 1, ...box, };
      });
    });

    this.titleService.setTitle(
      'Mystery Battles | Create Battle | Lootie'
    );
  }

  ngOnInit() {
    this.isBattleModalOpened$.pipe(takeUntil(this.unsubscribe$))
      .subscribe(opened => {
        if (opened) {
          DialogBoxesComponent.show(this.dialog);
        }
      });
  }

  goBack() {
    this.store.dispatch(new fromRouter.Back);
  }

  openDialogBoxes() {
    this.store.dispatch(new fromBattle.OpenBattleBoxModal());
  }

  onChangeCount(res) {
    const { id, count } = res;
    this.battleCost = 0;
    this.rounds = 0;

    this.selectedBoxes.forEach(box => {
      if (box._id === id) {
        box.count = count;
      }
      this.battleCost += (box.price * box.count);
      this.rounds += box.count;
    });
  }

  createBattle(): void {
    this.clientSeed$.pipe(take(1)).subscribe(seed => {
      this.store.dispatch(new fromBattle.CreateBattle({
        seed,
        userCount: this.selectedPlayer,
        cases: this.selectedBoxes.map(box => ({ case: box._id, count: box.count })),
        private: this.isPrivate,
      }));
    });
  }

  onRemove(box: CaseModel): void {
    this.store.dispatch(new fromBattle.SelectBoxes(this.selectedBoxes.filter(selectedBox => selectedBox._id !== box._id)));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.store.dispatch(new fromBattle.SelectBoxes([]));
    this.store.dispatch(new fromBattle.SetUrlFrom(this.router.url));
  }

}
