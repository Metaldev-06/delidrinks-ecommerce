import { trigger, transition, style, animate } from '@angular/animations';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

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
export class EcommerceComponent {
  router = inject(Router);

  getAnimationState(): string {
    // Lógica para determinar el estado de la animación según la URL actual o cualquier otra condición
    return this.router.url;
  }
}
