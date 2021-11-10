import { RewardsModule } from './rewards.module';

describe('UpgradeModule', () => {
  let rewardsModule: RewardsModule;

  beforeEach(() => {
    rewardsModule = new RewardsModule();
  });

  it('should create an instance', () => {
    expect(rewardsModule).toBeTruthy();
  });
});
