"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import QuantumBackground from "@/components/QuantumBackground";
import { Lock, User, LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      const data = await res.json();
      setError(data.error || "Credenciales incorrectas");
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center p-6">
      <QuantumBackground />
      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-2xl border border-[#B88A2D]/40 bg-[#050505]/90 p-8 shadow-[0_0_30px_rgba(184,138,45,0.3)] backdrop-blur-md">
          
          <div className="text-center mb-6">
            <h1 className="text-4xl font-black bg-gradient-to-r from-[#B88A2D] via-[#FFD700] to-[#B88A2D] bg-clip-text text-transparent">KRONOS 360</h1>
            <p className="text-sm text-gray-400 mt-2">BUNKER MK-III - ACCESO RESTRINGIDO</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
              <input
                type="email"
                placeholder="admin@kronos360.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#FFD700]"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#FFD700]"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 bg-[#FFD700] text-black font-black rounded-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform"
            >
              <LogIn className="w-5 h-5" /> ENTRAR AL BUNKER
            </button>
          </form>

          <p className="text-center text-xs text-gray-600 mt-6">
            Protegido por Kernel Offline 72 y Guardian
          </p>
        </div>
      </div>
    </main>
  );
}