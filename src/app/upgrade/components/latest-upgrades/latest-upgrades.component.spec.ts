import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestUpgradesComponent } from './latest-upgrades.component';

describe('LatestUpgradesComponent', () => {
  let component: LatestUpgradesComponent;
  let fixture: ComponentFixture<LatestUpgradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestUpgradesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestUpgradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
