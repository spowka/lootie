import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';

import { AccountService } from 'src/app/account/services/account.service';
import { ToastrService } from 'ngx-toastr';

import * as fromActions from './account.action';
import * as fromRoot from 'src/app/@store';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AccountEffects {

  constructor(
    private actions$: Actions,
    private accountService: AccountService,
    private toast: ToastrService,
    private translate: TranslateService,
    private store: Store<fromRoot.State>
  ) { }

}
