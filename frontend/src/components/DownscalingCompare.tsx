import React, { useState } from 'react';
import { Layers3, ArrowRight, Sparkles, RefreshCw, Zap } from 'lucide-react';

export const DownscalingCompare: React.FC = () => {
  const [resolutionMode, setResolutionMode] = useState<'both' | 'coarse' | 'fine'>('both');

  return (
    <div className="bg-navy-900 border border-navy-700 rounded-xl p-5 shadow-xl text-xs">
      <div className="flex flex-wrap items-center justify-between border-b border-navy-700 pb-3 mb-4">
        <div className="flex items-center space-x-2">
          <Layers3 className="w-5 h-5 text-cyan-400" />
          <div>
            <h2 className="text-sm font-bold text-white">12 km → 5 km AI Downscaling Module</h2>
            <p className="text-[11px] text-slate-400">Global NWP Grid Spatial Refinement to Local Impact Footprint</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
          <span className="text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded font-mono font-semibold">
            Prototype Downscaling Simulation
          </span>
          <span className="text-[10px] text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 rounded font-mono font-semibold">
            Future: Conditional Diffusion Model
          </span>
        </div>
      </div>

      {/* Grid Comparison Layout */}
      <div className="grid grid-cols-1 md:grid-cols-11 gap-3 items-center">
        {/* Coarse Grid (12 km) */}
        <div className="md:col-span-5 bg-navy-950 border border-navy-800 rounded-lg p-3.5 relative">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-slate-200">12 km Global NWP Grid</span>
            <span className="text-[10px] font-mono text-slate-400 bg-navy-800 px-1.5 py-0.5 rounded">Coarse Mesh</span>
          </div>

          {/* Visual 12km Grid Representation */}
          <div className="grid grid-cols-4 gap-1.5 h-44 p-2 bg-navy-900 rounded border border-navy-800 relative overflow-hidden">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className={`rounded flex flex-col items-center justify-center transition-all ${
                  [5, 6, 9, 10].includes(i)
                    ? 'bg-rose-500/30 border border-rose-500/50 text-rose-300 font-bold'
                    : 'bg-navy-800/80 border border-navy-700/50 text-slate-500'
                }`}
              >
                <span className="text-[9px] font-mono">{[5, 6, 9, 10].includes(i) ? '180mm' : '22mm'}</span>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-slate-400 mt-2">
            Coarse resolution averages extreme precipitation across 144 km² cell area.
          </p>
        </div>

        {/* Downscaling Transformation Pipeline */}
        <div className="md:col-span-1 flex flex-col items-center justify-center py-2">
          <div className="w-9 h-9 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-md">
            <ArrowRight className="w-5 h-5 hidden md:block" />
            <RefreshCw className="w-5 h-5 md:hidden animate-spin" />
          </div>
          <span className="text-[9px] font-mono font-bold text-cyan-400 mt-1 text-center">
            Conditional Diffusion
          </span>
        </div>

        {/* Fine Localized Grid (5 km) */}
        <div className="md:col-span-5 bg-navy-950 border border-cyan-500/30 rounded-lg p-3.5 relative">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-cyan-400">5 km Localized Impact Grid</span>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20">
              High Resolution
            </span>
          </div>

          {/* Visual 5km Fine Mesh Representation */}
          <div className="grid grid-cols-8 gap-0.5 h-44 p-2 bg-navy-900 rounded border border-navy-800 relative overflow-hidden">
            {Array.from({ length: 64 }).map((_, i) => {
              const row = Math.floor(i / 8);
              const col = i % 8;
              const isCenter = row >= 2 && row <= 5 && col >= 2 && col <= 5;
              const isPeak = row >= 3 && row <= 4 && col >= 3 && col <= 4;

              return (
                <div
                  key={i}
                  className={`rounded-[2px] flex items-center justify-center transition-all ${
                    isPeak
                      ? 'bg-rose-500 text-navy-950 font-black text-[8px]'
                      : isCenter
                      ? 'bg-amber-500/40 border border-amber-500/50 text-amber-200 text-[7px]'
                      : 'bg-navy-800/60 border border-navy-700/30 text-slate-600 text-[6px]'
                  }`}
                >
                  {isPeak ? '215' : isCenter ? '140' : '15'}
                </div>
              );
            })}
          </div>

          <p className="text-[10px] text-cyan-400/90 mt-2">
            Downscaled representation resolves micro-scale convective intense precipitation peaks.
          </p>
        </div>
      </div>

      {/* Conceptual Pipeline Card */}
      <div className="mt-4 bg-navy-950/80 p-3 rounded-lg border border-navy-800 flex flex-wrap items-center justify-between text-[11px] text-slate-300">
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Pipeline: <strong>12 km NWP Field</strong> → Crop Anomaly Region → <strong>Conditional Diffusion Model</strong> → High-Res Field → <strong>5 km Impact Footprint</strong></span>
        </div>
        <span className="text-amber-400 font-mono font-semibold text-[10px] mt-1 sm:mt-0">Preserves Peak Extremes</span>
      </div>
    </div>
  );
};
