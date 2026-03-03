import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../../services/shop';
import { ProductService } from '../../services/product';
import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { QuantityDialogComponent } from '../quantity-dialog/quantity-dialog';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
}

interface Shop {
  _id: string;
  name: string;
  description: string;
  owner?: string;
}

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.html',
  styleUrls: ['./shop-detail.css'],
  imports: [CurrencyPipe, CommonModule, MatIconModule]
})
export class ShopDetailComponent implements OnInit {
  shopId!: string;
  shop!: Shop;
  products: Product[] = [];
  loading: boolean = true;
  errorMessage: string = '';
  searchText: string = '';
  sortOption: 'recent' | 'best' | 'old' = 'recent';

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
    private productService: ProductService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.shopId = this.route.snapshot.paramMap.get('id') || '';
    if (!this.shopId) {
      this.errorMessage = "ID du magasin invalide.";
      this.loading = false;
      return;
    }


    this.shopService.getShopById(this.shopId).subscribe({
      next: (shopData) => {
        this.shop = shopData;
        this.loadProducts();
      },
      error: (err) => {
        console.error('Erreur chargement shop:', err);
        this.errorMessage = 'Impossible de charger le magasin.';
        this.loading = false;
      }
    });
  }

  loadProducts(): void {
    this.productService.getProductByShopId(this.shopId).subscribe({
      next: (prodData) => {
        this.products = prodData;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur chargement produits:', err);
        this.errorMessage = 'Impossible de charger les produits.';
        this.loading = false;
      }
    });
  }

  filteredProducts(searchText: string): Product[] {
    if (!searchText) return this.products;
    return this.products.filter(p =>
      p.name.toLowerCase().includes(searchText.toLowerCase()) ||
      p.description.toLowerCase().includes(searchText.toLowerCase())
    );
    
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