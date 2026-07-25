import React, { useState } from 'react';
import { Send, Mic, Sparkles, Loader2 } from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import { useNavigate } from 'react-router-dom';

const ChatInput = ({ initialPrompt = '' }) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [isListening, setIsListening] = useState(false);
  const { startPlanning, isGenerating } = useTravel();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;
    startPlanning(prompt);
    navigate('/dashboard');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const toggleMic = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Mock voice detection
      setTimeout(() => {
        setPrompt("Plan a luxury 7-day escape to Kyoto, Japan, focusing on traditional ryokans, tea ceremonies, and bamboo forests with a $6,000 budget.");
        setIsListening(false);
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-3xl mx-auto">
      {/* Outer Glow container */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-purple-500/10 rounded-2xl blur-xl opacity-80"></div>
      
      <div className="relative glass-card border border-white/10 rounded-2xl p-2 flex items-center shadow-2xl">
        <button
          type="button"
          onClick={toggleMic}
          className={`p-3 rounded-xl flex items-center justify-center transition-all ${
            isListening 
              ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
          }`}
          title={isListening ? "Listening (Synthesizing...)" : "Voice Search (UI Mock)"}
        >
          <Mic className="w-5 h-5" />
        </button>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Where would you like to go? e.g. Plan a 5-day trip to Tokyo on a $5k budget..."
          className="flex-1 bg-transparent border-0 ring-0 focus:ring-0 outline-none text-slate-100 placeholder-slate-400 px-4 py-3 h-14 resize-none align-middle text-sm scrollbar-none"
          disabled={isGenerating}
        />

        <button
          type="submit"
          disabled={!prompt.trim() || isGenerating}
          className="glow-btn bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-medium text-sm px-5 py-3 rounded-xl flex items-center gap-2 border border-cyan-400/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-cyan-500/20"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Engaging Swarm</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-white" />
              <span>Genie Plan</span>
            </>
          )}
        </button>
      </div>

      {isListening && (
        <div className="absolute -bottom-7 left-4 text-[10px] text-red-400 font-semibold tracking-wider flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-ping"></span>
          Voice agent active. Speak now...
        </div>
      )}
    </form>
  );
};

export default ChatInput;
