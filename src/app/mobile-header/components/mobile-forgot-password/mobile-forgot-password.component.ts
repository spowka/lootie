import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromAuth from 'src/app/auth/@store';
import * as fromLayoutAction from 'src/app/@store/layout';

import { MobileMenu } from '../../containers/mobile-menu/mobile-menu.component';
import { ForgotPassword } from 'src/app/auth/models/forgot-password';

@Component({
  selector: 'app-mobile-forgot-password',
  templateUrl: './mobile-forgot-password.component.html',
  styleUrls: ['./mobile-forgot-password.component.scss']
})
export class MobileForgotPasswordComponent implements OnInit, OnDestroy {
  public loading$: Observable<boolean>;

  public MobileMenu = MobileMenu;

  public forgotPassword = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
  });

  private unsubscribe$: Subject<void> = new Subject();

  @Output() changePage: EventEmitter<string> = new EventEmitter();

  constructor(private store: Store<fromRoot.State>, private router: Router) {
    this.loading$ = this.store.pipe(select(fromAuth.selectLoading));
  }

  ngOnInit() { }

  goToPage(page: string): void {
    this.close();
    this.router.navigate([page]);
  }

  onChangePage(page: string): void {
    this.changePage.emit(page);
  }

  reset() {
    const context: ForgotPassword = {
      email: this.forgotPassword.value.email,
    };
    this.store.dispatch(new fromAuth.ForgotPasswordAction({ context }));
  }

  close() {
    this.store.dispatch(new fromLayoutAction.ToggleHeaderNavbar());
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
