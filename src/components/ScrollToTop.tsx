"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-8 right-5 z-[150] h-12 w-12 rounded-full",
            "bg-orange-500 text-white shadow-lg shadow-orange-500/20",
            "flex items-center justify-center transition-all hover:scale-110 active:scale-95",
            "border border-white/20 backdrop-blur-sm"
          )}
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-6 w-6" />
          <div className="absolute -inset-2 bg-orange-500/20 rounded-full blur-lg -z-10 group-hover:bg-orange-500/40 transition-all" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
