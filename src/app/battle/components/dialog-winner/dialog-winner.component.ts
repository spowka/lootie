import { Component, OnInit, ViewChild, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

import { select, Store } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromRouter from 'src/app/@store/router';
import * as fromAuth from 'src/app/auth/@store/auth';
import * as fromBattle from 'src/app/battle/@store/battle';
import * as fromProvablyFair from 'src/app/@store/provably-fair/provably-fair.selector';
import * as fromInventory from 'src/app/inventory/@store/inventory';
import { Observable, Subject, combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';

import { BattleModel } from '../../models';
import { User } from 'src/app/auth/models';
import { InventoryItemsModel } from 'src/app/shared/models';
import { NgxZendeskWebwidgetService } from 'ngx-zendesk-webwidget';

@Component({
  selector: 'app-dialog-winner',
  templateUrl: './dialog-winner.component.html',
  styleUrls: ['./dialog-winner.component.scss'],
})
export class DialogWinnerComponent implements OnInit, OnDestroy {
  @ViewChild('wrapper', { static: false }) wrapper: ElementRef;

  public theme$: Observable<string>;

  public battle$: Observable<BattleModel>;

  public user$: Observable<User>;

  public isWatcher = false;

  private unsubscribe$: Subject<void> = new Subject();

  private clientSeed$: Observable<string>;

  public inventoryItems$: Observable<InventoryItemsModel[]>;

  static show(dialog: MatDialog): any {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'added-dialog-container';
    dialogConfig.maxWidth = 1330;
    dialogConfig.height = 'auto';

    return dialog.open(DialogWinnerComponent, dialogConfig);
  }

  constructor(
    private store: Store<fromRoot.State>,
    private renderer: Renderer2,
    private router: Router,
    private _ngxZendeskWebwidgetService: NgxZendeskWebwidgetService,
    public dialogRef: MatDialogRef<DialogWinnerComponent>
  ) {
    this.theme$ = this.store.pipe(select(fromRoot.selectTheme));
    this.battle$ = this.store.pipe(select(fromBattle.selectBattle));
    this.user$ = this.store.pipe(select(fromAuth.selectUser));
    this.clientSeed$ = this.store.pipe(select(fromProvablyFair.selectClientSeed));
    this.inventoryItems$ = this.store.pipe(select(fromInventory.selectInventoryItems));
  }

  ngOnInit() {
    combineLatest(this.user$, this.battle$)
      .pipe(take(1))
      .subscribe(([user, battle]) => {
        this.isWatcher = !battle.sessions.find((bs) => bs.user._id === user._id);
        this.store.dispatch(new fromInventory.LoadInventoryItemsForBattle({ battle: battle._id }));
      });

    this.theme$.pipe(take(1)).subscribe((theme: string) => {
      if (this.wrapper.nativeElement.classList.contains('dialog-wrapper__dark')) {
        this.renderer.removeClass(this.wrapper.nativeElement, 'dialog-wrapper__dark');
      }
      if (this.wrapper.nativeElement.classList.contains('dialog-wrapper__light')) {
        this.renderer.removeClass(this.wrapper.nativeElement, 'dialog-wrapper__light');
      }
      if (theme === 'light') {
        this.renderer.addClass(this.wrapper.nativeElement, 'dialog-wrapper__light');
        return;
      }
      this.renderer.addClass(this.wrapper.nativeElement, 'dialog-wrapper__dark');
    });

    this._ngxZendeskWebwidgetService.zE('webWidget', 'hide');
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this._ngxZendeskWebwidgetService.zE('webWidget', 'show');
  }

  close(): void {
    this.dialogRef.close();
  }

  createSameBattle(): void {
    combineLatest(this.clientSeed$, this.battle$)
      .pipe(take(1))
      .subscribe(([seed, battle]) => {
        this.store.dispatch(
          new fromBattle.CreateBattle({
            seed,
            userCount: battle.userCount,
            cases: battle.cases.map((box) => ({ case: box.case, count: box.count })),
            private: !!battle.private,
          })
        );
        this.close();
      });
  }

  sellAllItems(): void {
    combineLatest(this.inventoryItems$, this.battle$, this.user$)
      .pipe(take(1))
      .subscribe(([inventoryItems, battle, user]) => {
        const filteredItems = inventoryItems.filter(
          (invItem) => invItem.battle === battle._id && invItem.user === user._id
        );
        if (filteredItems.length > 0) {
          this.store.dispatch(new fromInventory.SellItem(filteredItems));
        }
        this.store.dispatch(new fromInventory.LoadInventoryItemsSuccess([]));
        this.close();
      });
  }
}
