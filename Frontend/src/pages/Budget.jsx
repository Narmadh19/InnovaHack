import React from 'react';
import { useTravel } from '../context/TravelContext';
import BudgetChart from '../components/BudgetChart';
import { CircleDollarSign, ArrowRight, Lock, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Budget = () => {
  const { budget, sessionId } = useTravel();
  const navigate = useNavigate();

  if (!sessionId) {
    return (
      <div className="glass-card border border-white/10 rounded-3xl p-12 text-center flex flex-col items-center justify-center gap-4 py-20">
        <Lock className="w-12 h-12 text-slate-600 opacity-60" />
        <h3 className="text-lg font-bold text-slate-200">Budget Optimizer Locked</h3>
        <p className="text-xs text-slate-400 max-w-sm">
          Please initialize the agent swarm on the homepage first to allocate budget resources.
        </p>
        <Link to="/" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wide">
          Unlock Swarm
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 py-4">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-100 flex items-center gap-2">
            <CircleDollarSign className="w-6 h-6 text-cyan-400" />
            Budget Optimization Swarm
          </h2>
          <p className="text-xs text-slate-400">Allocating expenditures and tracking dynamic currency reserves</p>
        </div>

        <button 
          onClick={() => navigate('/itinerary')}
          className="glow-btn px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-bold text-xs tracking-wider uppercase flex items-center gap-2 self-start"
        >
          <span>View Day Itinerary</span>
          <ArrowRight className="w-4 h-4 text-slate-950" />
        </button>
      </div>

      {/* Optimization details alert */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-cyan-950/20 to-transparent border border-white/5 flex items-start gap-3">
        <div className="p-2 bg-cyan-500/10 rounded-xl text-cyan-400 shrink-0">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-200 mb-0.5">Budget Optimized Successfully</h4>
          <p className="text-[10px] text-slate-400 leading-relaxed">
            Our financial sub-agents performed 15 iterations comparing airline fares, hotel packages, and estimated local dining averages. We reserved a <strong>14.4% contingency fund</strong> (₹{budget.total - budget.spent}) for currency swings or unplanned activities.
          </p>
        </div>
      </div>

      {/* Main Budget Chart Component */}
      <BudgetChart budget={budget} />
    </div>
  );
};

export default Budget;
