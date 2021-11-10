import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleBoxItemComponent } from './battle-box-item.component';

describe('BattleBoxItemComponent', () => {
  let component: BattleBoxItemComponent;
  let fixture: ComponentFixture<BattleBoxItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattleBoxItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleBoxItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
