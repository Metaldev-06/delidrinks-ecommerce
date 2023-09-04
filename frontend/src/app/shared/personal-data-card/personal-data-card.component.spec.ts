import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDataCardComponent } from './personal-data-card.component';

describe('PersonalDataCardComponent', () => {
  let component: PersonalDataCardComponent;
  let fixture: ComponentFixture<PersonalDataCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalDataCardComponent]
    });
    fixture = TestBed.createComponent(PersonalDataCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
