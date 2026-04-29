import { cn } from "@/lib/utils";
import { Quote, Star } from "lucide-react";

const ReviewCard = ({ rev }) => (
  <div className="w-[320px] shrink-0 p-6 rounded-[2rem] bg-zinc-50 border border-zinc-100 relative group hover:bg-white hover:shadow-xl hover:border-emerald-100 transition-all duration-500">
    <Quote className="absolute top-6 right-8 w-6 h-6 text-zinc-200 group-hover:text-emerald-100 transition-colors" />
    
    <div className="flex gap-0.5 mb-3">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          className={cn("w-2.5 h-2.5", i < rev.rating ? "fill-yellow-400 text-yellow-400" : "text-zinc-200")} 
        />
      ))}
    </div>

    {/* Updated to use rev.comment from our JSON */}
    <p className="text-[12px] leading-relaxed text-zinc-600 mb-6 italic line-clamp-3">
      "{rev.comment}"
    </p>

    <div className="flex items-center gap-3">
      {/* Avatar Logic: Show Image if it exists, else show Initial */}
      <div className="w-9 h-9 rounded-full overflow-hidden bg-emerald-100 text-emerald-700 font-bold text-[10px] flex items-center justify-center border-2 border-white shadow-sm shrink-0">
        {rev.image ? (
          <img 
            src={rev.image} 
            alt={rev.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          rev.name.charAt(0)
        )}
      </div>

      <div>
        <h5 className="text-[12px] font-bold text-zinc-900 leading-tight">{rev.name}</h5>
        <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">
          {rev.role || "Verified Student"}
        </p>
      </div>
    </div>
  </div>
);

export default ReviewCard;