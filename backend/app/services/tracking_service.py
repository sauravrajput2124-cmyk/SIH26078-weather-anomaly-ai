import math
from typing import Dict, Any, List

class SpatioTemporalTrackingService:
    def __init__(self):
        pass

    def compute_bounding_box(self, lat: float, lon: float, intensity: float) -> Dict[str, float]:
        """Calculates dynamic geographical bounding box around an anomaly based on intensity."""
        # Base expansion in degrees (~111km per lat degree)
        delta_lat = 0.5 + (intensity / 100.0) * 0.85
        delta_lon = 0.5 + (intensity / 100.0) * 0.85
        
        return {
            "min_lat": round(lat - delta_lat, 2),
            "max_lat": round(lat + delta_lat, 2),
            "min_lon": round(lon - delta_lon, 2),
            "max_lon": round(lon + delta_lon, 2)
        }

    def generate_5km_impact_footprint(self, lat: float, lon: float, impact_radius_km: float = 5.0) -> List[Dict[str, float]]:
        """Generates a high-resolution 16-point circle polygon representing the 5 km impact footprint."""
        points = []
        num_points = 16
        earth_radius = 6371.0  # km
        
        for i in range(num_points):
            bearing = (2 * math.pi / num_points) * i
            bearing_deg = math.degrees(bearing)
            
            lat_rad = math.radians(lat)
            lon_rad = math.radians(lon)
            d_rad = impact_radius_km / earth_radius

            p_lat_rad = math.asin(
                math.sin(lat_rad) * math.cos(d_rad) +
                math.cos(lat_rad) * math.sin(d_rad) * math.cos(bearing)
            )
            p_lon_rad = lon_rad + math.atan2(
                math.sin(bearing) * math.sin(d_rad) * math.cos(lat_rad),
                math.cos(d_rad) - math.sin(lat_rad) * math.sin(p_lat_rad)
            )
            
            points.append({
                "latitude": round(math.degrees(p_lat_rad), 5),
                "longitude": round(math.degrees(p_lon_rad), 5),
                "bearing_deg": round(bearing_deg, 1)
            })
            
        return points

    def get_trajectory_summary(self, trajectory: List[Dict[str, Any]]) -> Dict[str, Any]:
        if not trajectory:
            return {}
        
        day_1 = trajectory[0]
        day_last = trajectory[-1]

        total_dist_km = math.sqrt(
            (day_last["latitude"] - day_1["latitude"])**2 +
            (day_last["longitude"] - day_1["longitude"])**2
        ) * 111.0

        max_intensity = max([p.get("intensity", 0) for p in trajectory])
        peak_day = next((p.get("day") for p in trajectory if p.get("intensity") == max_intensity), 5)

        return {
            "total_points": len(trajectory),
            "start_day": day_1.get("day"),
            "end_day": day_last.get("day"),
            "estimated_distance_km": round(total_dist_km, 1),
            "peak_intensity": max_intensity,
            "peak_forecast_day": peak_day,
            "direction_vector": f"From ({day_1['latitude']}, {day_1['longitude']}) to ({day_last['latitude']}, {day_last['longitude']})"
        }

tracking_service = SpatioTemporalTrackingService()
