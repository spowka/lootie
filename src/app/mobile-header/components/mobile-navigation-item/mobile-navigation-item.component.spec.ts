import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MobileNavigationItemComponent } from './mobile-navigation-item.component';

describe('MobileNavigationComponent', () => {
  let component: MobileNavigationItemComponent;
  let fixture: ComponentFixture<MobileNavigationItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileNavigationItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileNavigationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
