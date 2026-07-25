import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { DollarSign, Wallet, ArrowUpRight, Percent } from 'lucide-react';

const BudgetChart = ({ budget }) => {
  if (!budget) return null;

  const data = budget.categories;
  const RADIAN = Math.PI / 180;
  
  // Custom label function to prevent overflows
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="text-[10px] font-bold font-mono">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const remaining = budget.total - budget.spent;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Total Cards */}
      <div className="flex flex-col gap-4">
        {/* Total Budget */}
        <div className="glass-card border border-white/10 rounded-3xl p-6 relative overflow-hidden flex items-center justify-between">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full blur-xl pointer-events-none"></div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Total Cap</span>
            <span className="text-3xl font-black text-slate-100 font-mono">₹{budget.total}</span>
          </div>
          <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-blue-400">
            <Wallet className="w-6 h-6" />
          </div>
        </div>

        {/* Total Spent */}
        <div className="glass-card border border-white/10 rounded-3xl p-6 relative overflow-hidden flex items-center justify-between">
          <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/10 rounded-full blur-xl pointer-events-none"></div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Optimized Spent</span>
            <span className="text-3xl font-black text-cyan-400 font-mono">₹{budget.spent}</span>
          </div>
          <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 text-cyan-400">
            <DollarSign className="w-6 h-6 animate-pulse" />
          </div>
        </div>

        {/* Savings Reserve */}
        <div className="glass-card border border-white/10 rounded-3xl p-6 relative overflow-hidden flex items-center justify-between">
          <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl pointer-events-none"></div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Unallocated Contingency</span>
            <span className="text-3xl font-black text-emerald-400 font-mono">₹{remaining}</span>
          </div>
          <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-400">
            <ArrowUpRight className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Visual Pie Chart */}
      <div className="glass-card border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center">
        <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest block self-start mb-2">Cost Allocation</span>
        
        <div className="w-full h-52 relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={75}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(10, 15, 30, 0.8)" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0a0f1d', 
                  borderColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontFamily: 'Outfit, sans-serif'
                }}
                formatter={(value) => [`₹${value}`, 'Amount']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Mini legend */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mt-2">
          {data.map((item, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
              <span className="text-[10px] text-slate-400 font-medium">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Expense list */}
      <div className="glass-card border border-white/10 rounded-3xl p-6 flex flex-col justify-between">
        <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest block mb-4">Itemized Swarm Ledger</span>
        
        <div className="flex-1 overflow-y-auto max-h-56 pr-1 flex flex-col gap-2">
          {budget.breakdown.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
              <div>
                <span className="text-[10px] font-bold text-slate-200 block truncate max-w-[140px]">{item.item}</span>
                <span className="text-[8px] text-slate-400 uppercase tracking-wider">{item.category} • {item.date}</span>
              </div>
              <span className="text-xs font-bold text-slate-200 font-mono">₹{item.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetChart;
