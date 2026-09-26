import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Anomaly, LayerState } from './types/weather';
import { fetchAnomalies, analyzeWeatherValues } from './services/api';
import { Header } from './components/Header';
import { ExplainabilityModal } from './components/ExplainabilityModal';
import { DashboardPage } from './pages/DashboardPage';
import { TrackingPage } from './pages/TrackingPage';
import { ForecastPage } from './pages/ForecastPage';
import { DownscalingPage } from './pages/DownscalingPage';
import { GnnPage } from './pages/GnnPage';
import { PhysicsPage } from './pages/PhysicsPage';
import { ImpactPage } from './pages/ImpactPage';
import { AlertsPage } from './pages/AlertsPage';
import { AboutPage } from './pages/AboutPage';
import { INITIAL_ANOMALIES } from './data/initialDemoData';
import { CheckCircle2, Loader2, Sparkles, X } from 'lucide-react';

export const App: React.FC = () => {
  const [anomalies, setAnomalies] = useState<Anomaly[]>(INITIAL_ANOMALIES);
  const [selectedAnomalyId, setSelectedAnomalyId] = useState<string>('ANOM-001');
  const [forecastDay, setForecastDay] = useState<number>(5);
  const [isExplainableOpen, setIsExplainableOpen] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisProgressStep, setAnalysisProgressStep] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [layers, setLayers] = useState<LayerState>({
    footprint: true,
    trajectory: true,
    impactZone: true,
    forecastTrack: true,
    riskLevel: true,
    boundingBox: true,
  });

  useEffect(() => {
    fetchAnomalies().then(data => {
      if (data && data.length > 0) {
        setAnomalies(data);
      }
    });
  }, []);

  const handleToggleLayer = (layerKey: keyof LayerState) => {
    setLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  const handleSelectScenario = (anomalyId: string) => {
    setSelectedAnomalyId(anomalyId);
    const target = anomalies.find(a => a.id === anomalyId);
    if (target) {
      setForecastDay(target.current_forecast_day || 5);
    }
  };

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    const steps = [
      '1/5 Loading Ensemble Forecast Grid...',
      '2/5 Computing Z-Score Climatological Baseline...',
      '3/5 Tracking 4D Spatio-Temporal Trajectory...',
      '4/5 Downscaling to 5 km Localized Impact Grid...',
      '5/5 Validating Physics Loss & Updating Alerts...',
    ];

    for (let i = 0; i < steps.length; i++) {
      setAnalysisProgressStep(steps[i]);
      await new Promise(r => setTimeout(r, 600));
    }

    // Call live analysis API for active scenario
    const selected = anomalies.find(a => a.id === selectedAnomalyId) || anomalies[0];
    await analyzeWeatherValues({
      forecast_value: selected.forecast_val_mm,
      historical_mean: selected.historical_mean_mm,
      historical_std: 35.0,
      variable_type: selected.event_type,
      region: selected.region,
    });

    setIsAnalyzing(false);
    setAnalysisProgressStep('');
    setToastMessage('Analysis Complete! Anomaly Scores, Bounding Boxes & Trajectory maps updated.');
    setTimeout(() => setToastMessage(null), 5000);
  };

  const selectedAnomaly = anomalies.find(a => a.id === selectedAnomalyId) || anomalies[0];

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col font-sans">
      <Header
        onRunAnalysis={handleRunAnalysis}
        isAnalyzing={isAnalyzing}
        activeScenario={selectedAnomalyId}
        onSelectScenario={handleSelectScenario}
      />

      {/* Interactive Progress Modal during Demo Analysis */}
      {isAnalyzing && (
        <div className="fixed inset-0 z-[3000] bg-navy-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-navy-900 border border-cyan-500/40 rounded-xl p-6 max-w-md w-full shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Running Meteorological Anomaly Engine</h3>
              <p className="text-xs text-slate-400 mt-1 font-mono">{analysisProgressStep}</p>
            </div>
            <div className="w-full bg-navy-950 h-2 rounded-full overflow-hidden border border-navy-800">
              <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full animate-pulse transition-all duration-300 w-3/4" />
            </div>
          </div>
        </div>
      )}

      {/* Completion Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-[2500] bg-navy-900 border border-emerald-500/50 text-emerald-300 px-4 py-3 rounded-lg shadow-2xl flex items-center space-x-3 text-xs animate-in slide-in-from-bottom duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white p-0.5">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Container View */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        <Routes>
          <Route
            path="/"
            element={
              <DashboardPage
                anomalies={anomalies}
                selectedAnomalyId={selectedAnomalyId}
                onSelectAnomaly={setSelectedAnomalyId}
                forecastDay={forecastDay}
                onDayChange={setForecastDay}
                layers={layers}
                onToggleLayer={handleToggleLayer}
                onOpenExplainability={() => setIsExplainableOpen(true)}
              />
            }
          />
          <Route
            path="/tracking"
            element={
              <TrackingPage
                anomalies={anomalies}
                selectedAnomalyId={selectedAnomalyId}
                onSelectAnomaly={setSelectedAnomalyId}
                forecastDay={forecastDay}
                onDayChange={setForecastDay}
                layers={layers}
                onToggleLayer={handleToggleLayer}
                onOpenExplainability={() => setIsExplainableOpen(true)}
              />
            }
          />
          <Route
            path="/forecast"
            element={
              <ForecastPage
                anomalies={anomalies}
                selectedAnomalyId={selectedAnomalyId}
                onSelectAnomaly={setSelectedAnomalyId}
              />
            }
          />
          <Route path="/downscaling" element={<DownscalingPage />} />
          <Route path="/gnn" element={<GnnPage />} />
          <Route path="/physics" element={<PhysicsPage />} />
          <Route
            path="/impact"
            element={
              <ImpactPage
                anomalies={anomalies}
                selectedAnomalyId={selectedAnomalyId}
                onSelectAnomaly={setSelectedAnomalyId}
                forecastDay={forecastDay}
                layers={layers}
                onToggleLayer={handleToggleLayer}
                onOpenExplainability={() => setIsExplainableOpen(true)}
              />
            }
          />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>

      {/* Explainability Diagnostic Modal */}
      {selectedAnomaly && (
        <ExplainabilityModal
          isOpen={isExplainableOpen}
          onClose={() => setIsExplainableOpen(false)}
          anomaly={selectedAnomaly}
        />
      )}

      {/* Footer */}
      <footer className="bg-navy-900 border-t border-navy-800 py-3 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-cyan-400 font-mono">SIH26078</span>
            <span>AI-Driven Spatio-Temporal Extreme Weather Intelligence</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1 sm:mt-0 font-mono">
            Mode: DEMO / PROTOTYPE SIMULATION
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
