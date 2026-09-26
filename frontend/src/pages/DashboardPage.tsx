import React from 'react';
import { Anomaly, LayerState } from '../types/weather';
import { SummaryCards } from '../components/SummaryCards';
import { WeatherMap } from '../components/WeatherMap';
import { TimelineSlider } from '../components/TimelineSlider';
import { BoundingBoxCard } from '../components/BoundingBoxCard';
import { Sparkles, Info, ShieldAlert, ChevronRight, Activity, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardPageProps {
  anomalies: Anomaly[];
  selectedAnomalyId: string;
  onSelectAnomaly: (id: string) => void;
  forecastDay: number;
  onDayChange: (day: number) => void;
  layers: LayerState;
  onToggleLayer: (layerKey: keyof LayerState) => void;
  onOpenExplainability: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  anomalies,
  selectedAnomalyId,
  onSelectAnomaly,
  forecastDay,
  onDayChange,
  layers,
  onToggleLayer,
  onOpenExplainability,
}) => {
  const selectedAnomaly = anomalies.find(a => a.id === selectedAnomalyId) || anomalies[0];

  return (
    <div className="space-y-4">
      {/* 5 KPI Summary Cards */}
      <SummaryCards anomalies={anomalies} />

      {/* Main Grid: Weather Map + Side Details Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Main Geospatial Interactive Map */}
        <div className="lg:col-span-8 space-y-4">
          <WeatherMap
            anomalies={anomalies}
            selectedAnomalyId={selectedAnomalyId}
            onSelectAnomaly={onSelectAnomaly}
            forecastDay={forecastDay}
            layers={layers}
            onToggleLayer={onToggleLayer}
            onOpenExplainability={onOpenExplainability}
          />

          {/* 10-Day Spatio-Temporal Timeline Slider */}
          <TimelineSlider
            currentDay={forecastDay}
            onDayChange={onDayChange}
            maxDays={10}
          />
        </div>

        {/* Right Side Detail Drawer */}
        <div className="lg:col-span-4 space-y-4">
          {/* Selected Anomaly Card */}
          <div className="bg-navy-900 border border-navy-700 rounded-xl p-4 shadow-xl text-xs space-y-3">
            <div className="flex items-center justify-between border-b border-navy-700 pb-2">
              <span className="font-mono text-cyan-400 font-bold uppercase">{selectedAnomaly?.id}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                selectedAnomaly?.severity === 'SEVERE'
                  ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                  : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
              }`}>
                {selectedAnomaly?.severity} RISK
              </span>
            </div>

            <div>
              <h3 className="text-sm font-extrabold text-white">{selectedAnomaly?.event_type}</h3>
              <p className="text-slate-400 text-[11px] mt-0.5">{selectedAnomaly?.region}</p>
            </div>

            <p className="text-slate-300 leading-relaxed bg-navy-950 p-2.5 rounded border border-navy-800 text-[11px]">
              {selectedAnomaly?.description}
            </p>

            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-navy-950 p-2 rounded border border-navy-800">
                <span className="text-[9px] text-slate-400 block uppercase">ANOMALY SCORE</span>
                <span className="text-sm font-black text-cyan-400 font-mono">{selectedAnomaly?.anomaly_score.toFixed(2)}</span>
              </div>
              <div className="bg-navy-950 p-2 rounded border border-navy-800">
                <span className="text-[9px] text-slate-400 block uppercase">IMPACT FOOTPRINT</span>
                <span className="text-sm font-black text-amber-400 font-mono">~5 km Radius</span>
              </div>
            </div>

            <button
              onClick={onOpenExplainability}
              className="w-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 py-1.5 rounded font-semibold text-xs flex items-center justify-center space-x-1.5 transition cursor-pointer"
            >
              <Info className="w-4 h-4" />
              <span>Why was this detected? (AI Diagnostic)</span>
            </button>
          </div>

          {/* Dynamic Bounding Box Card */}
          {selectedAnomaly && (
            <BoundingBoxCard
              anomaly={selectedAnomaly}
              forecastDay={forecastDay}
            />
          )}

          {/* AI Workflow Links */}
          <div className="bg-navy-900 border border-navy-700 rounded-xl p-3.5 shadow-xl text-xs space-y-2">
            <span className="font-bold text-slate-300 block uppercase tracking-wider text-[10px]">AI Pipeline Navigation</span>
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/gnn"
                className="bg-navy-950 hover:bg-navy-800 border border-navy-700 text-slate-200 p-2 rounded flex items-center justify-between transition"
              >
                <span>Spherical GNN</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
              </Link>
              <Link
                to="/downscaling"
                className="bg-navy-950 hover:bg-navy-800 border border-navy-700 text-slate-200 p-2 rounded flex items-center justify-between transition"
              >
                <span>5 km Downscaling</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
