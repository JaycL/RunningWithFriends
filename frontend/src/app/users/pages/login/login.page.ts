import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.js';
import { ApiResponse } from '../../../shared/models/api.model.js';
import { AuthService } from '../../../core/services/auth.service.js';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export class LoginPage {
  private http: HttpClient = inject(HttpClient);  
  router = inject(Router);
  authService = inject(AuthService);
  fb = inject(FormBuilder);

  loading = signal(false);

  loginForm = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  async onSubmit() {

    if (this.loginForm.invalid) return;

    this.loading.set(true);

    const { email, password } = this.loginForm.getRawValue();

    const response = await firstValueFrom(this.http.post<ApiResponse<any>>(environment.apiUrl+'users/auth', {
      email,
      password
    }));
    console.log(response);
    console.log(response.data.token);

    
    this.loading.set(false);

    if (response.data.sucess ===  false) {
      return;
    }

    this.authService.login(response.data.token)

    this.authService.getMe();

    this.router.navigate(['/events']);

  }
}
