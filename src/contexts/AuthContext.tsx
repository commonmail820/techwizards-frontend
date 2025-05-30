import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

// Backend API URL for authentication - Updated to match techwizards-frontend
const BACKEND_API_URL = 'https://techwizards-backend.onrender.com/api';

interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  phone_number: string;
  role: 'admin' | 'worker' | 'customer';
  token: string;
}

interface SignUpData {
  fullName: string;
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<{ role: string; username: string }>;
  signup: (data: SignUpData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isWorker: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const signup = async (data: SignUpData) => {
    try {
      console.log('Attempting signup with data:', data);
      console.log('Sending request to:', `${BACKEND_API_URL}/signup`);
      
      // Transform data to match backend API format
      const signupData = {
        full_name: data.fullName,
        username: data.username,
        email: data.email,
        password: data.password,
        phone_number: data.phoneNumber,
      };
      
      const response = await axios.post(`${BACKEND_API_URL}/signup`, signupData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 second timeout
      });
      
      console.log('Signup response:', response.data);
      
      if (response.data.error) {
        throw new Error(response.data.error);
      }
      
      // Success response
      console.log('Signup successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('Signup error details:', error);
      
      if (axios.isAxiosError(error)) {
        console.error('Axios error response:', error.response);
        console.error('Axios error request:', error.request);
        console.error('Axios error config:', error.config);
        
        if (error.response?.data?.error) {
          throw new Error(error.response.data.error);
        } else if (error.response?.status === 500) {
          throw new Error('Server error. Please try again later.');
        } else if (error.response?.status === 400) {
          throw new Error('Bad request. Please check your input data.');
        } else if (error.code === 'ECONNREFUSED') {
          throw new Error('Cannot connect to server. Please make sure the backend is running on port 8001.');
        } else if (error.code === 'TIMEOUT') {
          throw new Error('Request timeout. Please try again.');
        }
      }
      throw new Error('Failed to create account. Please try again.');
    }
  };

  const login = async (username: string, password: string) => {
    try {
      console.log('Attempting login with username:', username);
      console.log('Sending request to:', `${BACKEND_API_URL}/auth/login`);
      
      const response = await axios.post(`${BACKEND_API_URL}/auth/login`, {
        username,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });

      console.log('Login response status:', response.status);
      console.log('Login response data:', response.data);
      console.log('Response data type:', typeof response.data);
      console.log('Response data keys:', Object.keys(response.data));

      // Check if response has error
      if (response.data.error) {
        console.log('❌ Backend returned error:', response.data.error);
        throw new Error(response.data.error);
      }

      // Check if response has success
      if (!response.data.success) {
        console.log('❌ No success field in response');
        throw new Error('Invalid response from server');
      }

      // Check if response has user data
      if (!response.data.user) {
        console.log('❌ No user data in response');
        throw new Error('Invalid response from server - no user data');
      }

      const { user: userData, token } = response.data;
      console.log('✅ Extracted user data:', userData);
      console.log('✅ Extracted token:', token);

      const userWithToken = {
        ...userData,
        token,
      };

      console.log('✅ Final user object:', userWithToken);

      setUser(userWithToken);

      // Store token in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userWithToken));

      console.log('✅ Login successful, returning:', { role: userData.role, username: userData.username });
      return { role: userData.role, username: userData.username };
    } catch (error) {
      console.error('❌ Login error details:', error);
      
      if (axios.isAxiosError(error)) {
        console.error('❌ Axios error response:', error.response);
        console.error('❌ Axios error status:', error.response?.status);
        console.error('❌ Axios error data:', error.response?.data);
        
        if (error.response?.data?.error) {
          throw new Error(error.response.data.error);
        } else if (error.response?.status === 500) {
          throw new Error('Server error. Please try again later.');
        } else if (error.response?.status === 400) {
          throw new Error('Invalid credentials. Please check your username and password.');
        } else if (error.code === 'ECONNREFUSED') {
          throw new Error('Cannot connect to server. Please make sure the backend is running on port 8001.');
        }
      }
      
      // If it's a regular Error (thrown by us), re-throw it
      if (error instanceof Error) {
        throw error;
      }
      
      throw new Error('Login failed. Please try again.');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const isAuthenticated = !!user;

  // Load user from localStorage on app start
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      logout, 
      isAuthenticated,
      isAdmin: user?.role === 'admin',
      isWorker: user?.role === 'worker'
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 