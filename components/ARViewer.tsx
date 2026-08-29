"use client";
import { useRef, useState } from "react";
import { Box } from "lucide-react";

export default function ARViewer({ modelUrl }: { modelUrl: string }) {
  const [isActive, setIsActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activateAR = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsActive(true);
    } catch (error) {
      alert("No se pudo acceder a la cámara. Usa un dispositivo móvil.");
    }
  };

  return (
    <div className="relative w-full h-64 bg-black rounded-xl overflow-hidden">
      {isActive ? (
        <video ref={videoRef} className="w-full h-full object-cover" />
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <Box className="w-12 h-12 mb-2" />
          <p className="text-sm">Activa la cámara para ver el modelo 3D</p>
        </div>
      )}
      {isActive && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <button
            onClick={() => setIsActive(false)}
            className="px-4 py-2 bg-red-500 text-white rounded-full text-xs"
          >
            Cerrar
          </button>
        </div>
      )}
      <button
        onClick={activateAR}
        className="absolute top-4 right-4 px-4 py-2 bg-[#8A2BE2] text-white rounded-full text-sm font-bold"
      >
        VER EN RA
      </button>
    </div>
  );
}