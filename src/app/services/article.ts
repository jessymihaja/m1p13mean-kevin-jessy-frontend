import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class Article {
  private apiBase: string;
  constructor(private http: HttpClient, @Inject('API_URL') apiUrl: string) {
    this.apiBase = apiUrl;
  }
  getArticles(): Observable<any> {
    return this.http.get<any>(`${this.apiBase}/articles`);
  }
  updateArticle(articleId: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiBase}/articles/${articleId}`, data);
  }
  deleteArticle(articleId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiBase}/articles/${articleId}`);
  }
  
}
