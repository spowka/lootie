import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../@store';
import * as fromAuth from '../../@store';
import { LoginContext, LoginProvider } from '../../models/login-context';

@Component({
  selector: 'app-opskins-return',
  template: ''
})
export class OpskinsReturnComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const loginContext: LoginContext = {
        token: params['token']
      };
      const provider: LoginProvider = 'opskins';

      this.store.dispatch(new fromAuth.OpskinsAuth({ loginContext, provider }));

    });
    this.router.navigate(['/mysterybox']);
  }

}
