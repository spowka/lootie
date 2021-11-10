import { Component, OnInit, Inject, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material';
import { Store } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import { Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as fromAuth from 'src/app/auth/@store/auth/auth.action';
import { ForgotPassword } from 'src/app/auth/models/forgot-password';


@Component({
  selector: 'app-forgot-password-dialog',
  templateUrl: './forgot-password-dialog.component.html',
  styleUrls: ['./forgot-password-dialog.component.scss'],
})
export class ForgotPasswordDialogComponent implements OnInit, OnDestroy {
  @Output() changeMode: EventEmitter<any> = new EventEmitter();

  public email = new FormControl('', [Validators.required, Validators.email]);

  public forgotPassword = new FormGroup({
    email: this.email,
  });

  public isReset = false;

  private unsubscribe$: Subject<void> = new Subject();

  static show(dialog: MatDialog): any {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'forgot-dialog-container';

    return dialog.open(ForgotPasswordDialogComponent, dialogConfig);
  }

  constructor(
    private store: Store<fromRoot.State>,
    public dialogRef: MatDialogRef<ForgotPasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {}

  ngOnInit() {}

  close() {
    this.dialogRef.close();
  }

  reset() {
    const context: ForgotPassword = {
      email: this.forgotPassword.value.email,
    };

    this.store.dispatch(new fromAuth.ForgotPasswordAction({ context }));
  }

  openLogin() {
    this.changeMode.emit('login');
  }

  ngOnDestroy() {
    this.store.dispatch(new fromRoot.CloseForgotModal());
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
