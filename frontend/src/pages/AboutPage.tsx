import React from 'react';
import { Info, CheckCircle2, Circle, ExternalLink, ShieldCheck, Cpu, Code } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-4 text-xs">
      <div className="bg-navy-900 border border-navy-700 rounded-xl p-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg">
            <Info className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-white">About & SIH26078 Methodology Framework</h1>
            <p className="text-slate-400">SIH Evaluation Matrix & Real vs Prototype Technical Transparency</p>
          </div>
        </div>

        <a
          href="http://localhost:8000/docs"
          target="_blank"
          rel="noreferrer"
          className="flex items-center space-x-1.5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-navy-950 font-bold px-3 py-1.5 rounded shadow transition hover:opacity-90 cursor-pointer mt-2 sm:mt-0"
        >
          <Code className="w-4 h-4" />
          <span>Open API Docs (/docs)</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Real vs Prototype Status Comparison Matrix */}
      <div className="bg-navy-900 border border-navy-700 rounded-xl p-5 shadow-xl space-y-4">
        <div className="flex items-center space-x-2 border-b border-navy-700 pb-3">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          <h2 className="text-sm font-bold text-white uppercase">Real vs Prototype Capability Matrix</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Column 1: Current Prototype */}
          <div className="bg-navy-950 border border-emerald-500/30 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-navy-800 pb-2">
              <span className="font-bold text-emerald-400 uppercase tracking-wider">CURRENT WORKING PROTOTYPE</span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">OPERATIONAL</span>
            </div>

            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Synthetic Demo Dataset:</strong> 10-day medium-range NWP forecast grid covering India.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Z-Score Anomaly Engine:</strong> Transparent baseline comparison and severity classification.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Spatio-Temporal Tracking:</strong> Interactive 4D trajectory simulation across Days 1–10.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Dynamic Bounding Box:</strong> Latitude/Longitude expansion bounds recalculation.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>5 km Impact Footprint:</strong> Downscaled high-resolution polygon mapping.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>FastAPI Microservice:</strong> Complete REST API routing (`/api/anomalies`, `/api/alerts`, etc.).</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Proposed Advanced AI Model */}
          <div className="bg-navy-950 border border-cyan-500/30 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-navy-800 pb-2">
              <span className="font-bold text-cyan-400 uppercase tracking-wider">PROPOSED ADVANCED AI MODULE</span>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">FUTURE INTEGRATION</span>
            </div>

            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start space-x-2">
                <Circle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Spherical MeshGraphNet GNN:</strong> Trained PyTorch / DGL GNN on icosahedral grid.</span>
              </li>
              <li className="flex items-start space-x-2">
                <Circle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Operational EFI:</strong> Climatological Extreme Forecast Index integral calculation.</span>
              </li>
              <li className="flex items-start space-x-2">
                <Circle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Conditional Diffusion Model:</strong> Hugging Face Diffusers super-resolution downscaling.</span>
              </li>
              <li className="flex items-start space-x-2">
                <Circle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Full Physics-Informed Loss:</strong> Direct backward pass gradients for moisture/mass conservation.</span>
              </li>
              <li className="flex items-start space-x-2">
                <Circle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Real-Time NWP Feed:</strong> Live GRIB2 NCUM / NEPS ensemble ingestion via xarray.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
