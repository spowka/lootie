import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatTogglerComponent } from './chat-toggler.component';

describe('ChatTogglerComponent', () => {
  let component: ChatTogglerComponent;
  let fixture: ComponentFixture<ChatTogglerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatTogglerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatTogglerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
