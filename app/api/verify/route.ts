import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { guardian } from "@/lib/guardian";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const folio = searchParams.get("folio");

  if (!folio) return NextResponse.json({ error: "Falta folio" }, { status: 400 });

  const { data, error } = await supabase
    .from("kronos_certificados")
    .select("*")
    .eq("folio", folio)
    .single();

  if (error || !data) {
    await guardian.logEvent("VERIFY_NOT_FOUND", { folio });
    return NextResponse.json({ folio, estado: "NO REGISTRADO" });
  }

  await guardian.logEvent("VERIFY_SUCCESS", { folio });
  return NextResponse.json(data);
}