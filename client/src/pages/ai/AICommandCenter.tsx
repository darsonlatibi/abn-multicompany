import { useState } from "react";
import type { ElementType } from "react";

import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  Boxes,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Database,
  FileBarChart,
  Gauge,
  LineChart,
  MessageSquareText,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Truck,
  Users,
  Wrench,
} from "lucide-react";

import "./AICommandCenter.css";

/* =========================================================
 * TYPES
 * ========================================================= */

type AIStatus = "healthy" | "warning" | "critical";

interface AIModule {
  name: string;
  description: string;
  path: string;
  icon: ElementType;
  score: number;
  status: AIStatus;
  finding: string;
  trend: string;
  trendUp: boolean;
}

interface Finding {
  title: string;
  module: string;
  severity: "critical" | "warning" | "info";
  confidence: number;
  description: string;
}

interface ActionItem {
  title: string;
  module: string;
  priority: "High" | "Medium" | "Low";
  impact: string;
}

/* =========================================================
 * AI MODULES
 * ========================================================= */

const aiModules: AIModule[] = [
  {
    name: "Operations",
    description: "Operational performance intelligence",
    path: "/ai/operations",
    icon: Activity,
    score: 92,
    status: "healthy",
    finding: "Operational efficiency stable",
    trend: "+4.2%",
    trendUp: true,
  },
  {
    name: "Fleet",
    description: "Fleet utilization & efficiency",
    path: "/ai/fleet",
    icon: Truck,
    score: 87,
    status: "warning",
    finding: "Fuel efficiency declining",
    trend: "-3.4%",
    trendUp: false,
  },
  {
    name: "SCADA",
    description: "Industrial process intelligence",
    path: "/ai/scada",
    icon: Gauge,
    score: 96,
    status: "healthy",
    finding: "System availability excellent",
    trend: "+1.8%",
    trendUp: true,
  },
  {
    name: "Maintenance",
    description: "Predictive maintenance intelligence",
    path: "/ai/maintenance",
    icon: Wrench,
    score: 84,
    status: "warning",
    finding: "Maintenance risk detected",
    trend: "-2.1%",
    trendUp: false,
  },
  {
    name: "Supply Chain",
    description: "Procurement & inventory intelligence",
    path: "/ai/supply-chain",
    icon: Boxes,
    score: 89,
    status: "healthy",
    finding: "Inventory optimization opportunity",
    trend: "+2.7%",
    trendUp: true,
  },
  {
    name: "Finance",
    description: "Financial performance intelligence",
    path: "/ai/finance",
    icon: CircleDollarSign,
    score: 86,
    status: "warning",
    finding: "Receivable risk requires attention",
    trend: "-1.9%",
    trendUp: false,
  },
  {
    name: "Workforce",
    description: "Workforce performance intelligence",
    path: "/ai/workforce",
    icon: Users,
    score: 91,
    status: "healthy",
    finding: "Workforce availability healthy",
    trend: "+3.1%",
    trendUp: true,
  },
  {
    name: "Reports",
    description: "Cross-module business intelligence",
    path: "/ai/reports",
    icon: FileBarChart,
    score: 94,
    status: "healthy",
    finding: "Cross-module insight available",
    trend: "+5.8%",
    trendUp: true,
  },
];

/* =========================================================
 * FINDINGS
 * ========================================================= */

const findings: Finding[] = [
  {
    title: "Operating Cost Increasing",
    module: "Finance + Operations",
    severity: "critical",
    confidence: 97,
    description:
      "Operating cost menunjukkan kenaikan yang berpotensi menekan margin.",
  },
  {
    title: "Fleet Efficiency Declining",
    module: "Fleet",
    severity: "warning",
    confidence: 94,
    description:
      "Beberapa kendaraan menunjukkan konsumsi BBM di atas baseline.",
  },
  {
    title: "Maintenance Risk Detected",
    module: "Maintenance + Fleet",
    severity: "warning",
    confidence: 92,
    description:
      "Terdapat unit dengan kombinasi indikator yang mengarah ke maintenance risk.",
  },
  {
    title: "Inventory Slow Moving",
    module: "Supply Chain",
    severity: "info",
    confidence: 91,
    description:
      "Sebagian inventory memiliki turnover lebih rendah dari baseline.",
  },
];

/* =========================================================
 * ACTIONS
 * ========================================================= */

const actionItems: ActionItem[] = [
  {
    title: "Review high-cost vehicles",
    module: "Fleet",
    priority: "High",
    impact: "Potential fuel saving",
  },
  {
    title: "Prioritize preventive maintenance",
    module: "Maintenance",
    priority: "High",
    impact: "Reduce downtime risk",
  },
  {
    title: "Review overdue receivables",
    module: "Finance",
    priority: "Medium",
    impact: "Improve cashflow",
  },
  {
    title: "Optimize slow-moving stock",
    module: "Supply Chain",
    priority: "Medium",
    impact: "Reduce inventory holding",
  },
];

/* =========================================================
 * COMPONENT
 * ========================================================= */

export default function AICommandCenter() {
  const [timeRange, setTimeRange] = useState("Today");
  const [refreshing, setRefreshing] = useState(false);

  /* =======================================================
   * REFRESH
   * ======================================================= */

  const handleRefresh = () => {
    if (refreshing) return;

    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 900);
  };

  /* =======================================================
   * SUMMARY
   * ======================================================= */

  const criticalCount = findings.filter(
    (item) => item.severity === "critical",
  ).length;

  const warningCount = findings.filter(
    (item) => item.severity === "warning",
  ).length;

  /* =======================================================
   * RENDER
   * ======================================================= */

  return (
    <div className="ai-command-page">
      {/* =====================================================
       * HEADER
       * ===================================================== */}

      <header className="ai-command-header">
        <div className="ai-command-title">
          <div className="ai-command-logo">
            <BrainCircuit size={26} />
          </div>

          <div>
            <div className="ai-command-eyebrow">
              ABN INDUSTRIAL INTELLIGENCE
            </div>

            <h1>AI Command Center</h1>

            <p>Central intelligence layer for ABN EMS</p>
          </div>
        </div>

        <div className="ai-command-actions">
          <div className="ai-command-time">
            <Clock3 size={15} />
            <span>Live Context</span>
          </div>

          <select
            value={timeRange}
            onChange={(event) => setTimeRange(event.target.value)}
            className="ai-command-select"
          >
            <option>Today</option>
            <option>7 Days</option>
            <option>30 Days</option>
          </select>

          <button
            type="button"
            className="ai-command-refresh"
            onClick={handleRefresh}
            title="Refresh AI context"
          >
            <RefreshCw size={16} className={refreshing ? "ai-spin" : ""} />
          </button>
        </div>
      </header>

      {/* =====================================================
       * ENGINE STATUS
       * ===================================================== */}

      <section className="ai-engine-status">
        <div className="ai-engine-main">
          <div className="ai-engine-icon">
            <BrainCircuit size={21} />
          </div>

          <div>
            <strong>Industrial Intelligence Engine</strong>

            <span>Cross-module reasoning engine is active</span>
          </div>
        </div>

        <div className="ai-engine-items">
          <div>
            <span className="ai-status-dot" />
            AI Engine Online
          </div>

          <div>
            <Database size={14} />
            EMS Data Connected
          </div>

          <div>
            <LineChart size={14} />
            Realtime Analysis
          </div>

          <div>
            <ShieldCheck size={14} />
            Permission Guard
          </div>
        </div>
      </section>

      {/* =====================================================
       * KPI CARDS
       * ===================================================== */}

      <section className="ai-command-kpis">
        <div className="ai-command-kpi">
          <div className="ai-kpi-top">
            <span>Business Health</span>
            <Gauge size={17} />
          </div>

          <div className="ai-kpi-value">
            91<span>/100</span>
          </div>

          <div className="ai-kpi-bottom positive">
            <TrendingUp size={13} />
            +3.8% vs previous period
          </div>
        </div>

        <div className="ai-command-kpi">
          <div className="ai-kpi-top">
            <span>AI Findings</span>
            <Search size={17} />
          </div>

          <div className="ai-kpi-value">126</div>

          <div className="ai-kpi-bottom positive">
            <TrendingUp size={13} />
            +18.4% detected
          </div>
        </div>

        <div className="ai-command-kpi">
          <div className="ai-kpi-top">
            <span>Critical Risks</span>
            <AlertTriangle size={17} />
          </div>

          <div className="ai-kpi-value">{criticalCount}</div>

          <div className="ai-kpi-bottom negative">
            <TrendingDown size={13} />
            Immediate attention
          </div>
        </div>

        <div className="ai-command-kpi">
          <div className="ai-kpi-top">
            <span>Warnings</span>
            <Activity size={17} />
          </div>

          <div className="ai-kpi-value">{warningCount}</div>

          <div className="ai-kpi-bottom neutral">Monitoring required</div>
        </div>

        <div className="ai-command-kpi">
          <div className="ai-kpi-top">
            <span>AI Confidence</span>
            <Sparkles size={17} />
          </div>

          <div className="ai-kpi-value">
            93.4<span>%</span>
          </div>

          <div className="ai-kpi-bottom positive">
            <TrendingUp size={13} />
            High confidence
          </div>
        </div>
      </section>

      {/* =====================================================
       * MAIN GRID
       * ===================================================== */}

      <div className="ai-command-main-grid">
        {/* ===================================================
         * MODULE INTELLIGENCE
         * =================================================== */}

        <section className="ai-command-card ai-modules-card">
          <div className="ai-card-header">
            <div>
              <span className="ai-card-eyebrow">INTELLIGENCE MAP</span>

              <h2>AI Module Intelligence</h2>

              <p>Kondisi intelligence setiap domain ABN EMS.</p>
            </div>

            <BrainCircuit size={20} />
          </div>

          <div className="ai-module-grid">
            {aiModules.map((module) => {
              const Icon = module.icon;

              return (
                <a
                  key={module.name}
                  href={module.path}
                  className="ai-module-card"
                >
                  <div className="ai-module-top">
                    <div className="ai-module-icon">
                      <Icon size={18} />
                    </div>

                    <div className={`ai-module-status ${module.status}`}>
                      <span />
                      {module.status === "healthy"
                        ? "Healthy"
                        : module.status === "warning"
                          ? "Warning"
                          : "Critical"}
                    </div>
                  </div>

                  <div className="ai-module-name">{module.name}</div>

                  <div className="ai-module-description">
                    {module.description}
                  </div>

                  <div className="ai-module-score">
                    <div>
                      <strong>{module.score}</strong>

                      <span>/100</span>
                    </div>

                    <div className="ai-score-bar">
                      <span
                        style={{
                          width: `${module.score}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="ai-module-finding">{module.finding}</div>

                  <div className="ai-module-footer">
                    <span
                      className={module.trendUp ? "trend-up" : "trend-down"}
                    >
                      {module.trendUp ? (
                        <TrendingUp size={12} />
                      ) : (
                        <TrendingDown size={12} />
                      )}

                      {module.trend}
                    </span>

                    <ChevronRight size={14} />
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* ===================================================
         * RIGHT COLUMN
         * =================================================== */}

        <aside className="ai-command-right">
          {/* BUSINESS HEALTH */}

          <section className="ai-command-card">
            <div className="ai-card-header compact">
              <div>
                <span className="ai-card-eyebrow">EXECUTIVE SIGNAL</span>

                <h2>Business Health</h2>
              </div>

              <BarChart3 size={18} />
            </div>

            <div className="ai-health-center">
              <div className="ai-health-ring">
                <strong>91</strong>

                <span>HEALTH</span>
              </div>

              <div className="ai-health-summary">
                <strong>Stable</strong>

                <span>Overall business condition</span>

                <small>
                  <TrendingUp size={12} />
                  Positive operational trend
                </small>
              </div>
            </div>

            <div className="ai-health-bars">
              <div>
                <span>Operations</span>
                <strong>92%</strong>
              </div>

              <div className="ai-health-bar">
                <span style={{ width: "92%" }} />
              </div>

              <div>
                <span>Financial</span>
                <strong>86%</strong>
              </div>

              <div className="ai-health-bar">
                <span style={{ width: "86%" }} />
              </div>

              <div>
                <span>Asset</span>
                <strong>89%</strong>
              </div>

              <div className="ai-health-bar">
                <span style={{ width: "89%" }} />
              </div>
            </div>
          </section>

          {/* COPILOT */}

          <section className="ai-command-card ai-copilot-launch">
            <div className="ai-copilot-launch-icon">
              <MessageSquareText size={21} />
            </div>

            <div>
              <span className="ai-card-eyebrow">INTELLIGENCE ASSISTANT</span>

              <h2>AI Copilot</h2>

              <p>
                Tanyakan kondisi bisnis dan biarkan AI melakukan cross-module
                reasoning.
              </p>

              <a href="/ai/copilot">
                Open AI Copilot
                <ArrowUpRight size={14} />
              </a>
            </div>
          </section>

          {/* QUICK ACTION */}

          <section className="ai-command-card">
            <div className="ai-card-header compact">
              <div>
                <span className="ai-card-eyebrow">AI PRIORITY</span>

                <h2>Recommended Actions</h2>
              </div>

              <CheckCircle2 size={18} />
            </div>

            <div className="ai-action-list">
              {actionItems.map((action, index) => (
                <div className="ai-action-item" key={index}>
                  <div className="ai-action-number">{index + 1}</div>

                  <div className="ai-action-content">
                    <strong>{action.title}</strong>

                    <span>
                      {action.module} · {action.impact}
                    </span>
                  </div>

                  <div
                    className={`ai-action-priority ${action.priority.toLowerCase()}`}
                  >
                    {action.priority}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>

      {/* =====================================================
       * FINDINGS
       * ===================================================== */}

      <section className="ai-command-card ai-findings-card">
        <div className="ai-card-header">
          <div>
            <span className="ai-card-eyebrow">AI DETECTION ENGINE</span>

            <h2>Cross-Module Intelligence Findings</h2>

            <p>
              Finding yang terdeteksi dari hubungan data antar modul ABN EMS.
            </p>
          </div>

          <Search size={20} />
        </div>

        <div className="ai-findings-grid">
          {findings.map((finding, index) => (
            <div key={index} className={`ai-finding-card ${finding.severity}`}>
              <div className="ai-finding-top">
                <div className="ai-finding-severity">
                  {finding.severity === "critical" ? (
                    <AlertTriangle size={15} />
                  ) : finding.severity === "warning" ? (
                    <TrendingDown size={15} />
                  ) : (
                    <CheckCircle2 size={15} />
                  )}
                </div>

                <span>{finding.severity}</span>
              </div>

              <h3>{finding.title}</h3>

              <div className="ai-finding-module">{finding.module}</div>

              <p>{finding.description}</p>

              <div className="ai-finding-footer">
                <div>
                  Confidence
                  <strong>{finding.confidence}%</strong>
                </div>

                <button type="button" title="Analyze finding">
                  Analyze
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
       * REASONING CHAIN
       * ===================================================== */}

      <section className="ai-command-card ai-reasoning-card">
        <div className="ai-card-header">
          <div>
            <span className="ai-card-eyebrow">CROSS-MODULE REASONING</span>

            <h2>AI Cause & Effect Chain</h2>

            <p>Contoh bagaimana AI menghubungkan data dari beberapa domain.</p>
          </div>

          <LineChart size={20} />
        </div>

        <div className="ai-reasoning-chain">
          <div className="ai-reasoning-node">
            <span>01</span>
            <strong>Operating Cost</strong>
            <small>+14.8%</small>
          </div>

          <ChevronRight />

          <div className="ai-reasoning-node">
            <span>02</span>
            <strong>Fleet Fuel</strong>
            <small>+8.7%</small>
          </div>

          <ChevronRight />

          <div className="ai-reasoning-node">
            <span>03</span>
            <strong>Maintenance</strong>
            <small>+11.4%</small>
          </div>

          <ChevronRight />

          <div className="ai-reasoning-node">
            <span>04</span>
            <strong>Workforce</strong>
            <small>Overtime +16.7%</small>
          </div>

          <ChevronRight />

          <div className="ai-reasoning-result">
            <Sparkles size={16} />
            <strong>Margin Pressure</strong>
          </div>
        </div>
      </section>

      {/* =====================================================
       * FOOTER
       * ===================================================== */}

      <footer className="ai-command-footer">
        <div>
          <BrainCircuit size={15} />

          <strong>ABN Industrial Intelligence Engine</strong>

          <span>Command Center</span>
        </div>

        <div>
          <ShieldCheck size={14} />

          <span>AI recommendations require human approval</span>
        </div>
      </footer>
    </div>
  );
}
