"use client";

import Link from "next/link";
import { ArrowRight, Globe, ShoppingCart, Palette, Brush, Wrench, Camera, Code, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import { services, projects, testimonials, blogPosts } from "@/lib/data";
import Partners from "@/components/partners";



const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-6 h-6" />,
  ShoppingCart: <ShoppingCart className="w-6 h-6" />,
  Palette: <Palette className="w-6 h-6" />,
  Brush: <Brush className="w-6 h-6" />,
  Wrench: <Wrench className="w-6 h-6" />,
  Camera: <Camera className="w-6 h-6" />,
  Code: <Code className="w-6 h-6" />,
};

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
  { value: "5+", label: "Years Experience" },
  { value: "99%", label: "Client Satisfaction" },
];

export default function Home() {
  return (
<>







      <section className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          backgroundImage: "url('/bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "right"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/70" />




        <div className="container relative z-10 ">
          <div className="">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-8 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Zimbabwean Digital Solutions Company
              </div>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <h1  className="font-heading text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-6">Kun Technologies</h1>
              <h2 className="font-heading text-5xl sm:text-6xl lg:text-5xl font-bold tracking-tight leading-[1.05] mb-6 flex flex-col">
                Building Smart Digital Solutions for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  Modern Businesses
                </span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
                We design and develop innovative, reliable digital solutions that help
                businesses in Zimbabwe and beyond thrive in the modern economy.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild className="text-base px-8 h-14 rounded-2xl shadow-lg shadow-primary/20">
                  <Link href="/services">
                    View Our Services <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-base px-8 h-14 rounded-2xl backdrop-blur-sm">
                  <Link href="/contact">Request a Quote</Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>






















      {/* Stats */}
      <section className="relative -mt-8 z-20 px-4 sm:px-6 lg:px-8">
        <div className="container-max">
          <div className="glass rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <AnimatedSection key={i} delay={i * 100} className="text-center">
                <div className="font-heading text-3xl md:text-4xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* About Intro */}
      <section className="section-padding">
        <div className="container-max">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Your Trusted Technology Partner
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              KunTech (Kun Technologies) is a Zimbabwean digital solutions company dedicated to helping businesses succeed through technology. We combine technical expertise with creative thinking to deliver solutions that make a real impact.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-muted/50">
        <div className="container-max">
          <AnimatedSection className="text-center mb-16">
            <p className="text-primary font-medium mb-2">What We Do</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">Our Services</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((service, i) => (
              <AnimatedSection key={service.id} delay={i * 80}>
                <Link
                  href={`/services`}
                  className="block p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover-lift group h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {iconMap[service.icon]}
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.description.slice(0, 120)}...</p>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-10">
            <Button variant="outline" asChild className="rounded-xl">
              <Link href="/services">View All Services <ChevronRight className="w-4 h-4" /></Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-padding">
        <div className="container-max">
          <AnimatedSection className="text-center mb-16">
            <p className="text-primary font-medium mb-2">Our Work</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">Featured Projects</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((project, i) => (
              <AnimatedSection key={project.id} delay={i * 100}>
                <div className="group rounded-2xl overflow-hidden bg-card border border-border hover-lift">
                  <div className="aspect-video overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{project.category}</span>
                    <h3 className="font-heading font-semibold text-lg mt-3 mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">{project.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-10">
            <Button variant="outline" asChild className="rounded-xl">
              <Link href="/portfolio">View Full Portfolio <ChevronRight className="w-4 h-4" /></Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-muted/50">
        <div className="container-max">
          <AnimatedSection className="text-center mb-16">
            <p className="text-primary font-medium mb-2">Testimonials</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">What Our Clients Say</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.id} delay={i * 100}>
                <div className="p-6 rounded-2xl bg-card border border-border h-full">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed italic">"{t.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">{t.avatar}</div>
                    <div>
                      <div className="font-semibold text-sm">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}, {t.company}</div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="section-padding">
        <div className="container-max">
          <AnimatedSection className="text-center mb-16">
            <p className="text-primary font-medium mb-2">Latest Insights</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">From Our Blog</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post, i) => (
              <AnimatedSection key={post.id} delay={i * 100}>
                <Link href={`/blog/${post.slug}`} className="block group rounded-2xl overflow-hidden bg-card border border-border hover-lift h-full">
                  <div className="aspect-video overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-medium text-primary">{post.category}</span>
                    <h3 className="font-heading font-semibold mt-2 mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt}</p>
                    <div className="mt-4 text-xs text-muted-foreground">{post.date} · {post.readTime} read</div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-10">
            <Button variant="outline" asChild className="rounded-xl">
              <Link href="/blog">Read More Articles <ChevronRight className="w-4 h-4" /></Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      <Partners />

      {/* CTA Banner */}
      <section className="section-padding">
        <div className="container-max">
          <AnimatedSection>
            <div className="gradient-primary rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: "radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
                backgroundSize: "40px 40px"
              }} />
              <div className="relative z-10">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Ready to Transform Your Business?</h2>
                <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">Let's discuss how KunTech can help you achieve your digital goals. Get a free consultation today.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" asChild className="rounded-xl text-base h-12">
                    <Link href="/contact">Get Started Today</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="rounded-xl text-base h-12 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                    <a href="https://wa.me/263771234567" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

