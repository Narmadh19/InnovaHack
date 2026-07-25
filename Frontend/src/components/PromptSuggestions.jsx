import React from 'react';
import { Compass, Flame, Leaf, Snowflake, Compass as Globe } from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import { useNavigate } from 'react-router-dom';

const PromptSuggestions = ({ onSelect }) => {
  const { startPlanning, isGenerating } = useTravel();
  const navigate = useNavigate();

  const suggestions = [
    {
      title: 'Tokyo Tech & Tradition',
      prompt: 'Plan a 5-day trip to Tokyo on a ₹30k budget. Focus on modern anime hotspots, traditional shrines, and luxury hotels in central Shinjuku.',
      desc: 'Shinjuku, Akihabara, Senso-ji temple and digital museums.',
      budget: '₹30,000',
      duration: '5 Days',
      icon: Flame,
      color: 'from-orange-500/20 to-red-500/10 border-orange-500/30 text-orange-400'
    },
    {
      title: 'Kyoto Cultural Ryokan',
      prompt: 'Plan a 7-day escape to Kyoto, Japan, focusing on traditional ryokans, tea ceremonies, and bamboo forests with a ₹50,000 budget.',
      desc: 'Bamboo forest, ancient shrines, traditional food, and tea ceremonies.',
      budget: '₹50,000',
      duration: '7 Days',
      icon: Leaf,
      color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400'
    },
    {
      title: 'Iceland Northern Lights',
      prompt: 'Create a 6-day road trip around Iceland under ₹40,000. Include glacier hiking, hot springs, and prime spots for viewing the Aurora Borealis.',
      desc: 'Glaciers, volcanic springs, waterfalls, and northern lights tour.',
      budget: '₹40,000',
      duration: '6 Days',
      icon: Snowflake,
      color: 'from-blue-500/20 to-cyan-500/10 border-blue-500/30 text-cyan-400'
    },
    {
      title: 'Paris Art & Gastronomy',
      prompt: 'Design a romantic 5-day Paris itinerary with a ₹45,000 budget. Prioritize Louvre access, fine dining, and boutique hotels near the Seine River.',
      desc: 'Louvre, Eiffel Tower views, Seine dinner cruise, and classic bakeries.',
      budget: '₹45,000',
      duration: '5 Days',
      icon: Globe,
      color: 'from-purple-500/20 to-pink-500/10 border-purple-500/30 text-purple-400'
    }
  ];

  const handleSelect = (promptText) => {
    if (isGenerating) return;
    if (onSelect) {
      onSelect(promptText);
    } else {
      startPlanning(promptText);
      navigate('/dashboard');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mt-8">
      {suggestions.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.title}
            type="button"
            onClick={() => handleSelect(item.prompt)}
            disabled={isGenerating}
            className={`glass-card glass-card-hover text-left p-5 rounded-2xl border bg-gradient-to-br ${item.color} flex gap-4 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-center h-12 w-12 shrink-0">
              <Icon className="w-6 h-6 text-slate-200" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1 gap-2">
                <h4 className="text-sm font-semibold text-slate-100 truncate">{item.title}</h4>
                <div className="flex gap-1.5 shrink-0">
                  <span className="text-[10px] font-bold bg-white/5 px-2 py-0.5 rounded-full border border-white/5 text-slate-300">{item.duration}</span>
                  <span className="text-[10px] font-bold bg-white/5 px-2 py-0.5 rounded-full border border-white/5 text-cyan-400">{item.budget}</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{item.desc}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default PromptSuggestions;
