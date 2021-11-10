import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVerifyComponent } from './dialog-verify.component';

describe('DialogUserInfoComponent', () => {
  let component: DialogVerifyComponent;
  let fixture: ComponentFixture<DialogVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
