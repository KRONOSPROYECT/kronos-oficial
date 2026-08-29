import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Lista de rutas protegidas
const PROTECTED_ROUTES = ["/dashboard", "/admin"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // 1. Proteger rutas privadas
  if (PROTECTED_ROUTES.includes(pathname)) {
    // Aquí iría la verificación real de sesión
    // Simulación con cookie
    const token = req.cookies.get("kronos-auth")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // 2. Headers de seguridad
  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "no-referrer");

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};