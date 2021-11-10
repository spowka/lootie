import * as fromActions from './account.action';

export class AccountState {
  loading: boolean;
  loaded: boolean;
  error: string;
}

const initialState: AccountState = {
  loading: true,
  loaded: false,
  error: ''
};

export function accountReducer(
  state: AccountState = initialState,
  action: fromActions.AccountAction
): AccountState {
  switch (action) {

    default: {
      return state;
    }
  }
}

export const getAccountState: any = (state: AccountState): AccountState => state;
