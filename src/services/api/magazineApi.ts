const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export interface PublicMagazine {
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
  featured: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  status?: string;
}

export interface PublicMagazinesResponse {
  data: PublicMagazine[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }
}

async function fetchWithRetry(url: string, options?: RequestInit, retries = 2): Promise<Response> {
  try {
    const response = await fetch(url, options);
    // Retry on server errors (5xx)
    if (!response.ok && response.status >= 500 && retries > 0) {
      throw new Error(`Server error: ${response.status}`);
    }
    return response;
  } catch (err) {
    if (retries > 0) {
      await new Promise(res => setTimeout(res, 1000));
      return fetchWithRetry(url, options, retries - 1);
    }
    throw err;
  }
}

export const magazineApi = {
  async getMagazines(params: { page?: number; limit?: number; search?: string } = {}): Promise<PublicMagazinesResponse> {
    const query = new URLSearchParams();
    if (params.page) query.append("page", params.page.toString());
    if (params.limit) query.append("limit", params.limit.toString());
    if (params.search) query.append("search", params.search);

    const response = await fetchWithRetry(`${API_URL}/magazines?${query.toString()}`);

    if (!response.ok) {
      throw new Error("Failed to fetch magazines");
    }

    const json = await response.json();
    return json.data;
  },

  async getMagazineBySlug(slug: string): Promise<PublicMagazine> {
    const response = await fetchWithRetry(`${API_URL}/magazines/${slug}`);

    if (!response.ok) {
      throw new Error("Magazine not found");
    }

    const json = await response.json();
    return json.data;
  }
};
