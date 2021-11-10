import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxesComponent } from './dialog-boxes.component';

describe('DialogBoxesComponent', () => {
  let component: DialogBoxesComponent;
  let fixture: ComponentFixture<DialogBoxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBoxesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
