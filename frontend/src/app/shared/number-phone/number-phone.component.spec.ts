import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberPhoneComponent } from './number-phone.component';

describe('NumberPhoneComponent', () => {
  let component: NumberPhoneComponent;
  let fixture: ComponentFixture<NumberPhoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NumberPhoneComponent]
    });
    fixture = TestBed.createComponent(NumberPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
