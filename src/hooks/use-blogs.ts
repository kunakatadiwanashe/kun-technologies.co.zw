import { useState, useEffect, useCallback } from "react";

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
  createdAt?: string;
  updatedAt?: string;
}

export function useBlogs() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/blogs");
      if (!response.ok) throw new Error("Failed to fetch posts");
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  const getPost = useCallback(async (slug: string): Promise<BlogPost | null> => {
    try {
      const response = await fetch(`/api/blogs/${slug}`);
      if (!response.ok) return null;
      return await response.json();
    } catch {
      return null;
    }
  }, []);

  const createPost = useCallback(async (post: Partial<BlogPost>): Promise<BlogPost | null> => {
    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create post");
      }
      const data = await response.json();
      setPosts((prev) => [data, ...prev]);
      return data;
    } catch (err) {
      throw err;
    }
  }, []);

  const updatePost = useCallback(async (slug: string, post: Partial<BlogPost>): Promise<BlogPost | null> => {
    try {
      const response = await fetch(`/api/blogs/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update post");
      }
      const data = await response.json();
      setPosts((prev) => prev.map((p) => (p.slug === slug ? data : p)));
      return data;
    } catch (err) {
      throw err;
    }
  }, []);

  const deletePost = useCallback(async (slug: string): Promise<void> => {
    try {
      const response = await fetch(`/api/blogs/${slug}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete post");
      setPosts((prev) => prev.filter((p) => p.slug !== slug));
    } catch (err) {
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    loading,
    error,
    fetchPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
  };
}

