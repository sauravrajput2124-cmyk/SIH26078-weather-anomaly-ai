import React from 'react';
import { NavLink } from 'react-router-dom';
import { Activity, ShieldAlert, Cpu, Play, Radio, MapPin, BarChart3, Layers, Layers3, Info } from 'lucide-react';

interface HeaderProps {
  onRunAnalysis: () => void;
  isAnalyzing: boolean;
  activeScenario: string;
  onSelectScenario: (scenarioId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onRunAnalysis,
  isAnalyzing,
  activeScenario,
  onSelectScenario,
}) => {
  return (
    <header className="bg-navy-900 border-b border-navy-700 sticky top-0 z-50 shadow-lg">
      {/* Top Banner Status Bar */}
      <div className="bg-navy-950 border-b border-navy-800 px-4 py-1.5 flex flex-wrap items-center justify-between text-xs text-slate-300">
        <div className="flex items-center space-x-3">
          <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded font-mono font-bold tracking-wide">
            SIH26078
          </span>
          <span className="font-semibold text-slate-200">
            Medium-Range Extreme Weather Anomaly Intelligence
          </span>
          <span className="hidden md:inline-flex items-center space-x-1.5 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Prototype Analysis Engine Online</span>
          </span>
        </div>

        <div className="flex items-center space-x-3 mt-1 sm:mt-0">
          <div className="flex items-center space-x-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2.5 py-0.5 rounded font-mono font-semibold">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>DEMO MODE</span>
          </div>

          <div className="flex items-center space-x-1 bg-navy-800 rounded px-2 py-0.5 border border-navy-700">
            <span className="text-slate-400">Scenario:</span>
            <select
              value={activeScenario}
              onChange={(e) => onSelectScenario(e.target.value)}
              className="bg-transparent text-cyan-400 font-medium focus:outline-none cursor-pointer"
            >
              <option value="ANOM-001" className="bg-navy-900 text-slate-100">
                🌧️ Extreme Rainfall (Odisha)
              </option>
              <option value="ANOM-002" className="bg-navy-900 text-slate-100">
                ☀️ Heatwave Dome (Rajasthan)
              </option>
              <option value="ANOM-003" className="bg-navy-900 text-slate-100">
                🌀 Cyclone Storm (Gujarat)
              </option>
              <option value="ANOM-004" className="bg-navy-900 text-slate-100">
                ❄️ Cold Wave (Northern Plains)
              </option>
            </select>
          </div>

          <button
            onClick={onRunAnalysis}
            disabled={isAnalyzing}
            className="flex items-center space-x-1.5 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-navy-950 font-bold px-3 py-1 rounded shadow-md transition disabled:opacity-50 cursor-pointer"
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isAnalyzing ? 'animate-spin' : ''}`} />
            <span>{isAnalyzing ? 'Analyzing...' : 'Run Anomaly Analysis'}</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="px-4 py-3 flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-navy-950 font-black shadow-lg shadow-cyan-500/20">
            <Activity className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-white tracking-tight flex items-center space-x-2">
              <span>AI-Driven Spatio-Temporal Tracking</span>
            </h1>
            <p className="text-xs text-slate-400">
              12 km NWP Global Ensemble → 5 km Localized Impact Framework
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center space-x-1 overflow-x-auto py-1 mt-2 lg:mt-0 text-sm font-medium">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center space-x-1.5 px-3 py-1.5 rounded-md transition ${
                isActive
                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-300 hover:bg-navy-800 hover:text-white'
              }`
            }
          >
            <Activity className="w-4 h-4" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/tracking"
            className={({ isActive }) =>
              `flex items-center space-x-1.5 px-3 py-1.5 rounded-md transition ${
                isActive
                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-300 hover:bg-navy-800 hover:text-white'
              }`
            }
          >
            <MapPin className="w-4 h-4" />
            <span>Anomaly Tracking</span>
          </NavLink>

          <NavLink
            to="/forecast"
            className={({ isActive }) =>
              `flex items-center space-x-1.5 px-3 py-1.5 rounded-md transition ${
                isActive
                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-300 hover:bg-navy-800 hover:text-white'
              }`
            }
          >
            <BarChart3 className="w-4 h-4" />
            <span>Forecast Analysis</span>
          </NavLink>

          <NavLink
            to="/impact"
            className={({ isActive }) =>
              `flex items-center space-x-1.5 px-3 py-1.5 rounded-md transition ${
                isActive
                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-300 hover:bg-navy-800 hover:text-white'
              }`
            }
          >
            <Layers className="w-4 h-4" />
            <span>5 km Impact Map</span>
          </NavLink>

          <NavLink
            to="/gnn"
            className={({ isActive }) =>
              `flex items-center space-x-1.5 px-3 py-1.5 rounded-md transition ${
                isActive
                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-300 hover:bg-navy-800 hover:text-white'
              }`
            }
          >
            <Cpu className="w-4 h-4" />
            <span>Spherical GNN</span>
          </NavLink>

          <NavLink
            to="/downscaling"
            className={({ isActive }) =>
              `flex items-center space-x-1.5 px-3 py-1.5 rounded-md transition ${
                isActive
                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-300 hover:bg-navy-800 hover:text-white'
              }`
            }
          >
            <Layers3 className="w-4 h-4" />
            <span>AI Downscaling</span>
          </NavLink>

          <NavLink
            to="/physics"
            className={({ isActive }) =>
              `flex items-center space-x-1.5 px-3 py-1.5 rounded-md transition ${
                isActive
                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-300 hover:bg-navy-800 hover:text-white'
              }`
            }
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Physics Validation</span>
          </NavLink>

          <NavLink
            to="/alerts"
            className={({ isActive }) =>
              `flex items-center space-x-1.5 px-3 py-1.5 rounded-md transition ${
                isActive
                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-300 hover:bg-navy-800 hover:text-white'
              }`
            }
          >
            <Radio className="w-4 h-4" />
            <span>Alerts</span>
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `flex items-center space-x-1.5 px-3 py-1.5 rounded-md transition ${
                isActive
                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-300 hover:bg-navy-800 hover:text-white'
              }`
            }
          >
            <Info className="w-4 h-4" />
            <span>About</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
