import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { Address, Phone, User } from 'src/app/core/interfaces/user.interfaces';
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

  private subscription!: Subscription;

  private readonly userService = inject(UserService);

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
    });
  }

  getRelations(user: User) {
    this.image.set(`${user.image.formats.small.url}`);
    // const numberPhone = user.phones.find((phone) => phone.primary === true);
    this.addresses.set(user.addresses);
    this.phones.set(user.phones);
  }
}
