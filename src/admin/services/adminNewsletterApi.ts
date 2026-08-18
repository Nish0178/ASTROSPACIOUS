const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export interface AdminSubscriber {
  id: string;
  email: string;
  verified: boolean;
  subscribedAt: string;
}

export interface AdminSubscribersResponse {
  data: AdminSubscriber[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const adminNewsletterApi = {
  getHeaders() {
    const token = localStorage.getItem("astro_admin_token");
    if (!token) throw new Error("No authentication token found");
    return {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    };
  },

  async getSubscribers(page: number = 1, limit: number = 10): Promise<AdminSubscribersResponse> {
    const response = await fetch(`${API_URL}/admin/subscribers?page=${page}&limit=${limit}`, {
      headers: this.getHeaders()
    });

    if (!response.ok) {
      if (response.status === 401) window.dispatchEvent(new Event('astro_unauthorized'));
      throw new Error("Failed to fetch subscribers");
    }

    const json = await response.json();
    return json.data; // backend returns { success, message, data: { data, meta } }
  },

  async deleteSubscriber(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/admin/subscribers/${id}`, {
      method: "DELETE",
      headers: this.getHeaders()
    });

    if (!response.ok) {
      if (response.status === 401) window.dispatchEvent(new Event('astro_unauthorized'));
      throw new Error("Failed to delete subscriber");
    }
  }
};
