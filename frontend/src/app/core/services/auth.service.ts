import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class AuthService {
    
    pseudo = signal<string>("");

  login(token: string) {
    localStorage.setItem('token', token);
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLogged() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}