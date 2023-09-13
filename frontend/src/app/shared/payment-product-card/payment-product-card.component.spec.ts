import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentProductCardComponent } from './payment-product-card.component';

describe('PaymentProductCardComponent', () => {
  let component: PaymentProductCardComponent;
  let fixture: ComponentFixture<PaymentProductCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentProductCardComponent]
    });
    fixture = TestBed.createComponent(PaymentProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
