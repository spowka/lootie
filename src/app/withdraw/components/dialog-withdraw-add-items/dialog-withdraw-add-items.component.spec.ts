import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogWithdrawAddItemsComponent } from './dialog-withdraw-add-items.component';

describe('DialogWithdrawAddItemsComponent', () => {
  let component: DialogWithdrawAddItemsComponent;
  let fixture: ComponentFixture<DialogWithdrawAddItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogWithdrawAddItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogWithdrawAddItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
