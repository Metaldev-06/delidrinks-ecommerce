import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalAddressCardComponent } from './personal-address-card.component';

describe('PersonalAddressCardComponent', () => {
  let component: PersonalAddressCardComponent;
  let fixture: ComponentFixture<PersonalAddressCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalAddressCardComponent]
    });
    fixture = TestBed.createComponent(PersonalAddressCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
