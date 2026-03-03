import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.html',
  styleUrls: ['./order-history.css'],
  imports: [CommonModule]
})
export class OrderHistoryComponent implements OnInit {
  orders: any[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(
    private orderService: OrderService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Côté navigateur uniquement
      const userStr = localStorage.getItem('user');
      const userId = userStr ? JSON.parse(userStr).id : null;

      if (userId) {
        this.orderService.getOrdersByUser(userId).subscribe({
          next: (data) => {
            this.orders = data;
            this.loading = false;
            console.log('Commandes chargées :', data);
          },
          error: (err) => {
            this.error = 'Impossible de charger les commandes';
            this.loading = false;
            console.error('Erreur commandes :', err);
          }
        });
      } else {
        this.error = 'Utilisateur non connecté';
        this.loading = false;
      }
    } else {
      this.loading = false;
    }
  }

  getOrderTotal(order: any): number {
    return order.products.reduce((acc: number, p: any) => acc + p.price * p.quantity, 0);
  }
}