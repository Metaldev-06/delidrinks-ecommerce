import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../core/services/user/user.service';

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('500ms ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class EcommerceComponent implements OnInit {
  private isLogued = signal<boolean>(false);

  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  private readonly cookieService = inject(CookieService);

  ngOnInit(): void {
    this.isAutenticate();
  }

  getAnimationState(): string {
    // Lógica para determinar el estado de la animación según la URL actual o cualquier otra condición
    return this.router.url;
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
