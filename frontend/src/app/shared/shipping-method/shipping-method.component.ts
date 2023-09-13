import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'src/app/core/interfaces/message';
import { ShippingMethod } from 'src/app/core/interfaces/shipping-method.interface';
import { MessageService } from 'src/app/core/services/message-services/message.service';

@Component({
  selector: 'app-shipping-method',
  templateUrl: './shipping-method.component.html',
  styleUrls: ['./shipping-method.component.scss'],
})
export class ShippingMethodComponent implements OnInit {
  @Output() shippingMethodData = new EventEmitter<ShippingMethod>();

  public shippingMethodForm!: FormGroup;

  private readonly formBuilder = inject(FormBuilder);
  private readonly messageService = inject(MessageService);

  categories: any[] = [
    { name: 'Retiro en Puerta', shipping_method: 'retiro en puerta', price: 0 },
    {
      name: 'Motomandado (Formosa Capital)',
      shipping_method: 'motomandado',
      price: 500,
    },
    { name: 'A domicilio', shipping_method: 'a domicilio', price: 2500 },
    { name: 'En sucursal', shipping_method: 'en sucursal', price: 2000 },
  ];

  ngOnInit(): void {
    this.shippingMethodForm = this.initShippingMethodForm();
  }

  initShippingMethodForm(): FormGroup {
    return this.formBuilder.group({
      selectedMethod: ['', Validators.required],
    });
  }

  sendData() {
    if (this.shippingMethodForm.invalid) {
      const message: Message = {
        title: 'Complete los campos',
        message: 'Es necesario elegir un método de envío para seguir',
      };

      this.messageService.showMessage(message);
      return;
    }

    const data = this.shippingMethodForm.value.selectedMethod;

    this.shippingMethodData.emit(data);
  }
}
