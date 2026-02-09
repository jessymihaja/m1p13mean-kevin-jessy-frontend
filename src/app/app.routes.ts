import { Routes } from '@angular/router';
import { ArticleList } from './components/article-list/article-list';

export const routes: Routes = [
    { path: 'articles', component: ArticleList },
    {path: '', redirectTo: 'articles', pathMatch: 'full' }
];
