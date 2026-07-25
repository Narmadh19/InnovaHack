import React, { useEffect, useRef } from 'react';
import { Terminal, Cpu } from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import { motion, AnimatePresence } from 'framer-motion';

const ActionLog = () => {
  const { logs } = useTravel();
  const logEndRef = useRef(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="glass-card border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col h-[320px]">
      <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
        <Terminal className="w-5 h-5 text-cyan-400" />
        <div>
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
            Agent Swarm Logs
          </h3>
          <p className="text-[10px] text-slate-400">Live feed from autonomous planning sub-agents</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-2 font-mono text-xs select-none">
        <AnimatePresence initial={false}>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-3 py-1.5 px-3 rounded-lg hover:bg-white/[0.02] transition-colors"
            >
              <span className="text-[10px] text-slate-500 shrink-0 select-none">{log.time}</span>
              <span className="text-cyan-400 shrink-0 font-bold">[{log.stage.toUpperCase()}]</span>
              <span className="text-slate-300 leading-relaxed break-words">{log.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {logs.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-2">
            <Cpu className="w-8 h-8 opacity-40 animate-pulse text-cyan-500" />
            <span className="text-xs">No active logs. Standing by.</span>
          </div>
        )}
        <div ref={logEndRef} />
      </div>
    </div>
  );
};

export default ActionLog;
