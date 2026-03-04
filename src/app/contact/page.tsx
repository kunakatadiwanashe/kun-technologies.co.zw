"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AnimatedSection from "@/components/AnimatedSection";
import { toast } from "sonner";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you within 24 hours.");
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container-max">
          <AnimatedSection className="max-w-3xl">
            <p className="text-primary font-medium mb-2">Contact Us</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Let&apos;s Build Something <span className="gradient-text">Amazing Together</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Ready to start your project? Get in touch and we&apos;ll respond within 24 hours.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding !pt-0">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Info */}
            <div className="space-y-6">
              <AnimatedSection>
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <Mail className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold">Email</h3>
                  </div>
                  <a href="mailto:info@kuntech.co.zw" className="text-muted-foreground hover:text-primary transition-colors text-sm">info@kuntechnologies.co.zw</a>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={80}>
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <Phone className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold">Phone</h3>
                  </div>
                  <a href="tel:+263779968190" className="text-muted-foreground hover:text-primary transition-colors text-sm">+263 779 968 190</a> <br />
                   <a href="tel:+263718998415" className="text-muted-foreground hover:text-primary transition-colors text-sm">+263 718 998 415</a>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={160}>
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold">Location</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">Victoria Falls, Zimbabwe</p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={240}>
                <a
                  href="https://wa.me/263779968190"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-6 rounded-2xl bg-accent/10 border border-accent/20 hover:bg-accent/20 transition-colors"
                >
                  <MessageCircle className="w-6 h-6 text-accent" />
                  <div>
                    <div className="font-semibold text-sm">Chat on WhatsApp</div>
                    <div className="text-xs text-muted-foreground">Quick responses, anytime</div>
                  </div>
                </a>
              </AnimatedSection>

              {/* Map */}
              <AnimatedSection delay={320}>
                <div className="rounded-2xl overflow-hidden border border-border aspect-[4/3]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d821.9195828379932!2d25.81083273749634!3d-17.950270155854014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x194fe5b1cabfec1b%3A0x9ee76e1fdb35396!2sKun%20Technologies!5e0!3m2!1sen!2szw!4v1772626392442!5m2!1sen!2szw"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="KunTech Location - Victoria Falls, Zimbabwe"
                  />
                </div>
              </AnimatedSection>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-card border border-border space-y-6">
                  <h2 className="font-heading text-2xl font-bold mb-2">Send Us a Message</h2>
                  <p className="text-muted-foreground text-sm mb-6">Fill out the form below and we&apos;ll get back to you shortly.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Full Name *</label>
                      <Input required placeholder="John Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-xl" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email *</label>
                      <Input required type="email" placeholder="john@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="rounded-xl" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Phone</label>
                      <Input placeholder="+263 77 000 0000" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="rounded-xl" />
                    </div>
                    <div>
                      <label htmlFor="service-select" className="text-sm font-medium mb-2 block">Service Interested In</label>
                      <select
                        id="service-select"
                        title="Select a service"
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Select a service</option>
                        <option>Web Development</option>
                        <option>E-commerce Solutions</option>
                        <option>UI/UX Design</option>
                        <option>Branding & Graphics</option>
                        <option>IT Support & Repairs</option>
                        <option>Photography</option>
                        <option>Custom Software</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Message *</label>
                    <Textarea required placeholder="Tell us about your project..." rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="rounded-xl" />
                  </div>

                  <Button type="submit" size="lg" disabled={loading} className="rounded-xl w-full md:w-auto text-base h-12">
                    {loading ? "Sending..." : <><Send className="w-4 h-4 mr-2" /> Send Message</>}
                  </Button>
                </form>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
