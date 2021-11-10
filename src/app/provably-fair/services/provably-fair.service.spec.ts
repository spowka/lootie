import { TestBed } from '@angular/core/testing';

import { ProvablyFairService } from './provably-fair.service';

describe('ProvablyFairService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProvablyFairService = TestBed.get(ProvablyFairService);
    expect(service).toBeTruthy();
  });
});
