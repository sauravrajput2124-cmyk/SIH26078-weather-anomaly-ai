from fastapi import APIRouter, HTTPException, Path
from typing import Dict, Any, List
from app.services.weather_data_service import weather_service

router = APIRouter(prefix="/api/forecast", tags=["Forecast Analysis"])

@router.get("/{day}")
def get_forecast_by_day(day: int = Path(..., ge=1, le=10, description="Forecast day between 1 and 10")):
    """Get snapshot of all active anomalies and grid points for a specific forecast day."""
    anomalies = weather_service.get_all_anomalies()
    snapshot_points = []
    
    for anom in anomalies:
        trajectory = anom.get("trajectory", [])
        day_pt = next((p for p in trajectory if p.get("day") == day), None)
        if day_pt:
            snapshot_points.append({
                "anomaly_id": anom.get("id"),
                "event_type": anom.get("event_type"),
                "region": anom.get("region"),
                "severity": anom.get("severity"),
                "latitude": day_pt.get("latitude"),
                "longitude": day_pt.get("longitude"),
                "intensity": day_pt.get("intensity"),
                "anomaly_score": day_pt.get("anomaly_score"),
                "rainfall_mm": day_pt.get("rainfall_mm"),
                "temp_c": day_pt.get("temp_c"),
                "wind_kmh": day_pt.get("wind_kmh"),
                "pressure_hpa": day_pt.get("pressure_hpa"),
                "bounding_box": day_pt.get("bounding_box")
            })
            
    return {
        "forecast_day": day,
        "total_active_anomalies": len(snapshot_points),
        "snapshot_points": snapshot_points
    }

@router.get("/chart-data/{anomaly_id}")
def get_anomaly_chart_data(anomaly_id: str):
    """Retrieve multi-variable 10-day timeline series data for Recharts UI visualizations."""
    item = weather_service.get_anomaly_by_id(anomaly_id)
    if not item:
        raise HTTPException(status_code=404, detail=f"Anomaly with ID '{anomaly_id}' not found.")
    
    trajectory = item.get("trajectory", [])
    series = []
    for pt in trajectory:
        series.append({
            "day": f"Day {pt.get('day')}",
            "forecast_day": pt.get("day"),
            "rainfall": pt.get("rainfall_mm"),
            "temperature": pt.get("temp_c"),
            "wind_speed": pt.get("wind_kmh"),
            "pressure": pt.get("pressure_hpa"),
            "intensity": pt.get("intensity"),
            "anomaly_score": pt.get("anomaly_score")
        })

    return {
        "anomaly_id": anomaly_id,
        "event_type": item.get("event_type"),
        "historical_baseline_mean": item.get("historical_mean_mm"),
        "series": series
    }
