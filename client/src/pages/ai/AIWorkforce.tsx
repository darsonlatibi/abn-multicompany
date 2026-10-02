import { useState } from "react";
import type { ElementType } from "react";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Gauge,
  LineChart,
  MessageSquareText,
  RefreshCw,
  Search,
  Send,
  Sparkles,
  TrendingDown,
  TrendingUp,
  UserCheck,
  Users,
  UserX,
  Zap,
} from "lucide-react";

import "./AIWorkforce.css";

/* =========================================================
 * TYPES
 * ========================================================= */

interface WorkforceKPI {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: ElementType;
  description: string;
}

interface WorkforceRisk {
  title: string;
  category: string;
  severity: "critical" | "high" | "medium" | "low";
  value: string;
  impact: string;
  description: string;
}

interface WorkforceInsight {
  title: string;
  severity: "critical" | "warning" | "info";
  confidence: number;
  description: string;
  action: string;
}

/* =========================================================
 * KPI DATA
 * ========================================================= */

const workforceKPIs: WorkforceKPI[] = [
  {
    label: "Workforce Availability",
    value: "94.8%",
    change: "+2.6%",
    trend: "up",
    icon: UserCheck,
    description: "Ketersediaan tenaga kerja",
  },
  {
    label: "Productivity Index",
    value: "88.4",
    change: "+4.2%",
    trend: "up",
    icon: Gauge,
    description: "Indeks produktivitas workforce",
  },
  {
    label: "Absenteeism Risk",
    value: "12/100",
    change: "-3.8",
    trend: "down",
    icon: UserX,
    description: "Risiko ketidakhadiran",
  },
  {
    label: "Overtime Load",
    value: "16.7%",
    change: "+5.1%",
    trend: "up",
    icon: Clock3,
    description: "Beban lembur workforce",
  },
];

/* =========================================================
 * RISK DATA
 * ========================================================= */

const workforceRisks: WorkforceRisk[] = [
  {
    title: "Overtime Concentration",
    category: "Workload",
    severity: "critical",
    value: "23 employees",
    impact: "High",
    description:
      "AI mendeteksi konsentrasi jam lembur tinggi pada kelompok employee tertentu.",
  },
  {
    title: "Attendance Anomaly",
    category: "Attendance",
    severity: "high",
    value: "8.4%",
    impact: "Medium",
    description:
      "Pola absensi beberapa unit menunjukkan deviasi dari baseline historis.",
  },
  {
    title: "Productivity Gap",
    category: "Performance",
    severity: "medium",
    value: "-11.2%",
    impact: "Medium",
    description:
      "Produktivitas aktual beberapa department berada di bawah target operasional.",
  },
  {
    title: "Skill Coverage",
    category: "Competency",
    severity: "low",
    value: "91.6%",
    impact: "Low",
    description:
      "Coverage skill cukup baik tetapi terdapat gap pada beberapa kompetensi kritis.",
  },
];

/* =========================================================
 * AI INSIGHTS
 * ========================================================= */

const workforceInsights: WorkforceInsight[] = [
  {
    title: "Workload Imbalance Detected",
    severity: "critical",
    confidence: 96,
    description:
      "AI menemukan distribusi workload yang tidak merata. Sebagian employee memiliki overtime tinggi sementara kapasitas unit lain masih tersedia.",
    action: "Redistribute workload",
  },
  {
    title: "Attendance Pattern Anomaly",
    severity: "warning",
    confidence: 93,
    description:
      "Terdapat perubahan pola absensi pada kelompok employee tertentu dibandingkan baseline 90 hari.",
    action: "Investigate attendance",
  },
  {
    title: "Productivity Improvement Opportunity",
    severity: "warning",
    confidence: 89,
    description:
      "Beberapa department berpotensi meningkatkan produktivitas melalui penyesuaian shift dan workload allocation.",
    action: "Optimize workforce",
  },
  {
    title: "Critical Skill Coverage",
    severity: "info",
    confidence: 87,
    description:
      "AI menemukan beberapa skill kritis yang hanya dimiliki oleh sedikit employee.",
    action: "Build skill redundancy",
  },
];

/* =========================================================
 * COMPONENT
 * ========================================================= */

export default function AIWorkforce() {
  const [question, setQuestion] = useState("");
  const [lastQuestion, setLastQuestion] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const suggestedQuestions = [
    "Kenapa overtime workforce meningkat?",
    "Department mana yang paling produktif?",
    "Siapa yang berisiko burnout?",
    "Cari pola absensi abnormal",
    "Di mana terjadi workload imbalance?",
    "Skill apa yang paling kritis?",
  ];

  const askAI = (text: string) => {
    const trimmed = text.trim();

    if (!trimmed) return;

    setLastQuestion(trimmed);
    setQuestion("");
    setIsThinking(true);

    /*
     * Future API:
     *
     * POST /api/ai/workforce/analyze
     *
     * {
     *   question: trimmed
     * }
     */

    window.setTimeout(() => {
      setIsThinking(false);
    }, 900);
  };

  return (
    <div className="ai-workforce-page">
      {/* =====================================================
       * HEADER
       * ===================================================== */}

      <div className="ai-workforce-header">
        <div>
          <div className="ai-workforce-eyebrow">
            <BrainCircuit size={16} />
            ABN INDUSTRIAL INTELLIGENCE
          </div>

          <h1>
            AI Workforce <span>Intelligence</span>
          </h1>

          <p>
            AI-powered workforce analytics untuk memahami produktivitas,
            workload, attendance, competency, dan workforce risk.
          </p>
        </div>

        <button
          className="ai-workforce-refresh"
          type="button"
          onClick={() => window.location.reload()}
        >
          <RefreshCw size={16} />
          Refresh Intelligence
        </button>
      </div>

      {/* =====================================================
       * STATUS
       * ===================================================== */}

      <div className="ai-workforce-status">
        <div className="ai-workforce-status-left">
          <span className="ai-live-dot" />
          <strong>AI Workforce Engine Online</strong>
          <span className="ai-status-divider" />
          <span>HR Data Connected</span>
          <span className="ai-status-divider" />
          <span>Attendance Connected</span>
          <span className="ai-status-divider" />
          <span>Performance Connected</span>
        </div>

        <div className="ai-workforce-status-right">
          <Zap size={15} />
          Intelligence Mode
        </div>
      </div>

      {/* =====================================================
       * KPI
       * ===================================================== */}

      <section className="ai-workforce-kpi-grid">
        {workforceKPIs.map((kpi) => {
          const Icon = kpi.icon;

          return (
            <div className="ai-workforce-kpi-card" key={kpi.label}>
              <div className="ai-workforce-kpi-top">
                <div className="ai-workforce-kpi-icon">
                  <Icon size={20} />
                </div>

                <span
                  className={
                    kpi.trend === "up"
                      ? "ai-workforce-trend positive"
                      : "ai-workforce-trend negative"
                  }
                >
                  {kpi.trend === "up" ? (
                    <ArrowUpRight size={15} />
                  ) : (
                    <ArrowDownRight size={15} />
                  )}
                  {kpi.change}
                </span>
              </div>

              <div className="ai-workforce-kpi-value">{kpi.value}</div>

              <div className="ai-workforce-kpi-label">{kpi.label}</div>

              <div className="ai-workforce-kpi-description">
                {kpi.description}
              </div>
            </div>
          );
        })}
      </section>

      {/* =====================================================
       * AI COPILOT
       * ===================================================== */}

      <section className="ai-workforce-copilot">
        <div className="ai-workforce-copilot-header">
          <div className="ai-workforce-copilot-title">
            <div className="ai-workforce-copilot-icon">
              <Sparkles size={20} />
            </div>

            <div>
              <h2>AI Workforce Copilot</h2>
              <p>
                Ask AI about workforce performance, people risk, and
                organizational efficiency.
              </p>
            </div>
          </div>

          <div className="ai-workforce-ai-badge">
            <BrainCircuit size={14} />
            Intelligence Layer
          </div>
        </div>

        <div className="ai-workforce-suggestions">
          {suggestedQuestions.map((item) => (
            <button type="button" key={item} onClick={() => askAI(item)}>
              <MessageSquareText size={14} />
              {item}
            </button>
          ))}
        </div>

        <div className="ai-workforce-chat-input">
          <Search size={18} />

          <input
            type="text"
            value={question}
            placeholder="Tanyakan sesuatu tentang workforce..."
            onChange={(event) => setQuestion(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                askAI(question);
              }
            }}
          />

          <button
            type="button"
            onClick={() => askAI(question)}
            disabled={!question.trim() || isThinking}
          >
            <Send size={17} />
            Analyze
          </button>
        </div>

        {(lastQuestion || isThinking) && (
          <div className="ai-workforce-answer">
            <div className="ai-workforce-answer-header">
              <BrainCircuit size={16} />
              AI Workforce Analysis
            </div>

            {isThinking ? (
              <div className="ai-workforce-thinking">
                <span />
                <span />
                <span />
                AI sedang menganalisis workforce data...
              </div>
            ) : (
              <div className="ai-workforce-answer-content">
                <strong>{lastQuestion}</strong>

                <p>
                  Berdasarkan pola workforce saat ini, AI perlu melakukan
                  cross-analysis antara attendance, workload, overtime,
                  performance, department, dan competency sebelum memberikan
                  rekomendasi operasional.
                </p>

                <div className="ai-workforce-answer-note">
                  <Sparkles size={14} />
                  Real-time AI reasoning akan terhubung ke Laravel AI Gateway.
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* =====================================================
       * WORKFORCE HEALTH
       * ===================================================== */}

      <section className="ai-workforce-health-section">
        <div className="ai-workforce-section-heading">
          <div>
            <span className="ai-workforce-section-eyebrow">
              WORKFORCE HEALTH
            </span>
            <h2>Organizational Workforce Health</h2>
            <p>AI assessment terhadap kesehatan dan efektivitas workforce.</p>
          </div>

          <div className="ai-workforce-health-score">
            <span>Overall Score</span>
            <strong>89</strong>
            <small>/ 100</small>
          </div>
        </div>

        <div className="ai-workforce-health-grid">
          <HealthMetric
            icon={Users}
            title="Workforce Availability"
            value="94.8%"
            status="Healthy"
            progress={94.8}
          />

          <HealthMetric
            icon={Gauge}
            title="Productivity"
            value="88.4"
            status="Good"
            progress={88.4}
          />

          <HealthMetric
            icon={Clock3}
            title="Workload Balance"
            value="82.1"
            status="Watch"
            progress={82.1}
          />

          <HealthMetric
            icon={BriefcaseBusiness}
            title="Skill Coverage"
            value="91.6%"
            status="Healthy"
            progress={91.6}
          />
        </div>
      </section>

      {/* =====================================================
       * WORKFORCE SNAPSHOT
       * ===================================================== */}

      <section className="ai-workforce-snapshot">
        <div className="ai-workforce-section-heading">
          <div>
            <span className="ai-workforce-section-eyebrow">
              OPERATIONAL SNAPSHOT
            </span>
            <h2>Workforce Intelligence Snapshot</h2>
            <p>Kondisi workforce berdasarkan data operasional terbaru.</p>
          </div>
        </div>

        <div className="ai-workforce-snapshot-grid">
          <SnapshotMetric
            title="Total Employees"
            value="428"
            change="+12"
            icon={Users}
            positive
          />

          <SnapshotMetric
            title="Present Today"
            value="406"
            change="94.8%"
            icon={UserCheck}
            positive
          />

          <SnapshotMetric
            title="Absent / Leave"
            value="22"
            change="5.2%"
            icon={UserX}
          />

          <SnapshotMetric
            title="Overtime Employees"
            value="67"
            change="+8.7%"
            icon={Clock3}
          />
        </div>
      </section>

      {/* =====================================================
       * RISK
       * ===================================================== */}

      <section className="ai-workforce-risk-section">
        <div className="ai-workforce-section-heading">
          <div>
            <span className="ai-workforce-section-eyebrow">
              PEOPLE RISK ENGINE
            </span>
            <h2>Workforce Risks</h2>
            <p>Risiko yang ditemukan AI dari pola workforce dan HR.</p>
          </div>
        </div>

        <div className="ai-workforce-risk-grid">
          {workforceRisks.map((risk) => (
            <div
              className={`ai-workforce-risk-card ${risk.severity}`}
              key={risk.title}
            >
              <div className="ai-workforce-risk-header">
                <div className="ai-workforce-risk-icon">
                  {risk.severity === "critical" || risk.severity === "high" ? (
                    <AlertTriangle size={17} />
                  ) : (
                    <CheckCircle2 size={17} />
                  )}
                </div>

                <span className="ai-workforce-severity">{risk.severity}</span>
              </div>

              <h3>{risk.title}</h3>

              <div className="ai-workforce-risk-category">{risk.category}</div>

              <div className="ai-workforce-risk-value">{risk.value}</div>

              <p>{risk.description}</p>

              <div className="ai-workforce-risk-footer">
                <span>Impact</span>
                <strong>{risk.impact}</strong>

                <button
                  type="button"
                  onClick={() => askAI(`Analyze ${risk.title}`)}
                >
                  Analyze
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
       * AI INSIGHTS
       * ===================================================== */}

      <section className="ai-workforce-insights-section">
        <div className="ai-workforce-section-heading">
          <div>
            <span className="ai-workforce-section-eyebrow">AI DISCOVERY</span>
            <h2>Workforce Intelligence Insights</h2>
            <p>Temuan AI yang membutuhkan perhatian management.</p>
          </div>
        </div>

        <div className="ai-workforce-insights-list">
          {workforceInsights.map((insight) => (
            <div
              className={`ai-workforce-insight ${insight.severity}`}
              key={insight.title}
            >
              <div className="ai-workforce-insight-icon">
                {insight.severity === "critical" ? (
                  <AlertTriangle size={18} />
                ) : insight.severity === "warning" ? (
                  <TrendingDown size={18} />
                ) : (
                  <LineChart size={18} />
                )}
              </div>

              <div className="ai-workforce-insight-content">
                <div className="ai-workforce-insight-top">
                  <h3>{insight.title}</h3>

                  <span>Confidence {insight.confidence}%</span>
                </div>

                <p>{insight.description}</p>

                <div className="ai-workforce-insight-action">
                  <Sparkles size={14} />
                  Recommended Action:
                  <strong>{insight.action}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
       * FOOTER
       * ===================================================== */}

      <footer className="ai-workforce-footer">
        <div>
          <BrainCircuit size={18} />
          <strong>ABN Industrial Intelligence Engine</strong>
        </div>

        <span>
          Workforce Intelligence Layer • Human decisions remain under management
          control.
        </span>
      </footer>
    </div>
  );
}

/* =========================================================
 * HEALTH METRIC
 * ========================================================= */

interface HealthMetricProps {
  icon: ElementType;
  title: string;
  value: string;
  status: string;
  progress: number;
}

function HealthMetric({
  icon: Icon,
  title,
  value,
  status,
  progress,
}: HealthMetricProps) {
  return (
    <div className="ai-workforce-health-card">
      <div className="ai-workforce-health-icon">
        <Icon size={19} />
      </div>

      <div className="ai-workforce-health-info">
        <span>{title}</span>

        <strong>{value}</strong>

        <small>{status}</small>
      </div>

      <div className="ai-workforce-progress">
        <div
          className="ai-workforce-progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

/* =========================================================
 * SNAPSHOT METRIC
 * ========================================================= */

interface SnapshotMetricProps {
  title: string;
  value: string;
  change: string;
  icon: ElementType;
  positive?: boolean;
}

function SnapshotMetric({
  title,
  value,
  change,
  icon: Icon,
  positive,
}: SnapshotMetricProps) {
  return (
    <div className="ai-workforce-snapshot-card">
      <div className="ai-workforce-snapshot-icon">
        <Icon size={19} />
      </div>

      <div>
        <span>{title}</span>
        <strong>{value}</strong>

        <small className={positive ? "positive" : ""}>
          {positive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
          {change}
        </small>
      </div>
    </div>
  );
}
