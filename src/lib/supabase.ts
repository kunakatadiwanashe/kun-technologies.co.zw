import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Types for BlogPost
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  featured: boolean;
  image: string;
  tags: string; // Stored as JSON string
  createdAt: string;
  updatedAt: string;
}

