import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  token: string | null;
  user: AdminUser | null;
  isAuthenticated: boolean;
  login: (token: string, user: AdminUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Load auth state from local storage on mount
    const storedToken = localStorage.getItem("astro_admin_token");
    const storedUser = localStorage.getItem("astro_admin_user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user", e);
      }
    }
    
    setIsInitialized(true);
  }, []);

  const login = (newToken: string, newUser: AdminUser) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("astro_admin_token", newToken);
    localStorage.setItem("astro_admin_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("astro_admin_token");
    localStorage.removeItem("astro_admin_user");
  };

  // Prevent flicker while checking localStorage
  if (!isInitialized) {
    return null; 
  }

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated: !!token, login, logout }}>
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
