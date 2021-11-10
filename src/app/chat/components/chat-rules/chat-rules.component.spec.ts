import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatRulesComponent } from './chat-rules.component';

describe('ChatRulesComponent', () => {
  let component: ChatRulesComponent;
  let fixture: ComponentFixture<ChatRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
