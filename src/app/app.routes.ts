import { Routes } from '@angular/router';
import { LoginComponent } from './features/admin/pages/auth/login';
import { authGuard } from './core/guards/auth.guard';
import { HomeComponent } from './features/admin/pages/home/home';
import { LayoutPagesComponent } from './features/admin/pages/layout-pages/layout-pages';
import { ProductsComponent } from './features/admin/pages/products/products';
import { OrdersComponent } from './features/admin/pages/orders/orders';
import { UsersComponent } from './features/admin/pages/users/users';
import { SettingsComponent } from './features/admin/pages/settings/settings';
import { StoreComponent } from './features/admin/pages/store/store';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: 'login', component: LoginComponent },
      {
        path: 'admin',
        component: LayoutPagesComponent,
        children: [
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'home', component: HomeComponent },
          { path: 'products', component: ProductsComponent },
          { path: 'shop', component: StoreComponent },
          { path: 'orders', component: OrdersComponent },
          { path: 'users', component: UsersComponent },
          { path: 'settings', component: SettingsComponent },
        ],
      },
    ],
  },
];
