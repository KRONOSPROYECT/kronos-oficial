import crypto from "crypto";
import { supabase } from "./supabase";

/**
 * GUARDIAN ASSISTANT – Documenta TODOS los eventos
 */
export class Guardian {
  private log: Array<{ event: string; timestamp: string; hash: string }> = [];
  private static instance: Guardian;

  private constructor() {}

  static getInstance(): Guardian {
    if (!Guardian.instance) {
      Guardian.instance = new Guardian();
    }
    return Guardian.instance;
  }

  async logEvent(event: string, metadata: Record<string, any>) {
    const timestamp = new Date().toISOString();
    const data = `${event}${timestamp}${JSON.stringify(metadata)}KRONOS-GUARDIAN`;
    const hash = crypto.createHash("sha3-512").update(data).digest("hex");

    this.log.push({ event, timestamp, hash });

    await supabase.from("audit_log").insert([{
      event,
      metadata: JSON.stringify(metadata),
      hash,
      timestamp,
    }]);
  }

  getLog() {
    return this.log;
  }
}

export const guardian = Guardian.getInstance();