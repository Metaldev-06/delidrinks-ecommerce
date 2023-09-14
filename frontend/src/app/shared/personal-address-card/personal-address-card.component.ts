import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { take } from 'rxjs';
import { AddressBody } from 'src/app/core/interfaces/address.interface';
import { Message } from 'src/app/core/interfaces/message';
import { Address, User } from 'src/app/core/interfaces/user.interfaces';
import { MessageService } from 'src/app/core/services/message-services/message.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-personal-address-card',
  templateUrl: './personal-address-card.component.html',
  styleUrls: ['./personal-address-card.component.scss'],
})
export class PersonalAddressCardComponent implements OnInit {
  @Input() addresses!: Address[];
  @Input() userData!: User;
  @Input() showOption: boolean = true;
  @Output() updateData = new EventEmitter<void>();

  public addressDialog: boolean = false;
  public addAddressDialog: boolean = true;

  private readonly userService = inject(UserService);
  private readonly messageService = inject(MessageService);
  ngOnInit(): void {}

  shownumberPhoneDialog() {
    this.addressDialog = true;
  }
  showAddNumberPhoneDialog() {
    this.addAddressDialog = true;
  }

  onFormAddressSaved(formData: AddressBody) {
    this.addressDialog = false;
    this.userService
      .updateAddress(formData, this.userData)
      .pipe(take(1))
      .subscribe((res) => {
        const message: Message = {
          title: 'Datos guardados',
          message: 'Ha actualizado correctamente sus datos',
        };

        this.messageService.showMessage(message);

        this.updateData.emit();
      });
  }

  addFormAddressSaved(formData: AddressBody) {
    this.addressDialog = false;
    this.userService
      .addAddress(formData, this.userData)
      .pipe(take(1))
      .subscribe((res) => {
        const message: Message = {
          title: 'Añadido con éxito',
          message: 'Se ha agregado la dirección correctamente',
        };

        this.messageService.showMessage(message);

        this.updateData.emit();
      });
  }

  deletAddress(formData: AddressBody) {
    this.addressDialog = false;
    this.userService.deleteAddress(formData).subscribe((res) => {
      const message: Message = {
        title: 'Eliminado',
        message: 'Ha eliminado correctamente sus datos',
      };

      this.messageService.showMessage(message);

      this.updateData.emit();
    });
  }
}
