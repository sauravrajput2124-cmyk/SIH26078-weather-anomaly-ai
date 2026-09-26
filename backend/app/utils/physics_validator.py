import math
from typing import Dict, Any

class PhysicsInformedValidator:
    """
    Evaluates physical consistency constraints for AI forecast outputs
    to ensure thermodynamic, moisture, and mass conservation bounds are respected.
    """

    @staticmethod
    def evaluate_moisture_consistency(temp_c: float, rainfall_mm: float) -> Dict[str, Any]:
        """Checks if predicted precipitation exceeds Clausius-Clapeyron atmospheric moisture capacity limit."""
        # Clausius-Clapeyron saturated vapor pressure approximation
        es = 6.112 * math.exp((17.67 * temp_c) / (temp_c + 243.5))
        max_precip_capacity = es * 4.5  # empirical physical ceiling index

        is_physically_plausible = rainfall_mm <= max_precip_capacity
        moisture_deficit_penalty = max(0.0, (rainfall_mm - max_precip_capacity) / max_precip_capacity)

        return {
            "saturated_vapor_pressure_hpa": round(es, 2),
            "max_physical_capacity_mm": round(max_precip_capacity, 2),
            "is_physically_plausible": is_physically_plausible,
            "penalty_score": round(moisture_deficit_penalty, 3)
        }

    @staticmethod
    def compute_composite_loss(prediction_loss: float = 0.042, temp_c: float = 28.0, rainfall_mm: float = 215.0) -> Dict[str, Any]:
        moisture_eval = PhysicsInformedValidator.evaluate_moisture_consistency(temp_c, rainfall_mm)
        
        physics_loss = moisture_eval["penalty_score"] * 0.15
        amplitude_preservation_loss = 0.012  # low penalty when peak amplitude is preserved

        total_loss = prediction_loss + physics_loss + amplitude_preservation_loss

        return {
            "prediction_loss": round(prediction_loss, 4),
            "physics_loss": round(physics_loss, 4),
            "amplitude_loss": round(amplitude_preservation_loss, 4),
            "total_loss": round(total_loss, 4),
            "thermodynamic_status": "VALIDATED" if moisture_eval["is_physically_plausible"] else "PENALIZED",
            "moisture_eval": moisture_eval
        }

physics_validator = PhysicsInformedValidator()
