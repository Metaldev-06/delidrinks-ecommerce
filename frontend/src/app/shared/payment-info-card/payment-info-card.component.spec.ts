import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentInfoCardComponent } from './payment-info-card.component';

describe('PaymentInfoCardComponent', () => {
  let component: PaymentInfoCardComponent;
  let fixture: ComponentFixture<PaymentInfoCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentInfoCardComponent]
    });
    fixture = TestBed.createComponent(PaymentInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
