import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from 'src/app/@store';

@Component({
  selector: 'app-loading-block',
  templateUrl: './loading-block.component.html',
  styleUrls: ['./loading-block.component.scss']
})
export class LoadingBlockComponent implements OnInit {

  public theme$: Observable<string>;

  constructor(private store: Store<fromRoot.State>) {
    this.theme$ = this.store.pipe(select(fromRoot.selectTheme));
  }

  ngOnInit() {
  }

}
