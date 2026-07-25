export interface Magazine {
  id: number;
  slug: string;

  title: string;
  description: string;

  cover: string;

  issue: string;

  publishDate: string;

  pages: number;

  pdf: string;

  featured: boolean;
}