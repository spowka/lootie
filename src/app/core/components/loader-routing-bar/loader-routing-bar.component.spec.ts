import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderRoutingBarComponent } from './loader-routing-bar.component';

describe('LoaderRoutingBarComponent', () => {
  let component: LoaderRoutingBarComponent;
  let fixture: ComponentFixture<LoaderRoutingBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderRoutingBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderRoutingBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
