import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Skip auth check if environment variables are not configured
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase environment variables not configured");
    return supabaseResponse;
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set({ name, value, ...options });
          });
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session if expired
  const {
    data: { session },
  } = await supabase.auth.getSession();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("Middleware - Session:", session?.user?.email);
  console.log("Middleware - User:", user?.email);

  const { pathname } = request.nextUrl;

  // Define admin routes that need protection
  const isAdminRoute = pathname.startsWith("/admin") && pathname !== "/admin/login" && pathname !== "/admin/signup";
  const isApiRoute = pathname.startsWith("/api");

  // If user is already logged in and tries to access login/signup page, redirect to admin dashboard
  if (pathname === "/admin/login" || pathname === "/admin/signup") {
    if (user) {
      const url = new URL("/admin", request.url);
      return NextResponse.redirect(url);
    }
    return supabaseResponse;
  }

  // Check auth for admin routes (excluding login)
  if (isAdminRoute) {
    if (!user) {
      // Redirect to login if not authenticated
      const url = new URL("/admin/login", request.url);
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
