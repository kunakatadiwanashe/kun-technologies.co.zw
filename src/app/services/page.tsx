"use client";

import Link from "next/link";
import { Globe, ShoppingCart, Palette, Brush, Wrench, Camera, Code, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import { services } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-7 h-7" />,
  ShoppingCart: <ShoppingCart className="w-7 h-7" />,
  Palette: <Palette className="w-7 h-7" />,
  Brush: <Brush className="w-7 h-7" />,
  Wrench: <Wrench className="w-7 h-7" />,
  Camera: <Camera className="w-7 h-7" />,
  Code: <Code className="w-7 h-7" />,
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container-max">
          <AnimatedSection className="max-w-3xl">
            <p className="text-primary font-medium mb-2">Our Services</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Comprehensive Digital Solutions for <span className="gradient-text">Every Need</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              From web development to IT support, we offer a full suite of digital services to help your business thrive in the modern economy.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Detail */}
      <section className="section-padding !pt-8">
        <div className="container-max space-y-16">
          {services.map((service, i) => (
            <AnimatedSection key={service.id}>
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}>
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                    {iconMap[service.icon]}
                  </div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{service.title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Key Benefits</h4>
                    <ul className="space-y-2">
                      {service.benefits.map((b, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-accent flex-shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((t) => (
                        <span key={t} className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">{t}</span>
                      ))}
                    </div>
                  </div>

                  <Button asChild className="rounded-xl">
                    <Link href="/contact">
                      Get Started <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>

                <div className={`${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-border flex items-center justify-center">
                    <div className="text-primary/20">{iconMap[service.icon] && <div className="scale-[6]">{iconMap[service.icon]}</div>}</div>
                  </div>
                </div>
              </div>
              {i < services.length - 1 && <div className="border-t border-border mt-16" />}
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-max">
          <AnimatedSection>
            <div className="gradient-primary rounded-3xl p-10 md:p-16 text-center">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Need a Custom Solution?</h2>
              <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
                Every business is unique. Let&apos;s discuss your specific needs and create a tailored solution.
              </p>
              <Button size="lg" variant="secondary" asChild className="rounded-xl text-base h-12">
                <Link href="/contact">Request a Free Consultation</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

