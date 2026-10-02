import React from "react";
import {
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Factory,
  Gauge,
  Settings2,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Wrench,
  // XCircle,
} from "lucide-react";
import "./Maintenance.css";
type MaintenanceStatus = "PLANNED" | "IN PROGRESS" | "COMPLETED" | "OVERDUE";
type Priority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
interface MaintenanceRecord {
  id: string;
  equipment: string;
  area: string;
  type: string;
  priority: Priority;
  status: MaintenanceStatus;
  cost: number;
  technician: string;
  dueDate: string;
}
interface EquipmentHealth {
  equipment: string;
  area: string;
  health: number;
  status: "GOOD" | "WARNING" | "CRITICAL";
  lastMaintenance: string;
}
interface KilnMaintenance {
  kiln: string;
  budget: number;
  actual: number;
  workOrders: number;
}
const maintenanceRecords: MaintenanceRecord[] = [
  {
    id: "WO-260914-001",
    equipment: "Kiln T4 Main Drive",
    area: "Kiln T4",
    type: "Corrective Maintenance",
    priority: "CRITICAL",
    status: "IN PROGRESS",
    cost: 68_500_000,
    technician: "Mechanical Team A",
    dueDate: "14 Sep 2026",
  },
  {
    id: "WO-260914-002",
    equipment: "Kiln T3 ID Fan",
    area: "Kiln T3",
    type: "Preventive Maintenance",
    priority: "HIGH",
    status: "PLANNED",
    cost: 32_000_000,
    technician: "Mechanical Team B",
    dueDate: "16 Sep 2026",
  },
  {
    id: "WO-260914-003",
    equipment: "Kiln T2 Burner System",
    area: "Kiln T2",
    type: "Inspection",
    priority: "MEDIUM",
    status: "COMPLETED",
    cost: 18_500_000,
    technician: "Process Team",
    dueDate: "12 Sep 2026",
  },
  {
    id: "WO-260914-004",
    equipment: "Kiln T5 Cooler Fan",
    area: "Kiln T5",
    type: "Preventive Maintenance",
    priority: "MEDIUM",
    status: "PLANNED",
    cost: 27_000_000,
    technician: "Mechanical Team C",
    dueDate: "18 Sep 2026",
  },
  {
    id: "WO-260914-005",
    equipment: "Clinker Conveyor CV-04",
    area: "Clinker Transport",
    type: "Corrective Maintenance",
    priority: "HIGH",
    status: "OVERDUE",
    cost: 14_800_000,
    technician: "Electrical Team",
    dueDate: "10 Sep 2026",
  },
  {
    id: "WO-260914-006",
    equipment: "Raw Mill Hydraulic Unit",
    area: "Raw Mill",
    type: "Preventive Maintenance",
    priority: "LOW",
    status: "COMPLETED",
    cost: 21_500_000,
    technician: "Mechanical Team A",
    dueDate: "11 Sep 2026",
  },
];
const equipmentHealth: EquipmentHealth[] = [
  {
    equipment: "Kiln T2 Main Drive",
    area: "Kiln T2",
    health: 94,
    status: "GOOD",
    lastMaintenance: "05 Sep 2026",
  },
  {
    equipment: "Kiln T3 Main Drive",
    area: "Kiln T3",
    health: 91,
    status: "GOOD",
    lastMaintenance: "03 Sep 2026",
  },
  {
    equipment: "Kiln T4 Main Drive",
    area: "Kiln T4",
    health: 62,
    status: "WARNING",
    lastMaintenance: "21 Aug 2026",
  },
  {
    equipment: "Kiln T5 Main Drive",
    area: "Kiln T5",
    health: 96,
    status: "GOOD",
    lastMaintenance: "07 Sep 2026",
  },
  {
    equipment: "Clinker Conveyor CV-04",
    area: "Clinker Transport",
    health: 48,
    status: "CRITICAL",
    lastMaintenance: "02 Aug 2026",
  },
];
const kilnMaintenance: KilnMaintenance[] = [
  { kiln: "T2", budget: 100_000_000, actual: 82_500_000, workOrders: 5 },
  { kiln: "T3", budget: 110_000_000, actual: 91_200_000, workOrders: 6 },
  { kiln: "T4", budget: 150_000_000, actual: 156_800_000, workOrders: 9 },
  { kiln: "T5", budget: 140_000_000, actual: 98_000_000, workOrders: 4 },
];
const maintenanceBudget = 500_000_000;
const formatRupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
const getStatusClass = (status: MaintenanceStatus) => {
  switch (status) {
    case "PLANNED":
      return "maintenance-status-planned";
    case "IN PROGRESS":
      return "maintenance-status-progress";
    case "COMPLETED":
      return "maintenance-status-completed";
    case "OVERDUE":
      return "maintenance-status-overdue";
    default:
      return "";
  }
};
const getPriorityClass = (priority: Priority) => {
  switch (priority) {
    case "LOW":
      return "priority-low";
    case "MEDIUM":
      return "priority-medium";
    case "HIGH":
      return "priority-high";
    case "CRITICAL":
      return "priority-critical";
    default:
      return "";
  }
};
const getHealthClass = (status: EquipmentHealth["status"]) => {
  switch (status) {
    case "GOOD":
      return "health-good";
    case "WARNING":
      return "health-warning";
    case "CRITICAL":
      return "health-critical";
    default:
      return "";
  }
};
const Maintenance: React.FC = () => {
  const totalMaintenanceCost = kilnMaintenance.reduce(
    (sum, item) => sum + item.actual,
    0,
  );
  const budgetUsage = (totalMaintenanceCost / maintenanceBudget) * 100;
  const remainingBudget = Math.max(maintenanceBudget - totalMaintenanceCost, 0);
  const openWorkOrders = maintenanceRecords.filter(
    (item) => item.status === "PLANNED" || item.status === "IN PROGRESS",
  ).length;
  const overdueWorkOrders = maintenanceRecords.filter(
    (item) => item.status === "OVERDUE",
  ).length;
  const completedWorkOrders = maintenanceRecords.filter(
    (item) => item.status === "COMPLETED",
  ).length;
  const criticalAssets = equipmentHealth.filter(
    (item) => item.status === "CRITICAL",
  ).length;
  return (
    <div className="maintenance-page">
      {" "}
      {/* ===================================================== * HEADER * ===================================================== */}{" "}
      <div className="maintenance-header">
        {" "}
        <div>
          {" "}
          <div className="maintenance-eyebrow">
            {" "}
            ABN INDUSTRIAL INTELLIGENCE{" "}
          </div>{" "}
          <h1>Maintenance Management</h1>{" "}
          <p>
            {" "}
            Predictive, Preventive & Corrective Maintenance Intelligence{" "}
          </p>{" "}
        </div>{" "}
        <div className="maintenance-live">
          {" "}
          <span /> MAINTENANCE MONITORING{" "}
        </div>{" "}
      </div>{" "}
      {/* ===================================================== * KPI * ===================================================== */}{" "}
      <div className="maintenance-kpi-grid">
        {" "}
        <div className="maintenance-kpi-card">
          {" "}
          <div className="maintenance-kpi-icon">
            {" "}
            <CircleDollarSign size={22} />{" "}
          </div>{" "}
          <div>
            {" "}
            <span>Maintenance Cost</span>{" "}
            <strong> {formatRupiah(totalMaintenanceCost)} </strong>{" "}
            <small> Current period </small>{" "}
          </div>{" "}
          <TrendingUp className="maintenance-kpi-trend" size={19} />{" "}
        </div>{" "}
        <div className="maintenance-kpi-card">
          {" "}
          <div className="maintenance-kpi-icon">
            {" "}
            <Gauge size={22} />{" "}
          </div>{" "}
          <div>
            {" "}
            <span>Budget Utilization</span>{" "}
            <strong> {budgetUsage.toFixed(1)}% </strong>{" "}
            <small> Budget {formatRupiah(maintenanceBudget)} </small>{" "}
          </div>{" "}
        </div>{" "}
        <div className="maintenance-kpi-card">
          {" "}
          <div className="maintenance-kpi-icon">
            {" "}
            <Wrench size={22} />{" "}
          </div>{" "}
          <div>
            {" "}
            <span>Open Work Orders</span> <strong> {openWorkOrders} </strong>{" "}
            <small> Planned + In Progress </small>{" "}
          </div>{" "}
        </div>{" "}
        <div className="maintenance-kpi-card maintenance-warning">
          {" "}
          <div className="maintenance-kpi-icon">
            {" "}
            <AlertTriangle size={22} />{" "}
          </div>{" "}
          <div>
            {" "}
            <span>Overdue Maintenance</span>{" "}
            <strong> {overdueWorkOrders} </strong>{" "}
            <small> Requires attention </small>{" "}
          </div>{" "}
        </div>{" "}
        <div className="maintenance-kpi-card">
          {" "}
          <div className="maintenance-kpi-icon">
            {" "}
            <CheckCircle2 size={22} />{" "}
          </div>{" "}
          <div>
            {" "}
            <span>Completed</span> <strong> {completedWorkOrders} </strong>{" "}
            <small> Completed work orders </small>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {/* ===================================================== * BUDGET + HEALTH * ===================================================== */}{" "}
      <div className="maintenance-top-grid">
        {" "}
        {/* Budget */}{" "}
        <div className="maintenance-panel">
          {" "}
          <div className="maintenance-panel-header">
            {" "}
            <div>
              {" "}
              <h2>Maintenance Budget</h2>{" "}
              <span> Current expenditure monitoring </span>{" "}
            </div>{" "}
            <CircleDollarSign size={20} />{" "}
          </div>{" "}
          <div className="budget-main">
            {" "}
            <span>Total Maintenance Cost</span>{" "}
            <strong> {formatRupiah(totalMaintenanceCost)} </strong>{" "}
          </div>{" "}
          <div className="budget-row">
            {" "}
            <span>Allocated Budget</span>{" "}
            <strong> {formatRupiah(maintenanceBudget)} </strong>{" "}
          </div>{" "}
          <div className="budget-row">
            {" "}
            <span>Remaining Budget</span>{" "}
            <strong className="budget-remaining">
              {" "}
              {formatRupiah(remainingBudget)}{" "}
            </strong>{" "}
          </div>{" "}
          <div className="budget-progress-label">
            {" "}
            <span> Budget Utilization </span>{" "}
            <strong> {budgetUsage.toFixed(1)}% </strong>{" "}
          </div>{" "}
          <div className="budget-progress">
            {" "}
            <div style={{ width: `${Math.min(budgetUsage, 100)}%` }} />{" "}
          </div>{" "}
          <div className="budget-footer">
            {" "}
            <div>
              {" "}
              <TrendingUp size={17} /> <span> Actual Cost </span>{" "}
              <strong> {formatRupiah(totalMaintenanceCost)} </strong>{" "}
            </div>{" "}
            <div>
              {" "}
              <TrendingDown size={17} /> <span> Remaining </span>{" "}
              <strong> {formatRupiah(remainingBudget)} </strong>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {/* Equipment Health */}{" "}
        <div className="maintenance-panel">
          {" "}
          <div className="maintenance-panel-header">
            {" "}
            <div>
              {" "}
              <h2>Equipment Health</h2>{" "}
              <span> Asset condition monitoring </span>{" "}
            </div>{" "}
            <ShieldCheck size={20} />{" "}
          </div>{" "}
          <div className="health-list">
            {" "}
            {equipmentHealth.map((equipment) => (
              <div className="health-item" key={equipment.equipment}>
                {" "}
                <div className="health-item-header">
                  {" "}
                  <div>
                    {" "}
                    <strong> {equipment.equipment} </strong>{" "}
                    <span> {equipment.area} </span>{" "}
                  </div>{" "}
                  <span
                    className={`health-badge ${getHealthClass(equipment.status)}`}
                  >
                    {" "}
                    {equipment.status}{" "}
                  </span>{" "}
                </div>{" "}
                <div className="health-progress-row">
                  {" "}
                  <div className="health-progress">
                    {" "}
                    <div
                      className={getHealthClass(equipment.status)}
                      style={{ width: `${equipment.health}%` }}
                    />{" "}
                  </div>{" "}
                  <strong> {equipment.health}% </strong>{" "}
                </div>{" "}
                <small>
                  {" "}
                  Last maintenance: {equipment.lastMaintenance}{" "}
                </small>{" "}
              </div>
            ))}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {/* ===================================================== * COST BY KILN * ===================================================== */}{" "}
      <div className="maintenance-panel">
        {" "}
        <div className="maintenance-panel-header">
          {" "}
          <div>
            {" "}
            <h2>Maintenance Cost by Kiln</h2>{" "}
            <span> Budget versus actual maintenance expenditure </span>{" "}
          </div>{" "}
          <Factory size={20} />{" "}
        </div>{" "}
        <div className="kiln-maintenance-grid">
          {" "}
          {kilnMaintenance.map((item) => {
            const usage = (item.actual / item.budget) * 100;
            const variance = item.actual - item.budget;
            return (
              <div className="kiln-maintenance-card" key={item.kiln}>
                {" "}
                <div className="kiln-maintenance-header">
                  {" "}
                  <div className="kiln-badge"> T{item.kiln} </div>{" "}
                  <div>
                    {" "}
                    <strong> Kiln T{item.kiln} </strong>{" "}
                    <span> {item.workOrders} work orders </span>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="kiln-cost">
                  {" "}
                  <span>Actual Cost</span>{" "}
                  <strong> {formatRupiah(item.actual)} </strong>{" "}
                </div>{" "}
                <div className="kiln-budget">
                  {" "}
                  <span> Budget </span>{" "}
                  <strong> {formatRupiah(item.budget)} </strong>{" "}
                </div>{" "}
                <div className="kiln-progress-label">
                  {" "}
                  <span> Utilization </span>{" "}
                  <strong> {usage.toFixed(1)}% </strong>{" "}
                </div>{" "}
                <div className="kiln-progress">
                  {" "}
                  <div
                    className={usage > 100 ? "over-budget" : ""}
                    style={{ width: `${Math.min(usage, 100)}%` }}
                  />{" "}
                </div>{" "}
                <div
                  className={`kiln-variance ${variance > 0 ? "variance-negative" : "variance-positive"}`}
                >
                  {" "}
                  {variance > 0
                    ? `Over budget ${formatRupiah(variance)}`
                    : `Under budget ${formatRupiah(Math.abs(variance))}`}{" "}
                </div>{" "}
              </div>
            );
          })}{" "}
        </div>{" "}
      </div>{" "}
      {/* ===================================================== * WORK ORDERS * ===================================================== */}{" "}
      <div className="maintenance-panel work-order-panel">
        {" "}
        <div className="maintenance-panel-header">
          {" "}
          <div>
            {" "}
            <h2>Maintenance Work Orders</h2>{" "}
            <span> Planned, corrective and preventive maintenance </span>{" "}
          </div>{" "}
          <Settings2 size={20} />{" "}
        </div>{" "}
        <div className="work-order-table-wrapper">
          {" "}
          <table className="work-order-table">
            {" "}
            <thead>
              {" "}
              <tr>
                {" "}
                <th>Work Order</th> <th>Equipment</th> <th>Type</th>{" "}
                <th>Priority</th> <th>Status</th> <th>Cost</th>{" "}
                <th>Technician</th> <th>Due Date</th>{" "}
              </tr>{" "}
            </thead>{" "}
            <tbody>
              {" "}
              {maintenanceRecords.map((item) => (
                <tr key={item.id}>
                  {" "}
                  <td>
                    {" "}
                    <strong className="work-order-id"> {item.id} </strong>{" "}
                  </td>{" "}
                  <td>
                    {" "}
                    <div className="equipment-cell">
                      {" "}
                      <strong> {item.equipment} </strong>{" "}
                      <span> {item.area} </span>{" "}
                    </div>{" "}
                  </td>{" "}
                  <td> {item.type} </td>{" "}
                  <td>
                    {" "}
                    <span
                      className={`priority-badge ${getPriorityClass(item.priority)}`}
                    >
                      {" "}
                      {item.priority}{" "}
                    </span>{" "}
                  </td>{" "}
                  <td>
                    {" "}
                    <span
                      className={`work-status ${getStatusClass(item.status)}`}
                    >
                      {" "}
                      {item.status}{" "}
                    </span>{" "}
                  </td>{" "}
                  <td>
                    {" "}
                    <strong> {formatRupiah(item.cost)} </strong>{" "}
                  </td>{" "}
                  <td> {item.technician} </td>{" "}
                  <td>
                    {" "}
                    <div className="due-date">
                      {" "}
                      <CalendarClock size={15} /> {item.dueDate}{" "}
                    </div>{" "}
                  </td>{" "}
                </tr>
              ))}{" "}
            </tbody>{" "}
          </table>{" "}
        </div>{" "}
      </div>{" "}
      {/* ===================================================== * MAINTENANCE SUMMARY * ===================================================== */}{" "}
      <div className="maintenance-summary-grid">
        {" "}
        <div className="summary-card">
          {" "}
          <div className="summary-icon">
            {" "}
            <AlertTriangle size={21} />{" "}
          </div>{" "}
          <div>
            {" "}
            <span> Critical Assets </span> <strong> {criticalAssets} </strong>{" "}
            <small> Immediate attention required </small>{" "}
          </div>{" "}
        </div>{" "}
        <div className="summary-card">
          {" "}
          <div className="summary-icon">
            {" "}
            <Clock3 size={21} />{" "}
          </div>{" "}
          <div>
            {" "}
            <span> Open Work Orders </span> <strong> {openWorkOrders} </strong>{" "}
            <small> Maintenance activities </small>{" "}
          </div>{" "}
        </div>{" "}
        <div className="summary-card">
          {" "}
          <div className="summary-icon">
            {" "}
            <CheckCircle2 size={21} />{" "}
          </div>{" "}
          <div>
            {" "}
            <span> Completion Rate </span>{" "}
            <strong>
              {" "}
              {(
                (completedWorkOrders / maintenanceRecords.length) *
                100
              ).toFixed(0)}{" "}
              %{" "}
            </strong>{" "}
            <small> Work order completion </small>{" "}
          </div>{" "}
        </div>{" "}
        <div className="summary-card">
          {" "}
          <div className="summary-icon">
            {" "}
            <Factory size={21} />{" "}
          </div>{" "}
          <div>
            {" "}
            <span> Equipment Monitored </span>{" "}
            <strong> {equipmentHealth.length} </strong>{" "}
            <small> Critical production assets </small>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {/* ===================================================== * FOOTER * ===================================================== */}{" "}
      <div className="maintenance-footer">
        {" "}
        <span> ABN Industrial Intelligence </span>{" "}
        <span> PT Semen Tonasa · Maintenance Intelligence </span>{" "}
      </div>{" "}
    </div>
  );
};
export default Maintenance;
