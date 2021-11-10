import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSiteItemsComponent } from './dialog-site-items.component';

describe('DialogSiteItemsComponent', () => {
  let component: DialogSiteItemsComponent;
  let fixture: ComponentFixture<DialogSiteItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSiteItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSiteItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
