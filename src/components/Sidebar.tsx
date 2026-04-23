import React from 'react';
import { LayoutDashboard, Rocket, History, Users, ShoppingCart, Wrench, Key, Variable, Lock, Library, Database } from 'lucide-react';
import { cn } from '../lib/utils';
import { NavLink, useNavigate } from 'react-router-dom';
import { generateId } from '../lib/utils';
import { PlusCircle, UserCircle } from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Chatflows', path: '/' },
  { icon: Rocket, label: 'Agentflows', path: '/agents' },
  { icon: History, label: 'Executions', path: '/executions' },
  { icon: Users, label: 'Assistants', path: '/assistants' },
  { icon: ShoppingCart, label: 'Marketplaces', path: '/marketplaces' },
  { icon: Wrench, label: 'Tools', path: '/tools' },
  { icon: Lock, label: 'Credentials', path: '/credentials' },
  { icon: Variable, label: 'Variables', path: '/variables' },
  { icon: Key, label: 'API Keys', path: '/api-keys' },
  { icon: Database, label: 'Document Stores', path: '/document-stores' },
];

export function Sidebar() {
  const navigate = useNavigate();

  const handleNew = () => {
    navigate(`/canvas/${generateId()}`);
  };

  return (
    <aside className="w-64 bg-slate-900/40 backdrop-blur-xl border-r border-white/5 flex flex-col h-screen ring-1 ring-white/5">
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
            <span className="font-bold text-white text-xl">M</span>
          </div>
          <div>
             <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold tracking-tight text-white leading-none">MANOJ</h1>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[8px] font-black tracking-tighter border border-emerald-500/20 uppercase">Free</span>
             </div>
             <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 font-bold">Bot Builder</p>
          </div>
        </div>
        <button onClick={handleNew} className="text-slate-500 hover:text-indigo-400 transition-colors p-1.5 hover:bg-white/5 rounded-lg">
          <PlusCircle size={20} />
        </button>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200",
                isActive 
                  ? "bg-white/10 text-indigo-400 shadow-sm border border-white/5" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon size={18} className={cn("transition-colors", isActive ? "text-indigo-400" : "text-slate-400")} />
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5 space-y-4">
        <NavLink
            to="/datasets"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200",
                isActive 
                  ? "bg-white/10 text-indigo-400 shadow-sm border border-white/5" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              )
            }
          >
            {({ isActive }) => (
              <>
                <Library size={18} className={cn("transition-colors", isActive ? "text-indigo-400" : "text-slate-400")} />
                <span>Datasets</span>
              </>
            )}
        </NavLink>
        
        <div className="bg-slate-900/60 backdrop-blur-md rounded-xl p-3 flex items-center gap-3 border border-white/10 shadow-lg">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border border-white/20 flex items-center justify-center text-white font-bold text-xs shadow-inner">
            MK
          </div>
          <div className="flex-1 min-w-0">
             <div className="text-xs font-bold text-slate-200 truncate">Manoj Kumar</div>
             <div className="text-[10px] text-slate-500 truncate font-medium">Free Plan</div>
          </div>
          <UserCircle size={16} className="text-slate-600" />
        </div>
      </div>
    </aside>
  );
}
