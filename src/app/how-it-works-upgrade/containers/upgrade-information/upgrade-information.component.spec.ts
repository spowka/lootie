import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeInformationComponent } from './upgrade-information.component';

describe('UpgradeInformationComponent', () => {
  let component: UpgradeInformationComponent;
  let fixture: ComponentFixture<UpgradeInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpgradeInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgradeInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
