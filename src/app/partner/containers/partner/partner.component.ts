import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromRouter from 'src/app/@store/router';

import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss']
})
export class PartnerComponent implements OnInit {
  currentUrl$: Observable<string>;

  constructor(
    private titleService: Title,
    private store: Store<fromRoot.State>
  ) {
    this.titleService.setTitle('Are you an online entertainer of any sort? Twitch? Youtube?');
    this.currentUrl$ = this.store.pipe(select(fromRoot.selectgetActiveUrl));
  }

  ngOnInit() {
  }

  goBack() {
    this.store.dispatch(new fromRouter.Back());
  }
}
