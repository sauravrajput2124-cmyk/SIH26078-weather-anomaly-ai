import React from 'react';
import { Anomaly } from '../types/weather';
import { Box, Target, Compass, Sparkles } from 'lucide-react';

interface BoundingBoxCardProps {
  anomaly: Anomaly;
  forecastDay: number;
}

export const BoundingBoxCard: React.FC<BoundingBoxCardProps> = ({ anomaly, forecastDay }) => {
  const currentPt = anomaly.trajectory.find(p => p.day === forecastDay) || anomaly.trajectory[0];
  const bbox = currentPt.bounding_box;

  const latSpan = (bbox.max_lat - bbox.min_lat).toFixed(2);
  const lonSpan = (bbox.max_lon - bbox.min_lon).toFixed(2);
  const areaKm2 = (parseFloat(latSpan) * 111 * parseFloat(lonSpan) * 111 * 0.85).toFixed(0);

  return (
    <div className="bg-navy-900 border border-navy-700 rounded-xl p-4 shadow-xl text-xs">
      <div className="flex items-center justify-between border-b border-navy-700 pb-2 mb-3">
        <div className="flex items-center space-x-2">
          <Box className="w-4 h-4 text-cyan-400" />
          <h3 className="font-bold text-white uppercase tracking-wider">Dynamic Anomaly Bounding Box</h3>
        </div>
        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
          DAY {forecastDay}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-navy-950 p-2.5 rounded-lg border border-navy-800">
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Latitude Range</span>
          <span className="text-sm font-mono font-bold text-white mt-0.5 block">
            {bbox.min_lat}°N — {bbox.max_lat}°N
          </span>
          <span className="text-[10px] text-cyan-400/80 font-mono">Span: {latSpan}° (~{(parseFloat(latSpan) * 111).toFixed(0)} km)</span>
        </div>

        <div className="bg-navy-950 p-2.5 rounded-lg border border-navy-800">
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Longitude Range</span>
          <span className="text-sm font-mono font-bold text-white mt-0.5 block">
            {bbox.min_lon}°E — {bbox.max_lon}°E
          </span>
          <span className="text-[10px] text-cyan-400/80 font-mono">Span: {lonSpan}° (~{(parseFloat(lonSpan) * 98).toFixed(0)} km)</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center bg-navy-950/60 p-2 rounded border border-navy-800">
        <div>
          <span className="text-[9px] text-slate-400 block uppercase">Forecast Intensity</span>
          <span className="text-xs font-bold text-amber-400 font-mono">{currentPt.intensity} / 100</span>
        </div>
        <div>
          <span className="text-[9px] text-slate-400 block uppercase">Calculated Area</span>
          <span className="text-xs font-bold text-white font-mono">~{areaKm2} km²</span>
        </div>
        <div>
          <span className="text-[9px] text-slate-400 block uppercase">Anomaly Score</span>
          <span className="text-xs font-bold text-cyan-400 font-mono">{currentPt.anomaly_score.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-navy-800">
        <span className="flex items-center space-x-1">
          <Compass className="w-3 h-3 text-cyan-400" />
          <span>Center: ({currentPt.latitude.toFixed(2)}°N, {currentPt.longitude.toFixed(2)}°E)</span>
        </span>
        <span className="text-cyan-400/80 font-mono font-semibold">5 km Local Footprint</span>
      </div>
    </div>
  );
};
