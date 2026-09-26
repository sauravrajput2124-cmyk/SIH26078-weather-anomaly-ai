import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Rectangle, Circle, LayersControl, LayerGroup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Anomaly, LayerState } from '../types/weather';
import { Layers, Eye, ShieldAlert, Sparkles, Navigation, Info } from 'lucide-react';

interface WeatherMapProps {
  anomalies: Anomaly[];
  selectedAnomalyId: string;
  onSelectAnomaly: (id: string) => void;
  forecastDay: number;
  layers: LayerState;
  onToggleLayer: (layerKey: keyof LayerState) => void;
  onOpenExplainability: () => void;
}

// Custom Leaflet Icons for Anomaly Types
const createCustomIcon = (eventType: string, severity: string, isSelected: boolean) => {
  let color = '#3B82F6';
  if (severity === 'SEVERE') color = '#EF4444';
  else if (severity === 'MODERATE') color = '#F59E0B';
  else color = '#10B981';

  let emoji = '⚡';
  if (eventType.includes('Rain')) emoji = '🌧️';
  else if (eventType.includes('Heat')) emoji = '☀️';
  else if (eventType.includes('Cyclone')) emoji = '🌀';
  else if (eventType.includes('Cold')) emoji = '❄️';

  const html = `
    <div style="
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: ${isSelected ? '38px' : '32px'};
      height: ${isSelected ? '38px' : '32px'};
      background: #0B132B;
      border: ${isSelected ? '3px' : '2px'} solid ${color};
      border-radius: 50%;
      box-shadow: 0 0 ${isSelected ? '16px' : '8px'} ${color};
      font-size: ${isSelected ? '18px' : '14px'};
      cursor: pointer;
      transition: all 0.2s ease-in-out;
    ">
      <span>${emoji}</span>
      ${isSelected ? `<span style="position: absolute; top:-4px; right:-4px; width:10px; height:10px; background:${color}; border-radius:50%; animate:ping 1s infinite;"></span>` : ''}
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-leaflet-marker',
    iconSize: [isSelected ? 38 : 32, isSelected ? 38 : 32],
    iconAnchor: [isSelected ? 19 : 16, isSelected ? 19 : 16],
  });
};

// Component to dynamically center map when selected anomaly changes
const MapRecenter: React.FC<{ lat: number; lon: number }> = ({ lat, lon }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lon], map.getZoom(), { animate: true, duration: 1.2 });
  }, [lat, lon, map]);
  return null;
};

export const WeatherMap: React.FC<WeatherMapProps> = ({
  anomalies,
  selectedAnomalyId,
  onSelectAnomaly,
  forecastDay,
  layers,
  onToggleLayer,
  onOpenExplainability
}) => {
  const selectedAnomaly = anomalies.find(a => a.id === selectedAnomalyId) || anomalies[0];

  // Current forecast day snapshot for selected anomaly
  const currentPt = selectedAnomaly?.trajectory.find(p => p.day === forecastDay) || selectedAnomaly?.trajectory[0];
  const centerLat = currentPt ? currentPt.latitude : (selectedAnomaly?.base_latitude || 20.5937);
  const centerLon = currentPt ? currentPt.longitude : (selectedAnomaly?.base_longitude || 78.9629);

  // Polyline trajectory coords (Day 1 - Day 10)
  const trajectoryCoords: [number, number][] = selectedAnomaly
    ? selectedAnomaly.trajectory.map(pt => [pt.latitude, pt.longitude])
    : [];

  // Current Bounding Box rectangle
  const bbox = currentPt?.bounding_box || {
    min_lat: centerLat - 0.8,
    max_lat: centerLat + 0.8,
    min_lon: centerLon - 0.8,
    max_lon: centerLon + 0.8
  };

  const boundsRectangle: [[number, number], [number, number]] = [
    [bbox.min_lat, bbox.min_lon],
    [bbox.max_lat, bbox.max_lon]
  ];

  return (
    <div className="relative w-full h-[540px] rounded-xl overflow-hidden border border-navy-700 shadow-2xl bg-navy-950">
      {/* Map Header Overlay */}
      <div className="absolute top-3 left-3 z-[1000] bg-navy-900/90 backdrop-blur-md border border-navy-700 rounded-lg p-2.5 shadow-xl max-w-xs">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <h2 className="text-xs font-bold text-white uppercase tracking-wider">Geospatial Anomaly Tracker</h2>
        </div>
        <p className="text-[11px] text-slate-300 mt-1">
          Showing <span className="text-cyan-400 font-bold">{selectedAnomaly?.event_type}</span> at <span className="text-amber-300 font-mono font-bold">Forecast Day {forecastDay}</span>
        </p>
      </div>

      {/* Layer Toggle Floating Controls */}
      <div className="absolute top-3 right-3 z-[1000] bg-navy-900/95 backdrop-blur-md border border-navy-700 rounded-lg p-2.5 shadow-xl text-xs space-y-1.5">
        <div className="flex items-center justify-between border-b border-navy-700 pb-1.5 font-bold text-slate-200">
          <span className="flex items-center space-x-1">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Layer Controls</span>
          </span>
          <span className="text-[10px] text-slate-400 font-mono">MAP LAYERS</span>
        </div>

        <label className="flex items-center space-x-2 text-slate-300 cursor-pointer hover:text-white">
          <input
            type="checkbox"
            checked={layers.footprint}
            onChange={() => onToggleLayer('footprint')}
            className="rounded bg-navy-950 border-navy-600 text-cyan-500 focus:ring-0 cursor-pointer"
          />
          <span>Anomaly Footprint</span>
        </label>

        <label className="flex items-center space-x-2 text-slate-300 cursor-pointer hover:text-white">
          <input
            type="checkbox"
            checked={layers.trajectory}
            onChange={() => onToggleLayer('trajectory')}
            className="rounded bg-navy-950 border-navy-600 text-cyan-500 focus:ring-0 cursor-pointer"
          />
          <span>Trajectory Track</span>
        </label>

        <label className="flex items-center space-x-2 text-slate-300 cursor-pointer hover:text-white">
          <input
            type="checkbox"
            checked={layers.impactZone}
            onChange={() => onToggleLayer('impactZone')}
            className="rounded bg-navy-950 border-navy-600 text-cyan-500 focus:ring-0 cursor-pointer"
          />
          <span>5 km Impact Zone</span>
        </label>

        <label className="flex items-center space-x-2 text-slate-300 cursor-pointer hover:text-white">
          <input
            type="checkbox"
            checked={layers.boundingBox}
            onChange={() => onToggleLayer('boundingBox')}
            className="rounded bg-navy-950 border-navy-600 text-cyan-500 focus:ring-0 cursor-pointer"
          />
          <span>Dynamic Bounding Box</span>
        </label>

        <label className="flex items-center space-x-2 text-slate-300 cursor-pointer hover:text-white">
          <input
            type="checkbox"
            checked={layers.riskLevel}
            onChange={() => onToggleLayer('riskLevel')}
            className="rounded bg-navy-950 border-navy-600 text-cyan-500 focus:ring-0 cursor-pointer"
          />
          <span>Risk Level Heat</span>
        </label>
      </div>

      {/* Demonstration Watermark */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-navy-950/80 backdrop-blur-sm border border-amber-500/30 text-amber-300 px-2.5 py-1 rounded text-[10px] font-mono font-semibold flex items-center space-x-1.5">
        <Sparkles className="w-3 h-3" />
        <span>DEMONSTRATION DATA (SYNTHETIC NWP)</span>
      </div>

      {/* Main Leaflet Map */}
      <MapContainer
        center={[centerLat, centerLon]}
        zoom={6}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        {/* Dark Map Tiles */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
          maxZoom={19}
        />

        <MapRecenter lat={centerLat} lon={centerLon} />

        {/* Trajectory Polyline */}
        {layers.trajectory && trajectoryCoords.length > 0 && (
          <Polyline
            positions={trajectoryCoords}
            pathOptions={{
              color: '#00F5D4',
              weight: 3,
              dashArray: '6, 8',
              opacity: 0.85
            }}
          />
        )}

        {/* Dynamic Bounding Box Overlay */}
        {layers.boundingBox && (
          <Rectangle
            bounds={boundsRectangle}
            pathOptions={{
              color: '#4CC9F0',
              weight: 2,
              fillColor: '#4CC9F0',
              fillOpacity: 0.08,
              dashArray: '4, 4'
            }}
          />
        )}

        {/* 5 km Localized Impact Circle */}
        {layers.impactZone && (
          <Circle
            center={[centerLat, centerLon]}
            radius={5000} // 5 km radius in meters
            pathOptions={{
              color: selectedAnomaly?.severity === 'SEVERE' ? '#EF4444' : '#F59E0B',
              weight: 2,
              fillColor: selectedAnomaly?.severity === 'SEVERE' ? '#EF4444' : '#F59E0B',
              fillOpacity: 0.25
            }}
          />
        )}

        {/* Risk Level Outer Heat Radius */}
        {layers.riskLevel && (
          <Circle
            center={[centerLat, centerLon]}
            radius={45000} // 45 km macro region
            pathOptions={{
              color: selectedAnomaly?.severity === 'SEVERE' ? '#EF4444' : '#3B82F6',
              weight: 1,
              fillColor: selectedAnomaly?.severity === 'SEVERE' ? '#EF4444' : '#3B82F6',
              fillOpacity: 0.1
            }}
          />
        )}

        {/* Anomaly Markers */}
        {anomalies.map(anom => {
          const pt = anom.trajectory.find(p => p.day === forecastDay) || anom.trajectory[0];
          const isSelected = anom.id === selectedAnomalyId;

          return (
            <Marker
              key={anom.id}
              position={[pt.latitude, pt.longitude]}
              icon={createCustomIcon(anom.event_type, anom.severity, isSelected)}
              eventHandlers={{
                click: () => onSelectAnomaly(anom.id)
              }}
            >
              <Popup className="custom-leaflet-popup">
                <div className="p-1 space-y-2 min-w-[220px]">
                  <div className="flex items-center justify-between border-b border-navy-700 pb-1.5">
                    <span className="font-bold text-sm text-cyan-400">{anom.event_type}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      anom.severity === 'SEVERE' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {anom.severity}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-snug">{anom.region}</p>

                  <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono bg-navy-950/60 p-2 rounded border border-navy-800">
                    <div>
                      <span className="text-slate-400 block text-[9px]">FCST DAY</span>
                      <span className="text-white font-bold">Day {forecastDay}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px]">ANOMALY SCORE</span>
                      <span className="text-cyan-400 font-bold">{pt.anomaly_score.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px]">RAINFALL / TEMP</span>
                      <span className="text-white font-bold">{pt.rainfall_mm > 0 ? `${pt.rainfall_mm} mm` : `${pt.temp_c}°C`}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px]">IMPACT RADIUS</span>
                      <span className="text-amber-300 font-bold">~5 km</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectAnomaly(anom.id);
                      onOpenExplainability();
                    }}
                    className="w-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 py-1 rounded text-xs font-semibold flex items-center justify-center space-x-1 transition cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Why was this detected?</span>
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};
