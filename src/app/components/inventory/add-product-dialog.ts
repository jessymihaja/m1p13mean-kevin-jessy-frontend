import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-product-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './add-product-dialog.html',
  styleUrls: ['./add-product-dialog.css']
})
export class AddProductDialogComponent {
  product: any = {
    name: '',
    description: '',
    price: 0,
    image: '',
    category: '',
    shop: ''
  };

  constructor(
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      // store filename/path - backend expects a string path
      this.product.image = file.name;
    }
  }

  save(): void {
    this.dialogRef.close(this.product);
  }
}
