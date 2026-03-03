import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShopService } from '../../services/shop';
import { AuthService, UserRole } from '../../services/auth.service';

@Component({
  selector: 'app-shop-admin',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './shop-admin.html',
  styleUrl: './shop-admin.css'
  
})
export class ShopAdminComponent implements OnInit {
  shops: any[] = [];
  shopUsers: any[] = [];
  searchText: string = '';

  showForm = false;
  showShopForm = false;
  shopForm: FormGroup;
  shopForm2: FormGroup;

  selectedFile: File | null = null;
  selectedFileName: string = '';

  constructor(private shopService: ShopService,private fb: FormBuilder,private auth: AuthService) {
    this.shopForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatch });
    this.shopForm2 = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', Validators.required],
      owner: ['', Validators.required],
      logo: ['']
    });
  }

  ngOnInit(): void {
     this.loadShopUsers();
    this.loadShops();
   
  }

  loadShops(): void {
    this.shopService.getMockShops().subscribe(
      (data) => this.shops = data,
      (error) => console.error('Erreur récupération shops:', error)
    );
  }
  loadShopUsers(): void {
  this.shopService.getShopUsers().subscribe({
    next: (data) => {
      console.log('Utilisateurs chargés avec succès :', data);
      this.shopUsers = data.users || [];
    },
    error: (err) => {
      console.error('Erreur API réelle :', err);

      const message =
        err?.error?.message ||
        err?.message ||
        'Erreur inconnue';

      console.log("Message erreur :", message);
}
  });
}

  filteredShops(): any[] {
    return this.shops.filter(s => 
      s.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      s.description.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  openAddShop(): void {
    this.showForm = true;
  }
  openAddShopForm(): void {
    this.showShopForm = true;
  }

  private passwordsMatch(group: FormGroup) {
    const p = group.get('password')?.value;
    const c = group.get('confirmPassword')?.value;
    return p === c ? null : { passwordMismatch: true };
  }

  submitShop(): void {
    if (this.shopForm.invalid) {
      this.shopForm.markAllAsTouched();
      return;
    }
    const { name, email, password } = this.shopForm.value;
    
    this.auth.register({ name, email, password, role: 'shop' }).then(
      (res) => {
        
        this.shops.push({ _id: res.id || '', name, description: '', approved: false });
        this.shopForm.reset();
        this.showForm = false;
      }
    ).catch(err => {
      console.error('Erreur création boutique', err);
      alert('Impossible de créer la boutique : ' + (err?.error?.message || err.message));
    });
  }
  submitShop2(): void {
  if (this.shopForm2.invalid) {
    this.shopForm2.markAllAsTouched();
    return;
  }

  const formdata = new FormData();
  formdata.append('name', this.shopForm2.get('name')?.value || '');
  formdata.append('description', this.shopForm2.get('description')?.value || '');
  formdata.append('owner', this.shopForm2.get('owner')?.value || ''); // <-- important
  if (this.selectedFile) {
    formdata.append('logo', this.selectedFile, this.selectedFile.name);
  }

  this.shopService.createShopAccount(formdata).subscribe(
    (res) => {
      // 4️⃣ Ajoute le nouveau shop à ton tableau pour l'affichage
      this.shops.push(res);
      this.shopForm2.reset();
      this.selectedFile = null;
      this.selectedFileName = '';
      this.showShopForm = false;
      console.log('Boutique créée avec succès', res);
    },
    (err) => {
      console.error('Erreur création boutique', err);
      alert('Impossible de créer la boutique : ' + (err?.error?.message || err.message));
    }
  );
}
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this.selectedFile = file;
      this.selectedFileName = file.name;

      
      this.shopForm2.patchValue({ logo: file.name });
    }
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
