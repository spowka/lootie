import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { select, Store } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromLayout from 'src/app/@store/layout';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-upgrade-information',
  templateUrl: './upgrade-information.component.html',
  styleUrls: ['./upgrade-information.component.scss']
})
export class UpgradeInformationComponent implements OnInit {
  public isMobile$: Observable<boolean>;

  public theme$: Observable<string>;

  currentUrl$: Observable<string>;

  constructor(private store: Store<fromRoot.State>,  private titleService: Title) {
    this.isMobile$ = this.store.pipe(select(fromLayout.selectIsMobile));
    this.theme$ = this.store.pipe(select(fromRoot.selectTheme));
    this.currentUrl$ = this.store.pipe(select(fromRoot.selectgetActiveUrl));

    this.titleService.setTitle('How it works | Lootie');
  }

  ngOnInit() {
  }
}
