import { useState } from "react";
import type { ElementType } from "react";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  FileBarChart,
  FileText,
  Gauge,
  LineChart,
  MessageSquareText,
  //PieChart,
  RefreshCw,
  Search,
  Send,
  Sparkles,
  TrendingDown,
  //TrendingUp,
  Users,
  Wallet,
  Zap,
} from "lucide-react";

import "./AIReports.css";

/* =========================================================
 * TYPES
 * ========================================================= */

interface ReportKPI {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: ElementType;
  description: string;
}

interface AIReportInsight {
  title: string;
  category: string;
  severity: "critical" | "warning" | "info";
  confidence: number;
  description: string;
  action: string;
}

interface ReportItem {
  title: string;
  type: string;
  period: string;
  status: "ready" | "processing" | "scheduled";
  description: string;
}

/* =========================================================
 * KPI DATA
 * ========================================================= */

const reportKPIs: ReportKPI[] = [
  {
    label: "Report Intelligence Score",
    value: "94.2",
    change: "+5.8%",
    trend: "up",
    icon: Gauge,
    description: "Kualitas dan kelengkapan business intelligence",
  },
  {
    label: "Active Reports",
    value: "38",
    change: "+6",
    trend: "up",
    icon: FileBarChart,
    description: "Report aktif yang terhubung ke AI",
  },
  {
    label: "AI Findings",
    value: "126",
    change: "+18.4%",
    trend: "up",
    icon: BrainCircuit,
    description: "Temuan intelligence periode berjalan",
  },
  {
    label: "Critical Findings",
    value: "7",
    change: "-22.2%",
    trend: "down",
    icon: AlertTriangle,
    description: "Temuan kritis yang membutuhkan perhatian",
  },
];

/* =========================================================
 * AI INSIGHTS
 * ========================================================= */

const reportInsights: AIReportInsight[] = [
  {
    title: "Operational Cost Increasing",
    category: "Finance + Operations",
    severity: "critical",
    confidence: 97,
    description:
      "AI menemukan kenaikan operating cost yang berkorelasi dengan overtime, fuel consumption, dan maintenance activity.",
    action: "Investigate cost drivers",
  },
  {
    title: "Fleet Efficiency Declining",
    category: "Fleet + Finance",
    severity: "warning",
    confidence: 94,
    description:
      "Efisiensi fleet menurun pada beberapa unit dan mulai memberikan tekanan terhadap biaya operasional.",
    action: "Analyze fleet efficiency",
  },
  {
    title: "Inventory Slow Moving",
    category: "Inventory + Procurement",
    severity: "warning",
    confidence: 91,
    description:
      "AI menemukan sejumlah item dengan inventory turnover rendah dan potensi cash yang tertahan.",
    action: "Optimize inventory",
  },
  {
    title: "Workforce Productivity Opportunity",
    category: "HR + Operations",
    severity: "info",
    confidence: 88,
    description:
      "Terdapat peluang peningkatan produktivitas melalui redistribusi workload dan optimasi overtime.",
    action: "Review workforce",
  },
];

/* =========================================================
 * REPORT DATA
 * ========================================================= */

const reports: ReportItem[] = [
  {
    title: "Executive Performance Report",
    type: "Executive",
    period: "September 2026",
    status: "ready",
    description:
      "Ringkasan KPI perusahaan, financial performance, operations, fleet, workforce, dan risk.",
  },
  {
    title: "Fleet Intelligence Report",
    type: "Fleet",
    period: "Weekly",
    status: "ready",
    description:
      "Utilization, fuel efficiency, maintenance risk, vehicle performance, dan driver behavior.",
  },
  {
    title: "Finance Intelligence Report",
    type: "Finance",
    period: "Monthly",
    status: "processing",
    description:
      "Cashflow, margin, expense anomaly, receivable risk, dan profitability.",
  },
  {
    title: "Workforce Performance Report",
    type: "HR",
    period: "Monthly",
    status: "ready",
    description:
      "Attendance, productivity, overtime, workforce risk, dan competency coverage.",
  },
  {
    title: "Inventory & Procurement Report",
    type: "Supply Chain",
    period: "Weekly",
    status: "scheduled",
    description:
      "Stock health, purchasing trend, supplier performance, dan inventory risk.",
  },
  {
    title: "SCADA Operations Report",
    type: "SCADA",
    period: "Daily",
    status: "ready",
    description:
      "Production condition, alarms, equipment health, anomaly, dan operational efficiency.",
  },
];

/* =========================================================
 * COMPONENT
 * ========================================================= */

export default function AIReports() {
  const [question, setQuestion] = useState("");
  const [lastQuestion, setLastQuestion] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const suggestedQuestions = [
    "Apa yang paling berubah bulan ini?",
    "Apa masalah terbesar perusahaan saat ini?",
    "Cari anomaly lintas departemen",
    "Kenapa operating cost meningkat?",
    "Buat executive summary hari ini",
    "Apa risiko perusahaan bulan depan?",
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
     * POST /api/ai/reports/analyze
     *
     * {
     *   question: trimmed
     * }
     */

    window.setTimeout(() => {
      setIsThinking(false);
    }, 900);
  };

  const generateExecutiveReport = () => {
    askAI("Generate Executive Intelligence Report");
  };

  return (
    <div className="ai-reports-page">
      {/* =====================================================
       * HEADER
       * ===================================================== */}

      <div className="ai-reports-header">
        <div>
          <div className="ai-reports-eyebrow">
            <BrainCircuit size={16} />
            ABN INDUSTRIAL INTELLIGENCE
          </div>

          <h1>
            AI Reports <span>Intelligence</span>
          </h1>

          <p>
            AI-powered reporting untuk mengubah data ABN EMS menjadi executive
            insight, anomaly, forecast, dan rekomendasi bisnis.
          </p>
        </div>

        <button
          type="button"
          className="ai-reports-refresh"
          onClick={() => window.location.reload()}
        >
          <RefreshCw size={16} />
          Refresh Intelligence
        </button>
      </div>

      {/* =====================================================
       * STATUS
       * ===================================================== */}

      <div className="ai-reports-status">
        <div className="ai-reports-status-left">
          <span className="ai-reports-live-dot" />

          <strong>AI Report Engine Online</strong>

          <span className="ai-reports-divider" />

          <span>EMS Data Connected</span>

          <span className="ai-reports-divider" />

          <span>Cross Module Analysis</span>

          <span className="ai-reports-divider" />

          <span>AI Reasoning Active</span>
        </div>

        <div className="ai-reports-status-right">
          <Zap size={15} />
          Intelligence Mode
        </div>
      </div>

      {/* =====================================================
       * KPI
       * ===================================================== */}

      <section className="ai-reports-kpi-grid">
        {reportKPIs.map((kpi) => {
          const Icon = kpi.icon;

          return (
            <div className="ai-reports-kpi-card" key={kpi.label}>
              <div className="ai-reports-kpi-top">
                <div className="ai-reports-kpi-icon">
                  <Icon size={20} />
                </div>

                <span
                  className={
                    kpi.trend === "up"
                      ? "ai-reports-trend positive"
                      : "ai-reports-trend negative"
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

              <div className="ai-reports-kpi-value">{kpi.value}</div>

              <div className="ai-reports-kpi-label">{kpi.label}</div>

              <div className="ai-reports-kpi-description">
                {kpi.description}
              </div>
            </div>
          );
        })}
      </section>

      {/* =====================================================
       * AI REPORT COPILOT
       * ===================================================== */}

      <section className="ai-reports-copilot">
        <div className="ai-reports-copilot-header">
          <div className="ai-reports-copilot-title">
            <div className="ai-reports-copilot-icon">
              <Sparkles size={20} />
            </div>

            <div>
              <h2>AI Report Copilot</h2>

              <p>
                Tanyakan apa saja tentang performance dan kondisi bisnis
                berdasarkan data ABN EMS.
              </p>
            </div>
          </div>

          <div className="ai-reports-ai-badge">
            <BrainCircuit size={14} />
            Intelligence Layer
          </div>
        </div>

        <div className="ai-reports-suggestions">
          {suggestedQuestions.map((item) => (
            <button type="button" key={item} onClick={() => askAI(item)}>
              <MessageSquareText size={14} />
              {item}
            </button>
          ))}
        </div>

        <div className="ai-reports-chat-input">
          <Search size={18} />

          <input
            type="text"
            value={question}
            placeholder="Tanyakan sesuatu tentang business intelligence..."
            onChange={(event) => setQuestion(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                askAI(question);
              }
            }}
          />

          <button
            type="button"
            disabled={!question.trim() || isThinking}
            onClick={() => askAI(question)}
          >
            <Send size={17} />
            Analyze
          </button>
        </div>

        {(lastQuestion || isThinking) && (
          <div className="ai-reports-answer">
            <div className="ai-reports-answer-header">
              <BrainCircuit size={16} />
              AI Report Analysis
            </div>

            {isThinking ? (
              <div className="ai-reports-thinking">
                <span />
                <span />
                <span />
                AI sedang menganalisis seluruh data EMS...
              </div>
            ) : (
              <div className="ai-reports-answer-content">
                <strong>{lastQuestion}</strong>

                <p>
                  AI akan melakukan cross-analysis terhadap Finance, Fleet,
                  Workforce, Inventory, Procurement, CRM, SCADA, dan operational
                  KPI sebelum menghasilkan kesimpulan.
                </p>

                <div className="ai-reports-answer-note">
                  <Sparkles size={14} />
                  Real-time reasoning akan terhubung ke Laravel AI Gateway.
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* =====================================================
       * EXECUTIVE REPORT
       * ===================================================== */}

      <section className="ai-reports-executive">
        <div className="ai-reports-executive-content">
          <div className="ai-reports-executive-icon">
            <FileText size={22} />
          </div>

          <div>
            <span className="ai-reports-section-eyebrow">
              EXECUTIVE INTELLIGENCE
            </span>

            <h2>Generate Executive Intelligence Report</h2>

            <p>
              AI menggabungkan KPI seluruh modul ABN EMS dan menghasilkan
              executive summary berisi kondisi perusahaan, anomaly, risiko,
              forecast, root cause, dan recommended actions.
            </p>
          </div>
        </div>

        <button type="button" onClick={generateExecutiveReport}>
          <Sparkles size={16} />
          Generate AI Report
        </button>
      </section>

      {/* =====================================================
       * BUSINESS HEALTH
       * ===================================================== */}

      <section className="ai-reports-health">
        <div className="ai-reports-section-heading">
          <div>
            <span className="ai-reports-section-eyebrow">
              BUSINESS INTELLIGENCE
            </span>

            <h2>Enterprise Performance Health</h2>

            <p>AI assessment terhadap kondisi bisnis secara menyeluruh.</p>
          </div>

          <div className="ai-reports-health-score">
            <span>Overall Score</span>
            <strong>91</strong>
            <small>/ 100</small>
          </div>
        </div>

        <div className="ai-reports-health-grid">
          <HealthMetric
            icon={Wallet}
            title="Financial Health"
            value="87"
            status="Good"
            progress={87}
          />

          <HealthMetric
            icon={BarChart3}
            title="Operational Health"
            value="93"
            status="Healthy"
            progress={93}
          />

          <HealthMetric
            icon={Users}
            title="Workforce Health"
            value="89"
            status="Good"
            progress={89}
          />

          <HealthMetric
            icon={Gauge}
            title="Asset Efficiency"
            value="92"
            status="Healthy"
            progress={92}
          />
        </div>
      </section>

      {/* =====================================================
       * CROSS MODULE ANALYSIS
       * ===================================================== */}

      <section className="ai-reports-cross-module">
        <div className="ai-reports-section-heading">
          <div>
            <span className="ai-reports-section-eyebrow">
              CROSS-MODULE REASONING
            </span>

            <h2>AI Business Cause & Effect</h2>

            <p>
              AI menghubungkan perubahan KPI antar modul untuk mencari root
              cause.
            </p>
          </div>
        </div>

        <div className="ai-reports-cause-chain">
          <CauseStep
            number="01"
            title="Operating Cost"
            value="+14.8%"
            description="Biaya operasional meningkat"
          />

          <div className="ai-reports-chain-arrow">→</div>

          <CauseStep
            number="02"
            title="Fleet Fuel"
            value="+8.7%"
            description="Konsumsi BBM meningkat"
          />

          <div className="ai-reports-chain-arrow">→</div>

          <CauseStep
            number="03"
            title="Maintenance"
            value="+11.4%"
            description="Maintenance activity meningkat"
          />

          <div className="ai-reports-chain-arrow">→</div>

          <CauseStep
            number="04"
            title="Workforce"
            value="+16.7%"
            description="Overtime teknisi meningkat"
          />
        </div>

        <div className="ai-reports-root-cause">
          <div className="ai-reports-root-cause-icon">
            <BrainCircuit size={19} />
          </div>

          <div>
            <strong>AI Root Cause Hypothesis</strong>

            <p>
              Kenaikan operating cost kemungkinan besar dipengaruhi kombinasi
              peningkatan fuel consumption dan maintenance activity yang
              kemudian meningkatkan overtime workforce.
            </p>
          </div>

          <span>Confidence 94%</span>
        </div>
      </section>

      {/* =====================================================
       * REPORT LIBRARY
       * ===================================================== */}

      <section className="ai-reports-library">
        <div className="ai-reports-section-heading">
          <div>
            <span className="ai-reports-section-eyebrow">
              INTELLIGENT REPORT LIBRARY
            </span>

            <h2>AI Reports</h2>

            <p>Report yang tersedia di dalam ABN Industrial Intelligence.</p>
          </div>
        </div>

        <div className="ai-reports-list">
          {reports.map((report) => (
            <div className="ai-reports-report-card" key={report.title}>
              <div className="ai-reports-report-icon">
                {report.type === "Finance" ? (
                  <Wallet size={19} />
                ) : report.type === "Fleet" ? (
                  <Gauge size={19} />
                ) : report.type === "HR" ? (
                  <Users size={19} />
                ) : report.type === "SCADA" ? (
                  <LineChart size={19} />
                ) : (
                  <FileBarChart size={19} />
                )}
              </div>

              <div className="ai-reports-report-main">
                <div className="ai-reports-report-title-row">
                  <h3>{report.title}</h3>

                  <span className={`ai-reports-report-status ${report.status}`}>
                    {report.status === "ready" && (
                      <>
                        <CheckCircle2 size={12} />
                        Ready
                      </>
                    )}

                    {report.status === "processing" && (
                      <>
                        <Clock3 size={12} />
                        Processing
                      </>
                    )}

                    {report.status === "scheduled" && (
                      <>
                        <Clock3 size={12} />
                        Scheduled
                      </>
                    )}
                  </span>
                </div>

                <div className="ai-reports-report-meta">
                  <span>{report.type}</span>
                  <span>•</span>
                  <span>{report.period}</span>
                </div>

                <p>{report.description}</p>
              </div>

              <button
                type="button"
                className="ai-reports-view-button"
                onClick={() => askAI(`Analyze ${report.title}`)}
              >
                <Search size={15} />
                Analyze
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
       * AI FINDINGS
       * ===================================================== */}

      <section className="ai-reports-insights">
        <div className="ai-reports-section-heading">
          <div>
            <span className="ai-reports-section-eyebrow">AI DISCOVERY</span>

            <h2>Business Intelligence Findings</h2>

            <p>Temuan AI yang dihasilkan dari analisis lintas modul.</p>
          </div>
        </div>

        <div className="ai-reports-insights-list">
          {reportInsights.map((insight) => (
            <div
              className={`ai-reports-insight ${insight.severity}`}
              key={insight.title}
            >
              <div className="ai-reports-insight-icon">
                {insight.severity === "critical" ? (
                  <AlertTriangle size={18} />
                ) : insight.severity === "warning" ? (
                  <TrendingDown size={18} />
                ) : (
                  <LineChart size={18} />
                )}
              </div>

              <div className="ai-reports-insight-content">
                <div className="ai-reports-insight-top">
                  <div>
                    <h3>{insight.title}</h3>

                    <span>{insight.category}</span>
                  </div>

                  <strong>Confidence {insight.confidence}%</strong>
                </div>

                <p>{insight.description}</p>

                <div className="ai-reports-insight-action">
                  <Sparkles size={14} />
                  Recommended Action:
                  <b>{insight.action}</b>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
       * FOOTER
       * ===================================================== */}

      <footer className="ai-reports-footer">
        <div>
          <BrainCircuit size={18} />
          <strong>ABN Industrial Intelligence Engine</strong>
        </div>

        <span>
          Reports Intelligence Layer • AI recommendations require management
          validation.
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
    <div className="ai-reports-health-card">
      <div className="ai-reports-health-icon">
        <Icon size={19} />
      </div>

      <div className="ai-reports-health-info">
        <span>{title}</span>

        <strong>{value}</strong>

        <small>{status}</small>
      </div>

      <div className="ai-reports-progress">
        <div
          className="ai-reports-progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

/* =========================================================
 * CAUSE STEP
 * ========================================================= */

interface CauseStepProps {
  number: string;
  title: string;
  value: string;
  description: string;
}

function CauseStep({ number, title, value, description }: CauseStepProps) {
  return (
    <div className="ai-reports-cause-step">
      <span className="ai-reports-cause-number">{number}</span>

      <span className="ai-reports-cause-title">{title}</span>

      <strong>{value}</strong>

      <small>{description}</small>
    </div>
  );
}
