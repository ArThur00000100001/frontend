import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal';
import { storeFormComponent } from './store-form/store-form';
import { API } from '../../../environment/environment';
import { IApiResponse } from '../auth/login';
import { IItemStore } from '../../models/admin.types';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  color: string;
}

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './store.html',
  styleUrl: './store.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreComponent {
  readonly modalService = inject(NgbModal);

  readonly itemStore = signal<IItemStore[]>([]);
  // Dummy data for design visualization
  products = signal<Product[]>([
    {
      id: 1,
      name: 'Strawberry Cake',
      category: 'Dessert',
      price: 15.99,
      image: '🍰',
      color: '#FFE5EC',
    },
    { id: 2, name: 'Matcha Tea', category: 'Beverage', price: 8.5, image: '🍵', color: '#E8F5E9' },
    {
      id: 3,
      name: 'Blueberry Muffin',
      category: 'Bakery',
      price: 5.25,
      image: '🧁',
      color: '#E3F2FD',
    },
    {
      id: 4,
      name: 'Vanilla Latte',
      category: 'Beverage',
      price: 6.75,
      image: '☕',
      color: '#FFF3E0',
    },
    { id: 5, name: 'Peach Tart', category: 'Dessert', price: 12.0, image: '🍑', color: '#FFF0E0' },
    { id: 6, name: 'Croissant', category: 'Bakery', price: 4.5, image: '🥐', color: '#FFF9C4' },
  ]);

  // Cart state (empty for now, logic handled by user)
  cart = signal<{ productId: number; quantity: number }[]>([]);

  // Derived state
  totalItems = computed(() => this.cart().reduce((acc, item) => acc + item.quantity, 0));
  totalPrice = computed(() => {
    return this.cart().reduce((acc, item) => {
      const product = this.products().find((p) => p.id === item.productId);
      return acc + (product ? product.price * item.quantity : 0);
    }, 0);
  });

  getQuantity(productId: number): number {
    const item = this.cart().find((i) => i.productId === productId);
    return item ? item.quantity : 0;
  }

  openStoreForm() {
    const ref = this.modalService.open(storeFormComponent, {
      size: 'lg',
      backdrop: 'static',
    });

    const component: storeFormComponent = ref.componentInstance;

    const result = component;
  }
}
