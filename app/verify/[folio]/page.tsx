"use client";

import { useParams } from "next/navigation";
import QuantumBackground from "@/components/QuantumBackground";
import { CheckCircle2, XCircle, Box, ShoppingCart, Download } from "lucide-react";

export default function VerifyPage() {
  const { folio } = useParams();

  const isOriginal = folio.includes("DEMO-00001") || folio.includes("PK-PHOTO-2026-00001258");

  const blockNumber = isOriginal ? "10145" : "00000";
  const totalKronos = isOriginal ? "730440" : "0";
  const blockHash = isOriginal ? "00007beb" : "00000000";
  const timestamp = isOriginal ? "2026-08-28T14:22:11.341Z" : "2026-08-28T14:22:11.000Z";
  const protocol = isOriginal ? "KRONOS v1.4 • PROOF-OF-STAKE" : "CLON DETECTADO";
  const wallet = isOriginal ? "0x7f2a...KR57731" : "0x0000...FAKE";

  return (
    <main className="relative min-h-screen flex items-center justify-center p-6">
      <QuantumBackground />

      <div className="relative z-10 w-full max-w-3xl">
        <div className="rounded-2xl border border-[#B88A2D]/40 bg-[#050505]/90 shadow-[0_0_30px_rgba(184,138,45,0.3)] backdrop-blur-md overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-[#B88A2D] via-[#00FFFF] to-[#8A2BE2]"></div>

          <div className="text-center pt-8 pb-4">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-r from-[#B88A2D] via-[#FFD700] to-[#B88A2D] bg-clip-text text-transparent">
              KRONOS
            </h1>
            <p className="text-sm tracking-widest text-gray-400 mt-1">LUXURY BLOCKCHAIN CERTIFICATE</p>
          </div>

          <div className="text-center py-8">
            {isOriginal ? (
              <>
                <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto mb-4 shadow-[0_0_30px_rgba(34,197,94,0.6)]" />
                <h2 className="text-5xl md:text-6xl font-black text-green-500 tracking-tighter">ORIGINAL</h2>
                <p className="text-gray-400 mt-2">VERIFICADO EN BLOCKCHAIN</p>
              </>
            ) : (
              <>
                <XCircle className="w-24 h-24 text-red-500 mx-auto mb-4 shadow-[0_0_30px_rgba(239,68,68,0.6)]" />
                <h2 className="text-5xl md:text-6xl font-black text-red-500 tracking-tighter">CLON INVALIDADO</h2>
                <p className="text-gray-400 mt-2">DETECTADO Y BLOQUEADO</p>
              </>
            )}
          </div>

          <div className="border-t border-b border-[#00FFFF]/20 bg-black/80 p-6 font-mono text-sm md:text-base">
            <div className="grid grid-cols-2 gap-4 text-[#00FFFF]">
              <div>
                <p className="text-gray-500">BLOCK NUMBER</p>
                <p className="text-2xl font-bold text-white">{blockNumber}</p>
              </div>
              <div>
                <p className="text-gray-500">TOTAL KRONOS</p>
                <p className="text-2xl font-bold text-white">{totalKronos}</p>
              </div>
              <div>
                <p className="text-gray-500">BLOCK HASH</p>
                <p className="text-white">{blockHash}</p>
              </div>
              <div>
                <p className="text-gray-500">TIMESTAMP (ISO 8601)</p>
                <p className="text-white">{timestamp}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-500">PROTOCOL</p>
                <p className="text-purple-400">{protocol}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-500">ISSUED TO</p>
                <p className="text-white">{wallet}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center py-8 border-b border-white/10">
            <Box className="w-16 h-16 text-[#B88A2D] mb-3 animate-pulse" />
            <h3 className="text-white font-bold text-xl mb-2">REALIDAD AUMENTADA</h3>
            <button className="px-6 py-3 bg-[#8A2BE2] text-white font-bold rounded-full shadow-[0_0_15px_rgba(138,43,226,0.6)] hover:scale-105 transition-transform flex items-center gap-2">
              <Box className="w-5 h-5" /> VER EN RA
            </button>
          </div>

          <div className="p-6 flex flex-col sm:flex-row gap-4 justify-center">
            {isOriginal ? (
              <a href="#" className="flex-1 py-4 bg-[#FFD700] text-black font-black rounded-lg text-center shadow-[0_0_20px_rgba(255,215,0,0.5)] hover:scale-105 transition-transform flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" /> COMPRAR ORIGINAL AHORA
              </a>
            ) : (
              <a href="#" className="flex-1 py-4 bg-red-600 text-white font-black rounded-lg text-center shadow-[0_0_20px_rgba(255,0,0,0.5)] hover:scale-105 transition-transform flex items-center justify-center gap-2">
                <XCircle className="w-5 h-5" /> REPORTAR FALSIFICACIÓN
              </a>
            )}
            <a href="#" className="flex-1 py-4 border border-white/20 text-white font-bold rounded-lg text-center hover:border-[#00FFFF] hover:text-[#00FFFF] transition-colors flex items-center justify-center gap-2">
              <Download className="w-5 h-5" /> DESCARGAR PDF
            </a>
          </div>

          <div className="text-center pb-6 text-xs text-gray-600">
            CERTIFICATE ID: KRS-10145-730440-00007BEB | AUTHENTICATED ON CHAIN
          </div>
        </div>
      </div>
    </main>
  );
}