import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  AlertTriangle,
  BarChart3,
  Building2,
  Fuel,
  Gauge,
  MapPin,
  Route,
  Truck,
  Users,
  Wrench,
  Wifi,
} from "lucide-react";

import "./BRDashboard.css";

import type { AppDispatch, RootState } from "../../../stores/store";

import {
  fetchVehicles,
  selectVehicles,
  selectVehicleLoading,
  selectVehicleError,
} from "../../../features/vehicle/vehiclesSlice";

/* =========================================================
   TONASA GROUP
   BIRINGKASSI RAYA
   OPERATIONAL DASHBOARD
   ========================================================= */

/* =========================================================
   TYPES
   ========================================================= */

type OperationalStatus = "RUNNING" | "IDLE" | "STOPPED" | "OFFLINE" | "ALARM";

/* =========================================================
   DASHBOARD
   ========================================================= */

function BRDashboard() {
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
     FETCH VEHICLES
     ======================================================= */

  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch]);

  /* =======================================================
     COMPANY PROFILE
     ======================================================= */

  const company = {
    name: "PT Biringkassi Raya",
    code: "BR",
    type: "TONASA GROUP",
    status: "OPERATIONAL",
  };

  /* =======================================================
     OPERATIONAL KPI
     ======================================================= */

  /*
   * Data berikut sementara menggunakan safe/default value.
   *
   * Nanti dapat dihubungkan ke:
   *
   * - BR database
   * - Fleet
   * - GPS
   * - Trips
   * - Fuel
   * - Maintenance
   * - Manpower
   * - SAP
   * - MQTT / IoT
   */

  const operationalSummary = {
    totalVehicles: vehicles.length,

    activeVehicles: 0,

    idleVehicles: 0,

    offlineVehicles: vehicles.filter((vehicle) => vehicle.status === "INACTIVE")
      .length,

    activeTrips: 0,

    completedTrips: 0,

    manpower: 0,

    alerts: 0,
  };

  /* =======================================================
     OPERATIONAL PERFORMANCE
     ======================================================= */

  const performance = {
    fleetUtilization: 0,
    tripCompletion: 0,
    fuelEfficiency: 0,
    maintenanceCompliance: 0,
  };

  /* =======================================================
     RECENT VEHICLES
     ======================================================= */

  const recentVehicles = vehicles.slice(0, 6).map((vehicle) => ({
    id: vehicle.vehicle_code,

    driver:
      vehicle.driver_id !== null && vehicle.driver_id !== undefined
        ? `Driver #${vehicle.driver_id}`
        : "-",

    location: "-",

    speed: 0,

    status: "OFFLINE" as OperationalStatus,
  }));

  /* =======================================================
     LOADING
     ======================================================= */

  if (loading && vehicles.length === 0) {
    return (
      <main className="br-dashboard-page">
        <header className="br-dashboard-header">
          <div>
            <span className="br-dashboard-eyebrow">
              TONASA GROUP • BIRINGKASSI RAYA
            </span>

            <h1>Biringkassi Raya</h1>

            <p>Loading operational data...</p>
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
      <main className="br-dashboard-page">
        <header className="br-dashboard-header">
          <div>
            <span className="br-dashboard-eyebrow">
              TONASA GROUP • BIRINGKASSI RAYA
            </span>

            <h1>Biringkassi Raya</h1>

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
    <main className="br-dashboard-page">
      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="br-dashboard-header">
        <div className="br-company-heading">
          <div className="br-company-icon">
            <Building2 size={22} />
          </div>

          <div>
            <span className="br-dashboard-eyebrow">
              TONASA GROUP • SUBSIDIARY
            </span>

            <h1>{company.name}</h1>

            <p>Operational performance and business intelligence</p>
          </div>
        </div>

        <div className="br-server-status">
          <span className="br-status-dot online" />

          <div>
            <strong>{company.status}</strong>

            <small>{company.code} • ABN EMS</small>
          </div>
        </div>
      </header>

      {/* ===================================================
          COMPANY BAR
      =================================================== */}

      <section className="br-company-bar">
        <div className="br-company-info">
          <span className="br-company-badge">{company.code}</span>

          <div>
            <strong>{company.name}</strong>

            <small>Tonasa Group Operational Intelligence</small>
          </div>
        </div>

        <div className="br-live-state">
          <span className="br-status-dot online" />
          SYSTEM ONLINE
        </div>
      </section>

      {/* ===================================================
          KPI SUMMARY
      =================================================== */}

      <section className="br-summary">
        {/* VEHICLES */}

        <article className="br-summary-card">
          <div className="br-summary-icon">
            <Truck size={21} />
          </div>

          <div className="br-summary-content">
            <span>Fleet</span>

            <strong>{operationalSummary.totalVehicles}</strong>

            <small>Total registered vehicles</small>
          </div>
        </article>

        {/* ACTIVE TRIPS */}

        <article className="br-summary-card active">
          <div className="br-summary-icon">
            <Route size={21} />
          </div>

          <div className="br-summary-content">
            <span>Active Trips</span>

            <strong>{operationalSummary.activeTrips}</strong>

            <small>Current operations</small>
          </div>
        </article>

        {/* MANPOWER */}

        <article className="br-summary-card manpower">
          <div className="br-summary-icon">
            <Users size={21} />
          </div>

          <div className="br-summary-content">
            <span>Manpower</span>

            <strong>{operationalSummary.manpower}</strong>

            <small>Active workforce</small>
          </div>
        </article>

        {/* FLEET UTILIZATION */}

        <article className="br-summary-card utilization">
          <div className="br-summary-icon">
            <Gauge size={21} />
          </div>

          <div className="br-summary-content">
            <span>Fleet Utilization</span>

            <strong>{performance.fleetUtilization}%</strong>

            <small>Vehicle utilization</small>
          </div>
        </article>

        {/* ALERTS */}

        <article className="br-summary-card alert">
          <div className="br-summary-icon">
            <AlertTriangle size={21} />
          </div>

          <div className="br-summary-content">
            <span>Alerts</span>

            <strong>{operationalSummary.alerts}</strong>

            <small>Operational alerts</small>
          </div>
        </article>
      </section>

      {/* ===================================================
          MAIN GRID
      =================================================== */}

      <section className="br-main-grid">
        {/* =================================================
            OPERATIONAL MAP
        ================================================= */}

        <article className="br-panel br-map-panel">
          <div className="br-panel-header">
            <div>
              <h2>Operational Tracking</h2>

              <p>Biringkassi Raya fleet and field operation</p>
            </div>

            <div className="br-live-indicator">
              <span className="br-status-dot online" />
              LIVE
            </div>
          </div>

          <div className="br-map-placeholder">
            <MapPin size={42} />

            <h3>Operational Map</h3>

            <p>
              GPS and field operation map integration will be connected here.
            </p>

            <span>{vehicles.length} vehicle(s) registered</span>
          </div>
        </article>

        {/* =================================================
            OPERATIONAL STATUS
        ================================================= */}

        <article className="br-panel br-status-panel">
          <div className="br-panel-header">
            <div>
              <h2>Operational Status</h2>

              <p>Current field condition</p>
            </div>
          </div>

          <div className="br-status-list">
            <div className="br-status-row">
              <span className="br-status-label">
                <span className="br-status-dot running-dot" />
                Running
              </span>

              <strong>{operationalSummary.activeVehicles}</strong>
            </div>

            <div className="br-status-row">
              <span className="br-status-label">
                <span className="br-status-dot idle-dot" />
                Idle
              </span>

              <strong>{operationalSummary.idleVehicles}</strong>
            </div>

            <div className="br-status-row">
              <span className="br-status-label">
                <span className="br-status-dot stopped-dot" />
                Stopped
              </span>

              <strong>0</strong>
            </div>

            <div className="br-status-row">
              <span className="br-status-label">
                <span className="br-status-dot offline-dot" />
                Offline
              </span>

              <strong>{operationalSummary.offlineVehicles}</strong>
            </div>

            <div className="br-status-row">
              <span className="br-status-label">
                <span className="br-status-dot alarm-dot" />
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

      <section className="br-performance-grid">
        {/* FLEET */}

        <article className="br-panel br-performance-panel">
          <div className="br-panel-header">
            <div>
              <h2>Fleet Performance</h2>

              <p>Operational fleet utilization</p>
            </div>

            <Truck size={18} />
          </div>

          <div className="br-performance-body">
            <div className="br-performance-value">
              <strong>{performance.fleetUtilization}%</strong>

              <span>Utilization</span>
            </div>

            <div className="br-progress">
              <span
                style={{
                  width: `${performance.fleetUtilization}%`,
                }}
              />
            </div>

            <div className="br-performance-meta">
              <span>Active: {operationalSummary.activeVehicles}</span>

              <span>Total: {operationalSummary.totalVehicles}</span>
            </div>
          </div>
        </article>

        {/* TRIPS */}

        <article className="br-panel br-performance-panel">
          <div className="br-panel-header">
            <div>
              <h2>Trip Performance</h2>

              <p>Daily trip execution</p>
            </div>

            <Route size={18} />
          </div>

          <div className="br-performance-body">
            <div className="br-performance-value">
              <strong>{performance.tripCompletion}%</strong>

              <span>Completion</span>
            </div>

            <div className="br-progress">
              <span
                style={{
                  width: `${performance.tripCompletion}%`,
                }}
              />
            </div>

            <div className="br-performance-meta">
              <span>Active: {operationalSummary.activeTrips}</span>

              <span>Completed: {operationalSummary.completedTrips}</span>
            </div>
          </div>
        </article>

        {/* FUEL */}

        <article className="br-panel br-performance-panel">
          <div className="br-panel-header">
            <div>
              <h2>Fuel Intelligence</h2>

              <p>Fleet fuel efficiency</p>
            </div>

            <Fuel size={18} />
          </div>

          <div className="br-performance-body">
            <div className="br-performance-value">
              <strong>{performance.fuelEfficiency}</strong>

              <span>km / liter</span>
            </div>

            <div className="br-fuel-placeholder">
              Fuel data integration pending
            </div>
          </div>
        </article>

        {/* MAINTENANCE */}

        <article className="br-panel br-performance-panel">
          <div className="br-panel-header">
            <div>
              <h2>Maintenance</h2>

              <p>Maintenance compliance</p>
            </div>

            <Wrench size={18} />
          </div>

          <div className="br-performance-body">
            <div className="br-performance-value">
              <strong>{performance.maintenanceCompliance}%</strong>

              <span>Compliance</span>
            </div>

            <div className="br-progress">
              <span
                style={{
                  width: `${performance.maintenanceCompliance}%`,
                }}
              />
            </div>
          </div>
        </article>
      </section>

      {/* ===================================================
          VEHICLE MONITORING
      =================================================== */}

      <section className="br-panel br-vehicle-panel">
        <div className="br-panel-header">
          <div>
            <h2>Fleet Monitoring</h2>

            <p>Latest Biringkassi Raya vehicle information</p>
          </div>

          <button type="button" className="br-view-all-button">
            View Fleet
          </button>
        </div>

        <div className="br-table-wrapper">
          <table className="br-table">
            <thead>
              <tr>
                <th>Vehicle</th>

                <th>Driver</th>

                <th>Location</th>

                <th>Speed</th>

                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {recentVehicles.length === 0 ? (
                <tr>
                  <td colSpan={5}>Belum ada kendaraan Biringkassi Raya.</td>
                </tr>
              ) : (
                recentVehicles.map((vehicle) => (
                  <tr key={vehicle.id}>
                    <td>
                      <strong>{vehicle.id}</strong>
                    </td>

                    <td>{vehicle.driver}</td>

                    <td>
                      <span className="br-location-cell">
                        <MapPin size={14} />

                        {vehicle.location}
                      </span>
                    </td>

                    <td>{vehicle.speed} km/h</td>

                    <td>
                      <span
                        className={`br-vehicle-status ${vehicle.status.toLowerCase()}`}
                      >
                        <span className="br-status-dot" />

                        {vehicle.status}
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
          INTELLIGENCE FOOTER
      =================================================== */}

      <section className="br-intelligence-panel">
        <div className="br-intelligence-icon">
          <BarChart3 size={20} />
        </div>

        <div>
          <span>ABN INDUSTRIAL INTELLIGENCE</span>

          <h2>Biringkassi Raya Operational Intelligence</h2>

          <p>
            Data dari fleet, manpower, trip, fuel, maintenance, logistics dan
            operational system akan dikonsolidasikan menjadi executive insight.
          </p>
        </div>

        <div className="br-intelligence-status">
          <Wifi size={15} />
          DATA LAYER READY
        </div>
      </section>
    </main>
  );
}

export default BRDashboard;
