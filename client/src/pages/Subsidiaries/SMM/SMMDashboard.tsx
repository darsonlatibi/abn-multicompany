import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Activity,
  AlertTriangle,
  BarChart3,
  Building2,
  CircleDollarSign,
  ClipboardList,
  Gauge,
  MapPin,
  Users,
  Warehouse,
  Wifi,
  Wrench,
} from "lucide-react";

import "./SMMDashboard.css";

import type { AppDispatch, RootState } from "../../../stores/store";

import {
  fetchVehicles,
  selectVehicles,
  selectVehicleLoading,
  selectVehicleError,
} from "../../../features/vehicle/vehiclesSlice";

/* =========================================================
   TONASA GROUP
   PT SEDAYA MULTI MATRA
   BUSINESS & OPERATIONAL DASHBOARD
   ========================================================= */

/* =========================================================
   TYPES
   ========================================================= */

type BusinessStatus =
  | "OPERATIONAL"
  | "BUSY"
  | "IDLE"
  | "MAINTENANCE"
  | "OFFLINE"
  | "ALARM";

/* =========================================================
   DASHBOARD
   ========================================================= */

function SMMDashboard() {
  const dispatch = useDispatch<AppDispatch>();

  /* =======================================================
     REDUX VEHICLES / FIELD ASSETS
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
    name: "PT Sedaya Multi Matra",
    code: "SMM",
    type: "TONASA GROUP",
    status: "OPERATIONAL",
  };

  /* =======================================================
     BUSINESS KPI
     ======================================================= */

  /*
   * Safe/default values.
   *
   * Nantinya dapat dihubungkan ke:
   *
   * - Business database
   * - Service Operations
   * - Project Management
   * - Customer / CRM
   * - Finance
   * - Procurement
   * - Inventory
   * - Fleet / Field Assets
   * - Manpower
   * - Maintenance
   * - SAP
   * - MQTT / IoT
   * - ABN EMS AI Intelligence
   */

  const operationalSummary = {
    activeServices: 0,

    activeProjects: 0,

    manpower: 0,

    revenueToday: 0,

    assets: vehicles.length,

    alerts: 0,
  };

  /* =======================================================
     BUSINESS PERFORMANCE
     ======================================================= */

  const performance = {
    servicePerformance: 0,

    projectCompletion: 0,

    assetAvailability: 0,

    financialPerformance: 0,
  };

  /* =======================================================
     FIELD ASSETS
     ======================================================= */

  const recentAssets = vehicles.slice(0, 6).map((vehicle) => ({
    id: vehicle.vehicle_code,

    operator:
      vehicle.driver_id !== null && vehicle.driver_id !== undefined
        ? `Operator #${vehicle.driver_id}`
        : "-",

    location: "Sedaya Multi Matra",

    type: "Field Asset",

    status: "OFFLINE" as BusinessStatus,
  }));

  /* =======================================================
     LOADING
     ======================================================= */

  if (loading && vehicles.length === 0) {
    return (
      <main className="smm-dashboard-page">
        <header className="smm-dashboard-header">
          <div>
            <span className="smm-dashboard-eyebrow">
              TONASA GROUP • SEDAYA MULTI MATRA
            </span>

            <h1>PT Sedaya Multi Matra</h1>

            <p>Loading business operational data...</p>
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
      <main className="smm-dashboard-page">
        <header className="smm-dashboard-header">
          <div>
            <span className="smm-dashboard-eyebrow">
              TONASA GROUP • SEDAYA MULTI MATRA
            </span>

            <h1>PT Sedaya Multi Matra</h1>

            <p>Gagal mengambil data operasional perusahaan.</p>

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
    <main className="smm-dashboard-page">
      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="smm-dashboard-header">
        <div className="smm-company-heading">
          <div className="smm-company-icon">
            <Building2 size={22} />
          </div>

          <div>
            <span className="smm-dashboard-eyebrow">
              TONASA GROUP • SUBSIDIARY / AFFILIATED ENTITY
            </span>

            <h1>{company.name}</h1>

            <p>
              Business operations, services, financial performance and
              enterprise intelligence
            </p>
          </div>
        </div>

        <div className="smm-server-status">
          <span className="smm-status-dot online" />

          <div>
            <strong>{company.status}</strong>

            <small>{company.code} • ABN EMS</small>
          </div>
        </div>
      </header>

      {/* ===================================================
          COMPANY BAR
      =================================================== */}

      <section className="smm-company-bar">
        <div className="smm-company-info">
          <span className="smm-company-badge">{company.code}</span>

          <div>
            <strong>{company.name}</strong>

            <small>Tonasa Group Business & Operational Intelligence</small>
          </div>
        </div>

        <div className="smm-live-state">
          <span className="smm-status-dot online" />
          BUSINESS SYSTEM ONLINE
        </div>
      </section>

      {/* ===================================================
          KPI SUMMARY
      =================================================== */}

      <section className="smm-summary">
        {/* ACTIVE SERVICES */}

        <article className="smm-summary-card">
          <div className="smm-summary-icon">
            <Activity size={21} />
          </div>

          <div className="smm-summary-content">
            <span>Active Services</span>

            <strong>{operationalSummary.activeServices}</strong>

            <small>Current service activities</small>
          </div>
        </article>

        {/* PROJECTS */}

        <article className="smm-summary-card active">
          <div className="smm-summary-icon">
            <ClipboardList size={21} />
          </div>

          <div className="smm-summary-content">
            <span>Active Projects</span>

            <strong>{operationalSummary.activeProjects}</strong>

            <small>Ongoing business projects</small>
          </div>
        </article>

        {/* MANPOWER */}

        <article className="smm-summary-card operations">
          <div className="smm-summary-icon">
            <Users size={21} />
          </div>

          <div className="smm-summary-content">
            <span>Manpower</span>

            <strong>{operationalSummary.manpower}</strong>

            <small>Active personnel</small>
          </div>
        </article>

        {/* REVENUE */}

        <article className="smm-summary-card finance">
          <div className="smm-summary-icon">
            <CircleDollarSign size={21} />
          </div>

          <div className="smm-summary-content">
            <span>Revenue Today</span>

            <strong>
              Rp {operationalSummary.revenueToday.toLocaleString("id-ID")}
            </strong>

            <small>Today's business revenue</small>
          </div>
        </article>

        {/* ALERTS */}

        <article className="smm-summary-card alert">
          <div className="smm-summary-icon">
            <AlertTriangle size={21} />
          </div>

          <div className="smm-summary-content">
            <span>Alerts</span>

            <strong>{operationalSummary.alerts}</strong>

            <small>Business operational alerts</small>
          </div>
        </article>
      </section>

      {/* ===================================================
          MAIN GRID
      =================================================== */}

      <section className="smm-main-grid">
        {/* =================================================
            BUSINESS OPERATIONS
        ================================================= */}

        <article className="smm-panel smm-map-panel">
          <div className="smm-panel-header">
            <div>
              <h2>Business Operations</h2>

              <p>Service, project and field operation monitoring</p>
            </div>

            <div className="smm-live-indicator">
              <span className="smm-status-dot online" />
              LIVE
            </div>
          </div>

          <div className="smm-map-placeholder">
            <MapPin size={42} />

            <h3>Operational Intelligence Map</h3>

            <p>
              Business locations, service activities, project sites, field
              assets and operational activities will be integrated here.
            </p>

            <span>{operationalSummary.activeServices} active service(s)</span>
          </div>
        </article>

        {/* =================================================
            BUSINESS STATUS
        ================================================= */}

        <article className="smm-panel smm-status-panel">
          <div className="smm-panel-header">
            <div>
              <h2>Business Status</h2>

              <p>Current company operational condition</p>
            </div>
          </div>

          <div className="smm-status-list">
            <div className="smm-status-row">
              <span className="smm-status-label">
                <span className="smm-status-dot running-dot" />
                Operational
              </span>

              <strong>1</strong>
            </div>

            <div className="smm-status-row">
              <span className="smm-status-label">
                <span className="smm-status-dot busy-dot" />
                Busy
              </span>

              <strong>0</strong>
            </div>

            <div className="smm-status-row">
              <span className="smm-status-label">
                <span className="smm-status-dot idle-dot" />
                Idle
              </span>

              <strong>0</strong>
            </div>

            <div className="smm-status-row">
              <span className="smm-status-label">
                <span className="smm-status-dot maintenance-dot" />
                Maintenance
              </span>

              <strong>0</strong>
            </div>

            <div className="smm-status-row">
              <span className="smm-status-label">
                <span className="smm-status-dot alarm-dot" />
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

      <section className="smm-performance-grid">
        {/* SERVICE */}

        <article className="smm-panel smm-performance-panel">
          <div className="smm-panel-header">
            <div>
              <h2>Service Performance</h2>

              <p>Service delivery performance</p>
            </div>

            <Gauge size={18} />
          </div>

          <div className="smm-performance-body">
            <div className="smm-performance-value">
              <strong>{performance.servicePerformance}%</strong>

              <span>Performance</span>
            </div>

            <div className="smm-progress">
              <span
                style={{
                  width: `${performance.servicePerformance}%`,
                }}
              />
            </div>

            <div className="smm-performance-meta">
              <span>Services: {operationalSummary.activeServices}</span>

              <span>Daily operation</span>
            </div>
          </div>
        </article>

        {/* PROJECT */}

        <article className="smm-panel smm-performance-panel">
          <div className="smm-panel-header">
            <div>
              <h2>Project Performance</h2>

              <p>Project completion progress</p>
            </div>

            <BarChart3 size={18} />
          </div>

          <div className="smm-performance-body">
            <div className="smm-performance-value">
              <strong>{performance.projectCompletion}%</strong>

              <span>Completion</span>
            </div>

            <div className="smm-progress">
              <span
                style={{
                  width: `${performance.projectCompletion}%`,
                }}
              />
            </div>

            <div className="smm-performance-meta">
              <span>Projects: {operationalSummary.activeProjects}</span>

              <span>Project delivery</span>
            </div>
          </div>
        </article>

        {/* ASSET */}

        <article className="smm-panel smm-performance-panel">
          <div className="smm-panel-header">
            <div>
              <h2>Asset Availability</h2>

              <p>Field asset readiness</p>
            </div>

            <Wrench size={18} />
          </div>

          <div className="smm-performance-body">
            <div className="smm-performance-value">
              <strong>{performance.assetAvailability}%</strong>

              <span>Availability</span>
            </div>

            <div className="smm-progress">
              <span
                style={{
                  width: `${performance.assetAvailability}%`,
                }}
              />
            </div>

            <div className="smm-performance-meta">
              <span>Assets: {operationalSummary.assets}</span>

              <span>Asset readiness</span>
            </div>
          </div>
        </article>

        {/* FINANCE */}

        <article className="smm-panel smm-performance-panel">
          <div className="smm-panel-header">
            <div>
              <h2>Financial Performance</h2>

              <p>Business financial performance</p>
            </div>

            <CircleDollarSign size={18} />
          </div>

          <div className="smm-performance-body">
            <div className="smm-performance-value">
              <strong>{performance.financialPerformance}%</strong>

              <span>Performance</span>
            </div>

            <div className="smm-progress">
              <span
                style={{
                  width: `${performance.financialPerformance}%`,
                }}
              />
            </div>

            <div className="smm-performance-meta">
              <span>Revenue tracking</span>

              <span>Finance</span>
            </div>
          </div>
        </article>
      </section>

      {/* ===================================================
          FIELD ASSET MONITORING
      =================================================== */}

      <section className="smm-panel smm-assets-panel">
        <div className="smm-panel-header">
          <div>
            <h2>Field Asset Monitoring</h2>

            <p>Latest operational asset information</p>
          </div>

          <button type="button" className="smm-view-all-button">
            View Assets
          </button>
        </div>

        <div className="smm-table-wrapper">
          <table className="smm-table">
            <thead>
              <tr>
                <th>Asset</th>

                <th>Operator</th>

                <th>Location</th>

                <th>Type</th>

                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {recentAssets.length === 0 ? (
                <tr>
                  <td colSpan={5}>Belum ada field asset Sedaya Multi Matra.</td>
                </tr>
              ) : (
                recentAssets.map((asset) => (
                  <tr key={asset.id}>
                    <td>
                      <strong>{asset.id}</strong>
                    </td>

                    <td>{asset.operator}</td>

                    <td>
                      <span className="smm-location-cell">
                        <MapPin size={14} />

                        {asset.location}
                      </span>
                    </td>

                    <td>
                      <span className="smm-asset-type">
                        <Warehouse size={13} />

                        {asset.type}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`smm-asset-status ${asset.status.toLowerCase()}`}
                      >
                        <span className="smm-status-dot" />

                        {asset.status}
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
          INTELLIGENCE
      =================================================== */}

      <section className="smm-intelligence-panel">
        <div className="smm-intelligence-icon">
          <BarChart3 size={20} />
        </div>

        <div>
          <span>ABN INDUSTRIAL INTELLIGENCE</span>

          <h2>Sedaya Multi Matra Business Intelligence</h2>

          <p>
            Data service operations, projects, manpower, assets, finance,
            procurement, inventory, customer, maintenance dan field operations
            akan dikonsolidasikan menjadi business insight dan executive
            intelligence.
          </p>
        </div>

        <div className="smm-intelligence-status">
          <Wifi size={15} />
          DATA LAYER READY
        </div>
      </section>
    </main>
  );
}

export default SMMDashboard;
