import React, { useState } from 'react';
import { Search, Grid, List as ListIcon, Plus, Database, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { generateId } from '../lib/utils';

export function Dashboard() {
  const navigate = useNavigate();
  const [chatflows, setChatflows] = useState<any[]>(() => {
    const saved = localStorage.getItem('chatflows');
    if (saved) {
      return Object.values(JSON.parse(saved));
    }
    return [
      { id: '1', name: 'Standard Bot', description: 'A basic assistant bot', nodesCount: 4, updatedAt: new Date().toISOString() },
      { id: '2', name: 'Knowledge Assistant', description: 'RAG based library bot', nodesCount: 6, updatedAt: new Date().toISOString() },
    ];
  });

  const [searchQuery, setSearchQuery] = useState('');

  const filteredFlows = chatflows.filter(flow => 
    (flow.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (flow.description || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddNew = () => {
    const id = generateId();
    navigate(`/canvas/${id}`);
  };

  return (
    <div className="flex-1 bg-slate-950 p-8 overflow-y-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Chatflows</h2>
          <p className="text-slate-400 text-sm">Build local-first AI workflows using ChatOllama, LocalAI and free cloud models</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search Name or Category"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-900/50 border border-white/5 backdrop-blur-md rounded-xl pl-10 pr-4 py-2.5 text-sm text-white w-80 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all shadow-inner"
            />
          </div>
          <div className="flex bg-slate-900/50 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden ring-1 ring-white/5">
            <button className="p-2.5 bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"><Grid size={18} /></button>
            <button className="p-2.5 text-slate-400 hover:bg-white/5 transition-colors"><ListIcon size={18} /></button>
          </div>
          <button 
            onClick={handleAddNew}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-semibold transition-all shadow-lg shadow-indigo-600/20 ring-1 ring-white/10 active:scale-95"
          >
            <Plus size={18} />
            Add New
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFlows.map((flow, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={flow.id}
            onClick={() => navigate(`/canvas/${flow.id}`)}
            className="group bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-2xl cursor-pointer hover:border-indigo-500/40 hover:bg-slate-900/60 transition-all shadow-2xl relative overflow-hidden ring-1 ring-white/5"
          >
            <div className="absolute -right-12 -top-12 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors tracking-tight">{flow.name}</h3>
                <div className="flex flex-col items-end gap-1">
                  <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-[9px] uppercase font-bold tracking-widest border border-indigo-500/20">Active</span>
                  <span className="text-[8px] text-slate-600 font-mono italic">{new Date(flow.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
              <p className="text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed font-medium">{flow.description}</p>
              <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform">
                  <Database size={16} />
                </div>
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20 group-hover:scale-110 transition-transform">
                  <Zap size={16} />
                </div>
                <span className="text-[10px] text-slate-500 ml-auto font-bold uppercase tracking-tighter hover:text-slate-300">+ {flow.nodesCount || 0} NODE TYPES</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between text-slate-500 text-xs font-medium">
        <div className="flex items-center gap-4">
          <span>Items per page:</span>
          <select className="bg-slate-900/50 border border-white/10 rounded-lg px-3 py-1.5 outline-none focus:ring-1 focus:ring-indigo-500/50">
            <option>12</option>
            <option>24</option>
          </select>
        </div>
        <div className="bg-slate-900/50 px-4 py-1.5 rounded-full border border-white/5 backdrop-blur-md font-mono">
          Items 1 to {filteredFlows.length} of {filteredFlows.length}
        </div>
      </div>
    </div>
  );
}
