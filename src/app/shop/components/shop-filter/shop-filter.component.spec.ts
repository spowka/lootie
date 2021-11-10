import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopFilterComponent } from './shop-filter.component';

describe('ShopFilterComponent', () => {
  let component: ShopFilterComponent;
  let fixture: ComponentFixture<ShopFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
