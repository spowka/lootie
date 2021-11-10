import { ProvablyFairModule } from './provably-fair.module';

describe('ProvablyFairModule', () => {
  let provablyFairModule: ProvablyFairModule;

  beforeEach(() => {
    provablyFairModule = new ProvablyFairModule();
  });

  it('should create an instance', () => {
    expect(provablyFairModule).toBeTruthy();
  });
});
