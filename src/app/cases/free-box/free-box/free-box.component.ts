import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromAuth from 'src/app/auth/@store/auth';
import * as fromLayout from 'src/app/@store/layout';
import * as fromRouter from 'src/app/@store/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-free-box',
  templateUrl: './free-box.component.html',
  styleUrls: ['./free-box.component.scss']
})
export class FreeBoxComponent implements OnInit, OnDestroy {
  public isLoggedIn$: Observable<boolean>;

  public isLoading$: Observable<boolean>;

  private unsubscribe$: Subject<void> = new Subject();

  public refCode: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(10),
    Validators.pattern('^[0-9a-zA-Z$ _-]+$'),
  ]);

  public isInvite = false;

  constructor(
    private store: Store<fromRoot.State>,
    private route: ActivatedRoute,
    private authService: AuthService,
    private titleService: Title,
    private translate: TranslateService,
    private toast: ToastrService,
  ) {
    this.isLoading$ = this.store.pipe(select(fromAuth.selectLoading));

    this.titleService.setTitle('Free Box | Lootie');
  }

  ngOnInit() {
    this.isLoggedIn$ = this.store.pipe(select(fromAuth.selectIsLoggedIn));
    const refCode = this.route.snapshot.paramMap.get('code') || localStorage.getItem('refCode');

    if (refCode) {
      this.isLoggedIn$.pipe(takeUntil(this.unsubscribe$)).subscribe(isLoggedIn => {
        if (!isLoggedIn) {
          this.refCode.disable();
          localStorage.setItem('refCode', refCode);
          this.store.dispatch(new fromLayout.OpenLoginModal());
          return;
        }

        this.refCode.enable();
        this.isInvite = true;
        this.refCode.setValue(refCode);
        localStorage.removeItem('refCode');
        this.applyRefCode();
      });
    }
  }

  login(): void {
    this.store.dispatch(new fromLayout.OpenLoginModal());
  }

  applyRefCode(): void {
    this.refCode.setValue(this.refCode.value.trim());

    if (!this.refCode.valid) {
      this.translate.get('AFFILIATES.REF_CODE_INVALID').subscribe((response: string) => {
        this.toast.error(response);
      });
      return;
    }

    this.store.dispatch(new fromAuth.ApplyReferralCode(this.refCode.value));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
