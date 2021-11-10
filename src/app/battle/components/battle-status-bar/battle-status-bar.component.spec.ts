import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleStatusBarComponent } from './battle-status-bar.component';

describe('BattleStatusBarComponent', () => {
  let component: BattleStatusBarComponent;
  let fixture: ComponentFixture<BattleStatusBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattleStatusBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleStatusBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
