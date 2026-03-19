import { Injectable, signal, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment.js';

import { ApiService } from './api.service.js';

export interface User {
  Id: number;
  Pseudo: string;
  Email?: string;
}


@Injectable({ providedIn: 'root' })

export class AuthService {
  private _currentUser = signal<User | null>(null);

  private api = inject(ApiService);
  
  currentUser = this._currentUser.asReadonly();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {} 
    
  login(token: string) {
    localStorage.setItem('token', token);
  }
  
  setUser(user: User) {
    console.log(user);
    this._currentUser.set(user);
  }

  async initUser() {

    const token = this.getToken();

    if (!token) return;

    try {
      await this.getMe();
    } catch {
      this.logout();
    }

  }

  async getMe() {
    this.setUser(await firstValueFrom(this.api.get<User>('users/me')));    
  }

  logout() {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    window.location.reload();
  }

  isLogged() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  getToken(): string | null {     
     if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    console.log("no storage")
    return null;
  }
}