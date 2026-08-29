import crypto from "crypto";

export interface KernelResult {
  signature: string;
  hashChain: string[];
  timestamp: string;
  finalHash: string;
}

export class Kernel72 {
  private privateKey: string;

  constructor(privateKey: string) {
    this.privateKey = privateKey;
  }

  /**
   * Genera 72 hashes en cascada (SHA3-512 para resistencia cuántica)
   */
  generateHashChain(data: string): string[] {
    const chain: string[] = [];
    let current = data;

    for (let i = 0; i < 72; i++) {
      current = crypto.createHash("sha3-512").update(current + i).digest("hex");
      chain.push(current);
    }

    return chain;
  }

  /**
   * Genera firma digital Ed25519 offline
   */
  sign(data: string): string {
    const signature = crypto.sign(null, Buffer.from(data), this.privateKey);
    return signature.toString("hex");
  }

  /**
   * Sella un folio completamente offline
   */
  seal(folio: string, hashFoto: string): KernelResult {
    const timestamp = new Date().toISOString();
    const data = `${folio}${hashFoto}${timestamp}KRONOS360`;
    const hashChain = this.generateHashChain(data);
    const signature = this.sign(data);
    const finalHash = hashChain[71];

    return {
      signature,
      hashChain,
      timestamp,
      finalHash,
    };
  }
}

// Instancia global (la clave debe estar en .env.local)
export const kernel = new Kernel72(process.env.KERNEL_PRIVATE_KEY || "demo-key");
