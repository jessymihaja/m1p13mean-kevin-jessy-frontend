import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'
 import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class Dashboard{
    private apiBase: string;
    constructor(private http: HttpClient, @Inject('API_URL') apiUrl: string) {
        this.apiBase = apiUrl;
    }



getAdminStats(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiBase}/admin/dashboard`, { headers });
}
getAllProducts(): Observable<any> {
  return this.http.get<any>(`${this.apiBase}/buyer/products`);
}
};
