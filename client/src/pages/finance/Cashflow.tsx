import React from "react";
import {
  ArrowDownLeft,
  ArrowDownRight,
  ArrowUpRight,
  Banknote,
  // BarChart3,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  // FileText,
  Landmark,
  Receipt,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import "./Cashflow.css";

/* =========================================================
 * TYPES
 * ========================================================= */

type CashKPI = {
  title: string;
  value: string;
  subtitle: string;
  change: string;
  positive: boolean;
  icon: React.ElementType;
  tone: "blue" | "green" | "red" | "purple";
};

type CashTransaction = {
  id: string;
  description: string;
  category: string;
  date: string;
  amount: string;
  type: "IN" | "OUT";
  status: "Completed" | "Pending";
};

type BreakdownItem = {
  label: string;
  value: string;
  percentage: number;
  tone: "blue" | "green" | "orange" | "purple" | "red";
};

type ProjectionItem = {
  month: string;
  inflow: string;
  outflow: string;
  net: string;
};

/* =========================================================
 * KPI DATA
 * ========================================================= */

const cashKpis: CashKPI[] = [
  {
    title: "Cash Position",
    value: "Rp 42.68 M",
    subtitle: "Current available cash",
    change: "+8.4%",
    positive: true,
    icon: Wallet,
    tone: "blue",
  },
  {
    title: "Cash Inflow",
    value: "Rp 18.42 M",
    subtitle: "Current period",
    change: "+12.8%",
    positive: true,
    icon: ArrowDownLeft,
    tone: "green",
  },
  {
    title: "Cash Outflow",
    value: "Rp 11.76 M",
    subtitle: "Current period",
    change: "-4.6%",
    positive: true,
    icon: ArrowUpRight,
    tone: "red",
  },
  {
    title: "Net Cashflow",
    value: "Rp 6.66 M",
    subtitle: "Current period",
    change: "+18.2%",
    positive: true,
    icon: TrendingUp,
    tone: "purple",
  },
];

/* =========================================================
 * MONTHLY CASHFLOW
 * ========================================================= */

const monthlyCashflow = [
  {
    month: "Jan",
    inflow: 62,
    outflow: 48,
  },
  {
    month: "Feb",
    inflow: 68,
    outflow: 51,
  },
  {
    month: "Mar",
    inflow: 73,
    outflow: 55,
  },
  {
    month: "Apr",
    inflow: 69,
    outflow: 52,
  },
  {
    month: "May",
    inflow: 78,
    outflow: 57,
  },
  {
    month: "Jun",
    inflow: 84,
    outflow: 61,
  },
  {
    month: "Jul",
    inflow: 81,
    outflow: 64,
  },
  {
    month: "Aug",
    inflow: 91,
    outflow: 67,
  },
  {
    month: "Sep",
    inflow: 96,
    outflow: 70,
  },
  {
    month: "Oct",
    inflow: 102,
    outflow: 73,
  },
  {
    month: "Nov",
    inflow: 108,
    outflow: 76,
  },
  {
    month: "Dec",
    inflow: 116,
    outflow: 79,
  },
];

/* =========================================================
 * INFLOW
 * ========================================================= */

const inflowBreakdown: BreakdownItem[] = [
  {
    label: "Customer Payments",
    value: "Rp 11.84 M",
    percentage: 64,
    tone: "green",
  },
  {
    label: "Sales Receivables",
    value: "Rp 3.26 M",
    percentage: 18,
    tone: "blue",
  },
  {
    label: "Other Operating Income",
    value: "Rp 1.82 M",
    percentage: 10,
    tone: "purple",
  },
  {
    label: "Other Receipts",
    value: "Rp 1.50 M",
    percentage: 8,
    tone: "orange",
  },
];

/* =========================================================
 * OUTFLOW
 * ========================================================= */

const outflowBreakdown: BreakdownItem[] = [
  {
    label: "Procurement",
    value: "Rp 4.28 M",
    percentage: 36,
    tone: "red",
  },
  {
    label: "Payroll",
    value: "Rp 2.46 M",
    percentage: 21,
    tone: "orange",
  },
  {
    label: "Maintenance",
    value: "Rp 1.86 M",
    percentage: 16,
    tone: "blue",
  },
  {
    label: "Operations",
    value: "Rp 1.74 M",
    percentage: 15,
    tone: "purple",
  },
  {
    label: "Other Expenses",
    value: "Rp 1.42 M",
    percentage: 12,
    tone: "green",
  },
];

/* =========================================================
 * TRANSACTIONS
 * ========================================================= */

const transactions: CashTransaction[] = [
  {
    id: "CF-2026-09142",
    description: "Customer Payment - PT Semen Tonasa",
    category: "Receivable",
    date: "14 Sep 2026",
    amount: "Rp 428.500.000",
    type: "IN",
    status: "Completed",
  },
  {
    id: "CF-2026-09141",
    description: "Raw Material Procurement",
    category: "Procurement",
    date: "14 Sep 2026",
    amount: "Rp 286.750.000",
    type: "OUT",
    status: "Completed",
  },
  {
    id: "CF-2026-09140",
    description: "Customer Payment - Biringkassi Raya",
    category: "Receivable",
    date: "13 Sep 2026",
    amount: "Rp 315.200.000",
    type: "IN",
    status: "Completed",
  },
  {
    id: "CF-2026-09139",
    description: "Fleet Fuel Expense",
    category: "Operations",
    date: "13 Sep 2026",
    amount: "Rp 142.800.000",
    type: "OUT",
    status: "Pending",
  },
  {
    id: "CF-2026-09138",
    description: "Maintenance Contractor Payment",
    category: "Maintenance",
    date: "12 Sep 2026",
    amount: "Rp 194.600.000",
    type: "OUT",
    status: "Completed",
  },
];

/* =========================================================
 * PROJECTION
 * ========================================================= */

const projections: ProjectionItem[] = [
  {
    month: "October",
    inflow: "Rp 20.4 M",
    outflow: "Rp 13.8 M",
    net: "Rp 6.6 M",
  },
  {
    month: "November",
    inflow: "Rp 22.1 M",
    outflow: "Rp 14.2 M",
    net: "Rp 7.9 M",
  },
  {
    month: "December",
    inflow: "Rp 24.6 M",
    outflow: "Rp 15.1 M",
    net: "Rp 9.5 M",
  },
];

/* =========================================================
 * HELPERS
 * ========================================================= */

const maxCashflow = Math.max(
  ...monthlyCashflow.flatMap((item) => [item.inflow, item.outflow]),
);

/* =========================================================
 * COMPONENT
 * ========================================================= */

const Cashflow: React.FC = () => {
  return (
    <div className="cashflow-page">
      {/* =====================================================
       * HEADER
       * ===================================================== */}

      <div className="cashflow-header">
        <div>
          <div className="cashflow-eyebrow">
            <CircleDollarSign size={15} />
            FINANCE & TREASURY
          </div>

          <h1>Cashflow</h1>

          <p>
            Monitor cash position, inflows, outflows and projected liquidity
            across the organization.
          </p>
        </div>

        <div className="cashflow-header-actions">
          <button className="cashflow-date-button">
            <CalendarDays size={17} />
            01 Sep – 30 Sep 2026
          </button>

          <button className="cashflow-primary-button">
            <Banknote size={17} />
            Record Transaction
          </button>
        </div>
      </div>

      {/* =====================================================
       * KPI
       * ===================================================== */}

      <div className="cashflow-kpi-grid">
        {cashKpis.map((kpi) => {
          const Icon = kpi.icon;

          return (
            <div className={`cashflow-kpi-card ${kpi.tone}`} key={kpi.title}>
              <div className="cashflow-kpi-top">
                <div className="cashflow-kpi-icon">
                  <Icon size={21} />
                </div>

                <div
                  className={`cashflow-kpi-change ${
                    kpi.positive ? "positive" : "negative"
                  }`}
                >
                  {kpi.positive ? (
                    <ArrowUpRight size={14} />
                  ) : (
                    <ArrowDownRight size={14} />
                  )}

                  {kpi.change}
                </div>
              </div>

              <div className="cashflow-kpi-title">{kpi.title}</div>

              <div className="cashflow-kpi-value">{kpi.value}</div>

              <div className="cashflow-kpi-subtitle">{kpi.subtitle}</div>
            </div>
          );
        })}
      </div>

      {/* =====================================================
       * CASHFLOW OVERVIEW
       * ===================================================== */}

      <div className="cashflow-main-grid">
        <section className="cashflow-card cashflow-overview-card">
          <div className="cashflow-card-header">
            <div>
              <span className="cashflow-card-eyebrow">CASH MOVEMENT</span>

              <h2>Cashflow Overview</h2>
            </div>

            <button className="cashflow-card-action">
              This Year
              <ChevronRight size={15} />
            </button>
          </div>

          <div className="cashflow-summary">
            <div className="cashflow-summary-item">
              <span>Cash Inflow</span>
              <strong className="cashflow-in-value">Rp 18.42 M</strong>
            </div>

            <div className="cashflow-summary-item">
              <span>Cash Outflow</span>
              <strong className="cashflow-out-value">Rp 11.76 M</strong>
            </div>

            <div className="cashflow-summary-item">
              <span>Net Cashflow</span>
              <strong className="cashflow-net-value">Rp 6.66 M</strong>
            </div>
          </div>

          <div className="cashflow-chart">
            <div className="cashflow-chart-y">
              <span>120</span>
              <span>90</span>
              <span>60</span>
              <span>30</span>
              <span>0</span>
            </div>

            <div className="cashflow-chart-area">
              <div className="cashflow-grid-line line-1" />
              <div className="cashflow-grid-line line-2" />
              <div className="cashflow-grid-line line-3" />
              <div className="cashflow-grid-line line-4" />
              <div className="cashflow-grid-line line-5" />

              <div className="cashflow-bars">
                {monthlyCashflow.map((item) => (
                  <div className="cashflow-bar-column" key={item.month}>
                    <div className="cashflow-bar-group">
                      <div
                        className="cashflow-bar inflow"
                        style={{
                          height: `${(item.inflow / maxCashflow) * 100}%`,
                        }}
                        title={`${item.month} inflow`}
                      />

                      <div
                        className="cashflow-bar outflow"
                        style={{
                          height: `${(item.outflow / maxCashflow) * 100}%`,
                        }}
                        title={`${item.month} outflow`}
                      />
                    </div>

                    <span>{item.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="cashflow-chart-legend">
            <span>
              <i className="legend-dot inflow" />
              Inflow
            </span>

            <span>
              <i className="legend-dot outflow" />
              Outflow
            </span>
          </div>
        </section>

        {/* =====================================================
         * CASH POSITION
         * ===================================================== */}

        <section className="cashflow-card cash-position-card">
          <div className="cashflow-card-header">
            <div>
              <span className="cashflow-card-eyebrow">LIQUIDITY</span>

              <h2>Cash Position</h2>
            </div>

            <Wallet size={20} />
          </div>

          <div className="cash-position-value">
            <span>Available Cash</span>
            <strong>Rp 42.68 M</strong>
          </div>

          <div className="cash-position-meter">
            <div className="cash-position-meter-head">
              <span>Liquidity Utilization</span>
              <strong>64.8%</strong>
            </div>

            <div className="cash-position-track">
              <div className="cash-position-fill" style={{ width: "64.8%" }} />
            </div>
          </div>

          <div className="cash-position-grid">
            <div>
              <span>Bank Accounts</span>
              <strong>Rp 28.42 M</strong>
            </div>

            <div>
              <span>Petty Cash</span>
              <strong>Rp 2.86 M</strong>
            </div>

            <div>
              <span>Receivables</span>
              <strong>Rp 14.62 M</strong>
            </div>

            <div>
              <span>Payables</span>
              <strong>Rp 9.42 M</strong>
            </div>
          </div>

          <div className="cash-position-status">
            <CheckCircle2 size={17} />

            <div>
              <strong>Healthy Liquidity</strong>
              <span>
                Current cash position is above the minimum operating threshold.
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* =====================================================
       * INFLOW / OUTFLOW
       * ===================================================== */}

      <div className="cashflow-two-column">
        <section className="cashflow-card">
          <div className="cashflow-card-header">
            <div>
              <span className="cashflow-card-eyebrow">CASH RECEIPTS</span>

              <h2>Cash Inflow Breakdown</h2>
            </div>

            <ArrowDownLeft size={19} className="cashflow-header-green" />
          </div>

          <div className="breakdown-list">
            {inflowBreakdown.map((item) => (
              <div className="breakdown-item" key={item.label}>
                <div className="breakdown-top">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>

                <div className="breakdown-progress">
                  <div
                    className={`breakdown-progress-fill ${item.tone}`}
                    style={{
                      width: `${item.percentage}%`,
                    }}
                  />
                </div>

                <div className="breakdown-percentage">
                  {item.percentage}% of total inflow
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="cashflow-card">
          <div className="cashflow-card-header">
            <div>
              <span className="cashflow-card-eyebrow">CASH PAYMENTS</span>

              <h2>Cash Outflow Breakdown</h2>
            </div>

            <ArrowUpRight size={19} className="cashflow-header-red" />
          </div>

          <div className="breakdown-list">
            {outflowBreakdown.map((item) => (
              <div className="breakdown-item" key={item.label}>
                <div className="breakdown-top">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>

                <div className="breakdown-progress">
                  <div
                    className={`breakdown-progress-fill ${item.tone}`}
                    style={{
                      width: `${item.percentage}%`,
                    }}
                  />
                </div>

                <div className="breakdown-percentage">
                  {item.percentage}% of total outflow
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* =====================================================
       * TRANSACTIONS
       * ===================================================== */}

      <section className="cashflow-card cash-transactions-card">
        <div className="cashflow-card-header">
          <div>
            <span className="cashflow-card-eyebrow">
              TRANSACTION MONITORING
            </span>

            <h2>Recent Cash Transactions</h2>
          </div>

          <button className="cashflow-card-action">
            View All Transactions
            <ChevronRight size={15} />
          </button>
        </div>

        <div className="cashflow-table-wrapper">
          <table className="cashflow-table">
            <thead>
              <tr>
                <th>Transaction</th>
                <th>Category</th>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>
                    <div className="cash-transaction-id">
                      <div
                        className={`cash-transaction-icon ${
                          transaction.type === "IN" ? "in" : "out"
                        }`}
                      >
                        {transaction.type === "IN" ? (
                          <ArrowDownLeft size={15} />
                        ) : (
                          <ArrowUpRight size={15} />
                        )}
                      </div>

                      <div>
                        <strong>{transaction.description}</strong>

                        <span>{transaction.id}</span>
                      </div>
                    </div>
                  </td>

                  <td>{transaction.category}</td>

                  <td>{transaction.date}</td>

                  <td>
                    <span
                      className={`cash-type ${
                        transaction.type === "IN"
                          ? "cash-type-in"
                          : "cash-type-out"
                      }`}
                    >
                      {transaction.type === "IN" ? "INCOME" : "EXPENSE"}
                    </span>
                  </td>

                  <td>
                    <strong
                      className={
                        transaction.type === "IN" ? "amount-in" : "amount-out"
                      }
                    >
                      {transaction.type === "IN" ? "+" : "-"}
                      {transaction.amount}
                    </strong>
                  </td>

                  <td>
                    <span
                      className={`cash-status ${
                        transaction.status === "Completed"
                          ? "completed"
                          : "pending"
                      }`}
                    >
                      <span />
                      {transaction.status}
                    </span>
                  </td>

                  <td>
                    <button className="cash-table-action">
                      <ChevronRight size={17} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* =====================================================
       * CASHFLOW PROJECTION
       * ===================================================== */}

      <section className="cashflow-card cash-projection-card">
        <div className="cashflow-card-header">
          <div>
            <span className="cashflow-card-eyebrow">LIQUIDITY PLANNING</span>

            <h2>Cashflow Projection</h2>
          </div>

          <div className="projection-header-icon">
            <TrendingUp size={18} />
          </div>
        </div>

        <div className="projection-grid">
          {projections.map((projection) => (
            <div className="projection-month" key={projection.month}>
              <div className="projection-month-header">
                <strong>{projection.month}</strong>

                <span>
                  <TrendingUp size={13} />
                  Positive
                </span>
              </div>

              <div className="projection-row">
                <span>Expected Inflow</span>
                <strong className="projection-in">{projection.inflow}</strong>
              </div>

              <div className="projection-row">
                <span>Expected Outflow</span>
                <strong className="projection-out">{projection.outflow}</strong>
              </div>

              <div className="projection-divider" />

              <div className="projection-net">
                <span>Net Cashflow</span>
                <strong>{projection.net}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
       * FOOTER STATS
       * ===================================================== */}

      <div className="cashflow-footer-stats">
        <div className="cashflow-mini-stat">
          <div className="cashflow-mini-icon">
            <Landmark size={18} />
          </div>

          <div>
            <span>Bank Balance</span>
            <strong>Rp 28.42 M</strong>
          </div>
        </div>

        <div className="cashflow-mini-stat">
          <div className="cashflow-mini-icon">
            <Receipt size={18} />
          </div>

          <div>
            <span>Receivables</span>
            <strong>Rp 14.62 M</strong>
          </div>
        </div>

        <div className="cashflow-mini-stat">
          <div className="cashflow-mini-icon">
            <CreditCard size={18} />
          </div>

          <div>
            <span>Payables</span>
            <strong>Rp 9.42 M</strong>
          </div>
        </div>

        <div className="cashflow-mini-stat">
          <div className="cashflow-mini-icon">
            <TrendingDown size={18} />
          </div>

          <div>
            <span>Burn Rate</span>
            <strong>Rp 11.76 M</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cashflow;
