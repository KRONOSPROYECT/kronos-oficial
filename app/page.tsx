import QuantumBackground from "@/components/QuantumBackground";
import { ShieldCheck, Clock3, Link2, Cpu, Layers, Box, AlertTriangle, LogIn, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#050505]">
      <QuantumBackground />

      <nav className="relative z-20 max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="text-2xl font-black text-[#FFD700]">KRONOS 360</div>
        <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full text-sm text-white hover:border-[#FFD700] transition-colors">
          <LogIn className="w-4 h-4" /> Entrar
        </Link>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <section className="text-center mb-24">
          <div className="inline-block px-4 py-1 rounded-full border border-[#FFD700]/30 bg-[#FFD700]/10 text-xs tracking-widest text-[#FFD700] mb-6">
            KERNEL OFFLINE • DIMENSIONAL • RA
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter bg-gradient-to-r from-[#B88A2D] via-[#FFD700] to-[#B88A2D] bg-clip-text text-transparent mb-4">
            KRONOS 360
          </h1>
          <p className="text-2xl md:text-3xl text-white mb-6">
            La Capa de Confianza que el mercado negro no puede clonar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/verify/FDV-DEMO-00001" className="px-8 py-4 bg-[#FFD700] text-black font-bold rounded-full shadow-[0_0_30px_rgba(255,215,0,0.5)] hover:scale-105 transition-transform">
              VER DEMO ORIGINAL
            </Link>
            <Link href="/verify/CLON-DEMO-99999" className="px-8 py-4 bg-red-600 text-white font-bold rounded-full shadow-[0_0_30px_rgba(255,0,0,0.4)] hover:scale-105 transition-transform">
              VER DEMO CLON
            </Link>
          </div>
        </section>

        <section className="mb-24 grid md:grid-cols-3 gap-6">
          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#111] to-black border border-[#FFD700]/20">
            <Cpu className="w-10 h-10 text-[#FFD700] mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">KERNEL OFFLINE</h3>
            <p className="text-sm text-gray-400">Caja fuerte sin internet. Genera firmas sin conexión.</p>
          </div>
          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#111] to-black border border-cyan-400/20">
            <Layers className="w-10 h-10 text-cyan-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">DIMENSIONES</h3>
            <p className="text-sm text-gray-400">3 capas simultáneas. Si clonas 1, fallan 2.</p>
          </div>
          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#111] to-black border border-purple-400/20">
            <Box className="w-10 h-10 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">RA DE ADQUISICIÓN</h3>
            <p className="text-sm text-gray-400">Convierte verificación en venta inmediata.</p>
          </div>
        </section>

        <section className="mb-20 p-8 rounded-2xl bg-[#FFD700] text-black text-center">
          <AlertTriangle className="inline-block mb-3" />
          <h2 className="text-3xl font-black">¿Tu marca ya está siendo clonada hoy?</h2>
          <a href="tel:+527225862335" className="inline-block mt-6 px-10 py-4 bg-black text-[#FFD700] font-bold rounded-full">ACTIVAR CAPA DE CONFIANZA</a>
        </section>

        <footer className="text-center text-xs text-gray-600 border-t border-white/10 pt-8">
          KRONOS 360 | Kernel Offline 72 | Safe Creative 2607146379465 | Toluca - 722 586 2335
        </footer>
      </div>
    </main>
  );
}