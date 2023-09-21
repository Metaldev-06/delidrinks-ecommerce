import { Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { take } from 'rxjs';
import { Message } from 'src/app/core/interfaces/message';
import { MessageService } from 'src/app/core/services/message-services/message.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  public changePasswordForm!: FormGroup;

  public showPassword = false;

  private readonly formBuilder = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly cookieService = inject(CookieService);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.changePasswordForm = this.initChangePasswordForm();
  }

  initChangePasswordForm(): FormGroup {
    return this.formBuilder.group(
      {
        currentPassword: ['', Validators.required],
        password: ['', Validators.required],
        passwordConfirmation: ['', Validators.required],
      },
      {
        validators: [this.equalFields('password', 'passwordConfirmation')],
      }
    );
  }

  equalFields(campo1: string, campo2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;

      if (pass1 !== pass2) {
        formGroup.get(campo2)?.setErrors({ different: true });
        return { different: true };
      }

      formGroup.get(campo2)?.setErrors(null);
      return null;
    };
  }

  updatePassword() {
    if (this.changePasswordForm.invalid) return;

    this.userService
      .updatePassword(this.changePasswordForm.value)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.changePasswordForm.reset();
          this.cookieService.delete('accessToken');
          setTimeout(() => {
            this.cookieService.set('accessToken', res.jwt);
          }, 500);

          const message: Message = {
            title: 'Actualizado',
            message: 'Su contraseña se ha actualizado correctamente',
          };

          this.messageService.showMessage(message);
          this.router.navigate(['/user']);
        },

        error: (err: Error) => {
          const message: Message = {
            title: 'No se ha podido actualizar su contraseña',
            message: 'Verifique que se contraseña actual sea correcta',
          };

          console.error(message.message);

          this.messageService.showMessage(message);
        },
      });
  }

  changeVisibilityPassword() {
    this.showPassword = !this.showPassword;
  }
}
