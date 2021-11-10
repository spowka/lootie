import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromAuth from 'src/app/auth/@store/auth/auth.action';

@Component({
  selector: 'app-verify-email',
  template: ''
})
export class VerifyEmailComponent {

  constructor(
    private store: Store<fromRoot.State>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    (this.route.snapshot.queryParams.email && this.route.snapshot.queryParams.token) ?
      this.store.dispatch(
        new fromAuth.VerifyEmailAction({
          email: this.route.snapshot.queryParams.email,
          token: this.route.snapshot.queryParams.token
        })
      ) :
      this.router.navigate(['/']);
  }
}
