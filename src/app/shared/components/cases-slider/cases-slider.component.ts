import { Component, OnInit, ViewChild, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material';

import { DragScrollComponent } from 'ngx-drag-scroll';

import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import * as fromRoot from 'src/app/@store';
import * as fromHistory from 'src/app/@store/history';
import * as fromLayout from 'src/app/@store/layout';
import { takeUntil } from 'rxjs/operators';

import { CaseUnboxingHisoryModel } from 'src/app/cases/models';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MdePopoverTrigger } from '@material-extended/mde';
import { DialogUserInfoComponent } from '../dialog-user-info/dialog-user-info.component';

@Component({
  selector: 'app-cases-slider',
  templateUrl: './cases-slider.component.html',
  styleUrls: ['./cases-slider.component.scss'],
  animations: [
    trigger('newItemAnimation', [
      state('*', style({ transform: 'translateX(0)', width: 'calc(100% - {{translate}})' }), { params: { translate: '60px' } }),
      transition('* => *', [
        style({ transform: 'translateX(-182px)', width: 'calc(100% + 182px)' }),
        animate('0.5s ease-in-out')
      ])
    ])
  ]
})
export class CasesSliderComponent implements OnInit, OnDestroy {

  @ViewChild('nav', { read: DragScrollComponent, static: false }) ds: DragScrollComponent;
  @ViewChildren(MdePopoverTrigger) target: QueryList<MdePopoverTrigger>;

  public unboxings$: Observable<CaseUnboxingHisoryModel[]>;

  public isMobile$: Observable<boolean>;

  public theme$: Observable<string>;

  private unsubscribe$: Subject<void> = new Subject();

  constructor(private store: Store<fromRoot.State>, private dialog: MatDialog) {
    this.unboxings$ = this.store.pipe(select(fromHistory.selectLatestDrops));
    this.isMobile$ = this.store.pipe(select(fromLayout.selectIsMobile));

    this.theme$ = this.store.pipe(select(fromRoot.selectTheme));


    this.unboxings$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      if (this.target) {
        this.target.toArray().forEach(c => {
          if (c.popoverOpen) {
            c.closePopover();
          }
        });
      }
    });
  }

  ngOnInit() {
  }

  openUserInfo(userInfo): void {
    const dialogRef = DialogUserInfoComponent.show(this.dialog, userInfo);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
