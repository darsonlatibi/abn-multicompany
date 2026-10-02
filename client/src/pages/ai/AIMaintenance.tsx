import { useState } from "react";
import type { ElementType, ReactNode } from "react";

import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Gauge,
  History,
  MessageSquareText,
  RefreshCw,
  Search,
  Send,
  Settings2,
  Sparkles,
  //   Thermometer,
  Timer,
  TrendingDown,
  TrendingUp,
  Wrench,
  Zap,
} from "lucide-react";

import "./AIMaintenance.css";

interface MaintenanceKPI {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "stable";
  icon: ElementType;
}

interface MaintenanceRisk {
  id: number;
  equipment: string;
  type: string;
  severity: "critical" | "high" | "medium" | "low";
  health: number;
  failureProbability: number;
  description: string;
  recommendation: string;
  time: string;
}

interface MaintenanceInsight {
  id: number;
  title: string;
  equipment: string;
  description: string;
  recommendation: string;
  confidence: number;
  severity: "critical" | "warning" | "info";
}

const maintenanceKPIs: MaintenanceKPI[] = [
  {
    label: "Equipment Availability",
    value: "96.4%",
    change: "+1.8%",
    trend: "up",
    icon: Activity,
  },
  {
    label: "Maintenance Efficiency",
    value: "89.7%",
    change: "+3.2%",
    trend: "up",
    icon: Gauge,
  },
  {
    label: "Failure Risk",
    value: "18 / 100",
    change: "-6",
    trend: "down",
    icon: AlertTriangle,
  },
  {
    label: "MTBF",
    value: "742 h",
    change: "+42 h",
    trend: "up",
    icon: Timer,
  },
];

const maintenanceRisks: MaintenanceRisk[] = [
  {
    id: 1,
    equipment: "P-101",
    type: "Process Pump",
    severity: "critical",
    health: 61,
    failureProbability: 78,
    description:
      "AI menemukan kombinasi penurunan discharge pressure, peningkatan motor current dan perubahan vibration pattern.",
    recommendation:
      "Prioritaskan inspeksi bearing, suction restriction dan mechanical loading. Jadwalkan pemeriksaan sebelum window maintenance berikutnya.",
    time: "5 min ago",
  },
  {
    id: 2,
    equipment: "M-204",
    type: "Electric Motor",
    severity: "high",
    health: 69,
    failureProbability: 64,
    description:
      "Motor current menunjukkan trend meningkat sementara operating load relatif stabil.",
    recommendation:
      "Periksa bearing temperature, alignment dan kondisi electrical load.",
    time: "18 min ago",
  },
  {
    id: 3,
    equipment: "V-302",
    type: "Control Valve",
    severity: "medium",
    health: 76,
    failureProbability: 42,
    description:
      "Valve response mulai menunjukkan deadband dan response delay dibandingkan historical baseline.",
    recommendation:
      "Periksa actuator response, position feedback dan kemungkinan mechanical friction.",
    time: "32 min ago",
  },
  {
    id: 4,
    equipment: "HX-401",
    type: "Heat Exchanger",
    severity: "low",
    health: 91,
    failureProbability: 14,
    description:
      "Performance masih normal tetapi efficiency sedikit menurun dalam 7 hari terakhir.",
    recommendation:
      "Monitor differential temperature dan pressure drop. Pertimbangkan cleaning pada maintenance cycle berikutnya.",
    time: "1 hour ago",
  },
];

const maintenanceInsights: MaintenanceInsight[] = [
  {
    id: 1,
    title: "Potential Bearing Degradation",
    equipment: "P-101",
    severity: "critical",
    description:
      "AI menemukan pola vibration dan motor current yang konsisten dengan indikasi awal bearing degradation.",
    recommendation:
      "Lakukan vibration analysis dan inspeksi bearing. Jangan menunggu sampai terjadi trip.",
    confidence: 94,
  },
  {
    id: 2,
    title: "Motor Efficiency Degradation",
    equipment: "M-204",
    severity: "warning",
    description:
      "Motor membutuhkan current lebih tinggi untuk mempertahankan operating load yang relatif sama.",
    recommendation:
      "Bandingkan current, temperature dan load terhadap historical baseline 30 hari.",
    confidence: 91,
  },
  {
    id: 3,
    title: "Valve Response Deviation",
    equipment: "V-302",
    severity: "warning",
    description:
      "AI mendeteksi peningkatan response delay pada control valve selama beberapa operating cycle.",
    recommendation: "Periksa actuator, positioner dan feedback signal.",
    confidence: 87,
  },
  {
    id: 4,
    title: "Maintenance Optimization",
    equipment: "HX-401",
    severity: "info",
    description:
      "Equipment masih sehat tetapi terdapat indikasi penurunan efficiency secara perlahan.",
    recommendation:
      "Gabungkan cleaning dengan scheduled maintenance untuk mengurangi downtime tambahan.",
    confidence: 83,
  },
];

export default function AIMaintenance() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastQuestion, setLastQuestion] = useState("");

  const askAI = async (customQuestion?: string) => {
    const q = (customQuestion ?? question).trim();

    if (!q) return;

    setLastQuestion(q);
    setLoading(true);

    /*
     * =====================================================
     * FUTURE LARAVEL API
     * =====================================================
     *
     * const response = await fetch("/api/ai/maintenance/analyze", {
     *   method: "POST",
     *   headers: {
     *     "Content-Type": "application/json",
     *   },
     *   body: JSON.stringify({
     *     question: q,
     *   }),
     * });
     *
     * const data = await response.json();
     *
     * =====================================================
     */

    setTimeout(() => {
      setLoading(false);
    }, 1200);
  };

  const suggestedQuestions = [
    "Equipment mana yang paling berisiko failure?",
    "Kenapa P-101 menunjukkan degradation?",
    "Kapan equipment perlu maintenance?",
    "Cari potensi failure dari historical trend",
    "Equipment mana yang harus diprioritaskan?",
    "Bagaimana mengurangi unplanned downtime?",
  ];

  return (
    <div className="ai-maintenance-page">
      {/* =====================================================
       * HEADER
       * ===================================================== */}

      <div className="ai-maintenance-header">
        <div className="ai-maintenance-title">
          <div className="ai-maintenance-title-icon">
            <BrainCircuit size={28} />
          </div>

          <div>
            <div className="ai-maintenance-eyebrow">
              INDUSTRIAL INTELLIGENCE ENGINE
            </div>

            <h1>AI Maintenance Intelligence</h1>

            <p>
              Predictive maintenance, equipment health monitoring, failure
              prediction and maintenance optimization.
            </p>
          </div>
        </div>

        <button
          className="ai-maintenance-refresh"
          onClick={() => window.location.reload()}
        >
          <RefreshCw size={17} />
          Refresh Intelligence
        </button>
      </div>

      {/* =====================================================
       * STATUS
       * ===================================================== */}

      <div className="ai-maintenance-status">
        <div className="maintenance-status-left">
          <span className="maintenance-status-dot" />

          <div>
            <strong>Maintenance AI Online</strong>

            <span>
              Equipment • Sensors • CMMS • Maintenance History • SCADA
            </span>
          </div>
        </div>

        <div className="maintenance-status-right">
          <span>
            <Zap size={14} />
            Predictive Analysis
          </span>

          <span>
            <Settings2 size={14} />
            428 Equipment
          </span>

          <span>
            <AlertTriangle size={14} />7 At Risk
          </span>

          <span>
            <Activity size={14} />
            Live Monitoring
          </span>
        </div>
      </div>

      {/* =====================================================
       * KPI
       * ===================================================== */}

      <div className="ai-maintenance-kpi-grid">
        {maintenanceKPIs.map((kpi) => {
          const Icon = kpi.icon;

          return (
            <div className="ai-maintenance-kpi-card" key={kpi.label}>
              <div className="ai-maintenance-kpi-top">
                <div className="ai-maintenance-kpi-icon">
                  <Icon size={20} />
                </div>

                <span className={`maintenance-kpi-trend ${kpi.trend}`}>
                  {kpi.trend === "up" && <ArrowUpRight size={15} />}
                  {kpi.trend === "down" && <ArrowDownRight size={15} />}
                  {kpi.trend === "stable" && <Activity size={14} />}

                  {kpi.change}
                </span>
              </div>

              <div className="ai-maintenance-kpi-value">{kpi.value}</div>

              <div className="ai-maintenance-kpi-label">{kpi.label}</div>
            </div>
          );
        })}
      </div>

      {/* =====================================================
       * AI COPILOT
       * ===================================================== */}

      <section className="ai-maintenance-copilot">
        <div className="maintenance-copilot-header">
          <div className="maintenance-copilot-brand">
            <div className="maintenance-copilot-icon">
              <Sparkles size={21} />
            </div>

            <div>
              <h2>Maintenance Intelligence Copilot</h2>

              <p>
                Ask AI about equipment health, failure risk, maintenance history
                and recommended actions.
              </p>
            </div>
          </div>

          <div className="maintenance-ai-badge">
            <BrainCircuit size={14} />
            AI Powered
          </div>
        </div>

        <div className="maintenance-chat">
          <div className="maintenance-chat-avatar">
            <BrainCircuit size={21} />
          </div>

          <div className="maintenance-chat-content">
            <div className="maintenance-chat-name">
              ABN Maintenance AI
              <span>Predictive Maintenance Intelligence Engine</span>
            </div>

            <div className="maintenance-chat-message">
              <strong>Maintenance intelligence is ready.</strong>

              <p>
                Saya dapat menganalisis equipment condition, sensor trend,
                vibration, temperature, motor current, maintenance history,
                MTBF, MTTR dan failure pattern untuk membantu engineer
                menentukan prioritas maintenance.
              </p>

              <div className="maintenance-capabilities">
                <span>
                  <Activity size={14} />
                  Health
                </span>

                <span>
                  <AlertTriangle size={14} />
                  Risk
                </span>

                <span>
                  <TrendingUp size={14} />
                  Prediction
                </span>

                <span>
                  <History size={14} />
                  History
                </span>

                <span>
                  <Wrench size={14} />
                  Maintenance
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="maintenance-suggestions">
          <span>Ask Maintenance AI:</span>

          {suggestedQuestions.map((item) => (
            <button
              key={item}
              onClick={() => {
                setQuestion(item);
                askAI(item);
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="ai-maintenance-input">
          <MessageSquareText size={19} />

          <input
            type="text"
            placeholder="Tanyakan sesuatu tentang maintenance..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                askAI();
              }
            }}
          />

          <button
            className="maintenance-send-button"
            onClick={() => askAI()}
            disabled={loading}
          >
            {loading ? (
              <RefreshCw className="maintenance-spin" size={18} />
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>

        {lastQuestion && (
          <div className="maintenance-ai-answer">
            <div className="maintenance-answer-header">
              <BrainCircuit size={17} />

              <span>Maintenance AI Analysis</span>

              <span className="maintenance-confidence">94% confidence</span>
            </div>

            <div className="maintenance-question">
              <strong>Query:</strong>
              {lastQuestion}
            </div>

            <p>
              Berdasarkan pola operating condition dan historical equipment
              behavior, AI menemukan indikasi perubahan health pada beberapa
              equipment. Parameter seperti vibration, temperature, motor
              current, pressure dan operating load perlu dibandingkan dengan
              baseline normal untuk menentukan failure mechanism.
            </p>

            <div className="maintenance-diagnosis">
              <div className="diagnosis-item">
                <span className="diagnosis-label">AI Detection</span>

                <strong>Potential equipment degradation</strong>
              </div>

              <div className="diagnosis-item">
                <span className="diagnosis-label">Primary Suspect</span>

                <strong>Pump / motor subsystem</strong>
              </div>

              <div className="diagnosis-item">
                <span className="diagnosis-label">Failure Risk</span>

                <strong>Moderate</strong>
              </div>
            </div>

            <div className="maintenance-recommendation">
              <strong>Recommended Engineering Action</strong>

              <span>
                Bandingkan trend vibration, motor current, temperature, pressure
                dan load terhadap historical baseline 7–30 hari. Jika deviasi
                konsisten, lakukan condition inspection sebelum equipment masuk
                critical failure zone.
              </span>
            </div>
          </div>
        )}
      </section>

      {/* =====================================================
       * MAIN GRID
       * ===================================================== */}

      <div className="ai-maintenance-main-grid">
        {/* EQUIPMENT HEALTH */}

        <section className="ai-maintenance-health-panel">
          <div className="maintenance-section-heading">
            <div>
              <span>EQUIPMENT INTELLIGENCE</span>
              <h2>Equipment Health</h2>
            </div>

            <Activity size={20} />
          </div>

          <div className="equipment-health-summary">
            <div className="health-score-large">
              <div className="health-circle-large">
                <strong>82</strong>
                <span>/100</span>
              </div>

              <div>
                <strong>Overall Equipment Health</strong>

                <p>Most equipment is operating within normal condition.</p>
              </div>
            </div>

            <div className="health-stat-grid">
              <HealthStat
                label="Healthy"
                value="386"
                percentage="90.2%"
                icon={<CheckCircle2 size={17} />}
              />

              <HealthStat
                label="Watch"
                value="35"
                percentage="8.2%"
                icon={<AlertTriangle size={17} />}
              />

              <HealthStat
                label="At Risk"
                value="7"
                percentage="1.6%"
                icon={<AlertTriangle size={17} />}
              />
            </div>
          </div>
        </section>

        {/* MAINTENANCE PERFORMANCE */}

        <section className="ai-maintenance-performance">
          <div className="maintenance-section-heading">
            <div>
              <span>MAINTENANCE PERFORMANCE</span>
              <h2>Maintenance Metrics</h2>
            </div>

            <Wrench size={20} />
          </div>

          <div className="maintenance-metric-list">
            <MaintenanceMetric
              icon={<Timer size={17} />}
              label="MTBF"
              value="742 h"
              change="+42 h"
              positive
            />

            <MaintenanceMetric
              icon={<Clock3 size={17} />}
              label="MTTR"
              value="3.8 h"
              change="-0.6 h"
              positive
            />

            <MaintenanceMetric
              icon={<TrendingDown size={17} />}
              label="Unplanned Downtime"
              value="2.4%"
              change="-0.8%"
              positive
            />

            <MaintenanceMetric
              icon={<CheckCircle2 size={17} />}
              label="PM Compliance"
              value="94.6%"
              change="+2.1%"
              positive
            />
          </div>
        </section>
      </div>

      {/* =====================================================
       * RISK TABLE
       * ===================================================== */}

      <section className="ai-maintenance-risk-section">
        <div className="maintenance-section-heading">
          <div>
            <span>PREDICTIVE MAINTENANCE ENGINE</span>
            <h2>Equipment Failure Risk</h2>
          </div>

          <div className="maintenance-live">
            <span />
            Live
          </div>
        </div>

        <div className="maintenance-risk-grid">
          {maintenanceRisks.map((risk) => (
            <div
              className={`maintenance-risk-card ${risk.severity}`}
              key={risk.id}
            >
              <div className="risk-card-top">
                <div className="risk-equipment">
                  <div className="risk-equipment-icon">
                    <Settings2 size={18} />
                  </div>

                  <div>
                    <strong>{risk.equipment}</strong>
                    <span>{risk.type}</span>
                  </div>
                </div>

                <span className="risk-severity">
                  {risk.severity.toUpperCase()}
                </span>
              </div>

              <div className="risk-health">
                <div>
                  <span>Equipment Health</span>
                  <strong>{risk.health}%</strong>
                </div>

                <div className="risk-progress">
                  <span
                    style={{
                      width: `${risk.health}%`,
                    }}
                  />
                </div>
              </div>

              <div className="failure-probability">
                <div>
                  <span>Failure Probability</span>
                  <strong>{risk.failureProbability}%</strong>
                </div>

                <div className="failure-meter">
                  <span
                    style={{
                      width: `${risk.failureProbability}%`,
                    }}
                  />
                </div>
              </div>

              <p>{risk.description}</p>

              <div className="risk-recommendation">
                <strong>AI Recommendation</strong>

                <span>{risk.recommendation}</span>
              </div>

              <div className="risk-footer">
                <span>
                  <Clock3 size={14} />
                  {risk.time}
                </span>

                <button>
                  <Search size={14} />
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

      <section className="ai-maintenance-insights">
        <div className="maintenance-section-heading">
          <div>
            <span>AI DETECTION ENGINE</span>
            <h2>Maintenance Intelligence Insights</h2>
          </div>

          <Sparkles size={20} />
        </div>

        <div className="maintenance-insight-grid">
          {maintenanceInsights.map((insight) => (
            <div
              className={`maintenance-insight-card ${insight.severity}`}
              key={insight.id}
            >
              <div className="maintenance-insight-top">
                <div className="maintenance-severity">
                  {insight.severity === "critical" ? (
                    <AlertTriangle size={17} />
                  ) : insight.severity === "warning" ? (
                    <AlertTriangle size={17} />
                  ) : (
                    <CheckCircle2 size={17} />
                  )}

                  {insight.severity.toUpperCase()}
                </div>

                <span>{insight.equipment}</span>
              </div>

              <h3>{insight.title}</h3>

              <p>{insight.description}</p>

              <div className="maintenance-insight-action">
                <strong>AI Recommendation</strong>

                <span>{insight.recommendation}</span>
              </div>

              <div className="maintenance-insight-footer">
                <span>AI Confidence</span>

                <b>{insight.confidence}%</b>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
       * FOOTER
       * ===================================================== */}

      <div className="ai-maintenance-footer">
        <BrainCircuit size={17} />

        <span>ABN Industrial Intelligence Engine</span>

        <span>•</span>

        <span>Predictive Maintenance Intelligence Layer</span>

        <span>•</span>

        <span>AI recommendations require engineering validation</span>
      </div>
    </div>
  );
}

/* =========================================================
 * HEALTH STAT
 * ========================================================= */

interface HealthStatProps {
  label: string;
  value: string;
  percentage: string;
  icon: ReactNode;
}

function HealthStat({ label, value, percentage, icon }: HealthStatProps) {
  return (
    <div className="health-stat">
      <div className="health-stat-icon">{icon}</div>

      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>

      <b>{percentage}</b>
    </div>
  );
}

/* =========================================================
 * MAINTENANCE METRIC
 * ========================================================= */

interface MaintenanceMetricProps {
  icon: ReactNode;
  label: string;
  value: string;
  change: string;
  positive?: boolean;
}

function MaintenanceMetric({
  icon,
  label,
  value,
  change,
  positive,
}: MaintenanceMetricProps) {
  return (
    <div className="maintenance-metric">
      <div className="maintenance-metric-icon">{icon}</div>

      <div className="maintenance-metric-info">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>

      <b className={positive ? "positive" : ""}>{change}</b>
    </div>
  );
}
