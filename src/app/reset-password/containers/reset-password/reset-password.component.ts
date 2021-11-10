import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material';
import { FormBuilder, Validators, FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms';

import { Store } from '@ngrx/store';

import * as fromRoot from 'src/app/@store';
import * as fromAuth from 'src/app/auth/@store/auth/auth.action';

import { ResetPassword } from 'src/app/auth/models/reset-password';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public resetPasswordForm: FormGroup;

  public matcher = new MyErrorStateMatcher();
  public passCtrl: FormControl;
  private email: string;

  private resetToken: string;

  constructor(private fb: FormBuilder, private store: Store<fromRoot.State>, private route: ActivatedRoute) {
    this.email = this.route.snapshot.queryParams.email;
    this.resetToken = this.route.snapshot.queryParams.token;

    this.resetPasswordForm = this.fb.group({
      email: [{value: this.email, disabled: true}, [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: [''],
    }, { validator: this.checkPasswords });
    this.passCtrl = this.resetPasswordForm.get('newPassword') as FormControl;
  }

  public ngOnInit() {
  }

  public reset() {
    const context: ResetPassword = {
      email: this.email,
      resetToken: this.resetToken,
      newPassword: this.resetPasswordForm.value.newPassword
    };

    this.store.dispatch(new fromAuth.ResetPasswordAction({ context }));
  }

  private checkPasswords(group: FormGroup) {
    const pass = group.controls.newPassword.value;
    const confirmPass = group.controls.passwordConfirm.value;

    return pass === confirmPass ? null : { notSame: true };
  }

}
