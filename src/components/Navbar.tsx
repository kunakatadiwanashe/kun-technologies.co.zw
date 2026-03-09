"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "@/assets/images/logo2.png";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Blog", path: "/blog" },
  { label: "Meet The Team", path: "/team" }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setIsOpen(false), [pathname]);

  if (!mounted) return null;

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
        ? "py-3 bg-background/80 backdrop-blur-md border-b border-border shadow-sm" 
        : "py-5 bg-transparent"
      }`}
    >
      <div className="container-max flex items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo Section */}
        <Link href="/" className="group flex items-center gap-3 transition-transform active:scale-95">
          <div className="relative w-8 h-10 md:w-[7rem] md:h-[5rem] flex items-center justify-center">
            <Image
              src={logo}
              alt="KunTech Logo"
              className="object-cover transition-all duration-300 group-hover:rotate-3 rounded-sm"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center bg-muted/50 border border-border/40 rounded-full px-2 py-1 shadow-inner">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                  isActive 
                  ? "text-primary-foreground bg-primary shadow-md"
                  : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Actions (Theme & CTA) */}
        <div className="hidden md:flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            {theme === "dark" ? <Sun className="w-[1.2rem] h-[1.2rem]" /> : <Moon className="w-[1.2rem] h-[1.2rem]" />}
          </Button>
          <div className="h-6 w-[1px] bg-border mx-2" />
          {/* Show Admin link if user is logged in */}
          {user ? (
            <Button asChild className="rounded-full px-6" variant="default">
              <Link href="/contact">Get In Touch</Link>
            </Button>
          ) : (
            <Button asChild className="rounded-full px-6 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95">
              <Link href="/contact">Get a Quote</Link>
            </Button>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setIsOpen(!isOpen)} 
            className="rounded-xl border-border/40 bg-background/50 backdrop-blur-sm"
          >
            {isOpen ? <X className="w-6 h-6 text-primary" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible"
        }`}
      >
        <div className="px-6 py-8 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-lg font-semibold transition-colors ${
                pathname === link.path ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <hr className="border-border/50 my-2" />
          {user ? (
            <Button asChild size="lg" className="w-full rounded-xl">
              <Link href="/admin">Dashboard</Link>
            </Button>
          ) : (
            <Button asChild size="lg" className="w-full rounded-xl">
              <Link href="/contact">Get a Quote</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

