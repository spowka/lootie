import * as fromRewardsActions from './rewards.action';

export class RewardsState {
  loaded: boolean;
  loading: boolean;
  error: string;
}

const initialState: RewardsState = {
  loaded: true,
  loading: false,
  error: '',
};

export function rewardsReducer(
  state: RewardsState = initialState,
  action: fromRewardsActions.RewardsActions
): RewardsState {
  switch (action.type) {

    default: {
      return state;
    }
  }
}
