import React, { useState } from 'react';
import { Anomaly } from '../types/weather';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, BarChart, Bar } from 'recharts';
import { BarChart3, Filter, CloudRain, Thermometer, Wind, Gauge } from 'lucide-react';

interface ForecastPageProps {
  anomalies: Anomaly[];
  selectedAnomalyId: string;
  onSelectAnomaly: (id: string) => void;
}

export const ForecastPage: React.FC<ForecastPageProps> = ({
  anomalies,
  selectedAnomalyId,
  onSelectAnomaly,
}) => {
  const selectedAnomaly = anomalies.find(a => a.id === selectedAnomalyId) || anomalies[0];

  const chartSeries = selectedAnomaly.trajectory.map(pt => ({
    day: `Day ${pt.day}`,
    rainfall: pt.rainfall_mm,
    temperature: pt.temp_c,
    wind_speed: pt.wind_kmh,
    anomaly_score: pt.anomaly_score,
    intensity: pt.intensity,
    baseline: selectedAnomaly.historical_mean_mm
  }));

  return (
    <div className="space-y-4 text-xs">
      <div className="bg-navy-900 border border-navy-700 rounded-xl p-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-white">Forecast Meteorological Analytics & Multi-Variable Series</h1>
            <p className="text-slate-400">Comparing 10-day medium-range forecasts against historical climatological baselines</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedAnomalyId}
            onChange={(e) => onSelectAnomaly(e.target.value)}
            className="bg-navy-950 border border-navy-700 text-cyan-400 font-bold px-3 py-1.5 rounded focus:outline-none cursor-pointer"
          >
            {anomalies.map(a => (
              <option key={a.id} value={a.id} className="bg-navy-900 text-slate-100">
                {a.event_type} — {a.region} ({a.id})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Rainfall & Baseline Comparison Area Chart */}
        <div className="bg-navy-900 border border-navy-700 rounded-xl p-4 shadow-xl space-y-2">
          <div className="flex items-center justify-between border-b border-navy-700 pb-2">
            <div className="flex items-center space-x-2">
              <CloudRain className="w-4 h-4 text-cyan-400" />
              <h2 className="font-bold text-white uppercase">Precipitation Forecast vs Baseline</h2>
            </div>
            <span className="text-[10px] font-mono text-cyan-400">Baseline: {selectedAnomaly.historical_mean_mm} mm</span>
          </div>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1C2541" />
                <XAxis dataKey="day" stroke="#94A3B8" tick={{ fontSize: 11 }} />
                <YAxis stroke="#94A3B8" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0B132B', borderColor: '#3A506B', color: '#FFF' }} />
                <Area type="monotone" dataKey="rainfall" name="Forecast Rainfall (mm)" stroke="#00F5D4" fill="#00F5D4" fillOpacity={0.25} />
                <Area type="monotone" dataKey="baseline" name="Historical Baseline (mm)" stroke="#64748B" fill="#64748B" fillOpacity={0.1} strokeDasharray="4 4" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Temperature Trend Line Chart */}
        <div className="bg-navy-900 border border-navy-700 rounded-xl p-4 shadow-xl space-y-2">
          <div className="flex items-center justify-between border-b border-navy-700 pb-2">
            <div className="flex items-center space-x-2">
              <Thermometer className="w-4 h-4 text-rose-400" />
              <h2 className="font-bold text-white uppercase">Temperature Horizon (°C)</h2>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Max Peak: {Math.max(...chartSeries.map(s => s.temperature))}°C</span>
          </div>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1C2541" />
                <XAxis dataKey="day" stroke="#94A3B8" tick={{ fontSize: 11 }} />
                <YAxis stroke="#94A3B8" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0B132B', borderColor: '#3A506B', color: '#FFF' }} />
                <Line type="monotone" dataKey="temperature" name="Temp (°C)" stroke="#EF4444" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Wind Speed Vector Bar Chart */}
        <div className="bg-navy-900 border border-navy-700 rounded-xl p-4 shadow-xl space-y-2">
          <div className="flex items-center justify-between border-b border-navy-700 pb-2">
            <div className="flex items-center space-x-2">
              <Wind className="w-4 h-4 text-blue-400" />
              <h2 className="font-bold text-white uppercase">Surface Wind Velocity (km/h)</h2>
            </div>
            <span className="text-[10px] font-mono text-blue-400">Max Wind: {Math.max(...chartSeries.map(s => s.wind_speed))} km/h</span>
          </div>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1C2541" />
                <XAxis dataKey="day" stroke="#94A3B8" tick={{ fontSize: 11 }} />
                <YAxis stroke="#94A3B8" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0B132B', borderColor: '#3A506B', color: '#FFF' }} />
                <Bar dataKey="wind_speed" name="Wind (km/h)" fill="#4CC9F0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Anomaly Score Progression Chart */}
        <div className="bg-navy-900 border border-navy-700 rounded-xl p-4 shadow-xl space-y-2">
          <div className="flex items-center justify-between border-b border-navy-700 pb-2">
            <div className="flex items-center space-x-2">
              <Gauge className="w-4 h-4 text-amber-400" />
              <h2 className="font-bold text-white uppercase">Normalized Anomaly Score Evolution</h2>
            </div>
            <span className="text-[10px] font-mono text-amber-400">Peak Day 5 Score: {selectedAnomaly.anomaly_score.toFixed(2)}</span>
          </div>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1C2541" />
                <XAxis dataKey="day" stroke="#94A3B8" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 1]} stroke="#94A3B8" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0B132B', borderColor: '#3A506B', color: '#FFF' }} />
                <Area type="monotone" dataKey="anomaly_score" name="Anomaly Score" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.25} strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
