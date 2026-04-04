import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  containerClassName?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "none";
}

const maxWidthMap = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  none: "max-w-none",
};

export function Section({
  children,
  className,
  containerClassName,
  maxWidth = "lg",
  ...props
}: SectionProps) {
  return (
    <section className={cn("py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden", className)} {...props}>
      <div className={cn("mx-auto w-full", maxWidthMap[maxWidth], containerClassName)}>
        {children}
      </div>
    </section>
  );
}
