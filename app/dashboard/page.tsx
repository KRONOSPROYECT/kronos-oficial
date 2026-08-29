"use client";

import { useState } from "react";
import QuantumBackground from "@/components/QuantumBackground";
import { Plus, ShieldCheck, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const [folios, setFolios] = useState([
    { folio: "FDV-DEMO-00001", estado: "ORIGINAL" },
    { folio: "CLON-DEMO-99999", estado: "CLON" },
  ]);

  const [nuevo, setNuevo] = useState("");

  const agregar = () => {
    if (!nuevo) return;
    setFolios([...folios, { folio: nuevo, estado: "ORIGINAL" }]);
    setNuevo("");
  };

  return (
    <main className="relative min-h-screen bg-[#050505]">
      <QuantumBackground />
      <div className="relative z-10 max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-black text-[#FFD700] mb-8">PANEL DE CONTROL</h1>

        <div className="bg-[#111] rounded-xl border border-[#FFD700]/20 p-6 mb-8">
          <h2 className="text-white font-bold mb-4">GENERAR NUEVO FOLIO</h2>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ej: FDV-MEZCAL-00001"
              value={nuevo}
              onChange={(e) => setNuevo(e.target.value)}
              className="flex-1 bg-black border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#FFD700]"
            />
            <button onClick={agregar} className="px-4 py-2 bg-[#FFD700] text-black font-bold rounded-lg flex items-center gap-2">
              <Plus className="w-4 h-4" /> Crear
            </button>
          </div>
        </div>

        <div className="bg-[#111] rounded-xl border border-white/10 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-black/60 text-gray-400 text-sm">
              <tr>
                <th className="p-4">FOLIO</th>
                <th className="p-4">ESTADO</th>
                <th className="p-4">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {folios.map((item, i) => (
                <tr key={i} className="border-t border-white/5">
                  <td className="p-4 font-mono text-white">{item.folio}</td>
                  <td className="p-4">
                    {item.estado === "ORIGINAL" ? (
                      <span className="text-green-500"><ShieldCheck className="inline w-4 h-4" /> Original</span>
                    ) : (
                      <span className="text-red-500"><AlertTriangle className="inline w-4 h-4" /> Clon</span>
                    )}
                  </td>
                  <td className="p-4">
                    <Link href={`/verify/${item.folio}`} className="text-[#FFD700] hover:underline">Verificar</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}