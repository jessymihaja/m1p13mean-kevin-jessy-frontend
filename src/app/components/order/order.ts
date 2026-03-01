import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { OrderService } from '../../services/order';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './order.html',
  styleUrl: './order.css'
})
export class OrderComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getMockOrders().subscribe(
      data => (this.orders = data),
      err => console.error('Erreur récupération commandes', err)
    );
  }

  markProcessed(order: any): void {
    alert(`Commande ${order._id} marquée comme traitée`);
  }

  generateInvoice(order: any): void {
    alert(`Génération de facture pour commande ${order._id}`);
  }
}
