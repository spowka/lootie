import { CasesModule } from './cases.module';

describe('CasesModule', () => {
  let casesModule: CasesModule;

  beforeEach(() => {
    casesModule = new CasesModule();
  });

  it('should create an instance', () => {
    expect(casesModule).toBeTruthy();
  });
});
