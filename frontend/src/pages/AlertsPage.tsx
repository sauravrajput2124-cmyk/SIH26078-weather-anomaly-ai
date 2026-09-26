import React, { useState, useEffect } from 'react';
import { Alert } from '../types/weather';
import { fetchAlerts } from '../services/api';
import { Radio, ShieldAlert, Filter, BellRing, Code, Sparkles } from 'lucide-react';

export const AlertsPage: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');
  const [showJson, setShowJson] = useState<boolean>(false);

  useEffect(() => {
    fetchAlerts().then(setAlerts);
  }, []);

  const filteredAlerts = alerts.filter(a => severityFilter === 'ALL' || a.severity === severityFilter);

  return (
    <div className="space-y-4 text-xs">
      <div className="bg-navy-900 border border-navy-700 rounded-xl p-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-rose-500/10 text-rose-400 rounded-lg">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-white">Meteorological Alert Dispatch & Emergency Feeds</h1>
            <p className="text-slate-400">Automated REST Alert Notifications (GET /api/alerts)</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
          <button
            onClick={() => setShowJson(!showJson)}
            className="flex items-center space-x-1.5 bg-navy-950 hover:bg-navy-800 text-slate-300 border border-navy-700 px-3 py-1.5 rounded font-mono text-xs transition cursor-pointer"
          >
            <Code className="w-3.5 h-3.5 text-cyan-400" />
            <span>{showJson ? 'View UI Cards' : 'View API JSON Payload'}</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 bg-navy-900 p-2 rounded-lg border border-navy-700">
        <Filter className="w-4 h-4 text-slate-400 ml-1" />
        <span className="text-slate-300 font-semibold mr-2">Filter Severity:</span>
        {['ALL', 'SEVERE', 'MODERATE', 'LOW'].map(sev => (
          <button
            key={sev}
            onClick={() => setSeverityFilter(sev)}
            className={`px-3 py-1 rounded font-mono font-bold transition cursor-pointer ${
              severityFilter === sev
                ? 'bg-cyan-500 text-navy-950 shadow-md'
                : 'bg-navy-950 text-slate-400 hover:text-white border border-navy-800'
            }`}
          >
            {sev}
          </button>
        ))}
      </div>

      {/* JSON Payload Inspector View */}
      {showJson ? (
        <div className="bg-navy-950 border border-navy-800 rounded-xl p-4 font-mono text-xs text-cyan-400 overflow-x-auto shadow-2xl">
          <pre>{JSON.stringify(filteredAlerts, null, 2)}</pre>
        </div>
      ) : (
        /* Alert Cards List */
        <div className="space-y-3">
          {filteredAlerts.map(alert => (
            <div
              key={alert.alert_id}
              className={`bg-navy-900 border rounded-xl p-4 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-3 transition ${
                alert.severity === 'SEVERE'
                  ? 'border-rose-500/50 hover:border-rose-400'
                  : 'border-amber-500/50 hover:border-amber-400'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2.5 rounded-lg shrink-0 mt-0.5 ${
                  alert.severity === 'SEVERE' ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400'
                }`}>
                  <BellRing className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-cyan-400 font-bold">{alert.alert_id}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      alert.severity === 'SEVERE'
                        ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                        : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                    }`}>
                      {alert.severity}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 bg-navy-950 px-2 py-0.5 rounded">
                      Forecast Day {alert.forecast_day}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white mt-1">{alert.event_type} — {alert.region}</h3>
                  <p className="text-slate-300 text-[11px] mt-1 leading-relaxed">{alert.message}</p>
                </div>
              </div>

              <div className="flex flex-col items-end shrink-0 border-t md:border-t-0 md:border-l border-navy-800 pt-2 md:pt-0 md:pl-4 font-mono text-right">
                <span className="text-slate-400 text-[10px]">ANOMALY SCORE</span>
                <span className="text-sm font-bold text-cyan-400">{alert.anomaly_score.toFixed(2)}</span>
                <span className="text-[10px] text-amber-400 mt-1">Footprint: ~5 km</span>
                <span className="text-[9px] text-slate-500 mt-1">Status: {alert.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
