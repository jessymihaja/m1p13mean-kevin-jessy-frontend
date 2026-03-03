import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { AuthService} from '../../services/auth.service';
import { StorageService } from '../../services/storageService';

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

  constructor(private cd : ChangeDetectorRef, private productService: ProductService, private dialog: MatDialog,private authService: AuthService,private storageService: StorageService) {}

  ngOnInit() {
  const userStr = this.storageService.getItem('user');
  const ownerId = userStr ? JSON.parse(userStr).id : null;
  
  if (ownerId) {
    this.productService.getProducts(ownerId).subscribe(
  (data) => {
    this.products = data;
    console.log('Produits chargés avec succès :', data);
    this.cd.detectChanges(); // injecte ChangeDetectorRef
  },
  (error) => console.error(error)
);
  }
}


  filteredProducts(): any[] {
    return this.products.filter(p => 
      p.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      p.description.toLowerCase().includes(this.searchText.toLowerCase())||
      p.price.toString().includes(this.searchText)
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
        const ownerid = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).id : null;
        this.productService.addProduct(ownerid,result).subscribe(
          (p) => {

            this.products.push(p);
          },
          (error) => {
            console.error('Erreur ajout produit', error);
            console.log('Données envoyées :', result);
            console.log('Owner ID :', ownerid);
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
