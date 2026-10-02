import React, { useMemo, useState } from "react";
import {
  Activity,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Download,
  Eye,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  ShieldCheck,
  Users,
  UserCheck,
  UserMinus,
  UserPlus,
  XCircle,
} from "lucide-react";

import "./Employees.css";

type EmployeeStatus = "ACTIVE" | "ON LEAVE" | "INACTIVE";

interface Employee {
  id: string;
  name: string;
  employeeNo: string;
  position: string;
  department: string;
  location: string;
  joinDate: string;
  status: EmployeeStatus;
  attendance: number;
  email: string;
  avatar: string;
}

const employees: Employee[] = [
  {
    id: "EMP-001",
    name: "Andi Pratama",
    employeeNo: "TON-2021-001",
    position: "Plant Manager",
    department: "Production",
    location: "Tonasa V",
    joinDate: "12 Jan 2021",
    status: "ACTIVE",
    attendance: 98,
    email: "andi.pratama@tonasa.co.id",
    avatar: "AP",
  },
  {
    id: "EMP-002",
    name: "Budi Santoso",
    employeeNo: "TON-2020-014",
    position: "Maintenance Manager",
    department: "Maintenance",
    location: "Tonasa V",
    joinDate: "03 Aug 2020",
    status: "ACTIVE",
    attendance: 96,
    email: "budi.santoso@tonasa.co.id",
    avatar: "BS",
  },
  {
    id: "EMP-003",
    name: "Citra Lestari",
    employeeNo: "TON-2022-087",
    position: "HR Specialist",
    department: "Human Resources",
    location: "Head Office",
    joinDate: "18 Mar 2022",
    status: "ACTIVE",
    attendance: 97,
    email: "citra.lestari@tonasa.co.id",
    avatar: "CL",
  },
  {
    id: "EMP-004",
    name: "Dedi Kurniawan",
    employeeNo: "TON-2019-042",
    position: "Electrical Engineer",
    department: "Engineering",
    location: "Tonasa IV",
    joinDate: "21 Sep 2019",
    status: "ON LEAVE",
    attendance: 91,
    email: "dedi.kurniawan@tonasa.co.id",
    avatar: "DK",
  },
  {
    id: "EMP-005",
    name: "Erna Wulandari",
    employeeNo: "TON-2023-115",
    position: "Finance Analyst",
    department: "Finance",
    location: "Head Office",
    joinDate: "08 May 2023",
    status: "ACTIVE",
    attendance: 99,
    email: "erna.wulandari@tonasa.co.id",
    avatar: "EW",
  },
  {
    id: "EMP-006",
    name: "Fajar Hidayat",
    employeeNo: "TON-2021-076",
    position: "Warehouse Supervisor",
    department: "Warehouse",
    location: "Biringkassi",
    joinDate: "14 Nov 2021",
    status: "ACTIVE",
    attendance: 95,
    email: "fajar.hidayat@tonasa.co.id",
    avatar: "FH",
  },
  {
    id: "EMP-007",
    name: "Gilang Ramadhan",
    employeeNo: "TON-2024-031",
    position: "Process Engineer",
    department: "Production",
    location: "Tonasa II",
    joinDate: "15 Feb 2024",
    status: "ACTIVE",
    attendance: 94,
    email: "gilang.ramadhan@tonasa.co.id",
    avatar: "GR",
  },
  {
    id: "EMP-008",
    name: "Hendra Wijaya",
    employeeNo: "TON-2018-019",
    position: "Fleet Coordinator",
    department: "Fleet Management",
    location: "Biringkassi",
    joinDate: "09 Jul 2018",
    status: "INACTIVE",
    attendance: 88,
    email: "hendra.wijaya@tonasa.co.id",
    avatar: "HW",
  },
  {
    id: "EMP-009",
    name: "Intan Permata",
    employeeNo: "TON-2022-103",
    position: "Procurement Officer",
    department: "Procurement",
    location: "Head Office",
    joinDate: "11 Apr 2022",
    status: "ACTIVE",
    attendance: 98,
    email: "intan.permata@tonasa.co.id",
    avatar: "IP",
  },
  {
    id: "EMP-010",
    name: "Joko Saputra",
    employeeNo: "TON-2020-056",
    position: "Mechanical Technician",
    department: "Maintenance",
    location: "Tonasa V",
    joinDate: "25 Oct 2020",
    status: "ACTIVE",
    attendance: 93,
    email: "joko.saputra@tonasa.co.id",
    avatar: "JS",
  },
];

const departmentData = [
  { name: "Production", value: 28, total: 86 },
  { name: "Maintenance", value: 21, total: 86 },
  { name: "Engineering", value: 12, total: 86 },
  { name: "Finance", value: 8, total: 86 },
  { name: "HR", value: 7, total: 86 },
  { name: "Others", value: 10, total: 86 },
];

const attendanceData = [
  { day: "Mon", value: 96 },
  { day: "Tue", value: 98 },
  { day: "Wed", value: 97 },
  { day: "Thu", value: 95 },
  { day: "Fri", value: 96 },
  { day: "Sat", value: 91 },
  { day: "Sun", value: 88 },
];

const statusConfig: Record<
  EmployeeStatus,
  {
    className: string;
    icon: React.ElementType;
  }
> = {
  ACTIVE: {
    className: "status-active",
    icon: CheckCircle2,
  },
  "ON LEAVE": {
    className: "status-leave",
    icon: Clock3,
  },
  INACTIVE: {
    className: "status-inactive",
    icon: XCircle,
  },
};

const Employees: React.FC = () => {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All Departments");
  const [status, setStatus] = useState("All Status");
  const [showFilter, setShowFilter] = useState(false);

  const filteredEmployees = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return employees.filter((employee) => {
      const matchesSearch =
        !keyword ||
        employee.name.toLowerCase().includes(keyword) ||
        employee.employeeNo.toLowerCase().includes(keyword) ||
        employee.position.toLowerCase().includes(keyword) ||
        employee.department.toLowerCase().includes(keyword);

      const matchesDepartment =
        department === "All Departments" || employee.department === department;

      const matchesStatus =
        status === "All Status" || employee.status === status;

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [search, department, status]);

  const totalEmployees = 86;
  const activeEmployees = 81;
  const onLeave = 3;
  const inactiveEmployees = 2;

  return (
    <div className="employees-page">
      {/* =====================================================
       * HEADER
       * ===================================================== */}
      <div className="employees-header">
        <div>
          <div className="employees-eyebrow">
            <Users size={15} />
            HUMAN RESOURCES
          </div>

          <h1>Employees</h1>

          <p>
            Employee directory, workforce status, attendance overview, and
            organizational workforce insights.
          </p>
        </div>

        <div className="employees-header-actions">
          <button className="employees-btn employees-btn-secondary">
            <Download size={17} />
            Export
          </button>

          <button className="employees-btn employees-btn-primary">
            <Plus size={18} />
            Add Employee
          </button>
        </div>
      </div>

      {/* =====================================================
       * KPI
       * ===================================================== */}
      <div className="employees-kpi-grid">
        <div className="employee-kpi-card">
          <div className="employee-kpi-icon blue">
            <Users size={21} />
          </div>

          <div className="employee-kpi-content">
            <span>Total Employees</span>
            <strong>{totalEmployees}</strong>
            <small>
              <TrendingUpIcon />
              +4.8% this year
            </small>
          </div>
        </div>

        <div className="employee-kpi-card">
          <div className="employee-kpi-icon green">
            <UserCheck size={21} />
          </div>

          <div className="employee-kpi-content">
            <span>Active Employees</span>
            <strong>{activeEmployees}</strong>
            <small className="positive">
              <CheckCircle2 size={13} />
              94.2% of workforce
            </small>
          </div>
        </div>

        <div className="employee-kpi-card">
          <div className="employee-kpi-icon orange">
            <CalendarDays size={21} />
          </div>

          <div className="employee-kpi-content">
            <span>On Leave</span>
            <strong>{onLeave}</strong>
            <small>
              <Clock3 size={13} />
              Current period
            </small>
          </div>
        </div>

        <div className="employee-kpi-card">
          <div className="employee-kpi-icon purple">
            <BriefcaseBusiness size={21} />
          </div>

          <div className="employee-kpi-content">
            <span>New This Month</span>
            <strong>6</strong>
            <small className="positive">
              <UserPlus size={13} />2 pending onboarding
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
       * OVERVIEW
       * ===================================================== */}
      <div className="employees-overview-grid">
        {/* Department */}
        <section className="employees-card department-card">
          <div className="employees-card-header">
            <div>
              <h2>Workforce by Department</h2>
              <p>Employee distribution across organization</p>
            </div>

            <Building2 size={20} />
          </div>

          <div className="department-list">
            {departmentData.map((item) => {
              const percentage = Math.round((item.value / item.total) * 100);

              return (
                <div className="department-row" key={item.name}>
                  <div className="department-row-top">
                    <span>{item.name}</span>
                    <strong>{item.value}</strong>
                  </div>

                  <div className="department-progress">
                    <span style={{ width: `${percentage}%` }} />
                  </div>

                  <div className="department-percentage">
                    {percentage}% of workforce
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Attendance */}
        <section className="employees-card attendance-card">
          <div className="employees-card-header">
            <div>
              <h2>Attendance Snapshot</h2>
              <p>Average attendance this week</p>
            </div>

            <Activity size={20} />
          </div>

          <div className="attendance-main">
            <div>
              <strong>95.4%</strong>
              <span>
                <CheckCircle2 size={14} />
                Healthy attendance
              </span>
            </div>

            <div className="attendance-chart">
              {attendanceData.map((item) => (
                <div className="attendance-column" key={item.day}>
                  <div className="attendance-value">{item.value}%</div>

                  <div className="attendance-bar-wrapper">
                    <div
                      className="attendance-bar"
                      style={{
                        height: `${Math.max(item.value - 80, 8) * 5}px`,
                      }}
                    />
                  </div>

                  <span>{item.day}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* =====================================================
       * WORKFORCE STATUS
       * ===================================================== */}
      <div className="workforce-status-grid">
        <div className="workforce-mini-card">
          <div className="mini-icon green">
            <UserCheck size={18} />
          </div>

          <div>
            <span>Active Workforce</span>
            <strong>81</strong>
          </div>

          <em>94.2%</em>
        </div>

        <div className="workforce-mini-card">
          <div className="mini-icon orange">
            <Clock3 size={18} />
          </div>

          <div>
            <span>On Leave</span>
            <strong>3</strong>
          </div>

          <em>3.5%</em>
        </div>

        <div className="workforce-mini-card">
          <div className="mini-icon red">
            <UserMinus size={18} />
          </div>

          <div>
            <span>Inactive</span>
            <strong>{inactiveEmployees}</strong>
          </div>

          <em>2.3%</em>
        </div>

        <div className="workforce-mini-card">
          <div className="mini-icon blue">
            <ShieldCheck size={18} />
          </div>

          <div>
            <span>Compliance</span>
            <strong>98.6%</strong>
          </div>

          <em>Excellent</em>
        </div>
      </div>

      {/* =====================================================
       * EMPLOYEE DIRECTORY
       * ===================================================== */}
      <section className="employees-card employee-directory">
        <div className="directory-header">
          <div>
            <h2>Employee Directory</h2>
            <p>Manage employee information and current workforce status.</p>
          </div>

          <div className="directory-actions">
            <div className="employee-search">
              <Search size={17} />

              <input
                type="text"
                placeholder="Search employee..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <button
              className={`filter-button ${showFilter ? "active" : ""}`}
              onClick={() => setShowFilter((value) => !value)}
            >
              <Filter size={17} />
              Filter
              <ChevronDown size={15} />
            </button>
          </div>
        </div>

        {showFilter && (
          <div className="employee-filter-panel">
            <div className="filter-group">
              <label>Department</label>

              <select
                value={department}
                onChange={(event) => setDepartment(event.target.value)}
              >
                <option>All Departments</option>
                <option>Production</option>
                <option>Maintenance</option>
                <option>Engineering</option>
                <option>Finance</option>
                <option>Human Resources</option>
                <option>Warehouse</option>
                <option>Fleet Management</option>
                <option>Procurement</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Status</label>

              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                <option>All Status</option>
                <option>ACTIVE</option>
                <option>ON LEAVE</option>
                <option>INACTIVE</option>
              </select>
            </div>

            <button
              className="clear-filter"
              onClick={() => {
                setDepartment("All Departments");
                setStatus("All Status");
                setSearch("");
              }}
            >
              Clear Filters
            </button>
          </div>
        )}

        <div className="employee-table-wrapper">
          <table className="employee-table">
            <thead>
              <tr>
                <th>EMPLOYEE</th>
                <th>POSITION</th>
                <th>DEPARTMENT</th>
                <th>LOCATION</th>
                <th>JOIN DATE</th>
                <th>ATTENDANCE</th>
                <th>STATUS</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.map((employee) => {
                const statusInfo = statusConfig[employee.status];
                const StatusIcon = statusInfo.icon;

                return (
                  <tr key={employee.id}>
                    <td>
                      <div className="employee-person">
                        <div className="employee-avatar">{employee.avatar}</div>

                        <div>
                          <strong>{employee.name}</strong>
                          <span>{employee.employeeNo}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="employee-position">
                        <strong>{employee.position}</strong>
                        <span>{employee.email}</span>
                      </div>
                    </td>

                    <td>
                      <span className="department-badge">
                        {employee.department}
                      </span>
                    </td>

                    <td>
                      <span className="location-text">{employee.location}</span>
                    </td>

                    <td>
                      <span className="join-date">{employee.joinDate}</span>
                    </td>

                    <td>
                      <div className="attendance-cell">
                        <div className="attendance-cell-top">
                          <strong>{employee.attendance}%</strong>

                          {employee.attendance >= 95 ? (
                            <CheckCircle2 size={14} />
                          ) : (
                            <Clock3 size={14} />
                          )}
                        </div>

                        <div className="attendance-cell-bar">
                          <span
                            style={{
                              width: `${employee.attendance}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`employee-status ${statusInfo.className}`}
                      >
                        <StatusIcon size={13} />
                        {employee.status}
                      </span>
                    </td>

                    <td>
                      <div className="employee-row-actions">
                        <button title="View employee">
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
            </tbody>
          </table>

          {filteredEmployees.length === 0 && (
            <div className="employee-empty">
              <Users size={32} />
              <strong>No employees found</strong>
              <span>Try changing your search keyword or filters.</span>
            </div>
          )}
        </div>

        <div className="directory-footer">
          <span>
            Showing <strong>{filteredEmployees.length}</strong> of{" "}
            <strong>{employees.length}</strong> employees
          </span>

          <div className="pagination">
            <button disabled>Previous</button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>Next</button>
          </div>
        </div>
      </section>

      {/* =====================================================
       * HR INSIGHTS
       * ===================================================== */}
      <div className="employees-insight">
        <div className="insight-icon">
          <CircleDollarSign size={21} />
        </div>

        <div>
          <strong>Workforce Insight</strong>
          <p>
            Employee attendance remains strong at <b>95.4%</b>. Production and
            Maintenance represent the largest workforce groups and should remain
            a priority for manpower planning.
          </p>
        </div>

        <button className="employees-btn employees-btn-secondary">
          View HR Analytics
        </button>
      </div>

      <div className="employees-footer">
        <span>ABN Human Resources Management System</span>
        <span>Designed by ABN</span>
      </div>
    </div>
  );
};

/* =========================================================
 * SMALL ICON
 * ========================================================= */

const TrendingUpIcon = () => <span className="kpi-trending">↗</span>;

export default Employees;
