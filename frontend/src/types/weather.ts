export interface BoundingBox {
  min_lat: number;
  max_lat: number;
  min_lon: number;
  max_lon: number;
}

export interface TrajectoryPoint {
  day: number;
  latitude: number;
  longitude: number;
  intensity: number;
  anomaly_score: number;
  rainfall_mm: number;
  temp_c: number;
  wind_kmh: number;
  pressure_hpa: number;
  bounding_box: BoundingBox;
}

export interface Anomaly {
  id: string;
  event_type: 'Extreme Rainfall' | 'Cyclone' | 'Heatwave' | 'Cold Wave' | 'Extreme Wind' | string;
  region: string;
  severity: 'LOW' | 'MODERATE' | 'SEVERE';
  current_forecast_day: number;
  base_latitude: number;
  base_longitude: number;
  intensity: number;
  anomaly_score: number;
  confidence: number;
  impact_radius_km: number;
  detected_at: string;
  description: string;
  historical_mean_mm: number;
  forecast_val_mm: number;
  z_score: number;
  explanation: string;
  trajectory: TrajectoryPoint[];
}

export interface AnalyzeRequest {
  forecast_value: number;
  historical_mean: number;
  historical_std: number;
  variable_type: string;
  region?: string;
}

export interface AnalyzeResponse {
  anomaly_score: number;
  z_score: number;
  severity: string;
  event_type: string;
  explanation: string;
  confidence: number;
  threshold_applied: string;
}

export interface Alert {
  alert_id: string;
  anomaly_id: string;
  event_type: string;
  severity: 'LOW' | 'MODERATE' | 'SEVERE';
  region: string;
  forecast_day: number;
  anomaly_score: number;
  impact_radius_km: number;
  status: string;
  timestamp: string;
  message: string;
}

export interface HealthStatus {
  status: string;
  engine_name: string;
  version: string;
  dataset_status: string;
  active_anomalies_count: number;
}

export interface LayerState {
  footprint: boolean;
  trajectory: boolean;
  impactZone: boolean;
  forecastTrack: boolean;
  riskLevel: boolean;
  boundingBox: boolean;
}
