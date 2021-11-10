import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmojiMenuComponent } from './emoji-menu.component';

describe('EmojiMenuComponent', () => {
  let component: EmojiMenuComponent;
  let fixture: ComponentFixture<EmojiMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmojiMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmojiMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
