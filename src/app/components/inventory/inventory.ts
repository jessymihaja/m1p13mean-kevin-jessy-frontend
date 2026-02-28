import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css'
})
export class InventoryComponent implements OnInit {
  products: any[] = [];
  searchText: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    // utiliser les données factices tant que le backend n'est pas prêt
    this.productService.getMockProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des produits (mock) :', error);
      }
    );

    // quand l'API sera disponible, remplacer par :
    // this.productService.getProducts()...
  }

  filteredProducts(): any[] {
    return this.products.filter(p => 
      p.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      p.description.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  addProduct(): void {
    const name = prompt('Nom du produit');
    if (!name) {
      return;
    }
    const newProd: any = { name, description: '', price: 0, category: '' };
    this.productService.addProduct(newProd).subscribe(
      (p) => {
        this.products.push(p);
      },
      (error) => {
        console.error('Erreur ajout produit', error);
      }
    );
  }

  editProduct(product: any): void {
    const newName = prompt('Modifier le nom', product.name);
    if (newName === null) {
      return;
    }
    const updated = { ...product, name: newName };
    this.productService.updateProduct(product._id, updated).subscribe(
      (res) => {
        const idx = this.products.findIndex(pr => pr._id === product._id);
        if (idx !== -1) {
          this.products[idx] = res;
        }
      },
      (error) => {
        console.error('Erreur modification produit', error);
      }
    );
  }

  deleteProduct(id: string): void {
    if (!confirm('Confirmer la suppression ?')) {
      return;
    }
    this.productService.deleteProduct(id).subscribe(
      () => {
        this.products = this.products.filter(p => p._id !== id);
      },
      (error) => {
        console.error('Erreur suppression produit', error);
      }
    );
  }
}
