"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

export default function AdminSignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  // Trusted email providers that are known to work reliably
  const TRUSTED_EMAIL_DOMAINS = [
    'gmail.com', 'googlemail.com',
    'outlook.com', 'hotmail.com', 'live.com', 'msn.com',
    'yahoo.com', 'yahoo.co.uk', 'yahoo.com.au',
    'icloud.com', 'me.com', 'mac.com',
    'protonmail.com', 'proton.me',
    'zoho.com',
    'mail.com', 'email.com', 'fastmail.com',
    'aol.com',
    'yandex.com', 'yandex.ru',
  ];

  // Check if email domain is likely to be valid
  const isEmailDomainValid = (emailAddress: string): { valid: boolean; reason?: string } => {
    const domain = emailAddress.split('@')[1]?.toLowerCase();
    
    if (!domain) {
      return { valid: false, reason: "Invalid email format" };
    }

    // Check if it's a trusted provider
    if (TRUSTED_EMAIL_DOMAINS.includes(domain)) {
      return { valid: true };
    }

    // For unknown domains, do basic checks
    // Check for common issues that make domains invalid
    if (domain.includes('..')) {
      return { valid: false, reason: "Invalid email format" };
    }

    // Check for very short domains or unusual TLDs that might be problematic
    const domainParts = domain.split('.');
    if (domainParts.length < 2) {
      return { valid: false, reason: "Invalid domain format" };
    }

    // The domain is not in our trusted list, but we'll let Supabase handle it
    // and provide a warning instead of blocking
    return { valid: true };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate email format first
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Signup Failed",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Validate email domain
    const domainCheck = isEmailDomainValid(email);
    if (!domainCheck.valid) {
      toast({
        title: "Signup Failed",
        description: domainCheck.reason || "Invalid email domain",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Validate passwords match
    if (password !== confirmPassword) {
      toast({
        title: "Signup Failed",
        description: "Passwords do not match",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Validate password length
    if (password.length < 6) {
      toast({
        title: "Signup Failed",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const { error } = await signUp(email, password);

    if (error) {
      toast({
        title: "Signup Failed",
        description: error.message || "Could not create account",
        variant: "destructive",
      });
      setLoading(false);
    } else {
      toast({
        title: "Signup Successful",
        description: "Account created! You can now log in.",
      });
      router.push("/admin/login");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Admin Signup</CardTitle>
          <CardDescription>
            Create an admin account to access the panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link href="/admin/login" className="text-primary hover:text-primary/80">
              Sign In
            </Link>
          </div>
          <div className="mt-2 text-center text-sm">
            <Link href="/" className="text-muted-foreground hover:text-primary">
              ← Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

