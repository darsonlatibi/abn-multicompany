import { useState } from "react";
import type { ElementType } from "react";

import {
  Activity,
  AlertTriangle,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Database,
  FileText,
  Gauge,
  LineChart,
  MessageSquareText,
  RefreshCw,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Users,
  Truck,
  Factory,
  Wrench,
  Package,
  WalletCards,
} from "lucide-react";

import "./AICopilot.css";

/* =========================================================
 * TYPES
 * ========================================================= */

type ModuleKey =
  | "all"
  | "operations"
  | "fleet"
  | "scada"
  | "maintenance"
  | "supply_chain"
  | "finance"
  | "workforce"
  | "crm";

type MessageRole = "user" | "assistant";

interface CopilotMessage {
  id: number;
  role: MessageRole;
  text: string;
  time: string;
  analysis?: AnalysisResult;
}

interface AnalysisResult {
  summary: string;
  findings: {
    title: string;
    description: string;
    severity: "critical" | "warning" | "info";
  }[];
  rootCause: string[];
  recommendation: string[];
  confidence: number;
}

/* =========================================================
 * MODULE CONFIG
 * ========================================================= */

const modules: {
  key: ModuleKey;
  label: string;
  icon: ElementType;
}[] = [
  { key: "all", label: "All Modules", icon: BrainCircuit },
  { key: "operations", label: "Operations", icon: Factory },
  { key: "fleet", label: "Fleet", icon: Truck },
  { key: "scada", label: "SCADA", icon: Activity },
  { key: "maintenance", label: "Maintenance", icon: Wrench },
  { key: "supply_chain", label: "Supply Chain", icon: Package },
  { key: "finance", label: "Finance", icon: WalletCards },
  { key: "workforce", label: "Workforce", icon: Users },
  { key: "crm", label: "CRM", icon: BarChart3 },
];

/* =========================================================
 * SUGGESTED QUESTIONS
 * ========================================================= */

const suggestedQuestions = [
  "Apa yang sedang terjadi di perusahaan?",
  "Kenapa biaya operasional naik?",
  "Analisis fleet dan maintenance",
  "Apa risiko terbesar hari ini?",
  "Buat executive summary",
  "Apa yang harus saya lakukan sekarang?",
];

/* =========================================================
 * DEMO AI ANALYSIS
 * ========================================================= */

function generateAnalysis(question: string): AnalysisResult {
  const q = question.toLowerCase();

  if (q.includes("biaya") || q.includes("operasional") || q.includes("cost")) {
    return {
      summary:
        "Biaya operasional menunjukkan tekanan meningkat. Pola paling kuat terlihat pada kombinasi konsumsi BBM, maintenance, dan overtime workforce.",
      findings: [
        {
          title: "Operating Cost meningkat",
          description:
            "Biaya operasional terindikasi meningkat sekitar 14.8% dibanding baseline.",
          severity: "critical",
        },
        {
          title: "Fuel Cost meningkat",
          description: "Konsumsi BBM fleet menunjukkan kenaikan sekitar 8.7%.",
          severity: "warning",
        },
        {
          title: "Maintenance Cost meningkat",
          description:
            "Biaya maintenance meningkat sekitar 11.4% pada periode berjalan.",
          severity: "warning",
        },
      ],
      rootCause: [
        "Peningkatan konsumsi BBM pada sebagian kendaraan.",
        "Frekuensi maintenance meningkat pada unit tertentu.",
        "Overtime teknisi berkontribusi terhadap kenaikan operating cost.",
      ],
      recommendation: [
        "Identifikasi kendaraan dengan fuel efficiency terendah.",
        "Prioritaskan preventive maintenance untuk unit berisiko tinggi.",
        "Review distribusi overtime teknisi.",
        "Bandingkan cost per vehicle dan cost per trip.",
      ],
      confidence: 94,
    };
  }

  if (
    q.includes("fleet") ||
    q.includes("kendaraan") ||
    q.includes("maintenance")
  ) {
    return {
      summary:
        "Fleet menunjukkan beberapa kendaraan yang membutuhkan perhatian lebih lanjut karena kombinasi utilization, fuel efficiency, dan maintenance risk.",
      findings: [
        {
          title: "Maintenance Risk",
          description:
            "Beberapa kendaraan menunjukkan kombinasi indikator yang mengarah pada risiko maintenance tinggi.",
          severity: "critical",
        },
        {
          title: "Fuel Efficiency Gap",
          description:
            "Terdapat gap konsumsi BBM antar kendaraan pada pola operasi yang serupa.",
          severity: "warning",
        },
        {
          title: "Utilization Imbalance",
          description: "Utilisasi kendaraan belum sepenuhnya merata.",
          severity: "info",
        },
      ],
      rootCause: [
        "Distribusi workload kendaraan belum optimal.",
        "Beberapa unit memiliki pola konsumsi BBM abnormal.",
        "Preventive maintenance kemungkinan belum mengikuti risk score aktual.",
      ],
      recommendation: [
        "Prioritaskan inspection kendaraan dengan risk score tertinggi.",
        "Bandingkan fuel consumption antar kendaraan sekelas.",
        "Optimalkan assignment kendaraan berdasarkan utilization.",
        "Gunakan predictive maintenance untuk unit kritis.",
      ],
      confidence: 91,
    };
  }

  if (q.includes("risiko") || q.includes("risk") || q.includes("masalah")) {
    return {
      summary:
        "Risiko terbesar saat ini berada pada area operasional, fleet, dan cashflow. Tidak semua risiko memiliki dampak yang sama sehingga prioritas perlu berdasarkan severity dan business impact.",
      findings: [
        {
          title: "Operational Cost Risk",
          description: "Kenaikan biaya operasional berpotensi menekan margin.",
          severity: "critical",
        },
        {
          title: "Fleet Maintenance Risk",
          description:
            "Unit tertentu berpotensi mengalami downtime jika tidak dilakukan preventive action.",
          severity: "warning",
        },
        {
          title: "Receivable Risk",
          description:
            "Sebagian invoice membutuhkan monitoring collection lebih ketat.",
          severity: "warning",
        },
      ],
      rootCause: [
        "Cost pressure dari beberapa operational drivers.",
        "Maintenance risk belum sepenuhnya diantisipasi.",
        "Payment behavior beberapa customer perlu dimonitor.",
      ],
      recommendation: [
        "Prioritaskan risiko berdasarkan financial impact.",
        "Lakukan inspection pada fleet berisiko tinggi.",
        "Perketat monitoring invoice overdue.",
        "Review tren risiko setiap hari.",
      ],
      confidence: 89,
    };
  }

  return {
    summary:
      "AI Copilot telah menganalisis konteks ABN EMS. Beberapa indikator operasional menunjukkan peluang optimasi yang dapat ditindaklanjuti.",
    findings: [
      {
        title: "Operational Performance",
        description:
          "Performance secara umum berada pada kondisi stabil dengan beberapa area yang membutuhkan optimasi.",
        severity: "info",
      },
      {
        title: "Cross-Module Opportunity",
        description:
          "Data lintas modul menunjukkan adanya peluang peningkatan efisiensi.",
        severity: "warning",
      },
      {
        title: "Data Monitoring",
        description:
          "Monitoring KPI secara realtime dapat meningkatkan kecepatan pengambilan keputusan.",
        severity: "info",
      },
    ],
    rootCause: [
      "Sebagian KPI masih menunjukkan variasi antar periode.",
      "Beberapa indikator belum terhubung dengan action workflow.",
      "Cross-module correlation dapat ditingkatkan.",
    ],
    recommendation: [
      "Monitor KPI utama secara realtime.",
      "Prioritaskan anomaly berdasarkan business impact.",
      "Hubungkan AI findings dengan workflow approval.",
      "Gunakan AI Copilot untuk investigasi lintas modul.",
    ],
    confidence: 87,
  };
}

/* =========================================================
 * COMPONENT
 * ========================================================= */

export default function AICopilot() {
  const [selectedModule, setSelectedModule] = useState<ModuleKey>("all");

  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: 1,
      role: "assistant",
      time: "Now",
      text: "Halo. Saya ABN Industrial Intelligence Copilot. Saya dapat membantu membaca kondisi bisnis, operasional, SCADA, fleet, maintenance, supply chain, finance, dan workforce secara lintas modul.",
    },
  ]);

  const [thinking, setThinking] = useState(false);

  const [reasoningMode, setReasoningMode] = useState(true);

  /* =======================================================
   * ASK AI
   * ======================================================= */

  const askAI = (input?: string) => {
    const text = (input ?? question).trim();

    if (!text || thinking) {
      return;
    }

    const userMessage: CopilotMessage = {
      id: Date.now(),
      role: "user",
      text,
      time: "Now",
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");
    setThinking(true);

    setTimeout(() => {
      const analysis = generateAnalysis(text);

      const assistantMessage: CopilotMessage = {
        id: Date.now() + 1,
        role: "assistant",
        time: "Now",
        text: analysis.summary,
        analysis,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setThinking(false);
    }, 900);
  };

  /* =======================================================
   * MODULE
   * ======================================================= */

  const activeModule =
    modules.find((item) => item.key === selectedModule) ?? modules[0];

  /* =======================================================
   * RENDER
   * ======================================================= */

  return (
    <div className="ai-copilot-page">
      {/* =====================================================
       * HEADER
       * ===================================================== */}

      <div className="ai-copilot-header">
        <div>
          <div className="ai-copilot-title-row">
            <div className="ai-copilot-logo">
              <BrainCircuit size={25} />
            </div>

            <div>
              <h1>AI Copilot</h1>

              <p>Industrial Intelligence Copilot</p>
            </div>
          </div>
        </div>

        <div className="ai-copilot-header-actions">
          <div className="ai-copilot-live">
            <span className="ai-live-dot" />
            AI Engine Online
          </div>

          <button
            className="ai-icon-button"
            title="Refresh context"
            type="button"
          >
            <RefreshCw size={17} />
          </button>

          <button className="ai-icon-button" title="AI settings" type="button">
            <Settings size={17} />
          </button>
        </div>
      </div>

      {/* =====================================================
       * STATUS BAR
       * ===================================================== */}

      <div className="ai-copilot-status-bar">
        <div className="ai-status-item">
          <Database size={16} />
          <span>EMS Data Connected</span>
          <CheckCircle2 size={15} />
        </div>

        <div className="ai-status-item">
          <LineChart size={16} />
          <span>Cross-Module Reasoning</span>
          <CheckCircle2 size={15} />
        </div>

        <div className="ai-status-item">
          <ShieldCheck size={16} />
          <span>Permission Guard Active</span>
          <CheckCircle2 size={15} />
        </div>

        <div className="ai-status-item">
          <Clock3 size={16} />
          <span>Realtime Context</span>
          <span className="ai-status-value">Live</span>
        </div>
      </div>

      {/* =====================================================
       * MAIN GRID
       * ===================================================== */}

      <div className="ai-copilot-grid">
        {/* ===================================================
         * LEFT SIDEBAR
         * =================================================== */}

        <aside className="ai-copilot-sidebar">
          <div className="ai-panel-header">
            <div>
              <span className="ai-panel-eyebrow">Intelligence Scope</span>

              <h3>Context Modules</h3>
            </div>

            <Gauge size={19} />
          </div>

          <div className="ai-module-list">
            {modules.map((module) => {
              const Icon = module.icon;

              const active = selectedModule === module.key;

              return (
                <button
                  key={module.key}
                  type="button"
                  className={`ai-module-button ${active ? "active" : ""}`}
                  onClick={() => setSelectedModule(module.key)}
                >
                  <Icon size={17} />

                  <span>{module.label}</span>

                  {active && (
                    <ChevronRight size={15} className="module-arrow" />
                  )}
                </button>
              );
            })}
          </div>

          {/* AI MODE */}

          <div className="ai-mode-card">
            <div className="ai-mode-header">
              <Sparkles size={17} />

              <span>Reasoning Mode</span>

              <button
                type="button"
                className={`ai-switch ${reasoningMode ? "active" : ""}`}
                onClick={() => setReasoningMode((prev) => !prev)}
              >
                <span />
              </button>
            </div>

            <p>
              AI menghubungkan KPI, anomaly, trend, dan hubungan antar modul.
            </p>
          </div>

          {/* SECURITY */}

          <div className="ai-security-card">
            <ShieldCheck size={18} />

            <div>
              <strong>Human Approval</strong>

              <span>AI tidak mengeksekusi perubahan tanpa otorisasi.</span>
            </div>
          </div>
        </aside>

        {/* ===================================================
         * CHAT
         * =================================================== */}

        <main className="ai-copilot-chat">
          {/* CHAT HEADER */}

          <div className="ai-chat-header">
            <div className="ai-chat-context">
              <div className="ai-context-icon">
                <activeModule.icon size={18} />
              </div>

              <div>
                <span>Active Intelligence Context</span>

                <strong>{activeModule.label}</strong>
              </div>
            </div>

            <div className="ai-chat-status">
              <span className="ai-live-dot" />
              Ready
            </div>
          </div>

          {/* MESSAGES */}

          <div className="ai-chat-messages">
            {messages.map((message) => (
              <div key={message.id} className={`ai-message ${message.role}`}>
                <div className="ai-message-avatar">
                  {message.role === "assistant" ? (
                    <BrainCircuit size={17} />
                  ) : (
                    <MessageSquareText size={17} />
                  )}
                </div>

                <div className="ai-message-content">
                  <div className="ai-message-meta">
                    <strong>
                      {message.role === "assistant" ? "ABN AI Copilot" : "You"}
                    </strong>

                    <span>{message.time}</span>
                  </div>

                  <div className="ai-message-text">{message.text}</div>

                  {/* ANALYSIS */}

                  {message.analysis && (
                    <div className="ai-analysis">
                      {/* FINDINGS */}

                      <div className="ai-analysis-section">
                        <div className="ai-section-title">
                          <AlertTriangle size={16} />
                          AI Findings
                        </div>

                        <div className="ai-findings">
                          {message.analysis.findings.map((finding, index) => (
                            <div
                              key={index}
                              className={`ai-finding ${finding.severity}`}
                            >
                              <div className="ai-finding-icon">
                                {finding.severity === "critical" ? (
                                  <AlertTriangle size={15} />
                                ) : finding.severity === "warning" ? (
                                  <TrendingDown size={15} />
                                ) : (
                                  <CheckCircle2 size={15} />
                                )}
                              </div>

                              <div>
                                <strong>{finding.title}</strong>

                                <span>{finding.description}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* ROOT CAUSE */}

                      <div className="ai-analysis-section">
                        <div className="ai-section-title">
                          <Search size={16} />
                          Root Cause Hypothesis
                        </div>

                        <ul className="ai-analysis-list">
                          {message.analysis.rootCause.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      {/* RECOMMENDATIONS */}

                      <div className="ai-analysis-section">
                        <div className="ai-section-title">
                          <Sparkles size={16} />
                          Recommended Actions
                        </div>

                        <ul className="ai-analysis-list recommendations">
                          {message.analysis.recommendation.map(
                            (item, index) => (
                              <li key={index}>
                                <CheckCircle2 size={15} />
                                <span>{item}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>

                      {/* CONFIDENCE */}

                      <div className="ai-confidence">
                        <div>
                          <span>AI Confidence</span>

                          <strong>{message.analysis.confidence}%</strong>
                        </div>

                        <div className="ai-confidence-bar">
                          <span
                            style={{
                              width: `${message.analysis.confidence}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* THINKING */}

            {thinking && (
              <div className="ai-message assistant">
                <div className="ai-message-avatar">
                  <BrainCircuit size={17} />
                </div>

                <div className="ai-message-content">
                  <div className="ai-message-meta">
                    <strong>ABN AI Copilot</strong>

                    <span>Analyzing...</span>
                  </div>

                  <div className="ai-thinking">
                    <span />
                    <span />
                    <span />
                    <label>Analyzing EMS context...</label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* =================================================
           * SUGGESTED QUESTIONS
           * ================================================= */}

          <div className="ai-suggestions">
            <div className="ai-suggestions-title">
              <Sparkles size={15} />
              Suggested Intelligence Queries
            </div>

            <div className="ai-suggestions-list">
              {suggestedQuestions.map((item) => (
                <button key={item} type="button" onClick={() => askAI(item)}>
                  {item}
                  <ChevronRight size={14} />
                </button>
              ))}
            </div>
          </div>

          {/* =================================================
           * INPUT
           * ================================================= */}

          <div className="ai-chat-input-area">
            <div className="ai-chat-input">
              <MessageSquareText size={19} />

              <input
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    askAI();
                  }
                }}
                placeholder="Tanyakan sesuatu tentang ABN EMS..."
                disabled={thinking}
              />

              <button
                type="button"
                onClick={() => askAI()}
                disabled={!question.trim() || thinking}
                title="Send"
              >
                <Send size={18} />
              </button>
            </div>

            <div className="ai-input-note">
              <ShieldCheck size={13} />
              AI recommendations require human validation before execution.
            </div>
          </div>
        </main>

        {/* ===================================================
         * RIGHT INTELLIGENCE PANEL
         * =================================================== */}

        <aside className="ai-copilot-intelligence">
          {/* HEALTH */}

          <div className="ai-right-card">
            <div className="ai-panel-header">
              <div>
                <span className="ai-panel-eyebrow">Business Intelligence</span>

                <h3>EMS Health</h3>
              </div>

              <Activity size={19} />
            </div>

            <div className="ai-health-score">
              <div className="ai-score-circle">
                <strong>91</strong>
                <span>/100</span>
              </div>

              <div>
                <strong>Healthy</strong>

                <span>Overall business condition</span>

                <small>
                  <TrendingUp size={13} />
                  +3.8% vs previous period
                </small>
              </div>
            </div>
          </div>

          {/* LIVE KPI */}

          <div className="ai-right-card">
            <div className="ai-panel-header">
              <div>
                <span className="ai-panel-eyebrow">Live Context</span>

                <h3>Key Indicators</h3>
              </div>

              <LineChart size={18} />
            </div>

            <div className="ai-kpi-list">
              <div className="ai-kpi-row">
                <span>Operations</span>
                <strong>92.4%</strong>
              </div>

              <div className="ai-kpi-row">
                <span>Fleet Utilization</span>
                <strong>86.8%</strong>
              </div>

              <div className="ai-kpi-row">
                <span>SCADA Availability</span>
                <strong>98.7%</strong>
              </div>

              <div className="ai-kpi-row">
                <span>Cashflow</span>
                <strong>+Rp 3.2 M</strong>
              </div>

              <div className="ai-kpi-row">
                <span>Workforce</span>
                <strong>89.1%</strong>
              </div>
            </div>
          </div>

          {/* RECENT FINDINGS */}

          <div className="ai-right-card">
            <div className="ai-panel-header">
              <div>
                <span className="ai-panel-eyebrow">AI Monitoring</span>

                <h3>Recent Findings</h3>
              </div>

              <AlertTriangle size={18} />
            </div>

            <div className="ai-recent-findings">
              <div className="ai-mini-finding critical">
                <span />
                <div>
                  <strong>Operating Cost</strong>

                  <small>Critical · 97%</small>
                </div>
              </div>

              <div className="ai-mini-finding warning">
                <span />
                <div>
                  <strong>Fleet Efficiency</strong>

                  <small>Warning · 94%</small>
                </div>
              </div>

              <div className="ai-mini-finding warning">
                <span />
                <div>
                  <strong>Inventory Slow Moving</strong>

                  <small>Warning · 91%</small>
                </div>
              </div>

              <div className="ai-mini-finding info">
                <span />
                <div>
                  <strong>Workforce Productivity</strong>

                  <small>Info · 88%</small>
                </div>
              </div>
            </div>
          </div>

          {/* AI CAPABILITIES */}

          <div className="ai-right-card">
            <div className="ai-panel-header">
              <div>
                <span className="ai-panel-eyebrow">Intelligence Layer</span>

                <h3>Capabilities</h3>
              </div>

              <BrainCircuit size={18} />
            </div>

            <div className="ai-capabilities">
              <div>
                <Search size={15} />
                Detect
              </div>

              <div>
                <LineChart size={15} />
                Predict
              </div>

              <div>
                <BarChart3 size={15} />
                Analyze
              </div>

              <div>
                <Sparkles size={15} />
                Recommend
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* =====================================================
       * FOOTER
       * ===================================================== */}

      <div className="ai-copilot-footer">
        <div>
          <BrainCircuit size={16} />

          <strong>ABN Industrial Intelligence Engine</strong>

          <span>AI Intelligence Layer</span>
        </div>

        <div>
          <FileText size={14} />

          <span>Grounded on ABN EMS operational data</span>
        </div>
      </div>
    </div>
  );
}
