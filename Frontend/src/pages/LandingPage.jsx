import React, { useState } from 'react';
import ChatInput from '../components/ChatInput';
import PromptSuggestions from '../components/PromptSuggestions';
import { Sparkles, Compass, Shield, Zap } from 'lucide-react';

const LandingPage = () => {
  const [promptText, setPromptText] = useState('');

  const handleSelectSuggestion = (text) => {
    setPromptText(text);
  };

  return (
    <div className="relative min-h-[calc(100vh-140px)] flex flex-col items-center justify-center py-10 px-4">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-blue-600/10 to-cyan-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse-glow"></div>

      <div className="w-full max-w-4xl text-center z-10">
        {/* Swarm badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400 mb-6 tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
          <span>Next-Generation Travel Agent Swarm</span>
        </div>

        {/* Hero title */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4">
          TravelGenie <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">AI</span>
        </h1>
        
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Unlock fully autonomous travel planning. Enter your dream destination, budget constraints, and active preferences. Watch our agent swarm scan flights, book properties, map weather, and craft detailed timelines in seconds.
        </p>

        {/* Interactive Chat Prompt */}
        <div className="w-full mb-6">
          <ChatInput initialPrompt={promptText} />
        </div>

        {/* Suggested Prompt Cards */}
        <div className="w-full">
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-4">Recommended prompts</div>
          <PromptSuggestions onSelect={handleSelectSuggestion} />
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mt-16 border-t border-white/5 pt-10">
          <div className="flex flex-col items-center p-4">
            <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-blue-400 mb-3">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-200 mb-1">Autonomous Search</h3>
            <p className="text-[11px] text-slate-500 text-center leading-relaxed">Agents research flights and accommodations based on real ratings and coordinates.</p>
          </div>

          <div className="flex flex-col items-center p-4">
            <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 text-cyan-400 mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-200 mb-1">Instant Synthesis</h3>
            <p className="text-[11px] text-slate-500 text-center leading-relaxed">Custom packing lists, weather models, and hour-by-hour itineraries mapped in seconds.</p>
          </div>

          <div className="flex flex-col items-center p-4">
            <div className="p-3 bg-purple-500/10 rounded-2xl border border-purple-500/20 text-purple-400 mb-3">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-200 mb-1">Budget Optimization</h3>
            <p className="text-[11px] text-slate-500 text-center leading-relaxed">Dynamic financial adjustments leave safety buffers and maximize excursion savings.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
