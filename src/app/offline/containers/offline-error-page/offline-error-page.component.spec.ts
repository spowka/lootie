import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineErrorPageComponent } from './offline-error-page.component';

describe('OfflineErrorPageComponent', () => {
  let component: OfflineErrorPageComponent;
  let fixture: ComponentFixture<OfflineErrorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfflineErrorPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfflineErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
