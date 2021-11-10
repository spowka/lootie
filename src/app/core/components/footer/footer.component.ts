import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MatButtonToggleChange } from '@angular/material';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromLayoutAction from 'src/app/@store/layout';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  public isMobile$: Observable<boolean>;

  public footerItems = [
    { name: 'FOOTER.TERMS_SERVICE', link: 'tos' },
    { name: 'FOOTER.PRIVACY', link: 'privacy' },
    { name: 'FOOTER.SHIPPING_REFUND', link: 'shipping-refund' },
    { name: 'FOOTER.EULA_TERMS', link: 'eula' },
    { name: 'FOOTER.CONTACT_US', link: 'contact-us' }
  ];

  public theme$: Observable<string>;

  private unsubscribe$: Subject<void> = new Subject();

  constructor(private store: Store<fromRoot.State>) {
    this.isMobile$ = this.store.pipe(select(fromRoot.selectIsMobile));
    this.theme$ = this.store.pipe(select(fromRoot.selectTheme));
  }

  ngOnInit() {}

  onChange(ob: MatButtonToggleChange): void {
    this.store.dispatch(new fromLayoutAction.ChangeTheme(ob.value));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
