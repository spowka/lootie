import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleCountdownComponent } from './battle-countdown.component';

describe('BattleCountdownComponent', () => {
  let component: BattleCountdownComponent;
  let fixture: ComponentFixture<BattleCountdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattleCountdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleCountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
