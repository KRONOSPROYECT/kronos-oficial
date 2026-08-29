import { z } from "zod";

export const FolioSchema = z.object({
  folio: z.string().min(5).max(50),
  hash_foto: z.string().min(64).max(64),
  tenantId: z.string().min(1),
});

export const VerifySchema = z.object({
  folio: z.string().min(5).max(50),
});