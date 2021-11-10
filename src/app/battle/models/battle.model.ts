import { BattleStatus } from './battle-status.model';
import { CaseModel } from 'src/app/cases/models';

export interface BattleModel {
  _id?: string;
  cases: BattleCase[];
  case?: CaseModel;
  createdAt: string;
  creator: any;
  currentRound: number;
  dice?: BattleDice;
  price: number;
  sessions: BattleSession[];
  status: BattleStatus;
  totalRounds: number;
  totalWining?: number;
  userCount: number;
  winner: BattleWinner;
  private?: boolean;
}

interface BattleCase {
  count: number;
  image: string;
  name: string;
  case?: string;
}

export interface BattleSession {
  rounds: any[];
  seed: string;
  user: BattleUser;
  ready?: boolean;
}

export interface BattleUser {
  _id: string;
  profileImageUrl: string;
  username: string;
}

export interface BattleDice {
  _id: string;
  clientSeed: string;
  seed: string;
  seedHash: string;
  rollValue: number;
}
interface BattleWinner {
  _id: string;
  username: string;
  profileImageUrl: string;
}

export enum BattleTypes {
  mine = 'mine',
  history = 'history',
  list = 'list',
}
