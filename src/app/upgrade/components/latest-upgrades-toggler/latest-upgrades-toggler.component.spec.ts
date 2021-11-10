import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestUpgradesTogglerComponent } from './latest-upgrades-toggler.component';

describe('LatestUpgradesTogglerComponent', () => {
  let component: LatestUpgradesTogglerComponent;
  let fixture: ComponentFixture<LatestUpgradesTogglerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestUpgradesTogglerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestUpgradesTogglerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
