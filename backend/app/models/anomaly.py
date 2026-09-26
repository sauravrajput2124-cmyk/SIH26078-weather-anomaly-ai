from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class BoundingBox(BaseModel):
    min_lat: float
    max_lat: float
    min_lon: float
    max_lon: float

class TrajectoryPoint(BaseModel):
    day: int
    latitude: float
    longitude: float
    intensity: float
    anomaly_score: float
    rainfall_mm: float
    temp_c: float
    wind_kmh: float
    pressure_hpa: float
    bounding_box: BoundingBox

class AnomalyItem(BaseModel):
    id: str
    event_type: str
    region: str
    severity: str
    current_forecast_day: int
    base_latitude: float
    base_longitude: float
    intensity: float
    anomaly_score: float
    confidence: float
    impact_radius_km: float
    detected_at: str
    description: str
    historical_mean_mm: float
    forecast_val_mm: float
    z_score: float
    explanation: str
    trajectory: List[TrajectoryPoint]

class AnalyzeRequest(BaseModel):
    forecast_value: float = Field(..., description="Observed/Forecast weather variable value")
    historical_mean: float = Field(..., description="Climatological baseline mean value")
    historical_std: float = Field(..., description="Climatological standard deviation (> 0)")
    variable_type: str = Field("rainfall", description="Weather variable: rainfall, temperature, wind")
    region: Optional[str] = "Demo Region"

class AnalyzeResponse(BaseModel):
    anomaly_score: float
    z_score: float
    severity: str
    event_type: str
    explanation: str
    confidence: float
    threshold_applied: str

class AlertItem(BaseModel):
    alert_id: str
    anomaly_id: str
    event_type: str
    severity: str
    region: str
    forecast_day: int
    anomaly_score: float
    impact_radius_km: float
    status: str
    timestamp: str
    message: str

class HealthStatus(BaseModel):
    status: str
    engine_name: str
    version: str
    dataset_status: str
    active_anomalies_count: int
