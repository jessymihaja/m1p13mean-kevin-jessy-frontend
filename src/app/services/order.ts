import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiBase: string;
  constructor(@Inject('API_URL') apiUrl: string ,private http: HttpClient) {
    this.apiBase = apiUrl;
  }

  getMockOrders(): Observable<any[]> {
    const fake = [
      {
        _id: 'o1',
        shop: 'Boutique A',
        client: 'Alice',
        products: [
          { name: 'T-shirt bleu', qty: 2 },
          { name: 'Carnet de notes', qty: 1 }
        ],
        date: new Date(2026, 1, 20)
      },
      {
        _id: 'o2',
        shop: 'Boutique B',
        client: 'Bob',
        products: [
          { name: 'Lampe de bureau', qty: 1 }
        ],
        date: new Date(2026, 2, 5)
      }
    ];
    return of(fake);
  }
  createOrder(orderData: any): Observable<any> {
    return this.http.post(`${this.apiBase}/buyer/orders`, orderData);
  }
}
