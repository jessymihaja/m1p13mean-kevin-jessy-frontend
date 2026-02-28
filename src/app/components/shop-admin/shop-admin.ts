import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShopService } from '../../services/shop';

@Component({
  selector: 'app-shop-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shop-admin.html',
  styleUrl: './shop-admin.css'
})
export class ShopAdminComponent implements OnInit {
  shops: any[] = [];
  searchText: string = '';

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.loadShops();
  }

  loadShops(): void {
    // données factices pour admin
    this.shopService.getMockShops().subscribe(
      (data) => this.shops = data,
      (error) => console.error('Erreur récupération shops (mock) :', error)
    );
  }

  filteredShops(): any[] {
    return this.shops.filter(s => 
      s.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      s.description.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  addShop(): void {
    const name = prompt('Nom de la boutique');
    if (!name) return;
    const newShop: any = { name, description: '', approved: false };
    this.shopService.addShop(newShop).subscribe(
      (s) => this.shops.push(s),
      (err) => console.error('Erreur ajout shop', err)
    );
  }

  editShop(shop: any): void {
    const newName = prompt('Modifier le nom', shop.name);
    if (newName === null) return;
    const updated = { ...shop, name: newName };
    this.shopService.updateShop(shop._id, updated).subscribe(
      (res) => {
        const idx = this.shops.findIndex(sh => sh._id === shop._id);
        if (idx !== -1) this.shops[idx] = res;
      },
      (err) => console.error('Erreur modification shop', err)
    );
  }

  deleteShop(id: string): void {
    if (!confirm('Confirmer suppression ?')) return;
    this.shopService.deleteShop(id).subscribe(
      () => this.shops = this.shops.filter(s => s._id !== id),
      (err) => console.error('Erreur suppression shop', err)
    );
  }

  toggleApprove(shop: any): void {
    const updated = { ...shop, approved: !shop.approved };
    this.shopService.updateShop(shop._id, updated).subscribe(
      (res) => {
        const idx = this.shops.findIndex(sh => sh._id === shop._id);
        if (idx !== -1) this.shops[idx] = res;
      },
      (err) => console.error('Erreur activation shop', err)
    );
  }
}
