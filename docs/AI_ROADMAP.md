# AI/ML Roadmap: SIH26078 Production AI Integration Guide

This document specifies the step-by-step transition plan from the current operational prototype to a production-grade AI system using PyTorch, DGL (Deep Graph Library), and Hugging Face Diffusers.

---

## 1. Modular Architecture Overview

The backend code structure has been intentionally decoupled into modular services so that prototype heuristic models can be replaced with trained deep learning models without modifying the frontend application or API schemas.

```text
               +----------------------------------+
               |  NWP Data Ingestion (NCUM/NEPS)  |
               +----------------------------------+
                                |
                                v
               +----------------------------------+
               |    Spherical Graph Conversion    |
               |      (Icosahedral Mesh Grid)     |
               +----------------------------------+
                                |
                                v
               +----------------------------------+
               |   Spatio-Temporal Graph Neural   |
               |    Network (ST-GNN / Spherical)  |
               +----------------------------------+
                                |
                                v
               +----------------------------------+
               |   Extreme Anomaly Bounding Box   |
               |      & Trajectory Tracking       |
               +----------------------------------+
                                |
                                v
               +----------------------------------+
               |  Conditional Diffusion Model     |
               |  (12 km Global -> 5 km Localized) |
               +----------------------------------+
                                |
                                v
               +----------------------------------+
               | Physics-Informed Validation Loss |
               |     (Thermodynamic / Moisture)   |
               +----------------------------------+
                                |
                                v
               +----------------------------------+
               |      REST Alerting & UI API      |
               +----------------------------------+
```

---

## 2. Nine-Phase Implementation Roadmap

### Phase 1: Prototype Anomaly Engine (Current Status)
- Heuristic Z-Score calculation based on climatological mean and standard deviation.
- Dynamic spatio-temporal trajectory simulation and bounding box calculation across Days 1–10.
- 12 km → 5 km downscaling simulation and physics-informed loss check presentation.

### Phase 2: Real NWP Ingestion (NCUM / NEPS Ensemble Data)
- Integrate `xarray`, `cfgrib`, and `netcdf4` inside `backend/app/services/weather_data_service.py`.
- Ingest IMD / NCMRWF operational global forecast fields (Temperature at 2m, Total Precipitation, U/V Wind components at 850hPa, Mean Sea Level Pressure).

### Phase 3: Spherical Mesh & Graph Construction
- Project global lat/lon grid onto an Icosahedral Spherical Mesh ($H_5$ or $H_6$ level subdivison).
- Construct graph edges based on geodesic distance on the unit sphere using PyTorch Geometric or DGL.
- Node features: Multivariable 4D weather tensors $[B, T, N, F]$.

### Phase 4: Train PyTorch / DGL Spherical GNN
- Implement Spherical Graph Convolution (MeshGraphNet or GraphCast architecture).
- Predict 3D temporal evolution of state vectors and compute graph-based node anomaly scores:
  $$\text{Score}(v_i) = \sigma(W \cdot \text{Aggregate}(\{v_j, j \in \mathcal{N}(i)\}))$$
- Replace `backend/app/services/anomaly_detector.py` with `PyTorchAnomalyDetector`.

### Phase 5: EFI & Operational Climatology Integration
- Calculate operational Extreme Forecast Index (EFI) using 20-year ERA5 climatological ensemble reanalysis distributions:
  $$\text{EFI} = \frac{2}{\pi} \int_{0}^{1} \frac{F(q) - E(q)}{\sqrt{q(1-q)}} dq$$

### Phase 6: Conditional Diffusion Model Downscaling (12 km → 5 km)
- Train a 2D/3D super-resolution Latent Diffusion Model (UNet backbone with cross-attention on NWP spatial context).
- Input: 12 km coarse NWP crop around the anomaly bounding box.
- Output: High-resolution 5 km physical surface parameter field preserving local topographic effects.
- Replace `backend/app/services/tracking_service.py` downscaling method with model inference engine.

### Phase 7: Physics-Informed Loss Training
- Incorporate physics-informed penalty constraints during diffusion and GNN backpropagation:
  $$\mathcal{L}_{\text{total}} = \mathcal{L}_{\text{MSE}} + \lambda_1 \mathcal{L}_{\text{mass\_conservation}} + \lambda_2 \mathcal{L}_{\text{thermo}} + \lambda_3 \mathcal{L}_{\text{extreme\_preservation}}$$
- Ensure strict energy and moisture flux conservation.

### Phase 8: Real-Time Ingestion & Model Serving
- Wrap PyTorch model weights using ONNX Runtime or TorchScript for sub-100ms inference.
- Expose WebSocket streams for live radar/NWP model update triggers.

### Phase 9: Cloud Deployment & Monitoring
- Containerize using Docker and deploy to Kubernetes / AWS SageMaker with GPU acceleration (NVIDIA A10G / T4).
