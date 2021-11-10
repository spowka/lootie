import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GooglePlacesDirective } from './google-places.directive';

@Component({
  selector: 'my-test-component',
  template: ''
})
class TestComponent {}

describe('GooglePlacesDirective', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        GooglePlacesDirective
      ]
    });
  });



  it('should create an instance', () => {
    TestBed.overrideComponent(TestComponent, {
      set: {
        template: '<div google-place></div>'
      }
    });

    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestComponent);
      const directiveEl = fixture.debugElement.query(By.directive(GooglePlacesDirective));
      expect(directiveEl).not.toBeNull();
    }); 
  });
});
