"use client";

import { BlogForm } from "@/components/blog-form";
import { BlogPost } from "@/hooks/use-blogs";

interface BlogFormProps {
  post: BlogPost | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function BlogFormComponent({ post, onSuccess, onCancel }: BlogFormProps) {
  return <BlogForm post={post} onSuccess={onSuccess} onCancel={onCancel} />;
}

