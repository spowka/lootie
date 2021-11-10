import {
  Component,
  OnInit,
  Input
} from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromLayoutAction from 'src/app/@store/layout';

@Component({
  selector: 'app-mobile-navigation-item',
  templateUrl: './mobile-navigation-item.component.html',
  styleUrls: ['./mobile-navigation-item.component.scss']
})
export class MobileNavigationItemComponent implements OnInit {
  @Input() item: any;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {}

  close() {
    this.store.dispatch(new fromLayoutAction.ToggleHeaderNavbar());
  }
}
