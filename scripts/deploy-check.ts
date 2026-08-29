import crypto from "crypto";
import { promises as fs } from "fs";
import path from "path";

async function checkBuildIntegrity() {
  const buildHash = crypto.createHash("sha3-256").update("kronos-build-2026").digest("hex");
  const sealPath = path.join(process.cwd(), "scripts", "seal.txt");

  try {
    const storedHash = await fs.readFile(sealPath, "utf8");
    if (storedHash.trim() === buildHash) {
      console.log("✅ Build sellado correctamente. Deploy seguro.");
    } else {
      console.warn("⚠️ El hash del build no coincide. Revisar antes de desplegar.");
    }
  } catch {
    console.warn("⚠️ No se encontró seal.txt. Se sellará ahora.");
    await fs.writeFile(sealPath, buildHash, "utf8");
  }
}

checkBuildIntegrity();