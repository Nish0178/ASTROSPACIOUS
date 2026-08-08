const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export interface AdminArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category: { id: string; name: string; slug: string };
  author: { id: string; name: string };
  status: "Draft" | "Published" | "Archived";
  featured: boolean;
  readingTime: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  deletedBy?: string;
  restoredAt?: string;
  restoredBy?: string;
}

export interface AdminArticlesResponse {
  data: AdminArticle[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }
}

export interface GetArticlesParams {
  page?: number;
  limit?: number;
  sort?: "Newest" | "Oldest";
  search?: string;
  status?: string;
  featured?: string;
  category?: string;
}

export interface CreateArticlePayload {
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  categoryId: string;
  authorId: string;
  tags?: string[];
  featured?: boolean;
  status?: "Draft" | "Published" | "Archived";
}

export const adminArticleApi = {
  getHeaders() {
    const token = localStorage.getItem("astro_admin_token");
    if (!token) throw new Error("No authentication token found");
    return {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    };
  },

  async getArticles(params: GetArticlesParams = {}): Promise<AdminArticlesResponse> {
    const query = new URLSearchParams();
    
    if (params.page) query.append("page", params.page.toString());
    if (params.limit) query.append("limit", params.limit.toString());
    if (params.sort) query.append("sort", params.sort);
    if (params.search) query.append("search", params.search);
    if (params.status) query.append("status", params.status);
    if (params.featured) query.append("featured", params.featured);
    if (params.category) query.append("category", params.category);

    const response = await fetch(`${API_URL}/admin/articles?${query.toString()}`, {
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error("Failed to fetch articles");
    }

    const json = await response.json();
    return json.data;
  },

  async getTrashArticles(params: GetArticlesParams = {}): Promise<AdminArticlesResponse> {
    const query = new URLSearchParams();
    
    if (params.page) query.append("page", params.page.toString());
    if (params.limit) query.append("limit", params.limit.toString());
    if (params.sort) query.append("sort", params.sort);
    if (params.search) query.append("search", params.search);
    if (params.status) query.append("status", params.status);
    if (params.featured) query.append("featured", params.featured);
    if (params.category) query.append("category", params.category);

    const response = await fetch(`${API_URL}/admin/articles/trash?${query.toString()}`, {
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error("Failed to fetch trashed articles");
    }

    const json = await response.json();
    return json.data;
  },

  async deleteArticle(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/admin/articles/${id}`, {
      method: "DELETE",
      headers: this.getHeaders()
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || "Failed to delete article");
    }
  },

  async restoreArticle(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/admin/articles/${id}/restore`, {
      method: "PATCH",
      headers: this.getHeaders()
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || "Failed to restore article");
    }
  },

  async permanentDeleteArticle(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/admin/articles/${id}/permanent`, {
      method: "DELETE",
      headers: this.getHeaders()
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || "Failed to permanently delete article");
    }
  },

  async bulkTrashArticles(ids: string[]): Promise<void> {
    const response = await fetch(`${API_URL}/admin/articles-bulk/trash`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ ids })
    });
    if (!response.ok) throw new Error("Failed to trash articles");
  },

  async bulkRestoreArticles(ids: string[]): Promise<void> {
    const response = await fetch(`${API_URL}/admin/articles-bulk/restore`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ ids })
    });
    if (!response.ok) throw new Error("Failed to restore articles");
  },

  async bulkPermanentDeleteArticles(ids: string[]): Promise<void> {
    const response = await fetch(`${API_URL}/admin/articles-bulk/delete`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ ids })
    });
    if (!response.ok) throw new Error("Failed to permanently delete articles");
  },

  async createArticle(data: CreateArticlePayload): Promise<AdminArticle> {
    const response = await fetch(`${API_URL}/admin/articles`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || "Failed to create article");
    }

    const json = await response.json();
    return json.data;
  },

  async updateArticle(id: string, data: Partial<CreateArticlePayload>): Promise<AdminArticle> {
    const response = await fetch(`${API_URL}/admin/articles/${id}`, {
      method: "PATCH",
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || "Failed to update article");
    }

    const json = await response.json();
    return json.data;
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
      throw new Error("Failed to upload image");
    }

    const json = await response.json();
    return { publicUrl: json.data.publicUrl };
  },

  async getCategories(): Promise<{ id: string; name: string; slug: string }[]> {
    const response = await fetch(`${API_URL}/admin/articles/categories`, {
      headers: this.getHeaders()
    });
    if (!response.ok) throw new Error("Failed to fetch categories");
    const json = await response.json();
    return json.data;
  },

  async getAuthors(): Promise<{ id: string; name: string }[]> {
    const response = await fetch(`${API_URL}/admin/articles/authors`, {
      headers: this.getHeaders()
    });
    if (!response.ok) throw new Error("Failed to fetch authors");
    const json = await response.json();
    return json.data;
  }
};
