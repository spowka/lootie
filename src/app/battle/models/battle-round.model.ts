import { BattleModel } from './battle.model';
import { CaseModel, CaseItemModel } from 'src/app/cases/models';

export interface BattleRoundModel {
  battle: BattleModel;
  case: CaseModel;
  round: Round[];
  winInfo?: { winnerId: string, battleRoll: BattleRole };
}

interface Round {
  rollInfo: RollInfo;
  winItemInfo: CaseItemModel;
}

interface RollInfo {
  value: number;
  seedHash: string;
  clientSeed: string;
  seed: string;
}

interface BattleRole {
  clientSeed: string;
  seed: string;
  seedHash: string;
  value: number;
}
