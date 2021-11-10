import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';

@Component({
  selector: 'app-battle-status-bar',
  templateUrl: './battle-status-bar.component.html',
  styleUrls: ['./battle-status-bar.component.scss']
})
export class BattleStatusBarComponent implements OnInit {
  public theme$: Observable<string>;
  public battle: any;

  constructor(private store: Store<fromRoot.State>) {
    this.theme$ = this.store.pipe(select(fromRoot.selectTheme));
  }

  ngOnInit() {
  }

}
