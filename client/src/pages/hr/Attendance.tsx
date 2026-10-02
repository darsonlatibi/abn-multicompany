import React, { useMemo, useState } from "react";
import {
  Activity,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  Filter,
  LogIn,
  LogOut,
  MoreHorizontal,
  Search,
  Timer,
  UserCheck,
  UserMinus,
  Users,
  XCircle,
} from "lucide-react";

import "./Attendance.css";

type AttendanceStatus = "PRESENT" | "LATE" | "ABSENT" | "LEAVE" | "OFF";

type ShiftType = "DAY" | "NIGHT" | "GENERAL";

interface AttendanceRecord {
  id: string;
  employeeNo: string;
  employee: string;
  department: string;
  shift: ShiftType;
  date: string;
  checkIn: string;
  checkOut: string;
  workHours: string;
  lateMinutes: number;
  status: AttendanceStatus;
}

const attendanceRecords: AttendanceRecord[] = [
  {
    id: "ATT-001",
    employeeNo: "TON-2021-001",
    employee: "Andi Pratama",
    department: "Production",
    shift: "DAY",
    date: "14 Sep 2026",
    checkIn: "07:02",
    checkOut: "16:11",
    workHours: "9h 09m",
    lateMinutes: 2,
    status: "PRESENT",
  },
  {
    id: "ATT-002",
    employeeNo: "TON-2020-014",
    employee: "Budi Santoso",
    department: "Maintenance",
    shift: "DAY",
    date: "14 Sep 2026",
    checkIn: "07:08",
    checkOut: "16:03",
    workHours: "8h 55m",
    lateMinutes: 8,
    status: "LATE",
  },
  {
    id: "ATT-003",
    employeeNo: "TON-2022-087",
    employee: "Citra Lestari",
    department: "Human Resources",
    shift: "GENERAL",
    date: "14 Sep 2026",
    checkIn: "07:00",
    checkOut: "16:00",
    workHours: "9h 00m",
    lateMinutes: 0,
    status: "PRESENT",
  },
  {
    id: "ATT-004",
    employeeNo: "TON-2019-042",
    employee: "Dedi Kurniawan",
    department: "Engineering",
    shift: "DAY",
    date: "14 Sep 2026",
    checkIn: "-",
    checkOut: "-",
    workHours: "-",
    lateMinutes: 0,
    status: "LEAVE",
  },
  {
    id: "ATT-005",
    employeeNo: "TON-2023-115",
    employee: "Erna Wulandari",
    department: "Finance",
    shift: "GENERAL",
    date: "14 Sep 2026",
    checkIn: "06:57",
    checkOut: "16:05",
    workHours: "9h 08m",
    lateMinutes: 0,
    status: "PRESENT",
  },
  {
    id: "ATT-006",
    employeeNo: "TON-2021-076",
    employee: "Fajar Hidayat",
    department: "Warehouse",
    shift: "DAY",
    date: "14 Sep 2026",
    checkIn: "07:15",
    checkOut: "16:10",
    workHours: "8h 55m",
    lateMinutes: 15,
    status: "LATE",
  },
  {
    id: "ATT-007",
    employeeNo: "TON-2024-031",
    employee: "Gilang Ramadhan",
    department: "Production",
    shift: "NIGHT",
    date: "14 Sep 2026",
    checkIn: "19:02",
    checkOut: "04:06",
    workHours: "9h 04m",
    lateMinutes: 2,
    status: "PRESENT",
  },
  {
    id: "ATT-008",
    employeeNo: "TON-2018-019",
    employee: "Hendra Wijaya",
    department: "Fleet Management",
    shift: "DAY",
    date: "14 Sep 2026",
    checkIn: "-",
    checkOut: "-",
    workHours: "-",
    lateMinutes: 0,
    status: "ABSENT",
  },
  {
    id: "ATT-009",
    employeeNo: "TON-2022-103",
    employee: "Intan Permata",
    department: "Procurement",
    shift: "GENERAL",
    date: "14 Sep 2026",
    checkIn: "06:59",
    checkOut: "16:02",
    workHours: "9h 03m",
    lateMinutes: 0,
    status: "PRESENT",
  },
  {
    id: "ATT-010",
    employeeNo: "TON-2020-056",
    employee: "Joko Saputra",
    department: "Maintenance",
    shift: "NIGHT",
    date: "14 Sep 2026",
    checkIn: "19:12",
    checkOut: "04:00",
    workHours: "8h 48m",
    lateMinutes: 12,
    status: "LATE",
  },
];

const attendanceTrend = [
  { day: "Mon", value: 96 },
  { day: "Tue", value: 97 },
  { day: "Wed", value: 95 },
  { day: "Thu", value: 98 },
  { day: "Fri", value: 96 },
  { day: "Sat", value: 93 },
  { day: "Sun", value: 89 },
];

const shiftData = [
  {
    name: "General",
    employees: 420,
    present: 408,
    late: 8,
    absent: 4,
  },
  {
    name: "Day Shift",
    employees: 1320,
    present: 1267,
    late: 36,
    absent: 17,
  },
  {
    name: "Night Shift",
    employees: 1100,
    present: 1056,
    late: 29,
    absent: 15,
  },
];

const statusConfig: Record<
  AttendanceStatus,
  {
    className: string;
    icon: React.ElementType;
  }
> = {
  PRESENT: {
    className: "attendance-status-present",
    icon: CheckCircle2,
  },
  LATE: {
    className: "attendance-status-late",
    icon: Clock3,
  },
  ABSENT: {
    className: "attendance-status-absent",
    icon: XCircle,
  },
  LEAVE: {
    className: "attendance-status-leave",
    icon: CalendarDays,
  },
  OFF: {
    className: "attendance-status-off",
    icon: UserMinus,
  },
};

const Attendance: React.FC = () => {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All Departments");
  const [status, setStatus] = useState("All Status");
  const [shift, setShift] = useState("All Shifts");
  const [showFilter, setShowFilter] = useState(false);

  const filteredRecords = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return attendanceRecords.filter((record) => {
      const matchesSearch =
        !keyword ||
        record.employee.toLowerCase().includes(keyword) ||
        record.employeeNo.toLowerCase().includes(keyword) ||
        record.department.toLowerCase().includes(keyword);

      const matchesDepartment =
        department === "All Departments" || record.department === department;

      const matchesStatus = status === "All Status" || record.status === status;

      const matchesShift = shift === "All Shifts" || record.shift === shift;

      return (
        matchesSearch && matchesDepartment && matchesStatus && matchesShift
      );
    });
  }, [search, department, status, shift]);

  const resetFilters = () => {
    setSearch("");
    setDepartment("All Departments");
    setStatus("All Status");
    setShift("All Shifts");
  };

  return (
    <div className="attendance-page">
      {/* =====================================================
       * HEADER
       * ===================================================== */}

      <div className="attendance-header">
        <div>
          <div className="attendance-eyebrow">
            <Clock3 size={15} />
            HUMAN RESOURCES
          </div>

          <h1>Attendance</h1>

          <p>
            Workforce attendance, shift monitoring, check-in/out activity,
            lateness, absence, and daily workforce availability.
          </p>
        </div>

        <div className="attendance-header-actions">
          <button className="attendance-btn attendance-btn-secondary">
            <Download size={17} />
            Export Report
          </button>

          <button className="attendance-btn attendance-btn-primary">
            <CalendarDays size={17} />
            Attendance Report
          </button>
        </div>
      </div>

      {/* =====================================================
       * DATE BAR
       * ===================================================== */}

      <div className="attendance-date-bar">
        <div className="attendance-date-info">
          <CalendarDays size={18} />

          <div>
            <span>Attendance Date</span>
            <strong>Monday, 14 September 2026</strong>
          </div>
        </div>

        <div className="attendance-date-actions">
          <button>‹</button>
          <button className="today-button">Today</button>
          <button>›</button>
        </div>

        <div className="attendance-live">
          <i />
          Live Attendance
        </div>
      </div>

      {/* =====================================================
       * KPI
       * ===================================================== */}

      <div className="attendance-kpi-grid">
        <div className="attendance-kpi-card">
          <div className="attendance-kpi-icon blue">
            <Users size={21} />
          </div>

          <div>
            <span>Total Workforce</span>
            <strong>2,840</strong>
            <small>Scheduled today</small>
          </div>
        </div>

        <div className="attendance-kpi-card">
          <div className="attendance-kpi-icon green">
            <UserCheck size={21} />
          </div>

          <div>
            <span>Present</span>
            <strong>2,731</strong>
            <small className="positive">96.2% attendance</small>
          </div>
        </div>

        <div className="attendance-kpi-card">
          <div className="attendance-kpi-icon orange">
            <Clock3 size={21} />
          </div>

          <div>
            <span>Late</span>
            <strong>73</strong>
            <small>2.6% workforce</small>
          </div>
        </div>

        <div className="attendance-kpi-card">
          <div className="attendance-kpi-icon red">
            <UserMinus size={21} />
          </div>

          <div>
            <span>Absent</span>
            <strong>36</strong>
            <small>1.3% workforce</small>
          </div>
        </div>
      </div>

      {/* =====================================================
       * ANALYTICS
       * ===================================================== */}

      <div className="attendance-analytics-grid">
        {/* Attendance Trend */}
        <section className="attendance-card attendance-trend-card">
          <div className="attendance-card-header">
            <div>
              <h2>Attendance Trend</h2>
              <p>Daily attendance percentage</p>
            </div>

            <Activity size={20} />
          </div>

          <div className="attendance-trend-summary">
            <div>
              <strong>95.4%</strong>
              <span>
                <CheckCircle2 size={13} />
                Weekly average
              </span>
            </div>

            <div className="trend-positive">+1.8%</div>
          </div>

          <div className="attendance-line-chart">
            <div className="chart-grid-line line-100">
              <span>100%</span>
            </div>

            <div className="chart-grid-line line-95">
              <span>95%</span>
            </div>

            <div className="chart-grid-line line-90">
              <span>90%</span>
            </div>

            <div className="chart-grid-line line-85">
              <span>85%</span>
            </div>

            <svg
              viewBox="0 0 700 210"
              preserveAspectRatio="none"
              className="attendance-svg-chart"
            >
              <defs>
                <linearGradient id="attendanceArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="0.20" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                </linearGradient>
              </defs>

              <path
                d="
                  M 30 55
                  L 135 42
                  L 240 62
                  L 345 30
                  L 450 55
                  L 555 82
                  L 670 118
                  L 670 190
                  L 30 190
                  Z
                "
                fill="url(#attendanceArea)"
              />

              <path
                d="
                  M 30 55
                  L 135 42
                  L 240 62
                  L 345 30
                  L 450 55
                  L 555 82
                  L 670 118
                "
                fill="none"
                stroke="#2563eb"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {[
                [30, 55],
                [135, 42],
                [240, 62],
                [345, 30],
                [450, 55],
                [555, 82],
                [670, 118],
              ].map(([cx, cy], index) => (
                <circle
                  key={index}
                  cx={cx}
                  cy={cy}
                  r="5"
                  fill="#fff"
                  stroke="#2563eb"
                  strokeWidth="3"
                />
              ))}
            </svg>

            <div className="attendance-chart-labels">
              {attendanceTrend.map((item) => (
                <span key={item.day}>{item.day}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Shift Summary */}
        <section className="attendance-card shift-card">
          <div className="attendance-card-header">
            <div>
              <h2>Shift Summary</h2>
              <p>Attendance by work shift</p>
            </div>

            <Timer size={20} />
          </div>

          <div className="shift-list">
            {shiftData.map((item) => {
              const attendanceRate = Math.round(
                (item.present / item.employees) * 100,
              );

              return (
                <div className="shift-item" key={item.name}>
                  <div className="shift-item-header">
                    <div>
                      <strong>{item.name}</strong>
                      <span>{item.employees.toLocaleString()} employees</span>
                    </div>

                    <b>{attendanceRate}%</b>
                  </div>

                  <div className="shift-progress">
                    <span
                      style={{
                        width: `${attendanceRate}%`,
                      }}
                    />
                  </div>

                  <div className="shift-stats">
                    <span className="present">
                      <i />
                      {item.present} Present
                    </span>

                    <span className="late">
                      <i />
                      {item.late} Late
                    </span>

                    <span className="absent">
                      <i />
                      {item.absent} Absent
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* =====================================================
       * ATTENDANCE STATUS
       * ===================================================== */}

      <div className="attendance-status-grid">
        <div className="attendance-status-card">
          <div className="status-icon green">
            <LogIn size={18} />
          </div>

          <div>
            <span>First Check-in</span>
            <strong>05:51</strong>
          </div>

          <small>Early shift</small>
        </div>

        <div className="attendance-status-card">
          <div className="status-icon blue">
            <LogIn size={18} />
          </div>

          <div>
            <span>Last Check-in</span>
            <strong>19:17</strong>
          </div>

          <small>Night shift</small>
        </div>

        <div className="attendance-status-card">
          <div className="status-icon purple">
            <LogOut size={18} />
          </div>

          <div>
            <span>First Check-out</span>
            <strong>03:58</strong>
          </div>

          <small>Night shift</small>
        </div>

        <div className="attendance-status-card">
          <div className="status-icon orange">
            <Timer size={18} />
          </div>

          <div>
            <span>Avg. Work Hours</span>
            <strong>8h 54m</strong>
          </div>

          <small>Today's average</small>
        </div>
      </div>

      {/* =====================================================
       * DIRECTORY
       * ===================================================== */}

      <section className="attendance-card attendance-directory">
        <div className="attendance-directory-header">
          <div>
            <h2>Attendance Records</h2>
            <p>Employee check-in, check-out, shift, and attendance status.</p>
          </div>

          <div className="attendance-directory-actions">
            <div className="attendance-search">
              <Search size={17} />

              <input
                type="text"
                placeholder="Search employee..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <button
              className={`attendance-filter-button ${
                showFilter ? "active" : ""
              }`}
              onClick={() => setShowFilter((value) => !value)}
            >
              <Filter size={16} />
              Filter
            </button>
          </div>
        </div>

        {showFilter && (
          <div className="attendance-filter-panel">
            <div className="attendance-filter-group">
              <label>Department</label>

              <select
                value={department}
                onChange={(event) => setDepartment(event.target.value)}
              >
                <option>All Departments</option>
                <option>Production</option>
                <option>Maintenance</option>
                <option>Engineering</option>
                <option>Human Resources</option>
                <option>Finance</option>
                <option>Warehouse</option>
                <option>Fleet Management</option>
                <option>Procurement</option>
              </select>
            </div>

            <div className="attendance-filter-group">
              <label>Shift</label>

              <select
                value={shift}
                onChange={(event) => setShift(event.target.value)}
              >
                <option>All Shifts</option>
                <option>GENERAL</option>
                <option>DAY</option>
                <option>NIGHT</option>
              </select>
            </div>

            <div className="attendance-filter-group">
              <label>Status</label>

              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                <option>All Status</option>
                <option>PRESENT</option>
                <option>LATE</option>
                <option>ABSENT</option>
                <option>LEAVE</option>
                <option>OFF</option>
              </select>
            </div>

            <button className="attendance-clear-filter" onClick={resetFilters}>
              Clear
            </button>
          </div>
        )}

        <div className="attendance-table-wrapper">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>EMPLOYEE</th>
                <th>DEPARTMENT</th>
                <th>SHIFT</th>
                <th>CHECK IN</th>
                <th>CHECK OUT</th>
                <th>WORK HOURS</th>
                <th>LATE</th>
                <th>STATUS</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {filteredRecords.map((record) => {
                const config = statusConfig[record.status];

                const StatusIcon = config.icon;

                return (
                  <tr key={record.id}>
                    <td>
                      <div className="attendance-person">
                        <div className="attendance-avatar">
                          {record.employee
                            .split(" ")
                            .map((word) => word[0])
                            .slice(0, 2)
                            .join("")}
                        </div>

                        <div>
                          <strong>{record.employee}</strong>
                          <span>{record.employeeNo}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="attendance-department">
                        {record.department}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`shift-badge shift-${record.shift.toLowerCase()}`}
                      >
                        {record.shift}
                      </span>
                    </td>

                    <td>
                      <div className="time-cell">
                        <LogIn size={13} />
                        <strong>{record.checkIn}</strong>
                      </div>
                    </td>

                    <td>
                      <div className="time-cell checkout">
                        <LogOut size={13} />
                        <strong>{record.checkOut}</strong>
                      </div>
                    </td>

                    <td>
                      <span className="work-hours">{record.workHours}</span>
                    </td>

                    <td>
                      {record.lateMinutes > 0 ? (
                        <span className="late-minutes">
                          +{record.lateMinutes} min
                        </span>
                      ) : (
                        <span className="no-late">On time</span>
                      )}
                    </td>

                    <td>
                      <span className={`attendance-status ${config.className}`}>
                        <StatusIcon size={13} />
                        {record.status}
                      </span>
                    </td>

                    <td>
                      <button className="attendance-more" title="More">
                        <MoreHorizontal size={17} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredRecords.length === 0 && (
            <div className="attendance-empty">
              <Users size={32} />
              <strong>No attendance records found</strong>
              <span>Try changing the search keyword or filters.</span>
            </div>
          )}
        </div>

        <div className="attendance-table-footer">
          <span>
            Showing <strong>{filteredRecords.length}</strong> of{" "}
            <strong>{attendanceRecords.length}</strong> records
          </span>

          <div className="attendance-pagination">
            <button disabled>Previous</button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>Next</button>
          </div>
        </div>
      </section>

      {/* =====================================================
       * INSIGHT
       * ===================================================== */}

      <div className="attendance-insight">
        <div className="attendance-insight-icon">
          <Activity size={20} />
        </div>

        <div>
          <strong>Attendance Insight</strong>

          <p>
            Today's workforce attendance is <b>96.2%</b>, above the operational
            target of <b>95%</b>. There are <b>73 late employees</b> requiring
            monitoring, primarily across shift-based operations.
          </p>
        </div>

        <button className="attendance-btn attendance-btn-secondary">
          View Attendance Analytics
        </button>
      </div>

      {/* =====================================================
       * FOOTER
       * ===================================================== */}

      <div className="attendance-footer">
        <span>ABN Human Resources Management System</span>

        <span>Designed by ABN</span>
      </div>
    </div>
  );
};

export default Attendance;
