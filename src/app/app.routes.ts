import { Routes } from '@angular/router';
import { ArticleList } from './components/article-list/article-list';
import { LoginComponent } from './components/login/login';

export const routes: Routes = [
    { path: 'articles', component: ArticleList },
    {path: '', redirectTo: 'articles', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },

];
