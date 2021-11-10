import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogItemDescriptionComponent } from './dialog-item-description.component';

describe('DialogLookupComponent', () => {
  let component: DialogItemDescriptionComponent;
  let fixture: ComponentFixture<DialogItemDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogItemDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogItemDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
