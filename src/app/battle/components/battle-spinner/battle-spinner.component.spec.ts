import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleSpinnerComponent } from './battle-spinner.component';

describe('BattleSpinnerComponent', () => {
  let component: BattleSpinnerComponent;
  let fixture: ComponentFixture<BattleSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattleSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
