import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Compass, 
  Activity, 
  Plane, 
  Hotel, 
  CloudSun, 
  CircleDollarSign, 
  CalendarDays, 
  FileCheck2,
  Lock
} from 'lucide-react';
import { useTravel } from '../context/TravelContext';

const Sidebar = () => {
  const { sessionId } = useTravel();

  const menuItems = [
    { name: 'TravelGenie', path: '/', icon: Compass, requireSession: false },
    { name: 'Agent Dashboard', path: '/dashboard', icon: Activity, requireSession: true },
    { name: 'Flight Swarm', path: '/flights', icon: Plane, requireSession: true },
    { name: 'Hotel Swarm', path: '/hotels', icon: Hotel, requireSession: true },
    { name: 'Weather Hub', path: '/weather', icon: CloudSun, requireSession: true },
    { name: 'Budget Optimizer', path: '/budget', icon: CircleDollarSign, requireSession: true },
    { name: 'Itinerary Builder', path: '/itinerary', icon: CalendarDays, requireSession: true },
    { name: 'Consolidated Report', path: '/report', icon: FileCheck2, requireSession: true },
  ];

  return (
    <aside className="fixed left-0 top-[73px] bottom-0 w-64 glass-panel border-r border-white/10 p-4 hidden md:flex flex-col justify-between z-40">
      <div className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isLocked = item.requireSession && !sessionId;
          
          if (isLocked) {
            return (
              <div 
                key={item.name}
                className="flex items-center justify-between px-4 py-3.5 rounded-xl text-slate-500 bg-transparent border border-transparent cursor-not-allowed group transition-colors duration-200"
                title="Please enter a prompt and start planning to unlock pages."
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-slate-600" />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <Lock className="w-3.5 h-3.5 text-slate-600" />
              </div>
            );
          }

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 relative group
                ${isActive 
                  ? 'text-cyan-400 bg-gradient-to-r from-blue-500/10 to-cyan-500/5 border border-cyan-500/20' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'}
              `}
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                  <span>{item.name}</span>
                  {isActive && (
                    <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-glow"></div>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>

      <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-950/40 to-cyan-950/20 border border-white/5 flex flex-col gap-2.5">
        <div className="text-[10px] uppercase font-bold text-cyan-400/80 tracking-wider">Multi-Agent Swarm</div>
        <div className="text-xs text-slate-400 leading-relaxed">
          Active status: <span className="text-emerald-400 font-semibold">8 agents operational</span>. Standing by for instructions.
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
