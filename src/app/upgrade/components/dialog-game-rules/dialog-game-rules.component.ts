import { Component, OnInit, Inject, OnDestroy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { select, Store } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';

@Component({
  selector: 'app-dialog-game-rules',
  templateUrl: './dialog-game-rules.component.html',
  styleUrls: ['./dialog-game-rules.component.scss']
})
export class DialogGameRulesComponent implements OnInit, OnDestroy {
  @ViewChild('wrapper', { static: false }) wrapper: ElementRef;

  public theme$: Observable<string>;

  public gameRules = [
    'The maximal win chance is 80.00%.',
    'You’re not allowed to upgrade more than 4 items at in one upgrade.',
    'The maximal win chance is 80.00%.',
    'You’re not allowed to upgrade more than 4 items at in one upgrade.',
    'You’re not allowed to upgrade more than 4 items at in one upgrade.',
    'The maximal win chance is 80.00%.',
  ];

  private unsubscribe$: Subject<void> = new Subject();

  static show(dialog: MatDialog): any {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'added-dialog-container';
    dialogConfig.height = 'auto';

    return dialog.open(DialogGameRulesComponent, dialogConfig);
  }
  constructor(
    private store: Store<fromRoot.State>,
    public dialogRef: MatDialogRef<DialogGameRulesComponent>,
    private renderer: Renderer2,
    @Inject(MAT_DIALOG_DATA) data
  ) {
  }

  subscribeToThemeChange() {
    this.theme$ = this.store.pipe(select(fromRoot.selectTheme));

    this.theme$.pipe(takeUntil(this.unsubscribe$))
      .subscribe((theme: string) => {
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
  }

  ngOnInit() {
    this.subscribeToThemeChange();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
