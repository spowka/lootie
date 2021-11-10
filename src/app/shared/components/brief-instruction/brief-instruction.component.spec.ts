import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefInstructionComponent } from './brief-instruction.component';

describe('BriefInstructionComponent', () => {
  let component: BriefInstructionComponent;
  let fixture: ComponentFixture<BriefInstructionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefInstructionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
