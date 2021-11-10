import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSelectChange } from '@angular/material';

import { NavbarItem } from '../../../shared/models/index';
import { Title } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromRouter from 'src/app/@store/router';
import * as fromLayout from 'src/app/@store/layout';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, OnDestroy {
  public isMobile$: Observable<boolean>;

  public historyRoute: string;

  public historyNav: NavbarItem[] = [
    { url: '/history/unboxings', title: 'HISTORY.NAVBAR.UNBOXINGS' },
    { url: '/history/deposits', title: 'HISTORY.NAVBAR.DEPOSITS' },
    // { url: '/history/withdrawals', title: 'HISTORY.NAVBAR.WITHDRAWALS' },
    { url: '/history/order', title: 'HISTORY.NAVBAR.ORDER' },
    // { url: '/history/mystery-battles', title: 'HISTORY.NAVBAR.MYSTERY_BATTLES' },
    // { url: '/history/transactions', title: 'HISTORY.NAVBAR.TRANSACTIONS' }
  ];

  private routerSub: any;

  constructor(
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>
  ) {
    this.titleService.setTitle('History | Lootie');
    this.isMobile$ = this.store.pipe(select(fromLayout.selectIsMobile));

    this.routerSub = router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.historyRoute = event.urlAfterRedirects;
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }

  public routeTo(data: MatSelectChange): void {
    this.router.navigate([data.value]);
  }

  public goBack(): void {
    this.store.dispatch(new fromRouter.Back());
  }
}
