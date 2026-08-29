"use client";
import { ShoppingCart } from "lucide-react";

export default function BuyButton({ productUrl, price }: { productUrl: string; price?: string }) {
  return (
    <a
      href={productUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 px-6 py-4 bg-[#FFD700] text-black font-black rounded-lg shadow-[0_0_20px_rgba(255,215,0,0.5)] hover:scale-105 transition-transform"
    >
      <ShoppingCart className="w-5 h-5" />
      COMPRAR ORIGINAL {price && <span className="text-sm">({price})</span>}
    </a>
  );
}