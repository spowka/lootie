import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogWinnerComponent } from './dialog-winner.component';

describe('DialogWinnerComponent', () => {
  let component: DialogWinnerComponent;
  let fixture: ComponentFixture<DialogWinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogWinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogWinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
