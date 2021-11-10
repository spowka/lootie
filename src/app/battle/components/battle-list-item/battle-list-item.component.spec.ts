import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleListItemComponent } from './battle-list-item.component';

describe('BattleListItemComponent', () => {
  let component: BattleListItemComponent;
  let fixture: ComponentFixture<BattleListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattleListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
