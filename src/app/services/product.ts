import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiBase: string;
  constructor(private http: HttpClient, @Inject('API_URL') apiUrl: string) {
    this.apiBase = apiUrl;
  }
  getMockProducts(): Observable<any> {
    const fake = [
      { _id: '1', name: 'T-shirt bleu', description: 'Coton 100%', price: 19.99, category: 'Habillement' },
      { _id: '2', name: 'Lampe de bureau', description: 'LED, design moderne', price: 34.5, category: 'Électronique' },
      { _id: '3', name: 'Carnet de notes', description: 'Couverture rigide', price: 5.0, category: 'Papeterie' }
    ];
    return of(fake);
  }

  getProducts(ownerId:string): Observable<any> {
    return this.http.get<any>(`${this.apiBase}/shop/products/${ownerId}`);
  }
  getProductByShopId(shopId: string): Observable<any> {
    return this.http.get<any>(`${this.apiBase}/buyer/shops/${shopId}/products`);
  }

  addProduct(ownerId: string, productData: any): Observable<any> {
  return this.http.post<any>(
    `${this.apiBase}/shop/products/${ownerId}`,
    productData 
  );
}

  updateProduct(productId: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiBase}/products/${productId}`, data);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiBase}/products/${productId}`);
  }
}
