import {
  AlertTriangle,
  BarChart3,
  Building2,
  ClipboardList,
  GraduationCap,
  HeartPulse,
  Users,
  Wifi,
} from "lucide-react";

import "./YKSTDashboard.css";

/* =========================================================
   TONASA GROUP
   YAYASAN KESEJAHTERAAN SEMEN TONASA
   FOUNDATION & SOCIAL WELFARE INTELLIGENCE DASHBOARD
   ========================================================= */

/* =========================================================
   TYPES
   ========================================================= */

type ProgramStatus = "ACTIVE" | "COMPLETED" | "PLANNED" | "ON_HOLD" | "ALARM";

/* =========================================================
   DASHBOARD
   ========================================================= */

function YKSTDashboard() {
  /* =======================================================
     FOUNDATION PROFILE
     ======================================================= */

  const foundation = {
    name: "Yayasan Kesejahteraan Semen Tonasa",
    shortName: "YKST",
    code: "YKST",
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
   * - Foundation database
   * - Program database
   * - Education system
   * - Healthcare / welfare services
   * - Facility management
   * - Beneficiary database
   * - Employee / retiree data
   * - Budget & finance
   * - SAP
   * - HRIS
   * - MQTT / IoT
   * - AI Intelligence Layer
   */

  const operationalSummary = {
    totalPrograms: 0,

    activePrograms: 0,

    beneficiaries: 0,

    educationPrograms: 0,

    facilities: 0,

    alerts: 0,
  };

  /* =======================================================
     PERFORMANCE
     ======================================================= */

  const performance = {
    programCompletion: 0,

    beneficiaryCoverage: 0,

    educationPerformance: 0,

    facilityReadiness: 0,

    budgetUtilization: 0,
  };

  /* =======================================================
     SUPPORTING PROGRAM DATA
     ======================================================= */

  const recentPrograms: {
    id: string;
    program: string;
    category: string;
    location: string;
    beneficiaries: number;
    status: ProgramStatus;
  }[] = [];

  /* =======================================================
     PROGRAM STATUS SUMMARY
     ======================================================= */

  const programStatus = {
    active: operationalSummary.activePrograms,

    completed: 0,

    planned: 0,

    onHold: 0,

    alarm: operationalSummary.alerts,
  };

  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <main className="ykst-dashboard-page">
      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="ykst-dashboard-header">
        <div className="ykst-company-heading">
          <div className="ykst-company-icon">
            <HeartPulse size={22} />
          </div>

          <div>
            <span className="ykst-dashboard-eyebrow">
              TONASA GROUP • FOUNDATION
            </span>

            <h1>{foundation.name}</h1>

            <p>Social welfare, education and foundation intelligence</p>
          </div>
        </div>

        <div className="ykst-server-status">
          <span className="ykst-status-dot online" />

          <div>
            <strong>{foundation.status}</strong>

            <small>{foundation.code} • ABN EMS</small>
          </div>
        </div>
      </header>

      {/* ===================================================
          FOUNDATION BAR
      =================================================== */}

      <section className="ykst-company-bar">
        <div className="ykst-company-info">
          <span className="ykst-company-badge">
            <HeartPulse size={17} />
          </span>

          <div>
            <strong>{foundation.shortName}</strong>

            <small>Tonasa Group Foundation & Social Welfare Intelligence</small>
          </div>
        </div>

        <div className="ykst-live-state">
          <span className="ykst-status-dot online" />
          SYSTEM ONLINE
        </div>
      </section>

      {/* ===================================================
          KPI SUMMARY
      =================================================== */}

      <section className="ykst-summary">
        {/* PROGRAMS */}

        <article className="ykst-summary-card">
          <div className="ykst-summary-icon">
            <ClipboardList size={21} />
          </div>

          <div className="ykst-summary-content">
            <span>Programs</span>

            <strong>{operationalSummary.totalPrograms}</strong>

            <small>Total foundation programs</small>
          </div>
        </article>

        {/* ACTIVE */}

        <article className="ykst-summary-card active">
          <div className="ykst-summary-icon">
            <BarChart3 size={21} />
          </div>

          <div className="ykst-summary-content">
            <span>Active Programs</span>

            <strong>{operationalSummary.activePrograms}</strong>

            <small>Currently running programs</small>
          </div>
        </article>

        {/* BENEFICIARIES */}

        <article className="ykst-summary-card beneficiary">
          <div className="ykst-summary-icon">
            <Users size={21} />
          </div>

          <div className="ykst-summary-content">
            <span>Beneficiaries</span>

            <strong>{operationalSummary.beneficiaries}</strong>

            <small>People receiving benefits</small>
          </div>
        </article>

        {/* EDUCATION */}

        <article className="ykst-summary-card education">
          <div className="ykst-summary-icon">
            <GraduationCap size={21} />
          </div>

          <div className="ykst-summary-content">
            <span>Education</span>

            <strong>{operationalSummary.educationPrograms}</strong>

            <small>Education programs</small>
          </div>
        </article>

        {/* ALERTS */}

        <article className="ykst-summary-card alert">
          <div className="ykst-summary-icon">
            <AlertTriangle size={21} />
          </div>

          <div className="ykst-summary-content">
            <span>Alerts</span>

            <strong>{operationalSummary.alerts}</strong>

            <small>Foundation operational alerts</small>
          </div>
        </article>
      </section>

      {/* ===================================================
          MAIN GRID
      =================================================== */}

      <section className="ykst-main-grid">
        {/* =================================================
            FOUNDATION PROGRAM MAP
        ================================================= */}

        <article className="ykst-panel ykst-map-panel">
          <div className="ykst-panel-header">
            <div>
              <h2>Foundation Program Monitoring</h2>

              <p>Education, welfare and facility program intelligence</p>
            </div>

            <div className="ykst-live-indicator">
              <span className="ykst-status-dot online" />
              LIVE
            </div>
          </div>

          <div className="ykst-map-placeholder">
            <HeartPulse size={42} />

            <h3>Foundation Intelligence Map</h3>

            <p>
              Program location, beneficiary distribution, education facilities
              and welfare activities will be connected here.
            </p>

            <span>
              {operationalSummary.totalPrograms} program(s) registered
            </span>
          </div>
        </article>

        {/* =================================================
            PROGRAM STATUS
        ================================================= */}

        <article className="ykst-panel ykst-status-panel">
          <div className="ykst-panel-header">
            <div>
              <h2>Program Status</h2>

              <p>Current foundation condition</p>
            </div>
          </div>

          <div className="ykst-status-list">
            <div className="ykst-status-row">
              <span className="ykst-status-label">
                <span className="ykst-status-dot active-dot" />
                Active
              </span>

              <strong>{programStatus.active}</strong>
            </div>

            <div className="ykst-status-row">
              <span className="ykst-status-label">
                <span className="ykst-status-dot completed-dot" />
                Completed
              </span>

              <strong>{programStatus.completed}</strong>
            </div>

            <div className="ykst-status-row">
              <span className="ykst-status-label">
                <span className="ykst-status-dot planned-dot" />
                Planned
              </span>

              <strong>{programStatus.planned}</strong>
            </div>

            <div className="ykst-status-row">
              <span className="ykst-status-label">
                <span className="ykst-status-dot hold-dot" />
                On Hold
              </span>

              <strong>{programStatus.onHold}</strong>
            </div>

            <div className="ykst-status-row">
              <span className="ykst-status-label">
                <span className="ykst-status-dot alarm-dot" />
                Alert
              </span>

              <strong>{programStatus.alarm}</strong>
            </div>
          </div>
        </article>
      </section>

      {/* ===================================================
          PERFORMANCE
      =================================================== */}

      <section className="ykst-performance-grid">
        {/* PROGRAM */}

        <article className="ykst-panel ykst-performance-panel">
          <div className="ykst-panel-header">
            <div>
              <h2>Program Performance</h2>

              <p>Foundation program execution</p>
            </div>

            <ClipboardList size={18} />
          </div>

          <div className="ykst-performance-body">
            <div className="ykst-performance-value">
              <strong>{performance.programCompletion}%</strong>

              <span>Completion</span>
            </div>

            <div className="ykst-progress">
              <span
                style={{
                  width: `${performance.programCompletion}%`,
                }}
              />
            </div>

            <div className="ykst-performance-meta">
              <span>Active: {operationalSummary.activePrograms}</span>

              <span>Total: {operationalSummary.totalPrograms}</span>
            </div>
          </div>
        </article>

        {/* BENEFICIARY */}

        <article className="ykst-panel ykst-performance-panel">
          <div className="ykst-panel-header">
            <div>
              <h2>Beneficiary Intelligence</h2>

              <p>Social welfare coverage</p>
            </div>

            <Users size={18} />
          </div>

          <div className="ykst-performance-body">
            <div className="ykst-performance-value">
              <strong>{performance.beneficiaryCoverage}%</strong>

              <span>Coverage</span>
            </div>

            <div className="ykst-progress">
              <span
                style={{
                  width: `${performance.beneficiaryCoverage}%`,
                }}
              />
            </div>

            <div className="ykst-performance-meta">
              <span>Beneficiaries</span>

              <span>{operationalSummary.beneficiaries}</span>
            </div>
          </div>
        </article>

        {/* EDUCATION */}

        <article className="ykst-panel ykst-performance-panel">
          <div className="ykst-panel-header">
            <div>
              <h2>Education Intelligence</h2>

              <p>Education program performance</p>
            </div>

            <GraduationCap size={18} />
          </div>

          <div className="ykst-performance-body">
            <div className="ykst-performance-value">
              <strong>{performance.educationPerformance}%</strong>

              <span>Performance</span>
            </div>

            <div className="ykst-progress">
              <span
                style={{
                  width: `${performance.educationPerformance}%`,
                }}
              />
            </div>

            <div className="ykst-performance-meta">
              <span>Programs</span>

              <span>{operationalSummary.educationPrograms}</span>
            </div>
          </div>
        </article>

        {/* FACILITY */}

        <article className="ykst-panel ykst-performance-panel">
          <div className="ykst-panel-header">
            <div>
              <h2>Facility Readiness</h2>

              <p>Foundation facility condition</p>
            </div>

            <Building2 size={18} />
          </div>

          <div className="ykst-performance-body">
            <div className="ykst-performance-value">
              <strong>{performance.facilityReadiness}%</strong>

              <span>Readiness</span>
            </div>

            <div className="ykst-progress">
              <span
                style={{
                  width: `${performance.facilityReadiness}%`,
                }}
              />
            </div>

            <div className="ykst-performance-meta">
              <span>Facilities</span>

              <span>{operationalSummary.facilities}</span>
            </div>
          </div>
        </article>
      </section>

      {/* ===================================================
          PROGRAM MONITORING
      =================================================== */}

      <section className="ykst-panel ykst-program-panel">
        <div className="ykst-panel-header">
          <div>
            <h2>Program Monitoring</h2>

            <p>Latest Yayasan Kesejahteraan Semen Tonasa activities</p>
          </div>

          <button type="button" className="ykst-view-all-button">
            View Programs
          </button>
        </div>

        <div className="ykst-table-wrapper">
          <table className="ykst-table">
            <thead>
              <tr>
                <th>Program</th>

                <th>Category</th>

                <th>Location</th>

                <th>Beneficiaries</th>

                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {recentPrograms.length === 0 ? (
                <tr>
                  <td colSpan={5}>Belum ada data program YKST.</td>
                </tr>
              ) : (
                recentPrograms.map((program) => (
                  <tr key={program.id}>
                    <td>
                      <strong>{program.program}</strong>
                    </td>

                    <td>{program.category}</td>

                    <td>
                      <span className="ykst-location-cell">
                        <Building2 size={14} />

                        {program.location}
                      </span>
                    </td>

                    <td>{program.beneficiaries}</td>

                    <td>
                      <span
                        className={`ykst-program-status ${program.status.toLowerCase()}`}
                      >
                        <span className="ykst-status-dot" />

                        {program.status.replace("_", " ")}
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
          FOUNDATION CAPABILITY
      =================================================== */}

      <section className="ykst-capability-grid">
        <article className="ykst-mini-panel">
          <div className="ykst-mini-icon">
            <HeartPulse size={18} />
          </div>

          <div>
            <strong>Social Welfare</strong>

            <span>Employee and community welfare intelligence</span>
          </div>
        </article>

        <article className="ykst-mini-panel">
          <div className="ykst-mini-icon">
            <GraduationCap size={18} />
          </div>

          <div>
            <strong>Education</strong>

            <span>Education programs and learning facilities</span>
          </div>
        </article>

        <article className="ykst-mini-panel">
          <div className="ykst-mini-icon">
            <Building2 size={18} />
          </div>

          <div>
            <strong>Facilities</strong>

            <span>Foundation facilities and asset readiness</span>
          </div>
        </article>

        <article className="ykst-mini-panel">
          <div className="ykst-mini-icon">
            <Users size={18} />
          </div>

          <div>
            <strong>Beneficiary Intelligence</strong>

            <span>Beneficiary, participation and impact monitoring</span>
          </div>
        </article>
      </section>

      {/* ===================================================
          INTELLIGENCE FOOTER
      =================================================== */}

      <section className="ykst-intelligence-panel">
        <div className="ykst-intelligence-icon">
          <BarChart3 size={20} />
        </div>

        <div>
          <span>ABN INDUSTRIAL INTELLIGENCE</span>

          <h2>YKST Foundation Intelligence</h2>

          <p>
            Data program sosial, pendidikan, fasilitas, beneficiary, manpower
            dan keuangan akan dikonsolidasikan menjadi foundation intelligence
            untuk management dan executive decision making.
          </p>
        </div>

        <div className="ykst-intelligence-status">
          <Wifi size={15} />
          DATA LAYER READY
        </div>
      </section>
    </main>
  );
}

export default YKSTDashboard;
