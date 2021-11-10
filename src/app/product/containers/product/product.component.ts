import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromLayout from 'src/app/@store/layout';
import * as fromRouter from 'src/app/@store/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  public isMobile$: Observable<boolean>;

  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private store: Store<fromRoot.State>,
  ) {
    this.isMobile$ = this.store.pipe(select(fromLayout.selectIsMobile));
  }

  ngOnInit() {}

  goBack(): void {
    this.store.dispatch(new fromRouter.Back());
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
