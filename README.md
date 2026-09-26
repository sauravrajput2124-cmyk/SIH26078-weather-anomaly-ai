# AI-Driven Spatio-Temporal Tracking of Extreme Weather Anomalies (SIH26078)

![SIH26078 Prototype](https://img.shields.io/badge/SIH2026-SIH26078-blueviolet)
![Status](https://img.shields.io/badge/Status-Working%20Prototype%20(Demo%20Mode)-cyan)
![Stack](https://img.shields.io/badge/Stack-FastAPI%20%7C%20React%20%7C%20Leaflet%20%7C%20Recharts-blue)

A complete working prototype for Smart India Hackathon 2026 Problem Statement **SIH26078**: *AI-Driven Spatio-Temporal Tracking of Extreme Weather Anomalies in Medium-Range Forecasts*.

---

## 🌧️ Overview & Architecture

The system demonstrates end-to-end spatio-temporal tracking of severe weather anomalies (extreme rainfall, cyclones, heatwaves, cold waves, wind storms) across 3–10 day medium-range forecast windows (12 km global ensemble downscaled to 5 km localized impact).

```text
NWP / Ensemble Weather Data
        ↓
Data Processing & Climatological Baseline
        ↓
Z-Score Extreme Anomaly Detection Engine
        ↓
Spatio-Temporal 4D Tracking & Trajectory
        ↓
Dynamic Anomaly Bounding Box
        ↓
12 km → 5 km Downscaling Representation
        ↓
Physics-Informed Validation Loss Concept
        ↓
5 km Localized Risk & Impact Map
        ↓
Risk Severity Classification (LOW / MODERATE / SEVERE)
        ↓
FastAPI Alert & Intelligence REST API
        ↓
Interactive Dark Meteorological Dashboard
```

---

## ⚡ Technical Stack

### Frontend
- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS + Custom Meteorological Dark Theme (`#0B132B`, `#1C2541`, `#3A506B`, `#00F5D4`)
- **Map & Geospatial**: Leaflet + React-Leaflet
- **Charts**: Recharts
- **Icons**: Lucide React

### Backend
- **Framework**: Python 3.10+ & FastAPI
- **Data & Numerical**: NumPy, Pandas, Pydantic
- **Testing**: Pytest, HTTPX

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+) & npm
- Python (v3.10+)

---

### Step 1: Run Backend (FastAPI)

```powershell
# Navigate to backend folder
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv
venv\Scripts\activate   # On Windows PowerShell
# source venv/bin/activate # On Linux/macOS

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server
uvicorn app.main:app --reload --port 8000
```

FastAPI will start at: `http://localhost:8000`  
Open API Swagger Documentation: `http://localhost:8000/docs`

---

### Step 2: Run Frontend (React + Vite)

In a new terminal window:

```powershell
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```

Frontend dashboard will open at: `http://localhost:5173`

---

## 📡 API Endpoints Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status & engine state |
| `GET` | `/api/anomalies` | Fetch all active weather anomalies |
| `GET` | `/api/anomalies/{id}` | Get detail for a specific anomaly |
| `POST` | `/api/anomalies/analyze` | Live anomaly detector (computes Z-score & severity) |
| `GET` | `/api/trajectory/{id}` | Spatio-temporal trajectory points (Days 1–10) |
| `GET` | `/api/impact/{id}` | 5 km high-resolution localized impact zone |
| `GET` | `/api/forecast/{day}` | Meteorological grid snapshot for a given day |
| `GET` | `/api/alerts` | Active risk alerts categorized by severity |

---

## 🔬 Real vs Prototype Status (Technical Honesty)

| Feature | Operational Prototype | Proposed Production AI Module |
|---|---|---|
| **Data Ingestion** | Synthetic multi-day JSON dataset | Live NCUM / NEPS GRIB2 & NetCDF feed |
| **Anomaly Detection** | Heuristic Z-Score baseline algorithm | Trained Spherical Graph Neural Network (MeshGraphNet) |
| **Downscaling** | Intensity-preserving spatial refinement | Conditional Latent Diffusion Super-Resolution Model |
| **Physics Constraints** | Thermodynamic/Moisture loss check model | Loss term integrated directly into PyTorch backward pass |
| **Geospatial UI** | Fully Interactive Leaflet Map & Timeline | Production GIS Integration |

---

## 📂 Project Structure

```text
SIH2/
├── backend/
│   ├── app/
│   │   ├── main.py               # FastAPI entrypoint
│   │   ├── models/               # Pydantic schemas
│   │   ├── services/             # Anomaly detector & tracking engine
│   │   ├── routers/              # REST routers
│   │   └── utils/                # Physics validator helper
│   ├── tests/                    # Pytest test suite
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/           # Map, Timeline, Downscaling, GNN, BoundingBox
│   │   ├── pages/                # 9 interactive view pages
│   │   ├── services/             # API Axios client
│   │   └── types/                # TypeScript interfaces
│   ├── package.json
│   └── vite.config.ts
├── data/
│   └── demo_weather_data.json    # Synthetic 10-day forecast dataset
├── docs/
│   └── AI_ROADMAP.md             # Production PyTorch/DGL integration roadmap
└── README.md
```
