import React, { useState, useEffect } from 'react';
import { Anomaly, LayerState } from '../types/weather';
import { WeatherMap } from '../components/WeatherMap';
import { fetchImpactData } from '../services/api';
import { Layers, ShieldAlert, MapPin, Sparkles, AlertCircle } from 'lucide-react';

interface ImpactPageProps {
  anomalies: Anomaly[];
  selectedAnomalyId: string;
  onSelectAnomaly: (id: string) => void;
  forecastDay: number;
  layers: LayerState;
  onToggleLayer: (layerKey: keyof LayerState) => void;
  onOpenExplainability: () => void;
}

export const ImpactPage: React.FC<ImpactPageProps> = ({
  anomalies,
  selectedAnomalyId,
  onSelectAnomaly,
  forecastDay,
  layers,
  onToggleLayer,
  onOpenExplainability,
}) => {
  const selectedAnomaly = anomalies.find(a => a.id === selectedAnomalyId) || anomalies[0];
  const [impactData, setImpactData] = useState<any>(null);

  useEffect(() => {
    fetchImpactData(selectedAnomalyId, forecastDay).then(data => setImpactData(data));
  }, [selectedAnomalyId, forecastDay]);

  const currentPt = selectedAnomaly.trajectory.find(p => p.day === forecastDay) || selectedAnomaly.trajectory[0];

  return (
    <div className="space-y-4 text-xs">
      <div className="bg-navy-900 border border-navy-700 rounded-xl p-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-white">5 km Localized Disaster Risk & Impact Map</h1>
            <p className="text-slate-400">High-Resolution Footprint Analysis for Local Emergency Planning</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 mt-2 sm:mt-0 font-mono">
          <span className="bg-navy-950 px-3 py-1 rounded border border-navy-800 text-amber-400 font-bold">
            IMPACT FOOTPRINT: ~5 km RADIUS
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8">
          <WeatherMap
            anomalies={anomalies}
            selectedAnomalyId={selectedAnomalyId}
            onSelectAnomaly={onSelectAnomaly}
            forecastDay={forecastDay}
            layers={{ ...layers, impactZone: true, footprint: true }}
            onToggleLayer={onToggleLayer}
            onOpenExplainability={onOpenExplainability}
          />
        </div>

        <div className="lg:col-span-4 space-y-4">
          <div className="bg-navy-900 border border-navy-700 rounded-xl p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-navy-700 pb-2">
              <span className="font-bold text-white uppercase">Impact Zone Metadata</span>
              <span className="text-[10px] font-mono text-cyan-400">Day {forecastDay}</span>
            </div>

            <div className="space-y-2 font-mono">
              <div className="bg-navy-950 p-2 rounded border border-navy-800">
                <span className="text-slate-400 block text-[9px]">EVENT TYPE & SEVERITY</span>
                <span className="text-white font-bold">{selectedAnomaly.event_type} ({selectedAnomaly.severity})</span>
              </div>

              <div className="bg-navy-950 p-2 rounded border border-navy-800">
                <span className="text-slate-400 block text-[9px]">CENTER COORDINATES</span>
                <span className="text-cyan-400 font-bold">({currentPt.latitude.toFixed(2)}°N, {currentPt.longitude.toFixed(2)}°E)</span>
              </div>

              <div className="bg-navy-950 p-2 rounded border border-navy-800">
                <span className="text-slate-400 block text-[9px]">ANOMALY SCORE</span>
                <span className="text-amber-400 font-bold">{currentPt.anomaly_score.toFixed(2)} / 1.00</span>
              </div>

              <div className="bg-navy-950 p-2 rounded border border-navy-800">
                <span className="text-slate-400 block text-[9px]">DOWNSCALED RESOLUTION</span>
                <span className="text-emerald-400 font-bold">5 km Local Impact Grid</span>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 p-2.5 rounded text-[10px] text-amber-300 flex items-start space-x-1.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>Prototype / Demonstration Data: Values are synthesized for SIH26078 demonstration purposes.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
