import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromRouter from 'src/app/@store/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-unboxings-instruction',
  templateUrl: './unboxings-instruction.component.html',
  styleUrls: ['./unboxings-instruction.component.scss']
})
export class UnboxingsInstructionComponent implements OnInit {

  public unboxingsInfoItems = [
    { title: 'UNBOXINGS.INFO.MAKE_VIDEO' },
    { title: 'UNBOXINGS.INFO.SOCIAL_POST' },
    { title: 'UNBOXINGS.INFO.SUPPORT' },
  ];

  public isShow = false;

  public isMobile$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.State>,
  ) {
    this.isMobile$ = this.store.pipe(select(fromRoot.selectIsMobile));
  }

  ngOnInit() {
  }

  public toggleInfo(): void {
    this.isShow = !this.isShow;
  }

  public goBack(): void {
    this.store.dispatch(new fromRouter.Back);
  }
}
