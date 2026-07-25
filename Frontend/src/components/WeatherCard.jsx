import React from 'react';
import { Sun, CloudRain, Wind, Droplets, Thermometer, CheckSquare } from 'lucide-react';

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Current Weather Overview */}
      <div className="glass-card border border-white/10 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>
        
        <div>
          <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest block mb-1">Destination Forecast</span>
          <h3 className="text-xl font-bold text-slate-100 mb-4">{weather.destination}</h3>
          
          <div className="flex items-center gap-4 my-2">
            <Sun className="w-16 h-16 text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]" />
            <div>
              <span className="text-4xl font-black text-slate-100 font-mono">{weather.avgTemp}</span>
              <span className="text-xs text-slate-400 block mt-1">{weather.condition}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-4 mt-6">
          <div className="text-center">
            <span className="text-[9px] text-slate-400 block uppercase">High / Low</span>
            <span className="text-xs font-bold text-slate-200 font-mono mt-0.5 block">{weather.highTemp} / {weather.lowTemp}</span>
          </div>
          <div className="text-center border-x border-white/5">
            <span className="text-[9px] text-slate-400 block uppercase">Wind Speed</span>
            <span className="text-xs font-bold text-slate-200 font-mono mt-0.5 block">{weather.wind}</span>
          </div>
          <div className="text-center">
            <span className="text-[9px] text-slate-400 block uppercase">Rain Prob.</span>
            <span className="text-xs font-bold text-slate-200 font-mono mt-0.5 block">{weather.rainProb}</span>
          </div>
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div className="glass-card border border-white/10 rounded-3xl p-6 flex flex-col justify-between">
        <div>
          <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest block mb-4">7-Day outlook</span>
          <div className="flex flex-col gap-3">
            {weather.forecast.slice(0, 5).map((day, idx) => (
              <div key={idx} className="flex items-center justify-between py-1.5 border-b border-white/[0.03] last:border-0">
                <span className="text-xs font-bold text-slate-300 w-10">{day.day}</span>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 flex-1 px-4">
                  {day.condition.includes('Rain') ? (
                    <CloudRain className="w-3.5 h-3.5 text-blue-400" />
                  ) : (
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                  )}
                  <span>{day.condition}</span>
                </div>
                <span className="text-xs font-bold text-slate-200 font-mono">{day.temp}°C</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Packing Smart suggestions */}
      <div className="glass-card border border-white/10 rounded-3xl p-6">
        <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest block mb-4">AI Packing Intelligence</span>
        
        <div className="flex flex-col gap-4">
          {weather.packingSuggestions.map((category, idx) => (
            <div key={idx}>
              <h5 className="text-xs font-bold text-slate-200 mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                {category.category}
              </h5>
              <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                {category.items.map((item, i) => (
                  <li key={i} className="text-[10px] text-slate-400 flex items-start gap-1">
                    <CheckSquare className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="truncate" title={item}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
