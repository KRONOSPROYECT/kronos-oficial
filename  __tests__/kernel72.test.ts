import { Kernel72 } from "../kernel/kernel72";

describe("KERNEL 72 - Test de Integridad", () => {
  const kernel = new Kernel72("test-key");

  it("Debe generar 72 hashes sin colisión", () => {
    const data = "PK-PHOTO-2026-00001258";
    const chain = kernel.generateHashChain(data);
    
    expect(chain.length).toBe(72);
    const unique = new Set(chain);
    expect(unique.size).toBe(72);
  });
});