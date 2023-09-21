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
import { User } from 'src/app/core/interfaces/user.interfaces';
import { MessageService } from 'src/app/core/services/message-services/message.service';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss'],
})
export class PersonalDataComponent implements OnInit {
  @Input() userData!: User;
  @Output() formDataSaved = new EventEmitter<FormGroup>();

  personalDataForm!: FormGroup;

  private readonly formBuilder = inject(FormBuilder);
  private readonly messageService = inject(MessageService);

  ngOnInit(): void {
    this.personalDataForm = this.initPersonalDataForm();
  }

  initPersonalDataForm(): FormGroup {
    return this.formBuilder.group({
      email: [{ value: this.userData.email, disabled: true }],
      name: [this.userData.name, [Validators.required]],
      lastName: [this.userData.lastName, [Validators.required]],
      username: [
        this.userData.username,
        [Validators.required, Validators.maxLength(14)],
      ],
      birthday_date: [this.userData.birthday_date, [Validators.required]],
    });
  }

  saveData() {
    if (this.personalDataForm.valid) {
      this.formDataSaved.emit(this.personalDataForm);
    } else {
      const message: Message = {
        title: 'Campos requeridos incompletos',
        message: 'Debe completar los campos requeridos para guardar los datos',
      };
      const time = 10000;

      this.messageService.showMessage(message, time);
    }
  }
}
