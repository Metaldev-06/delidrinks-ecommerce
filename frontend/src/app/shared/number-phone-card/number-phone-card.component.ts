import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { take } from 'rxjs';
import { Message } from 'src/app/core/interfaces/message';
import { PhoneBody } from 'src/app/core/interfaces/phones.interfaces';
import { Phone, User } from 'src/app/core/interfaces/user.interfaces';
import { MessageService } from 'src/app/core/services/message-services/message.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-number-phone-card',
  templateUrl: './number-phone-card.component.html',
  styleUrls: ['./number-phone-card.component.scss'],
})
export class NumberPhoneCardComponent implements OnInit {
  @Input() phoneData!: Phone[];
  @Input() userData!: User;
  @Output() updateData = new EventEmitter<void>();

  public numberPhoneDialog: boolean = false;
  public addNumberPhoneDialog: boolean = false;

  private readonly userService = inject(UserService);
  private readonly messageService = inject(MessageService);

  ngOnInit(): void {}

  shownumberPhoneDialog() {
    this.numberPhoneDialog = true;
  }

  showAddNumberPhoneDialog() {
    this.addNumberPhoneDialog = true;
  }

  onFormNumberDataSaved(formData: PhoneBody) {
    this.userService
      .updateNumberPhone(formData, this.userData)
      .pipe(take(1))
      .subscribe((res) => {
        this.numberPhoneDialog = false;
        const message: Message = {
          title: 'Datos guardados',
          message: 'Ha actualizado correctamente sus datos',
        };

        this.messageService.showMessage(message);

        this.updateData.emit();
      });
  }

  addNewNumberPhone(formData: PhoneBody) {
    this.userService
      .addNumberPhone(formData, this.userData)
      .pipe(take(1))
      .subscribe((res) => {
        this.addNumberPhoneDialog = false;
        const message: Message = {
          title: 'Datos guardados',
          message: 'Se ha añadido correctamente su número de teléfono',
        };

        this.messageService.showMessage(message);

        this.updateData.emit();
      });
  }

  deletNumber(formData: PhoneBody) {
    this.numberPhoneDialog = false;
    this.userService.deleteNumberPhone(formData).subscribe((res) => {
      const message: Message = {
        title: 'Eliminado',
        message: 'Ha eliminado correctamente sus datos',
      };

      this.messageService.showMessage(message);

      this.updateData.emit();
    });
  }
}
