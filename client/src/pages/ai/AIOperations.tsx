import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Gauge,
  MessageSquareText,
  RefreshCw,
  Send,
  Sparkles,
  TrendingUp,
  Truck,
  Zap,
} from "lucide-react";

import "./AIOperations.css";

interface Insight {
  id: number;
  severity: "critical" | "warning" | "info";
  title: string;
  description: string;
  area: string;
  confidence: number;
  action: string;
}

export default function AIOperations() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastQuestion, setLastQuestion] = useState("");

  const insights: Insight[] = [
    {
      id: 1,
      severity: "critical",
      title: "Operational efficiency anomaly detected",
      description:
        "AI detected a significant decrease in operational efficiency during the last 6 hours.",
      area: "Operations",
      confidence: 94,
      action: "Investigate affected operational units",
    },
    {
      id: 2,
      severity: "warning",
      title: "Fleet idle time increasing",
      description:
        "Vehicle idle duration is approximately 14.8% above the normal operational baseline.",
      area: "Fleet",
      confidence: 89,
      action: "Review high-idle vehicles",
    },
    {
      id: 3,
      severity: "warning",
      title: "Energy consumption deviation",
      description:
        "Energy consumption is trending above the expected production-adjusted baseline.",
      area: "Energy",
      confidence: 86,
      action: "Analyze energy-intensive processes",
    },
    {
      id: 4,
      severity: "info",
      title: "Operations currently stable",
      description:
        "No critical production disruption detected across monitored operational systems.",
      area: "System",
      confidence: 97,
      action: "Continue monitoring",
    },
  ];

  const askAI = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setLastQuestion(question);

    /*
     * Future Laravel API:
     *
     * POST /api/ai/operations/analyze
     *
     * {
     *   question: question
     * }
     *
     * Response:
     * {
     *   answer: "...",
     *   confidence: 92,
     *   insights: []
     * }
     */

    setTimeout(() => {
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="ai-operations-page">
      {/* =====================================================
          HEADER
         ===================================================== */}

      <div className="ai-operations-header">
        <div className="ai-operations-title">
          <div className="ai-operations-icon">
            <BrainCircuit size={28} />
          </div>

          <div>
            <div className="ai-operations-eyebrow">
              INDUSTRIAL INTELLIGENCE ENGINE
            </div>

            <h1>AI Operations</h1>

            <p>
              ChatGPT-powered operational intelligence for ABN Enterprise
              Management System.
            </p>
          </div>
        </div>

        <button className="ai-refresh-button">
          <RefreshCw size={16} />
          Refresh Intelligence
        </button>
      </div>

      {/* =====================================================
          AI STATUS
         ===================================================== */}

      <div className="ai-status-bar">
        <div className="ai-status-left">
          <span className="ai-live-dot" />

          <strong>AI Intelligence Online</strong>

          <span className="ai-status-divider">•</span>

          <span>Monitoring operational data</span>
        </div>

        <div className="ai-status-right">
          <span>
            <Clock3 size={14} />
            Updated just now
          </span>

          <span>
            <Activity size={14} />
            Real-time analysis
          </span>
        </div>
      </div>

      {/* =====================================================
          KPI CARDS
         ===================================================== */}

      <div className="ai-kpi-grid">
        <div className="ai-kpi-card">
          <div className="ai-kpi-icon blue">
            <Gauge size={21} />
          </div>

          <div className="ai-kpi-content">
            <span>Operational Health</span>
            <strong>91.8%</strong>

            <small className="positive">
              <ArrowUpRight size={13} />
              2.4% vs yesterday
            </small>
          </div>
        </div>

        <div className="ai-kpi-card">
          <div className="ai-kpi-icon green">
            <TrendingUp size={21} />
          </div>

          <div className="ai-kpi-content">
            <span>AI Efficiency Score</span>
            <strong>87.4%</strong>

            <small className="positive">
              <ArrowUpRight size={13} />
              Improving
            </small>
          </div>
        </div>

        <div className="ai-kpi-card">
          <div className="ai-kpi-icon orange">
            <AlertTriangle size={21} />
          </div>

          <div className="ai-kpi-content">
            <span>Active Anomalies</span>
            <strong>7</strong>

            <small className="negative">
              <ArrowUpRight size={13} />2 new today
            </small>
          </div>
        </div>

        <div className="ai-kpi-card">
          <div className="ai-kpi-icon purple">
            <Sparkles size={21} />
          </div>

          <div className="ai-kpi-content">
            <span>AI Recommendations</span>
            <strong>14</strong>

            <small>
              <CheckCircle2 size={13} />9 reviewed
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN GRID
         ===================================================== */}

      <div className="ai-operations-main">
        {/* ===================================================
            AI COPILOT
           =================================================== */}

        <section className="ai-copilot-card">
          <div className="ai-copilot-header">
            <div className="ai-copilot-avatar">
              <BrainCircuit size={24} />
            </div>

            <div>
              <h2>Industrial AI Copilot</h2>

              <p>Ask ChatGPT about your operational performance.</p>
            </div>

            <div className="ai-powered">
              <Sparkles size={13} />
              AI POWERED
            </div>
          </div>

          <div className="ai-copilot-body">
            {!lastQuestion && !loading && (
              <div className="ai-welcome">
                <div className="ai-welcome-icon">
                  <MessageSquareText size={30} />
                </div>

                <h3>What should we investigate?</h3>

                <p>
                  I can analyze operations, fleet, energy, maintenance,
                  productivity, anomalies and business KPIs.
                </p>

                <div className="ai-suggestions">
                  <button
                    onClick={() =>
                      setQuestion(
                        "Why did operational efficiency decrease today?",
                      )
                    }
                  >
                    Why did efficiency decrease today?
                  </button>

                  <button
                    onClick={() =>
                      setQuestion(
                        "Which operational areas require immediate attention?",
                      )
                    }
                  >
                    What needs immediate attention?
                  </button>

                  <button
                    onClick={() =>
                      setQuestion(
                        "Find the biggest operational cost opportunity.",
                      )
                    }
                  >
                    Find cost-saving opportunities
                  </button>
                </div>
              </div>
            )}

            {loading && (
              <div className="ai-thinking">
                <div className="ai-thinking-orb">
                  <BrainCircuit size={28} />
                </div>

                <h3>Industrial AI is thinking...</h3>

                <p>
                  Analyzing operational signals, KPIs and historical patterns.
                </p>

                <div className="ai-thinking-dots">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}

            {lastQuestion && !loading && (
              <div className="ai-answer">
                <div className="ai-user-question">
                  <strong>You</strong>
                  <p>{lastQuestion}</p>
                </div>

                <div className="ai-response">
                  <div className="ai-response-avatar">
                    <BrainCircuit size={20} />
                  </div>

                  <div>
                    <strong>Industrial Intelligence Engine</strong>

                    <p>
                      Based on the current operational indicators, the primary
                      deviation appears to be concentrated in fleet utilization
                      and energy consumption. AI recommends reviewing abnormal
                      idle time, process loading and maintenance-related
                      efficiency losses.
                    </p>

                    <div className="ai-confidence">
                      <span>AI Confidence</span>
                      <strong>92%</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="ai-chat-input">
            <input
              type="text"
              placeholder="Ask Industrial AI anything about operations..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") askAI();
              }}
            />

            <button onClick={askAI} disabled={loading || !question.trim()}>
              <Send size={18} />
            </button>
          </div>
        </section>

        {/* ===================================================
            OPERATIONAL SNAPSHOT
           =================================================== */}

        <section className="ai-snapshot-card">
          <div className="section-heading">
            <div>
              <h2>Operational Snapshot</h2>
              <p>AI monitored system conditions</p>
            </div>

            <Activity size={20} />
          </div>

          <div className="snapshot-list">
            <div className="snapshot-item">
              <div className="snapshot-icon">
                <Truck size={19} />
              </div>

              <div className="snapshot-info">
                <strong>Fleet Utilization</strong>
                <span>113 active vehicles</span>
              </div>

              <div className="snapshot-value">
                <strong>88%</strong>
                <small className="positive">+3.2%</small>
              </div>
            </div>

            <div className="snapshot-item">
              <div className="snapshot-icon">
                <Zap size={19} />
              </div>

              <div className="snapshot-info">
                <strong>Energy Performance</strong>
                <span>Production adjusted</span>
              </div>

              <div className="snapshot-value">
                <strong>79%</strong>
                <small className="negative">-8.4%</small>
              </div>
            </div>

            <div className="snapshot-item">
              <div className="snapshot-icon">
                <Gauge size={19} />
              </div>

              <div className="snapshot-info">
                <strong>Process Stability</strong>
                <span>SCADA / IoT signals</span>
              </div>

              <div className="snapshot-value">
                <strong>94%</strong>
                <small className="positive">+1.8%</small>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* =====================================================
          AI INSIGHTS
         ===================================================== */}

      <section className="ai-insights-section">
        <div className="section-heading">
          <div>
            <h2>AI Operational Insights</h2>

            <p>
              Issues detected automatically by Industrial Intelligence Engine
            </p>
          </div>

          <button className="view-all-button">View all insights</button>
        </div>

        <div className="ai-insights-grid">
          {insights.map((insight) => (
            <div
              className={`ai-insight-card ${insight.severity}`}
              key={insight.id}
            >
              <div className="insight-top">
                <div className="insight-severity">
                  {insight.severity === "critical" && (
                    <AlertTriangle size={17} />
                  )}

                  {insight.severity === "warning" && (
                    <ArrowDownRight size={17} />
                  )}

                  {insight.severity === "info" && <CheckCircle2 size={17} />}

                  {insight.severity.toUpperCase()}
                </div>

                <span>{insight.area}</span>
              </div>

              <h3>{insight.title}</h3>

              <p>{insight.description}</p>

              <div className="insight-bottom">
                <div>
                  <span>AI Confidence</span>
                  <strong>{insight.confidence}%</strong>
                </div>

                <button>Investigate</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          AI FOOTER
         ===================================================== */}

      <div className="ai-engine-footer">
        <BrainCircuit size={18} />

        <span>
          Industrial Intelligence Engine continuously analyzes operational data
          to identify risks, opportunities and performance improvements.
        </span>

        <strong>ABN AI</strong>
      </div>
    </div>
  );
}
