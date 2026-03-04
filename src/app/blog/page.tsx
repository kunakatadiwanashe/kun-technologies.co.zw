"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import AnimatedSection from "@/components/AnimatedSection";
import { blogPosts, blogCategories } from "@/lib/data";

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return blogPosts.filter((p) => {
      const matchCat = category === "All" || p.category === category;
      const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, category]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);
  const featured = blogPosts.filter((p) => p.featured);

  return (
    <>
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container-max">
          <AnimatedSection className="max-w-3xl">
            <p className="text-primary font-medium mb-2">Blog</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Insights & <span className="gradient-text">Resources</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Stay up to date with the latest trends in technology, digital marketing, and business growth.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured */}
      {category === "All" && !search && page === 1 && featured.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="container-max">
            <AnimatedSection>
              <Link href={`/blog/${featured[0].slug}`} className="group block rounded-2xl overflow-hidden bg-card border border-border hover-lift">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="aspect-video md:aspect-auto overflow-hidden">
                    <img src={featured[0].image} alt={featured[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <span className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full w-fit mb-4">Featured</span>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors">{featured[0].title}</h2>
                    <p className="text-muted-foreground mb-4">{featured[0].excerpt}</p>
                    <div className="text-sm text-muted-foreground">{featured[0].date} · {featured[0].readTime} read</div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          </div>
        </section>
      )}

      <section className="section-padding !pt-0">
        <div className="container-max">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="pl-10 rounded-xl"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {blogCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setCategory(cat); setPage(1); }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${category === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Posts */}
          {paginated.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">No articles found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginated.map((post, i) => (
                <AnimatedSection key={post.id} delay={i * 80}>
                  <Link href={`/blog/${post.slug}`} className="block group rounded-2xl overflow-hidden bg-card border border-border hover-lift h-full">
                    <div className="aspect-video overflow-hidden">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-medium text-primary">{post.category}</span>
                      <h3 className="font-heading font-semibold mt-2 mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt}</p>
                      <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{post.date}</span>
                        <span>·</span>
                        <span>{post.readTime} read</span>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-10 h-10 rounded-xl text-sm font-medium transition-colors ${page === i + 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

