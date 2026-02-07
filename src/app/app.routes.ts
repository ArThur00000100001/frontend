import { Routes } from '@angular/router';
import { LoginComponent } from './features/admin/pages/auth/login';
import { authGuard } from './core/guards/auth.guard';
import { HomeComponent } from './features/admin/pages/home/home';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: 'login', component: LoginComponent },
      {
        path: 'admin',
        children: [
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'home', component: HomeComponent },
        ],
      },
    ],
  },
];
