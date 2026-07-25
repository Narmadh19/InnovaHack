import React from 'react';
import { Sparkles, Circle, ShieldAlert, Cpu } from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { sessionId, progress, isGenerating } = useTravel();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/10 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3 group">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-xl blur-md opacity-70 group-hover:opacity-100 transition-all duration-300"></div>
          <div className="relative bg-[#0d1224] border border-white/20 p-2.5 rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
          </div>
        </div>
        <div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            TravelGenie <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">AI</span>
          </span>
          <div className="text-[10px] text-cyan-400/70 tracking-widest uppercase font-semibold">Autonomous Multi-Agent</div>
        </div>
      </Link>

      <div className="flex items-center gap-4">
        {sessionId && (
          <div className="hidden md:flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-900/60 border border-white/5 text-xs text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Session: <span className="font-mono text-cyan-300">{sessionId}</span></span>
            <span className="w-1 h-1 rounded-full bg-slate-700"></span>
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isGenerating ? 'bg-cyan-500 animate-pulse' : 'bg-emerald-500'}`}></span>
              <span>{isGenerating ? `Running Swarm (${progress}%)` : 'Ready'}</span>
            </div>
          </div>
        )}


      </div>
    </nav>
  );
};

export default Navbar;
