import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromAuth from 'src/app/auth/@store';
import * as fromLayoutAction from 'src/app/@store/layout';

import { environment } from 'src/environments/environment';
import { MobileMenu } from '../../containers/mobile-menu/mobile-menu.component';
import { MatButtonToggleChange, MatDialog } from '@angular/material';
import { AuthDialogComponent } from 'src/app/core/components';

@Component({
  selector: 'app-mobile-logoff',
  templateUrl: './mobile-logoff.component.html',
  styleUrls: ['./mobile-logoff.component.scss']
})
export class MobileLogoffComponent implements OnInit, OnDestroy {
  public MobileMenu = MobileMenu;

  public theme$: Observable<string>;

  private unsubscribe$: Subject<void> = new Subject();

  @Output() changePage: EventEmitter<string> = new EventEmitter();

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.theme$ = this.store.pipe(select(fromRoot.selectTheme));
  }

  ngOnInit() {}

  goToPage(page: string): void {
    this.close();
    this.router.navigate([page]);
  }

  close() {
    this.store.dispatch(new fromLayoutAction.ToggleHeaderNavbar());
  }

  steamLogin(): void {
    window.location.href = `${environment.apiUrl}/users/authenticate/steam`;
  }

  opskinsLogin(): void {
    window.location.href = `${environment.apiUrl}/users/authenticate/opskins`;
  }

  onChange(ob: MatButtonToggleChange): void {
    this.store.dispatch(new fromLayoutAction.ChangeTheme(ob.value));
  }

  facebookLogin(): void {
    window.location.href = `${environment.apiUrl}/users/authenticate/fb`;
  }

  googleLogin(): void {
    this.store.dispatch(new fromAuth.GoogleSignIn());
  }

  openAuthDialog(mode: string): void {
    (mode === 'register') ?
      this.store.dispatch(new fromLayoutAction.OpenSignUpModal()) :
      this.store.dispatch(new fromLayoutAction.OpenLoginModal());
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
