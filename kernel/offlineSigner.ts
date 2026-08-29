import crypto from "crypto";
import { promises as fs } from "fs";
import path from "path";

export class OfflineSigner {
  private privateKey: string;

  constructor(privateKey: string) {
    this.privateKey = privateKey;
  }

  /**
   * Genera una firma y la guarda en un archivo .sig
   */
  async signAndSave(data: string, filename: string): Promise<string> {
    const signature = crypto.sign(null, Buffer.from(data), this.privateKey);
    const filePath = path.join(process.cwd(), "kernel", "signatures", `${filename}.sig`);
    
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, signature.toString("hex"), "utf8");

    return filePath;
  }

  /**
   * Verifica una firma
   */
  verify(data: string, signature: string, publicKey: string): boolean {
    return crypto.verify(null, Buffer.from(data), publicKey, Buffer.from(signature, "hex"));
  }
}

export const offlineSigner = new OfflineSigner(process.env.KERNEL_PRIVATE_KEY || "demo-key");