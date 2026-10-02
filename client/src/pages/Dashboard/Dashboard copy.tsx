import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BrainCircuit,
  Factory,
  Gauge,
  HardDrive,
  Layers3,
  ShieldAlert,
  TrendingUp,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";

import "./Dashboard.css";

/* =========================================================
   TONASA EXECUTIVE INTELLIGENCE
   DEMO DASHBOARD
   ========================================================= */

/* =========================================================
   TYPES
   ========================================================= */

type TrendDirection = "up" | "down" | "neutral";

interface KPIItem {
  label: string;
  value: string;
  unit?: string;
  description: string;
  trend: string;
  direction: TrendDirection;
  icon: React.ComponentType<{
    size?: number;
    strokeWidth?: number;
  }>;
  className?: string;
}

interface ProductionItem {
  name: string;
  target: string;
  actual: string;
  achievement: string;
  status: "Excellent" | "Good" | "Warning";
}

interface InsightItem {
  type: "warning" | "success" | "info";
  title: string;
  description: string;
  action?: string;
}

/* =========================================================
   DEMO DATA
   ========================================================= */

/*
 * Semua data di bawah adalah DATA SIMULASI
 * untuk TONASA DEMO.
 *
 * Nanti bisa diganti dengan:
 *
 * SAP
 * SCADA / DCS
 * IoT
 * Database
 * Maintenance System
 * Fleet
 */

const kpis: KPIItem[] = [
  {
    label: "Production Achievement",
    value: "94.2",
    unit: "%",
    description: "Against monthly target",
    trend: "+3.8%",
    direction: "up",
    icon: Factory,
    className: "production",
  },

  {
    label: "Plant Availability",
    value: "96.8",
    unit: "%",
    description: "Overall equipment availability",
    trend: "+1.6%",
    direction: "up",
    icon: Gauge,
    className: "availability",
  },

  {
    label: "Asset Health",
    value: "91.7",
    unit: "%",
    description: "Critical asset condition",
    trend: "+2.4%",
    direction: "up",
    icon: HardDrive,
    className: "asset",
  },

  {
    label: "Energy Efficiency",
    value: "88.4",
    unit: "%",
    description: "Energy performance index",
    trend: "+4.1%",
    direction: "up",
    icon: Zap,
    className: "energy",
  },

  {
    label: "Maintenance Performance",
    value: "93.1",
    unit: "%",
    description: "Maintenance KPI",
    trend: "+2.7%",
    direction: "up",
    icon: Wrench,
    className: "maintenance",
  },

  {
    label: "Fleet Availability",
    value: "89.6",
    unit: "%",
    description: "Fleet operational availability",
    trend: "-1.2%",
    direction: "down",
    icon: Truck,
    className: "fleet",
  },
];

/* =========================================================
   PRODUCTION
   ========================================================= */

const productionData: ProductionItem[] = [
  {
    name: "Tonasa 2",
    target: "1,180",
    actual: "1,132",
    achievement: "95.9%",
    status: "Excellent",
  },

  {
    name: "Tonasa 3",
    target: "1,240",
    actual: "1,148",
    achievement: "92.6%",
    status: "Good",
  },

  {
    name: "Tonasa 4",
    target: "2,400",
    actual: "2,286",
    achievement: "95.3%",
    status: "Excellent",
  },

  {
    name: "Tonasa 5",
    target: "2,600",
    actual: "2,210",
    achievement: "85.0%",
    status: "Warning",
  },
];

/* =========================================================
   INTELLIGENCE
   ========================================================= */

const intelligenceInsights: InsightItem[] = [
  {
    type: "warning",
    title: "Tonasa 5 performance decline",
    description:
      "Production achievement is 85.0%, approximately 6.4% below the current plant average.",
    action: "Review operating parameters",
  },

  {
    type: "warning",
    title: "Kiln maintenance risk increasing",
    description:
      "Asset condition indicators suggest increased maintenance attention may be required.",
    action: "Review maintenance schedule",
  },

  {
    type: "success",
    title: "Energy efficiency improved",
    description:
      "Energy performance improved by 4.1% compared with the previous monitoring period.",
  },

  {
    type: "info",
    title: "Fleet utilization opportunity",
    description:
      "Fleet availability remains below the target benchmark and may impact logistics efficiency.",
    action: "Analyze fleet utilization",
  },
];

/* =========================================================
   EXECUTIVE DASHBOARD
   ========================================================= */

function Dashboard() {
  return (
    <main className="dashboard-page tonasa-dashboard">
      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="dashboard-header">
        <div className="dashboard-header-main">
          <span className="dashboard-eyebrow">PT. SEMEN TONASA</span>

          <h1>Executive Intelligence</h1>

          <p>
            Integrated business, operational and industrial performance
            intelligence.
          </p>
        </div>

        <div className="dashboard-header-status">
          <div className="dashboard-status-icon">
            <Activity size={18} />
          </div>

          <div>
            <strong>DEMO ENVIRONMENT</strong>

            <span>Intelligence platform online</span>
          </div>
        </div>
      </header>

      {/* ===================================================
          DEMO NOTICE
      =================================================== */}

      <section className="demo-notice">
        <div className="demo-notice-icon">
          <Layers3 size={19} />
        </div>

        <div>
          <strong>TONASA INDUSTRIAL INTELLIGENCE DEMO</strong>

          <p>
            Data displayed in this environment is simulated for demonstration
            purposes.
          </p>
        </div>
      </section>

      {/* ===================================================
          EXECUTIVE KPI
      =================================================== */}

      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <span>EXECUTIVE PERFORMANCE</span>

            <h2>Business & Operational Overview</h2>
          </div>

          <div className="period-selector">
            <span>Current Period</span>

            <strong>September 2026</strong>
          </div>
        </div>

        <div className="executive-kpi-grid">
          {kpis.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.label}
                className={`executive-kpi-card ${item.className ?? ""}`}
              >
                <div className="kpi-card-top">
                  <div className="kpi-icon">
                    <Icon size={20} strokeWidth={2} />
                  </div>

                  <span className="kpi-label">{item.label}</span>
                </div>

                <div className="kpi-value">
                  {item.value}

                  {item.unit && <small>{item.unit}</small>}
                </div>

                <div className="kpi-footer">
                  <span>{item.description}</span>

                  <span className={`kpi-trend ${item.direction}`}>
                    {item.direction === "up" && <ArrowUpRight size={14} />}

                    {item.direction === "down" && <ArrowDownRight size={14} />}

                    {item.trend}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ===================================================
          PRODUCTION + PLANT STATUS
      =================================================== */}

      <section className="dashboard-main-grid">
        {/* ================================================
            PRODUCTION
        ================================================= */}

        <article className="dashboard-panel production-panel">
          <div className="panel-header">
            <div>
              <span className="panel-eyebrow">PRODUCTION INTELLIGENCE</span>

              <h2>Plant Performance</h2>

              <p>Production achievement across operating units.</p>
            </div>

            <Factory size={22} />
          </div>

          <div className="production-list">
            {productionData.map((item) => (
              <div key={item.name} className="production-row">
                <div className="production-row-header">
                  <strong>{item.name}</strong>

                  <span
                    className={`production-status ${item.status.toLowerCase()}`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="production-progress">
                  <div
                    className={`production-progress-bar ${item.status.toLowerCase()}`}
                    style={{
                      width: item.achievement,
                    }}
                  />
                </div>

                <div className="production-meta">
                  <span>
                    Actual <strong>{item.actual}</strong>
                  </span>

                  <span>
                    Target <strong>{item.target}</strong>
                  </span>

                  <strong>{item.achievement}</strong>
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* ================================================
            OPERATIONAL HEALTH
        ================================================= */}

        <article className="dashboard-panel health-panel">
          <div className="panel-header">
            <div>
              <span className="panel-eyebrow">OPERATIONAL HEALTH</span>

              <h2>System Overview</h2>

              <p>Current condition of critical operations.</p>
            </div>

            <Gauge size={22} />
          </div>

          <div className="health-list">
            <HealthRow label="Production" value="94.2%" status="GOOD" />

            <HealthRow label="Asset Availability" value="96.8%" status="GOOD" />

            <HealthRow label="Maintenance" value="93.1%" status="GOOD" />

            <HealthRow label="Energy" value="88.4%" status="WATCH" />

            <HealthRow label="Fleet" value="89.6%" status="WATCH" />
          </div>
        </article>
      </section>

      {/* ===================================================
          INTELLIGENCE
      ================================================= */}

      <section className="dashboard-section intelligence-section">
        <div className="section-heading">
          <div>
            <span>ABN INTELLIGENCE LAYER</span>

            <h2>Executive Insights</h2>

            <p>
              Signals, anomalies and improvement opportunities identified from
              operational data.
            </p>
          </div>

          <div className="intelligence-badge">
            <BrainCircuit size={17} />
            AI READY
          </div>
        </div>

        <div className="insight-grid">
          {intelligenceInsights.map((item, index) => {
            const Icon =
              item.type === "warning"
                ? AlertTriangle
                : item.type === "success"
                  ? TrendingUp
                  : BrainCircuit;

            return (
              <article
                key={`${item.title}-${index}`}
                className={`insight-card ${item.type}`}
              >
                <div className="insight-icon">
                  <Icon size={19} />
                </div>

                <div className="insight-content">
                  <span className="insight-type">
                    {item.type === "warning"
                      ? "ATTENTION"
                      : item.type === "success"
                        ? "POSITIVE"
                        : "INTELLIGENCE"}
                  </span>

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>

                  {item.action && (
                    <button type="button" className="insight-action">
                      {item.action}
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ===================================================
          CRITICAL OPERATIONS
      ================================================= */}

      <section className="dashboard-bottom-grid">
        {/* ================================================
            ASSET
        ================================================= */}

        <article className="dashboard-panel">
          <div className="panel-header">
            <div>
              <span className="panel-eyebrow">ASSET INTELLIGENCE</span>

              <h2>Critical Assets</h2>
            </div>

            <HardDrive size={21} />
          </div>

          <div className="asset-summary">
            <div className="asset-score">
              <strong>91.7%</strong>

              <span>Overall Asset Health</span>
            </div>

            <div className="asset-items">
              <AssetItem label="Kiln 4" value="94%" status="Healthy" />

              <AssetItem label="Kiln 5" value="86%" status="Monitor" />

              <AssetItem label="Finish Mill 4" value="93%" status="Healthy" />

              <AssetItem label="Finish Mill 5" value="89%" status="Monitor" />
            </div>
          </div>
        </article>

        {/* ================================================
            RISK
        ================================================= */}

        <article className="dashboard-panel">
          <div className="panel-header">
            <div>
              <span className="panel-eyebrow">RISK & ALERT</span>

              <h2>Operational Risk</h2>
            </div>

            <ShieldAlert size={21} />
          </div>

          <div className="risk-list">
            <RiskItem
              title="Tonasa 5 Production"
              description="Below production benchmark"
              level="HIGH"
            />

            <RiskItem
              title="Kiln Maintenance"
              description="Condition requires attention"
              level="MEDIUM"
            />

            <RiskItem
              title="Fleet Utilization"
              description="Availability below target"
              level="MEDIUM"
            />
          </div>
        </article>
      </section>

      {/* ===================================================
          FOOTER
      ================================================= */}

      <footer className="dashboard-footer">
        <div>
          <strong>ABN Industrial Intelligence</strong>

          <span>
            Connecting enterprise, operational and industrial data into
            actionable intelligence.
          </span>
        </div>

        <div className="footer-status">
          <span className="status-dot online" />
          SYSTEM ONLINE
        </div>
      </footer>
    </main>
  );
}

/* =========================================================
   HEALTH ROW
   ========================================================= */

function HealthRow({
  label,
  value,
  status,
}: {
  label: string;
  value: string;
  status: "GOOD" | "WATCH";
}) {
  return (
    <div className="health-row">
      <div className="health-label">
        <span className={`health-dot ${status.toLowerCase()}`} />

        <span>{label}</span>
      </div>

      <strong>{value}</strong>

      <span className={`health-status ${status.toLowerCase()}`}>{status}</span>
    </div>
  );
}

/* =========================================================
   ASSET ITEM
   ========================================================= */

function AssetItem({
  label,
  value,
  status,
}: {
  label: string;
  value: string;
  status: "Healthy" | "Monitor";
}) {
  return (
    <div className="asset-item">
      <div>
        <strong>{label}</strong>

        <span>{status}</span>
      </div>

      <strong>{value}</strong>
    </div>
  );
}

/* =========================================================
   RISK ITEM
   ========================================================= */

function RiskItem({
  title,
  description,
  level,
}: {
  title: string;
  description: string;
  level: "HIGH" | "MEDIUM";
}) {
  return (
    <div className="risk-item">
      <div className={`risk-icon ${level.toLowerCase()}`}>
        <AlertTriangle size={17} />
      </div>

      <div className="risk-content">
        <strong>{title}</strong>

        <span>{description}</span>
      </div>

      <span className={`risk-level ${level.toLowerCase()}`}>{level}</span>
    </div>
  );
}

export default Dashboard;
