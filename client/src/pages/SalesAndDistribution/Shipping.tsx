import React from "react";
import {
  Anchor,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Box,
  //   CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Container,
  Download,
  Factory,
  Gauge,
  MapPin,
  Navigation,
  PackageCheck,
  RefreshCw,
  Ship,
  Truck,
  Waves,
  Warehouse,
  Weight,
} from "lucide-react";
import "./Shipping.css";

type VesselStatus = "LOADING" | "WAITING" | "SAILING" | "COMPLETED" | "DELAYED";

type Vessel = {
  vessel: string;
  voyage: string;
  destination: string;
  cargo: string;
  quantity: number;
  eta: string;
  etd: string;
  berth: string;
  status: VesselStatus;
};

const vessels: Vessel[] = [
  {
    vessel: "MV Tonasa Spirit",
    voyage: "TS-260914",
    destination: "Surabaya",
    cargo: "Bulk Cement",
    quantity: 7200,
    eta: "14 Sep • 08:30",
    etd: "14 Sep • 17:00",
    berth: "Jetty 01",
    status: "LOADING",
  },
  {
    vessel: "MV Biringkassi Star",
    voyage: "BS-260914",
    destination: "Balikpapan",
    cargo: "Bulk Cement",
    quantity: 8500,
    eta: "14 Sep • 11:45",
    etd: "14 Sep • 20:30",
    berth: "Jetty 02",
    status: "WAITING",
  },
  {
    vessel: "MV Nusantara Cement",
    voyage: "NC-260913",
    destination: "Jakarta",
    cargo: "Bulk Cement",
    quantity: 9100,
    eta: "13 Sep • 06:15",
    etd: "13 Sep • 18:40",
    berth: "Jetty 01",
    status: "SAILING",
  },
  {
    vessel: "KM Tonasa Logistics",
    voyage: "TL-260913",
    destination: "Banjarmasin",
    cargo: "Bag Cement",
    quantity: 4800,
    eta: "13 Sep • 10:20",
    etd: "13 Sep • 19:00",
    berth: "Jetty 03",
    status: "COMPLETED",
  },
  {
    vessel: "MV Eastern Builder",
    voyage: "EB-260914",
    destination: "Makassar",
    cargo: "Bulk Cement",
    quantity: 6200,
    eta: "14 Sep • 14:30",
    etd: "15 Sep • 02:00",
    berth: "Anchorage",
    status: "DELAYED",
  },
];

const dailyThroughput = [
  { day: "08", value: 8200 },
  { day: "09", value: 10500 },
  { day: "10", value: 9300 },
  { day: "11", value: 11800 },
  { day: "12", value: 10900 },
  { day: "13", value: 13200 },
  { day: "14", value: 12400 },
];

const destinationData = [
  { name: "Surabaya", value: 28, tonnage: "28.4 K" },
  { name: "Balikpapan", value: 21, tonnage: "21.2 K" },
  { name: "Jakarta", value: 18, tonnage: "18.1 K" },
  { name: "Banjarmasin", value: 16, tonnage: "16.0 K" },
  { name: "Makassar", value: 10, tonnage: "10.2 K" },
  { name: "Other", value: 7, tonnage: "7.1 K" },
];

const formatTonnage = (value: number) =>
  new Intl.NumberFormat("id-ID").format(value);

const getVesselStatusClass = (status: VesselStatus) =>
  `shipping-status shipping-status-${status.toLowerCase()}`;

const getVesselStatusIcon = (status: VesselStatus) => {
  switch (status) {
    case "LOADING":
      return <PackageCheck size={13} />;
    case "WAITING":
      return <Clock3 size={13} />;
    case "SAILING":
      return <Navigation size={13} />;
    case "COMPLETED":
      return <CheckCircle2 size={13} />;
    case "DELAYED":
      return <ArrowDownRight size={13} />;
    default:
      return null;
  }
};

const Shipping: React.FC = () => {
  const maxThroughput = Math.max(...dailyThroughput.map((item) => item.value));

  return (
    <div className="shipping-page">
      {/* =====================================================
       * HEADER
       * ===================================================== */}
      <header className="shipping-header">
        <div>
          <div className="shipping-eyebrow">
            <Anchor size={15} />
            PORT & MARITIME LOGISTICS
          </div>

          <h1>Shipping & Port Operations</h1>

          <p>
            Biringkassi Port — vessel movement, cement loading, cargo
            throughput, berth utilization, and shipping operations.
          </p>
        </div>

        <div className="shipping-header-actions">
          <button className="shipping-btn shipping-btn-secondary">
            <Download size={16} />
            Export Report
          </button>

          <button className="shipping-btn shipping-btn-secondary">
            <RefreshCw size={16} />
            Refresh
          </button>

          <button className="shipping-btn shipping-btn-primary">
            <Ship size={16} />
            New Shipment
          </button>
        </div>
      </header>

      {/* =====================================================
       * PORT STATUS STRIP
       * ===================================================== */}
      <section className="port-status-strip">
        <div className="port-location">
          <div className="port-location-icon">
            <MapPin size={17} />
          </div>

          <div>
            <strong>Pelabuhan Biringkassi</strong>
            <span>Pangkep • South Sulawesi</span>
          </div>
        </div>

        <div className="port-status-items">
          <div className="port-status-item">
            <span className="port-status-dot online" />
            <strong>PORT OPEN</strong>
          </div>

          <div className="port-status-item">
            <Waves size={15} />
            <span>Sea State</span>
            <strong>Calm</strong>
          </div>

          <div className="port-status-item">
            <Gauge size={15} />
            <span>Berth Util.</span>
            <strong>76%</strong>
          </div>

          <div className="port-status-item">
            <Clock3 size={15} />
            <span>Avg. Turnaround</span>
            <strong>11.4 h</strong>
          </div>
        </div>
      </section>

      {/* =====================================================
       * KPI
       * ===================================================== */}
      <section className="shipping-kpi-grid">
        <div className="shipping-kpi-card">
          <div className="shipping-kpi-icon blue">
            <Ship size={22} />
          </div>

          <div>
            <span>Vessels Today</span>
            <strong>8</strong>

            <small className="positive">
              <ArrowUpRight size={13} />
              +2 vs yesterday
            </small>
          </div>
        </div>

        <div className="shipping-kpi-card">
          <div className="shipping-kpi-icon cyan">
            <Weight size={22} />
          </div>

          <div>
            <span>Cargo Shipped</span>
            <strong>42.8 K</strong>

            <small className="positive">
              <ArrowUpRight size={13} />
              +8.6% this week
            </small>
          </div>
        </div>

        <div className="shipping-kpi-card">
          <div className="shipping-kpi-icon orange">
            <Container size={22} />
          </div>

          <div>
            <span>In Port</span>
            <strong>3</strong>

            <small className="warning">
              <Clock3 size={13} />2 loading • 1 waiting
            </small>
          </div>
        </div>

        <div className="shipping-kpi-card">
          <div className="shipping-kpi-icon green">
            <PackageCheck size={22} />
          </div>

          <div>
            <span>Monthly Shipped</span>
            <strong>286.4 K</strong>

            <small className="positive">
              <TrendingUpIcon />
              91.2% of target
            </small>
          </div>
        </div>
      </section>

      {/* =====================================================
       * OPERATIONS OVERVIEW
       * ===================================================== */}
      <section className="shipping-main-grid">
        <div className="shipping-card throughput-card">
          <div className="shipping-card-header">
            <div>
              <span className="shipping-card-eyebrow">PORT THROUGHPUT</span>

              <h2>Daily Cargo Throughput</h2>

              <p>
                Cement loading and dispatch volume over the last 7 operating
                days.
              </p>
            </div>

            <div className="shipping-chart-total">
              <span>Today</span>
              <strong>12.4 K T</strong>
            </div>
          </div>

          <div className="throughput-chart">
            <div className="throughput-axis">
              <span>15K</span>
              <span>10K</span>
              <span>5K</span>
              <span>0</span>
            </div>

            <div className="throughput-area">
              <div className="throughput-grid">
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="throughput-bars">
                {dailyThroughput.map((item) => (
                  <div className="throughput-column" key={item.day}>
                    <div className="throughput-bar-area">
                      <div
                        className="throughput-bar"
                        style={{
                          height: `${(item.value / maxThroughput) * 100}%`,
                        }}
                      >
                        <span>{(item.value / 1000).toFixed(1)}K</span>
                      </div>
                    </div>

                    <small>{item.day} Sep</small>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="throughput-footer">
            <div>
              <span>7-Day Total</span>
              <strong>81.3 K Ton</strong>
            </div>

            <div>
              <span>Daily Average</span>
              <strong>11.6 K Ton</strong>
            </div>

            <div>
              <span>Target</span>
              <strong>13.6 K Ton/day</strong>
            </div>
          </div>
        </div>

        {/* Destination */}
        <div className="shipping-card destination-card">
          <div className="shipping-card-header">
            <div>
              <span className="shipping-card-eyebrow">CARGO DISTRIBUTION</span>

              <h2>Shipping Destinations</h2>

              <p>Current month distribution by destination.</p>
            </div>

            <BarChart3 size={21} className="shipping-blue-icon" />
          </div>

          <div className="destination-list">
            {destinationData.map((item) => (
              <div className="destination-item" key={item.name}>
                <div className="destination-top">
                  <span>{item.name}</span>
                  <strong>{item.tonnage} T</strong>
                </div>

                <div className="destination-progress">
                  <div style={{ width: `${item.value}%` }} />
                </div>

                <small>{item.value}% of total shipment</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
       * PORT MAP / BERTH
       * ===================================================== */}
      <section className="shipping-port-grid">
        <div className="shipping-card port-map-card">
          <div className="shipping-card-header">
            <div>
              <span className="shipping-card-eyebrow">LIVE PORT OVERVIEW</span>

              <h2>Biringkassi Port Operations</h2>

              <p>Berth, anchorage, loading and vessel movement overview.</p>
            </div>

            <div className="live-indicator">
              <span />
              LIVE
            </div>
          </div>

          <div className="port-map">
            <div className="port-map-water">
              <div className="water-line line-1" />
              <div className="water-line line-2" />
              <div className="water-line line-3" />
              <div className="water-line line-4" />

              <div className="ship-marker ship-one">
                <Ship size={19} />
              </div>

              <div className="ship-marker ship-two">
                <Ship size={19} />
              </div>

              <div className="ship-marker ship-three">
                <Ship size={18} />
              </div>

              <div className="route-line route-one" />
              <div className="route-line route-two" />
            </div>

            <div className="port-map-land">
              <div className="jetty-label jetty-one">
                <span>JETTY 01</span>
                <strong>LOADING</strong>
              </div>

              <div className="jetty-label jetty-two">
                <span>JETTY 02</span>
                <strong>WAITING</strong>
              </div>

              <div className="jetty-label jetty-three">
                <span>JETTY 03</span>
                <strong>READY</strong>
              </div>

              <div className="port-facility">
                <Factory size={18} />
                <span>CEMENT TERMINAL</span>
              </div>

              <div className="port-warehouse">
                <Warehouse size={18} />
                <span>STORAGE</span>
              </div>
            </div>
          </div>

          <div className="berth-summary">
            <div>
              <span className="berth-dot loading" />
              <strong>Jetty 01</strong>
              <small>Loading • 72%</small>
            </div>

            <div>
              <span className="berth-dot waiting" />
              <strong>Jetty 02</strong>
              <small>Waiting Vessel</small>
            </div>

            <div>
              <span className="berth-dot ready" />
              <strong>Jetty 03</strong>
              <small>Available</small>
            </div>
          </div>
        </div>

        {/* Port Metrics */}
        <div className="shipping-card port-metrics-card">
          <div className="shipping-card-header">
            <div>
              <span className="shipping-card-eyebrow">PORT PERFORMANCE</span>

              <h2>Operational Metrics</h2>

              <p>Key indicators for today's operation.</p>
            </div>
          </div>

          <div className="port-metrics">
            <div className="port-metric">
              <div className="port-metric-icon">
                <Anchor size={18} />
              </div>

              <div>
                <span>Berth Utilization</span>
                <strong>76%</strong>
              </div>

              <div className="metric-progress">
                <div style={{ width: "76%" }} />
              </div>
            </div>

            <div className="port-metric">
              <div className="port-metric-icon">
                <PackageCheck size={18} />
              </div>

              <div>
                <span>Loading Efficiency</span>
                <strong>91%</strong>
              </div>

              <div className="metric-progress green">
                <div style={{ width: "91%" }} />
              </div>
            </div>

            <div className="port-metric">
              <div className="port-metric-icon">
                <Truck size={18} />
              </div>

              <div>
                <span>Truck Turnaround</span>
                <strong>34 min</strong>
              </div>

              <div className="metric-note">Target &lt; 40 min</div>
            </div>

            <div className="port-metric">
              <div className="port-metric-icon">
                <Waves size={18} />
              </div>

              <div>
                <span>Sea Condition</span>
                <strong>Calm</strong>
              </div>

              <div className="metric-note success">Suitable for operation</div>
            </div>

            <div className="port-metric">
              <div className="port-metric-icon">
                <Clock3 size={18} />
              </div>

              <div>
                <span>Avg. Vessel Stay</span>
                <strong>11.4 h</strong>
              </div>

              <div className="metric-note success">-8.2% vs last month</div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
       * VESSEL TABLE
       * ===================================================== */}
      <section className="shipping-card vessel-card">
        <div className="shipping-card-header vessel-header">
          <div>
            <span className="shipping-card-eyebrow">VESSEL MOVEMENT</span>

            <h2>Vessel Schedule</h2>

            <p>Current vessel arrivals, loading activities and departures.</p>
          </div>

          <button className="shipping-view-all">
            View Schedule
            <ChevronRight size={15} />
          </button>
        </div>

        <div className="vessel-table-wrapper">
          <table className="vessel-table">
            <thead>
              <tr>
                <th>Vessel</th>
                <th>Destination</th>
                <th>Cargo</th>
                <th>Quantity</th>
                <th>ETA</th>
                <th>ETD</th>
                <th>Berth</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {vessels.map((vessel) => (
                <tr key={vessel.voyage}>
                  <td>
                    <div className="vessel-name">
                      <div className="vessel-icon">
                        <Ship size={17} />
                      </div>

                      <div>
                        <strong>{vessel.vessel}</strong>
                        <span>{vessel.voyage}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="destination-cell">
                      <MapPin size={13} />
                      {vessel.destination}
                    </div>
                  </td>

                  <td>
                    <span className="cargo-type">
                      <Box size={13} />
                      {vessel.cargo}
                    </span>
                  </td>

                  <td>
                    <strong className="cargo-quantity">
                      {formatTonnage(vessel.quantity)} T
                    </strong>
                  </td>

                  <td>{vessel.eta}</td>

                  <td>{vessel.etd}</td>

                  <td>
                    <span className="berth-badge">{vessel.berth}</span>
                  </td>

                  <td>
                    <span className={getVesselStatusClass(vessel.status)}>
                      {getVesselStatusIcon(vessel.status)}
                      {vessel.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="vessel-footer">
          <div>
            <span className="vessel-online-dot" />
            AIS / Port Monitoring connected
          </div>

          <span>Last synchronization: 14 Sep 2026 • 10:20 WIB</span>
        </div>
      </section>

      {/* =====================================================
       * FOOTER
       * ===================================================== */}
      <footer className="shipping-footer">
        <div>
          <span className="shipping-online-dot" />
          Biringkassi Port Operations Online
        </div>

        <span>Shipping & Logistics Control Center</span>
      </footer>
    </div>
  );
};

const TrendingUpIcon = () => <ArrowUpRight size={13} />;

export default Shipping;
