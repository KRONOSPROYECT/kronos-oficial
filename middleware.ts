import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Crear cliente de Supabase para leer la sesión desde la cookie
  const res = NextResponse.next();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => req.cookies.getAll(), setAll: () => {} } }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Si NO está logueado y quiere entrar al Dashboard, redirigir a Login
  if (!user && (pathname.startsWith("/dashboard") || pathname.startsWith("/admin"))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Si YA está logueado y va al Login, redirigir al Dashboard
  if (user && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Headers de seguridad
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "no-referrer");

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|verify).*)"],
};