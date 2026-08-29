import crypto from "crypto";
import { promises as fs } from "fs";
import path from "path";

async function sealBuild() {
  const buildHash = crypto.createHash("sha3-256").update("kronos-build-2026").digest("hex");
  const filePath = path.join(process.cwd(), "scripts", "seal.txt");
  await fs.writeFile(filePath, buildHash, "utf8");
  console.log(`Build sellado: ${buildHash}`);
}

sealBuild();