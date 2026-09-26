from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import anomalies, forecast, alerts

app = FastAPI(
    title="SIH26078 Extreme Weather Anomaly Intelligence API",
    description=(
        "Backend REST service for SIH26078: AI-Driven Spatio-Temporal Tracking of Extreme Weather Anomalies in Medium-Range Forecasts. "
        "Provides Z-score anomaly scoring, 4D trajectory tracking, dynamic bounding boxes, 5km localized impact footprints, and alert routing."
    ),
    version="1.0.0-PROTOTYPE",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Enable CORS for Vite frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API Routers
app.include_router(anomalies.router)
app.include_router(forecast.router)
app.include_router(alerts.router)

@app.get("/")
def root():
    return {
        "title": "SIH26078 Extreme Weather Anomaly Intelligence API",
        "status": "ONLINE",
        "mode": "PROTOTYPE DEMONSTRATION",
        "docs": "/docs",
        "health": "/api/health"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
