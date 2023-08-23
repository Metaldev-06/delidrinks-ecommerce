import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';

import { AuthService } from 'src/app/core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Message } from 'src/app/core/interfaces/message';
import { MessageService } from 'src/app/core/services/message-services/message.service';
import { UserService } from 'src/app/core/services/user.service';
import { FavoritesService } from 'src/app/core/services/favorites-service/favorites.service';
import { User } from 'src/app/core/interfaces/user.interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  private readonly authService = inject(AuthService);
  private readonly cookieService = inject(CookieService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  private readonly favoritesService = inject(FavoritesService);
  ngOnInit(): void {
    this.loginForm = this.initLoginForm();
  }

  login(): void {
    if (this.loginForm.invalid) return;

    this.authService
      .login(this.loginForm.value)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.cookieService.set('accessToken', res.jwt);
          this.userService.setAutenticate(true);
          this.getDataUser();
        },
        error: (err: HttpErrorResponse) => {
          this.handledError(err);
        },
      });
  }

  getDataUser(): void {
    this.userService
      .getUser()
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.getFavorites(res);
          localStorage.setItem('userData', JSON.stringify(res));
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getFavorites(user: User) {
    this.favoritesService
      .getFavorites(user)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          sessionStorage.setItem('favorites', JSON.stringify(res));
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  handledError(err: HttpErrorResponse): void {
    let message: Message;
    if (err.status === 400) {
      message = {
        title: 'Datos incorrectos',
        message: 'Usuario o contraseña incorrectos',
      };
    } else {
      message = {
        title: 'No se ha podido iniciar sesión',
        message: 'Ha ocurrido un error inesperado',
      };
    }
    this.messageService.showMessage(message);
  }

  initLoginForm(): FormGroup {
    return this.formBuilder.group({
      identifier: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
}
