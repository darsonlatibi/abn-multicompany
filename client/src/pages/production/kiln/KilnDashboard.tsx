import React from "react";
import {
  Activity,
  AlertTriangle,
  Gauge,
  Flame,
  RotateCw,
  Thermometer,
  Wind,
  Factory,
  Zap,
  PackageCheck,
} from "lucide-react";

import KilnMimic from "../../../components/MimicRO/kiln/KilnMimic";
/* =========================================================
   KILN DASHBOARD
   CEMENT PLANT
   ========================================================= */

interface KilnDashboardProps {
  running?: boolean;
  fault?: boolean;

  kilnTemperature?: number;
  kilnPressure?: number;
  kilnRpm?: number;
  kilnCurrent?: number;

  calcinerTemperature?: number;
  preheaterTemperature?: number;

  materialFlow?: number;
  fuelFlow?: number;

  coolerTemperature?: number;

  materialFlowActive?: boolean;
  gasFlowActive?: boolean;
  flame?: boolean;

  sendCommand?: (command: string, value?: unknown) => void;
}

const KilnDashboard: React.FC<KilnDashboardProps> = ({
  running = true,
  fault = false,

  kilnTemperature = 1450,
  kilnPressure = -5,
  kilnRpm = 3.2,
  kilnCurrent = 120,

  calcinerTemperature = 900,
  preheaterTemperature = 850,

  materialFlow = 100,
  fuelFlow = 3.5,

  coolerTemperature = 120,

  materialFlowActive = true,
  gasFlowActive = true,
  flame = true,

  sendCommand,
}) => {
  /* =========================================================
     SAFE VALUES
     ========================================================= */

  const safe = (value: unknown, fallback = 0) => {
    const number = Number(value);

    return Number.isFinite(number) ? number : fallback;
  };

  const temp = safe(kilnTemperature);
  const pressure = safe(kilnPressure);
  const rpm = safe(kilnRpm);
  const current = safe(kilnCurrent);

  const calcinerTemp = safe(calcinerTemperature);
  const preheaterTemp = safe(preheaterTemperature);
  const feed = safe(materialFlow);
  const fuel = safe(fuelFlow);
  const coolerTemp = safe(coolerTemperature);

  /* =========================================================
     COLORS
     ========================================================= */

  const statusColor = fault ? "#dc3545" : running ? "#28a745" : "#64748b";

  const statusText = fault ? "FAULT" : running ? "RUNNING" : "STOP";

  const temperatureColor =
    temp >= 1400 ? "#ff3b30" : temp >= 900 ? "#ff9500" : "#00bfff";

  /* =========================================================
     COMMAND
     ========================================================= */

  const handleStartStop = () => {
    if (!sendCommand) return;

    sendCommand(running ? "STOP" : "START");
  };

  /* =========================================================
     KPI CARD
     ========================================================= */

  const KpiCard = ({
    icon: Icon,
    label,
    value,
    unit,
    color,
  }: {
    icon: React.ElementType;
    label: string;
    value: string | number;
    unit?: string;
    color: string;
  }) => (
    <div
      style={{
        background: "#0b1220",
        border: "1px solid #1f3b57",
        borderRadius: 10,
        padding: "12px 14px",
        minWidth: 150,
        flex: 1,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          color: "#94a3b8",
          fontSize: 11,
          fontWeight: 600,
        }}
      >
        <Icon size={15} color={color} />
        <span>{label}</span>
      </div>

      <div
        style={{
          marginTop: 8,
          color,
          fontSize: 21,
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        {value}

        {unit && (
          <span
            style={{
              marginLeft: 5,
              color: "#94a3b8",
              fontSize: 10,
              fontWeight: 500,
            }}
          >
            {unit}
          </span>
        )}
      </div>
    </div>
  );

  /* =========================================================
     PANEL STYLE
     ========================================================= */

  const panelStyle: React.CSSProperties = {
    background: "#07101c",
    border: "1px solid #1f3b57",
    borderRadius: 12,
    overflow: "hidden",
  };

  const panelHeaderStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "11px 14px",
    borderBottom: "1px solid #1f3b57",
    background: "#0b1220",
  };

  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100%",
        background: "#020817",
        color: "#e2e8f0",
        padding: 16,
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* =====================================================
          HEADER
          ===================================================== */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          marginBottom: 14,
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
            }}
          >
            <Factory size={22} color="#00bfff" />

            <h2
              style={{
                margin: 0,
                color: "#00bfff",
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: 0.5,
              }}
            >
              Kiln Dashboard
            </h2>
          </div>

          <div
            style={{
              marginTop: 5,
              color: "#64748b",
              fontSize: 11,
            }}
          >
            Cement Kiln Process Monitoring & Control
          </div>
        </div>

        {/* Status */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 14px",
            border: `1px solid ${statusColor}`,
            borderRadius: 8,
            background: "#0b1220",
          }}
        >
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: statusColor,
              boxShadow: `0 0 10px ${statusColor}`,
              animation:
                running && !fault ? "kilnPulse 1.2s infinite" : undefined,
            }}
          />

          <span
            style={{
              color: statusColor,
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            KILN {statusText}
          </span>
        </div>
      </div>

      {/* =====================================================
          KPI ROW
          ===================================================== */}

      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 14,
          flexWrap: "wrap",
        }}
      >
        <KpiCard
          icon={Thermometer}
          label="KILN TEMP"
          value={temp.toFixed(0)}
          unit="°C"
          color={temperatureColor}
        />

        <KpiCard
          icon={RotateCw}
          label="KILN SPEED"
          value={rpm.toFixed(2)}
          unit="RPM"
          color="#00bfff"
        />

        <KpiCard
          icon={Activity}
          label="MATERIAL FEED"
          value={feed.toFixed(1)}
          unit="t/h"
          color="#f4c542"
        />

        <KpiCard
          icon={Flame}
          label="FUEL FLOW"
          value={fuel.toFixed(2)}
          unit="Nm³/h"
          color="#ff9500"
        />

        <KpiCard
          icon={Zap}
          label="MOTOR CURRENT"
          value={current.toFixed(1)}
          unit="A"
          color="#aab4c3"
        />
      </div>

      {/* =====================================================
          MAIN MIMIC
          ===================================================== */}

      <div
        style={{
          ...panelStyle,
          marginBottom: 14,
        }}
      >
        <div style={panelHeaderStyle}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Activity size={16} color="#00bfff" />

            <span
              style={{
                color: "#e2e8f0",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              KILN PROCESS MIMIC
            </span>
          </div>

          <span
            style={{
              color: "#64748b",
              fontSize: 10,
            }}
          >
            KILN-101
          </span>
        </div>

        <div
          style={{
            width: "100%",
            overflowX: "auto",
            background: "#020817",
          }}
        >
          <svg
            viewBox="0 0 1100 560"
            width="100%"
            style={{
              display: "block",
              minWidth: 850,
              height: "auto",
            }}
          >
            <KilnMimic
              x={0}
              y={0}
              width={1100}
              height={560}
              tag="KILN-AREA-101"
              title="KILN PROCESS"
              running={running}
              fault={fault}
              kilnTemperature={temp}
              kilnPressure={pressure}
              kilnRpm={rpm}
              kilnCurrent={current}
              calcinerTemperature={calcinerTemp}
              preheaterTemperature={preheaterTemp}
              materialFlow={feed}
              fuelFlow={fuel}
              coolerTemperature={coolerTemp}
              materialFlowActive={materialFlowActive}
              gasFlowActive={gasFlowActive}
              flame={flame}
            />
          </svg>
        </div>
      </div>

      {/* =====================================================
          PROCESS STATUS
          ===================================================== */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          gap: 10,
          marginBottom: 14,
        }}
      >
        {/* Preheater */}

        <div style={panelStyle}>
          <div style={panelHeaderStyle}>
            <span
              style={{
                color: "#94a3b8",
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              PREHEATER
            </span>

            <Thermometer size={15} color={tempColor(preheaterTemp)} />
          </div>

          <div style={{ padding: 14 }}>
            <div
              style={{
                color: tempColor(preheaterTemp),
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              {preheaterTemp.toFixed(0)} °C
            </div>

            <div
              style={{
                marginTop: 5,
                color: "#64748b",
                fontSize: 10,
              }}
            >
              PH-101 • Tower temperature
            </div>
          </div>
        </div>

        {/* Calciner */}

        <div style={panelStyle}>
          <div style={panelHeaderStyle}>
            <span
              style={{
                color: "#94a3b8",
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              CALCINER
            </span>

            <Flame size={15} color={tempColor(calcinerTemp)} />
          </div>

          <div style={{ padding: 14 }}>
            <div
              style={{
                color: tempColor(calcinerTemp),
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              {calcinerTemp.toFixed(0)} °C
            </div>

            <div
              style={{
                marginTop: 5,
                color: "#64748b",
                fontSize: 10,
              }}
            >
              CL-101 • Calcination zone
            </div>
          </div>
        </div>

        {/* Cooler */}

        <div style={panelStyle}>
          <div style={panelHeaderStyle}>
            <span
              style={{
                color: "#94a3b8",
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              CLINKER COOLER
            </span>

            <Wind size={15} color="#00bfff" />
          </div>

          <div style={{ padding: 14 }}>
            <div
              style={{
                color: "#00bfff",
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              {coolerTemp.toFixed(0)} °C
            </div>

            <div
              style={{
                marginTop: 5,
                color: "#64748b",
                fontSize: 10,
              }}
            >
              CC-101 • Clinker outlet
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          DETAIL PANELS
          ===================================================== */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 10,
        }}
      >
        {/* Kiln Operating */}

        <div style={panelStyle}>
          <div style={panelHeaderStyle}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#e2e8f0",
              }}
            >
              KILN OPERATING DATA
            </span>

            <Gauge size={15} color="#00bfff" />
          </div>

          <div style={{ padding: 14 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              <DataItem
                label="Temperature"
                value={`${temp.toFixed(0)} °C`}
                color={temperatureColor}
              />

              <DataItem
                label="Pressure"
                value={`${pressure.toFixed(1)} Pa`}
                color="#aab4c3"
              />

              <DataItem
                label="Speed"
                value={`${rpm.toFixed(2)} RPM`}
                color="#00bfff"
              />

              <DataItem
                label="Current"
                value={`${current.toFixed(1)} A`}
                color="#aab4c3"
              />
            </div>
          </div>
        </div>

        {/* Process Flow */}

        <div style={panelStyle}>
          <div style={panelHeaderStyle}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#e2e8f0",
              }}
            >
              PROCESS FLOW
            </span>

            <PackageCheck size={15} color="#f4c542" />
          </div>

          <div style={{ padding: 14 }}>
            <DataItem
              label="Material Feed"
              value={`${feed.toFixed(1)} t/h`}
              color="#f4c542"
            />

            <DataItem
              label="Fuel Flow"
              value={`${fuel.toFixed(2)} Nm³/h`}
              color="#ff9500"
            />

            <DataItem
              label="Gas Flow"
              value={gasFlowActive ? "ACTIVE" : "STOP"}
              color={gasFlowActive ? "#00ffff" : "#64748b"}
            />

            <DataItem
              label="Flame"
              value={flame && running ? "ACTIVE" : "OFF"}
              color={flame && running ? "#ff9500" : "#64748b"}
            />
          </div>
        </div>

        {/* Control */}

        <div style={panelStyle}>
          <div style={panelHeaderStyle}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#e2e8f0",
              }}
            >
              KILN CONTROL
            </span>

            {fault ? (
              <AlertTriangle size={15} color="#dc3545" />
            ) : (
              <Activity size={15} color="#28a745" />
            )}
          </div>

          <div style={{ padding: 14 }}>
            <button
              type="button"
              onClick={handleStartStop}
              disabled={!sendCommand}
              style={{
                width: "100%",
                border: `1px solid ${statusColor}`,
                background: "#0b1220",
                color: statusColor,
                borderRadius: 7,
                padding: "10px 14px",
                cursor: sendCommand ? "pointer" : "default",
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              {running ? "STOP KILN" : "START KILN"}
            </button>

            <div
              style={{
                marginTop: 10,
                textAlign: "center",
                color: "#64748b",
                fontSize: 9,
              }}
            >
              Command will be sent to kiln control layer
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          GLOBAL STYLE
          ===================================================== */}

      <style>
        {`
          @keyframes kilnPulse {
            0% {
              opacity: 1;
              transform: scale(1);
            }

            50% {
              opacity: 0.35;
              transform: scale(0.8);
            }

            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>
    </div>
  );
};

/* =========================================================
   DATA ITEM
   ========================================================= */

interface DataItemProps {
  label: string;
  value: string;
  color?: string;
}

const DataItem: React.FC<DataItemProps> = ({
  label,
  value,
  color = "#e2e8f0",
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
        padding: "7px 0",
        borderBottom: "1px solid #132238",
      }}
    >
      <span
        style={{
          color: "#64748b",
          fontSize: 10,
        }}
      >
        {label}
      </span>

      <span
        style={{
          color,
          fontSize: 10,
          fontWeight: 700,
        }}
      >
        {value}
      </span>
    </div>
  );
};

/* =========================================================
   TEMPERATURE COLOR
   ========================================================= */

const tempColor = (temp: number) => {
  if (temp >= 1300) return "#ff3b30";
  if (temp >= 900) return "#ff9500";
  return "#00bfff";
};

export default KilnDashboard;

{
  /* <KilnDashboard
  running={true}
  fault={false}
  kilnTemperature={1450}
  kilnPressure={-5}
  kilnRpm={3.2}
  kilnCurrent={120}
  calcinerTemperature={900}
  preheaterTemperature={850}
  materialFlow={100}
  fuelFlow={3.5}
  coolerTemperature={120}
  materialFlowActive={true}
  gasFlowActive={true}
  flame={true}
/>; */
}
