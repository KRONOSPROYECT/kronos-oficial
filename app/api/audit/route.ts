import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { guardian } from "@/lib/guardian";

export async function GET() {
  const { data, error } = await supabase
    .from("audit_log")
    .select("*")
    .order("timestamp", { ascending: false })
    .limit(50);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await guardian.logEvent("AUDIT_LOGS_FETCHED", { count: data?.length || 0 });

  return NextResponse.json({ logs: data });
}