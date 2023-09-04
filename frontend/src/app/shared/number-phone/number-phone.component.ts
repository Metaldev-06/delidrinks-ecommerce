import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'src/app/core/interfaces/message';
import { PhoneBody } from 'src/app/core/interfaces/phones.interfaces';
import { Phone, User } from 'src/app/core/interfaces/user.interfaces';
import { MessageService } from 'src/app/core/services/message-services/message.service';

@Component({
  selector: 'app-number-phone',
  templateUrl: './number-phone.component.html',
  styleUrls: ['./number-phone.component.scss'],
})
export class NumberPhoneComponent implements OnInit {
  @Input() numberPhone!: Phone[];
  @Input() userData!: User;
  @Output() numberFormData = new EventEmitter<PhoneBody>();
  @Output() deletedNumber = new EventEmitter<PhoneBody>();

  numberPhoneForm!: FormGroup;
  index: number = 0;

  private readonly formBuilder = inject(FormBuilder);
  private readonly messageService = inject(MessageService);

  ngOnInit(): void {
    this.numberPhoneForm = this.initNumberPhoneForm();
  }

  initNumberPhoneForm(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      filter: ['', [Validators.required]],
      area_code: ['', [Validators.required]],
      number_phone: ['', [Validators.required]],
      name: ['', [Validators.required]],
      primary: [],
    });
  }

  selectValue() {
    const selectedIndex = this.numberPhoneForm.value.filter;
    const selectedPhone = this.numberPhone[selectedIndex];

    this.numberPhoneForm.patchValue({
      id: selectedPhone.id,
      area_code: selectedPhone.area_code,
      number_phone: selectedPhone.number_phone,
      name: selectedPhone.name,
      primary: selectedPhone.primary,
    });
  }

  sendData() {
    if (this.numberPhoneForm.valid) {
      const formData = { ...this.numberPhoneForm.value };
      delete formData.filter;

      this.numberFormData.emit(formData);
    } else {
      const message: Message = {
        title: 'Campos requeridos incompletos',
        message: 'Debe completar los campos requeridos para guardar los datos',
      };

      this.messageService.showMessage(message);
    }
  }

  deleteNumber() {
    if (this.numberPhoneForm.valid) {
      const formData = { ...this.numberPhoneForm.value };
      delete formData.filter;
      this.deletedNumber.emit(formData);
    } else {
      const message: Message = {
        title: 'Debe seleccionar un número',
        message: 'Completa los campos requeridos para guardar los datos',
      };

      this.messageService.showMessage(message);
    }
  }
}
