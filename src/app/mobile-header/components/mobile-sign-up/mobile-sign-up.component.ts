import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromAuth from 'src/app/auth/@store';
import * as fromLayoutAction from 'src/app/@store/layout';

import { MobileMenu } from '../../containers/mobile-menu/mobile-menu.component';
import { User } from 'src/app/auth/models/user-profile';
import { ErrorStateMatcher } from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-mobile-sign-up',
  templateUrl: './mobile-sign-up.component.html',
  styleUrls: ['./mobile-sign-up.component.scss']
})
export class MobileSignUpComponent implements OnInit, OnDestroy {

  public MobileMenu = MobileMenu;

  public signUpForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern(/^\S*$/)]],
    email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    passwordConfirm: ['', Validators.required],
    profileImageUrl: ['/assets/images/profile/male-1.svg'],
  }, { validator: this.checkPasswords });

  public matcher = new MyErrorStateMatcher();

  private unsubscribe$: Subject<void> = new Subject();

  @Output() changePage: EventEmitter<string> = new EventEmitter();

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit() { }

  goToPage(page: string): void {
    this.close();
    this.router.navigate([page]);
  }

  onChangePage(page: string): void {
    this.changePage.emit(page);
  }

  signUp() {
    if (this.signUpForm.value.password !== this.signUpForm.value.passwordConfirm) {
      return;
    }

    const user: User = {
      username: this.signUpForm.value.username,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      profileImageUrl: this.signUpForm.value.profileImageUrl,
    };

    this.store.dispatch(new fromAuth.SignUp({ user }));
  }

  close() {
    this.store.dispatch(new fromLayoutAction.ToggleHeaderNavbar());
  }

  checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.passwordConfirm.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
