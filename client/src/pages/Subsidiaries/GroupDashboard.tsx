import { useEffect } from "react";

import {
  Activity,
  AlertTriangle,
  BarChart3,
  Building2,
  CircleDollarSign,
  Factory,
  Gauge,
  HeartHandshake,
  Package,
  ShieldAlert,
  Ship,
  Truck,
  Users,
  Wifi,
  Wrench,
} from "lucide-react";

import "./GroupDashboard.css";

import type { AppDispatch } from "../../stores/store";
import { useDispatch } from "react-redux";

/* =========================================================
   TONASA GROUP
   EXECUTIVE CONTROL TOWER
   ========================================================= */

/* =========================================================
   TYPES
   ========================================================= */

type EntityStatus = "OPERATIONAL" | "WARNING" | "OFFLINE" | "NOT_CONNECTED";

type RiskLevel = "CRITICAL" | "WARNING" | "NORMAL";

type GroupEntity = {
  code: string;
  name: string;
  category: string;
  status: EntityStatus;
  performance: number | null;
  icon: typeof Building2;
};

type RiskItem = {
  title: string;
  entity: string;
  level: RiskLevel;
  description: string;
};

/* =========================================================
   GROUP DASHBOARD
   ========================================================= */

function GroupDashboard() {
  const dispatch = useDispatch<AppDispatch>();

  /* =======================================================
     INITIALIZATION
     ======================================================= */

  useEffect(() => {
    /*
     * Group data belum mempunyai Redux slice khusus.
     *
     * Nantinya dapat diganti dengan:
     *
     * dispatch(fetchGroupSummary());
     * dispatch(fetchGroupPerformance());
     * dispatch(fetchGroupFinancial());
     * dispatch(fetchGroupRisk());
     *
     * Data dapat berasal dari:
     * SAP
     * TONASA EMS
     * Subsidiary API
     * Finance
     * HR
     * Fleet
     * Port
     * IoT / MQTT
     */

    void dispatch;
  }, [dispatch]);

  /* =======================================================
     GROUP SUMMARY
     *
     * Jangan menggunakan fake numbers.
     *
     * null = data belum terkoneksi.
     * ======================================================= */

  const groupSummary = {
    revenue: null as number | null,
    performance: null as number | null,
    operations: null as number | null,
    employees: null as number | null,
    assets: null as number | null,
    alerts: null as number | null,
  };

  /* =======================================================
     GROUP ENTITIES
     * ======================================================= */

  const entities: GroupEntity[] = [
    {
      code: "BR",
      name: "Biringkassi Raya",
      category: "Operations & Services",
      status: "NOT_CONNECTED",
      performance: null,
      icon: Truck,
    },
    {
      code: "TL",
      name: "Tonasa Lines",
      category: "Marine Logistics",
      status: "NOT_CONNECTED",
      performance: null,
      icon: Ship,
    },
    {
      code: "PBI",
      name: "Pelabuhan Biringkassi Indonesia",
      category: "Port & Terminal",
      status: "NOT_CONNECTED",
      performance: null,
      icon: Factory,
    },
    {
      code: "SMM",
      name: "Sedaya Multi Matra",
      category: "Services & Trading",
      status: "NOT_CONNECTED",
      performance: null,
      icon: Building2,
    },
    {
      code: "YKST",
      name: "Yayasan Kesejahteraan Semen Tonasa",
      category: "Foundation & Social Services",
      status: "NOT_CONNECTED",
      performance: null,
      icon: HeartHandshake,
    },
    {
      code: "KOPKAR",
      name: "Koperasi Karyawan Semen Tonasa",
      category: "Cooperative & Trading",
      status: "NOT_CONNECTED",
      performance: null,
      icon: Users,
    },
  ];

  /* =======================================================
     GROUP OPERATIONS
     * ======================================================= */

  const groupOperations = [
    {
      label: "Industrial Operations",
      value: null,
      icon: Factory,
    },
    {
      label: "Fleet Operations",
      value: null,
      icon: Truck,
    },
    {
      label: "Marine Operations",
      value: null,
      icon: Ship,
    },
    {
      label: "Port Operations",
      value: null,
      icon: Package,
    },
    {
      label: "Maintenance",
      value: null,
      icon: Wrench,
    },
    {
      label: "Workforce",
      value: null,
      icon: Users,
    },
  ];

  /* =======================================================
     FINANCIAL OVERVIEW
     * ======================================================= */

  const financialOverview = [
    {
      label: "Group Revenue",
      value: null,
      icon: CircleDollarSign,
    },
    {
      label: "Operating Cost",
      value: null,
      icon: CircleDollarSign,
    },
    {
      label: "EBITDA",
      value: null,
      icon: BarChart3,
    },
    {
      label: "Cash Flow",
      value: null,
      icon: Activity,
    },
    {
      label: "Budget Utilization",
      value: null,
      icon: Gauge,
    },
  ];

  /* =======================================================
     GROUP RISK
     * ======================================================= */

  const risks: RiskItem[] = [
    {
      title: "Risk monitoring not connected",
      entity: "TONASA GROUP",
      level: "WARNING",
      description:
        "Group risk data will appear after Risk / SAP / EMS integration.",
    },
    {
      title: "Financial intelligence not connected",
      entity: "GROUP FINANCE",
      level: "WARNING",
      description: "Financial KPI requires consolidated finance data.",
    },
    {
      title: "Operational intelligence not connected",
      entity: "GROUP OPERATIONS",
      level: "WARNING",
      description: "Operational KPI requires subsidiary and operational data.",
    },
  ];

  /* =======================================================
     HELPERS
     * ======================================================= */

  const formatValue = (value: number | null) => {
    if (value === null || value === undefined) {
      return "—";
    }

    return value.toLocaleString("id-ID");
  };

  const getEntityStatusLabel = (status: EntityStatus) => {
    switch (status) {
      case "OPERATIONAL":
        return "OPERATIONAL";

      case "WARNING":
        return "WARNING";

      case "OFFLINE":
        return "OFFLINE";

      default:
        return "NOT CONNECTED";
    }
  };

  const getRiskClass = (level: RiskLevel) => {
    return level.toLowerCase();
  };

  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <main className="group-dashboard-page">
      {/* =================================================
          HEADER
      ================================================== */}

      <header className="group-dashboard-header">
        <div>
          <span className="group-dashboard-eyebrow">
            TONASA GROUP • EXECUTIVE MANAGEMENT
          </span>

          <h1>Group Dashboard</h1>

          <p>
            Consolidated group performance, operations, finance and
            intelligence.
          </p>
        </div>

        <div className="group-server-status">
          <span className="group-status-dot online" />

          <div>
            <strong>INTELLIGENCE LAYER ONLINE</strong>

            <small>ABN TONASA EMS</small>
          </div>
        </div>
      </header>

      {/* =================================================
          GROUP IDENTITY
      ================================================== */}

      <section className="group-company-bar">
        <div className="group-company-icon">
          <Building2 size={22} />
        </div>

        <div className="group-company-info">
          <strong>PT Semen Tonasa • Group Intelligence</strong>

          <span>
            Executive Control Tower • Consolidated Business & Operational
            Intelligence
          </span>
        </div>

        <div className="group-company-status">
          <span className="group-status-dot online" />
          ONLINE
        </div>
      </section>

      {/* =================================================
          EXECUTIVE KPI
      ================================================== */}

      <section className="group-summary">
        {/* REVENUE */}

        <article className="group-summary-card financial">
          <div className="group-summary-icon">
            <CircleDollarSign size={22} />
          </div>

          <div className="group-summary-content">
            <span>Group Revenue</span>

            <strong>
              {groupSummary.revenue === null
                ? "—"
                : `Rp ${formatValue(groupSummary.revenue)}`}
            </strong>

            <small>Consolidated financial data</small>
          </div>
        </article>

        {/* PERFORMANCE */}

        <article className="group-summary-card performance">
          <div className="group-summary-icon">
            <BarChart3 size={22} />
          </div>

          <div className="group-summary-content">
            <span>Group Performance</span>

            <strong>
              {groupSummary.performance === null
                ? "—"
                : `${groupSummary.performance}%`}
            </strong>

            <small>Enterprise KPI</small>
          </div>
        </article>

        {/* OPERATIONS */}

        <article className="group-summary-card operations">
          <div className="group-summary-icon">
            <Activity size={22} />
          </div>

          <div className="group-summary-content">
            <span>Group Operations</span>

            <strong>
              {groupSummary.operations === null
                ? "—"
                : `${groupSummary.operations}%`}
            </strong>

            <small>Operational readiness</small>
          </div>
        </article>

        {/* EMPLOYEES */}

        <article className="group-summary-card workforce">
          <div className="group-summary-icon">
            <Users size={22} />
          </div>

          <div className="group-summary-content">
            <span>Employees</span>

            <strong>{formatValue(groupSummary.employees)}</strong>

            <small>Group workforce</small>
          </div>
        </article>

        {/* ASSETS */}

        <article className="group-summary-card assets">
          <div className="group-summary-icon">
            <Building2 size={22} />
          </div>

          <div className="group-summary-content">
            <span>Group Assets</span>

            <strong>{formatValue(groupSummary.assets)}</strong>

            <small>Consolidated assets</small>
          </div>
        </article>

        {/* ALERTS */}

        <article className="group-summary-card alerts">
          <div className="group-summary-icon">
            <AlertTriangle size={22} />
          </div>

          <div className="group-summary-content">
            <span>Group Alerts</span>

            <strong>{formatValue(groupSummary.alerts)}</strong>

            <small>Risk & operational alerts</small>
          </div>
        </article>
      </section>

      {/* =================================================
          ENTITY PERFORMANCE
      ================================================== */}

      <section className="group-panel entity-panel">
        <div className="group-panel-header">
          <div>
            <h2>Entity Performance</h2>

            <p>Consolidated performance across TONASA Group entities</p>
          </div>

          <span className="group-data-badge">GROUP VIEW</span>
        </div>

        <div className="entity-grid">
          {entities.map((entity) => {
            const EntityIcon = entity.icon;

            return (
              <article className="entity-card" key={entity.code}>
                <div className="entity-card-top">
                  <div className="entity-icon">
                    <EntityIcon size={19} />
                  </div>

                  <span
                    className={`entity-status ${entity.status.toLowerCase()}`}
                  >
                    <span className="status-dot" />

                    {getEntityStatusLabel(entity.status)}
                  </span>
                </div>

                <div className="entity-card-info">
                  <span className="entity-code">{entity.code}</span>

                  <h3>{entity.name}</h3>

                  <p>{entity.category}</p>
                </div>

                <div className="entity-performance">
                  <div className="entity-performance-header">
                    <span>Performance</span>

                    <strong>
                      {entity.performance === null
                        ? "—"
                        : `${entity.performance}%`}
                    </strong>
                  </div>

                  <div className="entity-progress">
                    <span
                      style={{
                        width: `${
                          entity.performance === null ? 0 : entity.performance
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* =================================================
          MAIN GROUP OPERATIONS
      ================================================== */}

      <section className="group-dashboard-grid">
        {/* GROUP OPERATIONS */}

        <article className="group-panel operations-panel">
          <div className="group-panel-header">
            <div>
              <h2>Group Operations</h2>

              <p>Operational command overview</p>
            </div>

            <div className="group-live-indicator">
              <span className="group-status-dot online" />
              LIVE
            </div>
          </div>

          <div className="operations-grid">
            {groupOperations.map((operation) => {
              const OperationIcon = operation.icon;

              return (
                <div className="operation-card" key={operation.label}>
                  <div className="operation-icon">
                    <OperationIcon size={18} />
                  </div>

                  <div className="operation-content">
                    <span>{operation.label}</span>

                    <strong>
                      {operation.value === null
                        ? "NOT CONNECTED"
                        : `${operation.value}%`}
                    </strong>
                  </div>
                </div>
              );
            })}
          </div>
        </article>

        {/* GROUP STATUS */}

        <article className="group-panel status-panel">
          <div className="group-panel-header">
            <div>
              <h2>Group System Status</h2>

              <p>Enterprise intelligence connectivity</p>
            </div>
          </div>

          <div className="system-status-list">
            <div className="system-status-row">
              <span>
                <span className="status-dot online" />
                ABN EMS
              </span>

              <strong className="connected">ONLINE</strong>
            </div>

            <div className="system-status-row">
              <span>
                <span className="status-dot offline" />
                SAP
              </span>

              <strong className="not-connected">NOT CONNECTED</strong>
            </div>

            <div className="system-status-row">
              <span>
                <span className="status-dot offline" />
                Finance
              </span>

              <strong className="not-connected">NOT CONNECTED</strong>
            </div>

            <div className="system-status-row">
              <span>
                <span className="status-dot offline" />
                IoT / MQTT
              </span>

              <strong className="not-connected">NOT CONNECTED</strong>
            </div>

            <div className="system-status-row">
              <span>
                <span className="status-dot offline" />
                Subsidiary APIs
              </span>

              <strong className="not-connected">NOT CONNECTED</strong>
            </div>
          </div>
        </article>
      </section>

      {/* =================================================
          FINANCIAL OVERVIEW
      ================================================== */}

      <section className="group-panel financial-panel">
        <div className="group-panel-header">
          <div>
            <h2>Group Financial Overview</h2>

            <p>Consolidated financial intelligence and management control</p>
          </div>

          <span className="group-data-badge">SAP / FINANCE</span>
        </div>

        <div className="financial-grid">
          {financialOverview.map((item) => {
            const FinancialIcon = item.icon;

            return (
              <article className="financial-card" key={item.label}>
                <div className="financial-card-icon">
                  <FinancialIcon size={19} />
                </div>

                <div>
                  <span>{item.label}</span>

                  <strong>
                    {item.value === null
                      ? "NOT CONNECTED"
                      : `Rp ${formatValue(item.value)}`}
                  </strong>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* =================================================
          RISK & ALERTS
      ================================================== */}

      <section className="group-panel risk-panel">
        <div className="group-panel-header">
          <div>
            <h2>Group Risk & Alerts</h2>

            <p>Executive risk monitoring</p>
          </div>

          <div className="risk-header-status">
            <ShieldAlert size={17} />
            MONITORING
          </div>
        </div>

        <div className="risk-list">
          {risks.map((risk, index) => (
            <article
              className={`risk-row ${getRiskClass(risk.level)}`}
              key={`${risk.entity}-${index}`}
            >
              <div className="risk-icon">
                <AlertTriangle size={18} />
              </div>

              <div className="risk-content">
                <div className="risk-title">
                  <strong>{risk.title}</strong>

                  <span className={`risk-level ${risk.level.toLowerCase()}`}>
                    {risk.level}
                  </span>
                </div>

                <span className="risk-entity">{risk.entity}</span>

                <p>{risk.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =================================================
          GROUP CAPABILITY
      ================================================== */}

      <section className="group-capability-grid">
        <article className="capability-card">
          <div className="capability-icon">
            <Factory size={20} />
          </div>

          <div>
            <h3>Industrial Intelligence</h3>

            <p>
              Production, operational efficiency, maintenance and industrial KPI
              intelligence.
            </p>
          </div>
        </article>

        <article className="capability-card">
          <div className="capability-icon">
            <Truck size={20} />
          </div>

          <div>
            <h3>Fleet Intelligence</h3>

            <p>
              Fleet, GPS, fuel, utilization, safety and logistics intelligence.
            </p>
          </div>
        </article>

        <article className="capability-card">
          <div className="capability-icon">
            <Ship size={20} />
          </div>

          <div>
            <h3>Marine & Port Intelligence</h3>

            <p>
              Vessel, voyage, cargo, terminal and port operational intelligence.
            </p>
          </div>
        </article>

        <article className="capability-card">
          <div className="capability-icon">
            <Users size={20} />
          </div>

          <div>
            <h3>Workforce Intelligence</h3>

            <p>
              Workforce, manpower, productivity and organizational performance
              intelligence.
            </p>
          </div>
        </article>
      </section>

      {/* =================================================
          INTELLIGENCE FOOTER
      ================================================== */}

      <footer className="group-intelligence-footer">
        <div className="group-intelligence-icon">
          <Wifi size={19} />
        </div>

        <div>
          <strong>TONASA GROUP EXECUTIVE INTELLIGENCE</strong>

          <p>
            ABN Intelligence Layer — SAP • EMS • IoT • GPS • Operations •
            Finance • HR • Subsidiaries
          </p>
        </div>

        <span className="group-intelligence-status">READY</span>
      </footer>
    </main>
  );
}

export default GroupDashboard;
