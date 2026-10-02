import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Activity,
  Crosshair,
  MapPin,
  Navigation,
  RefreshCw,
  Truck,
  Wifi,
  WifiOff,
} from "lucide-react";
import { io, type Socket } from "socket.io-client";

import type { AppDispatch, RootState } from "../../stores/store";

import {
  fetchGPSPositions,
  selectGPSLoading,
  selectGPSPositions,
  selectGPSError,
  updateRealtimeGPS,
  type GPSPosition,
} from "../../features/gps/gpsSlice";

import {
  resetSimulatedVehicles,
  SIMULATED_VEHICLES,
  simulateVehicleMovement,
} from "../../features/gps/gpsSimulator";

import "./Tracking.css";

/* =========================================================
   ABN FLEET SYSTEM
   LIVE TRACKING
   ========================================================= */

/* =========================================================
   TRACKING CONFIG
   ========================================================= */

const TRACKING_MODE =
  import.meta.env.VITE_GPS_TRACKING_MODE?.toUpperCase() || "DEMO";

const trackingMode: "LIVE" | "DEMO" =
  TRACKING_MODE === "LIVE" ? "LIVE" : "DEMO";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

const GPS_SOCKET_EVENT = import.meta.env.VITE_GPS_SOCKET_EVENT || "gps:update";

/* =========================================================
   COMPONENT
   ========================================================= */

function Tracking() {
  const dispatch = useDispatch<AppDispatch>();

  /* =======================================================
     REDUX GPS
     ======================================================= */

  const reduxPositions = useSelector((state: RootState) =>
    selectGPSPositions(state),
  );

  const loading = useSelector((state: RootState) => selectGPSLoading(state));

  const error = useSelector((state: RootState) => selectGPSError(state));

  /* =======================================================
     SIMULATION
     ======================================================= */

  const [simulationPositions, setSimulationPositions] =
    useState(SIMULATED_VEHICLES);

  /* =======================================================
     UI STATE
     ======================================================= */

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [wsConnected, setWsConnected] = useState(false);

  /* =======================================================
     ACTIVE POSITIONS
     ======================================================= */

  /*
   * LIVE
   * ----
   * Redux menjadi single source of truth.
   *
   * DEMO
   * ----
   * Simulator menjadi fallback/demo.
   */

  const positions =
    trackingMode === "LIVE" ? reduxPositions : simulationPositions;

  /* =======================================================
     INITIAL GPS LOAD
     ======================================================= */

  useEffect(() => {
    if (trackingMode !== "LIVE") {
      return;
    }

    dispatch(
      fetchGPSPositions({
        limit: 100,
      }),
    );
  }, [dispatch]);

  /* =======================================================
     GPS SIMULATION
     ======================================================= */

  useEffect(() => {
    /*
     * Simulator hanya berjalan
     * pada DEMO mode.
     */

    if (trackingMode !== "DEMO") {
      return;
    }

    const interval = window.setInterval(() => {
      setSimulationPositions((current) => simulateVehicleMovement(current));
    }, 2000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  /* =======================================================
     SOCKET.IO REALTIME
     ======================================================= */

  useEffect(() => {
    /*
     * DEMO mode tidak menggunakan Socket.IO.
     */

    if (trackingMode !== "LIVE") {
      setWsConnected(false);
      return;
    }

    let socket: Socket | null = null;

    try {
      socket = io(SOCKET_URL, {
        withCredentials: true,

        /*
         * Prefer websocket.
         * Polling tetap menjadi fallback.
         */
        transports: ["websocket", "polling"],
      });

      /* ===================================================
         CONNECT
         =================================================== */

      socket.on("connect", () => {
        console.log("ABN GPS SOCKET.IO: CONNECTED", socket?.id);

        setWsConnected(true);
      });

      /* ===================================================
         DISCONNECT
         =================================================== */

      socket.on("disconnect", (reason) => {
        console.log("ABN GPS SOCKET.IO: DISCONNECTED", reason);

        setWsConnected(false);
      });

      /* ===================================================
         CONNECT ERROR
         =================================================== */

      socket.on("connect_error", (socketError) => {
        console.error("ABN GPS SOCKET.IO: CONNECTION ERROR", socketError);

        setWsConnected(false);
      });

      /* ===================================================
         GPS REALTIME
         =================================================== */

      socket.on(GPS_SOCKET_EVENT, (gps: GPSPosition) => {
        /*
         * MQTT
         *   ↓
         * ABN Backend
         *   ↓
         * Socket.IO
         *   ↓
         * Redux
         *   ↓
         * Tracking UI
         */

        dispatch(updateRealtimeGPS(gps));
      });

      console.log(`ABN GPS SOCKET.IO: LISTENING "${GPS_SOCKET_EVENT}"`);
    } catch (socketError) {
      console.error("ABN GPS SOCKET.IO INITIALIZATION ERROR", socketError);

      setWsConnected(false);
    }

    /* ===================================================
       CLEANUP
       =================================================== */

    return () => {
      if (socket) {
        socket.disconnect();
      }

      setWsConnected(false);
    };
  }, [dispatch]);

  /* =======================================================
     SELECTED POSITION
     ======================================================= */

  const selectedPosition = useMemo(() => {
    if (selectedId === null) {
      return positions[0] ?? null;
    }

    return (
      positions.find((position) => position.id === selectedId) ??
      positions[0] ??
      null
    );
  }, [positions, selectedId]);

  /* =======================================================
     STATISTICS
     ======================================================= */

  const movingCount = positions.filter(
    (position) => position.status === "MOVING",
  ).length;

  const stoppedCount = positions.filter(
    (position) => position.status === "STOPPED",
  ).length;

  const offlineCount = positions.filter(
    (position) => position.status === "OFFLINE",
  ).length;

  /* =======================================================
     REFRESH
     ======================================================= */

  const handleRefresh = () => {
    setSelectedId(null);

    /* =====================================================
       DEMO
       ===================================================== */

    if (trackingMode === "DEMO") {
      setSimulationPositions(resetSimulatedVehicles());

      return;
    }

    /* =====================================================
       LIVE
       ===================================================== */

    dispatch(
      fetchGPSPositions({
        limit: 100,
      }),
    );
  };

  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <div className="tracking-page">
      {/* ===================================================
          HEADER
          =================================================== */}

      <div className="tracking-header">
        <div>
          <div className="tracking-title-row">
            <h1>Live Tracking</h1>

            <span
              className={`tracking-live-indicator ${
                trackingMode === "DEMO" || wsConnected ? "online" : "offline"
              }`}
            >
              <span className="tracking-live-dot" />

              {trackingMode === "DEMO"
                ? "DEMO"
                : wsConnected
                  ? "LIVE"
                  : "DISCONNECTED"}
            </span>
          </div>

          <p>Real-time monitoring posisi armada ABN.</p>
        </div>

        <button
          type="button"
          className="tracking-refresh"
          onClick={handleRefresh}
          disabled={loading}
        >
          <RefreshCw size={17} className={loading ? "tracking-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* ===================================================
          STATS
          =================================================== */}

      <div className="tracking-stats">
        <div className="tracking-stat-card">
          <div className="tracking-stat-icon">
            <Truck size={20} />
          </div>

          <div>
            <span>Total GPS</span>
            <strong>{positions.length}</strong>
          </div>
        </div>

        <div className="tracking-stat-card moving">
          <div className="tracking-stat-icon">
            <Activity size={20} />
          </div>

          <div>
            <span>Moving</span>
            <strong>{movingCount}</strong>
          </div>
        </div>

        <div className="tracking-stat-card stopped">
          <div className="tracking-stat-icon">
            <Crosshair size={20} />
          </div>

          <div>
            <span>Stopped</span>
            <strong>{stoppedCount}</strong>
          </div>
        </div>

        <div className="tracking-stat-card offline">
          <div className="tracking-stat-icon">
            <WifiOff size={20} />
          </div>

          <div>
            <span>Offline</span>
            <strong>{offlineCount}</strong>
          </div>
        </div>
      </div>

      {/* ===================================================
          MAIN TRACKING
          =================================================== */}

      <div className="tracking-content">
        {/* =================================================
            MAP
            ================================================= */}

        <section className="tracking-map-panel">
          <div className="tracking-map-toolbar">
            <div className="tracking-map-title">
              <strong>Fleet Map</strong>

              <span>
                {positions.length} GPS position
                {positions.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="tracking-map-status">
              {trackingMode === "DEMO" ? (
                <>
                  <Wifi size={15} />
                  <span>Simulator Mode</span>
                </>
              ) : wsConnected ? (
                <>
                  <Wifi size={15} />
                  <span>WebSocket Connected</span>
                </>
              ) : (
                <>
                  <WifiOff size={15} />
                  <span>WebSocket Offline</span>
                </>
              )}
            </div>
          </div>

          {/* =================================================
              MAP
              ================================================= */}

          <div className="tracking-map">
            <div className="tracking-map-grid" />

            <div className="tracking-map-road road-1" />
            <div className="tracking-map-road road-2" />
            <div className="tracking-map-road road-3" />

            <div className="tracking-map-location">
              <MapPin size={14} />

              <span>Surabaya • Sidoarjo</span>
            </div>

            {/* =================================================
                VEHICLES
                ================================================= */}

            {positions.map((position) => {
              const lat = Number(position.latitude);

              const lng = Number(position.longitude);

              const minLat = -7.31;
              const maxLat = -7.22;

              const minLng = 112.7;
              const maxLng = 112.77;

              const left = ((lng - minLng) / (maxLng - minLng)) * 100;

              const top = ((maxLat - lat) / (maxLat - minLat)) * 100;

              const safeLeft = Math.max(4, Math.min(96, left));

              const safeTop = Math.max(8, Math.min(92, top));

              const isSelected = selectedId === position.id;

              const status = String(position.status).toLowerCase();

              return (
                <button
                  type="button"
                  key={position.id}
                  className={`tracking-marker ${status} ${
                    isSelected ? "selected" : ""
                  }`}
                  style={{
                    left: `${safeLeft}%`,
                    top: `${safeTop}%`,
                  }}
                  onClick={() => setSelectedId(position.id)}
                  title={`Vehicle ${position.vehicle_id}`}
                >
                  <div className="tracking-marker-icon">
                    <Navigation
                      size={18}
                      strokeWidth={2.5}
                      style={{
                        transform: `rotate(${Number(
                          position.heading ?? 0,
                        )}deg)`,
                      }}
                    />
                  </div>

                  <span className="tracking-marker-label">
                    V-{position.vehicle_id}
                  </span>

                  {position.status === "MOVING" && (
                    <span className="tracking-marker-speed">
                      {Number(position.speed ?? 0).toFixed(0)} km/h
                    </span>
                  )}
                </button>
              );
            })}

            {/* =================================================
                EMPTY
                ================================================= */}

            {positions.length === 0 && (
              <div className="tracking-map-empty">
                <MapPin size={38} />

                <strong>No GPS position</strong>

                <span>Waiting for vehicle telemetry...</span>
              </div>
            )}

            {/* =================================================
                MAP CONTROLS
                ================================================= */}

            <div className="tracking-map-controls">
              <button type="button" title="Zoom in" aria-label="Zoom in">
                +
              </button>

              <button type="button" title="Zoom out" aria-label="Zoom out">
                −
              </button>

              <button
                type="button"
                title="Center fleet"
                aria-label="Center fleet"
              >
                <Crosshair size={16} />
              </button>
            </div>

            {/* =================================================
                SCALE
                ================================================= */}

            <div className="tracking-map-scale">
              <span />

              <small>2 km</small>
            </div>

            {/* =================================================
                PROVIDER
                ================================================= */}

            <div className="tracking-map-provider">
              ABN Fleet Map • {trackingMode === "DEMO" ? "Simulation" : "Live"}
            </div>
          </div>
        </section>

        {/* =================================================
            VEHICLE LIST
            ================================================= */}

        <aside className="tracking-vehicles">
          <div className="tracking-vehicles-header">
            <div>
              <strong>Vehicles</strong>

              <span>{trackingMode === "DEMO" ? "Simulation" : "Live GPS"}</span>
            </div>

            <span className="tracking-count">{positions.length}</span>
          </div>

          <div className="tracking-vehicle-list">
            {positions.map((position) => (
              <button
                type="button"
                key={position.id}
                className={`tracking-vehicle ${
                  selectedId === position.id ? "selected" : ""
                }`}
                onClick={() => setSelectedId(position.id)}
              >
                <div className="tracking-vehicle-icon">
                  <Truck size={18} />
                </div>

                <div className="tracking-vehicle-info">
                  <strong>Vehicle #{position.vehicle_id}</strong>

                  <span>Device {position.device_id ?? "-"}</span>

                  <div className="tracking-vehicle-meta">
                    <span>{Number(position.speed ?? 0).toFixed(1)} km/h</span>

                    <span
                      className={`tracking-status ${String(
                        position.status,
                      ).toLowerCase()}`}
                    >
                      {position.status}
                    </span>
                  </div>
                </div>
              </button>
            ))}

            {positions.length === 0 && (
              <div className="tracking-empty-list">No vehicle data</div>
            )}
          </div>
        </aside>
      </div>

      {/* ===================================================
          SELECTED VEHICLE
          =================================================== */}

      {selectedPosition && (
        <section className="tracking-detail">
          <div className="tracking-detail-title">
            <MapPin size={18} />

            <div>
              <strong>Vehicle #{selectedPosition.vehicle_id}</strong>

              <span>Latest GPS Position</span>
            </div>
          </div>

          <div className="tracking-detail-grid">
            <div>
              <span>Latitude</span>

              <strong>{Number(selectedPosition.latitude).toFixed(7)}</strong>
            </div>

            <div>
              <span>Longitude</span>

              <strong>{Number(selectedPosition.longitude).toFixed(7)}</strong>
            </div>

            <div>
              <span>Speed</span>

              <strong>
                {Number(selectedPosition.speed ?? 0).toFixed(1)} km/h
              </strong>
            </div>

            <div>
              <span>Heading</span>

              <strong>
                {Number(selectedPosition.heading ?? 0).toFixed(0)}°
              </strong>
            </div>

            <div>
              <span>Altitude</span>

              <strong>
                {selectedPosition.altitude !== null
                  ? `${Number(selectedPosition.altitude).toFixed(1)} m`
                  : "-"}
              </strong>
            </div>

            <div>
              <span>Accuracy</span>

              <strong>
                {selectedPosition.accuracy !== null
                  ? `${Number(selectedPosition.accuracy).toFixed(1)} m`
                  : "-"}
              </strong>
            </div>

            <div>
              <span>Satellites</span>

              <strong>{selectedPosition.satellites ?? "-"}</strong>
            </div>

            <div>
              <span>Status</span>

              <strong
                className={`detail-status ${String(
                  selectedPosition.status,
                ).toLowerCase()}`}
              >
                {selectedPosition.status}
              </strong>
            </div>
          </div>
        </section>
      )}

      {/* ===================================================
          ERROR
          =================================================== */}

      {error && (
        <div className="tracking-error">
          <strong>GPS API Error</strong>

          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

export default Tracking;
