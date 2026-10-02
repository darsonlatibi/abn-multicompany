import {
  AlertTriangle,
  BarChart3,
  Building2,
  ClipboardList,
  CircleDollarSign,
  Package,
  Receipt,
  ShoppingCart,
  Users,
  Wifi,
} from "lucide-react";

import "./KOPKARDashboard.css";

/* =========================================================
   TONASA GROUP
   KOPERASI KARYAWAN
   BUSINESS & COOPERATIVE DASHBOARD
   ========================================================= */

/* =========================================================
   TYPES
   ========================================================= */

type CooperativeStatus = "ACTIVE" | "OPEN" | "CLOSED" | "OFFLINE" | "ALARM";

type ProductCategory = "CONSUMER" | "SERVICE" | "PROVISION" | "OTHER";

interface CooperativeTransaction {
  id: string;
  member: string;
  category: ProductCategory;
  description: string;
  amount: number;
  status: CooperativeStatus;
}

/* =========================================================
   DASHBOARD
   ========================================================= */

function KOPKARDashboard() {
  /* =======================================================
     COMPANY PROFILE
     ======================================================= */

  const company = {
    name: "Koperasi Karyawan Semen Tonasa",
    shortName: "KOPKAR",
    code: "KOPKAR",
    type: "TONASA GROUP",
    status: "OPERATIONAL",
  };

  /* =======================================================
     COOPERATIVE KPI
     ======================================================= */

  /*
   * Data sementara menggunakan safe/default value.
   *
   * Nanti dapat dihubungkan ke:
   *
   * - KOPKAR database
   * - Member database
   * - Product database
   * - Transaction system
   * - POS
   * - Inventory
   * - Finance
   * - Loan / cooperative services
   * - SAP
   * - Payment Gateway
   * - MQTT / IoT
   */

  const operationalSummary = {
    totalMembers: 0,

    activeMembers: 0,

    totalProducts: 0,

    transactionsToday: 0,

    transactionValue: 0,

    alerts: 0,
  };

  /* =======================================================
     BUSINESS PERFORMANCE
     ======================================================= */

  const performance = {
    memberActivity: 0,

    transactionCompletion: 0,

    inventoryAvailability: 0,

    financialPerformance: 0,
  };

  /* =======================================================
     RECENT TRANSACTIONS
     ======================================================= */

  const recentTransactions: CooperativeTransaction[] = [];

  /* =======================================================
     FORMAT CURRENCY
     ======================================================= */

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <main className="kopkar-dashboard-page">
      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="kopkar-dashboard-header">
        <div className="kopkar-company-heading">
          <div className="kopkar-company-icon">
            <Building2 size={22} />
          </div>

          <div>
            <span className="kopkar-dashboard-eyebrow">
              TONASA GROUP • COOPERATIVE
            </span>

            <h1>{company.name}</h1>

            <p>Cooperative business performance and member intelligence</p>
          </div>
        </div>

        <div className="kopkar-server-status">
          <span className="kopkar-status-dot online" />

          <div>
            <strong>{company.status}</strong>

            <small>{company.code} • ABN EMS</small>
          </div>
        </div>
      </header>

      {/* ===================================================
          COMPANY BAR
      =================================================== */}

      <section className="kopkar-company-bar">
        <div className="kopkar-company-info">
          <span className="kopkar-company-badge">{company.code}</span>

          <div>
            <strong>{company.name}</strong>

            <small>Tonasa Group Cooperative Intelligence</small>
          </div>
        </div>

        <div className="kopkar-live-state">
          <span className="kopkar-status-dot online" />
          SYSTEM ONLINE
        </div>
      </section>

      {/* ===================================================
          KPI SUMMARY
      =================================================== */}

      <section className="kopkar-summary">
        {/* MEMBERS */}

        <article className="kopkar-summary-card">
          <div className="kopkar-summary-icon">
            <Users size={21} />
          </div>

          <div className="kopkar-summary-content">
            <span>Members</span>

            <strong>{operationalSummary.totalMembers}</strong>

            <small>Total registered members</small>
          </div>
        </article>

        {/* ACTIVE MEMBERS */}

        <article className="kopkar-summary-card active">
          <div className="kopkar-summary-icon">
            <ShoppingCart size={21} />
          </div>

          <div className="kopkar-summary-content">
            <span>Active Members</span>

            <strong>{operationalSummary.activeMembers}</strong>

            <small>Active cooperative members</small>
          </div>
        </article>

        {/* PRODUCTS */}

        <article className="kopkar-summary-card products">
          <div className="kopkar-summary-icon">
            <Package size={21} />
          </div>

          <div className="kopkar-summary-content">
            <span>Products</span>

            <strong>{operationalSummary.totalProducts}</strong>

            <small>Registered products</small>
          </div>
        </article>

        {/* TRANSACTIONS */}

        <article className="kopkar-summary-card transactions">
          <div className="kopkar-summary-icon">
            <Receipt size={21} />
          </div>

          <div className="kopkar-summary-content">
            <span>Transactions Today</span>

            <strong>{operationalSummary.transactionsToday}</strong>

            <small>Daily transactions</small>
          </div>
        </article>

        {/* ALERTS */}

        <article className="kopkar-summary-card alert">
          <div className="kopkar-summary-icon">
            <AlertTriangle size={21} />
          </div>

          <div className="kopkar-summary-content">
            <span>Alerts</span>

            <strong>{operationalSummary.alerts}</strong>

            <small>Business alerts</small>
          </div>
        </article>
      </section>

      {/* ===================================================
          MAIN GRID
      =================================================== */}

      <section className="kopkar-main-grid">
        {/* =================================================
            COOPERATIVE OPERATIONS
        ================================================= */}

        <article className="kopkar-panel kopkar-overview-panel">
          <div className="kopkar-panel-header">
            <div>
              <h2>Cooperative Operations</h2>

              <p>Members, products and business activity</p>
            </div>

            <div className="kopkar-live-indicator">
              <span className="kopkar-status-dot online" />
              LIVE
            </div>
          </div>

          <div className="kopkar-operation-placeholder">
            <Building2 size={42} />

            <h3>Cooperative Overview</h3>

            <p>
              Member, product, transaction, inventory and cooperative service
              data will be connected here.
            </p>

            <span>{operationalSummary.totalMembers} member(s) registered</span>
          </div>
        </article>

        {/* =================================================
            COOPERATIVE STATUS
        ================================================= */}

        <article className="kopkar-panel kopkar-status-panel">
          <div className="kopkar-panel-header">
            <div>
              <h2>Business Status</h2>

              <p>Current cooperative condition</p>
            </div>
          </div>

          <div className="kopkar-status-list">
            <div className="kopkar-status-row">
              <span className="kopkar-status-label">
                <span className="kopkar-status-dot active-dot" />
                Active Members
              </span>

              <strong>{operationalSummary.activeMembers}</strong>
            </div>

            <div className="kopkar-status-row">
              <span className="kopkar-status-label">
                <span className="kopkar-status-dot open-dot" />
                Open Transactions
              </span>

              <strong>{operationalSummary.transactionsToday}</strong>
            </div>

            <div className="kopkar-status-row">
              <span className="kopkar-status-label">
                <span className="kopkar-status-dot closed-dot" />
                Completed
              </span>

              <strong>0</strong>
            </div>

            <div className="kopkar-status-row">
              <span className="kopkar-status-label">
                <span className="kopkar-status-dot offline-dot" />
                Offline
              </span>

              <strong>0</strong>
            </div>

            <div className="kopkar-status-row">
              <span className="kopkar-status-label">
                <span className="kopkar-status-dot alarm-dot" />
                Alert
              </span>

              <strong>{operationalSummary.alerts}</strong>
            </div>
          </div>
        </article>
      </section>

      {/* ===================================================
          PERFORMANCE
      =================================================== */}

      <section className="kopkar-performance-grid">
        {/* MEMBER */}

        <article className="kopkar-panel kopkar-performance-panel">
          <div className="kopkar-panel-header">
            <div>
              <h2>Member Activity</h2>

              <p>Member participation</p>
            </div>

            <Users size={18} />
          </div>

          <div className="kopkar-performance-body">
            <div className="kopkar-performance-value">
              <strong>{performance.memberActivity}%</strong>

              <span>Activity</span>
            </div>

            <div className="kopkar-progress">
              <span
                style={{
                  width: `${performance.memberActivity}%`,
                }}
              />
            </div>

            <div className="kopkar-performance-meta">
              <span>Active: {operationalSummary.activeMembers}</span>

              <span>Total: {operationalSummary.totalMembers}</span>
            </div>
          </div>
        </article>

        {/* TRANSACTION */}

        <article className="kopkar-panel kopkar-performance-panel">
          <div className="kopkar-panel-header">
            <div>
              <h2>Transaction Performance</h2>

              <p>Daily transaction execution</p>
            </div>

            <Receipt size={18} />
          </div>

          <div className="kopkar-performance-body">
            <div className="kopkar-performance-value">
              <strong>{performance.transactionCompletion}%</strong>

              <span>Completion</span>
            </div>

            <div className="kopkar-progress">
              <span
                style={{
                  width: `${performance.transactionCompletion}%`,
                }}
              />
            </div>

            <div className="kopkar-performance-meta">
              <span>Today: {operationalSummary.transactionsToday}</span>

              <span>
                Value: {formatCurrency(operationalSummary.transactionValue)}
              </span>
            </div>
          </div>
        </article>

        {/* INVENTORY */}

        <article className="kopkar-panel kopkar-performance-panel">
          <div className="kopkar-panel-header">
            <div>
              <h2>Inventory Availability</h2>

              <p>Product stock readiness</p>
            </div>

            <Package size={18} />
          </div>

          <div className="kopkar-performance-body">
            <div className="kopkar-performance-value">
              <strong>{performance.inventoryAvailability}%</strong>

              <span>Availability</span>
            </div>

            <div className="kopkar-progress">
              <span
                style={{
                  width: `${performance.inventoryAvailability}%`,
                }}
              />
            </div>

            <div className="kopkar-performance-meta">
              <span>Products: {operationalSummary.totalProducts}</span>

              <span>Stock monitoring</span>
            </div>
          </div>
        </article>

        {/* FINANCE */}

        <article className="kopkar-panel kopkar-performance-panel">
          <div className="kopkar-panel-header">
            <div>
              <h2>Financial Performance</h2>

              <p>Cooperative financial intelligence</p>
            </div>

            <CircleDollarSign size={18} />
          </div>

          <div className="kopkar-performance-body">
            <div className="kopkar-performance-value">
              <strong>{performance.financialPerformance}%</strong>

              <span>Performance</span>
            </div>

            <div className="kopkar-progress">
              <span
                style={{
                  width: `${performance.financialPerformance}%`,
                }}
              />
            </div>
          </div>
        </article>
      </section>

      {/* ===================================================
          TRANSACTION MONITORING
      =================================================== */}

      <section className="kopkar-panel kopkar-transaction-panel">
        <div className="kopkar-panel-header">
          <div>
            <h2>Transaction Monitoring</h2>

            <p>Latest Koperasi Karyawan transaction information</p>
          </div>

          <button type="button" className="kopkar-view-all-button">
            View Transactions
          </button>
        </div>

        <div className="kopkar-table-wrapper">
          <table className="kopkar-table">
            <thead>
              <tr>
                <th>Transaction</th>

                <th>Member</th>

                <th>Category</th>

                <th>Description</th>

                <th>Amount</th>

                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {recentTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6}>Belum ada transaksi Koperasi Karyawan.</td>
                </tr>
              ) : (
                recentTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>
                      <strong>{transaction.id}</strong>
                    </td>

                    <td>{transaction.member}</td>

                    <td>{transaction.category}</td>

                    <td>{transaction.description}</td>

                    <td>{formatCurrency(transaction.amount)}</td>

                    <td>
                      <span
                        className={`kopkar-transaction-status ${transaction.status.toLowerCase()}`}
                      >
                        <span className="kopkar-status-dot" />

                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ===================================================
          COOPERATIVE CAPABILITIES
      =================================================== */}

      <section className="kopkar-capability-grid">
        <article className="kopkar-capability-card">
          <Users size={19} />

          <div>
            <strong>Member Management</strong>

            <span>Membership and member activity intelligence</span>
          </div>
        </article>

        <article className="kopkar-capability-card">
          <Package size={19} />

          <div>
            <strong>Products & Inventory</strong>

            <span>Product catalog and inventory monitoring</span>
          </div>
        </article>

        <article className="kopkar-capability-card">
          <ShoppingCart size={19} />

          <div>
            <strong>Cooperative Commerce</strong>

            <span>Sales and cooperative business activities</span>
          </div>
        </article>

        <article className="kopkar-capability-card">
          <ClipboardList size={19} />

          <div>
            <strong>Reports & Finance</strong>

            <span>Financial and cooperative performance reporting</span>
          </div>
        </article>
      </section>

      {/* ===================================================
          INTELLIGENCE FOOTER
      =================================================== */}

      <section className="kopkar-intelligence-panel">
        <div className="kopkar-intelligence-icon">
          <BarChart3 size={20} />
        </div>

        <div>
          <span>ABN INDUSTRIAL INTELLIGENCE</span>

          <h2>Koperasi Karyawan Business Intelligence</h2>

          <p>
            Data anggota, produk, transaksi, inventory, keuangan, layanan
            koperasi dan aktivitas bisnis akan dikonsolidasikan menjadi
            cooperative executive insight.
          </p>
        </div>

        <div className="kopkar-intelligence-status">
          <Wifi size={15} />
          DATA LAYER READY
        </div>
      </section>
    </main>
  );
}

export default KOPKARDashboard;
