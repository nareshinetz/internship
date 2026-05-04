"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { TechStack } from "@/lib/program-data";

interface CourseCardProps {
  stack: TechStack;
  title: string;
  image: string;
  description: string;
  modules: number;
  onSelect: (stack: TechStack) => void;
}

const CourseCard = ({ stack, title, image, description, modules, onSelect }: CourseCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group bg-white rounded-[2rem] border border-zinc-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
      onClick={() => onSelect(stack)}
    >
      <div className="relative h-52 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-emerald-600 shadow-sm">
            {stack}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-zinc-900 mb-2 group-hover:text-emerald-600 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-zinc-500 line-clamp-2 mb-6">
          {description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-zinc-50">
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5 text-zinc-400 text-[10px] font-bold uppercase">
              <BookOpen size={14} className="text-emerald-500" /> {modules} Modules
            </div>
          </div>
          <div className="bg-zinc-900 text-white p-2 rounded-xl group-hover:bg-emerald-600 transition-colors">
            <ArrowRight size={18} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;