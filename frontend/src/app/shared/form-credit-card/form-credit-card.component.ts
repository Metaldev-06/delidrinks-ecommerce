import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-credit-card',
  templateUrl: './form-credit-card.component.html',
  styleUrls: ['./form-credit-card.component.scss'],
})
export class FormCreditCardComponent implements OnInit {
  paymentForm!: FormGroup;

  private formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.paymentForm = this.initFormPayment();
  }

  initFormPayment(): FormGroup {
    return this.formBuilder.group({
      nameCard: ['Luis Fernando Diaz', [Validators.required]],
      cardNumber: ['5424000000000015', [Validators.required]],
      expirationDate: ['0823', [Validators.required]],
      cardCode: ['900', [Validators.required]],
      check: [true, [Validators.required]],
    });
  }

  sendPay() {
    console.log(this.paymentForm.value);
  }
}
