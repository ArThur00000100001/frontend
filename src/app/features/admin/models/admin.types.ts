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
