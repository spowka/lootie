import { AffiliatesModule } from './affiliates.module';

describe('AffiliatesModule', () => {
  let affiliatesModule: AffiliatesModule;

  beforeEach(() => {
    affiliatesModule = new AffiliatesModule();
  });

  it('should create an instance', () => {
    expect(affiliatesModule).toBeTruthy();
  });
});
