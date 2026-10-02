/* =========================================================
   ABN FLEET SYSTEM
   PERHUBUNGAN / UPPKB / JTO MONITORING
   ========================================================= */

import React, { useMemo, useState } from "react";

import {
  AlertTriangle,
  BadgeCheck,
  Camera,
  CarFront,
  CheckCircle2,
  Clock3,
  Gauge,
  Layers3,
  MapPin,
  Radio,
  RefreshCw,
  Scale,
  ShieldAlert,
  Timer,
  Truck,
  Wifi,
  WifiOff,
  Ruler,
} from "lucide-react";

import "./Perhubungan.css";

/* =========================================================
   TYPES
   ========================================================= */

type IntegrationStatus = "online" | "offline";

type WeightStatus = "normal" | "overload";

type EventState = "verified" | "pending" | "violation";

interface WeightEvent {
  id: number;

  time: string;

  plate: string;

  vehicle: string;

  weight: number;

  jbi: number;

  axleWeights: number[];

  speed: number;

  dimensions: string;

  status: WeightStatus;

  lane: string;

  state: EventState;

  device?: string;
}

/* =========================================================
   DEMO CONFIG
   ========================================================= */

const DEMO_SITE = {
  name: "UPPKB KERTAPATI",

  location: "Palembang, Sumatera Selatan",

  integration: "JTO / WIM",

  device: "JTO-WIM-01",
};

/* =========================================================
   DEMO EVENTS
   ========================================================= */

const INITIAL_EVENTS: WeightEvent[] = [
  {
    id: 1,

    time: "10:42:18",

    plate: "B 1234 XYZ",

    vehicle: "Truck 3 Axle",

    weight: 32450,

    jbi: 30000,

    axleWeights: [8120, 10840, 13490],

    speed: 32,

    dimensions: "12.0 × 2.5 × 3.8 m",

    status: "overload",

    lane: "L-01",

    state: "violation",

    device: "JTO-WIM-01",
  },

  {
    id: 2,

    time: "10:39:51",

    plate: "B 8899 AA",

    vehicle: "Truck 2 Axle",

    weight: 27800,

    jbi: 30000,

    axleWeights: [13200, 14600],

    speed: 28,

    dimensions: "10.5 × 2.5 × 3.7 m",

    status: "normal",

    lane: "L-02",

    state: "verified",

    device: "JTO-WIM-01",
  },

  {
    id: 3,

    time: "10:35:27",

    plate: "BG 4123 KM",

    vehicle: "Truck 3 Axle",

    weight: 29420,

    jbi: 30000,

    axleWeights: [7410, 9820, 12190],

    speed: 30,

    dimensions: "12.0 × 2.5 × 3.8 m",

    status: "normal",

    lane: "L-01",

    state: "verified",

    device: "JTO-WIM-01",
  },

  {
    id: 4,

    time: "10:31:04",

    plate: "BM 7712 TU",

    vehicle: "Truck 4 Axle",

    weight: 36500,

    jbi: 34000,

    axleWeights: [7210, 8940, 10150, 10200],

    speed: 26,

    dimensions: "13.5 × 2.5 × 3.9 m",

    status: "overload",

    lane: "L-03",

    state: "pending",

    device: "JTO-WIM-02",
  },

  {
    id: 5,

    time: "10:26:48",

    plate: "BE 9021 RF",

    vehicle: "Truck 2 Axle",

    weight: 25150,

    jbi: 30000,

    axleWeights: [11900, 13250],

    speed: 24,

    dimensions: "10.5 × 2.5 × 3.7 m",

    status: "normal",

    lane: "L-02",

    state: "verified",

    device: "JTO-WIM-01",
  },
];

/* =========================================================
   HELPERS
   ========================================================= */

const formatWeight = (value: number): string => value.toLocaleString("id-ID");

const formatDifference = (weight: number, jbi: number): string => {
  const difference = weight - jbi;

  if (difference > 0) {
    return `+${formatWeight(difference)} kg`;
  }

  if (difference < 0) {
    return `${formatWeight(difference)} kg`;
  }

  return "0 kg";
};

const calculateOverloadPercentage = (weight: number, jbi: number): number => {
  if (!jbi) {
    return 0;
  }

  return ((weight - jbi) / jbi) * 100;
};

const getShift = (): string => {
  const hour = new Date().getHours();

  if (hour >= 7 && hour < 15) {
    return "SHIFT 1";
  }

  if (hour >= 15 && hour < 23) {
    return "SHIFT 2";
  }

  return "SHIFT 3";
};

const formatDate = (): string =>
  new Date().toLocaleDateString("id-ID", {
    day: "2-digit",

    month: "2-digit",

    year: "numeric",
  });

/* =========================================================
   COMPONENT
   ========================================================= */

const Perhubungan: React.FC = () => {
  /* =======================================================
     STATE
     ======================================================= */

  const [integrationStatus, setIntegrationStatus] =
    useState<IntegrationStatus>("online");

  const [events, setEvents] = useState<WeightEvent[]>(INITIAL_EVENTS);

  const [selectedEventId, setSelectedEventId] = useState<number>(
    INITIAL_EVENTS[0]?.id ?? 1,
  );

  const [refreshing, setRefreshing] = useState(false);

  /* =======================================================
     CURRENT EVENT
     ======================================================= */

  const selectedEvent = useMemo(
    () =>
      events.find((event) => event.id === selectedEventId) ?? events[0] ?? null,

    [events, selectedEventId],
  );

  /* =======================================================
     CURRENT AXLE DATA
     ======================================================= */

  const axleData = useMemo(
    () => selectedEvent?.axleWeights ?? [],

    [selectedEvent],
  );

  /* =======================================================
     STATISTICS
     ======================================================= */

  const statistics = useMemo(() => {
    const total = events.length;

    const overload = events.filter(
      (event) => event.status === "overload",
    ).length;

    const normal = events.filter((event) => event.status === "normal").length;

    const verified = events.filter(
      (event) => event.state === "verified",
    ).length;

    const pending = events.filter((event) => event.state === "pending").length;

    const violations = events.filter(
      (event) => event.state === "violation",
    ).length;

    return {
      total,
      overload,
      normal,
      verified,
      pending,
      violations,
    };
  }, [events]);

  /* =======================================================
     DEMO REFRESH
     ======================================================= */

  const handleRefresh = () => {
    setRefreshing(true);

    setIntegrationStatus("online");

    window.setTimeout(() => {
      setRefreshing(false);
    }, 700);
  };

  /* =======================================================
     VERIFY
     ======================================================= */

  const markVerified = (id: number) => {
    setEvents((current) =>
      current.map((event) =>
        event.id === id
          ? {
              ...event,
              state: "verified",
            }
          : event,
      ),
    );
  };

  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <main className="perhubungan-page">
      {/* =================================================
          HEADER
         ================================================= */}

      <header className="perhubungan-header">
        <div className="perhubungan-header-left">
          <div className="perhubungan-title-row">
            <div className="perhubungan-title-icon">
              <Truck size={20} />
            </div>

            <div>
              <span className="perhubungan-eyebrow">
                ABN FLEET · INTEGRATION
              </span>

              <h1>Perhubungan / UPPKB Monitoring</h1>

              <p>
                Monitoring event kendaraan dan data weighing dari integrasi JTO
                / WIM.
              </p>
            </div>
          </div>
        </div>

        <div className="perhubungan-header-actions">
          <div className={`integration-status ${integrationStatus}`}>
            {integrationStatus === "online" ? (
              <Wifi size={15} />
            ) : (
              <WifiOff size={15} />
            )}

            <span>
              {integrationStatus === "online"
                ? "INTEGRATION ONLINE"
                : "INTEGRATION OFFLINE"}
            </span>
          </div>

          <button
            type="button"
            className="perhubungan-refresh"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw
              size={16}
              className={refreshing ? "perhubungan-spin" : ""}
            />

            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </header>

      {/* =================================================
          SITE BAR
         ================================================= */}

      <section className="perhubungan-sitebar">
        <div className="sitebar-item">
          <MapPin size={18} />

          <div>
            <span>SITE</span>

            <strong>{DEMO_SITE.name}</strong>

            <small>{DEMO_SITE.location}</small>
          </div>
        </div>

        <div className="sitebar-item">
          <Radio size={18} />

          <div>
            <span>SOURCE</span>

            <strong>{DEMO_SITE.integration}</strong>

            <small>{DEMO_SITE.device}</small>
          </div>
        </div>

        <div className="sitebar-item">
          <Clock3 size={18} />

          <div>
            <span>DATE</span>

            <strong>{formatDate()}</strong>

            <small>{getShift()}</small>
          </div>
        </div>

        <div className="sitebar-live">
          <span className="sitebar-live-dot" />

          {integrationStatus === "online" ? "ONLINE" : "OFFLINE"}
        </div>
      </section>

      {/* =================================================
          KPI
         ================================================= */}

      <section className="perhubungan-kpi-grid">
        <article className="perhubungan-kpi-card">
          <div className="perhubungan-kpi-icon">
            <Truck size={20} />
          </div>

          <div>
            <span>VEHICLES PROCESSED</span>

            <strong>{statistics.total}</strong>
          </div>
        </article>

        <article className="perhubungan-kpi-card normal">
          <div className="perhubungan-kpi-icon">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <span>NORMAL</span>

            <strong>{statistics.normal}</strong>
          </div>
        </article>

        <article className="perhubungan-kpi-card overload">
          <div className="perhubungan-kpi-icon">
            <ShieldAlert size={20} />
          </div>

          <div>
            <span>OVERLOAD</span>

            <strong>{statistics.overload}</strong>
          </div>
        </article>

        <article className="perhubungan-kpi-card">
          <div className="perhubungan-kpi-icon">
            <BadgeCheck size={20} />
          </div>

          <div>
            <span>VERIFIED</span>

            <strong>{statistics.verified}</strong>
          </div>
        </article>
      </section>

      {/* =================================================
          CAMERA + VEHICLE
         ================================================= */}

      <section className="perhubungan-main-grid">
        {/* =================================================
            CAMERA / ANPR
           ================================================= */}

        <article className="perhubungan-panel camera-panel">
          <div className="perhubungan-panel-header">
            <div>
              <h2>Camera / ANPR</h2>

              <p>Vehicle identification</p>
            </div>

            <span className="camera-live-badge">
              <span />
              LIVE
            </span>
          </div>

          <div className="camera-frame">
            <div className="camera-overlay top-left">CAM-01</div>

            <div className="camera-overlay top-right">ANPR</div>

            <div className="camera-overlay center-top">UPPKB KERTAPATI</div>

            <div className="camera-placeholder">
              <Camera size={44} />

              <strong>VEHICLE CAMERA</strong>

              <span>Live feed placeholder</span>
            </div>

            <div className="camera-vehicle-frame">
              <div className="camera-vehicle-box">
                <span className="camera-plate">
                  {currentVehiclePlate(selectedEvent)}
                </span>
              </div>
            </div>

            <div className="camera-overlay bottom-left">
              {selectedEvent?.lane ?? "--"}
            </div>

            <div className="camera-overlay bottom-right">
              {selectedEvent?.time ?? "--:--:--"}
            </div>
          </div>
        </article>

        {/* =================================================
            VEHICLE INFORMATION
           ================================================= */}

        <article className="perhubungan-panel vehicle-panel">
          <div className="perhubungan-panel-header">
            <div>
              <h2>Vehicle Information</h2>

              <p>ANPR / WIM vehicle data</p>
            </div>

            <CarFront size={20} />
          </div>

          {selectedEvent ? (
            <div className="vehicle-info-list">
              <div className="vehicle-info-row">
                <div className="vehicle-info-label">
                  <CarFront size={14} />

                  <span>PLAT NOMOR</span>
                </div>

                <strong>{selectedEvent.plate}</strong>
              </div>

              <div className="vehicle-info-row">
                <div className="vehicle-info-label">
                  <Truck size={14} />

                  <span>JENIS KENDARAAN</span>
                </div>

                <strong>{selectedEvent.vehicle}</strong>
              </div>

              <div className="vehicle-info-row">
                <div className="vehicle-info-label">
                  <Gauge size={14} />

                  <span>KECEPATAN</span>
                </div>

                <strong>{selectedEvent.speed} km/h</strong>
              </div>

              <div className="vehicle-info-row">
                <div className="vehicle-info-label">
                  <Layers3 size={14} />

                  <span>KONFIGURASI SUMBU</span>
                </div>

                <strong>{selectedEvent.axleWeights.length} Axle</strong>
              </div>

              <div className="vehicle-info-row">
                <div className="vehicle-info-label">
                  <Ruler size={14} />

                  <span>DIMENSI</span>
                </div>

                <strong>{selectedEvent.dimensions}</strong>
              </div>

              <div className="vehicle-info-row">
                <div className="vehicle-info-label">
                  <Radio size={14} />

                  <span>LANE</span>
                </div>

                <strong>{selectedEvent.lane}</strong>
              </div>

              <div className="vehicle-info-row">
                <div className="vehicle-info-label">
                  <Timer size={14} />

                  <span>TIMESTAMP</span>
                </div>

                <strong>{selectedEvent.time}</strong>
              </div>

              <div className="vehicle-info-row">
                <div className="vehicle-info-label">
                  <Wifi size={14} />

                  <span>DEVICE</span>
                </div>

                <strong>{selectedEvent.device ?? DEMO_SITE.device}</strong>
              </div>
            </div>
          ) : (
            <div className="vehicle-empty">No vehicle selected.</div>
          )}
        </article>
      </section>

      {/* =================================================
          WEIGHT MEASUREMENT
         ================================================= */}

      <section className="perhubungan-panel weight-panel">
        <div className="perhubungan-panel-header">
          <div>
            <h2>Weight Measurement</h2>

            <p>Gross weight and axle information</p>
          </div>

          <div className="weight-source">
            <Scale size={17} />
            JTO / WIM
          </div>
        </div>

        {selectedEvent ? (
          <>
            <div className="gross-weight-area">
              <span>GROSS WEIGHT</span>

              <strong>
                {formatWeight(selectedEvent.weight)}

                <small> kg</small>
              </strong>

              <div className={`gross-status ${selectedEvent.status}`}>
                {selectedEvent.status === "overload" ? (
                  <>
                    <AlertTriangle size={15} />
                    OVERLOAD
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={15} />
                    NORMAL
                  </>
                )}
              </div>
            </div>

            {/* =========================================
                AXLE GRID
               ========================================= */}

            <div className={`axle-grid axle-count-${axleData.length}`}>
              {axleData.map((weight, index) => (
                <article key={`${selectedEvent.id}-axle-${index + 1}`}>
                  <span>AXLE {index + 1}</span>

                  <strong>{formatWeight(weight)} kg</strong>
                </article>
              ))}

              <article className="total">
                <span>TOTAL</span>

                <strong>{formatWeight(selectedEvent.weight)} kg</strong>
              </article>
            </div>

            {/* =========================================
                SUMMARY
               ========================================= */}

            <div className="weight-summary">
              <div>
                <span>JBI</span>

                <strong>{formatWeight(selectedEvent.jbi)} kg</strong>
              </div>

              <div
                className={
                  selectedEvent.weight > selectedEvent.jbi ? "danger" : "safe"
                }
              >
                <span>SELISIH</span>

                <strong>
                  {formatDifference(selectedEvent.weight, selectedEvent.jbi)}
                </strong>
              </div>

              <div>
                <span>LOAD RATIO</span>

                <strong>
                  {((selectedEvent.weight / selectedEvent.jbi) * 100).toFixed(
                    1,
                  )}
                  %
                </strong>
              </div>

              <div>
                <span>EXCESS</span>

                <strong>
                  {Math.max(
                    0,
                    Number(
                      calculateOverloadPercentage(
                        selectedEvent.weight,
                        selectedEvent.jbi,
                      ).toFixed(1),
                    ),
                  )}
                  %
                </strong>
              </div>
            </div>
          </>
        ) : (
          <div className="weight-empty">No weighing event selected.</div>
        )}
      </section>

      {/* =================================================
          ACTIONS
         ================================================= */}

      <section className="perhubungan-actions">
        <button type="button" className="action-button secondary">
          <Scale size={16} />
          Verification
        </button>

        <button
          type="button"
          className="action-button success"
          disabled={!selectedEvent}
          onClick={() => {
            if (selectedEvent) {
              markVerified(selectedEvent.id);
            }
          }}
        >
          <CheckCircle2 size={16} />
          Pass / Verify
        </button>

        <button
          type="button"
          className="action-button danger"
          disabled={!selectedEvent || selectedEvent.status !== "overload"}
        >
          <ShieldAlert size={16} />
          Violation
        </button>
      </section>

      {/* =================================================
          EVENT HISTORY
         ================================================= */}

      <section className="perhubungan-panel events-panel">
        <div className="perhubungan-panel-header">
          <div>
            <h2>Event History</h2>

            <p>Recent weighing events</p>
          </div>

          <div className="event-summary">
            <span>
              <CheckCircle2 size={14} />
              {statistics.verified}
              Verified
            </span>

            <span>
              <Timer size={14} />
              {statistics.pending}
              Pending
            </span>

            <span className="danger">
              <AlertTriangle size={14} />
              {statistics.overload}
              Overload
            </span>
          </div>
        </div>

        <div className="event-table-wrapper">
          <table className="event-table">
            <thead>
              <tr>
                <th>TIME</th>

                <th>PLATE</th>

                <th>VEHICLE</th>

                <th>WEIGHT</th>

                <th>JBI</th>

                <th>DIFFERENCE</th>

                <th>STATUS</th>

                <th>LANE</th>

                <th>STATE</th>
              </tr>
            </thead>

            <tbody>
              {events.map((event) => (
                <tr
                  key={event.id}
                  className={event.id === selectedEventId ? "selected" : ""}
                  onClick={() => setSelectedEventId(event.id)}
                >
                  <td>
                    <span className="event-time">{event.time}</span>
                  </td>

                  <td>
                    <strong className="event-plate">{event.plate}</strong>
                  </td>

                  <td>{event.vehicle}</td>

                  <td>
                    <strong>{formatWeight(event.weight)} kg</strong>
                  </td>

                  <td>{formatWeight(event.jbi)} kg</td>

                  <td
                    className={
                      event.weight > event.jbi
                        ? "difference-danger"
                        : "difference-safe"
                    }
                  >
                    {formatDifference(event.weight, event.jbi)}
                  </td>

                  <td>
                    <span className={`event-status ${event.status}`}>
                      {event.status === "overload" ? (
                        <AlertTriangle size={13} />
                      ) : (
                        <CheckCircle2 size={13} />
                      )}

                      {event.status === "overload" ? "OVERLOAD" : "NORMAL"}
                    </span>
                  </td>

                  <td>
                    <span className="lane-badge">{event.lane}</span>
                  </td>

                  <td>
                    <span className={`event-state ${event.state}`}>
                      {event.state === "verified"
                        ? "VERIFIED"
                        : event.state === "pending"
                          ? "PENDING"
                          : "VIOLATION"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* =================================================
          FOOTER
         ================================================= */}

      <footer className="perhubungan-footer">
        <AlertTriangle size={16} />

        <span>
          Data pada tampilan ini adalah interface monitoring ABN Fleet. Data
          UPPKB/JTO/WIM production harus berasal dari integrasi resmi atau
          sumber data yang diizinkan.
        </span>
      </footer>
    </main>
  );
};

/* =========================================================
   CURRENT VEHICLE PLATE
   ========================================================= */

const currentVehiclePlate = (event: WeightEvent | null): string => {
  return event?.plate ?? "--- ---";
};

export default Perhubungan;
