import React from 'react';
import { AmplitudeChart } from '../components/AmplitudeChart';
import { ShieldAlert, Scale, CheckCircle2, Info } from 'lucide-react';

export const PhysicsPage: React.FC = () => {
  return (
    <div className="space-y-4 text-xs">
      <div className="bg-navy-900 border border-navy-700 rounded-xl p-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-white">Physics-Informed Validation & Loss Constraints</h1>
            <p className="text-slate-400">Thermodynamic Consistency, Moisture Budget Bounds & Extreme Peak Preservation</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded font-mono font-bold">
            PHYSICS CONCEPT VALIDATED
          </span>
        </div>
      </div>

      <AmplitudeChart />

      {/* Physics Loss Function Card */}
      <div className="bg-navy-900 border border-navy-700 rounded-xl p-5 shadow-xl space-y-3">
        <div className="flex items-center space-x-2 border-b border-navy-700 pb-2">
          <Scale className="w-5 h-5 text-cyan-400" />
          <h2 className="text-sm font-bold text-white uppercase">Physics-Informed Composite Loss Formulation</h2>
        </div>

        <div className="bg-navy-950 p-4 rounded-lg border border-navy-800 font-mono text-center text-cyan-400 text-sm font-bold">
          Loss_total = Loss_prediction + λ1 * Loss_physics + λ2 * Loss_amplitude
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-navy-950 p-3 rounded border border-navy-800 space-y-1">
            <span className="text-[10px] text-cyan-400 font-bold uppercase">1. Prediction Loss (Loss_pred)</span>
            <p className="text-slate-300">Mean Squared Error (MSE) between forecast state vectors and observational ground truth.</p>
            <span className="text-[10px] text-slate-500 font-mono">Current Val: 0.0350</span>
          </div>

          <div className="bg-navy-950 p-3 rounded border border-navy-800 space-y-1">
            <span className="text-[10px] text-emerald-400 font-bold uppercase">2. Physics Loss (Loss_physics)</span>
            <p className="text-slate-300">Penalty for violating Clausius-Clapeyron atmospheric moisture capacity and mass conservation equations.</p>
            <span className="text-[10px] text-slate-500 font-mono">Current Val: 0.0000 (Plausible)</span>
          </div>

          <div className="bg-navy-950 p-3 rounded border border-navy-800 space-y-1">
            <span className="text-[10px] text-amber-400 font-bold uppercase">3. Extreme Amplitude Loss (Loss_amp)</span>
            <p className="text-slate-300">Penalty applied when predicted maximum precipitation peak is smoothed below severe convective threshold.</p>
            <span className="text-[10px] text-slate-500 font-mono">Current Val: 0.0120</span>
          </div>
        </div>
      </div>
    </div>
  );
};
