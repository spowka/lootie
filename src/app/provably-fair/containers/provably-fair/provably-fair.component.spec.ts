import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvablyFairComponent } from './provably-fair.component';

describe('ProvablyFairComponent', () => {
  let component: ProvablyFairComponent;
  let fixture: ComponentFixture<ProvablyFairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvablyFairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvablyFairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
