import * as fromProvablyFairActions from './provably-fair.action';
import { ProvablyFairService } from '../../provably-fair/services/provably-fair.service';
import { ServerSeed, PreviousSeeds } from 'src/app/provably-fair/models';

export class ProvablyFairState {
  id: string;
  clientSeed: string;
  serverSeedHashed: ServerSeed[];
  previousSeeds: PreviousSeeds;
  provablyFair: any;
  fromUrl: string;
  lookupModalOpened: boolean;
  loading: {
    clientSeed: boolean,
    serverSeed: boolean,
    provablyFair: boolean,
  };
  error: string;
}

const initialState: ProvablyFairState = {
  id: null,
  clientSeed: 'Not Available (N/A)',
  serverSeedHashed: [],
  previousSeeds: null,
  provablyFair: null,
  fromUrl: null,
  lookupModalOpened: false,
  loading: {
    clientSeed: false,
    serverSeed: false,
    provablyFair: false,
  },
  error: '',
};

export function provablyFairReducer(
  state: ProvablyFairState = initialState,
  action: fromProvablyFairActions.ProvablyFairActions,
): ProvablyFairState {
  switch (action.type) {
    case fromProvablyFairActions.OPEN_LOOKUP_MODAL: {
      return {
        ...state,
        lookupModalOpened: true
      };
    }

    case fromProvablyFairActions.CLOSE_LOOKUP_MODAL: {
      return {
        ...state,
        lookupModalOpened: false
      };
    }

    case fromProvablyFairActions.CHANGE_CLIENT_SEED: {
      return {
        ...state,
        loading: { ...state.loading, clientSeed: true },
      };
    }

    case fromProvablyFairActions.CHANGE_CLIENT_SEED_SUCCESS: {
      return {
        ...state,
        clientSeed: action['payload'],
        loading: { ...state.loading, clientSeed: false },
      };
    }

    case fromProvablyFairActions.CHANGE_CLIENT_SEED_FAIL: {
      return {
        ...state,
        error: action['payload'],
        loading: { ...state.loading, clientSeed: false },
      };
    }

    case fromProvablyFairActions.SET_HASHED_SERVER_SEED: {
      return {
        ...state,
        serverSeedHashed: action['payload'],
      };
    }

    case fromProvablyFairActions.SET_PREVIOUS_SEEDS: {
      const { serverSeed, serverSeedHashed, clientSeed } = action['payload'];

      return {
        ...state,
        previousSeeds: {
          serverSeed,
          serverSeedHashed,
          clientSeed
        },
      };
    }

    case fromProvablyFairActions.SET_URL_FROM: {
      return {
        ...state,
        fromUrl: action['payload'],
      };
    }

    case fromProvablyFairActions.UPDATE_SERVER_SEED: {
      return {
        ...state,
        loading: { ...state.loading, serverSeed: true },
      };
    }

    case fromProvablyFairActions.SET_ID: {
      return {
        ...state,
        id: action['payload'],
      };
    }

    case fromProvablyFairActions.UPDATE_SERVER_SEED_SUCCESS: {
      const updatedDice = action['payload'];
      const dices = state.serverSeedHashed.map(dice => {
        return dice.id === updatedDice._id ? { id: updatedDice._id, seed: updatedDice.seedHash } : dice;
      });

      return {
        ...state,
        serverSeedHashed: dices,
        loading: { ...state.loading, serverSeed: false },
        error: '',
      };
    }

    case fromProvablyFairActions.UPDATE_SERVER_SEED_FAIL: {
      return {
        ...state,
        loading: { ...state.loading, serverSeed: false },
        error: action['payload'],
      };
    }

    case fromProvablyFairActions.GET_PROVABLY_FAIR: {
      return {
        ...state,
        loading: { ...state.loading, provablyFair: true },
      };
    }

    case fromProvablyFairActions.GET_PROVABLY_FAIR_SUCCESS: {
      return {
        ...state,
        provablyFair: action['payload'],
        lookupModalOpened: true,
        loading: { ...state.loading, provablyFair: false },
        error: '',
      };
    }

    case fromProvablyFairActions.GET_PROVABLY_FAIR_FAIL: {
      return {
        ...state,
        loading: { ...state.loading, provablyFair: false },
        error: action['payload'],
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoading: any = (state: ProvablyFairState): any => state.loading;
export const getLookupModalOpened: any = (state: ProvablyFairState): boolean => state.lookupModalOpened;
export const getClientSeed: any = (state: ProvablyFairState): string => state.clientSeed;
export const getServerSeedHashed: any = (state: ProvablyFairState): ServerSeed[] => state.serverSeedHashed;
export const getPreviousSeeds: any = (state: ProvablyFairState): PreviousSeeds => state.previousSeeds;
export const getUrlFrom: any = (state: ProvablyFairState): string => state.fromUrl;
export const getId: any = (state: ProvablyFairState): string => state.id;
export const getProvablyFair: any = (state: ProvablyFairState): any => state.provablyFair;
