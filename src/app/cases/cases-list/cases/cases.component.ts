import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormControl, AbstractControl } from '@angular/forms';

import { debounceTime, distinctUntilChanged, take, takeUntil, } from 'rxjs/operators';
import { Observable, Subject, combineLatest } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromAuth from 'src/app/auth/@store';
import * as fromLayout from 'src/app/@store/layout';
import * as fromCases from 'src/app/cases/@store';

import { NavbarItem } from 'src/app/shared/models';
import { CaseType, CasesType } from 'src/app/cases/models';

export function ValidateRegEx(control: AbstractControl) {
  try {
    RegExp(control.value);
  } catch (e) { return { validRegEx: false }; }

  return null;
}

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})
export class CasesComponent implements OnInit, OnDestroy {
  public isMobile$: Observable<boolean>;
  public isTablet$: Observable<boolean>;
  public isDesktop$: Observable<boolean>;
  public isLoggedIn$: Observable<boolean>;
  public isLoginModalOpened$: Observable<boolean>;
  public isChatOpened$: Observable<boolean>;
  public search$: Observable<string>;
  public backHistory$: Observable<any>;
  public caseType$: Observable<any>;

  public browseCases: FormControl;

  public isEnoghtBalance: boolean;

  public requiredDeposit: number;

  public isSearchExpanded = false;

  public casesNav: NavbarItem[];

  public selectedType: CasesType;

  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    public dialog: MatDialog,
    private store: Store<fromRoot.State>,
  ) {
    this.isMobile$ = this.store.pipe(select(fromLayout.selectIsMobile));
    this.isTablet$ = this.store.pipe(select(fromLayout.selectIsTablet));
    this.isDesktop$ = this.store.pipe(select(fromLayout.selectIsDesktop));
    this.isLoggedIn$ = this.store.pipe(select(fromAuth.selectIsLoggedIn));
    this.isChatOpened$ = this.store.pipe(select(fromLayout.selectChatOpened));
    this.backHistory$ = this.store.pipe(select(fromCases.selectBackHistory));
    this.browseCases = new FormControl('', ValidateRegEx);
    this.search$ = this.store.pipe(select(fromCases.selectSearch));
    this.isLoginModalOpened$ = this.store.pipe(select(fromRoot.selectLoginModalOpened));
    this.caseType$ = this.store.pipe(select(fromCases.selectCaseType));

    this.browseCases.valueChanges.pipe(
      debounceTime(700),
      distinctUntilChanged()
    ).subscribe(() => {
      if (this.browseCases.invalid) {
        return;
      }

      this.browseCases.disable();
      this.onBrowseCases();
      this.browseCases.enable();
    });

    combineLatest(
      this.store.pipe(select(fromCases.selectCheapestCase)),
      this.store.pipe(select(fromAuth.selectUser))
    ).subscribe(([price, user]) => {
      if (!user) {
        return;
      }

      this.isEnoghtBalance = user.balance > 0;
      this.requiredDeposit = !this.isEnoghtBalance ? price - user.balance : null;
    });

    this.search$.pipe(take(1)).subscribe(search => {
      this.browseCases.setValue(search);
      this.isSearchExpanded = search !== '';
    });

    this.casesNav = [
      { type: CaseType.official, title: 'CASES.CASES_NAV.OFFICIAL', caseName: 'official' },
      { type: CaseType.cent, title: 'CASES.CASES_NAV.CENT_BOX', caseName: 'cents' },
      { type: CaseType.streetwear, title: 'CASES.CASES_NAV.STREET_WEAR', caseName: 't-shirt' },
      { type: CaseType.electronics, title: 'CASES.CASES_NAV.ELECTRONICS', caseName: 'tv-2' },
      { type: CaseType.accessories, title: 'CASES.CASES_NAV.ACCESSORIES', caseName: 'hanger' },
      { type: CaseType.new, title: 'CASES.CASES_NAV.NEW_BOXES', caseName: 'new' },
    ];
  }

  ngOnInit() { }

  login(): void {
    this.store.dispatch(new fromLayout.OpenLoginModal());
  }

  onExpandSearch(): void {
    if (this.isSearchExpanded) {
      this.browseCases.disable();
      this.isSearchExpanded = false;
      return;
    }

    this.browseCases.enable();
    this.isSearchExpanded = true;
  }

  onBrowseCases(): void {
    this.store.dispatch(new fromCases.SearchCase(this.browseCases.value));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  selectTab(tab: any) {
    this.store.dispatch(new fromCases.SetCaseType(tab));
  }
}
