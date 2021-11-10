import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../@store';
import * as fromAuth from '../../@store';
import { LoginContext, LoginProvider } from '../../models/login-context';

@Component({
  selector: 'app-steam-return',
  template: ''
})
export class SteamReturnComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const loginContext: LoginContext = {
        token: params['token']
      };
      const provider: LoginProvider = 'steam';

      this.store.dispatch(new fromAuth.SteamAuth({ loginContext, provider }));

    });
    this.router.navigate(['/mysterybox']);
  }

}
