import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { IUser } from '../../features/admin/models/admin.types';
import { Router } from '@angular/router';

export type ILoginResponse = {
  access_token: string;
  user: IUser;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly router = inject(Router);
  readonly token = signal<string>(null!);
  readonly user = signal<IUser>(null!);
  readonly role = computed(() => this.user().role);

  logout() {
    localStorage.removeItem('token-raw');
    this.token.set(null!);
    this.user.set(null!);
    this.router.navigate(['/login']);
  }
}
