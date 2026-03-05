"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Type, 
  Link as LinkIcon, 
  FileText, 
  Tag, 
  User, 
  Calendar, 
  Clock, 
  Image as ImageIcon 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useBlogs, BlogPost } from "@/hooks/use-blogs";
import { Separator } from "@/components/ui/separator";

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  category: z.string().min(1, "Category is required"),
  author: z.string().optional(),
  authorRole: z.string().optional(),
  date: z.string().optional(),
  readTime: z.string().optional(),
  featured: z.boolean().optional(),
  image: z.string().optional(),
  tags: z.string().optional(),
});

type BlogFormData = z.infer<typeof blogSchema>;

const categories = [
  "Web Development",
  "SEO",
  "E-commerce",
  "Design",
  "Digital Transformation",
  "Case Studies",
];

interface BlogFormProps {
  post: BlogPost | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function BlogForm({ post, onSuccess, onCancel }: BlogFormProps) {
  const { createPost, updatePost } = useBlogs();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      excerpt: post?.excerpt || "",
      content: post?.content || "",
      category: post?.category || "",
      author: post?.author || "KunTech Team",
      authorRole: post?.authorRole || "Editor",
      date: post?.date || new Date().toISOString().split("T")[0],
      readTime: post?.readTime || "5 min",
      featured: post?.featured || false,
      image: post?.image || "",
      tags: post?.tags?.join(", ") || "",
    },
  });

  const featured = watch("featured");

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setValue("title", title);
    if (!post) setValue("slug", generateSlug(title));
  };

  const onSubmit = async (data: BlogFormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const tags = data.tags ? data.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
      const postData = { ...data, tags };
      if (post) await updatePost(post.slug, postData);
      else await createPost(postData);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl mx-auto space-y-8 pb-10 pt-[9rem]">
      {error && (
        <div className="p-4 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center gap-2">
                <Type className="w-4 h-4 text-muted-foreground" /> Title
              </Label>
              <Input
                id="title"
                className="text-lg font-semibold"
                {...register("title")}
                onChange={handleTitleChange}
                placeholder="The Future of Web Development"
              />
              {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug" className="flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-muted-foreground" /> URL Slug
              </Label>
              <div className="flex items-center group">
                <span className="px-3 py-2 bg-muted border border-r-0 rounded-l-md text-sm text-muted-foreground">
                  /blog/
                </span>
                <Input
                  id="slug"
                  className="rounded-l-none"
                  {...register("slug")}
                  placeholder="future-web-dev"
                />
              </div>
              {errors.slug && <p className="text-xs text-destructive">{errors.slug.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt" className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" /> Short Excerpt
              </Label>
              <Textarea
                id="excerpt"
                className="resize-none"
                {...register("excerpt")}
                placeholder="Provide a brief summary for the preview card..."
                rows={3}
              />
              {errors.excerpt && <p className="text-xs text-destructive">{errors.excerpt.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="content" className="font-semibold">Article Body</Label>
              <Textarea
                id="content"
                className="min-h-[400px] font-mono text-sm leading-relaxed"
                {...register("content")}
                placeholder="Markdown or HTML content goes here..."
              />
              {errors.content && <p className="text-xs text-destructive">{errors.content.message}</p>}
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-6 border rounded-xl bg-card space-y-6">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Publishing Details</h3>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={watch("category")} onValueChange={(v) => setValue("category", v)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image" className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> Cover Image URL
              </Label>
              <Input id="image" {...register("image")} placeholder="https://..." />
            </div>

            <Separator />

            <div className="space-y-4"><div className="space-y-2">
                <Label htmlFor="author" className="flex items-center gap-2"><User className="w-4 h-4" /> Author</Label>
                <Input id="author" {...register("author")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Publish Date</Label>
                <Input id="date" {...register("date")} type="date" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="readTime" className="flex items-center gap-2"><Clock className="w-4 h-4" /> Read Time</Label>
                <Input id="readTime" {...register("readTime")} placeholder="5 min" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags" className="flex items-center gap-2"><Tag className="w-4 h-4" /> Tags</Label>
                <Input id="tags" {...register("tags")} placeholder="SEO, React..." />
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
              <Label htmlFor="featured" className="cursor-pointer">Featured Post</Label>
              <Switch
                id="featured"
                checked={featured}
                onCheckedChange={(checked) => setValue("featured", checked)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Saving changes..." : post ? "Update Publication" : "Publish Post"}
            </Button>
            <Button type="button" variant="ghost" className="w-full" onClick={onCancel}>
              Discard Draft
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}