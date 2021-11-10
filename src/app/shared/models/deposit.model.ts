export class DepositModel {
  _id: string;
  value: number;
  transactionType: 'ADJUSTMENT' | 'DEPOSIT' | 'WITHDRAW' | 'COUPON' | 'REWARD' | 'AFFILIATE_REWARD';
  subType: string;
  user?: {
    _id: string;
    email: string;
    username: string;
  };
  extId?: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}
