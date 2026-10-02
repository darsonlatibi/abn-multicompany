import React, { useMemo, useState } from "react";
import "./T5PackerDashboard.css";

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
  <span className={`t5p-status-dot t5p-status-${state.toLowerCase()}`} />
);

const StatusBadge: React.FC<{ state: EquipmentState }> = ({ state }) => (
  <span className={`t5p-status-badge t5p-badge-${state.toLowerCase()}`}>
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
  <div className="t5p-telemetry-card">
    <div className="t5p-telemetry-head">
      <span>{label}</span>
      <StatusDot state={state} />
    </div>

    <div className="t5p-telemetry-value">
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
  <div className={`t5p-equipment-card t5p-equipment-${state.toLowerCase()}`}>
    <div className="t5p-equipment-top">
      <div>
        <div className="t5p-equipment-name">{name}</div>
        <div className="t5p-equipment-tag">{tag}</div>
      </div>

      <StatusBadge state={state} />
    </div>

    <div className="t5p-equipment-detail">{detail}</div>
  </div>
);

const T5PackerDashboard: React.FC = () => {
  const [running, setRunning] = useState(true);

  const telemetry = useMemo<TelemetryItem[]>(
    () => [
      {
        label: "Packing Rate",
        value: running ? "142.5" : "0.0",
        unit: "t/h",
      },
      {
        label: "Packer Speed",
        value: running ? "18.6" : "0.0",
        unit: "RPM",
      },
      {
        label: "Bagging Rate",
        value: running ? "1,425" : "0",
        unit: "bags/h",
      },
      {
        label: "Bag Weight",
        value: running ? "50.02" : "0.00",
        unit: "kg",
      },
      {
        label: "Weight Deviation",
        value: running ? "0.08" : "0.00",
        unit: "kg",
      },
      {
        label: "Air Pressure",
        value: running ? "6.4" : "0.0",
        unit: "bar",
      },
      {
        label: "Cement Level",
        value: running ? "68.4" : "0.0",
        unit: "%",
      },
      {
        label: "Truck Loading",
        value: running ? "86" : "0",
        unit: "%",
      },
    ],
    [running],
  );

  const equipment = useMemo(
    () => [
      {
        name: "Cement Silo",
        tag: "T5-SILO-01",
        state: running ? ("RUN" as EquipmentState) : ("STOP" as EquipmentState),
        detail: running
          ? "Level 68.4% • Feed available"
          : "Material feed stopped",
      },
      {
        name: "Rotary Packer",
        tag: "T5-PKR-01",
        state: running ? ("RUN" as EquipmentState) : ("STOP" as EquipmentState),
        detail: running ? "18.6 RPM • 1,425 bags/h" : "Packer stopped",
      },
      {
        name: "Bag Conveyor",
        tag: "T5-CV-01",
        state: running ? ("RUN" as EquipmentState) : ("STOP" as EquipmentState),
        detail: running ? "Bag transfer active" : "Conveyor stopped",
      },
      {
        name: "Checkweigher",
        tag: "T5-CW-01",
        state: running ? ("RUN" as EquipmentState) : ("STOP" as EquipmentState),
        detail: running ? "50.02 kg average" : "Scale stopped",
      },
      {
        name: "Truck Loader",
        tag: "T5-TL-01",
        state: running ? ("RUN" as EquipmentState) : ("STOP" as EquipmentState),
        detail: running ? "Loading sequence active" : "Loading stopped",
      },
      {
        name: "Dust Collector",
        tag: "T5-DC-01",
        state: running ? ("RUN" as EquipmentState) : ("STOP" as EquipmentState),
        detail: running ? "Extraction healthy" : "Extraction stopped",
      },
    ],
    [running],
  );

  const alarms = useMemo<AlarmItem[]>(
    () => [
      {
        id: "PKR-WEIGHT",
        time: "09:21:34",
        tag: "T5.PKR.WEIGHT",
        message: "Bag weight deviation within control limit",
        priority: "LOW",
      },
      {
        id: "PKR-AIR",
        time: "09:18:12",
        tag: "T5.PKR.AIR",
        message: "Packing air pressure stable",
        priority: "LOW",
      },
      {
        id: "TL-LOAD",
        time: "09:15:48",
        tag: "T5.TL.LOAD",
        message: "Truck loading sequence active",
        priority: "MEDIUM",
      },
    ],
    [],
  );

  return (
    <div className="t5p-dashboard">
      {/* HEADER */}
      <header className="t5p-header">
        <div className="t5p-title-block">
          <div className="t5p-eyebrow">TONASA 5 • PACKING &amp; DISPATCH</div>

          <h1>T5 PACKER</h1>

          <p>Cement Packing &amp; Truck Loading Station</p>
        </div>

        <div className="t5p-header-right">
          <div className="t5p-live">
            <span className="t5p-live-dot" />
            LIVE
          </div>

          <StatusBadge state={running ? "RUN" : "STOP"} />

          <button
            type="button"
            className={`t5p-sim-button ${
              running ? "t5p-sim-stop" : "t5p-sim-start"
            }`}
            onClick={() => setRunning((prev) => !prev)}
          >
            {running ? "SIM STOP" : "SIM START"}
          </button>
        </div>
      </header>

      {/* PROCESS MIMIC */}
      <section className="t5p-panel">
        <div className="t5p-panel-header">
          <div>
            <span className="t5p-panel-kicker">PROCESS MIMIC</span>
            <h2>Cement Packing &amp; Dispatch Line</h2>
          </div>

          <div className="t5p-process-state">
            <StatusDot state={running ? "RUN" : "STOP"} />
            {running ? "PACKING RUNNING" : "PACKING STOPPED"}
          </div>
        </div>

        <div className="t5p-process-scroll">
          <div className={`t5p-process-canvas ${!running ? "t5p-paused" : ""}`}>
            {/* CEMENT SILO */}
            <div className="t5p-silo">
              <div className="t5p-equipment-label">
                <strong>CEMENT SILO</strong>
                <span>T5-SILO-01</span>
              </div>

              <div className="t5p-silo-body">
                <div className="t5p-silo-top" />

                <div className="t5p-silo-material">
                  <div />
                </div>

                <div className="t5p-silo-level">
                  <span>{running ? "68.4" : "0.0"}%</span>
                </div>
              </div>

              <div className="t5p-silo-leg silo-leg-left" />
              <div className="t5p-silo-leg silo-leg-right" />
            </div>

            {/* FEED PIPE */}
            <div className="t5p-feed-pipe">
              <span />
              <span />
              <span />
            </div>

            {/* ROTARY PACKER */}
            <div className="t5p-packer">
              <div className="t5p-equipment-label">
                <strong>ROTARY PACKER</strong>
                <span>T5-PKR-01</span>
              </div>

              <div className="t5p-packer-machine">
                <div className="t5p-packer-top">
                  <div className="t5p-packer-cap" />
                </div>

                <div className="t5p-packer-rotor">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <div className="t5p-packer-spout" key={index}>
                      <span />
                    </div>
                  ))}
                </div>

                <div className="t5p-packer-base" />
              </div>

              <div className="t5p-packer-speed">
                {running ? "18.6" : "0.0"} RPM
              </div>
            </div>

            {/* BAG FLOW */}
            <div className="t5p-bag-flow">
              {Array.from({ length: 9 }).map((_, index) => (
                <div className="t5p-bag" key={index}>
                  <span>50</span>
                </div>
              ))}
            </div>

            {/* CONVEYOR */}
            <div className="t5p-conveyor">
              <div className="t5p-equipment-label">
                <strong>BAG CONVEYOR</strong>
                <span>T5-CV-01</span>
              </div>

              <div className="t5p-belt">
                {Array.from({ length: 17 }).map((_, index) => (
                  <span key={index} />
                ))}
              </div>

              <div className="t5p-roller roller-1" />
              <div className="t5p-roller roller-2" />
              <div className="t5p-roller roller-3" />
              <div className="t5p-roller roller-4" />
            </div>

            {/* CHECKWEIGHER */}
            <div className="t5p-checkweigher">
              <div className="t5p-equipment-label">
                <strong>CHECKWEIGHER</strong>
                <span>T5-CW-01</span>
              </div>

              <div className="t5p-scale">
                <div className="t5p-scale-platform" />
                <div className="t5p-scale-display">
                  {running ? "50.02" : "0.00"}
                  <small>kg</small>
                </div>
              </div>
            </div>

            {/* TRUCK LOADER */}
            <div className="t5p-truck-loader">
              <div className="t5p-equipment-label">
                <strong>TRUCK LOADER</strong>
                <span>T5-TL-01</span>
              </div>

              <div className="t5p-loader-body">
                <div className="t5p-loader-head" />
                <div className="t5p-loader-belt" />
                <div className="t5p-loader-chute">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>

            {/* TRUCK */}
            <div className="t5p-truck">
              <div className="t5p-truck-cabin" />
              <div className="t5p-truck-bed">
                <div className="t5p-bag-row">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>

              <div className="t5p-wheel truck-wheel-1" />
              <div className="t5p-wheel truck-wheel-2" />
              <div className="t5p-wheel truck-wheel-3" />
            </div>

            {/* DUST COLLECTOR */}
            <div className="t5p-dust">
              <div className="t5p-equipment-label">
                <strong>DUST COLLECTOR</strong>
                <span>T5-DC-01</span>
              </div>

              <div className="t5p-dust-body">
                <div />
                <div />
                <div />
              </div>

              <div className="t5p-dust-pipe" />
            </div>

            {/* MATERIAL FLOW */}
            <div className="t5p-material-flow">
              {Array.from({ length: 12 }).map((_, index) => (
                <span key={index} />
              ))}
            </div>

            {/* PROCESS TAGS */}
            <div className="t5p-process-tag tag-silo">
              <span>SILO LEVEL</span>
              <strong>{running ? "68.4" : "0.0"}%</strong>
            </div>

            <div className="t5p-process-tag tag-packer">
              <span>PACKING RATE</span>
              <strong>{running ? "1,425" : "0"} bags/h</strong>
            </div>

            <div className="t5p-process-tag tag-weight">
              <span>BAG WEIGHT</span>
              <strong>{running ? "50.02" : "0.00"} kg</strong>
            </div>

            <div className="t5p-process-tag tag-air">
              <span>AIR PRESSURE</span>
              <strong>{running ? "6.4" : "0.0"} bar</strong>
            </div>

            <div className="t5p-process-tag tag-loading">
              <span>TRUCK LOADING</span>
              <strong>{running ? "86" : "0"}%</strong>
            </div>
          </div>
        </div>
      </section>

      {/* TELEMETRY */}
      <section className="t5p-panel">
        <div className="t5p-panel-header">
          <div>
            <span className="t5p-panel-kicker">LIVE TELEMETRY</span>
            <h2>Packing Operating Parameters</h2>
          </div>
        </div>

        <div className="t5p-telemetry-grid">
          {telemetry.map((item) => (
            <TelemetryCard key={item.label} {...item} />
          ))}
        </div>
      </section>

      {/* EQUIPMENT */}
      <section className="t5p-panel">
        <div className="t5p-panel-header">
          <div>
            <span className="t5p-panel-kicker">EQUIPMENT STATUS</span>
            <h2>Packing &amp; Dispatch Equipment</h2>
          </div>
        </div>

        <div className="t5p-equipment-grid">
          {equipment.map((item) => (
            <EquipmentCard key={item.tag} {...item} />
          ))}
        </div>
      </section>

      {/* ALARM */}
      <section className="t5p-panel t5p-alarm-panel">
        <div className="t5p-panel-header">
          <div>
            <span className="t5p-panel-kicker">EVENT MONITOR</span>
            <h2>Alarm &amp; Event</h2>
          </div>

          <span className="t5p-alarm-count">{alarms.length} EVENTS</span>
        </div>

        <div className="t5p-alarm-list">
          {alarms.map((alarm) => (
            <div className="t5p-alarm-row" key={alarm.id}>
              <div className="t5p-alarm-time">{alarm.time}</div>

              <div className="t5p-alarm-tag">{alarm.tag}</div>

              <div className="t5p-alarm-message">{alarm.message}</div>

              <div
                className={`t5p-alarm-priority t5p-priority-${alarm.priority.toLowerCase()}`}
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

export default T5PackerDashboard;
