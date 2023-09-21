import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimations', [
      state('no-animation', style({ opacity: 1 })), // Estado especial sin animación
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('500ms ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class AppComponent {
  title = 'frontend';

  private readonly router = inject(Router);

  getAnimationState() {
    // Lógica para determinar el estado de la animación según la URL actual o cualquier otra condición

    if (this.router.url.includes('/products')) {
      return 'no-animation'; // Devuelve un estado especial para la ruta /products
    }

    return this.router.url;
  }
}
