import React, { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowDownToLine,
  ArrowUpFromLine,
  CheckCircle2,
  Clock3,
  Database,
  FileText,
  Gauge,
  GitBranch,
  Package,
  RefreshCw,
  Server,
  Settings,
  ShieldCheck,
  Truck,
  Wrench,
  XCircle,
  Zap,
} from "lucide-react";

import "./SAP.css";

/* =========================================================
   TYPES
   ========================================================= */

type Status = "online" | "warning" | "offline" | "success" | "failed";

interface Transaction {
  id: string;
  type: "INBOUND" | "OUTBOUND";
  module: string;
  object: string;
  status: Status;
  timestamp: string;
  reference: string;
}

/* =========================================================
   MOCK DATA
   ========================================================= */

const transactions: Transaction[] = [
  {
    id: "TX-20260827-001",
    type: "INBOUND",
    module: "PM",
    object: "Maintenance Order",
    status: "success",
    timestamp: "12:18:42",
    reference: "PM-400128",
  },
  {
    id: "TX-20260827-002",
    type: "OUTBOUND",
    module: "MM",
    object: "Material Request",
    status: "success",
    timestamp: "12:16:21",
    reference: "MR-300921",
  },
  {
    id: "TX-20260827-003",
    type: "INBOUND",
    module: "PP",
    object: "Production Order",
    status: "success",
    timestamp: "12:13:08",
    reference: "PP-500812",
  },
  {
    id: "TX-20260827-004",
    type: "OUTBOUND",
    module: "QM",
    object: "Quality Notification",
    status: "failed",
    timestamp: "12:09:44",
    reference: "QN-200341",
  },
  {
    id: "TX-20260827-005",
    type: "INBOUND",
    module: "FI",
    object: "Cost Posting",
    status: "success",
    timestamp: "12:05:12",
    reference: "FI-800211",
  },
];

/* =========================================================
   HELPERS
   ========================================================= */

const statusLabel = (status: Status): string => {
  switch (status) {
    case "success":
      return "SUCCESS";

    case "failed":
      return "FAILED";

    case "warning":
      return "WARNING";

    case "offline":
      return "OFFLINE";

    case "online":
      return "ONLINE";
  }
};

/* =========================================================
   COMPONENT
   ========================================================= */

const SAP: React.FC = () => {
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState("12:18:42");

  const statistics = useMemo(
    () => ({
      total: 1284,
      success: 1267,
      failed: 7,
      pending: 10,
      inbound: 742,
      outbound: 542,
    }),
    [],
  );

  const handleSync = () => {
    if (syncing) return;

    setSyncing(true);

    window.setTimeout(() => {
      setLastSync(
        new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );

      setSyncing(false);
    }, 1200);
  };

  return (
    <div className="sap-page">
      {/* =====================================================
          HEADER
          ===================================================== */}

      <div className="sap-header">
        <div className="sap-header-left">
          <div className="sap-title-icon">
            <Database size={24} />
          </div>

          <div>
            <div className="sap-title-row">
              <h1>SAP Integration</h1>

              <span className="sap-status-badge online">
                <span className="sap-status-dot" />
                SAP ONLINE
              </span>
            </div>

            <p>
              ABN Industrial Integration Platform
              <span className="sap-separator">•</span>
              Tonasa / SIG Enterprise
            </p>
          </div>
        </div>

        <div className="sap-header-actions">
          <div className="sap-last-sync">
            <Clock3 size={15} />
            <span>Last Sync</span>
            <strong>{lastSync}</strong>
          </div>

          <button
            className={`sap-sync-btn ${syncing ? "syncing" : ""}`}
            onClick={handleSync}
            disabled={syncing}
          >
            <RefreshCw size={16} className={syncing ? "sap-spin" : ""} />

            {syncing ? "Synchronizing..." : "Sync SAP"}
          </button>

          <button className="sap-icon-btn">
            <Settings size={18} />
          </button>
        </div>
      </div>

      {/* =====================================================
          CONNECTION PANEL
          ===================================================== */}

      <section className="sap-connection-panel">
        <div className="sap-connection-main">
          <div className="sap-server-icon">
            <Server size={24} />
          </div>

          <div>
            <div className="sap-connection-title">
              <strong>SAP Enterprise System</strong>

              <span className="sap-health">
                <CheckCircle2 size={14} />
                Healthy
              </span>
            </div>

            <div className="sap-connection-meta">
              <span>
                <strong>System:</strong> SAP-SIG
              </span>

              <span>
                <strong>Client:</strong> 100
              </span>

              <span>
                <strong>Environment:</strong> Production
              </span>

              <span>
                <strong>Protocol:</strong> OData / RFC / IDoc
              </span>
            </div>
          </div>
        </div>

        <div className="sap-connection-metrics">
          <div>
            <span>Latency</span>
            <strong>84 ms</strong>
          </div>

          <div>
            <span>Uptime</span>
            <strong>99.98%</strong>
          </div>

          <div>
            <span>Queue</span>
            <strong>{statistics.pending}</strong>
          </div>
        </div>
      </section>

      {/* =====================================================
          KPI CARDS
          ===================================================== */}

      <section className="sap-kpi-grid">
        <div className="sap-kpi-card">
          <div className="sap-kpi-icon blue">
            <Activity size={21} />
          </div>

          <div className="sap-kpi-content">
            <span>Total Transactions</span>
            <strong>{statistics.total.toLocaleString()}</strong>
            <small>
              <TrendingUpSmall />
              8.4% today
            </small>
          </div>
        </div>

        <div className="sap-kpi-card">
          <div className="sap-kpi-icon green">
            <CheckCircle2 size={21} />
          </div>

          <div className="sap-kpi-content">
            <span>Successful</span>
            <strong>{statistics.success.toLocaleString()}</strong>
            <small className="positive">
              {((statistics.success / statistics.total) * 100).toFixed(1)}%
              success rate
            </small>
          </div>
        </div>

        <div className="sap-kpi-card">
          <div className="sap-kpi-icon orange">
            <Clock3 size={21} />
          </div>

          <div className="sap-kpi-content">
            <span>Pending Queue</span>
            <strong>{statistics.pending}</strong>
            <small>Waiting for processing</small>
          </div>
        </div>

        <div className="sap-kpi-card">
          <div className="sap-kpi-icon red">
            <AlertTriangle size={21} />
          </div>

          <div className="sap-kpi-content">
            <span>Failed</span>
            <strong>{statistics.failed}</strong>
            <small className="negative">Requires attention</small>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN GRID
          ===================================================== */}

      <section className="sap-main-grid">
        {/* ===================================================
            SAP MODULES
            =================================================== */}

        <div className="sap-card sap-modules-card">
          <div className="sap-card-header">
            <div>
              <h2>SAP Modules</h2>
              <p>Integration status by SAP business module</p>
            </div>

            <ShieldCheck size={19} />
          </div>

          <div className="sap-module-grid">
            <ModuleCard
              icon={<Package size={19} />}
              code="MM"
              name="Materials Management"
              status="online"
              transactions="342"
            />

            <ModuleCard
              icon={<Wrench size={19} />}
              code="PM"
              name="Plant Maintenance"
              status="online"
              transactions="286"
            />

            <ModuleCard
              icon={<Activity size={19} />}
              code="PP"
              name="Production Planning"
              status="online"
              transactions="251"
            />

            <ModuleCard
              icon={<ShieldCheck size={19} />}
              code="QM"
              name="Quality Management"
              status="warning"
              transactions="178"
            />

            <ModuleCard
              icon={<Database size={19} />}
              code="FI"
              name="Financial Accounting"
              status="online"
              transactions="142"
            />

            <ModuleCard
              icon={<Gauge size={19} />}
              code="CO"
              name="Controlling"
              status="online"
              transactions="85"
            />
          </div>
        </div>

        {/* ===================================================
            INTEGRATION CHANNELS
            =================================================== */}

        <div className="sap-card">
          <div className="sap-card-header">
            <div>
              <h2>Integration Channels</h2>
              <p>ABN ↔ SAP communication layer</p>
            </div>

            <GitBranch size={19} />
          </div>

          <div className="sap-channel-list">
            <ChannelRow
              title="OData API"
              description="REST / SAP Gateway"
              status="online"
              latency="84 ms"
            />

            <ChannelRow
              title="RFC / BAPI"
              description="SAP Remote Function"
              status="online"
              latency="91 ms"
            />

            <ChannelRow
              title="IDoc"
              description="Asynchronous messaging"
              status="online"
              latency="126 ms"
            />

            <ChannelRow
              title="Event Queue"
              description="ABN Integration Queue"
              status="warning"
              latency="412 ms"
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          FLOW
          ===================================================== */}

      <section className="sap-card sap-flow-card">
        <div className="sap-card-header">
          <div>
            <h2>Integration Flow</h2>
            <p>Operational data flow between ABN and SAP</p>
          </div>

          <Zap size={19} />
        </div>

        <div className="sap-flow">
          <FlowNode
            icon={<Truck size={21} />}
            title="ABN Fleet"
            subtitle="GPS / Transport"
          />

          <FlowLine direction="out" />

          <FlowNode
            icon={<Activity size={21} />}
            title="ABN Water"
            subtitle="SCADA / IoT"
          />

          <FlowLine direction="out" />

          <FlowNode
            icon={<Server size={21} />}
            title="ABN Integration"
            subtitle="API / Queue"
            active
          />

          <FlowLine direction="out" />

          <FlowNode
            icon={<Database size={21} />}
            title="SAP SIG"
            subtitle="ERP / Enterprise"
          />
        </div>
      </section>

      {/* =====================================================
          TRANSACTIONS
          ===================================================== */}

      <section className="sap-card sap-transactions-card">
        <div className="sap-card-header">
          <div>
            <h2>Recent Transactions</h2>
            <p>Latest SAP integration activity</p>
          </div>

          <button className="sap-view-btn">View All</button>
        </div>

        <div className="sap-table-wrapper">
          <table className="sap-table">
            <thead>
              <tr>
                <th>Transaction</th>
                <th>Direction</th>
                <th>Module</th>
                <th>Object</th>
                <th>Reference</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>
                    <div className="sap-tx-id">
                      <FileText size={15} />
                      {transaction.id}
                    </div>
                  </td>

                  <td>
                    <span
                      className={`sap-direction ${transaction.type.toLowerCase()}`}
                    >
                      {transaction.type === "INBOUND" ? (
                        <ArrowDownToLine size={14} />
                      ) : (
                        <ArrowUpFromLine size={14} />
                      )}

                      {transaction.type}
                    </span>
                  </td>

                  <td>
                    <span className="sap-module-code">
                      {transaction.module}
                    </span>
                  </td>

                  <td>{transaction.object}</td>

                  <td className="sap-reference">{transaction.reference}</td>

                  <td className="sap-time">{transaction.timestamp}</td>

                  <td>
                    <span className={`sap-tx-status ${transaction.status}`}>
                      {transaction.status === "success" ? (
                        <CheckCircle2 size={14} />
                      ) : (
                        <XCircle size={14} />
                      )}

                      {statusLabel(transaction.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* =====================================================
          FOOTER STATUS
          ===================================================== */}

      <div className="sap-footer-status">
        <div>
          <span className="sap-live-dot" />
          ABN Integration Engine Running
        </div>

        <div>
          Queue Processor: <strong>ACTIVE</strong>
        </div>

        <div>
          Last heartbeat: <strong>12:18:47</strong>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   MODULE CARD
   ========================================================= */

interface ModuleCardProps {
  icon: React.ReactNode;
  code: string;
  name: string;
  status: Status;
  transactions: string;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  icon,
  code,
  name,
  status,
  transactions,
}) => {
  return (
    <div className="sap-module-card">
      <div className="sap-module-icon">{icon}</div>

      <div className="sap-module-info">
        <div className="sap-module-top">
          <strong>{code}</strong>

          <span className={`sap-mini-status ${status}`}>
            <span />
            {status === "online" ? "ONLINE" : "WARNING"}
          </span>
        </div>

        <span>{name}</span>

        <small>{transactions} transactions</small>
      </div>
    </div>
  );
};

/* =========================================================
   CHANNEL ROW
   ========================================================= */

interface ChannelRowProps {
  title: string;
  description: string;
  status: Status;
  latency: string;
}

const ChannelRow: React.FC<ChannelRowProps> = ({
  title,
  description,
  status,
  latency,
}) => {
  return (
    <div className="sap-channel-row">
      <div className="sap-channel-icon">
        <Activity size={17} />
      </div>

      <div className="sap-channel-info">
        <strong>{title}</strong>
        <span>{description}</span>
      </div>

      <div className="sap-channel-right">
        <span className={`sap-channel-status ${status}`}>
          <span />
          {status === "online" ? "ONLINE" : "WARNING"}
        </span>

        <small>{latency}</small>
      </div>
    </div>
  );
};

/* =========================================================
   FLOW NODE
   ========================================================= */

interface FlowNodeProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  active?: boolean;
}

const FlowNode: React.FC<FlowNodeProps> = ({
  icon,
  title,
  subtitle,
  active,
}) => {
  return (
    <div className={`sap-flow-node ${active ? "active" : ""}`}>
      <div className="sap-flow-icon">{icon}</div>

      <strong>{title}</strong>
      <span>{subtitle}</span>
    </div>
  );
};

/* =========================================================
   FLOW LINE
   ========================================================= */

const FlowLine: React.FC<{ direction: "in" | "out" }> = ({ direction }) => {
  return (
    <div className={`sap-flow-line ${direction}`}>
      <span />
      <span />
      <span />
      <ArrowUpFromLine size={15} />
    </div>
  );
};

/* =========================================================
   SMALL TREND ICON
   ========================================================= */

const TrendingUpSmall = () => <span className="sap-trend-icon">↗</span>;

export default SAP;
