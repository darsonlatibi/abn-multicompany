import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Fuel,
  Gauge,
  MapPin,
  MessageSquareText,
  RefreshCw,
  Send,
  Sparkles,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";

import "./AIFleet.css";

interface FleetInsight {
  id: number;
  severity: "critical" | "warning" | "info";
  title: string;
  description: string;
  action: string;
  confidence: number;
  time: string;
}

interface FleetKPI {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ElementType;
}

const fleetKPIs: FleetKPI[] = [
  {
    label: "Fleet Utilization",
    value: "78.4%",
    change: "+4.8%",
    trend: "up",
    icon: Truck,
  },
  {
    label: "Fuel Efficiency",
    value: "8.7 km/L",
    change: "-6.2%",
    trend: "down",
    icon: Fuel,
  },
  {
    label: "Active Vehicles",
    value: "86 / 102",
    change: "+3",
    trend: "up",
    icon: Activity,
  },
  {
    label: "Maintenance Risk",
    value: "7 Units",
    change: "+2",
    trend: "down",
    icon: Wrench,
  },
];

const insights: FleetInsight[] = [
  {
    id: 1,
    severity: "critical",
    title: "Abnormal Fuel Consumption",
    description:
      "AI detected 5 vehicles consuming 14–22% above their historical operating baseline.",
    action:
      "Prioritize inspection of vehicles TRK-021, TRK-034 and TRK-047. Check idle duration, route deviation and fuel transactions.",
    confidence: 94,
    time: "8 min ago",
  },
  {
    id: 2,
    severity: "warning",
    title: "Idle Time Increasing",
    description:
      "Average engine idle time increased 17.6% compared with the previous operating period.",
    action:
      "Review loading/unloading locations and driver idle behavior during peak operational windows.",
    confidence: 89,
    time: "21 min ago",
  },
  {
    id: 3,
    severity: "warning",
    title: "Maintenance Risk Detected",
    description:
      "7 vehicles show combined signals of high mileage, abnormal temperature and overdue maintenance.",
    action: "Schedule preventive inspection before the next operational cycle.",
    confidence: 91,
    time: "34 min ago",
  },
  {
    id: 4,
    severity: "info",
    title: "Route Optimization Opportunity",
    description:
      "AI identified recurring route segments where average travel time is 11.3% higher than the fleet baseline.",
    action:
      "Evaluate alternative routing during the identified traffic windows.",
    confidence: 86,
    time: "1 hour ago",
  },
];

export default function AIFleet() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastQuestion, setLastQuestion] = useState("");

  const askAI = async (customQuestion?: string) => {
    const q = (customQuestion ?? question).trim();

    if (!q) return;

    setLoading(true);
    setLastQuestion(q);

    // =====================================================
    // FUTURE API
    // =====================================================
    //
    // const response = await fetch("/api/ai/fleet/analyze", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     question: q,
    //   }),
    // });
    //
    // const data = await response.json();
    //
    // =====================================================

    setTimeout(() => {
      setLoading(false);
    }, 1200);
  };

  const suggestedQuestions = [
    "Kenapa konsumsi BBM armada meningkat?",
    "Kendaraan mana yang paling berisiko?",
    "Cari kendaraan yang boros BBM",
    "Apa penyebab utilisasi fleet turun?",
    "Prioritaskan maintenance minggu ini",
  ];

  return (
    <div className="ai-fleet-page">
      {/* =====================================================
          HEADER
      ===================================================== */}
      <div className="ai-fleet-header">
        <div className="ai-fleet-title">
          <div className="ai-fleet-title-icon">
            <BrainCircuit size={28} />
          </div>

          <div>
            <div className="ai-fleet-eyebrow">
              INDUSTRIAL INTELLIGENCE ENGINE
            </div>

            <h1>AI Fleet Intelligence</h1>

            <p>
              AI-powered fleet monitoring, anomaly detection and operational
              optimization.
            </p>
          </div>
        </div>

        <button
          className="ai-fleet-refresh"
          onClick={() => window.location.reload()}
        >
          <RefreshCw size={17} />
          Refresh Intelligence
        </button>
      </div>

      {/* =====================================================
          AI STATUS
      ===================================================== */}
      <div className="ai-fleet-status">
        <div className="ai-status-left">
          <span className="ai-status-dot" />

          <div>
            <strong>Fleet AI Online</strong>
            <span>Monitoring GPS • Fuel • Trips • Driver • Maintenance</span>
          </div>
        </div>

        <div className="ai-status-right">
          <span>
            <Zap size={14} />
            Real-time Analysis
          </span>

          <span>
            <MapPin size={14} />
            GPS Connected
          </span>

          <span>
            <Activity size={14} />
            102 Vehicles
          </span>
        </div>
      </div>

      {/* =====================================================
          KPI
      ===================================================== */}
      <div className="ai-fleet-kpi-grid">
        {fleetKPIs.map((kpi) => {
          const Icon = kpi.icon;

          return (
            <div className="ai-fleet-kpi-card" key={kpi.label}>
              <div className="ai-fleet-kpi-top">
                <div className="ai-fleet-kpi-icon">
                  <Icon size={20} />
                </div>

                <span
                  className={
                    kpi.trend === "up"
                      ? "kpi-trend positive"
                      : "kpi-trend negative"
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

              <div className="ai-fleet-kpi-value">{kpi.value}</div>

              <div className="ai-fleet-kpi-label">{kpi.label}</div>
            </div>
          );
        })}
      </div>

      {/* =====================================================
          AI COPILOT
      ===================================================== */}
      <section className="ai-fleet-copilot">
        <div className="ai-copilot-header">
          <div className="ai-copilot-brand">
            <div className="ai-copilot-icon">
              <Sparkles size={21} />
            </div>

            <div>
              <h2>Fleet Intelligence Copilot</h2>
              <p>
                Ask AI about vehicles, fuel, drivers, routes and maintenance.
              </p>
            </div>
          </div>

          <div className="ai-powered-badge">
            <BrainCircuit size={14} />
            AI Powered
          </div>
        </div>

        <div className="ai-fleet-chat">
          <div className="ai-chat-avatar">
            <BrainCircuit size={21} />
          </div>

          <div className="ai-chat-content">
            <div className="ai-chat-name">
              ABN Fleet AI
              <span>Industrial Intelligence Engine</span>
            </div>

            <div className="ai-chat-message">
              <strong>Fleet intelligence is ready.</strong>

              <p>
                Saya dapat menganalisis performa kendaraan berdasarkan GPS,
                konsumsi BBM, perjalanan, perilaku driver, utilisasi dan histori
                maintenance.
              </p>

              <div className="ai-chat-capabilities">
                <span>
                  <Gauge size={14} />
                  Performance
                </span>

                <span>
                  <Fuel size={14} />
                  Fuel
                </span>

                <span>
                  <MapPin size={14} />
                  GPS
                </span>

                <span>
                  <Wrench size={14} />
                  Maintenance
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Suggested questions */}
        <div className="ai-suggestions">
          <span>Ask Fleet AI:</span>

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

        {/* Input */}
        <div className="ai-fleet-input">
          <MessageSquareText size={19} />

          <input
            type="text"
            placeholder="Tanyakan sesuatu tentang fleet..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                askAI();
              }
            }}
          />

          <button
            className="ai-send-button"
            onClick={() => askAI()}
            disabled={loading}
          >
            {loading ? (
              <RefreshCw className="ai-spin" size={18} />
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>

        {lastQuestion && (
          <div className="ai-demo-answer">
            <div className="ai-answer-header">
              <BrainCircuit size={17} />

              <span>Fleet AI Analysis</span>

              <span className="ai-confidence">92% confidence</span>
            </div>

            <p>
              Berdasarkan pola operasional fleet saat ini, penyimpangan utama
              terlihat pada <strong>konsumsi BBM</strong> dan
              <strong> idle time kendaraan</strong>. AI menemukan beberapa
              kendaraan yang berada di luar baseline normal dan berpotensi
              menyebabkan kenaikan operating cost.
            </p>

            <div className="ai-answer-action">
              <strong>Recommended Action</strong>

              <span>
                Prioritaskan pemeriksaan kendaraan dengan deviasi konsumsi BBM
                tertinggi dan korelasikan dengan idle time, route deviation
                serta histori maintenance.
              </span>
            </div>
          </div>
        )}
      </section>

      {/* =====================================================
          OPERATIONAL SNAPSHOT
      ===================================================== */}
      <div className="ai-fleet-main-grid">
        <section className="ai-fleet-snapshot">
          <div className="section-heading">
            <div>
              <span>LIVE INTELLIGENCE</span>
              <h2>Fleet Operational Snapshot</h2>
            </div>

            <Activity size={20} />
          </div>

          <div className="fleet-snapshot-list">
            <div className="fleet-snapshot-row">
              <div className="snapshot-icon">
                <Truck size={18} />
              </div>

              <div className="snapshot-info">
                <strong>Vehicles Moving</strong>
                <span>Current active fleet</span>
              </div>

              <b>64</b>
            </div>

            <div className="fleet-snapshot-row">
              <div className="snapshot-icon">
                <Clock3 size={18} />
              </div>

              <div className="snapshot-info">
                <strong>Idle Vehicles</strong>
                <span>Engine running without movement</span>
              </div>

              <b>13</b>
            </div>

            <div className="fleet-snapshot-row">
              <div className="snapshot-icon">
                <Wrench size={18} />
              </div>

              <div className="snapshot-info">
                <strong>Maintenance Due</strong>
                <span>Requires preventive action</span>
              </div>

              <b>7</b>
            </div>

            <div className="fleet-snapshot-row">
              <div className="snapshot-icon">
                <AlertTriangle size={18} />
              </div>

              <div className="snapshot-info">
                <strong>AI Anomalies</strong>
                <span>Detected operational deviations</span>
              </div>

              <b>5</b>
            </div>
          </div>
        </section>

        {/* =====================================================
            AI PRIORITY
        ===================================================== */}
        <section className="ai-fleet-priority">
          <div className="section-heading">
            <div>
              <span>AI PRIORITY</span>
              <h2>Recommended Attention</h2>
            </div>

            <Sparkles size={20} />
          </div>

          <div className="priority-score">
            <div className="priority-score-circle">
              <strong>82</strong>
              <span>/100</span>
            </div>

            <div>
              <strong>Fleet Risk Index</strong>

              <p>Moderate operational risk detected.</p>
            </div>
          </div>

          <div className="priority-items">
            <div>
              <AlertTriangle size={17} />
              <span>Fuel anomaly investigation</span>
              <b>HIGH</b>
            </div>

            <div>
              <Wrench size={17} />
              <span>Preventive maintenance</span>
              <b>HIGH</b>
            </div>

            <div>
              <Clock3 size={17} />
              <span>Idle time optimization</span>
              <b>MEDIUM</b>
            </div>
          </div>
        </section>
      </div>

      {/* =====================================================
          AI INSIGHTS
      ===================================================== */}
      <section className="ai-fleet-insights">
        <div className="section-heading">
          <div>
            <span>AI DETECTION ENGINE</span>
            <h2>Fleet Intelligence Insights</h2>
          </div>

          <div className="insight-live">
            <span />
            Live
          </div>
        </div>

        <div className="ai-insight-grid">
          {insights.map((insight) => (
            <div
              className={`ai-insight-card ${insight.severity}`}
              key={insight.id}
            >
              <div className="insight-top">
                <div className="insight-severity">
                  {insight.severity === "critical" ? (
                    <AlertTriangle size={17} />
                  ) : insight.severity === "warning" ? (
                    <AlertTriangle size={17} />
                  ) : (
                    <CheckCircle2 size={17} />
                  )}

                  {insight.severity.toUpperCase()}
                </div>

                <span className="insight-time">{insight.time}</span>
              </div>

              <h3>{insight.title}</h3>

              <p>{insight.description}</p>

              <div className="insight-action">
                <strong>AI Recommendation</strong>

                <span>{insight.action}</span>
              </div>

              <div className="insight-footer">
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
      <div className="ai-fleet-footer">
        <BrainCircuit size={17} />

        <span>ABN Industrial Intelligence Engine</span>

        <span className="footer-separator">•</span>

        <span>Fleet Intelligence Layer</span>

        <span className="footer-separator">•</span>

        <span>AI recommendations require operational validation</span>
      </div>
    </div>
  );
}
