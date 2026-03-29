import { HTMLMotionProps, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  variant?: "glass" | "outline" | "flat";
  hover?: "scale" | "lift" | "none";
}

export function Card({
  children,
  className,
  variant = "flat",
  hover = "none",
  whileHover,
  ...props
}: CardProps) {
  const variants = {
    glass: "bg-white/80 dark:bg-zinc-950/45 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 shadow-xl",
    outline: "bg-white dark:bg-zinc-950/40 border border-zinc-100 dark:border-zinc-800/60 shadow-sm",
    flat: "bg-zinc-50 dark:bg-zinc-900 border-none",
  };

  const hovers = {
    scale: { scale: 1.02 },
    lift: { y: -8 },
    none: {},
  };

  return (
    <motion.div
      whileHover={whileHover || hovers[hover]}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn("rounded-3xl p-6 overflow-hidden", variants[variant], className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
