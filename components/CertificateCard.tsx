import { CheckCircle2, XCircle } from "lucide-react";

export default function CertificateCard({
  folio,
  estado,
  hash,
}: {
  folio: string;
  estado: string;
  hash: string;
}) {
  const isOriginal = estado.includes("ORIGINAL");

  return (
    <div className="relative w-full max-w-md p-8 rounded-lg border-gold-holo bg-gradient-to-br from-[#111] via-[#222] to-[#111] shadow-2xl">
      <div className="absolute inset-0 rounded-lg border border-[#00FFFF]/20 pointer-events-none" />
      <div className="text-center">
        <h2 className="text-4xl font-luxury text-gold-gradient mb-6">KRONOS 360</h2>
        <p className="text-sm text-gray-400 mb-2">CERTIFICATE OF BLOCK RECORD & OWNERSHIP</p>
        <div className="flex justify-center mb-4">
          {isOriginal ? (
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          ) : (
            <XCircle className="w-12 h-12 text-red-500" />
          )}
        </div>
        <div className="bg-black/50 p-4 rounded-lg border border-[#B88A2D]/20 text-left mb-4">
          <p className="text-xs text-gray-500">FOLIO</p>
          <p className="font-mono text-lg text-white">{folio}</p>
          <p className="text-xs text-gray-500 mt-2">HASH</p>
          <p className="font-mono text-xs text-[#00FFFF] break-all">{hash}</p>
        </div>
        <h3 className={`text-2xl font-bold ${isOriginal ? "text-green-500" : "text-red-500"}`}>{estado}</h3>
        <p className="text-xs text-gray-500 mt-4">AUTHENTICATED ON CHAIN • TAMPER EVIDENT</p>
      </div>
    </div>
  );
}