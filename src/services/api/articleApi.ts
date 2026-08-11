const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Author {
  id: string;
  name: string;
  bio?: string;
  photo?: string;
}

export interface PublicArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  readingTime: number;
  featured: boolean;
  publishedAt: string;
  tags: string[];
  category: Category;
  author: Author;
  status?: string;
  isDeleted?: boolean;
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

export const articleApi = {
  async getArticles(): Promise<PublicArticle[]> {
    const response = await fetchWithRetry(`${API_URL}/articles`);

    if (!response.ok) {
      throw new Error("Failed to fetch articles");
    }

    const json = await response.json();

    return json.data.data;
  },

  async getArticle(id: string): Promise<PublicArticle> {
    const response = await fetchWithRetry(`${API_URL}/articles/${id}`);

    if (!response.ok) {
      throw new Error("Article not found");
    }

    const json = await response.json();

    return json.data;
  },

  async getArticleBySlug(slug: string): Promise<PublicArticle> {
    const response = await fetchWithRetry(`${API_URL}/articles/slug/${slug}`);

    if (!response.ok) {
      throw new Error("Article not found");
    }

    const json = await response.json();

    return json.data;
  }
};