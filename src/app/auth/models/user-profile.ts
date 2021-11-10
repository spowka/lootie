import { Opskins } from './opskins';
import { ShippingInfo } from './shipping-info';

export interface User {
  _id?: string;
  hasFreeboxOpened?: boolean;
  username?: string;
  createdAt?: string;
  updatedAt?: string;
  name?: string;
  email?: string;
  emailSubscription?: boolean;
  password?: string;
  profileImageUrl?: string;
  opskins?: Opskins;
  balance?: number;
  caseEarnings?: number;
  unboxedCases?: number;
  referralCode?: string;    // referral code of this user
  referredCode?: string;    // referral code used to get freebox
  referralLevel?: number;
  referredUserCount?: number;
  referralDeposited?: number;
  lastDailyCaseOpened?: string;
  google?: { id: string; token: string };
  steam?: { id: string; tradeUrl: string };
  rewards?: Rewards;
  tradeUrl?: string;
  shippingAddress?: ShippingInfo;
  depositedValue?: number;
  type?: string;
  chatMuteInfo?: { minute: number; timestamp: string };
  loggedCount?: number;
}

interface Rewards {
  twitter: { claimed: boolean };
  facebook: { claimed: boolean };
  discord: { claimed: boolean };
  email: { claimed: boolean };
}
