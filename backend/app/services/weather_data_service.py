import os
import json
from typing import Dict, Any, List, Optional
from app.models.anomaly import AnomalyItem

DATA_FILE_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "..", "data", "demo_weather_data.json")

class WeatherDataService:
    def __init__(self, data_path: str = DATA_FILE_PATH):
        self.data_path = os.path.abspath(data_path)
        self._cached_data: Optional[Dict[str, Any]] = None

    def load_demo_data(self) -> Dict[str, Any]:
        """Loads and returns the synthetic demonstration weather dataset."""
        if self._cached_data is None:
            if not os.path.exists(self.data_path):
                # Fallback dataset if file is somehow missing
                return {
                    "metadata": {"title": "Fallback Demo Dataset", "forecast_range_days": 10},
                    "anomalies": []
                }
            with open(self.data_path, "r", encoding="utf-8") as f:
                self._cached_data = json.load(f)
        return self._cached_data

    def get_all_anomalies(self) -> List[Dict[str, Any]]:
        data = self.load_demo_data()
        return data.get("anomalies", [])

    def get_anomaly_by_id(self, anomaly_id: str) -> Optional[Dict[str, Any]]:
        anomalies = self.get_all_anomalies()
        for item in anomalies:
            if item.get("id") == anomaly_id:
                return item
        return None

    def load_netcdf(self, file_path: str = "") -> Dict[str, Any]:
        """
        Stub loader for operational NetCDF NWP fields.
        Returns explicit non-failing status when NetCDF drivers or files are not configured.
        """
        return {
            "status": "NOT_CONFIGURED",
            "format": "NetCDF-4",
            "message": "NetCDF ingestion pipeline is not configured in current prototype mode. Structure is ready for xarray/netcdf4 integration in Phase 2.",
            "supported": False
        }

    def load_grib2(self, file_path: str = "") -> Dict[str, Any]:
        """
        Stub loader for operational GRIB2 NCUM/NEPS ensemble data.
        Returns explicit non-failing status when GRIB drivers or files are not configured.
        """
        return {
            "status": "NOT_CONFIGURED",
            "format": "GRIB2",
            "message": "GRIB2 ingestion pipeline is not configured in current prototype mode. Structure is ready for cfgrib/eccodes integration in Phase 2.",
            "supported": False
        }

weather_service = WeatherDataService()
