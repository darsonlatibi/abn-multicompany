import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  AlertTriangle,
  Anchor,
  BarChart3,
  Fuel,
  MapPin,
  Package,
  Route,
  Ship,
  Users,
  Wifi,
  Wrench,
} from "lucide-react";

import "./TLDashboard.css";

import type { AppDispatch, RootState } from "../../../stores/store";

import {
  fetchVehicles,
  selectVehicles,
  selectVehicleLoading,
  selectVehicleError,
} from "../../../features/vehicle/vehiclesSlice";

/* =========================================================
   TONASA GROUP
   TONASA LINES
   MARINE LOGISTICS DASHBOARD
   ========================================================= */

/* =========================================================
   TYPES
   ========================================================= */

type VesselStatus =
  | "SAILING"
  | "LOADING"
  | "UNLOADING"
  | "ANCHORED"
  | "IDLE"
  | "OFFLINE"
  | "ALARM";

/* =========================================================
   DASHBOARD
   ========================================================= */

function TLDashboard() {
  const dispatch = useDispatch<AppDispatch>();

  /* =======================================================
     REDUX VEHICLES
     ======================================================= */

  const vehicles = useSelector((state: RootState) => selectVehicles(state));

  const loading = useSelector((state: RootState) =>
    selectVehicleLoading(state),
  );

  const error = useSelector((state: RootState) => selectVehicleError(state));

  /* =======================================================
     FETCH DATA
     ======================================================= */

  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch]);

  /* =======================================================
     COMPANY PROFILE
     ======================================================= */

  const company = {
    name: "PT Pelayaran Angkutan Laut Semen Tonasa Lines",
    shortName: "Tonasa Lines",
    code: "TL",
    type: "TONASA GROUP",
    status: "OPERATIONAL",
  };

  /* =======================================================
     OPERATIONAL SUMMARY
     ======================================================= */

  /*
   * Nilai sementara menggunakan safe/default value.
   *
   * Nanti dapat dihubungkan ke:
   *
   * - Vessel database
   * - AIS
   * - GPS
   * - Voyage Management
   * - Cargo
   * - Port
   * - Fuel
   * - Maintenance
   * - Manpower
   * - SAP
   * - MQTT / IoT
   */

  const operationalSummary = {
    totalVessels: 0,

    sailingVessels: 0,

    loadingVessels: 0,

    anchoredVessels: 0,

    activeVoyages: 0,

    completedVoyages: 0,

    cargoToday: 0,

    manpower: 0,

    alerts: 0,
  };

  /* =======================================================
     PERFORMANCE
     ======================================================= */

  const performance = {
    fleetUtilization: 0,
    voyageCompletion: 0,
    fuelEfficiency: 0,
    cargoPerformance: 0,
    maintenanceCompliance: 0,
  };

  /* =======================================================
     SUPPORTING FLEET DATA
     ======================================================= */

  const recentFleet = vehicles.slice(0, 6).map((vehicle) => ({
    id: vehicle.vehicle_code,

    driver:
      vehicle.driver_id !== null && vehicle.driver_id !== undefined
        ? `Crew #${vehicle.driver_id}`
        : "-",

    location: "-",

    speed: 0,

    status: "OFFLINE" as VesselStatus,
  }));

  /* =======================================================
     LOADING
     ======================================================= */

  if (loading && vehicles.length === 0) {
    return (
      <main className="tl-dashboard-page">
        <header className="tl-dashboard-header">
          <div>
            <span className="tl-dashboard-eyebrow">
              TONASA GROUP • TONASA LINES
            </span>

            <h1>Tonasa Lines</h1>

            <p>Loading marine logistics data...</p>
          </div>
        </header>
      </main>
    );
  }

  /* =======================================================
     ERROR
     ======================================================= */

  if (error && vehicles.length === 0) {
    return (
      <main className="tl-dashboard-page">
        <header className="tl-dashboard-header">
          <div>
            <span className="tl-dashboard-eyebrow">
              TONASA GROUP • TONASA LINES
            </span>

            <h1>Tonasa Lines</h1>

            <p>Gagal mengambil data operasional.</p>

            <small>{error}</small>
          </div>
        </header>
      </main>
    );
  }

  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <main className="tl-dashboard-page">
      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="tl-dashboard-header">
        <div className="tl-company-heading">
          <div className="tl-company-icon">
            <Ship size={22} />
          </div>

          <div>
            <span className="tl-dashboard-eyebrow">
              TONASA GROUP • SUBSIDIARY
            </span>

            <h1>{company.name}</h1>

            <p>Marine logistics, vessel and voyage intelligence</p>
          </div>
        </div>

        <div className="tl-server-status">
          <span className="tl-status-dot online" />

          <div>
            <strong>{company.status}</strong>

            <small>{company.code} • ABN EMS</small>
          </div>
        </div>
      </header>

      {/* ===================================================
          COMPANY BAR
      =================================================== */}

      <section className="tl-company-bar">
        <div className="tl-company-info">
          <span className="tl-company-badge">
            <Ship size={17} />
          </span>

          <div>
            <strong>{company.shortName}</strong>

            <small>Tonasa Group Marine Logistics Intelligence</small>
          </div>
        </div>

        <div className="tl-live-state">
          <span className="tl-status-dot online" />
          SYSTEM ONLINE
        </div>
      </section>

      {/* ===================================================
          KPI SUMMARY
      =================================================== */}

      <section className="tl-summary">
        {/* VESSELS */}

        <article className="tl-summary-card">
          <div className="tl-summary-icon">
            <Ship size={21} />
          </div>

          <div className="tl-summary-content">
            <span>Fleet</span>

            <strong>{operationalSummary.totalVessels}</strong>

            <small>Total registered vessels</small>
          </div>
        </article>

        {/* SAILING */}

        <article className="tl-summary-card active">
          <div className="tl-summary-icon">
            <Route size={21} />
          </div>

          <div className="tl-summary-content">
            <span>At Sea</span>

            <strong>{operationalSummary.sailingVessels}</strong>

            <small>Vessels currently sailing</small>
          </div>
        </article>

        {/* ACTIVE VOYAGES */}

        <article className="tl-summary-card voyage">
          <div className="tl-summary-icon">
            <Anchor size={21} />
          </div>

          <div className="tl-summary-content">
            <span>Active Voyages</span>

            <strong>{operationalSummary.activeVoyages}</strong>

            <small>Current marine operations</small>
          </div>
        </article>

        {/* CARGO */}

        <article className="tl-summary-card cargo">
          <div className="tl-summary-icon">
            <Package size={21} />
          </div>

          <div className="tl-summary-content">
            <span>Cargo Today</span>

            <strong>{operationalSummary.cargoToday}</strong>

            <small>Ton cargo handled</small>
          </div>
        </article>

        {/* ALERTS */}

        <article className="tl-summary-card alert">
          <div className="tl-summary-icon">
            <AlertTriangle size={21} />
          </div>

          <div className="tl-summary-content">
            <span>Alerts</span>

            <strong>{operationalSummary.alerts}</strong>

            <small>Marine operational alerts</small>
          </div>
        </article>
      </section>

      {/* ===================================================
          MAIN GRID
      =================================================== */}

      <section className="tl-main-grid">
        {/* =================================================
            VESSEL TRACKING
        ================================================= */}

        <article className="tl-panel tl-map-panel">
          <div className="tl-panel-header">
            <div>
              <h2>Vessel Tracking</h2>

              <p>Tonasa Lines vessel and marine operation</p>
            </div>

            <div className="tl-live-indicator">
              <span className="tl-status-dot online" />
              LIVE
            </div>
          </div>

          <div className="tl-map-placeholder">
            <Ship size={42} />

            <h3>Marine Operations Map</h3>

            <p>
              AIS, GPS, vessel position, voyage route and port monitoring will
              be connected here.
            </p>

            <span>{operationalSummary.totalVessels} vessel(s) registered</span>
          </div>
        </article>

        {/* =================================================
            VESSEL STATUS
        ================================================= */}

        <article className="tl-panel tl-status-panel">
          <div className="tl-panel-header">
            <div>
              <h2>Vessel Status</h2>

              <p>Current marine condition</p>
            </div>
          </div>

          <div className="tl-status-list">
            <div className="tl-status-row">
              <span className="tl-status-label">
                <span className="tl-status-dot sailing-dot" />
                Sailing
              </span>

              <strong>{operationalSummary.sailingVessels}</strong>
            </div>

            <div className="tl-status-row">
              <span className="tl-status-label">
                <span className="tl-status-dot loading-dot" />
                Loading
              </span>

              <strong>{operationalSummary.loadingVessels}</strong>
            </div>

            <div className="tl-status-row">
              <span className="tl-status-label">
                <span className="tl-status-dot anchored-dot" />
                Anchored
              </span>

              <strong>{operationalSummary.anchoredVessels}</strong>
            </div>

            <div className="tl-status-row">
              <span className="tl-status-label">
                <span className="tl-status-dot idle-dot" />
                Idle
              </span>

              <strong>0</strong>
            </div>

            <div className="tl-status-row">
              <span className="tl-status-label">
                <span className="tl-status-dot offline-dot" />
                Offline
              </span>

              <strong>0</strong>
            </div>

            <div className="tl-status-row">
              <span className="tl-status-label">
                <span className="tl-status-dot alarm-dot" />
                Alarm
              </span>

              <strong>{operationalSummary.alerts}</strong>
            </div>
          </div>
        </article>
      </section>

      {/* ===================================================
          PERFORMANCE
      =================================================== */}

      <section className="tl-performance-grid">
        {/* FLEET */}

        <article className="tl-panel tl-performance-panel">
          <div className="tl-panel-header">
            <div>
              <h2>Fleet Performance</h2>

              <p>Vessel utilization</p>
            </div>

            <Ship size={18} />
          </div>

          <div className="tl-performance-body">
            <div className="tl-performance-value">
              <strong>{performance.fleetUtilization}%</strong>

              <span>Utilization</span>
            </div>

            <div className="tl-progress">
              <span
                style={{
                  width: `${performance.fleetUtilization}%`,
                }}
              />
            </div>

            <div className="tl-performance-meta">
              <span>Sailing: {operationalSummary.sailingVessels}</span>

              <span>Fleet: {operationalSummary.totalVessels}</span>
            </div>
          </div>
        </article>

        {/* VOYAGE */}

        <article className="tl-panel tl-performance-panel">
          <div className="tl-panel-header">
            <div>
              <h2>Voyage Performance</h2>

              <p>Daily voyage execution</p>
            </div>

            <Route size={18} />
          </div>

          <div className="tl-performance-body">
            <div className="tl-performance-value">
              <strong>{performance.voyageCompletion}%</strong>

              <span>Completion</span>
            </div>

            <div className="tl-progress">
              <span
                style={{
                  width: `${performance.voyageCompletion}%`,
                }}
              />
            </div>

            <div className="tl-performance-meta">
              <span>Active: {operationalSummary.activeVoyages}</span>

              <span>Completed: {operationalSummary.completedVoyages}</span>
            </div>
          </div>
        </article>

        {/* CARGO */}

        <article className="tl-panel tl-performance-panel">
          <div className="tl-panel-header">
            <div>
              <h2>Cargo Intelligence</h2>

              <p>Marine cargo performance</p>
            </div>

            <Package size={18} />
          </div>

          <div className="tl-performance-body">
            <div className="tl-performance-value">
              <strong>{performance.cargoPerformance}%</strong>

              <span>Performance</span>
            </div>

            <div className="tl-progress">
              <span
                style={{
                  width: `${performance.cargoPerformance}%`,
                }}
              />
            </div>

            <div className="tl-performance-meta">
              <span>Today</span>

              <span>{operationalSummary.cargoToday} ton</span>
            </div>
          </div>
        </article>

        {/* FUEL */}

        <article className="tl-panel tl-performance-panel">
          <div className="tl-panel-header">
            <div>
              <h2>Fuel Intelligence</h2>

              <p>Vessel fuel efficiency</p>
            </div>

            <Fuel size={18} />
          </div>

          <div className="tl-performance-body">
            <div className="tl-performance-value">
              <strong>{performance.fuelEfficiency}</strong>

              <span>ton / fuel</span>
            </div>

            <div className="tl-fuel-placeholder">
              Vessel fuel data integration pending
            </div>
          </div>
        </article>
      </section>

      {/* ===================================================
          VOYAGE MONITORING
      =================================================== */}

      <section className="tl-panel tl-voyage-panel">
        <div className="tl-panel-header">
          <div>
            <h2>Voyage Monitoring</h2>

            <p>Latest Tonasa Lines marine operation</p>
          </div>

          <button type="button" className="tl-view-all-button">
            View Voyages
          </button>
        </div>

        <div className="tl-table-wrapper">
          <table className="tl-table">
            <thead>
              <tr>
                <th>Vessel</th>

                <th>Voyage</th>

                <th>Route</th>

                <th>Cargo</th>

                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {recentFleet.length === 0 ? (
                <tr>
                  <td colSpan={5}>Belum ada data vessel Tonasa Lines.</td>
                </tr>
              ) : (
                recentFleet.map((vessel) => (
                  <tr key={vessel.id}>
                    <td>
                      <strong>{vessel.id}</strong>
                    </td>

                    <td>—</td>

                    <td>
                      <span className="tl-location-cell">
                        <MapPin size={14} />

                        {vessel.location}
                      </span>
                    </td>

                    <td>— ton</td>

                    <td>
                      <span
                        className={`tl-vessel-status ${vessel.status.toLowerCase()}`}
                      >
                        <span className="tl-status-dot" />

                        {vessel.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ===================================================
          OPERATIONAL CAPABILITY
      =================================================== */}

      <section className="tl-capability-grid">
        <article className="tl-mini-panel">
          <div className="tl-mini-icon">
            <Anchor size={18} />
          </div>

          <div>
            <strong>Port Operations</strong>

            <span>Port and terminal activity monitoring</span>
          </div>
        </article>

        <article className="tl-mini-panel">
          <div className="tl-mini-icon">
            <Package size={18} />
          </div>

          <div>
            <strong>Cargo Management</strong>

            <span>Cement and material cargo intelligence</span>
          </div>
        </article>

        <article className="tl-mini-panel">
          <div className="tl-mini-icon">
            <Wrench size={18} />
          </div>

          <div>
            <strong>Vessel Maintenance</strong>

            <span>Maintenance and vessel readiness</span>
          </div>
        </article>

        <article className="tl-mini-panel">
          <div className="tl-mini-icon">
            <Users size={18} />
          </div>

          <div>
            <strong>Crew Intelligence</strong>

            <span>Marine manpower and crew monitoring</span>
          </div>
        </article>
      </section>

      {/* ===================================================
          INTELLIGENCE FOOTER
      =================================================== */}

      <section className="tl-intelligence-panel">
        <div className="tl-intelligence-icon">
          <BarChart3 size={20} />
        </div>

        <div>
          <span>ABN INDUSTRIAL INTELLIGENCE</span>

          <h2>Tonasa Lines Marine Intelligence</h2>

          <p>
            Data dari vessel, AIS, voyage, cargo, port, fuel, maintenance dan
            logistics akan dikonsolidasikan menjadi executive marine
            intelligence.
          </p>
        </div>

        <div className="tl-intelligence-status">
          <Wifi size={15} />
          DATA LAYER READY
        </div>
      </section>
    </main>
  );
}

export default TLDashboard;
