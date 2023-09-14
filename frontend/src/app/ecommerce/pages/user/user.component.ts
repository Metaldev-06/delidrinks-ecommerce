import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from 'src/app/core/interfaces/message';
import { Address, Phone, User } from 'src/app/core/interfaces/user.interfaces';
import { MessageService } from 'src/app/core/services/message-services/message.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  public userData!: User;
  public image = signal<string>('');
  public addresses = signal<Address[]>([]);
  public phones = signal<Phone[]>([]);
  public showLoader = false;
  private allowedImageTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
  ];

  private subscription!: Subscription;

  private readonly userService = inject(UserService);
  private readonly messageService = inject(MessageService);
  private readonly http = inject(HttpClient);

  ngOnInit(): void {
    this.getUserData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getUserData(e?: any): void {
    this.subscription = this.userService.getUser().subscribe((res) => {
      this.userData = res;
      this.getRelations(res);
      this.userService.updateLocalUser(res);
    });
  }

  getRelations(user: User) {
    this.image.set(`${user.image.url}`);
    // const numberPhone = user.phones.find((phone) => phone.primary === true);
    this.addresses.set(user.addresses);
    this.phones.set(user.phones);
  }

  uploadImage(event: any): void {
    const image = event.target.files[0];
    if (!image) return;

    if (!this.allowedImageTypes.includes(image.type)) {
      const message: Message = {
        title: 'No es un formato permitodo',
        message: 'Sólo puede subir imagenes png, jpg, gif, webp',
      };

      this.messageService.showMessage(message);
      return;
    }

    this.showLoader = true;

    const formData = new FormData();
    formData.append('files', image);
    formData.append('ref', 'plugin::users-permissions.user');
    formData.append('refId', `${this.userData.id}`);
    formData.append('field', 'image');

    this.http
      .post(
        `http://localhost:1337/api/upload?id=${this.userData.image.id}`,
        formData
      )
      .subscribe({
        next: (res) => {
          this.getUserData();
          this.showLoader = false;
        },

        error: (err: Error) => {
          console.log(err.message);
          this.showLoader = false;
          const message: Message = {
            title: 'Error el subir la imagen',
            message: 'No se pudo subir la imagen',
          };

          this.messageService.showMessage(message);
        },
      });
  }
}
