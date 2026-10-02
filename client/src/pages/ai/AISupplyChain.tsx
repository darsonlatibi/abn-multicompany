import { useState } from "react";
import type { ElementType, ReactNode } from "react";

import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  DollarSign,
  //   Gauge,
  //   History,
  MessageSquareText,
  Package,
  RefreshCw,
  Search,
  Send,
  ShoppingCart,
  Sparkles,
  Truck,
  TrendingDown,
  TrendingUp,
  Warehouse,
  Zap,
} from "lucide-react";

import "./AISupplyChain.css";

interface SupplyChainKPI {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "stable";
  icon: ElementType;
}

interface SupplyRisk {
  id: number;
  item: string;
  category: string;
  status: "critical" | "high" | "medium" | "low";
  stock: string;
  reorderPoint: string;
  leadTime: string;
  description: string;
  recommendation: string;
  time: string;
}

interface SupplyInsight {
  id: number;
  title: string;
  area: string;
  severity: "critical" | "warning" | "info";
  description: string;
  recommendation: string;
  confidence: number;
}

const supplyChainKPIs: SupplyChainKPI[] = [
  {
    label: "Inventory Health",
    value: "91.8%",
    change: "+2.6%",
    trend: "up",
    icon: Package,
  },
  {
    label: "Stock Turnover",
    value: "7.4x",
    change: "+0.8x",
    trend: "up",
    icon: TrendingUp,
  },
  {
    label: "Supply Risk",
    value: "22 / 100",
    change: "-5",
    trend: "down",
    icon: AlertTriangle,
  },
  {
    label: "Procurement Savings",
    value: "8.7%",
    change: "+1.9%",
    trend: "up",
    icon: DollarSign,
  },
];

const supplyRisks: SupplyRisk[] = [
  {
    id: 1,
    item: "Industrial Bearing 6205",
    category: "Maintenance Spare Part",
    status: "critical",
    stock: "18 pcs",
    reorderPoint: "40 pcs",
    leadTime: "21 days",
    description:
      "Current stock berada jauh di bawah reorder point sementara historical consumption meningkat 18% dalam 30 hari terakhir.",
    recommendation:
      "Segera buat purchase request dan prioritaskan vendor dengan lead time terpendek.",
    time: "8 min ago",
  },
  {
    id: 2,
    item: "Hydraulic Oil ISO VG 68",
    category: "Lubricant",
    status: "high",
    stock: "420 L",
    reorderPoint: "650 L",
    leadTime: "14 days",
    description:
      "Consumption rate meningkat dan projected stock-out berpotensi terjadi sebelum replenishment berikutnya.",
    recommendation:
      "Naikkan order quantity sekitar 15% dan lakukan vendor confirmation.",
    time: "21 min ago",
  },
  {
    id: 3,
    item: "Electrical Contactor 32A",
    category: "Electrical Spare",
    status: "medium",
    stock: "64 pcs",
    reorderPoint: "75 pcs",
    leadTime: "10 days",
    description:
      "Inventory masih aman tetapi demand variability meningkat pada dua bulan terakhir.",
    recommendation: "Pertahankan safety stock dan monitor consumption weekly.",
    time: "37 min ago",
  },
  {
    id: 4,
    item: "Pneumatic Solenoid Valve",
    category: "Automation Spare",
    status: "low",
    stock: "31 pcs",
    reorderPoint: "35 pcs",
    leadTime: "7 days",
    description:
      "Stock mendekati reorder point namun vendor memiliki delivery reliability yang baik.",
    recommendation:
      "Masukkan ke normal replenishment cycle tanpa emergency purchase.",
    time: "1 hour ago",
  },
];

const supplyInsights: SupplyInsight[] = [
  {
    id: 1,
    title: "Potential Stock-Out",
    area: "Inventory",
    severity: "critical",
    description:
      "AI memprediksi beberapa spare part berpotensi stock-out berdasarkan consumption rate dan supplier lead time.",
    recommendation:
      "Prioritaskan item criticality tinggi dan lakukan replenishment sebelum projected stock-out date.",
    confidence: 96,
  },
  {
    id: 2,
    title: "Supplier Lead Time Deviation",
    area: "Vendor",
    severity: "warning",
    description:
      "Beberapa vendor menunjukkan actual delivery time lebih tinggi dibandingkan contracted lead time.",
    recommendation:
      "Evaluasi vendor performance dan pertimbangkan alternate supplier.",
    confidence: 92,
  },
  {
    id: 3,
    title: "Excess Inventory",
    area: "Warehouse",
    severity: "warning",
    description:
      "AI menemukan inventory dengan turnover rendah dan holding cost yang relatif tinggi.",
    recommendation:
      "Review min-max level dan hentikan replenishment untuk item slow-moving.",
    confidence: 89,
  },
  {
    id: 4,
    title: "Procurement Optimization",
    area: "Procurement",
    severity: "info",
    description:
      "Terdapat peluang konsolidasi purchase order untuk memperoleh volume pricing yang lebih baik.",
    recommendation:
      "Gabungkan demand beberapa department sebelum membuat PO baru.",
    confidence: 86,
  },
];

export default function AISupplyChain() {
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
     * const response = await fetch("/api/ai/supply-chain/analyze", {
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
    "Item apa yang paling berisiko stock-out?",
    "Vendor mana yang performanya menurun?",
    "Cari inventory yang overstock",
    "Bagaimana mengurangi inventory cost?",
    "PO mana yang berpotensi terlambat?",
    "Bagaimana meningkatkan procurement efficiency?",
  ];

  return (
    <div className="ai-supply-page">
      {/* =====================================================
       * HEADER
       * ===================================================== */}

      <div className="ai-supply-header">
        <div className="ai-supply-title">
          <div className="ai-supply-title-icon">
            <BrainCircuit size={28} />
          </div>

          <div>
            <div className="ai-supply-eyebrow">
              INDUSTRIAL INTELLIGENCE ENGINE
            </div>

            <h1>AI Supply Chain Intelligence</h1>

            <p>
              AI-powered inventory optimization, procurement intelligence,
              supplier risk and supply chain forecasting.
            </p>
          </div>
        </div>

        <button
          className="ai-supply-refresh"
          onClick={() => window.location.reload()}
        >
          <RefreshCw size={17} />
          Refresh Intelligence
        </button>
      </div>

      {/* =====================================================
       * STATUS
       * ===================================================== */}

      <div className="ai-supply-status">
        <div className="supply-status-left">
          <span className="supply-status-dot" />

          <div>
            <strong>Supply Chain AI Online</strong>

            <span>
              Inventory • Procurement • Vendors • PO • Receiving • Warehouse
            </span>
          </div>
        </div>

        <div className="supply-status-right">
          <span>
            <Zap size={14} />
            Predictive Analysis
          </span>

          <span>
            <Package size={14} />
            3,842 Items
          </span>

          <span>
            <Truck size={14} />
            126 Vendors
          </span>

          <span>
            <AlertTriangle size={14} />9 Supply Risks
          </span>
        </div>
      </div>

      {/* =====================================================
       * KPI
       * ===================================================== */}

      <div className="ai-supply-kpi-grid">
        {supplyChainKPIs.map((kpi) => {
          const Icon = kpi.icon;

          return (
            <div className="ai-supply-kpi-card" key={kpi.label}>
              <div className="ai-supply-kpi-top">
                <div className="ai-supply-kpi-icon">
                  <Icon size={20} />
                </div>

                <span className={`supply-kpi-trend ${kpi.trend}`}>
                  {kpi.trend === "up" && <ArrowUpRight size={15} />}
                  {kpi.trend === "down" && <ArrowDownRight size={15} />}
                  {kpi.trend === "stable" && <TrendingUp size={14} />}

                  {kpi.change}
                </span>
              </div>

              <div className="ai-supply-kpi-value">{kpi.value}</div>

              <div className="ai-supply-kpi-label">{kpi.label}</div>
            </div>
          );
        })}
      </div>

      {/* =====================================================
       * AI COPILOT
       * ===================================================== */}

      <section className="ai-supply-copilot">
        <div className="supply-copilot-header">
          <div className="supply-copilot-brand">
            <div className="supply-copilot-icon">
              <Sparkles size={21} />
            </div>

            <div>
              <h2>Supply Chain Intelligence Copilot</h2>

              <p>
                Ask AI about inventory, procurement, vendors, purchase orders,
                delivery and supply risks.
              </p>
            </div>
          </div>

          <div className="supply-ai-badge">
            <BrainCircuit size={14} />
            AI Powered
          </div>
        </div>

        <div className="supply-chat">
          <div className="supply-chat-avatar">
            <BrainCircuit size={21} />
          </div>

          <div className="supply-chat-content">
            <div className="supply-chat-name">
              ABN Supply Chain AI
              <span>Supply Chain Intelligence Engine</span>
            </div>

            <div className="supply-chat-message">
              <strong>Supply chain intelligence is ready.</strong>

              <p>
                Saya dapat menganalisis inventory level, consumption, reorder
                point, safety stock, supplier performance, purchase order, lead
                time, delivery reliability dan procurement cost untuk menemukan
                risiko serta peluang optimasi.
              </p>

              <div className="supply-capabilities">
                <span>
                  <Package size={14} />
                  Inventory
                </span>

                <span>
                  <ShoppingCart size={14} />
                  Procurement
                </span>

                <span>
                  <Truck size={14} />
                  Vendor
                </span>

                <span>
                  <Warehouse size={14} />
                  Warehouse
                </span>

                <span>
                  <TrendingUp size={14} />
                  Forecast
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="supply-suggestions">
          <span>Ask Supply Chain AI:</span>

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

        <div className="ai-supply-input">
          <MessageSquareText size={19} />

          <input
            type="text"
            placeholder="Tanyakan sesuatu tentang supply chain..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                askAI();
              }
            }}
          />

          <button
            className="supply-send-button"
            onClick={() => askAI()}
            disabled={loading}
          >
            {loading ? (
              <RefreshCw className="supply-spin" size={18} />
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>

        {lastQuestion && (
          <div className="supply-ai-answer">
            <div className="supply-answer-header">
              <BrainCircuit size={17} />

              <span>Supply Chain AI Analysis</span>

              <span className="supply-confidence">95% confidence</span>
            </div>

            <div className="supply-question">
              <strong>Query:</strong>
              {lastQuestion}
            </div>

            <p>
              Berdasarkan inventory position, consumption trend, supplier lead
              time dan historical purchasing behavior, AI menemukan beberapa
              area supply chain yang membutuhkan perhatian. Prioritas utama
              adalah mencegah stock-out pada critical items tanpa meningkatkan
              inventory secara berlebihan.
            </p>

            <div className="supply-diagnosis">
              <div className="supply-diagnosis-item">
                <span className="supply-diagnosis-label">AI Detection</span>

                <strong>Supply risk detected</strong>
              </div>

              <div className="supply-diagnosis-item">
                <span className="supply-diagnosis-label">Primary Area</span>

                <strong>Inventory / Procurement</strong>
              </div>

              <div className="supply-diagnosis-item">
                <span className="supply-diagnosis-label">Risk</span>

                <strong>Moderate</strong>
              </div>
            </div>

            <div className="supply-recommendation">
              <strong>Recommended Business Action</strong>

              <span>
                Prioritaskan critical inventory berdasarkan projected stock-out
                date, supplier lead time dan equipment criticality. Hindari
                emergency purchase jika replenishment normal masih memungkinkan.
              </span>
            </div>
          </div>
        )}
      </section>

      {/* =====================================================
       * MAIN GRID
       * ===================================================== */}

      <div className="ai-supply-main-grid">
        {/* INVENTORY HEALTH */}

        <section className="ai-supply-health">
          <div className="supply-section-heading">
            <div>
              <span>INVENTORY INTELLIGENCE</span>
              <h2>Inventory Health</h2>
            </div>

            <Package size={20} />
          </div>

          <div className="inventory-health-content">
            <div className="inventory-score">
              <div className="inventory-circle">
                <strong>92</strong>
                <span>/100</span>
              </div>

              <div>
                <strong>Healthy Inventory</strong>

                <p>Most inventory is within optimal operating range.</p>
              </div>
            </div>

            <div className="inventory-stat-grid">
              <InventoryStat
                label="Optimal Stock"
                value="2,916"
                percentage="75.9%"
                icon={<CheckCircle2 size={16} />}
              />

              <InventoryStat
                label="Low Stock"
                value="524"
                percentage="13.6%"
                icon={<AlertTriangle size={16} />}
              />

              <InventoryStat
                label="Overstock"
                value="402"
                percentage="10.5%"
                icon={<TrendingDown size={16} />}
              />
            </div>
          </div>
        </section>

        {/* PROCUREMENT PERFORMANCE */}

        <section className="ai-supply-procurement">
          <div className="supply-section-heading">
            <div>
              <span>PROCUREMENT INTELLIGENCE</span>
              <h2>Procurement Performance</h2>
            </div>

            <ShoppingCart size={20} />
          </div>

          <div className="procurement-metric-list">
            <ProcurementMetric
              icon={<Clock3 size={17} />}
              label="Avg Lead Time"
              value="11.6 days"
              change="-1.4 days"
            />

            <ProcurementMetric
              icon={<CheckCircle2 size={17} />}
              label="On-Time Delivery"
              value="94.2%"
              change="+2.7%"
            />

            <ProcurementMetric
              icon={<DollarSign size={17} />}
              label="Cost Savings"
              value="8.7%"
              change="+1.9%"
            />

            <ProcurementMetric
              icon={<ShoppingCart size={17} />}
              label="PO Cycle Time"
              value="2.8 days"
              change="-0.5 days"
            />
          </div>
        </section>
      </div>

      {/* =====================================================
       * SUPPLY RISK
       * ===================================================== */}

      <section className="ai-supply-risk-section">
        <div className="supply-section-heading">
          <div>
            <span>PREDICTIVE SUPPLY CHAIN ENGINE</span>
            <h2>Supply Risk Intelligence</h2>
          </div>

          <div className="supply-live">
            <span />
            Live
          </div>
        </div>

        <div className="supply-risk-grid">
          {supplyRisks.map((risk) => (
            <div className={`supply-risk-card ${risk.status}`} key={risk.id}>
              <div className="supply-risk-top">
                <div className="supply-item">
                  <div className="supply-item-icon">
                    <Package size={18} />
                  </div>

                  <div>
                    <strong>{risk.item}</strong>
                    <span>{risk.category}</span>
                  </div>
                </div>

                <span className="supply-risk-status">
                  {risk.status.toUpperCase()}
                </span>
              </div>

              <div className="supply-stock-grid">
                <div>
                  <span>Current Stock</span>
                  <strong>{risk.stock}</strong>
                </div>

                <div>
                  <span>Reorder Point</span>
                  <strong>{risk.reorderPoint}</strong>
                </div>

                <div>
                  <span>Lead Time</span>
                  <strong>{risk.leadTime}</strong>
                </div>
              </div>

              <p>{risk.description}</p>

              <div className="supply-risk-recommendation">
                <strong>AI Recommendation</strong>

                <span>{risk.recommendation}</span>
              </div>

              <div className="supply-risk-footer">
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

      <section className="ai-supply-insights">
        <div className="supply-section-heading">
          <div>
            <span>AI DETECTION ENGINE</span>
            <h2>Supply Chain Intelligence Insights</h2>
          </div>

          <Sparkles size={20} />
        </div>

        <div className="supply-insight-grid">
          {supplyInsights.map((insight) => (
            <div
              className={`supply-insight-card ${insight.severity}`}
              key={insight.id}
            >
              <div className="supply-insight-top">
                <div className="supply-severity">
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

              <div className="supply-insight-action">
                <strong>AI Recommendation</strong>

                <span>{insight.recommendation}</span>
              </div>

              <div className="supply-insight-footer">
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

      <div className="ai-supply-footer">
        <BrainCircuit size={17} />

        <span>ABN Industrial Intelligence Engine</span>

        <span>•</span>

        <span>Supply Chain Intelligence Layer</span>

        <span>•</span>

        <span>AI recommendations require business validation</span>
      </div>
    </div>
  );
}

/* =========================================================
 * INVENTORY STAT
 * ========================================================= */

interface InventoryStatProps {
  label: string;
  value: string;
  percentage: string;
  icon: ReactNode;
}

function InventoryStat({ label, value, percentage, icon }: InventoryStatProps) {
  return (
    <div className="inventory-stat">
      <div className="inventory-stat-icon">{icon}</div>

      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>

      <b>{percentage}</b>
    </div>
  );
}

/* =========================================================
 * PROCUREMENT METRIC
 * ========================================================= */

interface ProcurementMetricProps {
  icon: ReactNode;
  label: string;
  value: string;
  change: string;
}

function ProcurementMetric({
  icon,
  label,
  value,
  change,
}: ProcurementMetricProps) {
  return (
    <div className="procurement-metric">
      <div className="procurement-metric-icon">{icon}</div>

      <div className="procurement-metric-info">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>

      <b>{change}</b>
    </div>
  );
}
