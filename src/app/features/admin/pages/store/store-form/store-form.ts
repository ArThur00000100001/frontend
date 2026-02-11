import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { API } from '../../../../environment/environment';
import { IApiResponse } from '../../auth/login';
import { IItemStore } from '../../../models/admin.types';

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

  preuba() {
    console.log(this.formData.value);
  }

  async onSubmit() {
    const response = await fetch(`${API}/product-store`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(this.formData.value),
    });

    const result: IApiResponse<IItemStore> = await response.json();

    if (result.status == 'failure') return;
    console.log(result.data);
  }
}
