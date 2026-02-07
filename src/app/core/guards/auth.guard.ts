import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, ILoginResponse } from './auth.service';
import { UserRole } from '../../features/admin/models/admin.types';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('token-raw');
  const tokenParse: ILoginResponse | null = token != null ? JSON.parse(token) : null;
  const role = tokenParse?.user.role;

  if (state.url == '/login') {
    if (role == UserRole.ADMIN) return router.parseUrl('/admin');
    if (role == UserRole.USER) return router.parseUrl('/user');
    return true;
  }

  if (role == UserRole.ADMIN) {
    if (state.url.startsWith('/admin')) return isCorrectAuth(tokenParse!);
    return true;
  }
  if (role == UserRole.USER) {
    if (state.url.startsWith('/user')) return isCorrectAuth(tokenParse!);
  }

  return router.parseUrl('/login');
};
const isCorrectAuth = (tokentRaw: ILoginResponse) => {
  const authService = inject(AuthService);
  authService.token.set(tokentRaw.access_token);
  authService.user.set(tokentRaw.user);
  return true;
};
