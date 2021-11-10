import { DepositModule } from './deposit.module';

describe('DepositModule', () => {
  let depositModule: DepositModule;

  beforeEach(() => {
    depositModule = new DepositModule();
  });

  it('should create an instance', () => {
    expect(depositModule).toBeTruthy();
  });
});
