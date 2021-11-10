import { Component, OnInit, Input, Inject, ElementRef, ViewChild, Renderer2, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit, AfterViewInit {
  @ViewChild('wrapper', { static: false }) wrapper: ElementRef;
  public theme$: Observable<string>;
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<fromRoot.State>,
    private renderer: Renderer2,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) { }

  ngOnInit() {
  }
  
  ngAfterViewInit() {
    this.subscribeToThemeChange();
  }

  confirm() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
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
}
