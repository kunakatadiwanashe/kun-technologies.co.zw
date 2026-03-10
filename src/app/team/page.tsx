import React from "react";
import { Linkedin, ArrowUpRight, Plus, Terminal, PenTool, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

import ceoImage from "@/assets/images/3fit.png";

const leadership = [
  { 
    name: "Evangeline Kunaka", 
    role: "CEO", 
    image: ceoImage, 
    initials: "CE",
    linkedin: "https://linkedin.com/in/username" 
  },
  { 
    name: "Tadiwanashe Kunaka", 
    role: "CTO", 
    image: "/kun.JPG", 
    initials: "CT",
    linkedin: "https://linkedin.com/in/username" 
  },
  { 
    name: "Executive Name", 
    role: "CFO", 
    image: "/tk.png", 
    initials: "CF",
    linkedin: "https://linkedin.com/in/username" 
  },
];

const leads = [
  { 
    name: "Staff Name", 
    role: "Marketing & Comms", 
    image: "/tk.png",
    icon: <BarChart3 className="w-4 h-4" />,
    linkedin: "https://linkedin.com/in/username"
  },
  { 
    name: "Staff Name", 
    role: "Lead Designer", 
    image: "/tk.png",
    icon: <PenTool className="w-4 h-4" />,
    linkedin: "https://linkedin.com/in/username"
  },
    { 
    name: "Staff Name", 
    role: "Lead Designer", 
    image: "/tk.png",
    icon: <PenTool className="w-4 h-4" />,
    linkedin: "https://linkedin.com/in/username"
  },
];

export default function MeetTheTeam() {
  return (
    <section className="relative py-28 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-black md:pt-[180px]">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-24">
          <div className="max-w-2xl">
            <span className="text-blue-600 font-semibold tracking-widest text-xs uppercase">Our People</span>
            <h2 className="mt-4 text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
              The team building <br />
              <span className="text-blue-600">digital infrastructure.</span>
            </h2>
          </div>
          <p className="max-w-sm text-slate-500 text-sm leading-relaxed border-l border-slate-200 dark:border-slate-800 pl-6">
            A collective of engineers, designers, and strategists building scalable technology solutions across Africa.
          </p>
        </div>

        {/* Leadership Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-28">
          {leadership.map((member, i) => (
            <div key={i} className="group p-8 rounded-3xl bg-white/70 dark:bg-slate-900/60 backdrop-blur border border-slate-200 dark:border-slate-800 hover:shadow-2xl transition-all duration-500">
              <div className="relative mb-8 flex justify-between items-start">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-700 shadow-sm group-hover:scale-105 transition-transform duration-500">
                  {member.image ? (
                    <Image src={member.image} alt={member.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">{member.initials}</div>
                  )}
                </div>
                
                {member.linkedin && (
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    Connect
                  </a>
                )}
              </div>

              <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{member.name}</h4>
              <p className="text-sm text-blue-600 uppercase tracking-widest font-bold">{member.role}</p>
            </div>
          ))}
        </div>

        {/* Leads Grid */}
        <div className="grid md:grid-cols-3 gap-12 mb-32">
          {leads.map((lead, i) => (
            <div key={i} className="flex gap-8 items-center group p-4 rounded-2xl hover:bg-white dark:hover:bg-slate-900/40 transition-all duration-300">
              <div className="relative w-32 h-40 rounded-2xl bg-slate-200 dark:bg-slate-800 overflow-hidden shrink-0 shadow-inner">
                {lead.image && (
                  <Image
                    src={lead.image}
                    alt={lead.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  {lead.icon}
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Department Lead</span>
                </div>
                <h5 className="text-xl font-bold text-slate-900 dark:text-white leading-tight mb-1">{lead.name}</h5>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">{lead.role}</p>
                
                {lead.linkedin && (
                  <a 
                    href={lead.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    Connect
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Collective and CTA sections remain the same... */}
      </div>
    </section>
  );
}