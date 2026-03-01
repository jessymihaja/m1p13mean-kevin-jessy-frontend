import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ProductService } from '../../services/product';
import { AddProductDialogComponent } from './add-product-dialog';
import { PromoteProductDialogComponent } from './promote-product-dialog';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css'
})
export class InventoryComponent implements OnInit {
  products: any[] = [];
  searchText: string = '';

  constructor(private productService: ProductService, private dialog: MatDialog) {}

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
    // open a material dialog to enter product details
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.addProduct(result).subscribe(
          (p) => {
            this.products.push(p);
          },
          (error) => {
            console.error('Erreur ajout produit', error);
          }
        );
      }
    });
  }

  promoteProduct(product: any): void {
    const dialogRef = this.dialog.open(PromoteProductDialogComponent, {
      width: '400px',
      data: { product }
    });

    dialogRef.afterClosed().subscribe(range => {
      if (range) {
        // attach promotion dates to product object and update
        const updated = { ...product, promotionStart: range.start, promotionEnd: range.end };
        this.productService.updateProduct(product._id, updated).subscribe(
          (res) => {
            const idx = this.products.findIndex(pr => pr._id === product._id);
            if (idx !== -1) {
              this.products[idx] = res;
            }
          },
          (error) => {
            console.error('Erreur promotion produit', error);
          }
        );
      }
    });
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
