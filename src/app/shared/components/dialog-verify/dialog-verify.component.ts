import { Component, OnInit, Inject, OnDestroy, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material';

import { Observable, Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { select, Store } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromHistory from 'src/app/@store/history';
import { CaseUnboxingModel } from 'src/app/cases/models';

import hmacSHA512 from 'crypto-js/hmac-sha512';
import encHex from 'crypto-js/enc-hex';

export enum ProvablyFairTabsModel {
  info = 'info',
  verify = 'verify',
  howItWorks = 'howItWorks'
}

@Component({
  selector: 'app-dialog-verify',
  templateUrl: './dialog-verify.component.html',
  styleUrls: ['./dialog-verify.component.scss']
})
export class DialogVerifyComponent implements OnInit, OnDestroy {
  @ViewChild('wrapper', { static: false }) wrapper: ElementRef;

  public selectedTab = ProvablyFairTabsModel.verify;

  public theme$: Observable<string>;

  public provablyFairTabsModel = ProvablyFairTabsModel;

  public unboxingId$: Observable<string>;

  public unboxings: CaseUnboxingModel;

  public clientSeed = '';
  public serverSeed = '';
  public nonce: number = 0;
  public roll: number;

  public userInfo = [
    {
      userimg: '/assets/images/icons/user',
      userName: 'Steve Vargas',
      joined: '2020/10/08 08:02 GTM',
      clientSeed: 'HfhfhF51d2…',
      round: 2,
      box: 'Plastation Box',
      rounds: [{
        nonce: 5,
        roll: 12548,
        item: { price: 0.22, name: 'XM1022 | Ripple' },
        total: 0.22
      },
      {
        nonce: 9,
        roll: 12548,
        item: { price: 0.22, name: 'XM1022 | Ripple' },
        total: 0.22
      },
      ]
    },
    {
      userimg: '/assets/images/icons/user',
      userName: 'Steve Vargas',
      joined: '2020/10/08 08:02 GTM',
      clientSeed: 'HfhfhF51d2…',
      round: 2,
      box: 'Plastation Box',
      rounds: [{
        nonce: 5,
        roll: 12548,
        item: { price: 0.22, name: 'XM1022 | Ripple' },
        total: 0.22
      },
      {
        nonce: 9,
        roll: 12548,
        item: { price: 0.22, name: 'XM1022 | Ripple' },
        total: 0.22
      },
      ]
    },
    {
      userimg: '/assets/images/icons/user',
      userName: 'Steve Vargas',
      joined: '2020/10/08 08:02 GTM',
      clientSeed: 'HfhfhF51d2…',
      round: 2,
      box: 'Plastation Box',
      rounds: [{
        nonce: 5,
        roll: 12548,
        item: { price: 0.22, name: 'XM1022 | Ripple' },
        total: 0.22
      },
      {
        nonce: 9,
        roll: 12548,
        item: { price: 0.22, name: 'XM1022 | Ripple' },
        total: 0.22
      },
      ]
    },
    {
      userimg: '/assets/images/icons/user',
      userName: 'Steve Vargas',
      joined: '2020/10/08 08:02 GTM',
      clientSeed: 'HfhfhF51d2…',
      round: 2,
      box: 'Plastation Box',
      rounds: [{
        nonce: 5,
        roll: 12548,
        item: { price: 0.22, name: 'XM1022 | Ripple' },
        total: 0.22
      },
      {
        nonce: 9,
        roll: 12548,
        item: { price: 0.22, name: 'XM1022 | Ripple' },
        total: 0.22
      },
      ]
    },
  ];

  private unsubscribe$: Subject<void> = new Subject();

  static show(dialog: MatDialog, item: CaseUnboxingModel[]): any {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'added-dialog-container';
    dialogConfig.height = 'auto';
    dialogConfig.data = item;

    return dialog.open(DialogVerifyComponent, dialogConfig);
  }


  constructor(
    public dialogRef: MatDialogRef<DialogVerifyComponent>,
    private store: Store<fromRoot.State>,
    private renderer: Renderer2,
    @Inject(MAT_DIALOG_DATA) data: CaseUnboxingModel[]
  ) {

    this.unboxingId$ = store.pipe(select(fromHistory.selectUnboxingId));

    combineLatest(this.unboxingId$, data).pipe(takeUntil(this.unsubscribe$)).subscribe(([unboxingId, _data]) => {
      if (unboxingId === _data._id) {
        return this.unboxings = _data;
      }
    });

    this.clientSeed = this.unboxings.dice.clientSeed;
    this.serverSeed = this.unboxings.dice.seed;
  }

  public ngOnInit() {
    this.onChangeRoll();
  }

  public hexdec(hexString) {
    hexString = (hexString + '').replace(/[^a-f0-9]/gi, '');
    return parseInt(hexString, 16);
  }

  public getRoll(hash) {
    const subHash = hash.substr(0, 7);
    const number = this.hexdec(subHash);
    return number % 100000 + 1;
  }

  onChangeRoll() {
    const seed = this.clientSeed + '-' + this.nonce;
    const hmacDigest = hmacSHA512(seed, this.serverSeed).toString(encHex);

    this.roll = this.getRoll(hmacDigest);
  }

  public close() {
    this.dialogRef.close();
  }

  public ngOnDestroy() {
    this.store.dispatch(new fromRoot.CloseVerifyModal());
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
