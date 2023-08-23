export interface Register {
  user: User;
}

export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  name: string;
  lastname: string;
  birthday_date: string;
}

export interface RegisterBody {
  username: string;
  email: string;
  password: string;
  name: string;
  lastname: string;
  birthday_date?: string;
}
