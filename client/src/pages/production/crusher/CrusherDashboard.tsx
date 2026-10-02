import React, { useState } from "react";

import CrusherHopper from "../../../components/MimicRO/crusher/CrusherHopper";
import Crusher from "../../../components/MimicRO/crusher/Crusher";
import CrusherMainDrive from "../../../components/MimicRO/crusher/CrusherMainDrive";

const CrusherDashboard: React.FC = () => {
  /* =========================================================
PROCESS STATE
========================================================= */

  const [hopperRunning, setHopperRunning] = useState(true);
  const [crusherRunning, setCrusherRunning] = useState(true);
  const [driveRunning, setDriveRunning] = useState(true);

  const [inletOpen, setInletOpen] = useState(true);
  const [outletOpen, setOutletOpen] = useState(true);
  const [gateOpen, setGateOpen] = useState(true);

  /* =========================================================
PROCESS VALUES
========================================================= */

  const hopperLevel = 68;

  const feedFlow = hopperRunning && gateOpen && inletOpen ? 185 : 0;

  const productFlow = crusherRunning && outletOpen ? 178 : 0;

  const crusherRPM = crusherRunning ? 740 : 0;
  const crusherLoad = crusherRunning ? 64 : 0;
  const crusherVibration = crusherRunning ? 2.1 : 0;
  const bearingTemperature = crusherRunning ? 54 : 30;

  const motorRPM = driveRunning ? 1485 : 0;
  const motorCurrent = driveRunning ? 78 : 0;
  const motorPower = driveRunning ? 315 : 0;
  const motorLoad = driveRunning ? 68 : 0;
  const motorTemperature = driveRunning ? 57 : 30;

  /* =========================================================
COMMAND HANDLERS
========================================================= */

  const handleHopperCommand = (command: string) => {
    switch (command) {
      case "START":
        setHopperRunning(true);
        setGateOpen(true);
        break;

      case "STOP":
        setHopperRunning(false);
        setGateOpen(false);
        break;

      default:
        break;
    }

    console.log("Crusher Hopper Command:", command);
  };

  const handleCrusherCommand = (command: string) => {
    switch (command) {
      case "START":
        setCrusherRunning(true);
        setInletOpen(true);
        setOutletOpen(true);
        break;

      case "STOP":
        setCrusherRunning(false);
        setInletOpen(false);
        setOutletOpen(false);
        break;

      case "FORWARD":
        console.log("Crusher direction: FORWARD");
        break;

      case "REVERSE":
        console.log("Crusher direction: REVERSE");
        break;

      default:
        break;
    }

    console.log("Crusher Command:", command);
  };

  const handleDriveCommand = (command: string) => {
    switch (command) {
      case "START":
        setDriveRunning(true);
        setCrusherRunning(true);
        setInletOpen(true);
        setOutletOpen(true);
        break;

      case "STOP":
        setDriveRunning(false);
        setCrusherRunning(false);
        setInletOpen(false);
        setOutletOpen(false);
        break;

      default:
        break;
    }

    console.log("Crusher Main Drive Command:", command);
  };

  /* =========================================================
HEADER STATUS
========================================================= */

  const materialFlowActive =
    hopperRunning &&
    crusherRunning &&
    driveRunning &&
    gateOpen &&
    inletOpen &&
    outletOpen;

  const systemRunning = hopperRunning && crusherRunning && driveRunning;

  const systemStatus = systemRunning ? "RUNNING" : "STOPPED";

  const systemStatusColor = systemRunning ? "#22c55e" : "#64748b";

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100%",
        background: "#020617",
        color: "#e2e8f0",
        padding: 16,
        boxSizing: "border-box",
      }}
    >
      {/* =====================================================
PAGE HEADER
===================================================== */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
          padding: "12px 16px",
          background: "#0b1220",
          border: "1px solid #1e293b",
          borderRadius: 8,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#f8fafc",
            }}
          >
            Limestone Crusher
          </div>

          <div
            style={{
              fontSize: 12,
              color: "#64748b",
              marginTop: 3,
            }}
          >
            Limestone Crushing & Material Preparation
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 12,
            fontWeight: 700,
            color: systemStatusColor,
          }}
        >
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: systemStatusColor,
              boxShadow: systemRunning
                ? `0 0 10px ${systemStatusColor}`
                : "none",
            }}
          />
          SYSTEM {systemStatus}
        </div>
      </div>

      {/* =====================================================
      KPI BAR
      ===================================================== */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
          gap: 10,
          marginBottom: 14,
        }}
      >
        {/* FEED FLOW */}

        <div
          style={{
            background: "#0b1220",
            border: "1px solid #1e293b",
            borderRadius: 7,
            padding: 12,
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: "#64748b",
            }}
          >
            FEED FLOW
          </div>

          <div
            style={{
              marginTop: 5,
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            {feedFlow.toFixed(0)}

            <span
              style={{
                marginLeft: 4,
                fontSize: 11,
                color: "#94a3b8",
              }}
            >
              t/h
            </span>
          </div>
        </div>

        {/* PRODUCT FLOW */}

        <div
          style={{
            background: "#0b1220",
            border: "1px solid #1e293b",
            borderRadius: 7,
            padding: 12,
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: "#64748b",
            }}
          >
            PRODUCT FLOW
          </div>

          <div
            style={{
              marginTop: 5,
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            {productFlow.toFixed(0)}

            <span
              style={{
                marginLeft: 4,
                fontSize: 11,
                color: "#94a3b8",
              }}
            >
              t/h
            </span>
          </div>
        </div>

        {/* HOPPER LEVEL */}

        <div
          style={{
            background: "#0b1220",
            border: "1px solid #1e293b",
            borderRadius: 7,
            padding: 12,
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: "#64748b",
            }}
          >
            HOPPER LEVEL
          </div>

          <div
            style={{
              marginTop: 5,
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            {hopperLevel}

            <span
              style={{
                marginLeft: 3,
                fontSize: 11,
                color: "#94a3b8",
              }}
            >
              %
            </span>
          </div>
        </div>

        {/* CRUSHER LOAD */}

        <div
          style={{
            background: "#0b1220",
            border: "1px solid #1e293b",
            borderRadius: 7,
            padding: 12,
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: "#64748b",
            }}
          >
            CRUSHER LOAD
          </div>

          <div
            style={{
              marginTop: 5,
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            {crusherLoad}

            <span
              style={{
                marginLeft: 3,
                fontSize: 11,
                color: "#94a3b8",
              }}
            >
              %
            </span>
          </div>
        </div>

        {/* MOTOR POWER */}

        <div
          style={{
            background: "#0b1220",
            border: "1px solid #1e293b",
            borderRadius: 7,
            padding: 12,
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: "#64748b",
            }}
          >
            MOTOR POWER
          </div>

          <div
            style={{
              marginTop: 5,
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            {motorPower}

            <span
              style={{
                marginLeft: 4,
                fontSize: 11,
                color: "#94a3b8",
              }}
            >
              kW
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
      PROCESS MIMIC
      ===================================================== */}

      <div
        style={{
          background: "#050b16",
          border: "1px solid #1e293b",
          borderRadius: 8,
          padding: 10,
          overflowX: "auto",
        }}
      >
        <svg
          viewBox="0 0 1280 610"
          width="100%"
          style={{
            minWidth: 900,
            display: "block",
          }}
        >
          {/* PROCESS TITLE */}

          <text
            x={640}
            y={25}
            textAnchor="middle"
            fill="#94a3b8"
            fontSize={13}
            fontWeight={700}
          >
            LIMESTONE CRUSHING PROCESS
          </text>

          {/* MATERIAL FLOW PIPE */}

          <line
            x1={80}
            y1={260}
            x2={1180}
            y2={260}
            stroke="#334155"
            strokeWidth={8}
            strokeLinecap="round"
          />

          {/* ACTIVE MATERIAL FLOW */}

          {materialFlowActive && (
            <line
              x1={80}
              y1={260}
              x2={1180}
              y2={260}
              stroke="#d6c9a5"
              strokeWidth={4}
              strokeLinecap="round"
              strokeDasharray="16 12"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-56"
                dur="1s"
                repeatCount="indefinite"
              />
            </line>
          )}

          {/* =================================================
          HOPPER
          ================================================= */}

          <CrusherHopper
            x={55}
            y={105}
            width={300}
            height={320}
            tag="LS-HOP-01"
            title="LIMESTONE HOPPER"
            level={hopperLevel}
            flow={feedFlow}
            temperature={30}
            materialFlow={materialFlowActive}
            running={hopperRunning}
            alarm={false}
            highLevel={hopperLevel >= 90}
            gateOpen={gateOpen}
            isdetail
            sendCommand={handleHopperCommand}
          />

          {/* =================================================
          CRUSHER
          ================================================= */}

          <Crusher
            x={430}
            y={95}
            width={350}
            height={340}
            tag="LS-CR-01"
            title="LIMESTONE CRUSHER"
            feedFlow={feedFlow}
            productFlow={productFlow}
            rpm={crusherRPM}
            load={crusherLoad}
            vibration={crusherVibration}
            bearingTemperature={bearingTemperature}
            running={crusherRunning}
            alarm={false}
            trip={false}
            materialFlow={materialFlowActive}
            inletOpen={inletOpen}
            outletOpen={outletOpen}
            direction="right"
            isdetail
            sendCommand={handleCrusherCommand}
          />

          {/* =================================================
          MAIN DRIVE
          ================================================= */}

          <CrusherMainDrive
            x={850}
            y={105}
            width={300}
            height={300}
            tag="LS-MTR-01"
            title="CRUSHER MAIN DRIVE"
            rpm={motorRPM}
            current={motorCurrent}
            power={motorPower}
            load={motorLoad}
            temperature={motorTemperature}
            running={driveRunning}
            alarm={false}
            trip={false}
            motorRunning={driveRunning}
            gearboxRunning={driveRunning}
            isdetail
            sendCommand={handleDriveCommand}
          />

          {/* =================================================
          FLOW LABELS
          ================================================= */}

          <g fill="#94a3b8" fontSize={11} fontWeight={700}>
            <text x={160} y={235}>
              LIMESTONE
            </text>

            <text x={505} y={235}>
              FEED
            </text>

            <text x={905} y={235}>
              CRUSHED LIMESTONE
            </text>
          </g>

          {/* =================================================
          PROCESS CONNECTIONS
          ================================================= */}

          <path
            d="M 355 260 L 430 260"
            fill="none"
            stroke="#64748b"
            strokeWidth={3}
            markerEnd="url(#crusher-arrow)"
          />

          <path
            d="M 780 260 L 850 260"
            fill="none"
            stroke="#64748b"
            strokeWidth={3}
          />

          {/* =================================================
          ARROW MARKER
          ================================================= */}

          <defs>
            <marker
              id="crusher-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="4"
              orient="auto"
            >
              <path d="M 0 0 L 8 4 L 0 8 Z" fill="#64748b" />
            </marker>
          </defs>

          {/* =================================================
          EQUIPMENT TAGS
          ================================================= */}

          <g fill="#475569" fontSize={10} fontWeight={600}>
            <text x={205} y={445} textAnchor="middle">
              LS-HOP-01
            </text>

            <text x={605} y={455} textAnchor="middle">
              LS-CR-01
            </text>

            <text x={1000} y={425} textAnchor="middle">
              LS-MTR-01
            </text>
          </g>

          {/* =================================================
          SYSTEM STATUS
          ================================================= */}

          <rect
            x={450}
            y={500}
            width={380}
            height={55}
            rx={7}
            fill="#0b1220"
            stroke="#334155"
          />

          <circle cx={475} cy={527} r={6} fill={systemStatusColor} />

          <text x={490} y={522} fill="#94a3b8" fontSize={10}>
            CRUSHER SYSTEM
          </text>

          <text
            x={490}
            y={541}
            fill={systemStatusColor}
            fontSize={13}
            fontWeight={700}
          >
            {systemStatus}
          </text>

          <text x={805} y={532} textAnchor="end" fill="#64748b" fontSize={10}>
            AUTO PROCESS
          </text>
        </svg>
      </div>

      {/* =====================================================
      FOOTER STATUS
      ===================================================== */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: 10,
          marginTop: 14,
        }}
      >
        {[
          {
            label: "HOPPER",
            value: hopperRunning ? "RUNNING" : "STOPPED",
            active: hopperRunning,
          },
          {
            label: "CRUSHER",
            value: crusherRunning ? "RUNNING" : "STOPPED",
            active: crusherRunning,
          },
          {
            label: "MAIN DRIVE",
            value: driveRunning ? "RUNNING" : "STOPPED",
            active: driveRunning,
          },
          {
            label: "MATERIAL FLOW",
            value: materialFlowActive ? "ACTIVE" : "STOPPED",
            active: materialFlowActive,
          },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 12px",
              background: "#0b1220",
              border: "1px solid #1e293b",
              borderRadius: 6,
            }}
          >
            <span
              style={{
                fontSize: 10,
                color: "#64748b",
                fontWeight: 600,
              }}
            >
              {item.label}
            </span>

            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: item.active ? "#22c55e" : "#64748b",
              }}
            >
              ● {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrusherDashboard;
