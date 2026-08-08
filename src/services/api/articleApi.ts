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

export const articleApi = {
  async getArticles(): Promise<PublicArticle[]> {
    const response = await fetch(`${API_URL}/articles`);

    if (!response.ok) {
      throw new Error("Failed to fetch articles");
    }

    const json = await response.json();

    return json.data.data;
  },

  async getArticle(id: string): Promise<PublicArticle> {
    const response = await fetch(`${API_URL}/articles/${id}`);

    if (!response.ok) {
      throw new Error("Article not found");
    }

    const json = await response.json();

    return json.data;
  },

  async getArticleBySlug(slug: string): Promise<PublicArticle> {
    const response = await fetch(`${API_URL}/articles/slug/${slug}`);

    if (!response.ok) {
      throw new Error("Article not found");
    }

    const json = await response.json();

    return json.data;
  }
};