import api from './api';
import type { User, UserRole } from '../types/user';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignupData {
  username: string;
  email: string;
  password: string;
  full_name: string;
  phone_number: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export class AuthService {
  private static instance: AuthService;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // Login user
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const formData = new FormData();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);

    const response = await api.post('/auth/token', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const authData = response.data;
    
    // Store token in localStorage
    localStorage.setItem('access_token', authData.access_token);
    
    // Get user info after login
    const userInfo = await this.getCurrentUser();
    localStorage.setItem('user', JSON.stringify(userInfo));

    return authData;
  }

  // Sign up new user
  async signup(userData: SignupData): Promise<User> {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  }

  // Get current user info
  async getCurrentUser(): Promise<User> {
    const response = await api.get('/auth/me');
    return response.data;
  }

  // Logout user
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  // Get stored user data
  getStoredUser(): User | null {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  // Check if user has specific role
  hasRole(role: UserRole): boolean {
    const user = this.getStoredUser();
    return user?.role === role;
  }

  // Check if user is admin
  isAdmin(): boolean {
    return this.hasRole('admin');
  }

  // Check if user is worker
  isWorker(): boolean {
    return this.hasRole('worker');
  }

  // Check if user is staff (admin or worker)
  isStaff(): boolean {
    return this.isAdmin() || this.isWorker();
  }
} 