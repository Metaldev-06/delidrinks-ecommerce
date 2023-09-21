import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../core/services/user/user.service';

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.scss'],
})
export class EcommerceComponent implements OnInit {
  private isLogued = signal<boolean>(false);

  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  private readonly cookieService = inject(CookieService);

  ngOnInit(): void {
    this.isAutenticate();
  }

  isAutenticate() {
    this.isLogued.set(this.cookieService.check('accessToken'));
    if (this.isLogued()) {
      this.userService.setAutenticate(true);
    } else {
      this.userService.setAutenticate(false);
      localStorage.removeItem('userData');
      sessionStorage.removeItem('favorites');
    }
  }
}
