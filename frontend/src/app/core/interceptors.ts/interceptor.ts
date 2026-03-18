import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service.js';


export const authInterceptor: HttpInterceptorFn = (req, next) => {

 
  const authService = inject(AuthService);

  let token: string | null = null;

  try {
    token = authService.getToken();
  } catch (e) {
    token = null;
  }

  if (!token) {
    return next(req);
  }

  const cloned = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(cloned);
};