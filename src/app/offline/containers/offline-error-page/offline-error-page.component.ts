import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromRoot from 'src/app/@store';
import * as fromLayout from 'src/app/@store/layout';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-offline-error-page',
  templateUrl: './offline-error-page.component.html',
  styleUrls: ['./offline-error-page.component.scss']
})
export class OfflineErrorPageComponent implements OnInit, OnDestroy {
  public timer: NodeJS.Timer;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.timer = setInterval(_ => {
      this.store.dispatch(new fromLayout.CheckStatus());
    }, 15000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

}
