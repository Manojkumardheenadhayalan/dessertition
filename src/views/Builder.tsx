import React, { useState, useCallback, useMemo } from 'react';
import ReactFlow, { 
  addEdge, 
  Background, 
  Controls, 
  MiniMap, 
  Panel,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  Connection,
  Edge
} from 'reactflow';
import 'reactflow/dist/style.css';
import { 
  ChevronLeft, 
  Save, 
  Settings, 
  Play, 
  Plus, 
  Trash2, 
  Database, 
  Bot, 
  Zap, 
  Cpu, 
  X, 
  Search, 
  Code, 
  Share2, 
  Info,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  MousePointer2,
  Pencil
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { NODE_TEMPLATES } from '../constants';

import { ChatWidget } from '../components/ChatWidget';
import { MessageSquare } from 'lucide-react';

const NodeComponent = ({ data, id, isConnectable }: any) => {
  const Icon = data.icon || Bot;
  
  return (
    <div className="bg-[#1a1c23]/95 backdrop-blur-xl border border-white/5 rounded-xl shadow-2xl overflow-hidden ring-1 ring-white/10 min-w-[320px] transition-all hover:ring-indigo-500/30">
      {/* Node Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-slate-900/50 to-transparent border-b border-white/5 flex justify-between items-center relative">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-9 h-9 rounded-xl flex items-center justify-center shadow-lg ring-1 ring-white/10",
            data.type === 'llm' ? "bg-orange-500/10 text-orange-400" :
            data.type === 'loader' ? "bg-blue-500/10 text-blue-400" :
            data.type === 'memory' ? "bg-purple-500/10 text-purple-400" :
            "bg-indigo-500/10 text-indigo-400"
          )}>
            <Icon size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-100 tracking-tight">{data.label}</h4>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] uppercase font-black tracking-widest text-slate-500">{data.type}</span>
              <div className="w-1 h-1 rounded-full bg-slate-700"></div>
              <span className="text-[10px] text-slate-500 font-medium">#{id.split('_')[1]?.substring(0, 4)}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
           <button className="text-slate-600 hover:text-white transition-colors">
              <Settings size={14} />
           </button>
        </div>
      </div>
      
      {/* Node Content */}
      <div className="p-5 space-y-6">
        {/* Inbound Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="h-px flex-1 bg-white/5"></div>
             <span className="text-[9px] text-slate-600 uppercase font-black tracking-[0.15em]">Inputs</span>
             <div className="h-px flex-1 bg-white/5"></div>
          </div>
          
          <div className="space-y-3">
            {data.type === 'chain' && (
              <>
                 <div className="flex items-center justify-between relative group py-1">
                    <Handle type="target" position={Position.Left} id="llm" isConnectable={isConnectable} className="!w-3.5 !h-3.5 !-left-[22px] !bg-indigo-600 border-[3px] border-slate-900 shadow-xl transition-all group-hover:scale-125" />
                    <span className="text-[12px] text-slate-400 font-medium group-hover:text-slate-200">Chat Model</span>
                    <Info size={12} className="text-slate-700 hover:text-indigo-400 cursor-help" />
                 </div>
                 <div className="flex items-center justify-between relative group py-1">
                    <Handle type="target" position={Position.Left} id="memory" isConnectable={isConnectable} className="!w-3.5 !h-3.5 !-left-[22px] !bg-purple-600 border-[3px] border-slate-900 shadow-xl transition-all group-hover:scale-125" />
                    <span className="text-[12px] text-slate-400 font-medium group-hover:text-slate-200">Memory</span>
                    <Info size={12} className="text-slate-700 hover:text-purple-400 cursor-help" />
                 </div>
                 <div className="flex items-center justify-between relative group py-1">
                    <Handle type="target" position={Position.Left} id="loader" isConnectable={isConnectable} className="!w-3.5 !h-3.5 !-left-[22px] !bg-blue-600 border-[3px] border-slate-900 shadow-xl transition-all group-hover:scale-125" />
                    <span className="text-[12px] text-slate-400 font-medium group-hover:text-slate-200">Document</span>
                    <Info size={12} className="text-slate-700 hover:text-blue-400 cursor-help" />
                 </div>
              </>
            )}

            {data.label === 'ChatOllama' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[11px] text-slate-400 font-bold">Base URL</label>
                  <input type="text" defaultValue={data.config.baseUrl} className="w-full bg-slate-950/50 p-2.5 rounded-lg border border-white/5 text-[11px] text-indigo-300 font-mono" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] text-slate-400 font-bold">Model Name</label>
                  <input type="text" defaultValue={data.config.modelName} className="w-full bg-slate-950/50 p-2.5 rounded-lg border border-white/5 text-[11px] text-indigo-300 font-mono" />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-[11px] text-slate-400 font-bold tracking-tight">Allow Images</label>
                  <div className="w-8 h-4 bg-slate-800 rounded-full relative p-1 cursor-pointer">
                    <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            )}

            {data.type === 'llm' && data.label !== 'ChatOllama' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[11px] text-slate-400 font-bold flex items-center gap-2">
                    <Cpu size={12} className="text-indigo-500" /> Model Name
                  </label>
                  <select className="w-full bg-slate-950/50 p-2.5 rounded-lg border border-white/5 text-[11px] text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 appearance-none">
                     <option>{data.config.modelName}</option>
                     <option>gpt-4o-mini</option>
                     <option>claude-3-haiku</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] text-slate-400 font-bold lowercase">temperature</label>
                    <span className="text-[11px] font-mono text-indigo-400">0.7</span>
                  </div>
                  <input type="range" min="0" max="1" step="0.1" defaultValue={0.7} className="w-full accent-indigo-500 h-1 bg-slate-800 rounded-full appearance-none cursor-pointer" />
                </div>
              </div>
            )}

            {data.type === 'loader' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[11px] text-slate-400 font-bold">Source Path</label>
                  <input type="text" placeholder="https://..." className="w-full bg-slate-950/50 p-2.5 rounded-lg border border-white/5 text-[11px] text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500/50" />
                </div>
              </div>
            )}

            {data.type === 'chain' && data.label.includes('Vector') && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[11px] text-slate-400 font-bold">API Key</label>
                  <input type="password" placeholder="sk-..." className="w-full bg-slate-950/50 p-2.5 rounded-lg border border-white/5 text-[11px] text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] text-slate-400 font-bold">Model/Index Name</label>
                  <input type="text" placeholder="e.g. text-embedding-ada-002" className="w-full bg-slate-950/50 p-2.5 rounded-lg border border-white/5 text-[11px] text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500/50" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Outbound Section */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-3">
             <div className="h-px flex-1 bg-white/5"></div>
             <span className="text-[9px] text-slate-600 uppercase font-black tracking-[0.15em]">Outputs</span>
             <div className="h-px flex-1 bg-white/5"></div>
          </div>
          <div className="flex items-center justify-between relative group py-1">
              <span className="text-[12px] text-slate-300 font-bold">{data.label} Output</span>
              <Handle type="source" position={Position.Right} id="output" isConnectable={isConnectable} className="!w-4 !h-4 !-right-[24px] !bg-emerald-500 border-[3.5px] border-slate-900 shadow-xl transition-all group-hover:scale-125 hover:bg-emerald-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Utility to merge classes
function cn(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export function Builder() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = NODE_TEMPLATES.filter(tpl => 
    (tpl.label || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (tpl.description || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const nodeTypes = useMemo(() => ({
    custom: NodeComponent,
  }), []);

  const onConnect = useCallback((params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const addNode = (template: any) => {
    const newNode = {
      id: `${template.type}_${Date.now()}`,
      type: 'custom',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { ...template },
    };
    setNodes((nds) => nds.concat(newNode));
    setShowDrawer(false);
  };

  const onSave = () => {
    const savedFlows = JSON.parse(localStorage.getItem('chatflows') || '{}');
    const existingFlow = savedFlows[id!];
    savedFlows[id!] = { 
      id, 
      nodes, 
      edges, 
      name: existingFlow?.name || 'Untitled Flow',
      description: existingFlow?.description || 'No description provided',
      updatedAt: new Date().toISOString() 
    };
    localStorage.setItem('chatflows', JSON.stringify(savedFlows));
  };

  return (
    <div className="flex-1 h-screen flex flex-col bg-slate-950">
      {/* Header */}
      <header className="h-14 flex items-center justify-between px-6 bg-[#0f111a]/80 backdrop-blur-xl border-b border-white/5 z-[60]">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-slate-500 hover:text-slate-300 cursor-pointer transition-colors">Chatflows</span>
              <span className="text-slate-700">/</span>
              <div className="flex items-center gap-2 px-2 py-1 hover:bg-white/5 rounded transition-colors group cursor-pointer">
                <span className="text-slate-100 font-bold tracking-tight">{id?.substring(0, 8) || 'Untitled Flow'}</span>
                <Pencil size={12} className="text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 ml-6">
             <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">v1.2.4</span>
             <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                Live
             </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-900/50 rounded-xl p-1 border border-white/5">
             <button className="p-2 text-slate-400 hover:text-white transition-colors"><Code size={18} /></button>
             <button className="p-2 text-slate-400 hover:text-white transition-colors"><Settings size={18} /></button>
             <button className="p-2 text-slate-400 hover:text-white transition-colors"><Share2 size={18} /></button>
          </div>
          <button onClick={onSave} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/20 transition-all active:scale-95 border border-indigo-400/30">
            <Save size={16} />
            <span>Save Flow</span>
          </button>
        </div>
      </header>

      {/* Editor */}
      <div className="flex-1 relative bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={{ 
            style: { stroke: '#6366f1', strokeWidth: 2 },
            animated: true
          }}
          fitView
          className="bg-transparent"
        >
          <Background color="#1e293b" gap={24} size={1} />
          
          <Panel position="top-left" className="flex flex-col gap-4">
             <button 
              onClick={() => setShowDrawer(true)}
              className="w-14 h-14 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 ring-1 ring-white/20"
             >
                <Plus size={32} />
             </button>
             
             <div className="flex flex-col bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                <button className="p-3 text-slate-400 hover:text-white hover:bg-white/5 border-b border-white/5 transition-colors"><MousePointer2 size={20} /></button>
                <button className="p-3 text-slate-400 hover:text-white hover:bg-white/5 border-b border-white/5 transition-colors"><Plus size={20} /></button>
                <button className="p-3 text-slate-400 hover:text-white hover:bg-white/5 transition-colors"><Database size={20} /></button>
             </div>
          </Panel>

          <Panel position="bottom-left" className="flex items-center gap-4 p-4 bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/5 mb-4 ml-4">
             <div className="flex items-center gap-1">
                <button className="p-1.5 text-slate-400 hover:text-white transition-colors"><ZoomIn size={16} /></button>
                <button className="p-1.5 text-slate-400 hover:text-white transition-colors"><ZoomOut size={16} /></button>
             </div>
             <div className="h-4 w-px bg-white/10"></div>
             <button className="p-1.5 text-slate-400 hover:text-white transition-colors"><Maximize2 size={16} /></button>
             <div className="h-4 w-px bg-white/10"></div>
             <div className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter">100%</div>
          </Panel>

          <Panel position="bottom-right">
             <button 
              onClick={() => setShowChat(!showChat)}
              className="w-14 h-14 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl flex items-center justify-center shadow-2xl transition-all transform hover:scale-110 active:scale-95 relative ring-1 ring-white/20"
             >
                <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 hover:opacity-100 transition-opacity"></div>
                <MessageSquare size={28} />
             </button>
          </Panel>
        </ReactFlow>

        {/* Chat Widget Overlay */}
        <AnimatePresence>
          {showChat && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
              className="absolute right-6 bottom-24 w-80 h-[500px] rounded-2xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-white/10 z-[100] ring-1 ring-white/5"
            >
              <ChatWidget config={{ name: 'Preview Bot' }} onClose={() => setShowChat(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Node Drawer */}
        <AnimatePresence>
          {showDrawer && (
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-4 top-4 bottom-4 w-[400px] bg-[#0d0f17]/95 backdrop-blur-3xl border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] z-[100] rounded-3xl overflow-hidden flex flex-col"
            >
               <div className="p-6 border-b border-white/5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-black tracking-tight text-lg">Nodes Library</h3>
                      <p className="text-[11px] text-slate-500 font-medium uppercase tracking-widest mt-1">Select logic blocks to build your flow</p>
                    </div>
                    <button onClick={() => setShowDrawer(false)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                      <X size={18} />
                    </button>
                  </div>
                  
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input 
                      type="text" 
                      placeholder="Search for nodes, models, loaders..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all"
                    />
                  </div>
               </div>

               <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                  <div className="grid grid-cols-1 gap-3">
                    {filteredTemplates.map((tpl) => (
                      <motion.div 
                        key={tpl.label} 
                        layout
                        onClick={() => addNode(tpl)}
                        className="p-4 bg-slate-900/40 border border-white/5 rounded-2xl cursor-pointer hover:border-indigo-500/40 hover:bg-indigo-500/5 transition-all group relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Plus size={14} className="text-indigo-400" />
                        </div>
                        <div className="flex items-start gap-4">
                           <div className={cn(
                             "w-12 h-12 rounded-xl flex items-center justify-center text-indigo-400 border border-white/5 group-hover:scale-110 transition-transform shadow-lg",
                             tpl.type === 'llm' ? "bg-orange-500/10" : "bg-indigo-500/10"
                           )}>
                              <tpl.icon size={24} />
                           </div>
                           <div className="flex-1 pt-1">
                             <div className="flex items-center gap-2 mb-1">
                               <span className="text-slate-100 font-bold text-sm tracking-tight">{tpl.label}</span>
                               <span className="text-[8px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500 font-black uppercase tracking-widest">{tpl.type}</span>
                             </div>
                             <p className="text-[11px] text-slate-500 group-hover:text-slate-300 transition-colors leading-relaxed line-clamp-2">{tpl.description}</p>
                           </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
               </div>
               
               <div className="p-4 bg-indigo-600/5 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{filteredTemplates.length} Nodes Found</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                    <span className="text-[10px] text-indigo-400 font-black uppercase tracking-widest">Library Updated</span>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
