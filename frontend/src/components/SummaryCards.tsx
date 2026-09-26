import React from 'react';
import { Anomaly } from '../types/weather';
import { AlertTriangle, Flame, Calendar, MapPin, Gauge } from 'lucide-react';

interface SummaryCardsProps {
  anomalies: Anomaly[];
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ anomalies }) => {
  const activeCount = anomalies.length;
  const severeCount = anomalies.filter(a => a.severity === 'SEVERE').length;
  
  const highestRiskAnomaly = [...anomalies].sort((a, b) => b.anomaly_score - a.anomaly_score)[0] || anomalies[0];
  const avgScore = anomalies.length > 0 
    ? (anomalies.reduce((acc, curr) => acc + curr.anomaly_score, 0) / anomalies.length).toFixed(2)
    : '0.00';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
      {/* Card 1: Active Anomalies */}
      <div className="bg-navy-900 border border-navy-700 rounded-lg p-3.5 relative overflow-hidden shadow-md group hover:border-cyan-500/50 transition">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Anomalies</span>
          <div className="p-1.5 rounded bg-cyan-500/10 text-cyan-400">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-2xl font-black text-white">{activeCount}</span>
          <span className="text-[10px] text-cyan-400/80 bg-navy-800 px-1.5 py-0.5 rounded font-mono">3-10 Day Window</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">Tracked across India</p>
        <span className="absolute bottom-1 right-2 text-[9px] text-slate-500 font-mono">DEMO DATA</span>
      </div>

      {/* Card 2: Severe Events */}
      <div className="bg-navy-900 border border-navy-700 rounded-lg p-3.5 relative overflow-hidden shadow-md group hover:border-rose-500/50 transition">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Severe Events</span>
          <div className="p-1.5 rounded bg-rose-500/10 text-rose-400">
            <Flame className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-2xl font-black text-rose-400">{severeCount}</span>
          <span className="text-[10px] text-rose-400 bg-rose-500/10 border border-rose-500/20 px-1.5 py-0.5 rounded font-semibold">HIGH ALERT</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">Rainfall & Heatwave</p>
        <span className="absolute bottom-1 right-2 text-[9px] text-slate-500 font-mono">DEMO DATA</span>
      </div>

      {/* Card 3: Forecast Window */}
      <div className="bg-navy-900 border border-navy-700 rounded-lg p-3.5 relative overflow-hidden shadow-md group hover:border-cyan-500/50 transition">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Forecast Window</span>
          <div className="p-1.5 rounded bg-blue-500/10 text-blue-400">
            <Calendar className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-2xl font-black text-white">10 <span className="text-sm font-semibold text-slate-300">Days</span></span>
          <span className="text-[10px] text-blue-400/80 bg-navy-800 px-1.5 py-0.5 rounded font-mono">12 km Grid</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">Global Ensemble Horizon</p>
        <span className="absolute bottom-1 right-2 text-[9px] text-slate-500 font-mono">DEMO DATA</span>
      </div>

      {/* Card 4: Highest Risk Region */}
      <div className="bg-navy-900 border border-navy-700 rounded-lg p-3.5 relative overflow-hidden shadow-md group hover:border-amber-500/50 transition">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Highest Risk Region</span>
          <div className="p-1.5 rounded bg-amber-500/10 text-amber-400">
            <MapPin className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2">
          <span className="text-sm font-bold text-amber-300 block truncate">{highestRiskAnomaly ? highestRiskAnomaly.region : 'N/A'}</span>
          <div className="flex items-center justify-between mt-0.5">
            <span className="text-[11px] text-slate-300 font-medium">{highestRiskAnomaly ? highestRiskAnomaly.event_type : 'N/A'}</span>
            <span className="text-[10px] text-amber-400 font-mono font-bold">Score: {highestRiskAnomaly ? highestRiskAnomaly.anomaly_score : '0.0'}</span>
          </div>
        </div>
        <span className="absolute bottom-1 right-2 text-[9px] text-slate-500 font-mono">DEMO DATA</span>
      </div>

      {/* Card 5: Average Anomaly Score */}
      <div className="bg-navy-900 border border-navy-700 rounded-lg p-3.5 relative overflow-hidden shadow-md group hover:border-cyan-500/50 transition">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Avg Anomaly Score</span>
          <div className="p-1.5 rounded bg-cyan-500/10 text-cyan-400">
            <Gauge className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-2xl font-black text-cyan-400">{avgScore}</span>
          <span className="text-[10px] text-slate-300 bg-navy-800 px-1.5 py-0.5 rounded font-mono">Z-Score Norm</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">Range: 0.00 (Norm) to 1.00</p>
        <span className="absolute bottom-1 right-2 text-[9px] text-slate-500 font-mono">DEMO DATA</span>
      </div>
    </div>
  );
};
