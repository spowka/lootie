import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromRoot from 'src/app/@store';
import * as fromAffiliates from './affiliates.reducer';
import * as fromAffiliatesReducer from '../reducer';

import { ReferralInfoModel } from 'src/app/affiliates/models';

export const getAffiliatesState: MemoizedSelector<fromRoot.State, fromAffiliates.AffiliatesState> = createSelector(
  fromAffiliatesReducer.getAffiliatesFeatureState,
  (state: fromAffiliatesReducer.AffiliatesFeatureState) => state.affiliates
);

export const selectLoading: MemoizedSelector<fromRoot.State, boolean> = createSelector(
  getAffiliatesState,
  fromAffiliates.getLoading
);

export const selectReferralInfo: MemoizedSelector<fromRoot.State, ReferralInfoModel> = createSelector(
  getAffiliatesState,
  fromAffiliates.getReferralInfo
);
