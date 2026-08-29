import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { guardian } from "@/lib/guardian";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Verificar credenciales en Supabase (auth)
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    await guardian.logEvent("LOGIN_FAILED", { email });
    return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
  }

  // Si es admin, registrar éxito en el Guardián
  await guardian.logEvent("LOGIN_SUCCESS", { email });

  // Aquí podrías verificar si el admin tiene licencia activa
  // const license = await licenseManager.checkLicense(data.user.id);
  // if (!license) return NextResponse.json({ error: "Licencia expirada" }, { status: 403 });

  return NextResponse.json({ success: true, user: data.user });
}