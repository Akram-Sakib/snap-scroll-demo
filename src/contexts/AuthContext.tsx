"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  AuthState,
  LoginCredentials,
  RegisterCredentials,
  User,
} from "@/types/auth";
import { config } from "@/config";

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    // Check for existing session on mount
    const checkSession = async () => {
      try {
        const response = await fetch("/api/auth/session");
        if (response.ok) {
          const user = await response.json();
          setState((prev) => ({
            ...prev,
            user,
            isAuthenticated: true,
            isLoading: false,
          }));
        } else {
          setState((prev) => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: "Failed to check session",
        }));
      }
    };

    checkSession();
  }, []);
  const login = async (credentials: LoginCredentials) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await fetch(`${config.apiBaseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          phoneNumber: credentials.phoneNumber,
          password: credentials.password,
        }),
        credentials: 'include',
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.error || "Login failed");
      }

      // Extract accessToken from the new API response structure
      const { data } = responseData;
      const accessToken = data?.accessToken;

      if (!accessToken) {
        throw new Error("Invalid response from server");
      }

      // Fetch user data using the token
      const userResponse = await fetch(`${config.apiBaseUrl}/users/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include',
      });

      if (!userResponse.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = await userResponse.json();
      const user = userData.data;

      // Set session cookie with token
      const cookieResponse = await fetch("/api/auth/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({ 
          ...user, 
          token: accessToken,
          id: user.id,
          phoneNumber: user.phoneNumber,
          role: user.role,
        }),
      });

      if (!cookieResponse.ok) {
        throw new Error("Failed to set session");
      }

      const cookieData = await cookieResponse.json();

      setState((prev) => ({
        ...prev,
        user: { ...user, token: accessToken },
        isAuthenticated: true,
        isLoading: false,
      }));
    } catch (error) {
      console.error("Login error:", error);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Login failed",
      }));
      throw error;
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await fetch(`${config.apiBaseUrl}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // email: credentials.email,
          password: credentials.password,
          name: credentials.name,
          phoneNumber: credentials.phoneNumber,
          role: credentials.role,
          address: credentials.address,
          budget: credentials.budget,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        if (responseData.errorMessages) {
          const errorMessage = responseData.errorMessages
            .map((err: { message: string }) => err.message)
            .join(", ");
          throw new Error(errorMessage);
        }
        throw new Error(responseData.message || "Registration failed");
      }

      const { accessToken, user } = responseData;

      if (!accessToken || !user) {
        throw new Error("Invalid response from server");
      }

      // Set session cookie with token
      const cookieResponse = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...user, token: accessToken }),
      });

      if (!cookieResponse.ok) {
        throw new Error("Failed to set session");
      }

      setState((prev) => ({
        ...prev,
        user: { ...user, token: accessToken },
        isAuthenticated: true,
        isLoading: false,
      }));
    } catch (error) {
      console.error("Registration error:", error);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Registration failed",
      }));
      throw error;
    }
  };

  const logout = async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setState((prev) => ({
        ...prev,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Logout failed",
      }));
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
