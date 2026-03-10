"use client";

import Link from "next/link";
import { Target, Eye, Lightbulb, Award, Shield, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import Image from "next/image";

const values = [
  { icon: <Lightbulb className="w-6 h-6" />, title: "Innovation", desc: "We embrace new technologies and creative approaches to solve complex problems." },
  { icon: <Award className="w-6 h-6" />, title: "Excellence", desc: "We deliver nothing less than exceptional quality in every project we undertake." },
  { icon: <Shield className="w-6 h-6" />, title: "Integrity", desc: "Transparency, honesty, and ethical practices are the foundation of our business." },
  { icon: <Users className="w-6 h-6" />, title: "Reliability", desc: "We deliver on our promises, on time, and within budget—every single time." },
];

const reasons = [
  "Deep understanding of the Zimbabwean market and its unique challenges",
  "End-to-end solutions from design to development to deployment",
  "Modern tech stack ensuring fast, scalable, and secure solutions",
  "Dedicated support and maintenance after project delivery",
  "Competitive pricing without compromising quality",
  "Proven track record with 50+ successful projects delivered",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container-max">
          <AnimatedSection className="max-w-3xl">
            <p className="text-primary font-medium mb-2">About Us</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              We&apos;re on a Mission to <span className="gradient-text">Digitize Zimbabwe</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              KunTech (Kun Technologies) is a forward-thinking digital solutions company based in Zimbabwe. We partner with businesses of all sizes to build technology that drives growth, efficiency, and innovation.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-muted/50">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection>
              <div className="p-8 rounded-2xl bg-card border border-border h-full">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Target className="w-6 h-6" />
                </div>
                <h2 className="font-heading text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To empower Zimbabwean businesses with world-class digital solutions that are accessible, affordable, and impactful. We bridge the gap between technology and business success.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={100}>
              <div className="p-8 rounded-2xl bg-card border border-border h-full">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4">
                  <Eye className="w-6 h-6" />
                </div>
                <h2 className="font-heading text-2xl font-bold mb-4">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To be the leading digital solutions provider in Zimbabwe, recognized for innovation, quality, and our commitment to transforming businesses through technology.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="relative aspect-square max-w-md rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                <Image alt="Founder" src="/tk.png" fill className="object-cover" />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={100}>
              <p className="text-primary font-medium mb-2">Founder & CEO</p>
              <h2 className="font-heading text-3xl font-bold mb-4">Meet the Visionary Behind KunTech</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Founded with a passion for technology and a deep understanding of the Zimbabwean business landscape, KunTech was born from the belief that every business deserves access to premium digital solutions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our founder brings years of experience in software development, design, and IT consulting, having worked with businesses across multiple industries. This diverse experience drives our ability to deliver comprehensive, tailored solutions.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-muted/50">
        <div className="container-max">
          <AnimatedSection className="text-center mb-16">
            <p className="text-primary font-medium mb-2">What Drives Us</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">Our Core Values</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <AnimatedSection key={i} delay={i * 80}>
                <div className="p-6 rounded-2xl bg-card border border-border text-center h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                    {v.icon}
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">{v.title}</h3>
                  <p className="text-muted-foreground text-sm">{v.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <p className="text-primary font-medium mb-2">Why Choose KunTech</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8">
                We Deliver Results, Not Just Projects
              </h2>
              <ul className="space-y-4">
                {reasons.map((r, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ArrowRight className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{r}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
            <AnimatedSection delay={100}>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-primary/10 text-center">
                  <div className="font-heading text-3xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground mt-1">Projects</div>
                </div>
                <div className="p-6 rounded-2xl bg-accent/10 text-center">
                  <div className="font-heading text-3xl font-bold text-accent">30+</div>
                  <div className="text-sm text-muted-foreground mt-1">Clients</div>
                </div>
                <div className="p-6 rounded-2xl bg-accent/10 text-center">
                  <div className="font-heading text-3xl font-bold text-accent">5+</div>
                  <div className="text-sm text-muted-foreground mt-1">Years</div>
                </div>
                <div className="p-6 rounded-2xl bg-primary/10 text-center">
                  <div className="font-heading text-3xl font-bold text-primary">99%</div>
                  <div className="text-sm text-muted-foreground mt-1">Satisfaction</div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-muted/50">
        <div className="container-max text-center">
          <AnimatedSection>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Ready to Work With Us?</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss your project and find the perfect solution for your business.
            </p>
            <Button size="lg" asChild className="rounded-xl text-base h-12">
              <Link href="/contact">Start a Conversation <ArrowRight className="w-5 h-5 ml-1" /></Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

