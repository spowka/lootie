import { Component, OnInit, Inject, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { select, Store } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromAuth from 'src/app/auth/@store';
import { LoginContext, LoginProvider } from 'src/app/auth/models/login-context';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements OnInit, OnDestroy {
  @Output() changeMode: EventEmitter<any> = new EventEmitter();

  public isLoggedIn$: Observable<boolean>;

  public isLoading$: Observable<boolean>;

  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);
  public remember = new FormControl(false);

  public loginForm = new FormGroup({
    email: this.email,
    password: this.password,
    remember: this.remember,
  });

  private unsubscribe$: Subject<void> = new Subject();

  static show(dialog: MatDialog): any {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'login-dialog-container';

    return dialog.open(LoginDialogComponent, dialogConfig);
  }

  constructor(
    private store: Store<fromRoot.State>,
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.isLoading$ = this.store.pipe(select(fromAuth.selectLoading));
  }

  ngOnInit() {
    this.subscribeToLogIn();
  }

  goToPage(page: string): void {
    this.dialogRef.close();
    this.router.navigate([page]);
  }

  close() {
    this.dialogRef.close();
  }

  login() {
    const loginContext: LoginContext = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    const provider: LoginProvider = 'local';
    this.store.dispatch(new fromAuth.Login({ loginContext, provider, remember: this.loginForm.value.remember }));
  }

  // steamLogin(): void {
  //   window.location.href = `${environment.apiUrl}/users/authenticate/steam`;
  // }

  // opskinsLogin(): void {
  //   window.location.href = `${environment.apiUrl}/users/authenticate/opskins`;
  // }

  facebookLogin(): void {
    window.location.href = `${environment.apiUrl}/users/authenticate/fb`;
  }

  googleLogin(): void {
    this.store.dispatch(new fromAuth.GoogleSignIn());
  }

  openForgotPassword() {
    this.changeMode.emit('forgot-password');
  }

  private subscribeToLogIn(): void {
    this.isLoggedIn$ = this.store.pipe(select(fromAuth.selectIsLoggedIn));

    this.isLoggedIn$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          this.close();
        }
      });
  }

  ngOnDestroy() {
    this.store.dispatch(new fromRoot.CloseLoginModal());
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
