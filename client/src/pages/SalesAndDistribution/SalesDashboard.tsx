import React from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Box,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  DollarSign,
  FileText,
  PackageCheck,
  ShoppingCart,
  Target,
  TrendingUp,
  Truck,
  Users,
} from "lucide-react";
import "./SalesDashboard.css";

/* =========================================================
 * TYPES
 * ========================================================= */

type KPI = {
  title: string;
  value: string;
  subtitle: string;
  change: string;
  positive: boolean;
  icon: React.ElementType;
  tone: "blue" | "green" | "orange" | "purple";
};

type SalesOrder = {
  id: string;
  customer: string;
  date: string;
  amount: string;
  status: "Completed" | "Processing" | "Pending" | "Cancelled";
};

type Customer = {
  name: string;
  orders: number;
  revenue: string;
  percentage: number;
};

type Product = {
  name: string;
  category: string;
  quantity: string;
  revenue: string;
  growth: string;
};

/* =========================================================
 * DATA
 * ========================================================= */

const kpis: KPI[] = [
  {
    title: "Total Sales",
    value: "Rp 18.42 M",
    subtitle: "Current period",
    change: "+12.8%",
    positive: true,
    icon: DollarSign,
    tone: "blue",
  },
  {
    title: "Sales Orders",
    value: "1,284",
    subtitle: "Orders this period",
    change: "+8.4%",
    positive: true,
    icon: ShoppingCart,
    tone: "green",
  },
  {
    title: "Outstanding Orders",
    value: "186",
    subtitle: "Awaiting fulfillment",
    change: "-4.2%",
    positive: true,
    icon: Clock3,
    tone: "orange",
  },
  {
    title: "Sales Target",
    value: "87.6%",
    subtitle: "Target achievement",
    change: "+6.7%",
    positive: true,
    icon: Target,
    tone: "purple",
  },
];

const monthlySales = [
  { month: "Jan", value: 58 },
  { month: "Feb", value: 64 },
  { month: "Mar", value: 71 },
  { month: "Apr", value: 68 },
  { month: "May", value: 78 },
  { month: "Jun", value: 84 },
  { month: "Jul", value: 81 },
  { month: "Aug", value: 92 },
  { month: "Sep", value: 88 },
  { month: "Oct", value: 96 },
  { month: "Nov", value: 104 },
  { month: "Dec", value: 112 },
];

const salesPipeline = [
  {
    label: "Quotation",
    value: "Rp 4.82 M",
    count: 142,
    icon: FileText,
    tone: "blue",
  },
  {
    label: "Sales Order",
    value: "Rp 7.36 M",
    count: 186,
    icon: ShoppingCart,
    tone: "purple",
  },
  {
    label: "Processing",
    value: "Rp 3.18 M",
    count: 92,
    icon: Box,
    tone: "orange",
  },
  {
    label: "Delivered",
    value: "Rp 12.64 M",
    count: 864,
    icon: PackageCheck,
    tone: "green",
  },
];

const topCustomers: Customer[] = [
  {
    name: "PT Semen Tonasa",
    orders: 128,
    revenue: "Rp 4.82 M",
    percentage: 92,
  },
  {
    name: "PT Biringkassi Raya",
    orders: 94,
    revenue: "Rp 3.14 M",
    percentage: 76,
  },
  {
    name: "PT Pelabuhan Biringkassi",
    orders: 76,
    revenue: "Rp 2.48 M",
    percentage: 61,
  },
  {
    name: "PT Pelayaran Tonasa Lines",
    orders: 58,
    revenue: "Rp 1.96 M",
    percentage: 48,
  },
  {
    name: "PT Sedaya Multi Matra",
    orders: 42,
    revenue: "Rp 1.24 M",
    percentage: 34,
  },
];

const topProducts: Product[] = [
  {
    name: "Cement Bulk",
    category: "Cement",
    quantity: "8,420 Ton",
    revenue: "Rp 5.82 M",
    growth: "+14.2%",
  },
  {
    name: "Portland Cement",
    category: "Cement",
    quantity: "6,180 Ton",
    revenue: "Rp 4.36 M",
    growth: "+11.8%",
  },
  {
    name: "Industrial Cement",
    category: "Industrial",
    quantity: "3,920 Ton",
    revenue: "Rp 3.14 M",
    growth: "+8.6%",
  },
  {
    name: "Construction Material",
    category: "Material",
    quantity: "2,840 Ton",
    revenue: "Rp 2.08 M",
    growth: "+6.4%",
  },
];

const recentOrders: SalesOrder[] = [
  {
    id: "SO-2026-09142",
    customer: "PT Semen Tonasa",
    date: "14 Sep 2026",
    amount: "Rp 428.500.000",
    status: "Completed",
  },
  {
    id: "SO-2026-09141",
    customer: "PT Biringkassi Raya",
    date: "14 Sep 2026",
    amount: "Rp 286.750.000",
    status: "Processing",
  },
  {
    id: "SO-2026-09140",
    customer: "PT Pelabuhan Biringkassi",
    date: "13 Sep 2026",
    amount: "Rp 194.200.000",
    status: "Pending",
  },
  {
    id: "SO-2026-09139",
    customer: "PT Tonasa Lines",
    date: "13 Sep 2026",
    amount: "Rp 365.800.000",
    status: "Completed",
  },
  {
    id: "SO-2026-09138",
    customer: "PT Sedaya Multi Matra",
    date: "12 Sep 2026",
    amount: "Rp 142.600.000",
    status: "Cancelled",
  },
];

/* =========================================================
 * HELPERS
 * ========================================================= */

const maxSales = Math.max(...monthlySales.map((item) => item.value));

const statusClass = (status: SalesOrder["status"]) => {
  switch (status) {
    case "Completed":
      return "status-completed";
    case "Processing":
      return "status-processing";
    case "Pending":
      return "status-pending";
    case "Cancelled":
      return "status-cancelled";
    default:
      return "";
  }
};

/* =========================================================
 * COMPONENT
 * ========================================================= */

const SalesDashboard: React.FC = () => {
  return (
    <div className="sales-dashboard">
      {/* =====================================================
       * HEADER
       * ===================================================== */}

      <div className="sales-header">
        <div>
          <div className="sales-eyebrow">
            <BarChart3 size={15} />
            SALES & DISTRIBUTION
          </div>

          <h1>Sales Dashboard</h1>

          <p>
            Monitor sales performance, orders, customers and distribution
            activities across the organization.
          </p>
        </div>

        <div className="sales-header-actions">
          <button className="sales-date-button">
            <CalendarDays size={17} />
            <span>01 Sep – 30 Sep 2026</span>
          </button>

          <button className="sales-primary-button">
            <ShoppingCart size={17} />
            New Sales Order
          </button>
        </div>
      </div>

      {/* =====================================================
       * KPI
       * ===================================================== */}

      <div className="sales-kpi-grid">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;

          return (
            <div className={`sales-kpi-card ${kpi.tone}`} key={kpi.title}>
              <div className="sales-kpi-top">
                <div className="sales-kpi-icon">
                  <Icon size={21} />
                </div>

                <div
                  className={`sales-kpi-change ${
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

              <div className="sales-kpi-title">{kpi.title}</div>

              <div className="sales-kpi-value">{kpi.value}</div>

              <div className="sales-kpi-subtitle">{kpi.subtitle}</div>
            </div>
          );
        })}
      </div>

      {/* =====================================================
       * OVERVIEW + PIPELINE
       * ===================================================== */}

      <div className="sales-main-grid">
        <section className="sales-card sales-overview-card">
          <div className="sales-card-header">
            <div>
              <span className="sales-card-eyebrow">REVENUE</span>
              <h2>Sales Overview</h2>
            </div>

            <button className="sales-card-action">
              This Year
              <ChevronRight size={15} />
            </button>
          </div>

          <div className="sales-chart-summary">
            <div>
              <span>Total Revenue</span>
              <strong>Rp 18.42 M</strong>
            </div>

            <div className="sales-chart-growth">
              <TrendingUp size={16} />
              +12.8%
            </div>
          </div>

          <div className="sales-chart">
            <div className="sales-chart-y">
              <span>120</span>
              <span>90</span>
              <span>60</span>
              <span>30</span>
              <span>0</span>
            </div>

            <div className="sales-chart-area">
              <div className="sales-grid-line line-1" />
              <div className="sales-grid-line line-2" />
              <div className="sales-grid-line line-3" />
              <div className="sales-grid-line line-4" />
              <div className="sales-grid-line line-5" />

              <div className="sales-bars">
                {monthlySales.map((item) => (
                  <div className="sales-bar-column" key={item.month}>
                    <div
                      className="sales-bar"
                      style={{
                        height: `${(item.value / maxSales) * 100}%`,
                      }}
                      title={`${item.month}: Rp ${item.value}0 M`}
                    />

                    <span>{item.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
         * SALES PIPELINE
         * ===================================================== */}

        <section className="sales-card">
          <div className="sales-card-header">
            <div>
              <span className="sales-card-eyebrow">ORDER FLOW</span>
              <h2>Sales Pipeline</h2>
            </div>

            <button className="sales-icon-button">
              <BarChart3 size={17} />
            </button>
          </div>

          <div className="sales-pipeline">
            {salesPipeline.map((item) => {
              const Icon = item.icon;

              return (
                <div className="pipeline-item" key={item.label}>
                  <div className={`pipeline-icon ${item.tone}`}>
                    <Icon size={18} />
                  </div>

                  <div className="pipeline-content">
                    <div className="pipeline-title">
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </div>

                    <div className="pipeline-meta">
                      {item.count} transactions
                    </div>

                    <div className="pipeline-progress">
                      <div
                        className={`pipeline-progress-bar ${item.tone}`}
                        style={{
                          width: `${Math.min(100, (item.count / 900) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* =====================================================
       * CUSTOMER + PRODUCT
       * ===================================================== */}

      <div className="sales-two-column">
        <section className="sales-card">
          <div className="sales-card-header">
            <div>
              <span className="sales-card-eyebrow">CUSTOMER VALUE</span>
              <h2>Top Customers</h2>
            </div>

            <button className="sales-card-action">
              View All
              <ChevronRight size={15} />
            </button>
          </div>

          <div className="customer-list">
            {topCustomers.map((customer, index) => (
              <div className="customer-row" key={customer.name}>
                <div className="customer-rank">{index + 1}</div>

                <div className="customer-main">
                  <div className="customer-name">{customer.name}</div>

                  <div className="customer-orders">
                    {customer.orders} orders
                  </div>

                  <div className="customer-progress">
                    <div
                      style={{
                        width: `${customer.percentage}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="customer-revenue">{customer.revenue}</div>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================
         * PRODUCTS
         * ===================================================== */}

        <section className="sales-card">
          <div className="sales-card-header">
            <div>
              <span className="sales-card-eyebrow">PRODUCT SALES</span>
              <h2>Top Products</h2>
            </div>

            <button className="sales-card-action">
              View All
              <ChevronRight size={15} />
            </button>
          </div>

          <div className="product-list">
            {topProducts.map((product) => (
              <div className="product-row" key={product.name}>
                <div className="product-icon">
                  <Box size={18} />
                </div>

                <div className="product-main">
                  <strong>{product.name}</strong>
                  <span>{product.category}</span>
                </div>

                <div className="product-quantity">
                  <strong>{product.quantity}</strong>
                  <span>Quantity</span>
                </div>

                <div className="product-revenue">
                  <strong>{product.revenue}</strong>
                  <span>{product.growth}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* =====================================================
       * RECENT ORDERS
       * ===================================================== */}

      <section className="sales-card sales-orders-card">
        <div className="sales-card-header">
          <div>
            <span className="sales-card-eyebrow">TRANSACTION MONITORING</span>
            <h2>Recent Sales Orders</h2>
          </div>

          <button className="sales-card-action">
            View All Orders
            <ChevronRight size={15} />
          </button>
        </div>

        <div className="sales-table-wrapper">
          <table className="sales-table">
            <thead>
              <tr>
                <th>Sales Order</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <div className="order-id">
                      <FileText size={16} />
                      {order.id}
                    </div>
                  </td>

                  <td>
                    <div className="order-customer">
                      <div className="order-avatar">
                        {order.customer.charAt(0)}
                      </div>
                      {order.customer}
                    </div>
                  </td>

                  <td>{order.date}</td>

                  <td>
                    <strong>{order.amount}</strong>
                  </td>

                  <td>
                    <span
                      className={`order-status ${statusClass(order.status)}`}
                    >
                      <span />
                      {order.status}
                    </span>
                  </td>

                  <td>
                    <button className="table-action">
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
       * QUICK STATS
       * ===================================================== */}

      <div className="sales-footer-stats">
        <div className="sales-mini-stat">
          <div className="sales-mini-icon">
            <Users size={18} />
          </div>

          <div>
            <span>Active Customers</span>
            <strong>428</strong>
          </div>
        </div>

        <div className="sales-mini-stat">
          <div className="sales-mini-icon">
            <Truck size={18} />
          </div>

          <div>
            <span>Deliveries Today</span>
            <strong>64</strong>
          </div>
        </div>

        <div className="sales-mini-stat">
          <div className="sales-mini-icon">
            <CheckCircle2 size={18} />
          </div>

          <div>
            <span>Fulfillment Rate</span>
            <strong>94.8%</strong>
          </div>
        </div>

        <div className="sales-mini-stat">
          <div className="sales-mini-icon">
            <Target size={18} />
          </div>

          <div>
            <span>Target Remaining</span>
            <strong>12.4%</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;
