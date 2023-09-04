import { Component, Input, OnInit, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Message } from 'src/app/core/interfaces/message';
import { PhoneBody } from 'src/app/core/interfaces/phones.interfaces';
import { User } from 'src/app/core/interfaces/user.interfaces';
import { MessageService } from 'src/app/core/services/message-services/message.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-personal-data-card',
  templateUrl: './personal-data-card.component.html',
  styleUrls: ['./personal-data-card.component.scss'],
})
export class PersonalDataCardComponent implements OnInit {
  @Input() userData!: User;

  public personalDataDialog: boolean = false;

  private readonly userService = inject(UserService);
  private readonly messageService = inject(MessageService);

  ngOnInit(): void {}

  getUserData(): void {
    this.userService.getUser().subscribe((res) => {
      this.userData = res;
    });
  }

  onFormDataSaved(formData: FormGroup) {
    this.personalDataDialog = false;
    this.userService
      .updateUserData(formData.value, this.userData)
      .subscribe((res) => {
        const message: Message = {
          title: 'Datos guardados',
          message: 'Ha actualizado correctamente sus datos',
        };

        this.messageService.showMessage(message);
        this.getUserData();
      });
  }

  showDialog() {
    this.personalDataDialog = true;
  }
}
