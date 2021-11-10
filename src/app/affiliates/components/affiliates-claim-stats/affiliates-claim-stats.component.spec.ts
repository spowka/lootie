import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliatesClaimStatsComponent } from './affiliates-claim-stats.component';

describe('AffiliatesClaimStatsComponent', () => {
  let component: AffiliatesClaimStatsComponent;
  let fixture: ComponentFixture<AffiliatesClaimStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AffiliatesClaimStatsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliatesClaimStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
