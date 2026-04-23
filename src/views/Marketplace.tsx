import React from 'react';
import { ShoppingBag, Star, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { generateId } from '../lib/utils';

const marketplaceItems = [
  { 
    title: 'Local Privacy Bot', 
    description: 'Runs entirely on your machine via ChatOllama. Zero data leakage.',
    category: 'Privacy',
    rating: 5.0,
    installs: '800',
    nodesCount: 3,
    isLocal: true
  },
  { 
    title: 'Customer Support Bot', 
    description: 'Optimized for answering FAQs and ticketing',
    category: 'Templates',
    rating: 4.8,
    installs: '1.2k',
    nodesCount: 3
  },
  { 
    title: 'PDF Reader Pro', 
    description: 'Extract knowledge from massive PDF libraries',
    category: 'RAG',
    rating: 4.9,
    installs: '2.5k',
    nodesCount: 5
  },
  { 
    title: 'Creative Writer', 
    description: 'Powered by GPT-4 and custom styling templates',
    category: 'Content',
    rating: 4.7,
    installs: '800',
    nodesCount: 2
  },
  { 
    title: 'Data Analyst', 
    description: 'Visualize CSV and Excel data using AI',
    category: 'Analysis',
    rating: 4.6,
    installs: '1.5k',
    nodesCount: 4
  }
];

export function Marketplace() {
  const navigate = useNavigate();

  const handleUseTemplate = (item: any) => {
    const id = generateId();
    // Simulate template installation
    const savedFlows = JSON.parse(localStorage.getItem('chatflows') || '{}');
    savedFlows[id] = { 
      id, 
      name: item.title, 
      description: item.description,
      nodes: [], // In a real app, these would be the template nodes
      edges: [],
      updatedAt: new Date().toISOString(),
      isTemplate: true
    };
    localStorage.setItem('chatflows', JSON.stringify(savedFlows));
    navigate(`/canvas/${id}`);
  };

  return (
    <div className="flex-1 bg-slate-950 p-8 overflow-y-auto min-h-screen selection:bg-indigo-500/30">
      <div className="flex items-center justify-between mb-12 text-white">
        <div>
          <h2 className="text-4xl font-black mb-2 flex items-center gap-4 tracking-tighter uppercase">
             <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/20 ring-1 ring-white/10">
                <ShoppingBag size={24} />
             </div>
             Marketplace
          </h2>
          <p className="text-slate-400 text-sm italic font-medium opacity-70">Discover, preview, and install community-shared chatflows</p>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="bg-slate-900 border border-white/5 px-4 py-2 rounded-xl text-xs font-bold text-slate-400">
              {marketplaceItems.length} Templates Available
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {marketplaceItems.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={item.title}
            className="group bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:border-indigo-500/40 transition-all overflow-hidden relative shadow-2xl ring-1 ring-white/5"
          >
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full uppercase font-black tracking-widest border border-indigo-500/20 shadow-sm">
                    {item.category}
                  </span>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full uppercase font-black tracking-widest border border-emerald-500/20">
                    Verified
                  </span>
                  {item.isLocal && (
                    <span className="text-[10px] bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full uppercase font-black tracking-widest border border-blue-500/20">
                      Local
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-yellow-500 drop-shadow-sm">
                   <Star size={14} fill="currentColor" />
                   <span className="text-sm font-black">{item.rating}</span>
                </div>
              </div>

              <h3 className="text-2xl font-black text-white mb-3 group-hover:text-indigo-300 transition-colors uppercase tracking-tight">{item.title}</h3>
              <p className="text-slate-400 text-sm mb-10 leading-relaxed font-medium opacity-80 line-clamp-2">{item.description}</p>
              
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Popularity</span>
                  <span className="text-xs text-slate-300 font-mono italic tracking-tighter">{item.installs} installs</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleUseTemplate(item)}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-indigo-600/20 active:scale-95 ring-1 ring-white/10"
                  >
                     <Sparkles size={16} />
                     Use Template
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
