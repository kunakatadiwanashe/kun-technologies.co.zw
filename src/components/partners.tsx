import React from 'react';
import Image from 'next/image';
import AnimatedSection from "@/components/AnimatedSection";


import logo3Fit from "@/assets/images/3fit.png"; 

const Partners = () => {
  const partners = [
    { name: "3FIT Design & Print House", logo: logo3Fit },
    { name: "TaxCapital", logo: logo3Fit }, // Swap with actual imports later
    { name: "Vic Falls Panthers", logo: logo3Fit },
    { name: "Brand Four", logo: logo3Fit },
    { name: "Brand Five", logo: logo3Fit },
  ];

  return (
    <section className="py-16 border-y border-border/50 bg-muted/30">
      <div className="container-max px-4 mx-auto">
        <AnimatedSection className="text-center mb-12">
          <p className="text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-[0.3em]">
            Trusted by Industry Leaders in Zimbabwe
          </p>
        </AnimatedSection>
        
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
          {partners.map((partner, i) => (
            <AnimatedSection key={partner.name} delay={i * 100}>
              <div className="relative h-[200px] w-[200px] bg-slate-600 md:w-40 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 ease-in-out flex items-center justify-center">
                {partner.logo ? (
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain object-center"
                  />
                ) : (
                  <span className="text-lg font-bold text-foreground/40">{partner.name}</span>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;