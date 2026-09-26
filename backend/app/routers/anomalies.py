from fastapi import APIRouter, HTTPException, Path, Query
from typing import List, Dict, Any
from app.models.anomaly import AnomalyItem, AnalyzeRequest, AnalyzeResponse
from app.services.weather_data_service import weather_service
from app.services.anomaly_detector import anomaly_detector
from app.services.tracking_service import tracking_service
from app.utils.physics_validator import physics_validator

router = APIRouter(prefix="/api", tags=["Anomalies & Tracking"])

@router.get("/anomalies", response_model=List[Dict[str, Any]])
def get_all_anomalies():
    """Retrieve list of all active weather anomalies."""
    return weather_service.get_all_anomalies()

@router.get("/anomalies/{anomaly_id}")
def get_anomaly_by_id(anomaly_id: str = Path(..., description="Anomaly identifier (e.g. ANOM-001)")):
    """Retrieve detailed metadata for a specific weather anomaly."""
    item = weather_service.get_anomaly_by_id(anomaly_id)
    if not item:
        raise HTTPException(status_code=404, detail=f"Anomaly with ID '{anomaly_id}' not found.")
    return item

@router.post("/anomalies/analyze", response_model=AnalyzeResponse)
def analyze_weather_values(request: AnalyzeRequest):
    """
    Transparent Anomaly Analysis Engine.
    Calculates Z-score, anomaly magnitude score, classifies risk severity, and provides physical explanation.
    """
    return anomaly_detector.analyze(request)

@router.get("/trajectory/{anomaly_id}")
def get_anomaly_trajectory(anomaly_id: str):
    """Retrieve 10-day spatio-temporal trajectory points and direction summary."""
    item = weather_service.get_anomaly_by_id(anomaly_id)
    if not item:
        raise HTTPException(status_code=404, detail=f"Anomaly with ID '{anomaly_id}' not found.")
    
    trajectory = item.get("trajectory", [])
    summary = tracking_service.get_trajectory_summary(trajectory)
    
    return {
        "anomaly_id": anomaly_id,
        "event_type": item.get("event_type"),
        "trajectory": trajectory,
        "summary": summary
    }

@router.get("/impact/{anomaly_id}")
def get_localized_impact(anomaly_id: str, day: int = Query(5, ge=1, le=10)):
    """Retrieve 5 km high-resolution downscaled localized impact footprint polygon for a given day."""
    item = weather_service.get_anomaly_by_id(anomaly_id)
    if not item:
        raise HTTPException(status_code=404, detail=f"Anomaly with ID '{anomaly_id}' not found.")
    
    trajectory = item.get("trajectory", [])
    target_point = next((p for p in trajectory if p.get("day") == day), None)
    if not target_point:
        target_point = trajectory[min(day - 1, len(trajectory) - 1)]

    lat = target_point.get("latitude")
    lon = target_point.get("longitude")
    intensity = target_point.get("intensity", 80.0)

    footprint = tracking_service.generate_5km_impact_footprint(lat, lon, impact_radius_km=item.get("impact_radius_km", 5.0))
    bbox = tracking_service.compute_bounding_box(lat, lon, intensity)
    loss_eval = physics_validator.compute_composite_loss(
        prediction_loss=0.035,
        temp_c=target_point.get("temp_c", 28.0),
        rainfall_mm=target_point.get("rainfall_mm", 150.0)
    )

    return {
        "anomaly_id": anomaly_id,
        "forecast_day": day,
        "center": {"latitude": lat, "longitude": lon},
        "intensity": intensity,
        "impact_radius_km": item.get("impact_radius_km", 5.0),
        "bounding_box": bbox,
        "impact_polygon": footprint,
        "downscaling_resolution": "5 km Localized Impact Grid",
        "nwp_source_resolution": "12 km Global Ensemble NWP",
        "physics_validation": loss_eval
    }
