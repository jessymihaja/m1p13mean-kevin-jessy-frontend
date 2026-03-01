import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // needed for ngModel bindings
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  userRole: string | null = null;
  showCartPopup: boolean = false;

  constructor(private authService: AuthService) {
    this.userRole = this.authService.getUserRole();
  }

  toggleCart(): void {
    this.showCartPopup = !this.showCartPopup;
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

  // temporary list of articles for client dashboard view
  searchText: string = '';
  sortOption: 'recent' | 'best' | 'old' = 'recent';

  articles = [
    { title: 'Chaussures de course', description: 'Confortables et légères', date: new Date(2026, 1, 25), rating: 4.5 },
    { title: 'Montre connectée', description: 'Suivez votre activité au quotidien', date: new Date(2026, 0, 10), rating: 4.8 },
    { title: 'Casque audio', description: 'Isolation phonique supérieure', date: new Date(2025, 11, 5), rating: 4.2 },
    { title: 'Sac à dos', description: 'Résistant à l’eau et ergonomique', date: new Date(2026, 1, 5), rating: 4.6 }
  ];

  filteredArticles() {
    let list = this.articles
      .filter(a =>
        a.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
        a.description.toLowerCase().includes(this.searchText.toLowerCase())
      );

    switch (this.sortOption) {
      case 'recent':
        list = list.sort((a, b) => b.date.getTime() - a.date.getTime());
        break;
      case 'old':
        list = list.sort((a, b) => a.date.getTime() - b.date.getTime());
        break;
      case 'best':
        list = list.sort((a, b) => b.rating - a.rating);
        break;
    }

    return list;
  }

  viewArticle(article: any): void {
    alert(`Voir article : ${article.title}`);
  }

  addToCart(article: any): void {
    alert(`Article ajouté au panier : ${article.title}`);
  }
}
