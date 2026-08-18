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

export function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export function isTokenExpired(token: string) {
  const decoded = parseJwt(token);
  if (!decoded || !decoded.exp) return true; // Invalid token or missing expiration
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("astro_admin_token");
    localStorage.removeItem("astro_admin_user");
  };

  useEffect(() => {
    // Load auth state from local storage on mount
    const storedToken = localStorage.getItem("astro_admin_token");
    const storedUser = localStorage.getItem("astro_admin_user");

    if (storedToken && storedUser) {
      if (isTokenExpired(storedToken)) {
        // Token is expired, clean up local storage and stay logged out
        logout();
      } else {
        setToken(storedToken);
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Failed to parse stored user", e);
        }
      }
    }
    
    setIsInitialized(true);

    // Global listener for 401 Unauthorized API responses
    const handleUnauthorized = () => logout();
    window.addEventListener("astro_unauthorized", handleUnauthorized);
    
    return () => {
      window.removeEventListener("astro_unauthorized", handleUnauthorized);
    };
  }, []);

  const login = (newToken: string, newUser: AdminUser) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("astro_admin_token", newToken);
    localStorage.setItem("astro_admin_user", JSON.stringify(newUser));
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
