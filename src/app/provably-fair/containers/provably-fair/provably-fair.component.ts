import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { NavbarItem } from 'src/app/shared/models';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogLookupComponent } from '../../components/dialog-lookup/dialog-lookup.component';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromLayout from 'src/app/@store/layout';
import * as fromRouter from 'src/app/@store/router';
import * as fromProvablyFair from 'src/app/@store/provably-fair';
import { ToastrService } from 'ngx-toastr';

import { Observable, Subject, combineLatest } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { ServerSeed, PreviousSeeds } from 'src/app/provably-fair/models';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-provably-fair',
  templateUrl: './provably-fair.component.html',
  styleUrls: ['./provably-fair.component.scss']
})

export class ProvablyFairComponent implements OnInit, OnDestroy {
  public isLookupModalOpened$: Observable<boolean>;

  public isMobile$: Observable<boolean>;

  public isDesktop$: Observable<boolean>;

  public loading$: Observable<boolean>;

  public id$: Observable<string>;

  public serverSeed$: Observable<ServerSeed[]>;

  public previousSeeds$: Observable<PreviousSeeds>;

  public fromURL$: Observable<string>;

  currentUrl$: Observable<string>;

  public currentClientSeedControl: FormControl;

  public lookupId: FormControl;

  public readonly historyNav: NavbarItem[] = [
    { url: '/provably-fair/unboxings', title: '' }
  ];

  public _clientSeed$: Observable<string>;

  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    public dialog: MatDialog,
    private store: Store<fromRoot.State>,
    private toast: ToastrService,
    private router: Router,
    private titleService: Title
  ) {
    this.isLookupModalOpened$ = this.store.pipe(select(fromProvablyFair.selectLookupModalOpened));
    this.isMobile$ = this.store.pipe(select(fromLayout.selectIsMobile));
    this.loading$ = this.store.pipe(select(fromProvablyFair.selectLoading));
    this.id$ = this.store.pipe(select(fromProvablyFair.selectId));
    this.serverSeed$ = this.store.pipe(select(fromProvablyFair.selectServerSeedHashed));
    this.previousSeeds$ = this.store.pipe(select(fromProvablyFair.selectPreviousSeeds));
    this._clientSeed$ = this.store.pipe(select(fromProvablyFair.selectClientSeed));
    this.fromURL$ = this.store.pipe(select(fromProvablyFair.selectUrlFrom));
    this.currentUrl$ = this.store.pipe(select(fromRoot.selectgetActiveUrl));


    this.titleService.setTitle('Provably Fair');

    this.currentClientSeedControl = new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(64), Validators.pattern('^[a-zA-Z0-9]+$')])
    );

    this.lookupId = new FormControl('', Validators.required);

    this.initSubscription();
  }

  ngOnInit() { }

  goBack() {
    this.store.dispatch(new fromRouter.Back());
  }

  initSubscription(): void {
    this._clientSeed$.pipe(takeUntil(this.unsubscribe$))
      .subscribe((clientSeed) => {
        this.currentClientSeedControl.setValue(clientSeed);
      });

    this.isLookupModalOpened$.pipe(takeUntil(this.unsubscribe$))
      .subscribe(opened => {
        if (opened) {
          DialogLookupComponent.show(this.dialog);
        }
      });
  }

  changeClientSeed(): void {
    if (this.currentClientSeedControl.invalid || !this.currentClientSeedControl.touched) {
      return;
    }

    this.id$.pipe(take(1)).subscribe(id => {
      this.store.dispatch(new fromProvablyFair.ChangeClientSeed({ id, seed: this.currentClientSeedControl.value }));
    });
  }

  changeServerSeed(diceId: string): void {
    combineLatest(this.id$, this.fromURL$).pipe(take(1)).subscribe(([id, fromURL]) => {
      this.store.dispatch(new fromProvablyFair.UpdateServerSeed({ id, diceId, isBattle: fromURL.includes('battle') }));
    });
  }

  onCopySuccess() {
    this.toast.success('Seed copied to clipboard');
  }

  onCopyFailure() {
    this.toast.error('Copy failed');
  }

  lookup(): void {
    if (this.lookupId.invalid) {
      return;
    }

    this.store.dispatch(new fromProvablyFair.GetProvablyFair(this.lookupId.value));
  }

  keyCheck(event: KeyboardEvent): void {
    const pattern = /[0-9]/;

    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.store.dispatch(new fromProvablyFair.SetUrlFrom(null));
    this.store.dispatch(new fromProvablyFair.SetHashedServerSeed([]));
  }

}
