import React from "react";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Factory,
  Flame,
  Gauge,
  Layers3,
  Package,
  Thermometer,
  TrendingUp,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";

import "./Dashboard.css";

type KilnStatus = "RUNNING" | "STOPPED" | "WARNING";

interface KilnData {
  id: string;
  name: string;
  status: KilnStatus;
  production: number;
  target: number;
  temperature: number;
  feed: number;
  clinkerStock: number;
  quality: number;
}

const kilnData: KilnData[] = [
  {
    id: "T2",
    name: "Kiln T2",
    status: "RUNNING",
    production: 3250,
    target: 3500,
    temperature: 1450,
    feed: 205,
    clinkerStock: 18200,
    quality: 98.4,
  },
  {
    id: "T3",
    name: "Kiln T3",
    status: "RUNNING",
    production: 3480,
    target: 3600,
    temperature: 1452,
    feed: 218,
    clinkerStock: 19450,
    quality: 99.1,
  },
  {
    id: "T4",
    name: "Kiln T4",
    status: "WARNING",
    production: 2890,
    target: 3400,
    temperature: 1438,
    feed: 191,
    clinkerStock: 16100,
    quality: 96.8,
  },
  {
    id: "T5",
    name: "Kiln T5",
    status: "RUNNING",
    production: 3720,
    target: 3800,
    temperature: 1455,
    feed: 224,
    clinkerStock: 22100,
    quality: 99.3,
  },
];

interface MaintenanceData {
  kiln: string;
  cost: number;
  status: "NORMAL" | "WARNING";
}

const maintenanceData: MaintenanceData[] = [
  {
    kiln: "T2",
    cost: 82_500_000,
    status: "NORMAL",
  },
  {
    kiln: "T3",
    cost: 91_200_000,
    status: "NORMAL",
  },
  {
    kiln: "T4",
    cost: 156_800_000,
    status: "WARNING",
  },
  {
    kiln: "T5",
    cost: 98_000_000,
    status: "NORMAL",
  },
];

const maintenanceBudget = 500_000_000;

const formatRupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

const getStatusClass = (status: KilnStatus) => {
  switch (status) {
    case "RUNNING":
      return "status-running";

    case "WARNING":
      return "status-warning";

    case "STOPPED":
      return "status-stopped";

    default:
      return "";
  }
};

const getMaintenanceStatusClass = (status: MaintenanceData["status"]) => {
  return status === "WARNING"
    ? "maintenance-status-warning"
    : "maintenance-status-normal";
};

const Dashboard: React.FC = () => {
  /* =========================================================
   * PRODUCTION KPI
   * ========================================================= */

  const totalProduction = kilnData.reduce(
    (sum, kiln) => sum + kiln.production,
    0,
  );

  const totalTarget = kilnData.reduce((sum, kiln) => sum + kiln.target, 0);

  const totalStock = kilnData.reduce((sum, kiln) => sum + kiln.clinkerStock, 0);

  const averageQuality =
    kilnData.reduce((sum, kiln) => sum + kiln.quality, 0) / kilnData.length;

  const productionAchievement = (totalProduction / totalTarget) * 100;

  /* =========================================================
   * MAINTENANCE KPI
   * ========================================================= */

  const totalMaintenanceCost = maintenanceData.reduce(
    (sum, item) => sum + item.cost,
    0,
  );

  const maintenanceBudgetUsage =
    (totalMaintenanceCost / maintenanceBudget) * 100;

  const maintenanceRemaining = Math.max(
    maintenanceBudget - totalMaintenanceCost,
    0,
  );

  const maintenanceWarningCount = maintenanceData.filter(
    (item) => item.status === "WARNING",
  ).length;

  return (
    <div className="tonasa-dashboard">
      {/* =====================================================
       * HEADER
       * ===================================================== */}

      <div className="dashboard-header">
        <div>
          <div className="dashboard-eyebrow">ABN INDUSTRIAL INTELLIGENCE</div>

          <h1>PT Semen Tonasa</h1>

          <p>Clinker Production & Quality Intelligence</p>
        </div>

        <div className="dashboard-live">
          <span className="live-dot" />
          LIVE MONITORING
        </div>
      </div>

      {/* =====================================================
       * KPI GRID
       * ===================================================== */}

      <div className="kpi-grid">
        {/* Production */}

        <div className="kpi-card">
          <div className="kpi-icon">
            <Factory size={22} />
          </div>

          <div className="kpi-content">
            <span>Total Production</span>

            <strong>{totalProduction.toLocaleString()} TPD</strong>

            <small>Target {totalTarget.toLocaleString()} TPD</small>
          </div>

          <TrendingUp className="kpi-trend" size={20} />
        </div>

        {/* Stock */}

        <div className="kpi-card">
          <div className="kpi-icon">
            <Package size={22} />
          </div>

          <div className="kpi-content">
            <span>Clinker Stock</span>

            <strong>{totalStock.toLocaleString()} Ton</strong>

            <small>T2 – T5</small>
          </div>
        </div>

        {/* Quality */}

        <div className="kpi-card">
          <div className="kpi-icon">
            <CheckCircle2 size={22} />
          </div>

          <div className="kpi-content">
            <span>Average Quality</span>

            <strong>{averageQuality.toFixed(1)}%</strong>

            <small>Quality Compliance</small>
          </div>
        </div>

        {/* Achievement */}

        <div className="kpi-card">
          <div className="kpi-icon">
            <Gauge size={22} />
          </div>

          <div className="kpi-content">
            <span>Production Achievement</span>

            <strong>{productionAchievement.toFixed(1)}%</strong>

            <small>Daily target</small>
          </div>
        </div>

        {/* =================================================
         * MAINTENANCE COST KPI
         * ================================================= */}

        <div className="kpi-card maintenance-kpi-card">
          <div className="kpi-icon maintenance-icon">
            <Wrench size={22} />
          </div>

          <div className="kpi-content">
            <span>Maintenance Cost</span>

            <strong>{formatRupiah(totalMaintenanceCost)}</strong>

            <small>Budget usage {maintenanceBudgetUsage.toFixed(1)}%</small>
          </div>

          {maintenanceWarningCount > 0 && (
            <AlertTriangle className="kpi-warning-icon" size={20} />
          )}
        </div>
      </div>

      {/* =====================================================
       * KILN MONITORING
       * ===================================================== */}

      <div className="section-header">
        <div>
          <h2>Kiln Monitoring</h2>

          <span>Real-time clinker production status</span>
        </div>

        <Activity size={20} />
      </div>

      <div className="kiln-grid">
        {kilnData.map((kiln) => {
          const achievement = (kiln.production / kiln.target) * 100;

          return (
            <div className="kiln-card" key={kiln.id}>
              <div className="kiln-header">
                <div className="kiln-title">
                  <div className="kiln-icon">
                    <Flame size={21} />
                  </div>

                  <div>
                    <strong>{kiln.name}</strong>

                    <span>Clinker Production</span>
                  </div>
                </div>

                <span className={`kiln-status ${getStatusClass(kiln.status)}`}>
                  {kiln.status}
                </span>
              </div>

              <div className="kiln-production">
                <strong>{kiln.production.toLocaleString()}</strong>

                <span>TPD</span>
              </div>

              <div className="progress-label">
                <span>Target Achievement</span>

                <strong>{achievement.toFixed(1)}%</strong>
              </div>

              <div className="progress-bar">
                <div
                  style={{
                    width: `${Math.min(achievement, 100)}%`,
                  }}
                />
              </div>

              <div className="kiln-metrics">
                <div>
                  <Thermometer size={17} />

                  <span>Temperature</span>

                  <strong>{kiln.temperature}°C</strong>
                </div>

                <div>
                  <Zap size={17} />

                  <span>Feed Rate</span>

                  <strong>{kiln.feed} T/H</strong>
                </div>

                <div>
                  <Package size={17} />

                  <span>Stock</span>

                  <strong>{kiln.clinkerStock.toLocaleString()} T</strong>
                </div>

                <div>
                  <CheckCircle2 size={17} />

                  <span>Quality</span>

                  <strong>{kiln.quality}%</strong>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* =====================================================
       * MAINTENANCE COST OVERVIEW
       * ===================================================== */}

      <div className="section-header maintenance-section-header">
        <div>
          <h2>Maintenance Cost Overview</h2>

          <span>Maintenance expenditure by kiln</span>
        </div>

        <Wrench size={20} />
      </div>

      <div className="maintenance-overview-grid">
        {/* =================================================
         * BUDGET SUMMARY
         * ================================================= */}

        <div className="panel-card maintenance-summary-card">
          <div className="panel-header">
            <div>
              <h3>Maintenance Budget</h3>

              <span>Current maintenance expenditure</span>
            </div>

            <Gauge size={20} />
          </div>

          <div className="maintenance-total">
            <span>Total Cost</span>

            <strong>{formatRupiah(totalMaintenanceCost)}</strong>
          </div>

          <div className="maintenance-budget-row">
            <span>Budget</span>

            <strong>{formatRupiah(maintenanceBudget)}</strong>
          </div>

          <div className="maintenance-progress-label">
            <span>Budget Utilization</span>

            <strong>{maintenanceBudgetUsage.toFixed(1)}%</strong>
          </div>

          <div className="maintenance-progress">
            <div
              style={{
                width: `${Math.min(maintenanceBudgetUsage, 100)}%`,
              }}
            />
          </div>

          <div className="maintenance-footer-stats">
            <div>
              <span>Remaining Budget</span>

              <strong>{formatRupiah(maintenanceRemaining)}</strong>
            </div>

            <div>
              <span>Attention</span>

              <strong>{maintenanceWarningCount} Kiln</strong>
            </div>
          </div>
        </div>

        {/* =================================================
         * COST BY KILN
         * ================================================= */}

        <div className="panel-card maintenance-cost-card">
          <div className="panel-header">
            <div>
              <h3>Cost by Kiln</h3>

              <span>Maintenance expenditure</span>
            </div>

            <Factory size={20} />
          </div>

          <div className="maintenance-list">
            {maintenanceData.map((item) => {
              const percentage = (item.cost / totalMaintenanceCost) * 100;

              return (
                <div className="maintenance-item" key={item.kiln}>
                  <div className="maintenance-item-header">
                    <div className="maintenance-kiln-name">
                      <div className="maintenance-kiln-icon">
                        <Wrench size={16} />
                      </div>

                      <strong>Kiln {item.kiln}</strong>
                    </div>

                    <span className={getMaintenanceStatusClass(item.status)}>
                      {item.status}
                    </span>
                  </div>

                  <div className="maintenance-cost-row">
                    <strong>{formatRupiah(item.cost)}</strong>

                    <span>{percentage.toFixed(1)}%</span>
                  </div>

                  <div className="maintenance-bar">
                    <div
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* =====================================================
       * QUALITY + AI ALERT
       * ===================================================== */}

      <div className="content-grid">
        {/* Quality */}

        <div className="panel-card">
          <div className="panel-header">
            <div>
              <h3>Clinker Quality</h3>

              <span>Latest laboratory results</span>
            </div>

            <Layers3 size={20} />
          </div>

          <div className="quality-table-wrapper">
            <table className="quality-table">
              <thead>
                <tr>
                  <th>Composition</th>
                  <th>Unit</th>
                  <th>Method</th>
                  <th>Specification</th>
                  <th>Result</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>CaO</td>
                  <td>%</td>
                  <td>XRF</td>
                  <td>≤ 66.0</td>
                  <td>64.82</td>
                  <td>
                    <span className="quality-pass">PASS</span>
                  </td>
                </tr>

                <tr>
                  <td>SiO₂</td>
                  <td>%</td>
                  <td>XRF</td>
                  <td>20.0 – 23.0</td>
                  <td>21.42</td>
                  <td>
                    <span className="quality-pass">PASS</span>
                  </td>
                </tr>

                <tr>
                  <td>Al₂O₃</td>
                  <td>%</td>
                  <td>XRF</td>
                  <td>4.0 – 7.0</td>
                  <td>5.31</td>
                  <td>
                    <span className="quality-pass">PASS</span>
                  </td>
                </tr>

                <tr>
                  <td>Fe₂O₃</td>
                  <td>%</td>
                  <td>XRF</td>
                  <td>2.0 – 4.0</td>
                  <td>3.02</td>
                  <td>
                    <span className="quality-pass">PASS</span>
                  </td>
                </tr>

                <tr>
                  <td>Free CaO</td>
                  <td>%</td>
                  <td>Chemical</td>
                  <td>≤ 1.50</td>
                  <td>1.18</td>
                  <td>
                    <span className="quality-pass">PASS</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Alerts */}

        <div className="panel-card">
          <div className="panel-header">
            <div>
              <h3>AI Alerts</h3>

              <span>Industrial intelligence</span>
            </div>

            <AlertTriangle size={20} />
          </div>

          <div className="alert-list">
            <div className="ai-alert warning">
              <div className="alert-icon">
                <AlertTriangle size={19} />
              </div>

              <div>
                <strong>Kiln T4 Production Deviation</strong>

                <p>Production is 15.0% below target.</p>

                <small>AI Detection · 8 min ago</small>
              </div>
            </div>

            <div className="ai-alert">
              <div className="alert-icon">
                <Activity size={19} />
              </div>

              <div>
                <strong>Clinker Quality Stable</strong>

                <p>Chemistry parameters remain within expected range.</p>

                <small>AI Monitoring · 14 min ago</small>
              </div>
            </div>

            <div className="ai-alert">
              <div className="alert-icon">
                <Truck size={19} />
              </div>

              <div>
                <strong>Dispatch Flow Normal</strong>

                <p>Clinker dispatch is operating normally.</p>

                <small>AI Monitoring · 21 min ago</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
       * FOOTER
       * ===================================================== */}

      <div className="dashboard-footer">
        <span>ABN Industrial Intelligence</span>

        <span>PT Semen Tonasa · Clinker Intelligence</span>
      </div>
    </div>
  );
};

export default Dashboard;
