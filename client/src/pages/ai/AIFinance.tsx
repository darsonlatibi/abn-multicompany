import { useState } from "react";
import type { ElementType, ReactNode } from "react";

import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Banknote,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  CreditCard,
  DollarSign,
  Gauge,
  LineChart,
  MessageSquareText,
  PieChart,
  RefreshCw,
  Search,
  Send,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";

import "./AIFinance.css";

interface FinanceKPI {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "stable";
  icon: ElementType;
}

interface FinanceRisk {
  id: number;
  title: string;
  category: string;
  severity: "critical" | "high" | "medium" | "low";
  value: string;
  impact: string;
  description: string;
  recommendation: string;
  time: string;
}

interface FinanceInsight {
  id: number;
  title: string;
  area: string;
  severity: "critical" | "warning" | "info";
  description: string;
  recommendation: string;
  confidence: number;
}

const financeKPIs: FinanceKPI[] = [
  {
    label: "Cash Position",
    value: "Rp 8.42 M",
    change: "+6.8%",
    trend: "up",
    icon: Wallet,
  },
  {
    label: "Gross Margin",
    value: "27.6%",
    change: "+2.4%",
    trend: "up",
    icon: TrendingUp,
  },
  {
    label: "Receivable Risk",
    value: "18 / 100",
    change: "-4",
    trend: "down",
    icon: CreditCard,
  },
  {
    label: "Operating Efficiency",
    value: "91.2%",
    change: "+3.1%",
    trend: "up",
    icon: Gauge,
  },
];

const financeRisks: FinanceRisk[] = [
  {
    id: 1,
    title: "Receivable Aging Risk",
    category: "Accounts Receivable",
    severity: "critical",
    value: "Rp 1.24 M",
    impact: "High",
    description:
      "AI menemukan peningkatan invoice overdue pada beberapa customer dengan aging di atas normal.",
    recommendation:
      "Prioritaskan collection untuk invoice high-value dan customer dengan payment behavior yang menurun.",
    time: "7 min ago",
  },
  {
    id: 2,
    title: "Expense Deviation",
    category: "Operating Expenses",
    severity: "high",
    value: "+14.8%",
    impact: "Medium",
    description:
      "Beberapa kategori operating expense berada di atas historical spending baseline.",
    recommendation:
      "Review expense category dengan variance terbesar dan identifikasi transaksi non-recurring.",
    time: "19 min ago",
  },
  {
    id: 3,
    title: "Margin Compression",
    category: "Profitability",
    severity: "medium",
    value: "-2.7%",
    impact: "Medium",
    description:
      "Gross margin menurun pada beberapa product/service group meskipun revenue tetap stabil.",
    recommendation:
      "Analisis perubahan cost, pricing dan product mix sebelum margin terus menurun.",
    time: "34 min ago",
  },
  {
    id: 4,
    title: "Cashflow Opportunity",
    category: "Cash Management",
    severity: "low",
    value: "Rp 640 Jt",
    impact: "Low",
    description:
      "AI menemukan peluang memperbaiki cash conversion melalui optimalisasi payment dan collection cycle.",
    recommendation:
      "Sinkronkan collection schedule dengan payment obligation dan operating cash requirement.",
    time: "52 min ago",
  },
];

const financeInsights: FinanceInsight[] = [
  {
    id: 1,
    title: "Potential Cashflow Pressure",
    area: "Cashflow",
    severity: "critical",
    description:
      "AI memprediksi potensi tekanan cashflow jika receivable collection tidak membaik dalam beberapa minggu berikutnya.",
    recommendation:
      "Prioritaskan collection high-value receivables dan lakukan cashflow scenario analysis.",
    confidence: 95,
  },
  {
    id: 2,
    title: "Expense Anomaly Detected",
    area: "Expense",
    severity: "warning",
    description:
      "AI mendeteksi beberapa expense category dengan pola spending yang berbeda dari historical baseline.",
    recommendation:
      "Review transaksi dan bandingkan terhadap budget serta historical monthly pattern.",
    confidence: 92,
  },
  {
    id: 3,
    title: "Customer Payment Behavior",
    area: "Receivable",
    severity: "warning",
    description:
      "Beberapa customer menunjukkan perubahan payment behavior yang meningkatkan probability overdue.",
    recommendation:
      "Naikkan collection priority dan monitor outstanding invoice secara lebih agresif.",
    confidence: 89,
  },
  {
    id: 4,
    title: "Profit Optimization",
    area: "Margin",
    severity: "info",
    description:
      "AI menemukan peluang meningkatkan margin melalui pricing, cost control dan product mix.",
    recommendation:
      "Fokuskan analisis pada product/customer dengan revenue tinggi tetapi margin rendah.",
    confidence: 86,
  },
];

export default function AIFinance() {
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
     * const response = await fetch("/api/ai/finance/analyze", {
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
    "Bagaimana kondisi cashflow perusahaan?",
    "Customer mana yang paling berisiko overdue?",
    "Cari expense yang abnormal",
    "Kenapa margin turun?",
    "Bagaimana meningkatkan profit?",
    "Prediksi cashflow bulan depan",
  ];

  return (
    <div className="ai-finance-page">
      {/* =====================================================
       * HEADER
       * ===================================================== */}

      <div className="ai-finance-header">
        <div className="ai-finance-title">
          <div className="ai-finance-title-icon">
            <BrainCircuit size={28} />
          </div>

          <div>
            <div className="ai-finance-eyebrow">
              INDUSTRIAL INTELLIGENCE ENGINE
            </div>

            <h1>AI Finance Intelligence</h1>

            <p>
              AI-powered financial monitoring, cashflow intelligence,
              profitability analysis and financial forecasting.
            </p>
          </div>
        </div>

        <button
          className="ai-finance-refresh"
          onClick={() => window.location.reload()}
        >
          <RefreshCw size={17} />
          Refresh Intelligence
        </button>
      </div>

      {/* =====================================================
       * STATUS
       * ===================================================== */}

      <div className="ai-finance-status">
        <div className="finance-status-left">
          <span className="finance-status-dot" />

          <div>
            <strong>Finance AI Online</strong>

            <span>
              Revenue • Invoice • Payment • Expense • Cashflow • Customer
            </span>
          </div>
        </div>

        <div className="finance-status-right">
          <span>
            <Zap size={14} />
            Financial Analysis
          </span>

          <span>
            <DollarSign size={14} />
            Rp 12.8 M Revenue
          </span>

          <span>
            <CreditCard size={14} />
            42 Open Invoices
          </span>

          <span>
            <AlertTriangle size={14} />6 Financial Risks
          </span>
        </div>
      </div>

      {/* =====================================================
       * KPI
       * ===================================================== */}

      <div className="ai-finance-kpi-grid">
        {financeKPIs.map((kpi) => {
          const Icon = kpi.icon;

          return (
            <div className="ai-finance-kpi-card" key={kpi.label}>
              <div className="ai-finance-kpi-top">
                <div className="ai-finance-kpi-icon">
                  <Icon size={20} />
                </div>

                <span className={`finance-kpi-trend ${kpi.trend}`}>
                  {kpi.trend === "up" && <ArrowUpRight size={15} />}
                  {kpi.trend === "down" && <ArrowDownRight size={15} />}
                  {kpi.trend === "stable" && <LineChart size={14} />}

                  {kpi.change}
                </span>
              </div>

              <div className="ai-finance-kpi-value">{kpi.value}</div>

              <div className="ai-finance-kpi-label">{kpi.label}</div>
            </div>
          );
        })}
      </div>

      {/* =====================================================
       * AI COPILOT
       * ===================================================== */}

      <section className="ai-finance-copilot">
        <div className="finance-copilot-header">
          <div className="finance-copilot-brand">
            <div className="finance-copilot-icon">
              <Sparkles size={21} />
            </div>

            <div>
              <h2>Finance Intelligence Copilot</h2>

              <p>
                Ask AI about cashflow, revenue, expenses, receivables,
                profitability and financial risks.
              </p>
            </div>
          </div>

          <div className="finance-ai-badge">
            <BrainCircuit size={14} />
            AI Powered
          </div>
        </div>

        <div className="finance-chat">
          <div className="finance-chat-avatar">
            <BrainCircuit size={21} />
          </div>

          <div className="finance-chat-content">
            <div className="finance-chat-name">
              ABN Finance AI
              <span>Financial Intelligence Engine</span>
            </div>

            <div className="finance-chat-message">
              <strong>Finance intelligence is ready.</strong>

              <p>
                Saya dapat menganalisis revenue, invoice, payment, receivable
                aging, expense, cashflow, margin, customer payment behavior dan
                historical financial performance untuk menemukan risiko serta
                peluang peningkatan profit.
              </p>

              <div className="finance-capabilities">
                <span>
                  <Wallet size={14} />
                  Cashflow
                </span>

                <span>
                  <CreditCard size={14} />
                  Receivable
                </span>

                <span>
                  <DollarSign size={14} />
                  Profit
                </span>

                <span>
                  <PieChart size={14} />
                  Expense
                </span>

                <span>
                  <LineChart size={14} />
                  Forecast
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="finance-suggestions">
          <span>Ask Finance AI:</span>

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

        <div className="ai-finance-input">
          <MessageSquareText size={19} />

          <input
            type="text"
            placeholder="Tanyakan sesuatu tentang keuangan..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                askAI();
              }
            }}
          />

          <button
            className="finance-send-button"
            onClick={() => askAI()}
            disabled={loading}
          >
            {loading ? (
              <RefreshCw className="finance-spin" size={18} />
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>

        {lastQuestion && (
          <div className="finance-ai-answer">
            <div className="finance-answer-header">
              <BrainCircuit size={17} />

              <span>Finance AI Analysis</span>

              <span className="finance-confidence">95% confidence</span>
            </div>

            <div className="finance-question">
              <strong>Query:</strong>
              {lastQuestion}
            </div>

            <p>
              Berdasarkan financial position, transaction pattern, receivable
              aging, expense behavior dan historical cashflow, AI menemukan
              beberapa area yang perlu mendapat perhatian. Prioritas utama
              adalah menjaga cash availability sekaligus meningkatkan
              profitability.
            </p>

            <div className="finance-diagnosis">
              <div className="finance-diagnosis-item">
                <span className="finance-diagnosis-label">AI Detection</span>

                <strong>Financial deviation detected</strong>
              </div>

              <div className="finance-diagnosis-item">
                <span className="finance-diagnosis-label">Primary Area</span>

                <strong>Cashflow / Receivable</strong>
              </div>

              <div className="finance-diagnosis-item">
                <span className="finance-diagnosis-label">Risk</span>

                <strong>Moderate</strong>
              </div>
            </div>

            <div className="finance-recommendation">
              <strong>Recommended Business Action</strong>

              <span>
                Prioritaskan collection invoice bernilai tinggi, review expense
                dengan variance terbesar dan lakukan cashflow scenario analysis
                untuk memastikan liquidity tetap aman.
              </span>
            </div>
          </div>
        )}
      </section>

      {/* =====================================================
       * FINANCIAL HEALTH
       * ===================================================== */}

      <div className="ai-finance-main-grid">
        <section className="ai-finance-health">
          <div className="finance-section-heading">
            <div>
              <span>FINANCIAL INTELLIGENCE</span>
              <h2>Financial Health</h2>
            </div>

            <Gauge size={20} />
          </div>

          <div className="financial-health-content">
            <div className="financial-score">
              <div className="financial-circle">
                <strong>87</strong>
                <span>/100</span>
              </div>

              <div>
                <strong>Healthy Financial Position</strong>

                <p>
                  Financial condition is stable with several optimization
                  opportunities.
                </p>
              </div>
            </div>

            <div className="financial-stat-grid">
              <FinancialStat
                label="Liquidity"
                value="92"
                status="Healthy"
                icon={<Wallet size={16} />}
              />

              <FinancialStat
                label="Profitability"
                value="86"
                status="Good"
                icon={<TrendingUp size={16} />}
              />

              <FinancialStat
                label="Receivable"
                value="74"
                status="Watch"
                icon={<CreditCard size={16} />}
              />
            </div>
          </div>
        </section>

        {/* CASHFLOW */}

        <section className="ai-finance-cashflow">
          <div className="finance-section-heading">
            <div>
              <span>CASHFLOW INTELLIGENCE</span>
              <h2>Cashflow Position</h2>
            </div>

            <Banknote size={20} />
          </div>

          <div className="cashflow-grid">
            <CashflowMetric
              label="Cash In"
              value="Rp 12.8 M"
              change="+8.4%"
              positive
              icon={<ArrowDownRight size={17} />}
            />

            <CashflowMetric
              label="Cash Out"
              value="Rp 9.6 M"
              change="+2.1%"
              positive={false}
              icon={<ArrowUpRight size={17} />}
            />

            <CashflowMetric
              label="Net Cashflow"
              value="Rp 3.2 M"
              change="+14.6%"
              positive
              icon={<TrendingUp size={17} />}
            />

            <CashflowMetric
              label="Forecast"
              value="Rp 3.8 M"
              change="+18.2%"
              positive
              icon={<LineChart size={17} />}
            />
          </div>
        </section>
      </div>

      {/* =====================================================
       * FINANCIAL RISK
       * ===================================================== */}

      <section className="ai-finance-risk-section">
        <div className="finance-section-heading">
          <div>
            <span>FINANCIAL RISK ENGINE</span>
            <h2>Financial Risk Intelligence</h2>
          </div>

          <div className="finance-live">
            <span />
            Live
          </div>
        </div>

        <div className="finance-risk-grid">
          {financeRisks.map((risk) => (
            <div className={`finance-risk-card ${risk.severity}`} key={risk.id}>
              <div className="finance-risk-top">
                <div className="finance-risk-icon">
                  {risk.category === "Accounts Receivable" ? (
                    <CreditCard size={18} />
                  ) : risk.category === "Operating Expenses" ? (
                    <PieChart size={18} />
                  ) : risk.category === "Profitability" ? (
                    <TrendingDown size={18} />
                  ) : (
                    <Wallet size={18} />
                  )}
                </div>

                <span className="finance-risk-status">
                  {risk.severity.toUpperCase()}
                </span>
              </div>

              <div className="finance-risk-title">
                <strong>{risk.title}</strong>
                <span>{risk.category}</span>
              </div>

              <div className="finance-risk-value">
                <div>
                  <span>Impact Value</span>
                  <strong>{risk.value}</strong>
                </div>

                <div>
                  <span>Business Impact</span>
                  <strong>{risk.impact}</strong>
                </div>
              </div>

              <p>{risk.description}</p>

              <div className="finance-risk-recommendation">
                <strong>AI Recommendation</strong>

                <span>{risk.recommendation}</span>
              </div>

              <div className="finance-risk-footer">
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

      <section className="ai-finance-insights">
        <div className="finance-section-heading">
          <div>
            <span>AI DETECTION ENGINE</span>
            <h2>Finance Intelligence Insights</h2>
          </div>

          <Sparkles size={20} />
        </div>

        <div className="finance-insight-grid">
          {financeInsights.map((insight) => (
            <div
              className={`finance-insight-card ${insight.severity}`}
              key={insight.id}
            >
              <div className="finance-insight-top">
                <div className="finance-severity">
                  {insight.severity === "critical" ? (
                    <AlertTriangle size={17} />
                  ) : insight.severity === "warning" ? (
                    <AlertTriangle size={17} />
                  ) : (
                    <CheckCircle2 size={17} />
                  )}

                  {insight.severity.toUpperCase()}
                </div>

                <span>{insight.area}</span>
              </div>

              <h3>{insight.title}</h3>

              <p>{insight.description}</p>

              <div className="finance-insight-action">
                <strong>AI Recommendation</strong>

                <span>{insight.recommendation}</span>
              </div>

              <div className="finance-insight-footer">
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

      <div className="ai-finance-footer">
        <BrainCircuit size={17} />

        <span>ABN Industrial Intelligence Engine</span>

        <span>•</span>

        <span>Finance Intelligence Layer</span>

        <span>•</span>

        <span>AI recommendations require financial validation</span>
      </div>
    </div>
  );
}

/* =========================================================
 * FINANCIAL STAT
 * ========================================================= */

interface FinancialStatProps {
  label: string;
  value: string;
  status: string;
  icon: ReactNode;
}

function FinancialStat({ label, value, status, icon }: FinancialStatProps) {
  return (
    <div className="financial-stat">
      <div className="financial-stat-icon">{icon}</div>

      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>

      <b>{status}</b>
    </div>
  );
}

/* =========================================================
 * CASHFLOW METRIC
 * ========================================================= */

interface CashflowMetricProps {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: ReactNode;
}

function CashflowMetric({
  label,
  value,
  change,
  positive,
  icon,
}: CashflowMetricProps) {
  return (
    <div className="cashflow-metric">
      <div className="cashflow-metric-icon">{icon}</div>

      <div className="cashflow-metric-info">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>

      <b className={positive ? "positive" : "negative"}>{change}</b>
    </div>
  );
}
