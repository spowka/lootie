import { UpgradeModule } from './upgrade.module';

describe('UpgradeModule', () => {
  let upgradeModule: UpgradeModule;

  beforeEach(() => {
    upgradeModule = new UpgradeModule();
  });

  it('should create an instance', () => {
    expect(upgradeModule).toBeTruthy();
  });
});
