export type LoginProvider = 'steam' | 'opskins' | 'local' | 'google';

export interface LoginContext {
  email?: string;
  password?: string;
  idToken?: string;
  token?: string;
  remember?: boolean;
}
