"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function WhatsAppButton() {
  const whatsappNumber = "919840234475";
  const message = encodeURIComponent("Hello! I want to know more about Inetz Technologies.");
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="fixed bottom-8 right-3 z-[150] animate-bounce"
    >
      <Link
        href={`https://wa.me/${whatsappNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full",
          "bg-[#25D366] text-white shadow-lg shadow-[#25D366]/20",
          "transition-all hover:scale-110 active:scale-95",
          "border border-white/20 backdrop-blur-sm group"
        )}
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="h-8 w-8" />
        <div className="absolute -inset-2 -z-10 rounded-full bg-[#25D366]/20 blur-lg transition-all group-hover:bg-[#25D366]/40" />
      </Link>
    </motion.div>
  );
}
