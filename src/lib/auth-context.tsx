"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User, Session, SupabaseClient } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

type SupabaseAuthClient = SupabaseClient["auth"];

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ data: { user: User | null; session: Session | null; }, error: (Error & { message: string }) | null }>;
  signUp: (email: string, password: string) => Promise<{ data: { user: User | null; session: Session | null; }, error: (Error & { message: string }) | null }>;
  signOut: SupabaseAuthClient["signOut"];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {

      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  const signIn: AuthContextType["signIn"] = async (email, password) => {

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {

      if (error.message.includes("Invalid login credentials")) {
        error.message =
          "Invalid email or password. Please check your credentials and try again.";
      } else if (
        error.message.includes("Email not confirmed") ||
        error.message.includes("User not confirmed")
      ) {
        error.message =
          "Your email address has not been confirmed yet. Please check your inbox for the confirmation email. If you haven't received it, check your spam folder.";
      }
      return { data, error: { ...error, message: error.message } };
    }


    return { data, error: null };
  };

  const signUp: AuthContextType["signUp"] = async (email, password) => {

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {

      if (error.status === 429 || error.message.includes("rate limit")) {
        error.message =
          "Too many signup attempts. Please wait a few minutes before trying again.";
      } else if (
        error.message.includes("invalid") ||
        error.message.includes("Invalid")
      ) {
        const emailDomain = email.split('@')[1];
        error.message = `The email domain "${emailDomain}" is not accepted. Please use a trusted email provider like Gmail, Outlook, Yahoo, or iCloud.`;
      } else if (
        error.message.includes("already been registered") ||
        error.message.includes("already exists")
      ) {
        error.message =
          "An account with this email already exists. Please try logging in instead.";
      } else if (error.message.includes("Password")) {
        error.message =
          "Password does not meet requirements. It must be at least 6 characters.";
      }
      return { data, error: { ...error, message: error.message } };
    }


    return { data, error: null };
  };

  const signOut: AuthContextType["signOut"] = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push("/admin/login");
    }
    return { error };
  };

  const value = { user, session, loading, signIn, signUp, signOut };

  return (
    <AuthContext.Provider value={value}>
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
