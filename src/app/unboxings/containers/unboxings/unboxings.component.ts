import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-unboxings',
  templateUrl: './unboxings.component.html',
  styleUrls: ['./unboxings.component.scss']
})
export class UnboxingsComponent implements OnInit {
  currentUrl$: Observable<string>;

  constructor(private store: Store<fromRoot.State>) {
    this.currentUrl$ = this.store.pipe(select(fromRoot.selectgetActiveUrl));
  }

  ngOnInit() { }
}
