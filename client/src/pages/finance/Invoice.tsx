import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Building2,
  Calendar,
  CheckCircle2,
  Clock3,
  Download,
  Eye,
  FileBarChart,
  FileText,
  Filter,
  MoreHorizontal,
  Plus,
  Receipt,
  RefreshCw,
  Search,
  Send,
  TrendingUp,
  Users,
  Wallet,
  XCircle,
} from "lucide-react";
import "./Invoice.css";

type InvoiceStatus = "PAID" | "PENDING" | "OVERDUE" | "DRAFT" | "CANCELLED";

type InvoiceItem = {
  id: string;
  invoiceNo: string;
  customer: string;
  description: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  paid: number;
  status: InvoiceStatus;
};

const invoices: InvoiceItem[] = [
  {
    id: "1",
    invoiceNo: "INV-2026-0914-001",
    customer: "PT Semen Tonasa",
    description: "Industrial Automation System",
    issueDate: "14 Sep 2026",
    dueDate: "14 Oct 2026",
    amount: 485000000,
    paid: 0,
    status: "PENDING",
  },
  {
    id: "2",
    invoiceNo: "INV-2026-0913-002",
    customer: "PT Prima Engineering",
    description: "Maintenance Service Contract",
    issueDate: "13 Sep 2026",
    dueDate: "13 Oct 2026",
    amount: 275000000,
    paid: 275000000,
    status: "PAID",
  },
  {
    id: "3",
    invoiceNo: "INV-2026-0912-003",
    customer: "PT Makassar Industrial",
    description: "SCADA Monitoring Solution",
    issueDate: "12 Sep 2026",
    dueDate: "12 Oct 2026",
    amount: 325000000,
    paid: 150000000,
    status: "PENDING",
  },
  {
    id: "4",
    invoiceNo: "INV-2026-0908-004",
    customer: "PT Nusantara Logistics",
    description: "Fleet Management Platform",
    issueDate: "08 Sep 2026",
    dueDate: "08 Oct 2026",
    amount: 195000000,
    paid: 0,
    status: "OVERDUE",
  },
  {
    id: "5",
    invoiceNo: "INV-2026-0905-005",
    customer: "PT Bina Industri",
    description: "IoT Monitoring Devices",
    issueDate: "05 Sep 2026",
    dueDate: "05 Oct 2026",
    amount: 145000000,
    paid: 145000000,
    status: "PAID",
  },
  {
    id: "6",
    invoiceNo: "INV-2026-0902-006",
    customer: "PT Energi Makmur",
    description: "Electrical Instrumentation",
    issueDate: "02 Sep 2026",
    dueDate: "02 Oct 2026",
    amount: 225000000,
    paid: 0,
    status: "OVERDUE",
  },
  {
    id: "7",
    invoiceNo: "INV-2026-0901-007",
    customer: "PT ABN Engineering",
    description: "Annual Support & Maintenance",
    issueDate: "01 Sep 2026",
    dueDate: "01 Oct 2026",
    amount: 180000000,
    paid: 0,
    status: "DRAFT",
  },
  {
    id: "8",
    invoiceNo: "INV-2026-0828-008",
    customer: "PT Karya Mandiri",
    description: "Automation Spare Parts",
    issueDate: "28 Aug 2026",
    dueDate: "28 Sep 2026",
    amount: 95000000,
    paid: 95000000,
    status: "PAID",
  },
];

const monthlyRevenue = [
  { month: "Jan", value: 7.2 },
  { month: "Feb", value: 7.8 },
  { month: "Mar", value: 8.4 },
  { month: "Apr", value: 7.9 },
  { month: "May", value: 9.1 },
  { month: "Jun", value: 8.7 },
  { month: "Jul", value: 9.6 },
  { month: "Aug", value: 10.2 },
  { month: "Sep", value: 8.8 },
];

const agingData = [
  {
    label: "Current",
    amount: 4850000000,
    percentage: 54,
    color: "green",
  },
  {
    label: "1–30 Days",
    amount: 1850000000,
    percentage: 21,
    color: "blue",
  },
  {
    label: "31–60 Days",
    amount: 1120000000,
    percentage: 13,
    color: "orange",
  },
  {
    label: "61–90 Days",
    amount: 620000000,
    percentage: 7,
    color: "red",
  },
  {
    label: "> 90 Days",
    amount: 420000000,
    percentage: 5,
    color: "dark-red",
  },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

const formatCompactCurrency = (value: number) => {
  if (value >= 1_000_000_000) {
    return `Rp ${(value / 1_000_000_000).toFixed(1)} M`;
  }

  if (value >= 1_000_000) {
    return `Rp ${(value / 1_000_000).toFixed(1)} Jt`;
  }

  if (value >= 1_000) {
    return `Rp ${(value / 1_000).toFixed(0)} Rb`;
  }

  return formatCurrency(value);
};

const getStatusIcon = (status: InvoiceStatus) => {
  switch (status) {
    case "PAID":
      return <CheckCircle2 size={14} />;
    case "PENDING":
      return <Clock3 size={14} />;
    case "OVERDUE":
      return <AlertTriangle size={14} />;
    case "DRAFT":
      return <FileText size={14} />;
    case "CANCELLED":
      return <XCircle size={14} />;
    default:
      return null;
  }
};

const Invoice: React.FC = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | InvoiceStatus>(
    "ALL",
  );

  const totalInvoiced = 8800000000;
  const totalCollected = 6210000000;
  const outstanding = totalInvoiced - totalCollected;
  const overdue = 1235000000;
  const collectionRate = (totalCollected / totalInvoiced) * 100;

  const filteredInvoices = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return invoices.filter((invoice) => {
      const matchesSearch =
        !keyword ||
        invoice.invoiceNo.toLowerCase().includes(keyword) ||
        invoice.customer.toLowerCase().includes(keyword) ||
        invoice.description.toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "ALL" || invoice.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const maxRevenue = Math.max(...monthlyRevenue.map((item) => item.value));

  return (
    <div className="invoice-page">
      {/* =====================================================
       * HEADER
       * ===================================================== */}
      <div className="invoice-header">
        <div>
          <div className="invoice-eyebrow">
            <Receipt size={15} />
            FINANCE • ACCOUNTS RECEIVABLE
          </div>

          <h1>Invoice</h1>

          <p>
            Manage customer invoices, accounts receivable, collections, and
            payment status across the organization.
          </p>
        </div>

        <div className="invoice-header-actions">
          <button className="invoice-btn invoice-btn-secondary">
            <Download size={17} />
            Export
          </button>

          <button className="invoice-btn invoice-btn-secondary">
            <Send size={17} />
            Send Reminder
          </button>

          <button className="invoice-btn invoice-btn-primary">
            <Plus size={17} />
            Create Invoice
          </button>
        </div>
      </div>

      {/* =====================================================
       * PERIOD
       * ===================================================== */}
      <div className="invoice-period-bar">
        <div className="invoice-period-left">
          <div className="invoice-period-selector">
            <Calendar size={16} />
            <span>September 2026</span>
          </div>

          <span className="invoice-period-divider" />

          <span className="invoice-period-info">
            Last updated: 14 Sep 2026 • 10:20 WIB
          </span>
        </div>

        <button className="invoice-refresh">
          <RefreshCw size={15} />
          Refresh
        </button>
      </div>

      {/* =====================================================
       * KPI
       * ===================================================== */}
      <div className="invoice-kpi-grid">
        <div className="invoice-kpi-card">
          <div className="invoice-kpi-icon blue">
            <FileText size={21} />
          </div>

          <div className="invoice-kpi-content">
            <span>Total Invoiced</span>
            <strong>{formatCompactCurrency(totalInvoiced)}</strong>

            <small className="positive">
              <ArrowUpRight size={14} />
              12.8% vs last month
            </small>
          </div>
        </div>

        <div className="invoice-kpi-card">
          <div className="invoice-kpi-icon green">
            <Wallet size={21} />
          </div>

          <div className="invoice-kpi-content">
            <span>Total Collected</span>
            <strong>{formatCompactCurrency(totalCollected)}</strong>

            <small className="positive">
              <TrendingUp size={14} />
              {collectionRate.toFixed(1)}% collection rate
            </small>
          </div>
        </div>

        <div className="invoice-kpi-card">
          <div className="invoice-kpi-icon orange">
            <Clock3 size={21} />
          </div>

          <div className="invoice-kpi-content">
            <span>Outstanding</span>
            <strong>{formatCompactCurrency(outstanding)}</strong>

            <small className="warning">
              <Clock3 size={14} />
              Awaiting payment
            </small>
          </div>
        </div>

        <div className="invoice-kpi-card">
          <div className="invoice-kpi-icon red">
            <AlertTriangle size={21} />
          </div>

          <div className="invoice-kpi-content">
            <span>Overdue</span>
            <strong>{formatCompactCurrency(overdue)}</strong>

            <small className="negative">
              <ArrowDownRight size={14} />
              Requires collection
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
       * ANALYTICS
       * ===================================================== */}
      <div className="invoice-main-grid">
        {/* Revenue */}
        <section className="invoice-card revenue-card">
          <div className="invoice-card-header">
            <div>
              <span className="invoice-card-eyebrow">REVENUE PERFORMANCE</span>

              <h2>Invoice Revenue Trend</h2>

              <p>Monthly invoiced revenue in IDR billion.</p>
            </div>

            <button className="invoice-icon-btn">
              <MoreHorizontal size={19} />
            </button>
          </div>

          <div className="invoice-chart-legend">
            <span>
              <i className="invoice-legend-dot" />
              Invoiced Revenue
            </span>
          </div>

          <div className="invoice-chart">
            <div className="invoice-chart-y">
              <span>12B</span>
              <span>9B</span>
              <span>6B</span>
              <span>3B</span>
              <span>0</span>
            </div>

            <div className="invoice-chart-area">
              <div className="invoice-chart-grid">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="invoice-columns">
                {monthlyRevenue.map((item) => (
                  <div className="invoice-column" key={item.month}>
                    <div className="invoice-column-value">
                      <div
                        className="invoice-revenue-bar"
                        style={{
                          height: `${(item.value / maxRevenue) * 100}%`,
                        }}
                      />
                    </div>

                    <span>{item.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="invoice-trend-summary">
            <div>
              <span>YTD Revenue</span>
              <strong>Rp 75.7 M</strong>
            </div>

            <div>
              <span>Avg. Monthly</span>
              <strong>Rp 8.4 M</strong>
            </div>

            <div>
              <span>Growth</span>
              <strong className="positive">+12.8%</strong>
            </div>
          </div>
        </section>

        {/* Aging */}
        <section className="invoice-card aging-card">
          <div className="invoice-card-header">
            <div>
              <span className="invoice-card-eyebrow">ACCOUNTS RECEIVABLE</span>

              <h2>Invoice Aging</h2>

              <p>Outstanding receivables by aging period.</p>
            </div>

            <FileBarChart size={21} className="invoice-header-icon" />
          </div>

          <div className="aging-total">
            <span>Total Receivables</span>
            <strong>Rp 8.86 M</strong>
          </div>

          <div className="aging-list">
            {agingData.map((item) => (
              <div className="aging-item" key={item.label}>
                <div className="aging-item-top">
                  <span>
                    <i className={`aging-dot ${item.color}`} />
                    {item.label}
                  </span>

                  <strong>{formatCompactCurrency(item.amount)}</strong>
                </div>

                <div className="aging-progress">
                  <div
                    className={item.color}
                    style={{
                      width: `${item.percentage}%`,
                    }}
                  />
                </div>

                <small>{item.percentage}% of receivables</small>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* =====================================================
       * COLLECTION OVERVIEW
       * ===================================================== */}
      <div className="invoice-overview-grid">
        <section className="invoice-card collection-card">
          <div className="invoice-card-header">
            <div>
              <span className="invoice-card-eyebrow">
                COLLECTION PERFORMANCE
              </span>

              <h2>Collection Overview</h2>

              <p>Current invoice collection performance.</p>
            </div>

            <CheckCircle2 size={21} className="invoice-success-icon" />
          </div>

          <div className="collection-progress-wrap">
            <div className="collection-circle">
              <div className="collection-circle-inner">
                <strong>{collectionRate.toFixed(0)}%</strong>
                <span>Collected</span>
              </div>
            </div>

            <div className="collection-stats">
              <div>
                <span>Collected</span>
                <strong>{formatCompactCurrency(totalCollected)}</strong>
              </div>

              <div>
                <span>Outstanding</span>
                <strong>{formatCompactCurrency(outstanding)}</strong>
              </div>

              <div>
                <span>Overdue</span>
                <strong className="negative">
                  {formatCompactCurrency(overdue)}
                </strong>
              </div>
            </div>
          </div>
        </section>

        <section className="invoice-card customer-card">
          <div className="invoice-card-header">
            <div>
              <span className="invoice-card-eyebrow">CUSTOMER RECEIVABLES</span>

              <h2>Top Outstanding Customers</h2>

              <p>Customers with the highest outstanding balance.</p>
            </div>

            <Users size={21} className="invoice-header-icon" />
          </div>

          <div className="customer-list">
            <div className="customer-row">
              <div className="customer-avatar">
                <Building2 size={16} />
              </div>

              <div className="customer-info">
                <strong>PT Semen Tonasa</strong>
                <span>3 invoices</span>
              </div>

              <strong>Rp 1.82 M</strong>
            </div>

            <div className="customer-row">
              <div className="customer-avatar">
                <Building2 size={16} />
              </div>

              <div className="customer-info">
                <strong>PT Makassar Industrial</strong>
                <span>2 invoices</span>
              </div>

              <strong>Rp 1.25 M</strong>
            </div>

            <div className="customer-row">
              <div className="customer-avatar">
                <Building2 size={16} />
              </div>

              <div className="customer-info">
                <strong>PT Energi Makmur</strong>
                <span>2 invoices</span>
              </div>

              <strong>Rp 920 Jt</strong>
            </div>

            <div className="customer-row">
              <div className="customer-avatar">
                <Building2 size={16} />
              </div>

              <div className="customer-info">
                <strong>PT Nusantara Logistics</strong>
                <span>1 invoice</span>
              </div>

              <strong>Rp 685 Jt</strong>
            </div>
          </div>
        </section>
      </div>

      {/* =====================================================
       * INVOICE TABLE
       * ===================================================== */}
      <section className="invoice-card invoice-table-card">
        <div className="invoice-card-header invoice-table-header">
          <div>
            <span className="invoice-card-eyebrow">INVOICE TRANSACTIONS</span>

            <h2>Recent Invoices</h2>

            <p>Latest invoice transactions and payment status.</p>
          </div>

          <div className="invoice-table-actions">
            <div className="invoice-search">
              <Search size={16} />

              <input
                type="text"
                placeholder="Search invoice..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value as "ALL" | InvoiceStatus)
              }
            >
              <option value="ALL">All Status</option>
              <option value="PAID">Paid</option>
              <option value="PENDING">Pending</option>
              <option value="OVERDUE">Overdue</option>
              <option value="DRAFT">Draft</option>
              <option value="CANCELLED">Cancelled</option>
            </select>

            <button className="invoice-filter-btn">
              <Filter size={16} />
              Filter
            </button>
          </div>
        </div>

        <div className="invoice-table-wrapper">
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Customer</th>
                <th>Issue Date</th>
                <th>Due Date</th>
                <th>Amount</th>
                <th>Paid</th>
                <th>Balance</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {filteredInvoices.map((invoice) => {
                const balance = invoice.amount - invoice.paid;

                return (
                  <tr key={invoice.id}>
                    <td>
                      <div className="invoice-number">
                        <div className="invoice-row-icon">
                          <Receipt size={16} />
                        </div>

                        <div>
                          <strong>{invoice.invoiceNo}</strong>
                          <span>{invoice.description}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="invoice-customer">
                        <Building2 size={14} />
                        {invoice.customer}
                      </div>
                    </td>

                    <td>{invoice.issueDate}</td>

                    <td>{invoice.dueDate}</td>

                    <td>
                      <strong className="invoice-amount">
                        {formatCurrency(invoice.amount)}
                      </strong>
                    </td>

                    <td>
                      <span className="paid-amount">
                        {formatCurrency(invoice.paid)}
                      </span>
                    </td>

                    <td>
                      <strong
                        className={
                          balance > 0 ? "balance-amount" : "balance-paid"
                        }
                      >
                        {formatCurrency(balance)}
                      </strong>
                    </td>

                    <td>
                      <span
                        className={`invoice-status invoice-status-${invoice.status.toLowerCase()}`}
                      >
                        {getStatusIcon(invoice.status)}
                        {invoice.status}
                      </span>
                    </td>

                    <td>
                      <div className="invoice-row-actions">
                        <button title="View invoice">
                          <Eye size={16} />
                        </button>

                        <button title="More">
                          <MoreHorizontal size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredInvoices.length === 0 && (
                <tr>
                  <td colSpan={9}>
                    <div className="invoice-empty-state">
                      <Search size={28} />
                      <strong>No invoices found</strong>
                      <span>Try changing your search or filter criteria.</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="invoice-table-footer">
          <span>
            Showing <strong>{filteredInvoices.length}</strong> of{" "}
            <strong>{invoices.length}</strong> invoices
          </span>

          <button>
            View All Invoices
            <ArrowUpRight size={15} />
          </button>
        </div>
      </section>

      {/* =====================================================
       * FOOTER
       * ===================================================== */}
      <div className="invoice-footer-status">
        <div>
          <span className="invoice-online-dot" />
          Finance system operational
        </div>

        <span>Accounts receivable synchronized with ERP</span>
      </div>
    </div>
  );
};

export default Invoice;
