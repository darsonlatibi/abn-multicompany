import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  AlertTriangle,
  Anchor,
  BarChart3,
  Boxes,
  Gauge,
  MapPin,
  Ship,
  Truck,
  Wifi,
  Wrench,
} from "lucide-react";

import "./PBIDashboard.css";

import type { AppDispatch, RootState } from "../../../stores/store";

import {
  fetchVehicles,
  selectVehicles,
  selectVehicleLoading,
  selectVehicleError,
} from "../../../features/vehicle/vehiclesSlice";

/* =========================================================
   TONASA GROUP
   PELABUHAN BIRINGKASSI INDONESIA
   PORT OPERATIONAL DASHBOARD
   ========================================================= */

/* =========================================================
   TYPES
   ========================================================= */

type PortStatus =
  | "OPERATIONAL"
  | "BUSY"
  | "IDLE"
  | "MAINTENANCE"
  | "OFFLINE"
  | "ALARM";

/* =========================================================
   DASHBOARD
   ========================================================= */

function PBIDashboard() {
  const dispatch = useDispatch<AppDispatch>();

  /* =======================================================
     REDUX VEHICLES / EQUIPMENT
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
    name: "PT Pelabuhan Biringkassi Indonesia",
    code: "PBI",
    type: "TONASA GROUP",
    status: "OPERATIONAL",
  };

  /* =======================================================
     PORT KPI
     ======================================================= */

  /*
   * Safe/default values.
   *
   * Nantinya dapat dihubungkan ke:
   *
   * - Port database
   * - Vessel Monitoring
   * - AIS
   * - Terminal Operations
   * - Cargo
   * - Truck / Fleet
   * - Fuel
   * - Maintenance
   * - Manpower
   * - SAP
   * - MQTT / IoT
   */

  const operationalSummary = {
    vesselsToday: 0,

    vesselsInPort: 0,

    activeOperations: 0,

    cargoHandled: 0,

    terminalUtilization: 0,

    manpower: 0,

    equipment: vehicles.length,

    alerts: 0,
  };

  /* =======================================================
     PORT PERFORMANCE
     ======================================================= */

  const performance = {
    berthUtilization: 0,

    vesselTurnaround: 0,

    cargoEfficiency: 0,

    equipmentAvailability: 0,
  };

  /* =======================================================
     PORT EQUIPMENT
     ======================================================= */

  const recentEquipment = vehicles.slice(0, 6).map((vehicle) => ({
    id: vehicle.vehicle_code,

    operator:
      vehicle.driver_id !== null && vehicle.driver_id !== undefined
        ? `Operator #${vehicle.driver_id}`
        : "-",

    location: "Biringkassi Port",

    status: "OFFLINE" as PortStatus,
  }));

  /* =======================================================
     LOADING
     ======================================================= */

  if (loading && vehicles.length === 0) {
    return (
      <main className="pbi-dashboard-page">
        <header className="pbi-dashboard-header">
          <div>
            <span className="pbi-dashboard-eyebrow">
              TONASA GROUP • PELABUHAN BIRINGKASSI
            </span>

            <h1>Pelabuhan Biringkassi Indonesia</h1>

            <p>Loading port operational data...</p>
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
      <main className="pbi-dashboard-page">
        <header className="pbi-dashboard-header">
          <div>
            <span className="pbi-dashboard-eyebrow">
              TONASA GROUP • PELABUHAN BIRINGKASSI
            </span>

            <h1>Pelabuhan Biringkassi Indonesia</h1>

            <p>Gagal mengambil data operasional pelabuhan.</p>

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
    <main className="pbi-dashboard-page">
      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="pbi-dashboard-header">
        <div className="pbi-company-heading">
          <div className="pbi-company-icon">
            <Anchor size={22} />
          </div>

          <div>
            <span className="pbi-dashboard-eyebrow">
              TONASA GROUP • SUBSIDIARY / AFFILIATED ENTITY
            </span>

            <h1>{company.name}</h1>

            <p>
              Port operations, terminal performance and maritime intelligence
            </p>
          </div>
        </div>

        <div className="pbi-server-status">
          <span className="pbi-status-dot online" />

          <div>
            <strong>{company.status}</strong>

            <small>{company.code} • ABN EMS</small>
          </div>
        </div>
      </header>

      {/* ===================================================
          COMPANY BAR
      =================================================== */}

      <section className="pbi-company-bar">
        <div className="pbi-company-info">
          <span className="pbi-company-badge">{company.code}</span>

          <div>
            <strong>{company.name}</strong>

            <small>Tonasa Group Port & Maritime Operational Intelligence</small>
          </div>
        </div>

        <div className="pbi-live-state">
          <span className="pbi-status-dot online" />
          PORT SYSTEM ONLINE
        </div>
      </section>

      {/* ===================================================
          KPI SUMMARY
      =================================================== */}

      <section className="pbi-summary">
        {/* VESSELS */}

        <article className="pbi-summary-card">
          <div className="pbi-summary-icon">
            <Ship size={21} />
          </div>

          <div className="pbi-summary-content">
            <span>Vessels Today</span>

            <strong>{operationalSummary.vesselsToday}</strong>

            <small>Vessel calls today</small>
          </div>
        </article>

        {/* VESSELS IN PORT */}

        <article className="pbi-summary-card active">
          <div className="pbi-summary-icon">
            <Anchor size={21} />
          </div>

          <div className="pbi-summary-content">
            <span>Vessels In Port</span>

            <strong>{operationalSummary.vesselsInPort}</strong>

            <small>Currently inside port</small>
          </div>
        </article>

        {/* OPERATIONS */}

        <article className="pbi-summary-card operations">
          <div className="pbi-summary-icon">
            <Gauge size={21} />
          </div>

          <div className="pbi-summary-content">
            <span>Active Operations</span>

            <strong>{operationalSummary.activeOperations}</strong>

            <small>Current port operations</small>
          </div>
        </article>

        {/* CARGO */}

        <article className="pbi-summary-card cargo">
          <div className="pbi-summary-icon">
            <Boxes size={21} />
          </div>

          <div className="pbi-summary-content">
            <span>Cargo Handled</span>

            <strong>{operationalSummary.cargoHandled}</strong>

            <small>Today's cargo volume</small>
          </div>
        </article>

        {/* ALERTS */}

        <article className="pbi-summary-card alert">
          <div className="pbi-summary-icon">
            <AlertTriangle size={21} />
          </div>

          <div className="pbi-summary-content">
            <span>Alerts</span>

            <strong>{operationalSummary.alerts}</strong>

            <small>Port operational alerts</small>
          </div>
        </article>
      </section>

      {/* ===================================================
          MAIN GRID
      =================================================== */}

      <section className="pbi-main-grid">
        {/* =================================================
            PORT MAP
        ================================================= */}

        <article className="pbi-panel pbi-map-panel">
          <div className="pbi-panel-header">
            <div>
              <h2>Port Operations</h2>

              <p>Vessel, terminal and field operation monitoring</p>
            </div>

            <div className="pbi-live-indicator">
              <span className="pbi-status-dot online" />
              LIVE
            </div>
          </div>

          <div className="pbi-map-placeholder">
            <MapPin size={42} />

            <h3>Port Operational Map</h3>

            <p>
              AIS, vessel traffic, berth, terminal and field operation map
              integration will be connected here.
            </p>

            <span>
              {operationalSummary.vesselsInPort} vessel(s) currently in port
            </span>
          </div>
        </article>

        {/* =================================================
            PORT STATUS
        ================================================= */}

        <article className="pbi-panel pbi-status-panel">
          <div className="pbi-panel-header">
            <div>
              <h2>Port Status</h2>

              <p>Current terminal condition</p>
            </div>
          </div>

          <div className="pbi-status-list">
            <div className="pbi-status-row">
              <span className="pbi-status-label">
                <span className="pbi-status-dot running-dot" />
                Operational
              </span>

              <strong>1</strong>
            </div>

            <div className="pbi-status-row">
              <span className="pbi-status-label">
                <span className="pbi-status-dot busy-dot" />
                Busy
              </span>

              <strong>0</strong>
            </div>

            <div className="pbi-status-row">
              <span className="pbi-status-label">
                <span className="pbi-status-dot idle-dot" />
                Idle
              </span>

              <strong>0</strong>
            </div>

            <div className="pbi-status-row">
              <span className="pbi-status-label">
                <span className="pbi-status-dot maintenance-dot" />
                Maintenance
              </span>

              <strong>0</strong>
            </div>

            <div className="pbi-status-row">
              <span className="pbi-status-label">
                <span className="pbi-status-dot alarm-dot" />
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

      <section className="pbi-performance-grid">
        {/* BERTH */}

        <article className="pbi-panel pbi-performance-panel">
          <div className="pbi-panel-header">
            <div>
              <h2>Berth Performance</h2>

              <p>Berth utilization</p>
            </div>

            <Anchor size={18} />
          </div>

          <div className="pbi-performance-body">
            <div className="pbi-performance-value">
              <strong>{performance.berthUtilization}%</strong>

              <span>Utilization</span>
            </div>

            <div className="pbi-progress">
              <span
                style={{
                  width: `${performance.berthUtilization}%`,
                }}
              />
            </div>

            <div className="pbi-performance-meta">
              <span>Vessels: {operationalSummary.vesselsInPort}</span>

              <span>Berth utilization</span>
            </div>
          </div>
        </article>

        {/* VESSEL TURNAROUND */}

        <article className="pbi-panel pbi-performance-panel">
          <div className="pbi-panel-header">
            <div>
              <h2>Vessel Turnaround</h2>

              <p>Port turnaround performance</p>
            </div>

            <Ship size={18} />
          </div>

          <div className="pbi-performance-body">
            <div className="pbi-performance-value">
              <strong>{performance.vesselTurnaround}</strong>

              <span>hours</span>
            </div>

            <div className="pbi-placeholder">
              Vessel turnaround data integration pending
            </div>
          </div>
        </article>

        {/* CARGO */}

        <article className="pbi-panel pbi-performance-panel">
          <div className="pbi-panel-header">
            <div>
              <h2>Cargo Intelligence</h2>

              <p>Terminal cargo efficiency</p>
            </div>

            <Boxes size={18} />
          </div>

          <div className="pbi-performance-body">
            <div className="pbi-performance-value">
              <strong>{performance.cargoEfficiency}%</strong>

              <span>Efficiency</span>
            </div>

            <div className="pbi-progress">
              <span
                style={{
                  width: `${performance.cargoEfficiency}%`,
                }}
              />
            </div>

            <div className="pbi-performance-meta">
              <span>Cargo: {operationalSummary.cargoHandled}</span>

              <span>Daily operation</span>
            </div>
          </div>
        </article>

        {/* EQUIPMENT */}

        <article className="pbi-panel pbi-performance-panel">
          <div className="pbi-panel-header">
            <div>
              <h2>Equipment Availability</h2>

              <p>Port equipment readiness</p>
            </div>

            <Wrench size={18} />
          </div>

          <div className="pbi-performance-body">
            <div className="pbi-performance-value">
              <strong>{performance.equipmentAvailability}%</strong>

              <span>Availability</span>
            </div>

            <div className="pbi-progress">
              <span
                style={{
                  width: `${performance.equipmentAvailability}%`,
                }}
              />
            </div>

            <div className="pbi-performance-meta">
              <span>Equipment: {operationalSummary.equipment}</span>

              <span>Readiness</span>
            </div>
          </div>
        </article>
      </section>

      {/* ===================================================
          PORT EQUIPMENT MONITORING
      =================================================== */}

      <section className="pbi-panel pbi-equipment-panel">
        <div className="pbi-panel-header">
          <div>
            <h2>Port Equipment Monitoring</h2>

            <p>Latest operational equipment information</p>
          </div>

          <button type="button" className="pbi-view-all-button">
            View Equipment
          </button>
        </div>

        <div className="pbi-table-wrapper">
          <table className="pbi-table">
            <thead>
              <tr>
                <th>Equipment</th>

                <th>Operator</th>

                <th>Location</th>

                <th>Type</th>

                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {recentEquipment.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    Belum ada equipment Pelabuhan Biringkassi.
                  </td>
                </tr>
              ) : (
                recentEquipment.map((equipment) => (
                  <tr key={equipment.id}>
                    <td>
                      <strong>{equipment.id}</strong>
                    </td>

                    <td>{equipment.operator}</td>

                    <td>
                      <span className="pbi-location-cell">
                        <MapPin size={14} />

                        {equipment.location}
                      </span>
                    </td>

                    <td>
                      <span className="pbi-equipment-type">
                        <Truck size={13} />
                        Mobile Equipment
                      </span>
                    </td>

                    <td>
                      <span
                        className={`pbi-equipment-status ${equipment.status.toLowerCase()}`}
                      >
                        <span className="pbi-status-dot" />

                        {equipment.status}
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
          PORT INTELLIGENCE
      =================================================== */}

      <section className="pbi-intelligence-panel">
        <div className="pbi-intelligence-icon">
          <BarChart3 size={20} />
        </div>

        <div>
          <span>ABN INDUSTRIAL INTELLIGENCE</span>

          <h2>Pelabuhan Biringkassi Port Intelligence</h2>

          <p>
            Data vessel, AIS, berth, terminal, cargo, equipment, manpower, fuel,
            maintenance dan logistics akan dikonsolidasikan menjadi port
            operational insight dan executive intelligence.
          </p>
        </div>

        <div className="pbi-intelligence-status">
          <Wifi size={15} />
          DATA LAYER READY
        </div>
      </section>
    </main>
  );
}

export default PBIDashboard;
