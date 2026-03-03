import { Injectable, Inject, Signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private apiBase: string;
  constructor(private http: HttpClient, @Inject('API_URL') apiUrl: string) {
    this.apiBase = apiUrl;
  }

  getShopUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiBase}/admin/users/role/shop`);
  }
  getMockShops(): Observable<any> {
    const fake = [
      {
        _id: '1',
        name: 'Boutique A',
        description: 'Grande sélection de vêtements pour toute la famille, avec des offres permanentes et des nouveautés chaque semaine.',
        approved: false,
        logo: ''
      },
      {
        _id: '2',
        name: 'Boutique B',
        description: 'Spécialiste des accessoires électroniques haut de gamme : câbles, chargeurs, casques et plus encore.',
        approved: true,
        logo: ''
      },
      {
        _id: '3',
        name: 'Boutique C',
        description: 'Librairie indépendante avec un vaste choix de romans, BD et livres pour enfants.',
        approved: true,
        logo: ''
      }
    ];
    return of(fake);
  }

  getShops(): Observable<any> {
    return this.http.get<any>(`${this.apiBase}/buyer/shops`);
  }
  getShopsForAdmin(): Observable<any> {
    return this.http.get<any>(`${this.apiBase}/admin/shops`);
  }

  addShop(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiBase}/shops`, data);
  }

  updateShop(shopId: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiBase}/shops/${shopId}`, data);
  }

  deleteShop(shopId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiBase}/shops/${shopId}`);
  }
 createShopAccount(data: any): Observable<any> {
  return this.http.post<any>(`${this.apiBase}/shop`, data);
}
getShopById(shopId: string): Observable<any> {
  return this.http.get<any>(`${this.apiBase}/shop/${shopId}`);
}
  
}
