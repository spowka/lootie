import { Component, Inject, OnDestroy, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef, ErrorStateMatcher } from '@angular/material';

import { Observable, Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromAuth from 'src/app/auth/@store';
import { takeUntil } from 'rxjs/operators';

import { User } from 'src/app/auth/models/user-profile';

import { environment } from 'src/environments/environment';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-sign-up-dialog',
  templateUrl: './sign-up-dialog.component.html',
  styleUrls: ['./sign-up-dialog.component.scss'],
})
export class SignUpDialogComponent implements OnInit, OnDestroy {
  @Output() changeMode: EventEmitter<any> = new EventEmitter();

  private unsubscribe$: Subject<void> = new Subject();

  private isLoggedIn$: Observable<boolean>;

  public isLoading$: Observable<boolean>;

  public signUpForm: FormGroup;
  public password: FormControl;
  public username: FormControl;
  public email: FormControl;

  public matcher = new MyErrorStateMatcher();

  static show(dialog: MatDialog): any {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = ['login-dialog-container', 'signup'];

    return dialog.open(SignUpDialogComponent, dialogConfig);
  }

  constructor(
    private store: Store<fromRoot.State>,
    public dialogRef: MatDialogRef<SignUpDialogComponent>,
    private router: Router,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.isLoading$ = this.store.pipe(select(fromAuth.selectLoading));
    this.signUpForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.pattern(/^\S*$/)]],
        email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
          ],
        ],
        passwordConfirm: [''],
        profileImageUrl: ['/assets/images/profile/male-1.svg'],
      },
      { validator: this.checkPasswords }
    );
    this.username = this.signUpForm.get('username') as FormControl;
    this.password = this.signUpForm.get('password') as FormControl;
    this.email = this.signUpForm.get('email') as FormControl;
  }

  ngOnInit() {
    this.subscribeToLogIn();
  }

  checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.passwordConfirm.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  goToPage(page: string): void {
    this.dialogRef.close();
    this.router.navigate([page]);
  }

  close() {
    this.dialogRef.close();
  }

  facebookLogin(): void {
    window.location.href = `${environment.apiUrl}/users/authenticate/fb`;
  }

  googleLogin(): void {
    this.store.dispatch(new fromAuth.GoogleSignIn());
  }

  openForgotPassword() {
    this.changeMode.emit('forgot-password');
  }

  signUp() {
    const user: User = {
      username: this.signUpForm.value.username,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      profileImageUrl: this.signUpForm.value.profileImageUrl,
    };

    this.store.dispatch(new fromAuth.SignUp({ user }));
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
    this.store.dispatch(new fromRoot.CloseSignUpModal());
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
