import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnboxingsComponent } from './unboxings.component';

describe('UnboxingsComponent', () => {
  let component: UnboxingsComponent;
  let fixture: ComponentFixture<UnboxingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnboxingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnboxingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
