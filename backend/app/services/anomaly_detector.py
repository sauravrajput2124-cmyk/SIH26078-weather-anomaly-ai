import math
from typing import Dict, Any
from app.models.anomaly import AnalyzeRequest, AnalyzeResponse

class AnomalyDetectorService:
    def __init__(self, z_threshold_moderate: float = 2.0, z_threshold_severe: float = 3.2):
        self.z_threshold_moderate = z_threshold_moderate
        self.z_threshold_severe = z_threshold_severe

    def calculate_z_score(self, forecast_val: float, mean_val: float, std_val: float) -> float:
        if std_val <= 0:
            std_val = 1e-5
        return (forecast_val - mean_val) / std_val

    def calculate_anomaly_score(self, z_score: float) -> float:
        """Normalized 0 to 1 anomaly magnitude score using a smooth logistic transform."""
        abs_z = abs(z_score)
        # Logistic curve centered near Z = 2.0
        score = 1.0 / (1.0 + math.exp(-0.85 * (abs_z - 2.2)))
        return round(min(max(score, 0.01), 0.99), 3)

    def classify_severity(self, z_score: float) -> str:
        abs_z = abs(z_score)
        if abs_z >= self.z_threshold_severe:
            return "SEVERE"
        elif abs_z >= self.z_threshold_moderate:
            return "MODERATE"
        else:
            return "LOW"

    def determine_event_type(self, variable_type: str, forecast_val: float, z_score: float) -> str:
        v_type = variable_type.lower()
        if "rain" in v_type or "precip" in v_type:
            return "Extreme Rainfall"
        elif "temp" in v_type or "heat" in v_type:
            if z_score > 0:
                return "Heatwave"
            else:
                return "Cold Wave"
        elif "wind" in v_type or "speed" in v_type:
            if forecast_val > 90.0:
                return "Cyclone"
            else:
                return "Extreme Wind"
        return "Extreme Weather Anomaly"

    def analyze(self, request: AnalyzeRequest) -> AnalyzeResponse:
        z_score = self.calculate_z_score(request.forecast_value, request.historical_mean, request.historical_std)
        score = self.calculate_anomaly_score(z_score)
        severity = self.classify_severity(z_score)
        event_type = self.determine_event_type(request.variable_type, request.forecast_value, z_score)
        
        explanation = (
            f"Forecast {request.variable_type} value ({request.forecast_value}) is "
            f"{abs(round(z_score, 2))} standard deviations {'above' if z_score >= 0 else 'below'} "
            f"historical mean ({request.historical_mean}). Anomaly score = {score:.2f}."
        )

        confidence = round(min(0.75 + (abs(z_score) * 0.05), 0.96), 2)
        threshold_info = f"Moderate Z >= {self.z_threshold_moderate}, Severe Z >= {self.z_threshold_severe}"

        return AnalyzeResponse(
            anomaly_score=score,
            z_score=round(z_score, 3),
            severity=severity,
            event_type=event_type,
            explanation=explanation,
            confidence=confidence,
            threshold_applied=threshold_info
        )

anomaly_detector = AnomalyDetectorService()
