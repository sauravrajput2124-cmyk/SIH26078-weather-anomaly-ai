from fastapi import APIRouter
from typing import List, Dict, Any
from app.services.weather_data_service import weather_service
from app.models.anomaly import HealthStatus

router = APIRouter(prefix="/api", tags=["Alerts & System"])

@router.get("/alerts", response_model=List[Dict[str, Any]])
def get_active_alerts():
    """Retrieve list of active meteorological risk alerts categorized by severity."""
    anomalies = weather_service.get_all_anomalies()
    alerts = []
    
    for index, item in enumerate(anomalies):
        severity = item.get("severity", "MODERATE")
        anomaly_score = item.get("anomaly_score", 0.7)
        event_type = item.get("event_type", "Extreme Weather")
        region = item.get("region", "India")
        forecast_day = item.get("current_forecast_day", 5)

        msg = (
            f"[{severity} ALERT] {event_type} anomaly detected over {region} "
            f"at Forecast Day {forecast_day}. Anomaly score: {anomaly_score:.2f}. "
            f"Estimated impact footprint: ~5 km radius."
        )

        alerts.append({
            "alert_id": f"ALT-2026-00{index+1}",
            "anomaly_id": item.get("id"),
            "event_type": event_type,
            "severity": severity,
            "region": region,
            "forecast_day": forecast_day,
            "anomaly_score": anomaly_score,
            "impact_radius_km": item.get("impact_radius_km", 5.0),
            "status": "ACTIVE",
            "timestamp": item.get("detected_at", "2026-09-24T06:00:00Z"),
            "message": msg
        })

    return alerts

@router.get("/health", response_model=HealthStatus)
def get_health_status():
    """Retrieve service health status and analysis engine availability."""
    anomalies = weather_service.get_all_anomalies()
    return HealthStatus(
        status="ONLINE",
        engine_name="SIH26078 Prototype Meteorological Engine",
        version="1.0.0-PROTOTYPE",
        dataset_status="LOADED (Synthetic Demo Dataset)",
        active_anomalies_count=len(anomalies)
    )
