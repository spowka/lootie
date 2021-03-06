import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SteamReturnComponent } from './steam-return.component';

describe('SteamReturnComponent', () => {
  let component: SteamReturnComponent;
  let fixture: ComponentFixture<SteamReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SteamReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SteamReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
