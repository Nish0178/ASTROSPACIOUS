export interface Article {
  id: number;
  slug: string;

  category: string;
  title: string;
  description: string;
  image: string;

  author: string;
  date: string;
  readTime: string;
  content: string;

  featured: boolean;
}