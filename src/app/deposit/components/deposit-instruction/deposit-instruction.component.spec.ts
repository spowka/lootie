import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositInstructionComponent } from './deposit-instruction.component';

describe('DepositInstructionComponent', () => {
  let component: DepositInstructionComponent;
  let fixture: ComponentFixture<DepositInstructionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositInstructionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
