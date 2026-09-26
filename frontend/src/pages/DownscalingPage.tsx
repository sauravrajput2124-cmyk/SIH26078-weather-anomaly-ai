import React from 'react';
import { DownscalingCompare } from '../components/DownscalingCompare';
import { Layers3, Info, Sparkles, AlertTriangle } from 'lucide-react';

export const DownscalingPage: React.FC = () => {
  return (
    <div className="space-y-4 text-xs">
      <div className="bg-navy-900 border border-navy-700 rounded-xl p-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg">
            <Layers3 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-white">AI Downscaling: 12 km → 5 km Localized Impact Grid</h1>
            <p className="text-slate-400">Conditional Diffusion & Intensity-Preserving Spatial Refinement Architecture</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
          <span className="text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded font-mono font-bold">
            PROTOTYPE SIMULATION MODE
          </span>
        </div>
      </div>

      <DownscalingCompare />

      {/* Deep Dive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-navy-900 border border-navy-700 rounded-xl p-4 shadow-xl space-y-2">
          <h3 className="font-bold text-white text-xs uppercase flex items-center space-x-1.5">
            <Info className="w-4 h-4 text-cyan-400" />
            <span>Why 12 km to 5 km Downscaling Matters</span>
          </h3>
          <p className="text-slate-300 leading-relaxed">
            Global Numerical Weather Prediction (NWP) models operate at coarse spatial resolutions (~12 km), which average precipitation and wind over broad grid cells. This causes extreme localized convective spikes to be diluted.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Our proposed 5 km localized downscaling module recovers fine-scale microclimate variations required for precision disaster response and flood risk modeling.
          </p>
        </div>

        <div className="bg-navy-900 border border-navy-700 rounded-xl p-4 shadow-xl space-y-2">
          <h3 className="font-bold text-white text-xs uppercase flex items-center space-x-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Conditional Latent Diffusion Integration</span>
          </h3>
          <p className="text-slate-300 leading-relaxed">
            In Phase 6 of our AI roadmap, a Latent Diffusion Super-Resolution Model (similar to Hugging Face Diffusers) will ingest coarse 12 km crops and condition on local digital elevation maps (DEM) to generate physical 5 km fields.
          </p>
          <div className="bg-navy-950 p-2.5 rounded border border-navy-800 text-[11px] font-mono text-cyan-400">
            Model: LatentDiffusion2D(in_channels=5, cond_dim=128)
          </div>
        </div>
      </div>
    </div>
  );
};
