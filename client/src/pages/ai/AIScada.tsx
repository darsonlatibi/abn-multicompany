import { useState } from "react";
// import {
//   Activity,
//   AlertTriangle,
//   ArrowDownRight,
//   ArrowUpRight,
//   BrainCircuit,
//   CheckCircle2,
//   Clock3,
//   Gauge,
//   MessageSquareText,
//   RefreshCw,
//   Send,
//   Sparkles,
//   Thermometer,
//   TrendingDown,
//   TrendingUp,
//   Waves,
//   Zap,
// } from "lucide-react";

import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  Gauge,
  MessageSquareText,
  RefreshCw,
  Send,
  Sparkles,
  Thermometer,
  TrendingUp,
  Waves,
  //   Wrench,
  Zap,
} from "lucide-react";

import "./AIScada.css";

interface ScadaKPI {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "stable";
  icon: React.ElementType;
}

interface ScadaInsight {
  id: number;
  severity: "critical" | "warning" | "info";
  title: string;
  equipment: string;
  description: string;
  recommendation: string;
  confidence: number;
  time: string;
}

const scadaKPIs: ScadaKPI[] = [
  {
    label: "Process Availability",
    value: "97.8%",
    change: "+1.4%",
    trend: "up",
    icon: Activity,
  },
  {
    label: "Process Efficiency",
    value: "91.6%",
    change: "-2.8%",
    trend: "down",
    icon: Gauge,
  },
  {
    label: "Active Alarms",
    value: "6",
    change: "-3",
    trend: "up",
    icon: AlertTriangle,
  },
  {
    label: "AI Risk Index",
    value: "24 / 100",
    change: "Low",
    trend: "stable",
    icon: BrainCircuit,
  },
];

const scadaInsights: ScadaInsight[] = [
  {
    id: 1,
    severity: "critical",
    title: "Pump Performance Deviation",
    equipment: "P-101",
    description:
      "AI detected a gradual reduction in pump discharge pressure combined with increased motor current.",
    recommendation:
      "Inspect pump suction condition, filter restriction and mechanical loading. Compare current curve with historical baseline.",
    confidence: 95,
    time: "5 min ago",
  },
  {
    id: 2,
    severity: "warning",
    title: "Temperature Drift",
    equipment: "T-201",
    description:
      "Process temperature is trending 4.6°C above its normal operating envelope.",
    recommendation:
      "Check cooling performance and verify temperature transmitter calibration before process deviation becomes critical.",
    confidence: 91,
    time: "13 min ago",
  },
  {
    id: 3,
    severity: "warning",
    title: "Flow Instability",
    equipment: "FT-304",
    description:
      "Flow signal shows increasing oscillation during the last 45 minutes.",
    recommendation:
      "Check control valve response, upstream pressure stability and possible sensor noise.",
    confidence: 88,
    time: "27 min ago",
  },
  {
    id: 4,
    severity: "info",
    title: "Energy Optimization Opportunity",
    equipment: "MCC-01",
    description:
      "AI identified operating periods where motor loading remains below the optimal efficiency zone.",
    recommendation:
      "Evaluate load balancing and operating schedule to reduce unnecessary electrical consumption.",
    confidence: 84,
    time: "41 min ago",
  },
];

export default function AIScada() {
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
     * const response = await fetch("/api/ai/scada/analyze", {
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
    "Apakah ada kondisi proses yang abnormal?",
    "Kenapa pressure P-101 turun?",
    "Equipment mana yang paling berisiko?",
    "Cari potensi failure dari trend SCADA",
    "Apa alarm yang harus diprioritaskan?",
    "Bagaimana meningkatkan efisiensi proses?",
  ];

  return (
    <div className="ai-scada-page">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="ai-scada-header">
        <div className="ai-scada-title">
          <div className="ai-scada-title-icon">
            <BrainCircuit size={28} />
          </div>

          <div>
            <div className="ai-scada-eyebrow">
              INDUSTRIAL INTELLIGENCE ENGINE
            </div>

            <h1>AI SCADA Intelligence</h1>

            <p>
              AI-powered process monitoring, anomaly detection, diagnostics and
              predictive intelligence.
            </p>
          </div>
        </div>

        <button
          className="ai-scada-refresh"
          onClick={() => window.location.reload()}
        >
          <RefreshCw size={17} />
          Refresh Intelligence
        </button>
      </div>

      {/* =====================================================
          SYSTEM STATUS
      ===================================================== */}

      <div className="ai-scada-status">
        <div className="scada-status-left">
          <span className="scada-status-dot" />

          <div>
            <strong>SCADA AI Online</strong>

            <span>Monitoring PLC • DCS • SCADA • Sensors • Alarms</span>
          </div>
        </div>

        <div className="scada-status-right">
          <span>
            <Zap size={14} />
            Real-time Analysis
          </span>

          <span>
            <Activity size={14} />
            1,284 Tags
          </span>

          <span>
            <AlertTriangle size={14} />6 Active Alarms
          </span>

          <span>
            <Waves size={14} />
            Live Process
          </span>
        </div>
      </div>

      {/* =====================================================
          KPI
      ===================================================== */}

      <div className="ai-scada-kpi-grid">
        {scadaKPIs.map((kpi) => {
          const Icon = kpi.icon;

          return (
            <div className="ai-scada-kpi-card" key={kpi.label}>
              <div className="ai-scada-kpi-top">
                <div className="ai-scada-kpi-icon">
                  <Icon size={20} />
                </div>

                <span className={`scada-kpi-trend ${kpi.trend}`}>
                  {kpi.trend === "up" && <ArrowUpRight size={15} />}

                  {kpi.trend === "down" && <ArrowDownRight size={15} />}

                  {kpi.trend === "stable" && <Activity size={14} />}

                  {kpi.change}
                </span>
              </div>

              <div className="ai-scada-kpi-value">{kpi.value}</div>

              <div className="ai-scada-kpi-label">{kpi.label}</div>
            </div>
          );
        })}
      </div>

      {/* =====================================================
          AI COPILOT
      ===================================================== */}

      <section className="ai-scada-copilot">
        <div className="scada-copilot-header">
          <div className="scada-copilot-brand">
            <div className="scada-copilot-icon">
              <Sparkles size={21} />
            </div>

            <div>
              <h2>SCADA Intelligence Copilot</h2>

              <p>
                Ask AI about process conditions, alarms, equipment and abnormal
                trends.
              </p>
            </div>
          </div>

          <div className="scada-ai-badge">
            <BrainCircuit size={14} />
            AI Powered
          </div>
        </div>

        {/* =================================================
            AI MESSAGE
            ================================================= */}

        <div className="scada-chat">
          <div className="scada-chat-avatar">
            <BrainCircuit size={21} />
          </div>

          <div className="scada-chat-content">
            <div className="scada-chat-name">
              ABN SCADA AI
              <span>Industrial Process Intelligence Engine</span>
            </div>

            <div className="scada-chat-message">
              <strong>SCADA intelligence is ready.</strong>

              <p>
                Saya dapat menganalisis tag SCADA, trend proses, alarm,
                equipment status, pressure, temperature, flow, level, energy dan
                pola abnormal untuk membantu engineer menemukan akar masalah.
              </p>

              <div className="scada-capabilities">
                <span>
                  <Gauge size={14} />
                  Process
                </span>

                <span>
                  <AlertTriangle size={14} />
                  Alarm
                </span>

                <span>
                  <TrendingUp size={14} />
                  Trend
                </span>

                <span>
                  <Zap size={14} />
                  Energy
                </span>

                <span>
                  <WrenchIcon />
                  Equipment
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            SUGGESTIONS
            ================================================= */}

        <div className="scada-suggestions">
          <span>Ask SCADA AI:</span>

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

        {/* =================================================
            INPUT
            ================================================= */}

        <div className="ai-scada-input">
          <MessageSquareText size={19} />

          <input
            type="text"
            placeholder="Tanyakan sesuatu tentang proses SCADA..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                askAI();
              }
            }}
          />

          <button
            className="scada-send-button"
            onClick={() => askAI()}
            disabled={loading}
          >
            {loading ? (
              <RefreshCw className="scada-spin" size={18} />
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>

        {/* =================================================
            AI ANSWER
            ================================================= */}

        {lastQuestion && (
          <div className="scada-ai-answer">
            <div className="scada-answer-header">
              <BrainCircuit size={17} />

              <span>SCADA AI Analysis</span>

              <span className="scada-confidence">94% confidence</span>
            </div>

            <div className="scada-question">
              <strong>Query:</strong>
              {lastQuestion}
            </div>

            <p>
              Berdasarkan data proses yang sedang dipantau, AI mendeteksi adanya
              indikasi perubahan operating condition pada beberapa equipment.
              Perubahan pressure, flow dan temperature perlu dibandingkan
              terhadap baseline normal sebelum menentukan penyebab utama.
            </p>

            <div className="scada-diagnosis">
              <div className="diagnosis-item">
                <span className="diagnosis-label">AI Detection</span>

                <strong>Process deviation detected</strong>
              </div>

              <div className="diagnosis-item">
                <span className="diagnosis-label">Primary Suspect</span>

                <strong>Pump / flow control subsystem</strong>
              </div>

              <div className="diagnosis-item">
                <span className="diagnosis-label">Risk</span>

                <strong>Moderate</strong>
              </div>
            </div>

            <div className="scada-recommendation">
              <strong>Recommended Engineering Action</strong>

              <span>
                Bandingkan trend 1h, 6h dan 24h pada pressure, flow, motor
                current dan temperature. Jika deviasi konsisten, lakukan
                pemeriksaan equipment sebelum kondisi berkembang menjadi trip
                atau unplanned shutdown.
              </span>
            </div>
          </div>
        )}
      </section>

      {/* =====================================================
          PROCESS SNAPSHOT
      ===================================================== */}

      <div className="ai-scada-main-grid">
        <section className="ai-scada-process">
          <div className="scada-section-heading">
            <div>
              <span>LIVE PROCESS</span>
              <h2>Process Health Snapshot</h2>
            </div>

            <Activity size={20} />
          </div>

          <div className="process-grid">
            <ProcessMetric
              icon={<Gauge size={18} />}
              label="Pressure"
              value="5.82 bar"
              status="Normal"
              progress={78}
            />

            <ProcessMetric
              icon={<Waves size={18} />}
              label="Flow"
              value="126.4 m³/h"
              status="Normal"
              progress={71}
            />

            <ProcessMetric
              icon={<Thermometer size={18} />}
              label="Temperature"
              value="72.6 °C"
              status="Watch"
              progress={84}
            />

            <ProcessMetric
              icon={<Zap size={18} />}
              label="Power"
              value="184 kW"
              status="Normal"
              progress={63}
            />
          </div>
        </section>

        {/* =================================================
            AI HEALTH
            ================================================= */}

        <section className="ai-scada-health">
          <div className="scada-section-heading">
            <div>
              <span>AI ASSESSMENT</span>
              <h2>Process Health</h2>
            </div>

            <Sparkles size={20} />
          </div>

          <div className="health-score">
            <div className="health-circle">
              <strong>86</strong>

              <span>/100</span>
            </div>

            <div>
              <strong>Healthy Process</strong>

              <p>Minor deviations detected.</p>
            </div>
          </div>

          <div className="health-factors">
            <div>
              <CheckCircle2 size={16} />
              <span>Pressure stability</span>
              <b>Good</b>
            </div>

            <div>
              <CheckCircle2 size={16} />
              <span>Flow stability</span>
              <b>Good</b>
            </div>

            <div>
              <AlertTriangle size={16} />
              <span>Temperature trend</span>
              <b>Watch</b>
            </div>

            <div>
              <CheckCircle2 size={16} />
              <span>Energy loading</span>
              <b>Good</b>
            </div>
          </div>
        </section>
      </div>

      {/* =====================================================
          AI INSIGHTS
      ===================================================== */}

      <section className="ai-scada-insights">
        <div className="scada-section-heading">
          <div>
            <span>AI DETECTION ENGINE</span>

            <h2>SCADA Intelligence Insights</h2>
          </div>

          <div className="scada-live">
            <span />
            Live
          </div>
        </div>

        <div className="scada-insight-grid">
          {scadaInsights.map((insight) => (
            <div
              className={`scada-insight-card ${insight.severity}`}
              key={insight.id}
            >
              <div className="scada-insight-top">
                <div className="scada-severity">
                  {insight.severity === "critical" ? (
                    <AlertTriangle size={17} />
                  ) : insight.severity === "warning" ? (
                    <AlertTriangle size={17} />
                  ) : (
                    <CheckCircle2 size={17} />
                  )}

                  {insight.severity.toUpperCase()}
                </div>

                <span>{insight.time}</span>
              </div>

              <h3>{insight.title}</h3>

              <div className="equipment-tag">{insight.equipment}</div>

              <p>{insight.description}</p>

              <div className="scada-insight-action">
                <strong>AI Recommendation</strong>

                <span>{insight.recommendation}</span>
              </div>

              <div className="scada-insight-footer">
                <span>AI Confidence</span>

                <b>{insight.confidence}%</b>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div className="ai-scada-footer">
        <BrainCircuit size={17} />

        <span>ABN Industrial Intelligence Engine</span>

        <span>•</span>

        <span>SCADA Intelligence Layer</span>

        <span>•</span>

        <span>AI recommendations require engineering validation</span>
      </div>
    </div>
  );
}

/* =========================================================
   PROCESS METRIC
   ========================================================= */

interface ProcessMetricProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  status: string;
  progress: number;
}

function ProcessMetric({
  icon,
  label,
  value,
  status,
  progress,
}: ProcessMetricProps) {
  return (
    <div className="process-metric">
      <div className="process-metric-top">
        <div className="process-metric-icon">{icon}</div>

        <span
          className={
            status === "Watch" ? "process-status watch" : "process-status"
          }
        >
          {status}
        </span>
      </div>

      <div className="process-value">{value}</div>

      <div className="process-label">{label}</div>

      <div className="process-progress">
        <span
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
}

/* =========================================================
   SIMPLE EQUIPMENT ICON
   ========================================================= */

function WrenchIcon() {
  return <WrenchFallbackIcon />;
}

function WrenchFallbackIcon() {
  return <Zap size={14} />;
}
