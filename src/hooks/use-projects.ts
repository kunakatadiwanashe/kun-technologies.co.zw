import { useState, useEffect, useCallback } from "react";

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  image: string;
  technologies: string[];
  client: string;
  results: string[];
  createdAt?: string;
  updatedAt?: string;
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/projects");
      if (!response.ok) throw new Error("Failed to fetch projects");
      const data = await response.json();
      if (Array.isArray(data)) {
        setProjects(data);
      } else {
        console.error('Invalid projects data:', data);
        setError('Failed to load projects');
        setProjects([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  const getProject = useCallback(async (slug: string): Promise<Project | null> => {
    try {
      const response = await fetch(`/api/projects/${slug}`);
      if (!response.ok) return null;
      return await response.json();
    } catch {
      return null;
    }
  }, []);

  const createProject = useCallback(async (project: Partial<Project>): Promise<Project | null> => {
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create project");
      }
      const data = await response.json();
      setProjects((prev) => [data, ...prev]);
      return data;
    } catch (err) {
      throw err;
    }
  }, []);

  const updateProject = useCallback(async (slug: string, project: Partial<Project>): Promise<Project | null> => {
    try {
      const response = await fetch(`/api/projects/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update project");
      }
      const data = await response.json();
      setProjects((prev) => prev.map((p) => (p.slug === slug ? data : p)));
      return data;
    } catch (err) {
      throw err;
    }
  }, []);

  const deleteProject = useCallback(async (slug: string): Promise<void> => {
    try {
      const response = await fetch(`/api/projects/${slug}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete project");
      setProjects((prev) => prev.filter((p) => p.slug !== slug));
    } catch (err) {
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    loading,
    error,
    fetchProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
  };
}

