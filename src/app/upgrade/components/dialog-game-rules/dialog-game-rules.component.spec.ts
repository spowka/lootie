import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGameRulesComponent } from './dialog-game-rules.component';

describe('DialogGameRulesComponent', () => {
  let component: DialogGameRulesComponent;
  let fixture: ComponentFixture<DialogGameRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogGameRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogGameRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
