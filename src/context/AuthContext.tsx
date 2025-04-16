
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  photoUrl?: string;
  provider?: 'email' | 'google';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, phone?: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for logged in user in localStorage
    const storedUser = localStorage.getItem('travelUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be an API call to verify credentials
      if (email && password) {
        // Mock user for demo
        const loggedInUser = {
          id: 'user123',
          name: email.split('@')[0],
          email,
          phone: '',
          provider: 'email' as const,
        };
        
        setUser(loggedInUser);
        localStorage.setItem('travelUser', JSON.stringify(loggedInUser));
        toast({
          title: "Login successful",
          description: "Welcome back to Travel Ease!",
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string, phone?: string) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be an API call to create a user
      if (name && email && password) {
        // Mock user for demo
        const newUser = {
          id: `user_${Date.now()}`,
          name,
          email,
          phone,
          provider: 'email' as const,
        };
        
        setUser(newUser);
        localStorage.setItem('travelUser', JSON.stringify(newUser));
        toast({
          title: "Signup successful",
          description: "Welcome to Travel Ease!",
        });
      } else {
        throw new Error('Please fill all required fields');
      }
    } catch (error) {
      toast({
        title: "Signup failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      
      // Simulate Google authentication API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock Google user for demo
      const googleUser = {
        id: `google_user_${Date.now()}`,
        name: 'Google User',
        email: 'user@gmail.com',
        photoUrl: 'https://ui-avatars.com/api/?name=Google+User&background=0D8ABC&color=fff',
        provider: 'google' as const,
      };
      
      setUser(googleUser);
      localStorage.setItem('travelUser', JSON.stringify(googleUser));
      
      toast({
        title: "Google Login successful",
        description: "Welcome to Travel Ease!",
      });
    } catch (error) {
      toast({
        title: "Google Login failed",
        description: "Could not authenticate with Google. Please try again.",
        variant: "destructive",
      });
      console.error("Google login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('travelUser');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        signup,
        loginWithGoogle,
        logout,
      }}
    >
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
