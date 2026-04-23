import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface PlaceholderViewProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function PlaceholderView({ title, description, icon: Icon }: PlaceholderViewProps) {
  return (
    <div className="flex-1 bg-slate-950 p-8 flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-24 h-24 bg-indigo-600/10 rounded-3xl flex items-center justify-center text-indigo-500 border border-indigo-500/20 shadow-2xl mb-6 shadow-indigo-500/10"
      >
        <Icon size={48} />
      </motion.div>
      <h2 className="text-3xl font-bold text-white mb-2 tracking-tight uppercase">{title}</h2>
      <p className="text-slate-400 max-w-md italic font-medium leading-relaxed">
        {description}
      </p>
      
      <div className="mt-12 grid grid-cols-3 gap-8 opacity-20 filter grayscale">
         <div className="h-24 w-40 bg-slate-900 rounded-2xl border border-white/10"></div>
         <div className="h-24 w-40 bg-slate-900 rounded-2xl border border-white/10"></div>
         <div className="h-24 w-40 bg-slate-900 rounded-2xl border border-white/10"></div>
      </div>
      
      <button className="mt-12 px-6 py-3 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-indigo-600/30 transition-all">
         Configure {title}
      </button>
    </div>
  );
}
