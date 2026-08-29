"use client";
import { useEffect, useState } from "react";
import { ScrollText } from "lucide-react";

interface LogEntry {
  event: string;
  timestamp: string;
  hash: string;
}

export default function GuardianConsole() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    fetch("/api/guardian")
      .then((res) => res.json())
      .then((data) => setLogs(data.logs || []));
  }, []);

  return (
    <div className="bg-black/80 border border-[#00FFFF]/20 rounded-xl p-4 font-mono text-sm text-[#00FFFF] max-h-64 overflow-y-auto">
      <div className="flex items-center gap-2 mb-2 text-[#B88A2D]">
        <ScrollText className="w-4 h-4" />
        <span className="font-bold">GUARDIAN LOG</span>
      </div>
      {logs.length === 0 ? (
        <p className="text-gray-500">No hay eventos registrados aún.</p>
      ) : (
        logs.map((log, i) => (
          <div key={i} className="border-b border-white/5 py-2">
            <span className="text-gray-400">[{log.timestamp}]</span> {log.event}
            <span className="block text-xs text-gray-600 break-all">hash: {log.hash}</span>
          </div>
        ))
      )}
    </div>
  );
}