import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { take } from 'rxjs';
import { Message } from 'src/app/core/interfaces/message';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { MessageService } from 'src/app/core/services/message-services/message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  public showPassword = false;

  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly messageService = inject(MessageService);
  ngOnInit(): void {
    this.registerForm = this.initRegisterForm();
  }

  initRegisterForm(): FormGroup {
    return this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        username: ['', [Validators.required, Validators.maxLength(14)]],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/),
          ],
        ],
        password: ['', [Validators.required]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [this.equalFields('password', 'confirmPassword')],
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

  register(): void {
    if (this.registerForm.invalid) {
      let message: Message = {
        title: 'Complete todos los campos',
        message: 'No ha completado los campos requeridos',
      };
      this.messageService.showMessage(message);
      return;
    }

    this.authService
      .register(this.registerForm.value)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          let message: Message;
          message = {
            title: 'Se ha registrado correctamente',
            message: 'Verifique su correo electrónico para confirmar su cuenta',
          };
          this.messageService.showMessage(message);
        },
        error: (err: HttpErrorResponse) => {
          this.handledError(err);
        },
      });
  }

  handledError(err: HttpErrorResponse): void {
    let message: Message;
    message = {
      title: 'No se ha podido registrarse',
      message: 'Ha ocurrido un error inesperado',
    };
    this.messageService.showMessage(message);
  }

  changeVisibilityPassword() {
    this.showPassword = !this.showPassword;
  }
}
