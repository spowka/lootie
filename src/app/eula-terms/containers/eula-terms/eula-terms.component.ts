import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { select, Store } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromLayout from 'src/app/@store/layout';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-eula-terms',
  templateUrl: './eula-terms.component.html',
  styleUrls: ['./eula-terms.component.scss']
})
export class EulaTermsComponent implements OnInit {
  public isMobile$: Observable<boolean>;

  currentUrl$: Observable<string>;

  constructor(private store: Store<fromRoot.State>, private titleService: Title) {
    this.isMobile$ = this.store.pipe(select(fromLayout.selectIsMobile));
    this.currentUrl$ = this.store.pipe(select(fromRoot.selectgetActiveUrl));

    this.titleService.setTitle('EULA | Lootie');
  }

  ngOnInit() {
  }

}
