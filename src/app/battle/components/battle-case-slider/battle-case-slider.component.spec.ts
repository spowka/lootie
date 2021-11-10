import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleCaseSliderComponent } from './battle-case-slider.component';

describe('BattleCaseSliderComponent', () => {
  let component: BattleCaseSliderComponent;
  let fixture: ComponentFixture<BattleCaseSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattleCaseSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleCaseSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
