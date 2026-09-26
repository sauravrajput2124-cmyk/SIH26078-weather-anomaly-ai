import React from 'react';
import { Anomaly, LayerState } from '../types/weather';
import { WeatherMap } from '../components/WeatherMap';
import { TimelineSlider } from '../components/TimelineSlider';
import { BoundingBoxCard } from '../components/BoundingBoxCard';
import { MapPin, Navigation, Compass, Calendar, Table } from 'lucide-react';

interface TrackingPageProps {
  anomalies: Anomaly[];
  selectedAnomalyId: string;
  onSelectAnomaly: (id: string) => void;
  forecastDay: number;
  onDayChange: (day: number) => void;
  layers: LayerState;
  onToggleLayer: (layerKey: keyof LayerState) => void;
  onOpenExplainability: () => void;
}

export const TrackingPage: React.FC<TrackingPageProps> = ({
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
  const currentPt = selectedAnomaly.trajectory.find(p => p.day === forecastDay) || selectedAnomaly.trajectory[0];

  const day1 = selectedAnomaly.trajectory[0];
  const dayLast = selectedAnomaly.trajectory[selectedAnomaly.trajectory.length - 1];

  return (
    <div className="space-y-4 text-xs">
      <div className="bg-navy-900 border border-navy-700 rounded-xl p-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg">
            <Navigation className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-white">4D Spatio-Temporal Anomaly Tracking Workspace</h1>
            <p className="text-slate-400">Tracking spatial coordinates $(x, y)$ and temporal intensity evolution across Days 1–10</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 mt-2 sm:mt-0 font-mono">
          <span className="bg-navy-950 px-3 py-1 rounded border border-navy-800 text-slate-300">
            Selected: <strong className="text-cyan-400">{selectedAnomaly.event_type} ({selectedAnomaly.id})</strong>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
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

          <TimelineSlider
            currentDay={forecastDay}
            onDayChange={onDayChange}
            maxDays={10}
          />
        </div>

        <div className="lg:col-span-4 space-y-4">
          <BoundingBoxCard anomaly={selectedAnomaly} forecastDay={forecastDay} />

          {/* Trajectory Vector Stats Card */}
          <div className="bg-navy-900 border border-navy-700 rounded-xl p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-navy-700 pb-2">
              <span className="font-bold text-white uppercase tracking-wider">Trajectory Vector Stats</span>
              <Compass className="w-4 h-4 text-cyan-400" />
            </div>

            <div className="space-y-2 font-mono">
              <div className="flex justify-between bg-navy-950 p-2 rounded border border-navy-800">
                <span className="text-slate-400">Day 1 Origin:</span>
                <span className="text-white font-bold">({day1.latitude}°N, {day1.longitude}°E)</span>
              </div>
              <div className="flex justify-between bg-navy-950 p-2 rounded border border-navy-800">
                <span className="text-slate-400">Current Position:</span>
                <span className="text-cyan-400 font-bold">({currentPt.latitude}°N, {currentPt.longitude}°E)</span>
              </div>
              <div className="flex justify-between bg-navy-950 p-2 rounded border border-navy-800">
                <span className="text-slate-400">Day 10 Forecast Vector:</span>
                <span className="text-amber-400 font-bold">({dayLast.latitude}°N, {dayLast.longitude}°E)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trajectory Timeline Points Table */}
      <div className="bg-navy-900 border border-navy-700 rounded-xl p-4 shadow-xl">
        <div className="flex items-center space-x-2 border-b border-navy-700 pb-3 mb-3">
          <Table className="w-4 h-4 text-cyan-400" />
          <h2 className="font-bold text-white uppercase tracking-wider">10-Day Spatio-Temporal Trajectory Log</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-[11px]">
            <thead className="bg-navy-950 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="p-2">Forecast Day</th>
                <th className="p-2">Coordinates (Lat, Lon)</th>
                <th className="p-2">Intensity</th>
                <th className="p-2">Anomaly Score</th>
                <th className="p-2">Precip / Temp</th>
                <th className="p-2">Wind Speed</th>
                <th className="p-2">Pressure</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-800">
              {selectedAnomaly.trajectory.map(pt => (
                <tr
                  key={pt.day}
                  onClick={() => onDayChange(pt.day)}
                  className={`cursor-pointer transition hover:bg-navy-800/80 ${
                    pt.day === forecastDay ? 'bg-cyan-500/10 font-bold text-cyan-300' : 'text-slate-300'
                  }`}
                >
                  <td className="p-2 font-bold">Day {pt.day} {pt.day === forecastDay ? '👈' : ''}</td>
                  <td className="p-2">({pt.latitude.toFixed(2)}°N, {pt.longitude.toFixed(2)}°E)</td>
                  <td className="p-2 text-amber-400">{pt.intensity.toFixed(1)} / 100</td>
                  <td className="p-2 text-cyan-400">{pt.anomaly_score.toFixed(2)}</td>
                  <td className="p-2">{pt.rainfall_mm > 0 ? `${pt.rainfall_mm} mm` : `${pt.temp_c}°C`}</td>
                  <td className="p-2">{pt.wind_kmh} km/h</td>
                  <td className="p-2">{pt.pressure_hpa} hPa</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
