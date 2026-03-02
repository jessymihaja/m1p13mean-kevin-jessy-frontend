import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService, UserRole } from '../../services/auth.service';

interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  subItems?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent implements OnInit {
  menuItems: MenuItem[] = [];
  userRole: UserRole = null;
  isCollapsed = false;
  expandedItems: Set<string> = new Set();

  private adminMenu: MenuItem[] = [
    {
      label: 'Tableau de bord',
      icon: 'dashboard',
      route: '/admin/dashboard'
    },
    {
      label: 'Gestion des boutiques',
      icon: 'store',
      route: '/admin/shops'
    },
    {
      label: 'Gestion des comptes',
      icon: 'people',
      route: '/admin/accounts'
    },
    {
      label: 'Gestion des catégories',
      icon: 'category',
      route: '/admin/categories'
    },
    {
      label: 'Gestion des promotions',
      icon: 'local_offer',
      route: '/admin/promotions'
    }
  ];

  private shopMenu: MenuItem[] = [
    {
      label: 'Gestion du profil de magasin',
      icon: 'shop_2',
      route: '/shop/profile'
    },
    {
      label: 'Inventaire',
      icon: 'inventory_2',
      route: '/shop/inventory'
    },
    {
      label: 'Gestion des commandes',
      icon: 'shopping_cart',
      route: '/shop/orders'
    }
  ];

  private clientMenu: MenuItem[] = [
    {
      label: 'Accueil',
      icon: 'home',
      route: '/client/home',
      subItems: [
        {
          label: 'Recherche d\'articles',
          icon: 'search',
          route: '/client/search'
        }
      ]
    },
    {
      label: 'Magasins',
      icon: 'store',
      route: '/client/shops'
    },
    {
      label: 'Historique des commandes',
      icon: 'history',
      route: '/client/orders-history'
    }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    this.setMenuByRole(this.userRole);
  }

  /**
   * Définir le menu en fonction du rôle
   */
  private setMenuByRole(role: UserRole): void {
    switch (role) {
      case 'admin':
        this.menuItems = this.adminMenu;
        break;
      case 'shop':
        this.menuItems = this.shopMenu;
        break;
      case 'buyer':
        this.menuItems = this.clientMenu;
        break;
      default:
        this.menuItems = [];
    }
  }

  /**
   * Basculer le sidebar
   */
  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  /**
   * Basculer l'expansion d'une section avec sous-éléments
   */
  toggleExpand(label: string): void {
    if (this.expandedItems.has(label)) {
      this.expandedItems.delete(label);
    } else {
      this.expandedItems.add(label);
    }
  }

  /**
   * Vérifier si une section est étendue
   */
  isExpanded(label: string): boolean {
    return this.expandedItems.has(label);
  }

  /**
   * Déconnexion
   */
  logout(): void {
    this.authService.logout();
  }
}
