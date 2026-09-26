import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { ShieldCheck, Info } from 'lucide-react';

const AMPLITUDE_DATA = [
  { day: 'Day 1', original: 65, smoothed: 40, preserved: 64 },
  { day: 'Day 2', original: 95, smoothed: 58, preserved: 92 },
  { day: 'Day 3', original: 140, smoothed: 80, preserved: 138 },
  { day: 'Day 4', original: 185, smoothed: 105, preserved: 182 },
  { day: 'Day 5 (Peak)', original: 215, smoothed: 118, preserved: 212 },
  { day: 'Day 6', original: 190, smoothed: 110, preserved: 187 },
  { day: 'Day 7', original: 125, smoothed: 82, preserved: 123 },
  { day: 'Day 8', original: 75, smoothed: 50, preserved: 74 },
  { day: 'Day 9', original: 40, smoothed: 28, preserved: 39 },
  { day: 'Day 10', original: 18, smoothed: 15, preserved: 18 },
];

export const AmplitudeChart: React.FC = () => {
  return (
    <div className="bg-navy-900 border border-navy-700 rounded-xl p-5 shadow-xl text-xs space-y-3">
      <div className="flex flex-wrap items-center justify-between border-b border-navy-700 pb-3">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          <div>
            <h2 className="text-sm font-bold text-white">Extreme Amplitude Preservation Model</h2>
            <p className="text-[11px] text-slate-400">Targeting Peak Intensity Retention vs Standard MSE Loss Smoothing</p>
          </div>
        </div>

        <span className="text-[10px] text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 rounded font-mono font-semibold">
          Proposed AI Objective Concept
        </span>
      </div>

      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={AMPLITUDE_DATA} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1C2541" />
            <XAxis dataKey="day" stroke="#94A3B8" tick={{ fontSize: 11 }} />
            <YAxis stroke="#94A3B8" tick={{ fontSize: 11 }} label={{ value: 'Precipitation (mm)', angle: -90, position: 'insideLeft', fill: '#94A3B8', fontSize: 11 }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0B132B', borderColor: '#3A506B', borderRadius: '0.5rem', color: '#F8FAFC' }}
            />
            <Legend wrapperStyle={{ paddingTop: '8px', fontSize: '11px' }} />
            <Line type="monotone" dataKey="original" name="Observed Peak Extreme (True Signal)" stroke="#EF4444" strokeWidth={3} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="smoothed" name="Standard MSE Loss (Smoothed Peak Loss)" stroke="#64748B" strokeWidth={2} strokeDasharray="5 5" />
            <Line type="monotone" dataKey="preserved" name="Proposed Amplitude-Preserved Target" stroke="#00F5D4" strokeWidth={2.5} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-navy-950 p-3 rounded-lg border border-navy-800 text-[11px] text-slate-300 flex items-start space-x-2">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-white block mb-0.5">Methodological Rationale:</span>
          <p>
            Standard Mean Squared Error (MSE) loss functions over global NWP grids suffer from severe peak variance attenuation, smoothing out extreme localized convective rainfall peaks.
            Our proposed architecture incorporates an explicit high-order moment loss term (Loss_amp) to preserve critical extreme amplitude spikes.
          </p>
        </div>
      </div>
    </div>
  );
};
