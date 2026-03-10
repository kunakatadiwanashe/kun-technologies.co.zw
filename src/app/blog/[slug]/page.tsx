"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { BlogPost, useBlogs } from "@/hooks/use-blogs";

export default function BlogPostPage() {
  const params = useParams();
  const { getPost, posts } = useBlogs();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [shareUrl, setShareUrl] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get the URL on client side for sharing
    setShareUrl(window.location.href);
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      if (params?.slug) {
        setLoading(true);
        const fetchedPost = await getPost(params.slug as string);
        setPost(fetchedPost);
        setLoading(false);
      }
    };
    fetchPost();
  }, [params?.slug, getPost]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  // Get related posts (excluding current)
  const relatedPosts = posts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            image: post.image,
            author: { "@type": "Organization", name: post.author },
            datePublished: post.date,
            description: post.excerpt,
          }),
        }}
      />

      <article className="pt-32 pb-16">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>

            <div className="max-w-3xl mx-auto">
              <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{post.category}</span>
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">{post.title}</h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
                <span className="flex items-center gap-1"><User className="w-4 h-4" /> {post.author}</span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.readTime} read</span>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden mb-10">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="max-w-3xl mx-auto">
              <div
                className="prose prose-lg dark:prose-invert max-w-none [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4 [&_strong]:text-foreground"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-border">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm">{tag}</span>
                ))}
              </div>

              {/* Share */}
              <div className="flex items-center gap-4 mt-8 pt-8 border-t border-border">
                <span className="flex items-center gap-2 text-sm font-medium"><Share2 className="w-4 h-4" /> Share:</span>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-muted transition-colors"><Facebook className="w-5 h-5" /></a>
                <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${post.title}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-muted transition-colors"><Twitter className="w-5 h-5" /></a>
                <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${post.title}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-muted transition-colors"><Linkedin className="w-5 h-5" /></a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="section-padding bg-muted/50">
          <div className="container-max">
            <h2 className="font-heading text-2xl font-bold mb-8">More Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="block group rounded-2xl overflow-hidden bg-card border border-border hover-lift">
                  <div className="aspect-video overflow-hidden">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-medium text-primary">{p.category}</span>
                    <h3 className="font-heading font-semibold mt-2 group-hover:text-primary transition-colors line-clamp-2">{p.title}</h3>
                    <div className="mt-2 text-xs text-muted-foreground">{p.date} · {p.readTime}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

