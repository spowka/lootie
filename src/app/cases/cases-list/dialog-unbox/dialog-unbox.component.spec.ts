import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUnboxComponent } from './dialog-unbox.component';

describe('DialogUnboxComponent', () => {
  let component: DialogUnboxComponent;
  let fixture: ComponentFixture<DialogUnboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogUnboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUnboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
