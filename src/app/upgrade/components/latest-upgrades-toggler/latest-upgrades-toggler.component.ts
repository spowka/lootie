import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromLayout from 'src/app/@store/layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-latest-upgrades-toggler',
  templateUrl: './latest-upgrades-toggler.component.html',
  styleUrls: ['./latest-upgrades-toggler.component.scss']
})
export class LatestUpgradesTogglerComponent implements OnInit {

  isMobile$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.isMobile$ = this.store.pipe(select(fromRoot.selectIsMobile));
  }

  ngOnInit() {
  }

  toggleLatestUpgrades() {
    this.store.dispatch(new fromLayout.ToggleLatestUpgrades());
  }

}
