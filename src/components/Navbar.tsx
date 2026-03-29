"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, LogIn } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

import Image from "next/image";

function InetzLogo({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-12 w-44 flex items-center group", className)}>
      <Image 
        src="/logo.png" 
        alt="Inetz Technologies Logo" 
        fill
        className="object-contain transition-transform group-hover:scale-105"
        priority
      />
    </div>
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-10 h-10" />;

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 w-10 h-10 rounded-full"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 90 : 0, scale: [0.8, 1] }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
      >
        {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      </motion.div>
    </Button>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeHref = useMemo(() => {
    const exact = navItems.find((i) => i.href === pathname)?.href;
    if (exact) return exact;
    return navItems.find((i) => pathname?.startsWith(i.href) && i.href !== "/")
      ?.href;
  }, [pathname]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-[100] w-full border-b border-zinc-100/50 bg-white/70 backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-900/70">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <InetzLogo />
        </Link>
 
        {/* Desktop Nav */}
        <nav className="hidden items-center gap-2 lg:flex p-1 bg-zinc-50/50 dark:bg-zinc-900/50 rounded-full border border-zinc-100/50 dark:border-zinc-800/50">
          {navItems.map((item) => {
            const isActive = item.href === activeHref;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-6 py-2 text-sm font-bold transition-all duration-300",
                  isActive
                    ? "text-white dark:text-zinc-900"
                    : "text-zinc-500 hover:text-orange-500 dark:text-zinc-400 dark:hover:text-orange-400",
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute inset-0 bg-orange-500 dark:bg-orange-500 rounded-full -z-10 shadow-lg shadow-orange-500/20"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="hidden sm:flex items-center gap-3">
            <Button href="/login" variant="ghost" size="sm" className="font-semibold">
              Login
            </Button>
            <Button href="/register" variant="primary" size="sm" className="px-6 rounded-full font-bold shadow-lg shadow-orange-500/20">
              Register
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden p-2 rounded-full h-10 w-10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col p-4 gap-2">
              {navItems.map((item) => {
                const isActive = item.href === activeHref;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-2xl text-lg font-semibold transition-all",
                      isActive
                        ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                        : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
                    )}
                  >
                    {item.label}
                    {isActive && <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-2 h-2 rounded-full bg-orange-500" />}
                  </Link>
                );
              })}
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                <Button href="/login" variant="outline" size="lg" className="rounded-2xl">
                  Login
                </Button>
                <Button href="/register" variant="primary" size="lg" className="rounded-2xl">
                  Register
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

