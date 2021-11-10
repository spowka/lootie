import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromAuth from 'src/app/auth/@store';
import * as fromLayoutAction from 'src/app/@store/layout';

import { MobileMenu } from '../../containers/mobile-menu/mobile-menu.component';
import { LoginContext, LoginProvider } from 'src/app/auth/models/login-context';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-mobile-login',
  templateUrl: './mobile-login.component.html',
  styleUrls: ['./mobile-login.component.scss']
})
export class MobileLoginComponent implements OnInit, OnDestroy {

  public MobileMenu = MobileMenu;

  public remember = new FormControl(false);

  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    password: new FormControl('', [Validators.required]),
    remember: this.remember,
  });

  private unsubscribe$: Subject<void> = new Subject();

  @Output() changePage: EventEmitter<string> = new EventEmitter();

  constructor(private store: Store<fromRoot.State>, private router: Router, private authService: AuthService) { }

  ngOnInit() { }

  goToPage(page: string): void {
    this.close();
    this.router.navigate([page]);
  }

  onChangePage(page: string): void {
    this.changePage.emit(page);
  }

  login() {
    const loginContext: LoginContext = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    const provider: LoginProvider = 'local';

    this.store.dispatch(new fromAuth.Login({ loginContext, provider }));

    localStorage.setItem('remember', this.loginForm.value.remember);
  }

  close() {
    this.store.dispatch(new fromLayoutAction.ToggleHeaderNavbar());
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
