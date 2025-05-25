export interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  features?: string[];
  challenges?: string[];
  demoUrl?: string;
  codeUrl?: string;
  imageUrl?: string;
}

export interface IBlog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: number;
  featuredImage?: string;
  tags?: string[];
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  duration: string;
  responsibilities: string[];
}
export interface Education {
  id: string;
  degree: string;
  institution: string;
  field: string;
  duration: string;
  description?: string;
  gpa?: string;
}
