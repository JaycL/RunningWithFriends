import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { Router } from '@angular/router';
import { environment } from '../../../environment.ts/environment.js';
import { ApiResponse } from '../../core/models/api.model.js';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  private http: HttpClient = inject(HttpClient);  
  router = inject(Router);

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

    console.log(email, password);

    // appel API ici
    /*await new Promise(r => setTimeout(r, 1000));-*/

    
    const response = await firstValueFrom(this.http.post<ApiResponse<any>>(environment.apiUrl+'auth', {
      email,
      password
    }));
    console.log(response);
    localStorage.setItem('token', response.toLocaleString());

    this.loading.set(false);

    if (response.data ===  '') {

      return;
    }

    const response4 = await firstValueFrom(this.http.get<ApiResponse<any>>(environment.apiUrl+'users/me'));
    console.log(response4);

    this.router.navigate(['/events']);

  }

}
