import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  Boxes,
  Factory,
  Gauge,
  Package,
  TimerOff,
  TrendingUp,
  Wrench,
} from "lucide-react";

import "./Production.css";

/* =========================================================
   ABN EMS
   PRODUCTION MANAGEMENT
   ========================================================= */

/* =========================================================
   TYPES
   ========================================================= */

type ProductionStatus =
  | "RUNNING"
  | "IDLE"
  | "STOPPED"
  | "MAINTENANCE"
  | "ALARM";

/* =========================================================
   MOCK DATA
   ========================================================= */

const productionLines = [
  {
    id: "LINE-01",
    name: "Production Line 01",
    product: "Product A",
    target: 1200,
    actual: 1085,
    efficiency: 90.4,
    status: "RUNNING" as ProductionStatus,
  },
  {
    id: "LINE-02",
    name: "Production Line 02",
    product: "Product B",
    target: 950,
    actual: 820,
    efficiency: 86.3,
    status: "RUNNING" as ProductionStatus,
  },
  {
    id: "LINE-03",
    name: "Production Line 03",
    product: "Product C",
    target: 800,
    actual: 0,
    efficiency: 0,
    status: "MAINTENANCE" as ProductionStatus,
  },
  {
    id: "LINE-04",
    name: "Production Line 04",
    product: "Product D",
    target: 1100,
    actual: 1030,
    efficiency: 93.6,
    status: "RUNNING" as ProductionStatus,
  },
];

/* =========================================================
   COMPONENT
   ========================================================= */

function Production() {
  /* =======================================================
     PRODUCTION SUMMARY
  ======================================================= */

  const productionSummary = {
    totalLines: productionLines.length,

    running: productionLines.filter((line) => line.status === "RUNNING").length,

    idle: productionLines.filter((line) => line.status === "IDLE").length,

    maintenance: productionLines.filter((line) => line.status === "MAINTENANCE")
      .length,

    alarm: productionLines.filter((line) => line.status === "ALARM").length,

    target: productionLines.reduce((total, line) => total + line.target, 0),

    actual: productionLines.reduce((total, line) => total + line.actual, 0),
  };

  const achievement =
    productionSummary.target > 0
      ? ((productionSummary.actual / productionSummary.target) * 100).toFixed(1)
      : "0.0";

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main className="production-page">
      {/* =========================================
          HEADER
      ========================================== */}

      <header className="production-header">
        <div>
          <span className="production-eyebrow">
            ABN EMS • PRODUCTION MANAGEMENT
          </span>

          <h1>Production Dashboard</h1>

          <p>
            Production performance, machine status and manufacturing monitoring
          </p>
        </div>

        <div className="production-server-status">
          <span className="production-status-dot online" />

          <div>
            <strong>SYSTEM ONLINE</strong>

            <small>ABN SERVER :5000</small>
          </div>
        </div>
      </header>

      {/* =========================================
          SUMMARY CARDS
      ========================================== */}

      <section className="production-summary">
        {/* TOTAL LINES */}

        <article className="production-summary-card">
          <div className="production-summary-icon">
            <Factory size={22} />
          </div>

          <div className="production-summary-content">
            <span>Production Lines</span>

            <strong>{productionSummary.totalLines}</strong>

            <small>Registered lines</small>
          </div>
        </article>

        {/* RUNNING */}

        <article className="production-summary-card running">
          <div className="production-summary-icon">
            <Activity size={22} />
          </div>

          <div className="production-summary-content">
            <span>Running</span>

            <strong>{productionSummary.running}</strong>

            <small>Lines operating</small>
          </div>
        </article>

        {/* OUTPUT */}

        <article className="production-summary-card output">
          <div className="production-summary-icon">
            <TrendingUp size={22} />
          </div>

          <div className="production-summary-content">
            <span>Actual Output</span>

            <strong>{productionSummary.actual.toLocaleString()}</strong>

            <small>Units produced</small>
          </div>
        </article>

        {/* ACHIEVEMENT */}

        <article className="production-summary-card achievement">
          <div className="production-summary-icon">
            <Gauge size={22} />
          </div>

          <div className="production-summary-content">
            <span>Achievement</span>

            <strong>{achievement}%</strong>

            <small>Against target</small>
          </div>
        </article>

        {/* MAINTENANCE */}

        <article className="production-summary-card maintenance">
          <div className="production-summary-icon">
            <Wrench size={22} />
          </div>

          <div className="production-summary-content">
            <span>Maintenance</span>

            <strong>{productionSummary.maintenance}</strong>

            <small>Lines under maintenance</small>
          </div>
        </article>

        {/* ALARM */}

        <article className="production-summary-card alarm">
          <div className="production-summary-icon">
            <AlertTriangle size={22} />
          </div>

          <div className="production-summary-content">
            <span>Alarm</span>

            <strong>{productionSummary.alarm}</strong>

            <small>Active production alarms</small>
          </div>
        </article>
      </section>

      {/* =========================================
          MAIN GRID
      ========================================== */}

      <section className="production-grid">
        {/* =======================================
            PRODUCTION PERFORMANCE
        ======================================== */}

        <article className="production-panel performance-panel">
          <div className="production-panel-header">
            <div>
              <h2>Production Performance</h2>

              <p>Target versus actual production</p>
            </div>

            <div className="production-live-indicator">
              <span className="production-status-dot online" />
              LIVE
            </div>
          </div>

          <div className="production-performance">
            <div className="performance-main">
              <span>Daily Production Achievement</span>

              <strong>{achievement}%</strong>

              <div className="performance-progress">
                <div
                  className="performance-progress-value"
                  style={{
                    width: `${Math.min(Number(achievement), 100)}%`,
                  }}
                />
              </div>

              <div className="performance-meta">
                <span>
                  Actual{" "}
                  <strong>{productionSummary.actual.toLocaleString()}</strong>
                </span>

                <span>
                  Target{" "}
                  <strong>{productionSummary.target.toLocaleString()}</strong>
                </span>
              </div>
            </div>
          </div>
        </article>

        {/* =======================================
            PRODUCTION STATUS
        ======================================== */}

        <article className="production-panel status-panel">
          <div className="production-panel-header">
            <div>
              <h2>Production Status</h2>

              <p>Current production condition</p>
            </div>
          </div>

          <div className="production-status-list">
            {/* RUNNING */}

            <div className="production-status-row">
              <span className="production-status-label">
                <span className="production-status-dot running-dot" />
                Running
              </span>

              <strong>{productionSummary.running}</strong>
            </div>

            {/* IDLE */}

            <div className="production-status-row">
              <span className="production-status-label">
                <span className="production-status-dot idle-dot" />
                Idle
              </span>

              <strong>{productionSummary.idle}</strong>
            </div>

            {/* MAINTENANCE */}

            <div className="production-status-row">
              <span className="production-status-label">
                <span className="production-status-dot maintenance-dot" />
                Maintenance
              </span>

              <strong>{productionSummary.maintenance}</strong>
            </div>

            {/* STOPPED */}

            <div className="production-status-row">
              <span className="production-status-label">
                <span className="production-status-dot stopped-dot" />
                Stopped
              </span>

              <strong>
                {
                  productionLines.filter((line) => line.status === "STOPPED")
                    .length
                }
              </strong>
            </div>

            {/* ALARM */}

            <div className="production-status-row">
              <span className="production-status-label">
                <span className="production-status-dot alarm-dot" />
                Alarm
              </span>

              <strong>{productionSummary.alarm}</strong>
            </div>
          </div>
        </article>
      </section>

      {/* =========================================
          PRODUCTION LINES
      ========================================== */}

      <section className="production-panel production-lines-panel">
        <div className="production-panel-header">
          <div>
            <h2>Production Lines</h2>

            <p>Real-time production line performance</p>
          </div>

          <button type="button" className="production-view-all-button">
            View All
          </button>
        </div>

        <div className="production-table-wrapper">
          <table className="production-table">
            <thead>
              <tr>
                <th>Line</th>

                <th>Product</th>

                <th>Target</th>

                <th>Actual</th>

                <th>Achievement</th>

                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {productionLines.length === 0 ? (
                <tr>
                  <td colSpan={6}>Belum ada production line.</td>
                </tr>
              ) : (
                productionLines.map((line) => (
                  <tr key={line.id}>
                    {/* LINE */}

                    <td>
                      <div className="production-line-cell">
                        <div className="production-line-icon">
                          <Factory size={17} />
                        </div>

                        <div>
                          <strong>{line.id}</strong>

                          <small>{line.name}</small>
                        </div>
                      </div>
                    </td>

                    {/* PRODUCT */}

                    <td>
                      <span className="production-product">
                        <Package size={15} />

                        {line.product}
                      </span>
                    </td>

                    {/* TARGET */}

                    <td>{line.target.toLocaleString()}</td>

                    {/* ACTUAL */}

                    <td>
                      <strong>{line.actual.toLocaleString()}</strong>
                    </td>

                    {/* ACHIEVEMENT */}

                    <td>
                      <div className="line-achievement">
                        <span>{line.efficiency.toFixed(1)}%</span>

                        <div className="line-progress">
                          <div
                            className="line-progress-value"
                            style={{
                              width: `${Math.min(line.efficiency, 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* STATUS */}

                    <td>
                      <span
                        className={`production-line-status ${line.status.toLowerCase()}`}
                      >
                        <span className="production-status-dot" />

                        {line.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================
          BOTTOM CARDS
      ========================================== */}

      <section className="production-bottom-grid">
        {/* OEE */}

        <article className="production-panel metric-panel">
          <div className="metric-icon">
            <Gauge size={21} />
          </div>

          <div>
            <span>Overall Equipment Effectiveness</span>

            <strong>87.4%</strong>

            <small>Current estimated OEE</small>
          </div>
        </article>

        {/* QUALITY */}

        <article className="production-panel metric-panel">
          <div className="metric-icon">
            <BadgeCheck size={21} />
          </div>

          <div>
            <span>Quality Rate</span>

            <strong>96.8%</strong>

            <small>Accepted production output</small>
          </div>
        </article>

        {/* DOWNTIME */}

        <article className="production-panel metric-panel">
          <div className="metric-icon">
            <TimerOff size={21} />
          </div>

          <div>
            <span>Downtime</span>

            <strong>2.8%</strong>

            <small>Production downtime</small>
          </div>
        </article>

        {/* MATERIAL */}

        <article className="production-panel metric-panel">
          <div className="metric-icon">
            <Boxes size={21} />
          </div>

          <div>
            <span>Material Availability</span>

            <strong>94.2%</strong>

            <small>Raw material availability</small>
          </div>
        </article>
      </section>
    </main>
  );
}

export default Production;
