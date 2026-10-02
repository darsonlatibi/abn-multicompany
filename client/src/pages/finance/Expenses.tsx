import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Banknote,
  Building2,
  Calendar,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Download,
  Factory,
  FileBarChart,
  Filter,
  MoreHorizontal,
  Plus,
  Receipt,
  RefreshCw,
  Search,
  ShoppingCart,
  Truck,
  TrendingDown,
  // TrendingUp,
  Users,
  Wrench,
} from "lucide-react";
import "./Expenses.css";

type ExpenseStatus = "PAID" | "PENDING" | "APPROVED" | "OVERDUE";

type Expense = {
  id: string;
  date: string;
  description: string;
  category: string;
  department: string;
  vendor: string;
  account: string;
  amount: number;
  status: ExpenseStatus;
};

type MonthlyExpense = {
  month: string;
  amount: number;
  budget: number;
};

const expenses: Expense[] = [
  {
    id: "EXP-2026-0912",
    date: "14 Sep 2026",
    description: "Preventive Maintenance Equipment",
    category: "Maintenance",
    department: "Plant Maintenance",
    vendor: "ABN Engineering",
    account: "Operating Account",
    amount: 185000000,
    status: "PAID",
  },
  {
    id: "EXP-2026-0911",
    date: "13 Sep 2026",
    description: "Raw Material Transportation",
    category: "Logistics",
    department: "Supply Chain",
    vendor: "Tonasa Logistics",
    account: "Operating Account",
    amount: 128500000,
    status: "APPROVED",
  },
  {
    id: "EXP-2026-0910",
    date: "12 Sep 2026",
    description: "Electrical Spare Parts",
    category: "Procurement",
    department: "Electrical",
    vendor: "Industrial Supply",
    account: "Procurement Account",
    amount: 96500000,
    status: "PENDING",
  },
  {
    id: "EXP-2026-0909",
    date: "11 Sep 2026",
    description: "Employee Payroll Support",
    category: "Payroll",
    department: "Human Resources",
    vendor: "Internal",
    account: "Payroll Account",
    amount: 275000000,
    status: "PAID",
  },
  {
    id: "EXP-2026-0908",
    date: "10 Sep 2026",
    description: "Electricity & Utilities",
    category: "Utilities",
    department: "General Affairs",
    vendor: "PLN",
    account: "Operating Account",
    amount: 142750000,
    status: "PAID",
  },
  {
    id: "EXP-2026-0907",
    date: "09 Sep 2026",
    description: "Heavy Equipment Service",
    category: "Maintenance",
    department: "Plant Operation",
    vendor: "Heavy Equipment Indonesia",
    account: "Operating Account",
    amount: 87500000,
    status: "OVERDUE",
  },
  {
    id: "EXP-2026-0906",
    date: "08 Sep 2026",
    description: "Office & Administration",
    category: "Administration",
    department: "Corporate",
    vendor: "Office Supplier",
    account: "Petty Cash",
    amount: 18750000,
    status: "PAID",
  },
  {
    id: "EXP-2026-0905",
    date: "07 Sep 2026",
    description: "Fleet Fuel Expense",
    category: "Fuel",
    department: "Fleet Management",
    vendor: "Fuel Station",
    account: "Fleet Account",
    amount: 64500000,
    status: "APPROVED",
  },
];

const monthlyExpenses: MonthlyExpense[] = [
  { month: "Jan", amount: 5.8, budget: 6.2 },
  { month: "Feb", amount: 6.1, budget: 6.3 },
  { month: "Mar", amount: 6.8, budget: 6.5 },
  { month: "Apr", amount: 5.9, budget: 6.4 },
  { month: "May", amount: 6.5, budget: 6.6 },
  { month: "Jun", amount: 7.1, budget: 6.8 },
  { month: "Jul", amount: 6.4, budget: 6.7 },
  { month: "Aug", amount: 6.9, budget: 6.8 },
  { month: "Sep", amount: 5.2, budget: 6.5 },
];

const categoryExpenses = [
  {
    name: "Maintenance",
    amount: 1250000000,
    percentage: 24,
    icon: Wrench,
  },
  {
    name: "Procurement",
    amount: 1080000000,
    percentage: 21,
    icon: ShoppingCart,
  },
  {
    name: "Payroll",
    amount: 980000000,
    percentage: 19,
    icon: Users,
  },
  {
    name: "Logistics",
    amount: 760000000,
    percentage: 15,
    icon: Truck,
  },
  {
    name: "Utilities",
    amount: 590000000,
    percentage: 11,
    icon: Factory,
  },
  {
    name: "Administration",
    amount: 510000000,
    percentage: 10,
    icon: Building2,
  },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
};

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

const getStatusIcon = (status: ExpenseStatus) => {
  switch (status) {
    case "PAID":
      return <CheckCircle2 size={14} />;
    case "APPROVED":
      return <CheckCircle2 size={14} />;
    case "PENDING":
      return <Clock3 size={14} />;
    case "OVERDUE":
      return <AlertTriangle size={14} />;
    default:
      return null;
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Maintenance":
      return <Wrench size={17} />;
    case "Procurement":
      return <ShoppingCart size={17} />;
    case "Payroll":
      return <Users size={17} />;
    case "Logistics":
      return <Truck size={17} />;
    case "Utilities":
      return <Factory size={17} />;
    default:
      return <Receipt size={17} />;
  }
};

const Expenses: React.FC = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | ExpenseStatus>(
    "ALL",
  );

  const totalExpense = 5320000000;
  const monthlyBudget = 6500000000;
  const previousMonthExpense = 5700000000;
  const pendingExpense = 385000000;
  const overdueExpense = 87500000;

  const budgetUsage = (totalExpense / monthlyBudget) * 100;
  const expenseChange =
    ((totalExpense - previousMonthExpense) / previousMonthExpense) * 100;

  const filteredExpenses = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return expenses.filter((expense) => {
      const matchesSearch =
        !keyword ||
        expense.description.toLowerCase().includes(keyword) ||
        expense.category.toLowerCase().includes(keyword) ||
        expense.department.toLowerCase().includes(keyword) ||
        expense.vendor.toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "ALL" || expense.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const maxMonthlyValue = Math.max(
    ...monthlyExpenses.map((item) => Math.max(item.amount, item.budget)),
  );

  return (
    <div className="expenses-page">
      {/* =====================================================
       * HEADER
       * ===================================================== */}
      <div className="expenses-header">
        <div>
          <div className="expenses-eyebrow">
            <CircleDollarSign size={15} />
            FINANCE • EXPENSE MANAGEMENT
          </div>

          <h1>Expenses</h1>

          <p>
            Monitor, control, and analyze operational expenses across Tonasa
            business units.
          </p>
        </div>

        <div className="expenses-header-actions">
          <button className="expense-btn expense-btn-secondary">
            <Download size={17} />
            Export Report
          </button>

          <button className="expense-btn expense-btn-primary">
            <Plus size={17} />
            Add Expense
          </button>
        </div>
      </div>

      {/* =====================================================
       * PERIOD BAR
       * ===================================================== */}
      <div className="expenses-period-bar">
        <div className="period-left">
          <div className="period-selector">
            <Calendar size={16} />
            <span>September 2026</span>
          </div>

          <span className="period-divider" />

          <span className="period-label">
            Last updated: 14 Sep 2026 • 10:15 WIB
          </span>
        </div>

        <button className="refresh-btn">
          <RefreshCw size={15} />
          Refresh
        </button>
      </div>

      {/* =====================================================
       * KPI
       * ===================================================== */}
      <div className="expense-kpi-grid">
        <div className="expense-kpi-card">
          <div className="expense-kpi-icon blue">
            <Receipt size={21} />
          </div>

          <div className="expense-kpi-content">
            <span>Total Expenses</span>
            <strong>{formatCompactCurrency(totalExpense)}</strong>

            <small className={expenseChange > 0 ? "negative" : "positive"}>
              {expenseChange > 0 ? (
                <ArrowUpRight size={14} />
              ) : (
                <ArrowDownRight size={14} />
              )}
              {Math.abs(expenseChange).toFixed(1)}% vs last month
            </small>
          </div>
        </div>

        <div className="expense-kpi-card">
          <div className="expense-kpi-icon orange">
            <Banknote size={21} />
          </div>

          <div className="expense-kpi-content">
            <span>Pending Expenses</span>
            <strong>{formatCompactCurrency(pendingExpense)}</strong>

            <small className="warning">
              <Clock3 size={14} />
              Awaiting approval
            </small>
          </div>
        </div>

        <div className="expense-kpi-card">
          <div className="expense-kpi-icon red">
            <AlertTriangle size={21} />
          </div>

          <div className="expense-kpi-content">
            <span>Overdue Expenses</span>
            <strong>{formatCompactCurrency(overdueExpense)}</strong>

            <small className="negative">
              <TrendingDown size={14} />
              Requires attention
            </small>
          </div>
        </div>

        <div className="expense-kpi-card">
          <div className="expense-kpi-icon green">
            <TrendingDown size={21} />
          </div>

          <div className="expense-kpi-content">
            <span>Budget Remaining</span>
            <strong>
              {formatCompactCurrency(monthlyBudget - totalExpense)}
            </strong>

            <div className="kpi-progress">
              <div
                className="kpi-progress-fill"
                style={{
                  width: `${Math.min(budgetUsage, 100)}%`,
                }}
              />
            </div>

            <small>{budgetUsage.toFixed(1)}% of monthly budget used</small>
          </div>
        </div>
      </div>

      {/* =====================================================
       * MAIN GRID
       * ===================================================== */}
      <div className="expenses-main-grid">
        {/* =================================================
         * EXPENSE TREND
         * ================================================= */}
        <section className="expense-card expense-trend-card">
          <div className="expense-card-header">
            <div>
              <span className="card-eyebrow">EXPENSE ANALYTICS</span>
              <h2>Monthly Expense Trend</h2>
              <p>Actual expenses compared with monthly budget.</p>
            </div>

            <button className="icon-btn">
              <MoreHorizontal size={19} />
            </button>
          </div>

          <div className="expense-legend">
            <span>
              <i className="legend-dot actual" />
              Actual
            </span>

            <span>
              <i className="legend-dot budget" />
              Budget
            </span>
          </div>

          <div className="expense-chart">
            <div className="chart-y-labels">
              <span>8B</span>
              <span>6B</span>
              <span>4B</span>
              <span>2B</span>
              <span>0</span>
            </div>

            <div className="chart-area">
              <div className="chart-grid-lines">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="chart-columns">
                {monthlyExpenses.map((item) => {
                  const actualHeight = (item.amount / maxMonthlyValue) * 100;

                  const budgetHeight = (item.budget / maxMonthlyValue) * 100;

                  return (
                    <div className="chart-column" key={item.month}>
                      <div className="chart-bars">
                        <div
                          className="chart-bar budget-bar"
                          style={{ height: `${budgetHeight}%` }}
                          title={`Budget ${item.month}: Rp ${item.budget} M`}
                        />

                        <div
                          className="chart-bar actual-bar"
                          style={{ height: `${actualHeight}%` }}
                          title={`Actual ${item.month}: Rp ${item.amount} M`}
                        />
                      </div>

                      <span>{item.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="trend-summary">
            <div>
              <span>YTD Expenses</span>
              <strong>Rp 57.7 M</strong>
            </div>

            <div>
              <span>YTD Budget</span>
              <strong>Rp 59.8 M</strong>
            </div>

            <div>
              <span>Budget Variance</span>
              <strong className="positive">Rp 2.1 M</strong>
            </div>
          </div>
        </section>

        {/* =================================================
         * CATEGORY BREAKDOWN
         * ================================================= */}
        <section className="expense-card category-card">
          <div className="expense-card-header">
            <div>
              <span className="card-eyebrow">COST STRUCTURE</span>
              <h2>Expense by Category</h2>
              <p>Current month expense distribution.</p>
            </div>

            <button className="icon-btn">
              <MoreHorizontal size={19} />
            </button>
          </div>

          <div className="category-list">
            {categoryExpenses.map((item) => {
              const Icon = item.icon;

              return (
                <div className="category-item" key={item.name}>
                  <div className="category-icon">
                    <Icon size={17} />
                  </div>

                  <div className="category-info">
                    <div className="category-top">
                      <span>{item.name}</span>
                      <strong>{formatCompactCurrency(item.amount)}</strong>
                    </div>

                    <div className="category-progress">
                      <div
                        style={{
                          width: `${item.percentage}%`,
                        }}
                      />
                    </div>

                    <small>{item.percentage}% of total expenses</small>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* =====================================================
       * DEPARTMENT / COST CENTER
       * ===================================================== */}
      <div className="expense-bottom-grid">
        <section className="expense-card department-card">
          <div className="expense-card-header">
            <div>
              <span className="card-eyebrow">COST CENTER</span>
              <h2>Department Expenses</h2>
              <p>Top spending departments this month.</p>
            </div>
          </div>

          <div className="department-list">
            <div className="department-row">
              <div className="department-name">
                <div className="department-avatar">
                  <Factory size={16} />
                </div>
                <span>Plant Operation</span>
              </div>

              <strong>Rp 1.42 M</strong>

              <div className="department-progress">
                <div style={{ width: "88%" }} />
              </div>

              <span className="department-percent">88%</span>
            </div>

            <div className="department-row">
              <div className="department-name">
                <div className="department-avatar">
                  <Wrench size={16} />
                </div>
                <span>Maintenance</span>
              </div>

              <strong>Rp 1.25 M</strong>

              <div className="department-progress">
                <div style={{ width: "78%" }} />
              </div>

              <span className="department-percent">78%</span>
            </div>

            <div className="department-row">
              <div className="department-name">
                <div className="department-avatar">
                  <ShoppingCart size={16} />
                </div>
                <span>Procurement</span>
              </div>

              <strong>Rp 1.08 M</strong>

              <div className="department-progress">
                <div style={{ width: "68%" }} />
              </div>

              <span className="department-percent">68%</span>
            </div>

            <div className="department-row">
              <div className="department-name">
                <div className="department-avatar">
                  <Truck size={16} />
                </div>
                <span>Supply Chain</span>
              </div>

              <strong>Rp 760 Jt</strong>

              <div className="department-progress">
                <div style={{ width: "51%" }} />
              </div>

              <span className="department-percent">51%</span>
            </div>
          </div>
        </section>

        {/* =================================================
         * QUICK INSIGHT
         * ================================================= */}
        <section className="expense-card insight-card">
          <div className="expense-card-header">
            <div>
              <span className="card-eyebrow">FINANCIAL CONTROL</span>
              <h2>Expense Insights</h2>
              <p>Automated financial monitoring.</p>
            </div>

            <FileBarChart size={21} />
          </div>

          <div className="insight-list">
            <div className="insight-item success">
              <div className="insight-icon">
                <TrendingDown size={18} />
              </div>

              <div>
                <strong>Budget under control</strong>
                <span>
                  Current spending is {budgetUsage.toFixed(1)}% of monthly
                  budget.
                </span>
              </div>
            </div>

            <div className="insight-item warning">
              <div className="insight-icon">
                <Clock3 size={18} />
              </div>

              <div>
                <strong>Pending approval</strong>
                <span>
                  {formatCompactCurrency(pendingExpense)} requires approval.
                </span>
              </div>
            </div>

            <div className="insight-item danger">
              <div className="insight-icon">
                <AlertTriangle size={18} />
              </div>

              <div>
                <strong>Overdue payment</strong>
                <span>
                  {formatCompactCurrency(overdueExpense)} needs immediate
                  review.
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* =====================================================
       * RECENT EXPENSES
       * ===================================================== */}
      <section className="expense-card recent-expenses-card">
        <div className="expense-card-header recent-header">
          <div>
            <span className="card-eyebrow">TRANSACTION MONITOR</span>
            <h2>Recent Expenses</h2>
            <p>Latest expense transactions across the organization.</p>
          </div>

          <div className="table-actions">
            <div className="expense-search">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search expenses..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value as "ALL" | ExpenseStatus)
              }
            >
              <option value="ALL">All Status</option>
              <option value="PAID">Paid</option>
              <option value="APPROVED">Approved</option>
              <option value="PENDING">Pending</option>
              <option value="OVERDUE">Overdue</option>
            </select>

            <button className="filter-btn">
              <Filter size={16} />
              Filter
            </button>
          </div>
        </div>

        <div className="expense-table-wrapper">
          <table className="expense-table">
            <thead>
              <tr>
                <th>Expense</th>
                <th>Category</th>
                <th>Department</th>
                <th>Vendor</th>
                <th>Account</th>
                <th>Amount</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {filteredExpenses.map((expense) => (
                <tr key={expense.id}>
                  <td>
                    <div className="expense-description">
                      <div className="expense-row-icon">
                        {getCategoryIcon(expense.category)}
                      </div>

                      <div>
                        <strong>{expense.description}</strong>
                        <span>
                          {expense.id} • {expense.date}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="category-badge">{expense.category}</span>
                  </td>

                  <td>{expense.department}</td>

                  <td>{expense.vendor}</td>

                  <td>
                    <span className="account-name">
                      <Banknote size={14} />
                      {expense.account}
                    </span>
                  </td>

                  <td>
                    <strong className="amount-cell">
                      {formatCurrency(expense.amount)}
                    </strong>
                  </td>

                  <td>
                    <span
                      className={`status-badge status-${expense.status.toLowerCase()}`}
                    >
                      {getStatusIcon(expense.status)}
                      {expense.status}
                    </span>
                  </td>

                  <td>
                    <button className="row-more-btn">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredExpenses.length === 0 && (
                <tr>
                  <td colSpan={8}>
                    <div className="empty-state">
                      <Search size={28} />
                      <strong>No expenses found</strong>
                      <span>Try changing your search or filter criteria.</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          <span>
            Showing <strong>{filteredExpenses.length}</strong> of{" "}
            <strong>{expenses.length}</strong> expenses
          </span>

          <button className="view-all-btn">
            View All Expenses
            <ArrowUpRight size={15} />
          </button>
        </div>
      </section>

      {/* =====================================================
       * FOOTER STATUS
       * ===================================================== */}
      <div className="expenses-footer-status">
        <div>
          <span className="online-dot" />
          Finance system operational
        </div>

        <span>Expense data synchronized with ERP</span>
      </div>
    </div>
  );
};

export default Expenses;
