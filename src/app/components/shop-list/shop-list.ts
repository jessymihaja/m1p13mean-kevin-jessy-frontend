import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShopService } from '../../services/shop';

@Component({
  selector: 'app-shop-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shop-list.html',
  styleUrl: './shop-list.css'
})
export class ShopListComponent implements OnInit {
  shops: any[] = [];
  searchText: string = '';

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.loadShops();
  }

  loadShops(): void {
    this.shopService.getMockShops().subscribe(
      (data) => (this.shops = data),
      (err) => console.error('Erreur chargement shops', err)
    );
  }

  filteredShops(): any[] {
    return this.shops.filter(s =>
      s.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      s.description.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
