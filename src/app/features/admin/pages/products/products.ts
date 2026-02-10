import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgOptimizedImage, DecimalPipe } from '@angular/common';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  rating: number;
  preparationTime: string;
  calories: number;
  isPopular?: boolean;
  color?: string; // Pastel background color
}

@Component({
  selector: 'app-products',
  imports: [NgOptimizedImage, DecimalPipe],
  templateUrl: './products.html',
  styleUrl: './products.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  readonly products = signal<Product[]>([
    {
      id: '1',
      name: 'Carrots',
      description: 'Bunch of sweet, crunchy organic carrots.',
      price: 1.20,
      category: 'Vegetables',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/3523/3523789.png', // Animated/3D style
      rating: 4.9,
      preparationTime: 'Fresh',
      calories: 41,
      color: '#FFF0E6'
    },
    {
      id: '2',
      name: 'Fresh Tomatoes',
      description: 'Juicy vine-ripened red tomatoes.',
      price: 2.50,
      category: 'Vegetables',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/3523/3523826.png',
      rating: 4.8,
      preparationTime: 'Fresh',
      calories: 18,
      color: '#FFE6E6',
      isPopular: true
    },
    {
      id: '3',
      name: 'Crispy Lettuce',
      description: 'Fresh and organic green lettuce leaves.',
      price: 1.80,
      category: 'Vegetables',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/3523/3523849.png',
      rating: 4.7,
      preparationTime: 'Fresh',
      calories: 15,
      color: '#E6F4EA'
    },
    {
      id: '4',
      name: 'Sweet Corn',
      description: 'Golden yellow sweet corn on the cob.',
      price: 3.00,
      category: 'Vegetables',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/3523/3523803.png',
      rating: 4.6,
      preparationTime: 'Fresh',
      calories: 86,
      color: '#FFFDE6'
    },
    {
      id: '5',
      name: 'Red Apple',
      description: 'Crunchy and sweet gala apple.',
      price: 0.90,
      category: 'Fruits',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/3523/3523812.png',
      rating: 4.9,
      preparationTime: 'Fresh',
      calories: 95,
      color: '#FFF0F0',
      isPopular: true
    },
    {
      id: '6',
      name: 'Purple Grapes',
      description: 'Sweet and seedless purple grapes bouquet.',
      price: 4.50,
      category: 'Fruits',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/3523/3523862.png',
      rating: 4.8,
      preparationTime: 'Fresh',
      calories: 67,
      color: '#F4E6F7'
    }
  ]);

  readonly categories = signal<string[]>(['All', 'Vegetables', 'Fruits', 'Dairy', 'Bakery']);
  readonly selectedCategory = signal<string>('All');

  onOrder(product: Product) {
    console.log(`Added to cart: ${product.name}`);
  }
}
