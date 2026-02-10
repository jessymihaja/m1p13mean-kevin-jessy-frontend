import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';   

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  genders = ['Femme', 'Homme', 'Autre'];

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      gender: ['', [Validators.required]]
    }, { validators: this.passwordsMatch });
  }

  private passwordsMatch(group: FormGroup) {
    const p = group.get('password')?.value;
    const c = group.get('confirmPassword')?.value;
    return p === c ? null : { passwordMismatch: true };
  }

  getPasswordMismatch() {
    return this.registerForm.hasError('passwordMismatch');
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      console.log('Register:', this.registerForm.value);
      setTimeout(() => {
        this.isLoading = false;
        alert('Inscription réussie !');
        this.registerForm.reset();
      }, 1500);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  getError(controlName: string) {
    const c = this.registerForm.get(controlName);
    if (!c) return '';
    if (c.hasError('required')) return 'Champ requis';
    if (c.hasError('email')) return 'Email invalide';
    if (c.hasError('minlength')) return 'Trop court';
    return '';
  }
  
}
