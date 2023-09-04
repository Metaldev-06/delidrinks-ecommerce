import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberPhoneCardComponent } from './number-phone-card.component';

describe('NumberPhoneCardComponent', () => {
  let component: NumberPhoneCardComponent;
  let fixture: ComponentFixture<NumberPhoneCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NumberPhoneCardComponent]
    });
    fixture = TestBed.createComponent(NumberPhoneCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
