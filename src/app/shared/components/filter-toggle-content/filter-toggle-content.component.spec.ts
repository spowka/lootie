import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterToggleContentComponent } from './filter-toggle-content.component';

describe('FilterToggleContentComponent', () => {
  let component: FilterToggleContentComponent;
  let fixture: ComponentFixture<FilterToggleContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterToggleContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterToggleContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
