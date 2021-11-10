import { WithdrawModule } from './withdraw.module';

describe('WithdrawModule', () => {
  let withdrawModule: WithdrawModule;

  beforeEach(() => {
    withdrawModule = new WithdrawModule();
  });

  it('should create an instance', () => {
    expect(withdrawModule).toBeTruthy();
  });
});
