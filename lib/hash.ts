import crypto from "crypto";

export function generateHash(data: string): string {
  return crypto.createHash("sha256").update(data).digest("hex");
}

export function generateFolio(prefix = "PK-PHOTO-2026"): string {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${random}`;
}

export function generateKodiceHash(data: string): string {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}