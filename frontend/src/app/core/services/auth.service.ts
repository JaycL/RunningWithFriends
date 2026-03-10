import { Injectable, signal } from '@angular/core';

export interface User {
  Id: number;
  Pseudo: string;
  Email?: string;
}


@Injectable({ providedIn: 'root' })

export class AuthService {
 
    private _currentUser = signal<User | null>(null);
    currentUser = this._currentUser.asReadonly();

    
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

  setUser(user: User) {
    console.log(user);
    this._currentUser.set(user);
  }
}