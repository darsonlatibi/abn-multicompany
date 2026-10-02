import React, { useMemo, useState } from "react";
import "./T4FinishMillDashboard.css";
import CementSilo from "../../../../components/MimicRO/finishmill/CementSilo";
import FinishMillHopper from "../../../../components/MimicRO/finishmill/FinishMillHopper";
import FinishMill from "../../../../components/MimicRO/finishmill/FinishMill";
import FinishMillMainDrive from "../../../../components/MimicRO/finishmill/FinishMillMainDrive";

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

const demoTelemetry: TelemetryItem[] = [
  {
    label: "Mill Power",
    value: "4.82",
    unit: "MW",
    state: "RUN",
  },
  {
    label: "Mill Speed",
    value: "14.8",
    unit: "RPM",
    state: "RUN",
  },
  {
    label: "Vibration",
    value: "2.4",
    unit: "mm/s",
    state: "RUN",
  },
  {
    label: "Outlet Temp",
    value: "92",
    unit: "°C",
    state: "RUN",
  },
  {
    label: "Mill Feed",
    value: "128.5",
    unit: "t/h",
    state: "RUN",
  },
  {
    label: "Separator",
    value: "860",
    unit: "RPM",
    state: "RUN",
  },
];

const demoAlarms: AlarmItem[] = [
  {
    id: 1,
    time: "08:21:42",
    tag: "FM4-VIB",
    message: "Mill vibration monitoring normal",
    priority: "LOW",
  },
];

const StatusDot: React.FC<{
  state: EquipmentState;
}> = ({ state }) => {
  return <span className={`t4-status-dot ${state.toLowerCase()}`} />;
};

const StatusBadge: React.FC<{
  state: EquipmentState;
}> = ({ state }) => {
  return (
    <span className={`t4-status-badge ${state.toLowerCase()}`}>{state}</span>
  );
};

const TelemetryCard: React.FC<{
  item: TelemetryItem;
}> = ({ item }) => {
  return (
    <div className="t4-telemetry-card">
      <div className="t4-telemetry-label">{item.label}</div>

      <div className="t4-telemetry-value-row">
        <span className="t4-telemetry-value">{item.value}</span>

        <span className="t4-telemetry-unit">{item.unit}</span>
      </div>

      <div className="t4-live-indicator">
        <StatusDot state={item.state} />
        <span>LIVE</span>
      </div>
    </div>
  );
};

const EquipmentCard: React.FC<{
  name: string;
  tag: string;
  state: EquipmentState;
  detail: string;
}> = ({ name, tag, state, detail }) => {
  return (
    <div className="t4-equipment-card">
      <div className="t4-equipment-header">
        <div>
          <div className="t4-equipment-name">{name}</div>
          <div className="t4-equipment-tag">{tag}</div>
        </div>

        <StatusBadge state={state} />
      </div>

      <div className="t4-equipment-detail">{detail}</div>
    </div>
  );
};

const T4FinishMillDashboard: React.FC = () => {
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
    <div className="t4-finishmill-dashboard">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="t4-dashboard-header">
        <div className="t4-header-title">
          <div className="t4-eyebrow">ABN • TONASA PROCESS MONITORING</div>

          <h1>
            TONASA 4<span>FINISH MILL</span>
          </h1>

          <div className="t4-header-subtitle">
            Integrated Process Mimic &amp; Live Telemetry
          </div>
        </div>

        <div className="t4-header-actions">
          <div className="t4-system-status">
            <StatusDot state={running ? "RUN" : "STOP"} />

            <div>
              <span className="t4-system-status-label">MILL STATUS</span>

              <strong>{running ? "RUNNING" : "STOPPED"}</strong>
            </div>
          </div>

          <button
            type="button"
            className={`t4-sim-button ${running ? "active" : ""}`}
            onClick={() => setRunning((value) => !value)}
          >
            {running ? "SIM STOP" : "SIM START"}
          </button>
        </div>
      </header>

      {/* =====================================================
          PROCESS MIMIC
      ===================================================== */}

      <section className="t4-panel t4-process-panel">
        <div className="t4-panel-header">
          <div>
            <h2>Finish Mill Process</h2>

            <span>LIVE PROCESS MIMIC</span>
          </div>

          <StatusBadge state={running ? "RUN" : "STOP"} />
        </div>

        <div className="t4-process-canvas">
          {/* Process flow line */}

          <div className={`t4-process-line ${running ? "running" : ""}`} />

          {/* Material animation */}

          {running && (
            <div className="t4-material-flow">
              <span />
              <span />
              <span />
            </div>
          )}

          {/* Cement Silo */}

          <div className="t4-equipment silo">
            <CementSilo />
          </div>

          <div className="t4-process-label silo-label">CEMENT SILO</div>

          {/* Hopper */}

          <div className="t4-equipment hopper">
            <FinishMillHopper />
          </div>

          <div className="t4-process-label hopper-label">FEED HOPPER</div>

          {/* Finish Mill */}

          <div className="t4-equipment mill">
            <FinishMill />
          </div>

          <div className="t4-process-label mill-label">FINISH MILL</div>

          {/* Main Drive */}

          <div className="t4-equipment drive">
            <FinishMillMainDrive />
          </div>

          <div className="t4-process-label drive-label">MAIN DRIVE</div>

          {/* Flow arrows */}

          <div className="t4-flow-arrow arrow-1">→</div>

          <div className="t4-flow-arrow arrow-2">→</div>

          <div className="t4-flow-arrow arrow-3">→</div>

          <div className="t4-process-footer">
            <span>MATERIAL FEED</span>

            <span>GRINDING</span>

            <span>DRIVE SYSTEM</span>
          </div>
        </div>
      </section>

      {/* =====================================================
          LIVE TELEMETRY
      ===================================================== */}

      <section className="t4-section">
        <div className="t4-section-title">
          <div>
            <h2>Live Telemetry</h2>
            <span>PROCESS PARAMETERS</span>
          </div>

          <span className="t4-online">● ONLINE</span>
        </div>

        <div className="t4-telemetry-grid">
          {telemetry.map((item) => (
            <TelemetryCard key={item.label} item={item} />
          ))}
        </div>
      </section>

      {/* =====================================================
          EQUIPMENT STATUS
      ===================================================== */}

      <section className="t4-section">
        <div className="t4-section-title">
          <div>
            <h2>Equipment Status</h2>
            <span>TONASA 4 FINISH MILL</span>
          </div>
        </div>

        <div className="t4-equipment-grid">
          <EquipmentCard
            name="Finish Mill"
            tag="FM4-MILL"
            state={running ? "RUN" : "STOP"}
            detail="Grinding chamber / process operation"
          />

          <EquipmentCard
            name="Main Drive"
            tag="FM4-MD"
            state={running ? "RUN" : "STOP"}
            detail="Main motor and drive system"
          />

          <EquipmentCard
            name="Feed Hopper"
            tag="FM4-HOPPER"
            state={running ? "RUN" : "STOP"}
            detail="Material feed to grinding system"
          />

          <EquipmentCard
            name="Cement Silo"
            tag="FM4-SILO"
            state="RUN"
            detail="Cement storage / discharge"
          />
        </div>
      </section>

      {/* =====================================================
          ALARM & EVENT
      ===================================================== */}

      <section className="t4-panel t4-alarm-panel">
        <div className="t4-panel-header">
          <div>
            <h2>Alarm &amp; Event</h2>

            <span>REAL-TIME PROCESS EVENTS</span>
          </div>

          <span className="t4-event-count">{demoAlarms.length} EVENT</span>
        </div>

        <div className="t4-alarm-list">
          {demoAlarms.map((alarm) => (
            <div className="t4-alarm-row" key={alarm.id}>
              <span className="t4-alarm-time">{alarm.time}</span>

              <span className="t4-alarm-tag">{alarm.tag}</span>

              <span className="t4-alarm-message">{alarm.message}</span>

              <span
                className={`t4-alarm-priority ${alarm.priority.toLowerCase()}`}
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

export default T4FinishMillDashboard;
