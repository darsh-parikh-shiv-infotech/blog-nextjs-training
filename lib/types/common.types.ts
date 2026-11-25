export type Blog = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  author: string;
  ownerId: string | null;
  createdAt: string;
  updatedAt: string;
  readTime: string;
  accentClass?: string;
  content: string[];
};

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
