import { NextResponse } from "next/server";
import { guardian } from "@/lib/guardian";

export async function GET() {
  return NextResponse.json({ logs: guardian.getLog() });
}