import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // needed for ngModel bindings
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { Dashboard } from '../../services/dashboard';
import { MatDialog } from '@angular/material/dialog';
import { QuantityDialogComponent } from '../quantity-dialog/quantity-dialog';
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  shop: {
    name: string;
  }
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  userRole: string | null = null;
  showCartPopup: boolean = false;
  dashboardStats: any = {};

  constructor(private authService: AuthService, private dashboardService: Dashboard , private dialog: MatDialog) {
    this.userRole = this.authService.getUserRole();
    console.log('Rôle utilisateur dans DashboardComponent:', this.userRole);
  }
  ngOnInit(): void {
    // On récupère le rôle une seconde fois au cas où le constructeur est passé trop vite
    this.userRole = this.authService.getUserRole();
    
    console.log('Vérification rôle au ngOnInit:', this.userRole);

    if (this.isAdmin) {
      this.loadAdminStats();
    } else {
      // Optionnel : un petit délai si ton service auth est asynchrone
      setTimeout(() => {
        if (this.isAdmin) this.loadAdminStats();
      }, 100);
    }
    if (this.isClient) {
      this.loadProducts();
    }
  }

  toggleCart(): void {
    this.showCartPopup = !this.showCartPopup;
  }

  get isAdmin(): boolean {
    return this.userRole === 'admin';
  }

  get isShop(): boolean {
    return this.userRole === 'shop';
  }

  get isClient(): boolean {
    return this.userRole === 'buyer';
  }



  totalUsers: number = 0;
  totalShops: number = 0;
  totalOrders: number = 0;
  loadAdminStats(): void {
    this.dashboardService.getAdminStats().subscribe({
      next: (data) => {
        this.totalUsers = data.users || 0;
        this.totalShops = data.shops || 0;
        this.totalOrders = data.orders || 0;
      },
      error: (err) => {
        console.error("Erreur de chargement", err);
        this.totalUsers = 0;
        this.totalShops = 0;
        this.totalOrders = 0;
      }
    });
  }

  // Stats Magasin
  shopStats = [
    { label: 'Espace', value: 'magasin', icon: '📦' },

  ];

  // Stats Client
  clientStats = [
    { label: 'Espace', value: 'Client', icon: '🛒' },
    { label: 'Articles', value: 'à votre disposition', icon: '📦' },
  ];

  // temporary list of articles for client dashboard view
  searchText: string = '';
  sortOption: 'recent' | 'best' | 'old' = 'recent';

  articles: Product[] = [];

  filteredArticles() {
    let list = this.articles
      .filter(a =>
        a.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        a.description.toLowerCase().includes(this.searchText.toLowerCase())
      );
    return list;
  }
  loadProducts(): void {
    this.dashboardService.getAllProducts().subscribe({
      next: (data) => {
        this.articles = data || [];
        console.log('Articles chargés pour client:', this.articles);
      }
    });
  }

  openQuantityModal(product: any) {
      const dialogRef = this.dialog.open(QuantityDialogComponent, {
          width: '300px',
          data: product
      });
  
      dialogRef.afterClosed().subscribe(quantity => {
          if (quantity && quantity > 0) {
          this.addToCart(product, quantity);
          }
      }); 
      }
      addToCart(product: any, quantity: number) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  
    const existingProduct = cart.find((item: any) => item._id === product._id);
  
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.push({
        ...product,
        quantity: quantity
      });
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}
