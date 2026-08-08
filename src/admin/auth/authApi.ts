const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    admin: {
      id: string;
      name: string;
      email: string;
      role: string;
    }
  };
  errors?: any;
}

export const authApi = {
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Handle raw non-JSON errors (like 502 Bad Gateway)
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        throw new Error("Server is currently unavailable.");
      }

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      return data;
    } catch (error: any) {
      if (error.message === "Failed to fetch") {
        throw new Error("Network error. The server might be down.");
      }
      throw error;
    }
  }
};
