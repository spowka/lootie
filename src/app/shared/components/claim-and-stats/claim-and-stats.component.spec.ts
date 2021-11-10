import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimAndStatsComponent } from './claim-and-stats.component';

describe('ClaimAndStatsComponent', () => {
  let component: ClaimAndStatsComponent;
  let fixture: ComponentFixture<ClaimAndStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimAndStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimAndStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
