"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FileText, Folder, Star, Eye, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Types matching the database models
interface BlogPost {
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

interface Project {
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

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch blogs
        const blogsResponse = await fetch("/api/blogs");
        if (!blogsResponse.ok) throw new Error("Failed to fetch blogs");
        const blogsData = await blogsResponse.json();
        setBlogs(blogsData);

        // Fetch projects
        const projectsResponse = await fetch("/api/projects");
        if (!projectsResponse.ok) throw new Error("Failed to fetch projects");
        const projectsData = await projectsResponse.json();
        setProjects(projectsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get recent items (last 5)
  const recentBlogs = [...blogs].slice(0, 5);
  const recentProjects = [...projects].slice(0, 5);

  // Calculate statistics
  const totalBlogs = blogs.length;
  const totalProjects = projects.length;
  const featuredPosts = blogs.filter((b) => b.featured).length;

  // Get unique categories
  const blogCategories = Array.from(new Set(blogs.map((b) => b.category)));
  const projectCategories = Array.from(new Set(projects.map((p) => p.category)));

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8 pt-[4rem] md:pt-[8rem]">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse text-muted-foreground">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-8 pt-[4rem] md:pt-[8rem]">
        <div className="max-w-7xl mx-auto">
          <div className="text-red-500">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8 pt-[4rem] md:pt-[1rem]">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Overview of My content</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBlogs}</div>
              <p className="text-xs text-muted-foreground">
                {blogCategories.length} categories
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <Folder className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProjects}</div>
              <p className="text-xs text-muted-foreground">
                {projectCategories.length} categories
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Featured Posts</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{featuredPosts}</div>
              <p className="text-xs text-muted-foreground">
                {totalBlogs > 0 ? Math.round((featuredPosts / totalBlogs) * 100) : 0}% of total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Content</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBlogs + totalProjects}</div>
              <p className="text-xs text-muted-foreground">
                Blog posts + Projects
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Content Tables */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Blogs */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Blog Posts</CardTitle>
                  <CardDescription>Latest blog entries</CardDescription>
                </div>
                <Link href="/admin/blogs">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {recentBlogs.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  No blog posts yet
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentBlogs.map((blog) => (
                      <TableRow key={blog.id}>
                        <TableCell className="font-medium max-w-[150px]">
                          <div className="truncate">{blog.title}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{blog.category}</Badge>
                        </TableCell>
                        <TableCell>
                          {blog.featured && (
                            <Badge variant="default" className="bg-yellow-500">
                              <Star className="w-3 h-3 mr-1" />
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Recent Projects */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Projects</CardTitle>
                  <CardDescription>Latest project entries</CardDescription>
                </div>
                <Link href="/admin/projects">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {recentProjects.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  No projects yet
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Tech</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentProjects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium max-w-[150px]">
                          <div className="truncate">{project.title}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{project.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1 max-w-[100px]">
                            {project.technologies.slice(0, 2).map((tech, index) => (
                              <Badge key={index} variant="secondary" className="text-[10px] px-1 py-0">
                                {tech}
                              </Badge>
                            ))}
                            {project.technologies.length > 2 && (
                              <Badge variant="secondary" className="text-[10px] px-1 py-0">
                                +{project.technologies.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Category Overview */}
        <div className="grid gap-6 md:grid-cols-2 mt-6">
          {/* Blog Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Blog Categories</CardTitle>
              <CardDescription>Distribution of blog posts by category</CardDescription>
            </CardHeader>
            <CardContent>
              {blogCategories.length === 0 ? (
                <div className="text-center text-muted-foreground py-4">
                  No categories yet
                </div>
              ) : (
                <div className="space-y-2">
                  {blogCategories.map((category) => {
                    const count = blogs.filter((b) => b.category === category).length;
                    const percentage = totalBlogs > 0 ? Math.round((count / totalBlogs) * 100) : 0;
                    return (
                      <div key={category} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{category}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-8">
                            {count} ({percentage}%)
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Project Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Project Categories</CardTitle>
              <CardDescription>Distribution of projects by category</CardDescription>
            </CardHeader>
            <CardContent>
              {projectCategories.length === 0 ? (
                <div className="text-center text-muted-foreground py-4">
                  No categories yet
                </div>
              ) : (
                <div className="space-y-2">
                  {projectCategories.map((category) => {
                    const count = projects.filter((p) => p.category === category).length;
                    const percentage = totalProjects > 0 ? Math.round((count / totalProjects) * 100) : 0;
                    return (
                      <div key={category} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{category}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-8">
                            {count} ({percentage}%)
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

