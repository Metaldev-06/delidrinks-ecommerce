import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressBody } from 'src/app/core/interfaces/address.interface';
import { Message } from 'src/app/core/interfaces/message';
import { Address, User } from 'src/app/core/interfaces/user.interfaces';
import { MessageService } from 'src/app/core/services/message-services/message.service';

@Component({
  selector: 'app-personal-address',
  templateUrl: './personal-address.component.html',
  styleUrls: ['./personal-address.component.scss'],
})
export class PersonalAddressComponent implements OnInit {
  @Input() personalAddress!: Address[];
  @Input() userData!: User;
  @Input() showInfo: boolean = true;
  @Input() updateAddres: boolean = true;

  @Output() addressFormData = new EventEmitter<AddressBody>();
  @Output() addAddressFormData = new EventEmitter<AddressBody>();
  @Output() deletedaddress = new EventEmitter<AddressBody>();

  public addressForm!: FormGroup;
  public index: number = 0;

  private readonly formBuilder = inject(FormBuilder);
  private readonly messageService = inject(MessageService);

  ngOnInit(): void {
    this.addressForm = this.initAddressForm();
  }

  initAddressForm(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      filter: [''],
      province: ['', [Validators.required]],
      postal_code: ['', [Validators.required]],
      city: ['', [Validators.required]],
      address: ['', [Validators.required]],
      observations: [''],
      name: ['', [Validators.required]],
      primary: [],
    });
  }

  selectValue() {
    const selectedIndex = this.addressForm.value.filter;
    const selectedAddress = this.personalAddress[selectedIndex];

    this.addressForm.patchValue({
      id: selectedAddress.id,
      province: selectedAddress.province,
      postal_code: selectedAddress.postal_code,
      city: selectedAddress.city,
      address: selectedAddress.address,
      observations: selectedAddress.observations,
      name: selectedAddress.name,
      primary: selectedAddress.primary,
    });
  }

  sendData() {
    if (this.addressForm.valid) {
      const formData = { ...this.addressForm.value };
      delete formData.filter;

      this.addressFormData.emit(formData);
    } else {
      const message: Message = {
        title: 'Campos requeridos incompletos',
        message: 'Debe completar los campos requeridos para guardar los datos',
      };

      this.messageService.showMessage(message);
    }
  }

  addNewAddress() {
    if (this.addressForm.valid) {
      const formData = { ...this.addressForm.value };
      delete formData.filter;

      this.addAddressFormData.emit(formData);
    } else {
      const message: Message = {
        title: 'Campos requeridos incompletos',
        message: 'Debe completar los campos requeridos para guardar los datos',
      };

      this.messageService.showMessage(message);
    }
  }

  deleteNumber() {
    if (this.addressForm.valid) {
      const formData = { ...this.addressForm.value };
      delete formData.filter;
      this.deletedaddress.emit(formData);
    } else {
      const message: Message = {
        title: 'Debe seleccionar un número',
        message: 'Completa los campos requeridos para guardar los datos',
      };

      this.messageService.showMessage(message);
    }
  }
}
