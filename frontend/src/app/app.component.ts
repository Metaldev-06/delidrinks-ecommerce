import { animate, style, transition, trigger } from '@angular/animations';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimations', [
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

  getAnimationState(): string {
    // Lógica para determinar el estado de la animación según la URL actual o cualquier otra condición
    return this.router.url;
  }
}
