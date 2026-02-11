export enum UserRole {
  ADMIN = 'Admin',
  STUDENT = 'Student',
}

export type IUser = {
  id: number;
  joinDate: string;
  fullName: string;
  firstLastName: string;
  secondLastName: string;
  email: string;
  role: UserRole;
};

export type IProduct = {
  id: number;
  product: string;
  description: string;
  image: string;
  price: number;
  stock: number;
  category: string;
  calories: number;
  color: string;
  cart: any;
};

export type IItemStore = {
  id: number;
  image: string;
  product: string;
  description: string;
  store_price: number;
  price: number;
  stock: number;
  category: string;
  calories: number;
  color: string;
};
