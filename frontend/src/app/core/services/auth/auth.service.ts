import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Login, LoginBody } from '../../interfaces/login.interfaces';
import { VerifyAccount } from '../../interfaces/verify-account.interfaces';
import { Register, RegisterBody } from '../../interfaces/register.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  login(form: LoginBody): Observable<Login> {
    return this.http.post<Login>(`${this.baseUrl}/auth/local`, form);
  }

  register(form: RegisterBody): Observable<Register> {
    return this.http.post<Register>(
      `${this.baseUrl}/auth/local/register`,
      form
    );
  }

  verifyAccount(email: string): Observable<VerifyAccount> {
    return this.http.post<VerifyAccount>(
      `${this.baseUrl}/auth/send-email-confirmation`,
      email
    );
  }
}
