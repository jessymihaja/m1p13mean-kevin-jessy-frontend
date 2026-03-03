import { Routes } from '@angular/router';
import { ArticleList } from './components/article-list/article-list';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { DashboardComponent } from './components/dashboard/dashboard';
import { InventoryComponent } from './components/inventory/inventory';
import { OrderComponent } from './components/order/order';
import { ShopAdminComponent } from './components/shop-admin/shop-admin';
import { ShopListComponent } from './components/shop-list/shop-list';
import { ShopDetailComponent } from './components/shop-detail/shop-detail';
import { CartComponent } from './components/cart/cart';
import { OrderHistoryComponent } from './components/order-history/order-history';

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
  { path: 'admin/shops', component: ShopAdminComponent },
  { path: 'admin/accounts', component: DashboardComponent },
  { path: 'admin/categories', component: DashboardComponent },
  { path: 'admin/promotions', component: DashboardComponent },

  // Magasin (Shop) routes
  { path: 'shop/profile', component: DashboardComponent },
  { path: 'shop/articles', component: DashboardComponent },
  { path: 'shop/inventory', component: InventoryComponent },
  { path: 'shop/orders', component: OrderComponent },


  // Client routes
  { path: 'client/home', component: DashboardComponent },
  { path: 'client/search', component: DashboardComponent },
  { path: 'client/shops', component: ShopListComponent },
    { path: 'client/shop/:id', component: ShopDetailComponent },
  { path: 'client/cart', component: CartComponent },
  { path: 'client/orders-history', component: OrderHistoryComponent }
];
