import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.services.anomaly_detector import anomaly_detector

client = TestClient(app)

def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ONLINE"
    assert "SIH26078" in data["title"]

def test_health_endpoint():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ONLINE"
    assert data["active_anomalies_count"] > 0

def test_get_all_anomalies():
    response = client.get("/api/anomalies")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 4
    assert data[0]["id"] == "ANOM-001"

def test_get_anomaly_by_id():
    response = client.get("/api/anomalies/ANOM-001")
    assert response.status_code == 200
    data = response.json()
    assert data["event_type"] == "Extreme Rainfall"
    assert data["severity"] == "SEVERE"

def test_get_anomaly_not_found():
    response = client.get("/api/anomalies/NON-EXISTENT")
    assert response.status_code == 404

def test_analyze_endpoint():
    payload = {
        "forecast_value": 220.0,
        "historical_mean": 25.0,
        "historical_std": 45.0,
        "variable_type": "rainfall",
        "region": "Odisha Coast"
    }
    response = client.post("/api/anomalies/analyze", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["severity"] == "SEVERE"
    assert data["z_score"] > 3.0
    assert "Extreme Rainfall" in data["event_type"]

def test_trajectory_endpoint():
    response = client.get("/api/trajectory/ANOM-001")
    assert response.status_code == 200
    data = response.json()
    assert len(data["trajectory"]) == 10
    assert data["summary"]["peak_forecast_day"] == 5

def test_impact_endpoint():
    response = client.get("/api/impact/ANOM-001?day=5")
    assert response.status_code == 200
    data = response.json()
    assert data["impact_radius_km"] == 5.0
    assert len(data["impact_polygon"]) == 16

def test_alerts_endpoint():
    response = client.get("/api/alerts")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 4
    assert "ALT-2026-" in data[0]["alert_id"]

def test_z_score_detector():
    z = anomaly_detector.calculate_z_score(200.0, 50.0, 30.0)
    assert round(z, 2) == 5.0
    sev = anomaly_detector.classify_severity(z)
    assert sev == "SEVERE"
