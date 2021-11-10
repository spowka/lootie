import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasesSliderComponent } from './cases-slider.component';

describe('CasesSliderComponent', () => {
  let component: CasesSliderComponent;
  let fixture: ComponentFixture<CasesSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasesSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasesSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
