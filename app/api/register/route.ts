import { NextResponse } from "next/server";
import { licenseManager } from "@/lib/licenseManager";
import { guardian } from "@/lib/guardian";
import { supabase } from "@/lib/supabase";
import { generateHash } from "@/lib/hash";

export async function POST(req: Request) {
  const { tenantId, folio, hash_foto } = await req.json();

  // 1. Verificar licencia activa
  const hasLicense = await licenseManager.checkLicense(tenantId);
  if (!hasLicense) {
    await guardian.logEvent("REGISTER_BLOCKED", { tenantId, reason: "Licencia inactiva" });
    return NextResponse.json({ error: "Licencia inactiva. Contacte a KRONOS 360." }, { status: 403 });
  }

  // 2. Registrar folio
  const hash = generateHash(hash_foto);
  const { data, error } = await supabase
    .from("kronos_certificados")
    .insert([{ folio, hash_foto: hash, tenantId }])
    .select();

  if (error) {
    await guardian.logEvent("REGISTER_FAILED", { folio, error: error.message });
    return NextResponse.json({ error: "Folio duplicado" }, { status: 409 });
  }

  await guardian.logEvent("REGISTER_SUCCESS", { folio, tenantId });
  return NextResponse.json({ folio, estado: "ORIGINAL VERIFICADO" });
}