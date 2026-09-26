import React from 'react';
import { SphericalGnnView } from '../components/SphericalGnnView';
import { Cpu, Network, Sparkles, CheckCircle2 } from 'lucide-react';

export const GnnPage: React.FC = () => {
  return (
    <div className="space-y-4 text-xs">
      <div className="bg-navy-900 border border-navy-700 rounded-xl p-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-white">Spherical Graph Neural Network (GNN) Concept Workspace</h1>
            <p className="text-slate-400">MeshGraphNet / Icosahedral Non-Euclidean Graph Convolutions</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
          <span className="text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded font-mono font-bold">
            PROTOTYPE GNN SIMULATION
          </span>
        </div>
      </div>

      <SphericalGnnView />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-navy-900 border border-navy-700 rounded-xl p-4 shadow-xl space-y-2">
          <h3 className="font-bold text-white text-xs uppercase flex items-center space-x-1.5">
            <Network className="w-4 h-4 text-cyan-400" />
            <span>Icosahedral Mesh Advantages</span>
          </h3>
          <ul className="text-slate-300 space-y-1.5 list-disc list-inside leading-relaxed">
            <li>Eliminates polar distortions and coordinate singularities inherent in standard lat/lon grids.</li>
            <li>Enforces uniform spatial neighbor connectivity across the entire unit sphere $\mathbb{S}^2$.</li>
            <li>Allows message passing layers to capture long-range teleconnections across continents.</li>
          </ul>
        </div>

        <div className="bg-navy-900 border border-navy-700 rounded-xl p-4 shadow-xl space-y-2">
          <h3 className="font-bold text-white text-xs uppercase flex items-center space-x-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>PyTorch / DGL Swap Readiness</span>
          </h3>
          <p className="text-slate-300 leading-relaxed">
            The backend API contracts (`/api/anomalies`, `/api/trajectory/{id}`) strictly decoupling input/output specifications.
            When a PyTorch Geometric model is trained, `anomaly_detector.py` can be swapped with zero UI changes.
          </p>
          <div className="bg-navy-950 p-2.5 rounded border border-navy-800 text-[11px] font-mono text-cyan-400">
            PyTorch Layer: SphericalGraphConv(in_feats=16, out_feats=64)
          </div>
        </div>
      </div>
    </div>
  );
};
