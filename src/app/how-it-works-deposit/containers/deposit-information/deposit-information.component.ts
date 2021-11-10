import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from 'src/app/@store';
import * as fromLayout from 'src/app/@store/layout';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-deposit-information',
  templateUrl: './deposit-information.component.html',
  styleUrls: ['./deposit-information.component.scss']
})
export class DepositInformationComponent implements OnInit {
  public isMobile$: Observable<boolean>;

  currentUrl$: Observable<string>;

  public theme$: Observable<string>;

  constructor(private store: Store<fromRoot.State>, private titleService: Title) {
    this.isMobile$ = this.store.pipe(select(fromLayout.selectIsMobile));
    this.theme$ = this.store.pipe(select(fromRoot.selectTheme));
    this.currentUrl$ = this.store.pipe(select(fromRoot.selectgetActiveUrl));

    this.titleService.setTitle('How it works | Lootie');
  }

  ngOnInit() {
  }
}
