import { Component, OnInit, Inject, OnDestroy, ElementRef, ViewChild, Renderer2, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { select, Store } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';

@Component({
  selector: 'app-dialog-user-info',
  templateUrl: './dialog-user-info.component.html',
  styleUrls: ['./dialog-user-info.component.scss']
})
export class DialogUserInfoComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('wrapper', { static: false }) wrapper: ElementRef;

  public userInfo: any;

  public theme$: Observable<string>;

  private unsubscribe$: Subject<void> = new Subject();

  static show(dialog: MatDialog, item: any): any {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'added-dialog-container';
    dialogConfig.height = 'auto';
    dialogConfig.data = item;

    return dialog.open(DialogUserInfoComponent, dialogConfig);
  }
  constructor(
    public dialogRef: MatDialogRef<DialogUserInfoComponent>,
    private store: Store<fromRoot.State>,
    private renderer: Renderer2,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.userInfo = data;
  }

  public ngOnInit() {
  }
  
  ngAfterViewInit() {
    this.subscribeToThemeChange();
  }

  public close() {
    this.dialogRef.close();
  }

  public subscribeToThemeChange() {
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

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
