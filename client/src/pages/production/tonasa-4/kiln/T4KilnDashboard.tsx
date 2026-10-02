import React, { useMemo, useState } from "react";
import "./T4KilnDashboard.css";

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
  <span className={`t4k-status-dot t4k-status-${state.toLowerCase()}`} />
);

const StatusBadge: React.FC<{ state: EquipmentState }> = ({ state }) => (
  <span className={`t4k-status-badge t4k-badge-${state.toLowerCase()}`}>
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
  <div className="t4k-telemetry-card">
    <div className="t4k-telemetry-head">
      <span>{label}</span>
      <StatusDot state={state} />
    </div>

    <div className="t4k-telemetry-value">
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
  <div className={`t4k-equipment-card t4k-equipment-${state.toLowerCase()}`}>
    <div className="t4k-equipment-top">
      <div>
        <div className="t4k-equipment-name">{name}</div>
        <div className="t4k-equipment-tag">{tag}</div>
      </div>

      <StatusBadge state={state} />
    </div>

    <div className="t4k-equipment-detail">{detail}</div>
  </div>
);

const T4KilnDashboard: React.FC = () => {
  const [running, setRunning] = useState(true);

  const telemetry = useMemo<TelemetryItem[]>(
    () => [
      {
        label: "Kiln Power",
        value: running ? "6.84" : "0.00",
        unit: "MW",
      },
      {
        label: "Kiln Speed",
        value: running ? "3.72" : "0.00",
        unit: "RPM",
      },
      {
        label: "Burning Zone",
        value: running ? "1,435" : "32",
        unit: "°C",
      },
      {
        label: "Kiln Inlet",
        value: running ? "1,020" : "35",
        unit: "°C",
      },
      {
        label: "Clinker Production",
        value: running ? "92.6" : "0.0",
        unit: "t/h",
      },
      {
        label: "O₂",
        value: running ? "2.8" : "20.9",
        unit: "%",
      },
      {
        label: "CO",
        value: running ? "318" : "0",
        unit: "ppm",
      },
      {
        label: "ID Fan Current",
        value: running ? "428" : "0",
        unit: "A",
      },
    ],
    [running],
  );

  const equipment = useMemo(
    () => [
      {
        name: "Rotary Kiln",
        tag: "T4-KILN",
        state: running ? ("RUN" as EquipmentState) : ("STOP" as EquipmentState),
        detail: running ? "3.72 RPM • 6.84 MW" : "Drive stopped",
      },
      {
        name: "Main Drive",
        tag: "T4-KILN-DRV",
        state: running ? ("RUN" as EquipmentState) : ("STOP" as EquipmentState),
        detail: running ? "Main motor healthy" : "Motor stopped",
      },
      {
        name: "Preheater",
        tag: "T4-PH",
        state: running ? ("RUN" as EquipmentState) : ("STOP" as EquipmentState),
        detail: running ? "5-stage cyclone active" : "Process stopped",
      },
      {
        name: "Calciner",
        tag: "T4-CALC",
        state: running ? ("RUN" as EquipmentState) : ("STOP" as EquipmentState),
        detail: running ? "Calcination active" : "Fuel isolated",
      },
      {
        name: "ID Fan",
        tag: "T4-IDF",
        state: running ? ("RUN" as EquipmentState) : ("STOP" as EquipmentState),
        detail: running ? "428 A • Draft stable" : "Fan stopped",
      },
      {
        name: "Clinker Cooler",
        tag: "T4-COOLER",
        state: running ? ("RUN" as EquipmentState) : ("STOP" as EquipmentState),
        detail: running ? "Cooler operating" : "Cooler stopped",
      },
    ],
    [running],
  );

  const alarms = useMemo<AlarmItem[]>(
    () => [
      {
        id: "KILN-BZ-TEMP",
        time: "08:14:22",
        tag: "T4.KILN.BZ_TEMP",
        message: "Burning zone temperature within operating range",
        priority: "LOW",
      },
      {
        id: "KILN-O2",
        time: "08:11:04",
        tag: "T4.KILN.O2",
        message: "O₂ level stable",
        priority: "LOW",
      },
      {
        id: "KILN-IDF",
        time: "08:06:31",
        tag: "T4.IDF.CURRENT",
        message: "ID Fan current monitoring active",
        priority: "MEDIUM",
      },
    ],
    [],
  );

  return (
    <div className="t4k-dashboard">
      {/* HEADER */}
      <header className="t4k-header">
        <div className="t4k-header-left">
          <div className="t4k-title-block">
            <div className="t4k-eyebrow">TONASA 4 • PYROPROCESS</div>
            <h1>T4 KILN</h1>
            <p>Rotary Kiln &amp; Clinker Production</p>
          </div>
        </div>

        <div className="t4k-header-right">
          <div className="t4k-live">
            <span className="t4k-live-dot" />
            LIVE
          </div>

          <StatusBadge state={running ? "RUN" : "STOP"} />

          <button
            type="button"
            className={`t4k-sim-button ${
              running ? "t4k-sim-stop" : "t4k-sim-start"
            }`}
            onClick={() => setRunning((prev) => !prev)}
          >
            {running ? "SIM STOP" : "SIM START"}
          </button>
        </div>
      </header>

      {/* PROCESS MIMIC */}
      <section className="t4k-panel">
        <div className="t4k-panel-header">
          <div>
            <span className="t4k-panel-kicker">PROCESS MIMIC</span>
            <h2>Pyroprocessing Line</h2>
          </div>

          <div className="t4k-process-state">
            <StatusDot state={running ? "RUN" : "STOP"} />
            {running ? "PROCESS RUNNING" : "PROCESS STOPPED"}
          </div>
        </div>

        <div className="t4k-process-scroll">
          <div className={`t4k-process-canvas ${!running ? "t4k-paused" : ""}`}>
            {/* PREHEATER */}
            <div className="t4k-preheater">
              <div className="t4k-equipment-label">
                <strong>PREHEATER</strong>
                <span>5 Stage Cyclone</span>
              </div>

              <div className="t4k-cyclone-stack">
                <div className="t4k-cyclone t4k-cyclone-1">C1</div>
                <div className="t4k-cyclone t4k-cyclone-2">C2</div>
                <div className="t4k-cyclone t4k-cyclone-3">C3</div>
                <div className="t4k-cyclone t4k-cyclone-4">C4</div>
                <div className="t4k-cyclone t4k-cyclone-5">C5</div>
              </div>

              <div className="t4k-ph-gas" />
            </div>

            {/* CALCINER */}
            <div className="t4k-calciner">
              <div className="t4k-equipment-label">
                <strong>CALCINER</strong>
                <span>Precalcination</span>
              </div>

              <div className="t4k-calciner-body">
                <div className="t4k-flame t4k-flame-a" />
                <div className="t4k-flame t4k-flame-b" />
                <div className="t4k-flame t4k-flame-c" />
              </div>

              <div className="t4k-fuel-line">
                <span>FUEL</span>
              </div>
            </div>

            {/* KILN */}
            <div className="t4k-kiln">
              <div className="t4k-equipment-label t4k-kiln-label">
                <strong>ROTARY KILN</strong>
                <span>T4-KILN</span>
              </div>

              <div className="t4k-kiln-shell">
                <div className="t4k-kiln-ring t4k-ring-1" />
                <div className="t4k-kiln-ring t4k-ring-2" />
                <div className="t4k-kiln-ring t4k-ring-3" />

                <div className="t4k-kiln-hot-zone">
                  <div className="t4k-hot-glow" />
                  <div className="t4k-flame t4k-kiln-flame" />
                </div>
              </div>

              <div className="t4k-kiln-drive">
                <div className="t4k-drive-motor">
                  <span>MAIN DRIVE</span>
                </div>

                <div className="t4k-drive-coupling" />
              </div>

              <div className="t4k-kiln-support support-a" />
              <div className="t4k-kiln-support support-b" />
              <div className="t4k-kiln-support support-c" />
            </div>

            {/* CLINKER COOLER */}
            <div className="t4k-cooler">
              <div className="t4k-equipment-label">
                <strong>CLINKER COOLER</strong>
                <span>T4-COOLER</span>
              </div>

              <div className="t4k-cooler-body">
                <div className="t4k-cooler-grate">
                  {Array.from({ length: 12 }).map((_, index) => (
                    <span key={index} />
                  ))}
                </div>

                <div className="t4k-clinker-bed">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>

            {/* ID FAN */}
            <div className="t4k-idfan">
              <div className="t4k-equipment-label">
                <strong>ID FAN</strong>
                <span>T4-IDF</span>
              </div>

              <div className="t4k-fan-body">
                <div className="t4k-fan-rotor">
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            </div>

            {/* PROCESS PIPE */}
            <div className="t4k-process-pipe t4k-pipe-ph-calc" />
            <div className="t4k-process-pipe t4k-pipe-calc-kiln" />
            <div className="t4k-process-pipe t4k-pipe-kiln-idf" />

            {/* GAS FLOW */}
            <div className="t4k-flow-line t4k-flow-gas">
              <span className="t4k-flow-arrow arrow-1">➜</span>
              <span className="t4k-flow-arrow arrow-2">➜</span>
              <span className="t4k-flow-arrow arrow-3">➜</span>
            </div>

            {/* MATERIAL FLOW */}
            <div className="t4k-material-flow">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>

            {/* TAGS */}
            <div className="t4k-process-tag tag-ph-temp">
              <span>PH OUTLET</span>
              <strong>{running ? "1,020" : "35"} °C</strong>
            </div>

            <div className="t4k-process-tag tag-calc-temp">
              <span>CALCINER</span>
              <strong>{running ? "880" : "32"} °C</strong>
            </div>

            <div className="t4k-process-tag tag-bz-temp">
              <span>BURNING ZONE</span>
              <strong>{running ? "1,435" : "32"} °C</strong>
            </div>

            <div className="t4k-process-tag tag-clinker">
              <span>CLINKER</span>
              <strong>{running ? "92.6" : "0.0"} t/h</strong>
            </div>

            <div className="t4k-process-tag tag-o2">
              <span>O₂</span>
              <strong>{running ? "2.8" : "20.9"} %</strong>
            </div>
          </div>
        </div>
      </section>

      {/* TELEMETRY */}
      <section className="t4k-panel">
        <div className="t4k-panel-header">
          <div>
            <span className="t4k-panel-kicker">LIVE TELEMETRY</span>
            <h2>Kiln Operating Parameters</h2>
          </div>
        </div>

        <div className="t4k-telemetry-grid">
          {telemetry.map((item) => (
            <TelemetryCard
              key={item.label}
              label={item.label}
              value={item.value}
              unit={item.unit}
              state={item.state}
            />
          ))}
        </div>
      </section>

      {/* EQUIPMENT */}
      <section className="t4k-panel">
        <div className="t4k-panel-header">
          <div>
            <span className="t4k-panel-kicker">EQUIPMENT STATUS</span>
            <h2>Pyroprocess Equipment</h2>
          </div>
        </div>

        <div className="t4k-equipment-grid">
          {equipment.map((item) => (
            <EquipmentCard key={item.tag} {...item} />
          ))}
        </div>
      </section>

      {/* ALARM */}
      <section className="t4k-panel t4k-alarm-panel">
        <div className="t4k-panel-header">
          <div>
            <span className="t4k-panel-kicker">EVENT MONITOR</span>
            <h2>Alarm &amp; Event</h2>
          </div>

          <span className="t4k-alarm-count">{alarms.length} EVENTS</span>
        </div>

        <div className="t4k-alarm-list">
          {alarms.map((alarm) => (
            <div className="t4k-alarm-row" key={alarm.id}>
              <div className="t4k-alarm-time">{alarm.time}</div>

              <div className="t4k-alarm-tag">{alarm.tag}</div>

              <div className="t4k-alarm-message">{alarm.message}</div>

              <div
                className={`t4k-alarm-priority t4k-priority-${alarm.priority.toLowerCase()}`}
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

export default T4KilnDashboard;
