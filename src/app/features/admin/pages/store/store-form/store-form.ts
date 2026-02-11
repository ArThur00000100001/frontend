import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-store-form',
  templateUrl: './store-form.html',
  styleUrl: './store-form.scss',
})
export class storeFormComponent {
  readonly formData = new FormGroup({
    product: new FormControl(''),
    description: new FormControl(''),
    store_price: new FormControl(''),
    price: new FormControl(''),
    stock: new FormControl(''),
    category: new FormControl(''),
    calories: new FormControl(''),
    color: new FormControl(''),
  });
}
