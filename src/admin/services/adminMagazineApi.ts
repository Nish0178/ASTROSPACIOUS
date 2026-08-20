const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export interface AdminMagazine {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage?: string;
  pdfUrl?: string;
  issueNumber?: string;
  volume?: string;
  category?: string;
  tags: string[];
  status: "Draft" | "Published" | "Archived";
  featured: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminMagazinesResponse {
  data: AdminMagazine[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }
}

export interface GetMagazinesParams {
  page?: number;
  limit?: number;
  sort?: "Newest" | "Oldest";
  search?: string;
  status?: string;
  featured?: string;
  category?: string;
  volume?: string;
  issueNumber?: string;
}

export interface CreateMagazinePayload {
  title: string;
  slug?: string;
  description: string;
  coverImage?: string;
  pdfUrl?: string;
  issueNumber?: string;
  volume?: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
  status?: "Draft" | "Published" | "Archived";
}

export const adminMagazineApi = {
  getHeaders() {
    const token = localStorage.getItem("astro_admin_token");
    if (!token) throw new Error("No authentication token found");
    return {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    };
  },

  async getMagazines(params: GetMagazinesParams = {}): Promise<AdminMagazinesResponse> {
    const query = new URLSearchParams();
    
    if (params.page) query.append("page", params.page.toString());
    if (params.limit) query.append("limit", params.limit.toString());
    if (params.sort) query.append("sort", params.sort);
    if (params.search) query.append("search", params.search);
    if (params.status) query.append("status", params.status);
    if (params.featured) query.append("featured", params.featured);
    if (params.category) query.append("category", params.category);
    if (params.volume) query.append("volume", params.volume);
    if (params.issueNumber) query.append("issueNumber", params.issueNumber);

    const response = await fetch(`${API_URL}/admin/magazines?${query.toString()}`, {
      headers: this.getHeaders()
    });

    if (!response.ok) {
      if (response.status === 401) window.dispatchEvent(new Event('astro_unauthorized'));
      throw new Error("Failed to fetch magazines");
    }

    const json = await response.json();
    return json.data;
  },

  async createMagazine(data: CreateMagazinePayload): Promise<AdminMagazine> {
    const response = await fetch(`${API_URL}/admin/magazines`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      if (response.status === 401) window.dispatchEvent(new Event('astro_unauthorized'));
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || "Failed to create magazine");
    }

    const json = await response.json();
    return json.data;
  },

  async updateMagazine(id: string, data: Partial<CreateMagazinePayload>): Promise<AdminMagazine> {
    const response = await fetch(`${API_URL}/admin/magazines/${id}`, {
      method: "PATCH",
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      if (response.status === 401) window.dispatchEvent(new Event('astro_unauthorized'));
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || "Failed to update magazine");
    }

    const json = await response.json();
    return json.data;
  },

  async getTrashMagazines(params: GetMagazinesParams = {}): Promise<AdminMagazinesResponse> {
    const query = new URLSearchParams();
    
    if (params.page) query.append("page", params.page.toString());
    if (params.limit) query.append("limit", params.limit.toString());
    if (params.sort) query.append("sort", params.sort);
    if (params.search) query.append("search", params.search);
    if (params.status) query.append("status", params.status);
    if (params.featured) query.append("featured", params.featured);
    if (params.category) query.append("category", params.category);
    if (params.volume) query.append("volume", params.volume);
    if (params.issueNumber) query.append("issueNumber", params.issueNumber);

    const response = await fetch(`${API_URL}/admin/magazines/trash?${query.toString()}`, {
      headers: this.getHeaders()
    });

    if (!response.ok) {
      if (response.status === 401) window.dispatchEvent(new Event('astro_unauthorized'));
      throw new Error("Failed to fetch trashed magazines");
    }

    const json = await response.json();
    return json.data;
  },

  async deleteMagazine(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/admin/magazines/${id}`, {
      method: "DELETE",
      headers: this.getHeaders()
    });

    if (!response.ok) {
      if (response.status === 401) window.dispatchEvent(new Event('astro_unauthorized'));
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || "Failed to move magazine to trash");
    }
  },

  async restoreMagazine(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/admin/magazines/${id}/restore`, {
      method: "PATCH",
      headers: this.getHeaders()
    });

    if (!response.ok) {
      if (response.status === 401) window.dispatchEvent(new Event('astro_unauthorized'));
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || "Failed to restore magazine");
    }
  },

  async permanentDeleteMagazine(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/admin/magazines/${id}/permanent`, {
      method: "DELETE",
      headers: this.getHeaders()
    });

    if (!response.ok) {
      if (response.status === 401) window.dispatchEvent(new Event('astro_unauthorized'));
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || "Failed to permanently delete magazine");
    }
  },

  async bulkTrashMagazines(ids: string[]): Promise<void> {
    const response = await fetch(`${API_URL}/admin/magazines-bulk/trash`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ ids })
    });
    if (!response.ok) {
      if (response.status === 401) window.dispatchEvent(new Event('astro_unauthorized'));
      throw new Error("Failed to trash magazines");
    }
  },

  async bulkRestoreMagazines(ids: string[]): Promise<void> {
    const response = await fetch(`${API_URL}/admin/magazines-bulk/restore`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ ids })
    });
    if (!response.ok) {
      if (response.status === 401) window.dispatchEvent(new Event('astro_unauthorized'));
      throw new Error("Failed to restore magazines");
    }
  },

  async bulkPermanentDeleteMagazines(ids: string[]): Promise<void> {
    const response = await fetch(`${API_URL}/admin/magazines-bulk/delete`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ ids })
    });
    if (!response.ok) {
      if (response.status === 401) window.dispatchEvent(new Event('astro_unauthorized'));
      throw new Error("Failed to permanently delete magazines");
    }
  },

  async uploadImage(file: File): Promise<{ publicUrl: string }> {
    const token = localStorage.getItem("astro_admin_token");
    if (!token) throw new Error("No authentication token found");

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_URL}/admin/media/upload/image`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: formData
    });

    if (!response.ok) {
      if (response.status === 401) window.dispatchEvent(new Event('astro_unauthorized'));
      throw new Error("Failed to upload image");
    }

    const json = await response.json();
    return { publicUrl: json.data.publicUrl };
  },

  async uploadPdf(file: File): Promise<{ publicUrl: string }> {
    const token = localStorage.getItem("astro_admin_token");
    if (!token) throw new Error("No authentication token found");

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_URL}/admin/media/upload/pdf`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: formData
    });

    if (!response.ok) {
      if (response.status === 401) window.dispatchEvent(new Event('astro_unauthorized'));
      throw new Error("Failed to upload PDF");
    }

    const json = await response.json();
    return { publicUrl: json.data.publicUrl };
  }
};
