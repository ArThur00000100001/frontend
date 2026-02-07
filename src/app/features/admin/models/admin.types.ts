export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export type IUser = {
  id: number;
  joinDate: string;
  fullName: string;
  firstLastName: string;
  secondLastName: string;
  email: string;
  password: string;
  role: UserRole;
};
