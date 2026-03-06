
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  technologies: string[];
  slug: string;
  client: string;
  results: string[];
}

export default function PortfolioPage() {
  const [active, setActive] = useState("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container-max">
          <AnimatedSection className="max-w-3xl">
            <p className="text-primary font-medium mb-2">Portfolio</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Projects That <span className="gradient-text">Deliver Results</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Explore our portfolio of successful projects across various industries in Zimbabwe and beyond.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding !pt-0">
        <div className="container-max">
          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${active === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Loading projects...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No projects found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project, i) => (
                <AnimatedSection key={project.id} delay={i * 80}>
                  <div className="group rounded-2xl overflow-hidden bg-card border border-border hover-lift h-full flex flex-col">
                    <div className="aspect-video overflow-hidden relative">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full w-fit">{project.category}</span>
                      <h3 className="font-heading font-semibold text-lg mt-3 mb-2">{project.title}</h3>
                      <p className="text-muted-foreground text-sm flex-1">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {project.technologies.slice(0, 4).map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded bg-muted text-muted-foreground text-xs">{t}</span>
                        ))}
                      </div>
                      {project.results && project.results.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <p className="text-xs text-muted-foreground mb-2">Key Results:</p>
                          <ul className="space-y-1">
                            {project.results.map((r, j) => (
                              <li key={j} className="text-xs text-muted-foreground">• {r}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-muted/50">
        <div className="container-max text-center">
          <AnimatedSection>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Have a Project in Mind?</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Let&apos;s bring your vision to life. Contact us to discuss your project requirements.
            </p>
            <Button size="lg" asChild className="rounded-xl text-base h-12">
              <Link href="/contact">Start Your Project</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

