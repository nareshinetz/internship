"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

interface ProgramCardProps {
  title: string;
  description?: string;
  image: string;
  // Included subtitle in interface to avoid TS errors when passing it from DB
  subtitle?: string; 
  badgeText?: string;
  badgeIcon?: React.ElementType;
  buttonText?: string;
  showButton?: boolean;
  tags?: string[];
}

const ProgramCard = ({
  title,
  description,
  image,
  subtitle, // Now properly destructured
  badgeText,
  badgeIcon: Icon,
  buttonText = "Review Modules",
  showButton = true,
  tags = [],
}: ProgramCardProps) => {
  return (
    <div className="group rounded-2xl bg-white border border-zinc-200 p-1.5 shadow-sm hover:shadow-lg transition-all h-full flex flex-col">
      {/* Image Section */}
      <div className="h-40 relative rounded-xl overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {badgeText && Icon && (
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[8px] font-bold uppercase flex items-center gap-1.5 shadow-sm border border-white/20">
            <Icon className="w-3 h-3 text-emerald-600" />
            {badgeText}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-tight">
            {title}
          </h4>
          
          {/* Subtitle (often used for short tech summaries) */}
          {subtitle && (
            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-1">
              {subtitle}
            </p>
          )}

          {description && (
            <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed italic">
              {description}
            </p>
          )}

          {/* Tech Tags (for Projects) */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {tags.map((t) => (
                <span
                  key={t}
                  className="text-[7px] font-bold uppercase tracking-widest text-zinc-400 border border-zinc-100 px-1.5 py-0.5 rounded-md bg-zinc-50"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Button (Conditional) */}
        <div className="mt-auto">
          {showButton ? (
            <button className="w-full mt-5 py-3 rounded-lg bg-zinc-900 text-white font-bold text-[8px] uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 shadow-md">
              {buttonText} <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="mt-4 flex justify-end">
              <ArrowUpRight className="w-4 h-4 text-zinc-300 group-hover:text-emerald-500 transition-colors" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;