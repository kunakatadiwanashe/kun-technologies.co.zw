"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "./supabase";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log("Initial session check:", session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Attempting sign in for:", email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error("Sign in error details:", {
          message: error.message,
          status: error.status,
          name: error.name,
        });
        
        // Provide more helpful error messages based on the error
        let enhancedError = error;
        
        if (error.message.includes("Invalid login credentials")) {
          enhancedError.message = "Invalid email or password. Please check your credentials and try again.";
        } else if (error.message.includes("Email not confirmed") || error.message.includes("User not confirmed")) {
          // Email not confirmed - user needs to check their inbox for confirmation email
          enhancedError.message = "Your email address has not been confirmed yet. Please check your inbox for the confirmation email from Supabase and click the confirmation link. If you haven't received it, check your spam folder or request a new confirmation email.";
        } else if (error.status === 400) {
          enhancedError.message = "Authentication failed. Please verify your credentials and try again. If the problem persists, check that your account exists in Supabase.";
        }
        
        return { error: enhancedError as Error | null };
      }
      
      console.log("Sign in successful, user:", data.user?.email);
      
      // Wait for the session to be established and auth state to update
      // This ensures the client-side user state is properly set before returning
      await new Promise((resolve) => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
          if (event === 'SIGNED_IN' && session) {
            console.log("Auth state confirmed - signed in:", session.user?.email);
            subscription.unsubscribe();
            resolve(true);
          }
        });
        
        // Timeout fallback after 3 seconds
        setTimeout(() => {
          subscription.unsubscribe();
          resolve(true);
        }, 3000);
      });
      
      // Force a session refresh to ensure cookies are set
      const { data: { session: newSession } } = await supabase.auth.getSession();
      console.log("Session refreshed, user:", newSession?.user?.email);
      
      return { error: null };
    } catch (error) {
      console.error("Sign in exception:", error);
      return { error: error as Error };
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      console.log("Attempting sign up for:", email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) {
        console.error("Sign up error details:", {
          message: error.message,
          status: error.status,
          name: error.name,
        });

        // Provide more helpful error messages based on the specific error
        let enhancedError = error;
        
        if (error.status === 429 || error.message.includes("rate limit")) {
          // Rate limit exceeded - user needs to wait before trying again
          enhancedError.message = "Too many signup attempts. Please wait a few minutes before trying again.";
        } else if (error.message.includes("invalid") || error.message.includes("Invalid")) {
          // This is the specific error we're handling - email domain is not trusted
          enhancedError.message = `The email domain "${email.split('@')[1]}" is not accepted by Supabase. Please use a trusted email provider like Gmail, Outlook, Yahoo, or iCloud.`;
        } else if (error.message.includes("already been registered") || error.message.includes("already exists")) {
          enhancedError.message = "An account with this email already exists. Please try logging in instead.";
        } else if (error.message.includes("Password")) {
          enhancedError.message = "Password does not meet requirements. It must be at least 6 characters.";
        }
        
        return { error: enhancedError as Error | null };
      }
      
      console.log("Sign up successful, user:", data.user?.email);
      return { error: null };
    } catch (error) {
      console.error("Sign up exception:", error);
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, session, loading, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

