"use client";
import { useEffect, useState } from "react";
import QuantumBackground from "@/components/QuantumBackground";
import { UserX, CheckCircle } from "lucide-react";

export default function AdminPage() {
  const [usuarios, setUsuarios] = useState([
    { id: "1", email: "cliente@marca.com", status: "ACTIVE" },
    { id: "2", email: "moroso@tequila.com", status: "EXPIRED" },
  ]);

  const bloquear = async (id: string) => {
    // Aquí llamarías a la API para cambiar el estado en Supabase
    setUsuarios(usuarios.map(u => u.id === id ? { ...u, status: "SUSPENDED" } : u));
    alert("Usuario bloqueado por falta de pago");
  };

  return (
    <main className="relative min-h-screen bg-[#050505]">
      <QuantumBackground />
      <div className="relative z-10 max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-black text-[#FFD700] mb-8">👑 ADMINISTRACIÓN DE LICENCIAS</h1>
        
        <div className="bg-[#111] rounded-xl border border-white/10 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-black/60 text-gray-400 text-sm">
              <tr>
                <th className="p-4">CLIENTE</th>
                <th className="p-4">ESTADO</th>
                <th className="p-4">ACCIÓN</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id} className="border-t border-white/5">
                  <td className="p-4 font-mono text-white">{u.email}</td>
                  <td className="p-4">
                    {u.status === "ACTIVE" ? (
                      <span className="text-green-500 flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Al día</span>
                    ) : (
                      <span className="text-red-500 flex items-center gap-1"><UserX className="w-4 h-4" /> Moroso</span>
                    )}
                  </td>
                  <td className="p-4">
                    <button 
                      onClick={() => bloquear(u.id)}
                      className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Bloquear
                    </button>
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