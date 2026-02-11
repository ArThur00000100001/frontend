import { Component, inject, model } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { API } from '../../../../environment/environment';
import { IApiResponse } from '../../auth/login';
import { IItemStore, IProduct } from '../../../models/admin.types';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal';

type IFormData = {
  product: FormControl<string | null>;
  description: FormControl<string | null>;
  price: FormControl<number | null>;
  stock: FormControl<number | null>;
  category: FormControl<string | null>;
  calories: FormControl<number | null>;
  color: FormControl<string | null>;
  image: FormControl<string | null>;
};

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-store-form',
  templateUrl: './store-form.html',
  styleUrl: './store-form.scss',
})
export class ProductFormComponent {
  readonly modalActivate = inject(NgbActiveModal, { optional: true });

  readonly formData = new FormGroup<IFormData>({
    product: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(null),
    stock: new FormControl(null),
    category: new FormControl(),
    calories: new FormControl(null),
    color: new FormControl(''),
    image: new FormControl(''),
  });

  readonly mode = model<'create' | 'edit'>('create');
  readonly item = model<IProduct | null>(null);

  async onSubmit() {
    const response = await fetch(`${API}/products`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(this.formData.value),
    });

    const result: IApiResponse<IItemStore> = await response.json();

    if (result.status == 'failure') return;
    console.log(result.data);
    this.modalActivate?.close(result.data);
  }

  ngOnInit() {
    if (this.mode() != 'edit') return;
    const { id, cart, ...products } = this.item() as IProduct;
    this.formData.setValue(products);
  }
}
