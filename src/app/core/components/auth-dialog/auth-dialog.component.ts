import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig
} from '@angular/material';
import { Observable, Subject } from 'rxjs';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';


@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss'],
})
export class AuthDialogComponent implements OnInit, OnDestroy {
  public mode = 'login';

  public loginHeaderItems = [
    { name: 'Register', value: 'register' },
    { name: 'Login', value: 'login' },
  ];

  public isLoginModalOpened$: Observable<boolean>;

  public isForgotModalOpened$: Observable<boolean>;

  public isSignUpModalOpened$: Observable<boolean>;

  private unsubscribe$: Subject<void> = new Subject();

  static show(dialog: MatDialog, mode?: string): any {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'auth-dialog-container';

    return dialog.open(AuthDialogComponent, dialogConfig);
  }

  constructor(
    private store: Store<fromRoot.State>,
    public dialogRef: MatDialogRef<AuthDialogComponent>,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.isLoginModalOpened$ = this.store.pipe(select(fromRoot.selectLoginModalOpened));
    this.isForgotModalOpened$ = this.store.pipe(select(fromRoot.selectForgotModalOpened));
    this.isSignUpModalOpened$ = this.store.pipe(select(fromRoot.selectSignUpModalOpened));
  }

  ngOnInit() {
    this.isLoginModalOpened$.pipe(takeUntil(this.unsubscribe$)).subscribe(opened => {
      if (opened) {
        this.mode = 'login';
      }
    });

    this.isForgotModalOpened$.pipe(takeUntil(this.unsubscribe$)).subscribe(opened => {
      if (opened) {
        this.mode = 'forgot-password';
      }
    });

    this.isSignUpModalOpened$.pipe(takeUntil(this.unsubscribe$)).subscribe(opened => {
      if (opened) {
        this.mode = 'register';
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  changeMode(value: string): void {
    this.mode = value;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    localStorage.removeItem('loginToRoute');
  }
}
