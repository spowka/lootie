import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInventoryComponent } from './dialog-inventory.component';

describe('DialogInventoryComponent', () => {
  let component: DialogInventoryComponent;
  let fixture: ComponentFixture<DialogInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
