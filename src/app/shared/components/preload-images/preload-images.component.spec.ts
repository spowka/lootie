import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloadImagesComponent } from './preload-images.component';

describe('PreloadImagesComponent', () => {
  let component: PreloadImagesComponent;
  let fixture: ComponentFixture<PreloadImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreloadImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreloadImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
