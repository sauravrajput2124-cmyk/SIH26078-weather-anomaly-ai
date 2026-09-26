import React from 'react';
import { Cpu, Network, Globe, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

export const SphericalGnnView: React.FC = () => {
  return (
    <div className="bg-navy-900 border border-navy-700 rounded-xl p-5 shadow-xl text-xs space-y-4">
      <div className="flex flex-wrap items-center justify-between border-b border-navy-700 pb-3">
        <div className="flex items-center space-x-2">
          <Cpu className="w-5 h-5 text-cyan-400" />
          <div>
            <h2 className="text-sm font-bold text-white">Spherical Graph Neural Network Architecture</h2>
            <p className="text-[11px] text-slate-400">Non-Euclidean Global Atmospheric Mesh Graph Representation</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
          <span className="text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded font-mono font-semibold">
            Prototype GNN Simulation
          </span>
          <span className="text-[10px] text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 rounded font-mono font-semibold">
            Replaceable with PyTorch / DGL Model
          </span>
        </div>
      </div>

      {/* Process Workflow Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 text-center">
        <div className="bg-navy-950 p-3 rounded-lg border border-navy-800 flex flex-col items-center">
          <Globe className="w-6 h-6 text-cyan-400 mb-1" />
          <span className="font-bold text-white text-[11px]">12 km Global Grid</span>
          <span className="text-[9px] text-slate-400 mt-0.5">Raw Ensemble Inputs</span>
        </div>

        <div className="bg-navy-950 p-3 rounded-lg border border-navy-800 flex flex-col items-center">
          <Network className="w-6 h-6 text-blue-400 mb-1" />
          <span className="font-bold text-white text-[11px]">Icosahedral Mesh</span>
          <span className="text-[9px] text-slate-400 mt-0.5">Spherical Graph Nodes</span>
        </div>

        <div className="bg-navy-950 p-3 rounded-lg border border-navy-800 flex flex-col items-center">
          <Cpu className="w-6 h-6 text-cyan-400 mb-1" />
          <span className="font-bold text-white text-[11px]">GNN Message Passing</span>
          <span className="text-[9px] text-slate-400 mt-0.5">Graph Convolutions</span>
        </div>

        <div className="bg-navy-950 p-3 rounded-lg border border-navy-800 flex flex-col items-center">
          <CheckCircle className="w-6 h-6 text-emerald-400 mb-1" />
          <span className="font-bold text-white text-[11px]">Anomaly Detection</span>
          <span className="text-[9px] text-slate-400 mt-0.5">Z-Score & Score Map</span>
        </div>

        <div className="bg-navy-950 p-3 rounded-lg border border-navy-800 flex flex-col items-center">
          <Sparkles className="w-6 h-6 text-amber-400 mb-1" />
          <span className="font-bold text-white text-[11px]">4D Trajectory</span>
          <span className="text-[9px] text-slate-400 mt-0.5">10-Day Tracking</span>
        </div>
      </div>

      {/* Visual Spherical Mesh Model Diagram Card */}
      <div className="bg-navy-950 border border-navy-800 rounded-lg p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-navy-900 p-3 rounded border border-navy-800">
          <span className="font-mono text-cyan-400 text-[10px] uppercase font-bold block mb-1">INPUT TENSORS</span>
          <h4 className="font-bold text-white text-xs mb-1">Multivariable NWP Fields</h4>
          <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside">
            <li>Temperature at 2m (T_2m)</li>
            <li>Total Precipitation (P_tot)</li>
            <li>U/V Wind Vectors at 850 hPa</li>
            <li>Mean Sea Level Pressure</li>
            <li>Relative Humidity (850hPa)</li>
          </ul>
        </div>

        <div className="bg-navy-900 p-3 rounded border border-cyan-500/30">
          <span className="font-mono text-cyan-400 text-[10px] uppercase font-bold block mb-1">SPATIO-TEMPORAL GNN</span>
          <h4 className="font-bold text-white text-xs mb-1">MeshGraphNet Backbone</h4>
          <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside">
            <li>Geodesic Graph Construction</li>
            <li>Node Message Passing Layers</li>
            <li>Temporal Gated Recurrent Units</li>
            <li>Physical Conservation Constraints</li>
            <li>Spherical Pole Singularity Handling</li>
          </ul>
        </div>

        <div className="bg-navy-900 p-3 rounded border border-navy-800">
          <span className="font-mono text-amber-400 text-[10px] uppercase font-bold block mb-1">OUTPUT MAPS</span>
          <h4 className="font-bold text-white text-xs mb-1">Anomaly & Trajectory</h4>
          <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside">
            <li>Normalized Anomaly Score [0, 1]</li>
            <li>Risk Level (LOW / MOD / SEVERE)</li>
            <li>10-Day Lat/Lon Vector Trajectory</li>
            <li>5 km Local Impact Footprint</li>
            <li>Dynamic Bounding Box Bounds</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
