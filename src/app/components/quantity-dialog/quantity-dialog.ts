import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatLabel,MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-quantity-dialog',
  templateUrl: './quantity-dialog.html',
  styleUrls: ['./quantity-dialog.css'],
  imports: [FormsModule, MatLabel, MatFormField,MatInputModule]
})
export class QuantityDialogComponent {

  quantity: number = 1;

  constructor(
    public dialogRef: MatDialogRef<QuantityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public product: any
  ) {}

  confirm() {
    this.dialogRef.close(this.quantity);
  }

  cancel() {
    this.dialogRef.close();
  }
}