import { Routes } from '@angular/router';
import { ArticleList } from './components/article-list/article-list';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { DashboardComponent } from './components/dashboard/dashboard';

export const routes: Routes = [
  // Auth routes
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },

  // Legacy route
  { path: 'articles', component: ArticleList },

  // Admin routes
  { path: 'admin/dashboard', component: DashboardComponent },
  { path: 'admin/shops', component: DashboardComponent },
  { path: 'admin/accounts', component: DashboardComponent },
  { path: 'admin/categories', component: DashboardComponent },

  // Magasin (Shop) routes
  { path: 'shop/profile', component: DashboardComponent },
  { path: 'shop/articles', component: DashboardComponent },
  { path: 'shop/orders', component: DashboardComponent },

  // Client routes
  { path: 'client/home', component: DashboardComponent },
  { path: 'client/search', component: DashboardComponent },
  { path: 'client/shops', component: DashboardComponent },
  { path: 'client/orders-history', component: DashboardComponent }
];
