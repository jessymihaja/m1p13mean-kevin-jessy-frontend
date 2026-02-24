import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  userRole: string | null = null;

  constructor(private authService: AuthService) {
    this.userRole = this.authService.getUserRole();
  }

  get isAdmin(): boolean {
    return this.userRole === 'admin';
  }

  get isShop(): boolean {
    return this.userRole === 'magasin';
  }

  get isClient(): boolean {
    return this.userRole === 'client';
  }

  // Stats Admin
  adminStats = [
    { label: 'Boutiques', value: '24', icon: '🏪' },
    { label: 'Comptes', value: '156', icon: '👥' },
    { label: 'Catégories', value: '12', icon: '📂' },
    { label: 'Revenus', value: '15,420 €', icon: '💰' }
  ];

  // Stats Magasin
  shopStats = [
    { label: 'Articles', value: '120', icon: '📦' },
    { label: 'Commandes', value: '45', icon: '🛒' },
    { label: 'Revenus', value: '3,240 €', icon: '💵' },
    { label: 'Notations', value: '4.8/5', icon: '⭐' }
  ];

  // Stats Client
  clientStats = [
    { label: 'Mon panier', value: '0 €', icon: '🛒' },
    { label: 'Commandes', value: '5', icon: '📋' },
    { label: 'Favoris', value: '23', icon: '❤️' },
    { label: 'Points', value: '540', icon: '⚡' }
  ];
}
