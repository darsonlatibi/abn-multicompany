import React, { useMemo, useState } from "react";
import "./T4CrusherDashboard.css";

type EquipmentState = "RUN" | "STOP" | "WARNING" | "TRIP";

interface TelemetryItem {
  label: string;
  value: string;
  unit: string;
  state?: EquipmentState;
}

interface AlarmItem {
  id: string;
  time: string;
  tag: string;
  message: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "TRIP";
}

const StatusDot: React.FC<{ state: EquipmentState }> = ({ state }) => (
  <span className={`t4c-status-dot t4c-status-${state.toLowerCase()}`} />
);

const StatusBadge: React.FC<{ state: EquipmentState }> = ({ state }) => (
  <span className={`t4c-status-badge t4c-badge-${state.toLowerCase()}`}>
    <StatusDot state={state} />
    {state}
  </span>
);

const TelemetryCard: React.FC<TelemetryItem> = ({
  label,
  value,
  unit,
  state = "RUN",
}) => (
  <div className="t4c-telemetry-card">
    <div className="t4c-telemetry-head">
      <span>{label}</span>
      <StatusDot state={state} />
    </div>

    <div className="t4c-telemetry-value">
      {value}
      <small>{unit}</small>
    </div>
  </div>
);

const EquipmentCard: React.FC<{
  name: string;
  tag: string;
  state: EquipmentState;
  detail: string;
}> = ({ name, tag, state, detail }) => (
  <div className={`t4c-equipment-card t4c-equipment-${state.toLowerCase()}`}>
    <div className="t4c-equipment-top">
      <div>
        <div className="t4c-equipment-name">{name}</div>
        <div className="t4c-equipment-tag">{tag}</div>
      </div>

      <StatusBadge state={state} />
    </div>

    <div className="t4c-equipment-detail">{detail}</div>
  </div>
);

const T4CrusherDashboard: React.FC = () => {
  const [running, setRunning] = useState(true);

  const telemetry = useMemo<TelemetryItem[]>(
    () => [
      {
        label: "Crusher Power",
        value: running ? "1.86" : "0.00",
        unit: "MW",
      },
      {
        label: "Crusher Speed",
        value: running ? "148" : "0",
        unit: "RPM",
      },
      {
        label: "Limestone Feed",
        value: running ? "685.4" : "0.0",
        unit: "t/h",
      },
      {
        label: "Crusher Throughput",
        value: running ? "672.8" : "0.0",
        unit: "t/h",
      },
      {
        label: "Crusher Vibration",
        value: running ? "2.8" : "0.0",
        unit: "mm/s",
      },
      {
        label: "Crusher Current",
        value: running ? "246" : "0",
        unit: "A",
      },
      {
        label: "Product Size",
        value: running ? "≤25" : "0",
        unit: "mm",
      },
      {
        label: "Belt Speed",
        value: running ? "2.35" : "0.0",
        unit: "m/s",
      },
    ],
    [running],
  );

  const equipment = useMemo(
    () => [
      {
        name: "Crusher",
        tag: "T4-CRU-01",
        state: running ? ("RUN" as EquipmentState) : ("STOP" as EquipmentState),
        detail: running ? "148 RPM • 1.86 MW" : "Crusher stopped",
      },
      {
        name: "Apron Feeder",
        tag: "T4-AF-01",
        state: running ? ("RUN" as EquipmentState) : ("STOP" as EquipmentState),
        detail: running ? "685.4 t/h feed" : "Feeder stopped",
      },
      {
        name: "Main Drive",
        tag: "T4-CRU-DRV",
        state: running ? ("RUN" as EquipmentState) : ("STOP" as EquipmentState),
        detail: running ? "Drive healthy" : "Motor stopped",
      },
      {
        name: "Belt Conveyor",
        tag: "T4-CV-01",
        state: running ? ("RUN" as EquipmentState) : ("STOP" as EquipmentState),
        detail: running ? "2.35 m/s • Material flow" : "Conveyor stopped",
      },
      {
        name: "Magnetic Separator",
        tag: "T4-MAG-01",
        state: running ? ("RUN" as EquipmentState) : ("STOP" as EquipmentState),
        detail: running ? "Metal protection active" : "Separator stopped",
      },
      {
        name: "Dust Collector",
        tag: "T4-DC-01",
        state: running ? ("RUN" as EquipmentState) : ("STOP" as EquipmentState),
        detail: running ? "Extraction healthy" : "Extraction stopped",
      },
    ],
    [running],
  );

  const alarms = useMemo<AlarmItem[]>(
    () => [
      {
        id: "CRU-VIB",
        time: "08:16:42",
        tag: "T4.CRU.VIB",
        message: "Crusher vibration within normal operating range",
        priority: "LOW",
      },
      {
        id: "CRU-CURRENT",
        time: "08:13:17",
        tag: "T4.CRU.CURRENT",
        message: "Crusher motor current monitoring active",
        priority: "MEDIUM",
      },
      {
        id: "CV-BELT",
        time: "08:09:51",
        tag: "T4.CV.SPEED",
        message: "Conveyor speed stable",
        priority: "LOW",
      },
    ],
    [],
  );

  return (
    <div className="t4c-dashboard">
      {/* HEADER */}
      <header className="t4c-header">
        <div className="t4c-title-block">
          <div className="t4c-eyebrow">TONASA 4 • RAW MATERIAL HANDLING</div>

          <h1>T4 CRUSHER</h1>

          <p>Limestone Crushing &amp; Material Handling</p>
        </div>

        <div className="t4c-header-right">
          <div className="t4c-live">
            <span className="t4c-live-dot" />
            LIVE
          </div>

          <StatusBadge state={running ? "RUN" : "STOP"} />

          <button
            type="button"
            className={`t4c-sim-button ${
              running ? "t4c-sim-stop" : "t4c-sim-start"
            }`}
            onClick={() => setRunning((prev) => !prev)}
          >
            {running ? "SIM STOP" : "SIM START"}
          </button>
        </div>
      </header>

      {/* PROCESS MIMIC */}
      <section className="t4c-panel">
        <div className="t4c-panel-header">
          <div>
            <span className="t4c-panel-kicker">PROCESS MIMIC</span>
            <h2>Limestone Crushing Line</h2>
          </div>

          <div className="t4c-process-state">
            <StatusDot state={running ? "RUN" : "STOP"} />
            {running ? "PROCESS RUNNING" : "PROCESS STOPPED"}
          </div>
        </div>

        <div className="t4c-process-scroll">
          <div className={`t4c-process-canvas ${!running ? "t4c-paused" : ""}`}>
            {/* RAW MATERIAL */}
            <div className="t4c-material-source">
              <div className="t4c-equipment-label">
                <strong>LIMESTONE</strong>
                <span>ROM MATERIAL</span>
              </div>

              <div className="t4c-rock-pile">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>

            {/* HOPPER */}
            <div className="t4c-hopper">
              <div className="t4c-equipment-label">
                <strong>RECEIVING HOPPER</strong>
                <span>T4-HOPPER-01</span>
              </div>

              <div className="t4c-hopper-body">
                <div className="t4c-hopper-material">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>

            {/* APRON FEEDER */}
            <div className="t4c-apron">
              <div className="t4c-equipment-label">
                <strong>APRON FEEDER</strong>
                <span>T4-AF-01</span>
              </div>

              <div className="t4c-apron-body">
                {Array.from({ length: 11 }).map((_, index) => (
                  <span key={index} />
                ))}
              </div>
            </div>

            {/* CRUSHER */}
            <div className="t4c-crusher">
              <div className="t4c-equipment-label">
                <strong>PRIMARY CRUSHER</strong>
                <span>T4-CRU-01</span>
              </div>

              <div className="t4c-crusher-body">
                <div className="t4c-crusher-shell">
                  <div className="t4c-crusher-rotor">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className="t4c-crusher-teeth">
                    {Array.from({ length: 9 }).map((_, index) => (
                      <i key={index} />
                    ))}
                  </div>
                </div>

                <div className="t4c-crusher-drive">
                  <div className="t4c-motor">
                    <span>MAIN DRIVE</span>
                  </div>

                  <div className="t4c-coupling" />
                </div>
              </div>
            </div>

            {/* MAGNETIC SEPARATOR */}
            <div className="t4c-magnet">
              <div className="t4c-equipment-label">
                <strong>MAGNETIC SEPARATOR</strong>
                <span>T4-MAG-01</span>
              </div>

              <div className="t4c-magnet-body">
                <div className="t4c-magnet-core" />
                <div className="t4c-magnet-field" />
              </div>
            </div>

            {/* CONVEYOR */}
            <div className="t4c-conveyor">
              <div className="t4c-equipment-label">
                <strong>BELT CONVEYOR</strong>
                <span>T4-CV-01</span>
              </div>

              <div className="t4c-belt">
                <div className="t4c-belt-surface">
                  {Array.from({ length: 18 }).map((_, index) => (
                    <span key={index} />
                  ))}
                </div>

                <div className="t4c-belt-roller roller-1" />
                <div className="t4c-belt-roller roller-2" />
                <div className="t4c-belt-roller roller-3" />
                <div className="t4c-belt-roller roller-4" />
              </div>
            </div>

            {/* DUST COLLECTOR */}
            <div className="t4c-dust">
              <div className="t4c-equipment-label">
                <strong>DUST COLLECTOR</strong>
                <span>T4-DC-01</span>
              </div>

              <div className="t4c-dust-body">
                <div className="t4c-dust-filter" />
                <div className="t4c-dust-filter" />
                <div className="t4c-dust-filter" />
              </div>
            </div>

            {/* PROCESS PIPES */}
            <div className="t4c-pipe t4c-pipe-dust" />
            <div className="t4c-pipe t4c-pipe-transfer" />

            {/* MATERIAL FLOW */}
            <div className="t4c-material-flow">
              {Array.from({ length: 10 }).map((_, index) => (
                <span key={index} />
              ))}
            </div>

            {/* DUST FLOW */}
            <div className="t4c-dust-flow">
              <span />
              <span />
              <span />
              <span />
            </div>

            {/* PROCESS TAGS */}
            <div className="t4c-process-tag tag-feed">
              <span>FEED</span>
              <strong>{running ? "685.4" : "0.0"} t/h</strong>
            </div>

            <div className="t4c-process-tag tag-crusher">
              <span>CRUSHER POWER</span>
              <strong>{running ? "1.86" : "0.00"} MW</strong>
            </div>

            <div className="t4c-process-tag tag-vibration">
              <span>VIBRATION</span>
              <strong>{running ? "2.8" : "0.0"} mm/s</strong>
            </div>

            <div className="t4c-process-tag tag-product">
              <span>PRODUCT</span>
              <strong>≤25 mm</strong>
            </div>

            <div className="t4c-process-tag tag-belt">
              <span>BELT SPEED</span>
              <strong>{running ? "2.35" : "0.0"} m/s</strong>
            </div>
          </div>
        </div>
      </section>

      {/* TELEMETRY */}
      <section className="t4c-panel">
        <div className="t4c-panel-header">
          <div>
            <span className="t4c-panel-kicker">LIVE TELEMETRY</span>
            <h2>Crusher Operating Parameters</h2>
          </div>
        </div>

        <div className="t4c-telemetry-grid">
          {telemetry.map((item) => (
            <TelemetryCard key={item.label} {...item} />
          ))}
        </div>
      </section>

      {/* EQUIPMENT */}
      <section className="t4c-panel">
        <div className="t4c-panel-header">
          <div>
            <span className="t4c-panel-kicker">EQUIPMENT STATUS</span>
            <h2>Crushing &amp; Conveying Equipment</h2>
          </div>
        </div>

        <div className="t4c-equipment-grid">
          {equipment.map((item) => (
            <EquipmentCard key={item.tag} {...item} />
          ))}
        </div>
      </section>

      {/* ALARMS */}
      <section className="t4c-panel t4c-alarm-panel">
        <div className="t4c-panel-header">
          <div>
            <span className="t4c-panel-kicker">EVENT MONITOR</span>
            <h2>Alarm &amp; Event</h2>
          </div>

          <span className="t4c-alarm-count">{alarms.length} EVENTS</span>
        </div>

        <div className="t4c-alarm-list">
          {alarms.map((alarm) => (
            <div className="t4c-alarm-row" key={alarm.id}>
              <div className="t4c-alarm-time">{alarm.time}</div>

              <div className="t4c-alarm-tag">{alarm.tag}</div>

              <div className="t4c-alarm-message">{alarm.message}</div>

              <div
                className={`t4c-alarm-priority t4c-priority-${alarm.priority.toLowerCase()}`}
              >
                {alarm.priority}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default T4CrusherDashboard;
