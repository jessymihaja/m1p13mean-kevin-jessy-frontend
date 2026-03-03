import { Component, OnInit } from '@angular/core';
import {CommonModule} from "@angular/common";
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { OrderService } from '../../services/order';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
  imports: [CommonModule]
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  total: number = 0;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private orderService: OrderService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.loadCart();
    }
  }

  loadCart() {
    const data = localStorage.getItem('cart');
    this.cartItems = data ? JSON.parse(data) : [];
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.calculateTotal();
  }

confirmPurchase() {

  if (!this.isBrowser) return;

  const user = localStorage.getItem('user');
  if (!user) {
    alert('Vous devez être connecté.');
    return;
  }

  const parsedUser = JSON.parse(user);

  const orderProducts = this.cartItems.map(item => ({
    product: item._id,
    quantity: item.quantity,
    price: item.price // nécessaire pour ton calcul backend actuel
  }));

  const orderData = {
    buyerId: parsedUser.id,
    products: orderProducts,
    deliveryMethod: 'pickup'
  };

  this.orderService.createOrder(orderData).subscribe({
    next: (res) => {
      alert('Commande confirmée');
      localStorage.removeItem('cart');
      this.cartItems = [];
      this.total = 0;
    },
    error: (err) => {
      console.error('Erreur création commande', err);
      alert('Erreur lors de la commande.');
    }
  });
}
  increaseQuantity(index: number) {
  this.cartItems[index].quantity++;
  this.updateCart();
}

decreaseQuantity(index: number) {
  if (this.cartItems[index].quantity > 1) {
    this.cartItems[index].quantity--;
  } else {
    this.cartItems.splice(index, 1);
  }
  this.updateCart();
}

updateCart() {
  localStorage.setItem('cart', JSON.stringify(this.cartItems));
  this.calculateTotal();
}
}