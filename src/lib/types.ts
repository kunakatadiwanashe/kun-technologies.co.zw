export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  benefits: string[];
  technologies: string[];
  slug: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  featured: boolean;
  image: string;
  tags: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  technologies: string[];
  slug: string;
  client: string;
  results: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}
