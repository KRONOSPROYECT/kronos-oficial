import crypto from "crypto";
import { supabase } from "./supabase";

export class AuditService {
  /**
   * Registra un evento de auditoría con hash
   */
  async log(event: string, metadata: Record<string, any>) {
    const timestamp = new Date().toISOString();
    const data = `${event}${timestamp}${JSON.stringify(metadata)}KRONOS-AUDIT`;
    const hash = crypto.createHash("sha3-512").update(data).digest("hex");

    await supabase.from("audit_log").insert([{
      event,
      metadata: JSON.stringify(metadata),
      hash,
      timestamp,
    }]);
  }
}

export const audit = new AuditService();