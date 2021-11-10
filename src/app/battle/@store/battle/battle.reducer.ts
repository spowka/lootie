import * as _ from 'lodash';
import * as fromActions from './battle.action';

import { BattleModel, BattleRoundModel, BattleStatuses, BattleTypes } from 'src/app/battle/models';
import { CaseModel } from 'src/app/cases/models';

export class BattleState {
  battleBoxModalOpened: boolean;
  battles: BattleModel[];
  battle: BattleModel;
  boxes: CaseModel[];
  selectedBoxes: CaseModel[];
  loading: boolean;
  loaded: boolean;
  error: string;
  sortColumn: string;
  battleType: string;
  fromUrl: string;
}

const initialState: BattleState = {
  battleBoxModalOpened: false,
  battles: [],
  battle: null,
  boxes: [],
  selectedBoxes: [],
  loading: false,
  loaded: true,
  error: '',
  sortColumn: 'price',
  battleType: BattleTypes.list,
  fromUrl: ''
};

export function battleReducer(
  state: BattleState = initialState,
  action: fromActions.BattleActions
): BattleState {
  switch (action.type) {
    case fromActions.OPEN_BATTLE_BOX_MODAL: {
      return {
        ...state,
        battleBoxModalOpened: true,
      };
    }

    case fromActions.CLOSE_BATTLE_BOX_MODAL: {
      return {
        ...state,
        battleBoxModalOpened: false,
      };
    }

    case fromActions.LOAD_BATTLES: {
      return {
        ...state,
        loading: true,
        loaded: false,
        battleType: action['payload'].type,
      };
    }

    case fromActions.LOAD_BATTLES_SUCCESS: {
      return {
        ...state,
        battles: action['payload'],
        loading: false,
        loaded: true,
        error: '',
      };
    }

    case fromActions.LOAD_BATTLES_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action['payload'],
      };
    }

    case fromActions.LOAD_BATTLE: {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }

    case fromActions.LOAD_BATTLE_SUCCESS: {
      return {
        ...state,
        battle: action['payload'],
        loading: false,
        loaded: true,
        error: '',
      };
    }

    case fromActions.LOAD_BATTLE_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action['payload'],
      };
    }

    case fromActions.JOIN_BATTLE: {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }

    case fromActions.JOIN_BATTLE_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: '',
      };
    }

    case fromActions.JOIN_BATTLE_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action['payload'],
      };
    }

    case fromActions.QUIT_BATTLE: {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }

    case fromActions.QUIT_BATTLE_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: '',
      };
    }

    case fromActions.QUIT_BATTLE_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action['payload'],
      };
    }

    case fromActions.CREATE_BATTLE: {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }

    case fromActions.CREATE_BATTLE_SUCCESS: {
      return {
        ...state,
        battle: action['payload'],
        loading: false,
        loaded: true,
        error: '',
      };
    }

    case fromActions.CREATE_BATTLE_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action['payload'],
      };
    }

    case fromActions.LOAD_BOXES: {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }

    case fromActions.LOAD_BOXES_SUCCESS: {
      return {
        ...state,
        boxes: action['payload'],
        loading: false,
        loaded: true,
        error: '',
      };
    }

    case fromActions.LOAD_BOXES_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action['payload'],
      };
    }

    case fromActions.SELECT_BOXES: {
      return {
        ...state,
        selectedBoxes: action['payload'],
      };
    }

    case fromActions.UPDATE_BATTLE: {
      let _battle = { ...state.battle };
      const { battle, seed, user } = action['payload'];

      const returnedObj = {
        ...state,
      };

      if (_battle._id === battle._id) {
        _battle = { ..._battle, ...battle };
        _battle.sessions = [..._battle.sessions, { seed, user, rounds: [] }];
        returnedObj.battle = _battle;
      }

      const battleIndex = state.battles.findIndex((bat) => bat._id === battle._id);
      if (battleIndex > -1) {
        const updated = { ...state.battles[battleIndex] };
        updated.sessions = [...updated.sessions, user];
        returnedObj.battles = [
          ...state.battles.slice(0, battleIndex),
          updated,
          ...state.battles.slice(battleIndex + 1),
        ];
      }

      return returnedObj;
    }

    case fromActions.SET_READY_PLAYER: {
      const _battle = _.cloneDeep(state.battle);
      const { battle, user } = action['payload'];

      if (_battle._id !== battle._id) {
        return {
          ...state,
        };
      }

      _battle.sessions.forEach(bs => {
        if (bs.user._id === user) {
          bs.ready = true;
        }
      });

      return {
        ...state,
        battle: _battle,
      };
    }

    case fromActions.SET_BATTLE_ROUND: {
      const _roundBattle = action['payload'] as BattleRoundModel;
      if (!state.battle || (state.battle && state.battle._id !== _roundBattle.battle._id)) {
        return {
          ...state,
        };
      }

      let battle = { ...state.battle };
      battle = { ...battle, ..._roundBattle.battle, case: _roundBattle.case };
      battle.sessions = battle.sessions.map((session, i) => {
        const _round = _roundBattle.round[i];
        return {
          ...session,
          rounds: [
            ...session.rounds,
            { index: session.rounds.length, item: _round.winItemInfo.item },
          ],
        };
      });

      if (_roundBattle.battle.status === BattleStatuses.completed) {
        const rollInfo = _roundBattle.round[_roundBattle.round.length - 1].rollInfo;
        battle.dice = {
          _id: (_roundBattle.battle.dice as unknown) as string,
          clientSeed: rollInfo.clientSeed,
          seed: rollInfo.seed,
          seedHash: rollInfo.seedHash,
          rollValue: rollInfo.value,
        };

        const winner = battle.sessions.find((bs) => bs.user._id === _roundBattle.winInfo.winnerId);
        battle.winner = {
          _id: _roundBattle.winInfo.winnerId,
          username: winner.user.username,
          profileImageUrl: winner.user.profileImageUrl,
        };
      }

      return {
        ...state,
        battle,
      };
    }

    case fromActions.ADD_BATTLE_SUCCESS: {
      const battles = [...state.battles];
      if (state.battleType !== BattleTypes.mine) {
        battles.push(action['payload']);
      }

      return {
        ...state,
        battles,
        loading: false,
        loaded: true,
        error: '',
      };
    }

    case fromActions.LEAVE_BATTLE: {
      const { battle, user } = action['payload'];
      const _battle = _.cloneDeep(state.battle);
      const updatedBattle = { ..._battle, ...battle, sessions: state.battle.sessions.filter(bs => bs.user._id !== user) };

      return {
        ...state,
        battle: updatedBattle,
        battles: [...state.battles.filter(bs => bs._id !== battle._id), updatedBattle],
        loading: false,
        loaded: true,
        error: '',
      };
    }

    case fromActions.CANCEL_BATTLE_SUCCESS: {
      const id = action['payload'];
      const returnedObj = {
        ...state,
        battles: state.battles.filter((bat) => bat._id !== action['payload']),
        loading: false,
        loaded: true,
        error: '',
      };

      if (state.battle && state.battle._id === id) {
        returnedObj.battle = { ...state.battle, status: BattleStatuses.cancelled };
      }

      return returnedObj;
    }

    case fromActions.START_BATTLE: {
      let battles = [...state.battles];

      const battleIndex = state.battles.findIndex((bat) => bat._id === action['payload']);
      if (battleIndex > -1) {
        const updated = { ...state.battles[battleIndex] };
        updated.status = BattleStatuses.running;
        battles = [
          ...state.battles.slice(0, battleIndex),
          updated,
          ...state.battles.slice(battleIndex + 1),
        ];
      }
      return {
        ...state,
        battles,
      };
    }

    case fromActions.END_BATTLE: {
      return {
        ...state,
        battles: state.battles.filter((bat) => bat._id !== action['payload']),
      };
    }

    case fromActions.SET_BATTLE_SORT: {
      return {
        ...state,
        sortColumn: action['payload'],
      };
    }

    case fromActions.UPDATE_SERVER_SEED: {
      return {
        ...state,
        battle: { ...state.battle, dice: action['payload'] },
      };
    }

    case fromActions.SET_URL_FROM: {
      return {
        ...state,
        fromUrl: action['payload'],
      };
    }

    default: {
      return state;
    }
  }
}

export const getBattleState: any = (state: BattleState): BattleState => state;

export const getLoading: any = (state: BattleState): any => state.loading;
export const getLoaded: any = (state: BattleState): any => state.loaded;

export const getBattleBoxModalOpened: any = (state: BattleState): boolean =>
  state.battleBoxModalOpened;
export const getBattles: any = (state: BattleState): BattleModel[] =>
  _.slice(_.orderBy(state.battles, state.sortColumn, 'desc'), 0, 30);
export const getBattle: any = (state: BattleState): BattleModel => state.battle;

export const getBoxes: any = (state: BattleState): CaseModel[] => state.boxes;
export const getSelectedBoxes: any = (state: BattleState): CaseModel[] => state.selectedBoxes;

export const getUrlFrom: any = (state: BattleState): string => state.fromUrl;

