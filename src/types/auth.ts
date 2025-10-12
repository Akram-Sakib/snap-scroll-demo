export interface User {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  role: 'seller' | 'buyer';
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  budget: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  phoneNumber: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  username: string;
  phoneNumber: string;
  role: 'seller' | 'buyer';
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  budget: number;
} 