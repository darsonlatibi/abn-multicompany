import React, { useMemo, useState } from "react";
import "./R4RawMillDashboard.css";

type EquipmentState = "RUN" | "STOP" | "WARNING" | "TRIP";

interface TelemetryItem {
  label: string;
  value: string | number;
  unit: string;
  state: EquipmentState;
}

interface AlarmItem {
  id: number;
  time: string;
  tag: string;
  message: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
}

/* =========================================================
   DEMO TELEMETRY
   ========================================================= */

const demoTelemetry: TelemetryItem[] = [
  {
    label: "Raw Mill Power",
    value: "5.64",
    unit: "MW",
    state: "RUN",
  },
  {
    label: "Mill Speed",
    value: "15.2",
    unit: "RPM",
    state: "RUN",
  },
  {
    label: "Mill Vibration",
    value: "2.1",
    unit: "mm/s",
    state: "RUN",
  },
  {
    label: "Mill Outlet Temp",
    value: "87",
    unit: "°C",
    state: "RUN",
  },
  {
    label: "Raw Feed",
    value: "185.4",
    unit: "t/h",
    state: "RUN",
  },
  {
    label: "Separator Speed",
    value: "745",
    unit: "RPM",
    state: "RUN",
  },
  {
    label: "Mill Differential",
    value: "72",
    unit: "mbar",
    state: "RUN",
  },
  {
    label: "Fan Current",
    value: "318",
    unit: "A",
    state: "RUN",
  },
];

const demoAlarms: AlarmItem[] = [
  {
    id: 1,
    time: "08:24:17",
    tag: "RM4-VIB",
    message: "Raw mill vibration within normal operating range",
    priority: "LOW",
  },
];

/* =========================================================
   STATUS DOT
   ========================================================= */

const StatusDot: React.FC<{
  state: EquipmentState;
}> = ({ state }) => {
  return <span className={`r4-status-dot ${state.toLowerCase()}`} />;
};

/* =========================================================
   STATUS BADGE
   ========================================================= */

const StatusBadge: React.FC<{
  state: EquipmentState;
}> = ({ state }) => {
  return (
    <span className={`r4-status-badge ${state.toLowerCase()}`}>{state}</span>
  );
};

/* =========================================================
   TELEMETRY CARD
   ========================================================= */

const TelemetryCard: React.FC<{
  item: TelemetryItem;
}> = ({ item }) => {
  return (
    <div className="r4-telemetry-card">
      <div className="r4-telemetry-label">{item.label}</div>

      <div className="r4-telemetry-value-row">
        <span className="r4-telemetry-value">{item.value}</span>

        <span className="r4-telemetry-unit">{item.unit}</span>
      </div>

      <div className="r4-live-indicator">
        <StatusDot state={item.state} />
        <span>LIVE</span>
      </div>
    </div>
  );
};

/* =========================================================
   EQUIPMENT CARD
   ========================================================= */

const EquipmentCard: React.FC<{
  name: string;
  tag: string;
  state: EquipmentState;
  detail: string;
}> = ({ name, tag, state, detail }) => {
  return (
    <div className="r4-equipment-card">
      <div className="r4-equipment-header">
        <div>
          <div className="r4-equipment-name">{name}</div>

          <div className="r4-equipment-tag">{tag}</div>
        </div>

        <StatusBadge state={state} />
      </div>

      <div className="r4-equipment-detail">{detail}</div>
    </div>
  );
};

/* =========================================================
   MAIN DASHBOARD
   ========================================================= */

const R4RawMillDashboard: React.FC = () => {
  const [running, setRunning] = useState(true);

  const telemetry = useMemo(() => {
    if (running) {
      return demoTelemetry;
    }

    return demoTelemetry.map((item) => ({
      ...item,
      state: "STOP" as EquipmentState,
    }));
  }, [running]);

  return (
    <div className="r4-rawmill-dashboard">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="r4-dashboard-header">
        <div className="r4-header-title">
          <div className="r4-eyebrow">ABN • TONASA PROCESS MONITORING</div>

          <h1>
            TONASA 4<span>RAW MILL</span>
          </h1>

          <div className="r4-header-subtitle">
            Integrated Raw Material Grinding &amp; Process Monitoring
          </div>
        </div>

        <div className="r4-header-actions">
          <div className="r4-system-status">
            <StatusDot state={running ? "RUN" : "STOP"} />

            <div>
              <span className="r4-system-status-label">RAW MILL STATUS</span>

              <strong>{running ? "RUNNING" : "STOPPED"}</strong>
            </div>
          </div>

          <button
            type="button"
            className={`r4-sim-button ${running ? "active" : ""}`}
            onClick={() => setRunning((value) => !value)}
          >
            {running ? "SIM STOP" : "SIM START"}
          </button>
        </div>
      </header>

      {/* =====================================================
          PROCESS MIMIC
      ===================================================== */}

      <section className="r4-panel r4-process-panel">
        <div className="r4-panel-header">
          <div>
            <h2>Raw Mill Process</h2>

            <span>LIVE PROCESS MIMIC</span>
          </div>

          <StatusBadge state={running ? "RUN" : "STOP"} />
        </div>

        <div className="r4-process-canvas">
          {/* =================================================
              PROCESS FLOW LINE
          ================================================= */}

          <div className={`r4-process-line ${running ? "running" : ""}`} />

          {/* =================================================
              MATERIAL FLOW
          ================================================= */}

          {running && (
            <div className="r4-material-flow">
              <span />
              <span />
              <span />
            </div>
          )}

          {/* =================================================
              RAW MATERIAL FEED
          ================================================= */}

          <div className="r4-equipment raw-feed">
            <div className="r4-machine-box">
              <div className="r4-machine-icon">RM</div>

              <strong>RAW FEED</strong>

              <small>Limestone / Additive</small>
            </div>
          </div>

          <div className="r4-process-label raw-feed-label">RAW MATERIAL</div>

          {/* =================================================
              RAW MILL
          ================================================= */}

          <div className="r4-equipment mill">
            <div className="r4-mill-graphic">
              <div className="r4-mill-cylinder">
                <div className="r4-mill-ring" />
                <div className="r4-mill-ring second" />

                <span className="r4-mill-text">
                  RAW
                  <br />
                  MILL
                </span>
              </div>

              <div className={`r4-mill-rotor ${running ? "running" : ""}`} />
            </div>
          </div>

          <div className="r4-process-label mill-label">RAW MILL</div>

          {/* =================================================
              SEPARATOR
          ================================================= */}

          <div className="r4-equipment separator">
            <div className="r4-separator-graphic">
              <div
                className={`r4-separator-rotor ${running ? "running" : ""}`}
              />

              <div className="r4-separator-body">SEP</div>
            </div>
          </div>

          <div className="r4-process-label separator-label">SEPARATOR</div>

          {/* =================================================
              FAN
          ================================================= */}

          <div className="r4-equipment fan">
            <div className={`r4-fan-graphic ${running ? "running" : ""}`}>
              <div className="r4-fan-center">FAN</div>

              <span />
              <span />
              <span />
              <span />
            </div>
          </div>

          <div className="r4-process-label fan-label">PROCESS FAN</div>

          {/* =================================================
              FLOW ARROWS
          ================================================= */}

          <div className="r4-flow-arrow arrow-1">→</div>

          <div className="r4-flow-arrow arrow-2">→</div>

          <div className="r4-flow-arrow arrow-3">→</div>

          {/* =================================================
              PROCESS FOOTER
          ================================================= */}

          <div className="r4-process-footer">
            <span>RAW MATERIAL FEED</span>

            <span>GRINDING</span>

            <span>CLASSIFICATION</span>

            <span>AIR / DUST FLOW</span>
          </div>
        </div>
      </section>

      {/* =====================================================
          LIVE TELEMETRY
      ===================================================== */}

      <section className="r4-section">
        <div className="r4-section-title">
          <div>
            <h2>Live Telemetry</h2>

            <span>RAW MILL PROCESS PARAMETERS</span>
          </div>

          <span className="r4-online">● ONLINE</span>
        </div>

        <div className="r4-telemetry-grid">
          {telemetry.map((item) => (
            <TelemetryCard key={item.label} item={item} />
          ))}
        </div>
      </section>

      {/* =====================================================
          EQUIPMENT STATUS
      ===================================================== */}

      <section className="r4-section">
        <div className="r4-section-title">
          <div>
            <h2>Equipment Status</h2>

            <span>TONASA 4 RAW MILL</span>
          </div>
        </div>

        <div className="r4-equipment-grid">
          <EquipmentCard
            name="Raw Mill"
            tag="RM4-MILL"
            state={running ? "RUN" : "STOP"}
            detail="Raw material grinding system"
          />

          <EquipmentCard
            name="Separator"
            tag="RM4-SEP"
            state={running ? "RUN" : "STOP"}
            detail="Dynamic material classification"
          />

          <EquipmentCard
            name="Process Fan"
            tag="RM4-FAN"
            state={running ? "RUN" : "STOP"}
            detail="Mill ventilation and gas flow"
          />

          <EquipmentCard
            name="Raw Feed"
            tag="RM4-FEED"
            state={running ? "RUN" : "STOP"}
            detail="Raw material feeding system"
          />

          <EquipmentCard
            name="Dust Collection"
            tag="RM4-ESP"
            state={running ? "RUN" : "STOP"}
            detail="Process dust collection"
          />

          <EquipmentCard
            name="Mill Drive"
            tag="RM4-DRV"
            state={running ? "RUN" : "STOP"}
            detail="Main mill drive system"
          />
        </div>
      </section>

      {/* =====================================================
          ALARM & EVENT
      ===================================================== */}

      <section className="r4-panel r4-alarm-panel">
        <div className="r4-panel-header">
          <div>
            <h2>Alarm &amp; Event</h2>

            <span>REAL-TIME RAW MILL EVENTS</span>
          </div>

          <span className="r4-event-count">{demoAlarms.length} EVENT</span>
        </div>

        <div className="r4-alarm-list">
          {demoAlarms.map((alarm) => (
            <div className="r4-alarm-row" key={alarm.id}>
              <span className="r4-alarm-time">{alarm.time}</span>

              <span className="r4-alarm-tag">{alarm.tag}</span>

              <span className="r4-alarm-message">{alarm.message}</span>

              <span
                className={`r4-alarm-priority ${alarm.priority.toLowerCase()}`}
              >
                {alarm.priority}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default R4RawMillDashboard;
