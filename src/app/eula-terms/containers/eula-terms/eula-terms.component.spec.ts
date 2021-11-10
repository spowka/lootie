import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EulaTermsComponent } from './eula-terms.component';

describe('EulaTermsComponent', () => {
  let component: EulaTermsComponent;
  let fixture: ComponentFixture<EulaTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EulaTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EulaTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
