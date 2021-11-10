import { CasesType } from './cases-type';
import { CaseItemModel } from './case-item.model';

export class CaseModel {
  _id?: string;
  name: string;
  image: string;
  caseType?: CasesType;
  caseTypes?: CasesType[];
  earning?: number;
  unboxCounts?: number;
  salePercent?: number;
  items?: CaseItemModel[];
  affiliateCut?: number;
  price?: number;
  creator?: string;
  updatedAt?: string;
  createdAt?: string;
  color?: string;
  slug?: string;
  houseEdge?: number;
  count?: number;
  badgeLabel?: string;
  __v?: number;
}
