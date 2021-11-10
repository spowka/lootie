import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleWaitingComponent } from './battle-waiting.component';

describe('BattleWaitingComponent', () => {
  let component: BattleWaitingComponent;
  let fixture: ComponentFixture<BattleWaitingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattleWaitingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleWaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
