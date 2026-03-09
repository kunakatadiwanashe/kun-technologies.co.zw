"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  Image as ImageIcon,
  X
} from "lucide-react";
import { toast } from "sonner";

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
  post?: BlogPost | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function BlogForm({ post = null, onSuccess, onCancel }: BlogFormProps) {
  const router = useRouter();
  const { createPost, updatePost } = useBlogs();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string>(post?.image || "");

  // Determine if used as page or component
  const isPage = !onSuccess && !onCancel;

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

  const featured = watch("featured") ?? false;

  // Sync uploaded image with form
  if (uploadedImage && watch("image") !== uploadedImage) {
    setValue("image", uploadedImage);
  }

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      setUploadedImage(data.url);
      setValue("image", data.url);
      
      toast.success("Image uploaded successfully");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setUploadedImage("");
    setValue("image", "");
  };

  const handleSuccess = () => {
    if (onSuccess) {
      onSuccess();
    } else {
      toast.success(post ? "Post updated successfully" : "Post created successfully");
      router.push("/admin/blogs");
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.push("/admin/blogs");
    }
  };

  const onSubmit = async (data: BlogFormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const tags = data.tags ? data.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
      const postData = { ...data, tags };
      if (post) await updatePost(post.slug, postData);
      else await createPost(postData);
      handleSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const paddingTop = isPage ? "pt-[9rem]" : "";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`max-w-5xl mx-auto space-y-8 pb-10 ${paddingTop}`}>
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
                <ImageIcon className="w-4 h-4" /> Cover Image
              </Label>
              
              {/* Image Preview */}
              {uploadedImage && (
                <div className="relative mb-2">
                  <img 
                    src={uploadedImage} 
                    alt="Cover preview" 
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6"
                    onClick={removeImage}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
              
              {/* File Upload Input */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="cursor-pointer"
                    disabled={isUploading}
                  />
                </div>
                {isUploading && (
                  <div className="text-sm text-muted-foreground">Uploading...</div>
                )}
              </div>
              
              {/* URL Input */}
              <div className="space-y-1">
                <Label htmlFor="imageUrl" className="text-xs text-muted-foreground">Or enter URL</Label>
                <Input 
                  id="imageUrl" 
                  placeholder="https://..."
                  value={uploadedImage}
                  onChange={(e) => {
                    setUploadedImage(e.target.value);
                    setValue("image", e.target.value);
                  }}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="space-y-2">
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
            <Button type="button" variant="ghost" className="w-full" onClick={handleCancel}>
              {isPage ? "Back to Blogs" : "Discard Draft"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

