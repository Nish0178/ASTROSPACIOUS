const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export interface DashboardStats {
  totalArticles: number;
  totalMagazines: number;
  totalSubscribers: number;
  totalMessages: number;
  publishedArticles: number;
  draftArticles: number;
  articlesInTrash?: number;
}

export const adminApi = {
  async getDashboardStats(): Promise<DashboardStats> {
    const token = localStorage.getItem("astro_admin_token");
    
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(`${API_URL}/admin/dashboard`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized");
      }
      throw new Error("Failed to fetch dashboard statistics");
    }

    const json = await response.json();
    return json.data;
  }
};
