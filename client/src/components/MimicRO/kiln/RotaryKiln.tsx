import React from "react";

/* =========================================================
   ROTARY KILN
   CEMENT PLANT SVG PROCESS COMPONENT
   ========================================================= */

type KilnDirection = "left" | "right";

interface RotaryKilnProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;

  tag?: string;
  title?: string;

  running?: boolean;
  fault?: boolean;

  temperature?: number;
  pressure?: number;
  rpm?: number;
  current?: number;
  materialFlow?: number;

  flame?: boolean;
  materialFlowActive?: boolean;
  gasFlowActive?: boolean;

  direction?: KilnDirection;

  temperatureUnit?: string;
  materialFlowUnit?: string;

  fontFamily?: string;

  tagSize?: number;
  statusSize?: number;
  valueSize?: number;

  isdetail?: boolean;

  sendCommand?: (command: string, value?: unknown) => void;
}

const RotaryKiln: React.FC<RotaryKilnProps> = ({
  x = 0,
  y = 0,

  width = 420,
  height = 160,

  tag = "KILN-101",
  title = "ROTARY KILN",

  running = false,
  fault = false,

  temperature = 1450,
  pressure = -5,
  rpm = 3.2,
  current = 120,
  materialFlow = 100,

  flame = true,
  materialFlowActive = true,
  gasFlowActive = true,

  direction = "right",

  temperatureUnit = "°C",
  materialFlowUnit = "t/h",

  fontFamily = "Arial",

  tagSize = 12,
  statusSize = 11,
  valueSize = 10,

  isdetail = true,

  sendCommand,
}) => {
  /* =========================================================
     SAFE VALUES
     ========================================================= */

  const safeTemperature = Number.isFinite(Number(temperature))
    ? Number(temperature)
    : 0;

  const safePressure = Number.isFinite(Number(pressure)) ? Number(pressure) : 0;

  const safeRpm = Number.isFinite(Number(rpm)) ? Number(rpm) : 0;

  const safeCurrent = Number.isFinite(Number(current)) ? Number(current) : 0;

  const safeMaterialFlow = Number.isFinite(Number(materialFlow))
    ? Number(materialFlow)
    : 0;

  /* =========================================================
     STATUS
     ========================================================= */

  const bodyColor = fault ? "#dc3545" : running ? "#28a745" : "#6c757d";

  const flowColor = fault ? "#dc3545" : running ? "#00ffff" : "#475569";

  const materialColor = fault ? "#dc3545" : running ? "#f4c542" : "#64748b";

  const tempColor =
    safeTemperature >= 1300
      ? "#ff3b30"
      : safeTemperature >= 900
        ? "#ff9500"
        : "#00bfff";

  const statusText = fault ? "FAULT" : running ? "RUNNING" : "STOP";

  /* =========================================================
     COMMAND
     ========================================================= */

  const handleCommand = () => {
    if (!sendCommand) return;

    sendCommand(running ? "STOP" : "START");
  };

  /* =========================================================
     GEOMETRY
     ========================================================= */

  const shellX = width * 0.12;
  const shellY = height * 0.3;

  const shellWidth = width * 0.7;
  const shellHeight = height * 0.3;

  const shellCenterY = shellY + shellHeight / 2;

  const inletX =
    direction === "right"
      ? shellX - width * 0.1
      : shellX + shellWidth + width * 0.1;

  const outletX =
    direction === "right"
      ? shellX + shellWidth + width * 0.12
      : shellX - width * 0.12;

  const burnerX = direction === "right" ? shellX + shellWidth : shellX;

  const burnerDirection = direction === "right" ? 1 : -1;

  /* =========================================================
     ANIMATION
     ========================================================= */

  const animationDuration = running ? "1.2s" : "0s";

  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <g transform={`translate(${x}, ${y})`} fontFamily={fontFamily}>
      {/* =====================================================
          TITLE
          ===================================================== */}

      <text
        x={width / 2}
        y={16}
        textAnchor="middle"
        fill="#00bfff"
        fontSize={tagSize}
        fontWeight="700"
        letterSpacing="1"
      >
        {title}
      </text>

      {/* =====================================================
          MAIN KILN BODY
          ===================================================== */}

      <rect
        x={shellX}
        y={shellY}
        width={shellWidth}
        height={shellHeight}
        rx={shellHeight / 2}
        fill="#0b1220"
        stroke={bodyColor}
        strokeWidth={2}
      />

      {/* =====================================================
          INNER KILN SHELL
          ===================================================== */}

      <rect
        x={shellX + 7}
        y={shellY + 7}
        width={shellWidth - 14}
        height={shellHeight - 14}
        rx={(shellHeight - 14) / 2}
        fill="#111c2d"
        stroke="#1f3b57"
        strokeWidth={1}
      />

      {/* =====================================================
          REFRACTORY / HOT ZONE
          ===================================================== */}

      <rect
        x={shellX + shellWidth * 0.18}
        y={shellY + shellHeight * 0.2}
        width={shellWidth * 0.55}
        height={shellHeight * 0.6}
        rx={shellHeight * 0.3}
        fill={running ? "#291712" : "#111c2d"}
        opacity={running ? 0.85 : 0.55}
      />

      {/* =====================================================
          HOT ZONE ANIMATION
          ===================================================== */}

      {running && (
        <rect
          x={shellX + shellWidth * 0.22}
          y={shellY + shellHeight * 0.27}
          width={shellWidth * 0.42}
          height={shellHeight * 0.46}
          rx={shellHeight * 0.23}
          fill="none"
          stroke="#ff3b30"
          strokeWidth={2}
          opacity={0.7}
        >
          <animate
            attributeName="opacity"
            values="0.25;0.8;0.25"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </rect>
      )}

      {/* =====================================================
          KILN TYRES
          ===================================================== */}

      <g>
        <ellipse
          cx={shellX + shellWidth * 0.25}
          cy={shellCenterY}
          rx={10}
          ry={shellHeight * 0.63}
          fill="none"
          stroke="#64748b"
          strokeWidth={5}
        />

        <ellipse
          cx={shellX + shellWidth * 0.62}
          cy={shellCenterY}
          rx={10}
          ry={shellHeight * 0.63}
          fill="none"
          stroke="#64748b"
          strokeWidth={5}
        />
      </g>

      {/* =====================================================
          SUPPORT ROLLERS
          ===================================================== */}

      <g fill="#1f2937" stroke="#64748b" strokeWidth={1.5}>
        <circle
          cx={shellX + shellWidth * 0.25 - 15}
          cy={shellY + shellHeight + 15}
          r={10}
        />

        <circle
          cx={shellX + shellWidth * 0.25 + 15}
          cy={shellY + shellHeight + 15}
          r={10}
        />

        <circle
          cx={shellX + shellWidth * 0.62 - 15}
          cy={shellY + shellHeight + 15}
          r={10}
        />

        <circle
          cx={shellX + shellWidth * 0.62 + 15}
          cy={shellY + shellHeight + 15}
          r={10}
        />
      </g>

      {/* =====================================================
          SUPPORT BASE
          ===================================================== */}

      <line
        x1={shellX + shellWidth * 0.25}
        y1={shellY + shellHeight + 8}
        x2={shellX + shellWidth * 0.25}
        y2={shellY + shellHeight + 30}
        stroke="#64748b"
        strokeWidth={4}
      />

      <line
        x1={shellX + shellWidth * 0.62}
        y1={shellY + shellHeight + 8}
        x2={shellX + shellWidth * 0.62}
        y2={shellY + shellHeight + 30}
        stroke="#64748b"
        strokeWidth={4}
      />

      <line
        x1={shellX + shellWidth * 0.15}
        y1={shellY + shellHeight + 30}
        x2={shellX + shellWidth * 0.72}
        y2={shellY + shellHeight + 30}
        stroke="#1f3b57"
        strokeWidth={5}
      />

      {/* =====================================================
          MATERIAL FLOW INSIDE KILN
          ===================================================== */}

      {materialFlowActive && running && (
        <g>
          <path
            d={
              direction === "right"
                ? `M ${shellX + 25} ${shellCenterY + 13}
                   L ${shellX + shellWidth - 35} ${shellCenterY + 13}`
                : `M ${shellX + shellWidth - 25} ${shellCenterY + 13}
                   L ${shellX + 35} ${shellCenterY + 13}`
            }
            fill="none"
            stroke={materialColor}
            strokeWidth={5}
            strokeDasharray="12 8"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to={direction === "right" ? "-40" : "40"}
              dur="0.8s"
              repeatCount="indefinite"
            />
          </path>

          <circle
            cx={
              direction === "right"
                ? shellX + shellWidth * 0.3
                : shellX + shellWidth * 0.7
            }
            cy={shellCenterY + 13}
            r={4}
            fill="#ffe066"
          >
            <animate
              attributeName="cx"
              values={
                direction === "right"
                  ? `${shellX + shellWidth * 0.25};
                     ${shellX + shellWidth * 0.7}`
                  : `${shellX + shellWidth * 0.7};
                     ${shellX + shellWidth * 0.25}`
              }
              dur="1.8s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      )}

      {/* =====================================================
          GAS FLOW
          ===================================================== */}

      {gasFlowActive && running && (
        <path
          d={
            direction === "right"
              ? `M ${shellX + shellWidth - 25} ${shellCenterY - 14}
                 L ${shellX + 30} ${shellCenterY - 14}`
              : `M ${shellX + 25} ${shellCenterY - 14}
                 L ${shellX + shellWidth - 30} ${shellCenterY - 14}`
          }
          fill="none"
          stroke={flowColor}
          strokeWidth={3}
          strokeDasharray="10 7"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to={direction === "right" ? "34" : "-34"}
            dur={animationDuration}
            repeatCount="indefinite"
          />
        </path>
      )}

      {/* =====================================================
          MATERIAL INLET
          ===================================================== */}

      <line
        x1={direction === "right" ? shellX : shellX + shellWidth}
        y1={shellCenterY}
        x2={inletX}
        y2={shellCenterY}
        stroke="#d8dee9"
        strokeWidth={6}
      />

      <polygon
        points={
          direction === "right"
            ? `${inletX + 8},${shellCenterY - 6}
               ${inletX},${shellCenterY}
               ${inletX + 8},${shellCenterY + 6}`
            : `${inletX - 8},${shellCenterY - 6}
               ${inletX},${shellCenterY}
               ${inletX - 8},${shellCenterY + 6}`
        }
        fill="#f4c542"
      />

      {/* =====================================================
          BURNER
          ===================================================== */}

      <g>
        <rect
          x={burnerX - (direction === "right" ? 0 : 42)}
          y={shellCenterY - 13}
          width={42}
          height={26}
          rx={5}
          fill="#1f2937"
          stroke={fault ? "#dc3545" : "#64748b"}
          strokeWidth={2}
        />

        <rect
          x={direction === "right" ? burnerX : burnerX - 10}
          y={shellCenterY - 5}
          width={direction === "right" ? 30 : 10}
          height={10}
          fill="#475569"
        />

        {/* Flame */}

        {flame && running && (
          <g
            transform={`translate(${burnerX + burnerDirection * 30}, ${shellCenterY})`}
          >
            <path
              d={
                direction === "right"
                  ? "M0 0 C10 -18 22 -12 25 0 C22 12 10 18 0 0Z"
                  : "M0 0 C-10 -18 -22 -12 -25 0 C-22 12 -10 18 0 0Z"
              }
              fill="#ff9500"
            >
              <animate
                attributeName="opacity"
                values="0.45;1;0.55;1;0.45"
                dur="0.8s"
                repeatCount="indefinite"
              />
            </path>

            <path
              d={
                direction === "right"
                  ? "M2 0 C10 -9 16 -7 18 0 C15 7 9 9 2 0Z"
                  : "M-2 0 C-10 -9 -16 -7 -18 0 C-15 7 -9 9 -2 0Z"
              }
              fill="#ffe066"
            />
          </g>
        )}
      </g>

      {/* =====================================================
          DISCHARGE
          ===================================================== */}

      <line
        x1={direction === "right" ? shellX + shellWidth : shellX}
        y1={shellCenterY}
        x2={outletX}
        y2={shellCenterY}
        stroke="#d8dee9"
        strokeWidth={7}
      />

      <polygon
        points={
          direction === "right"
            ? `${outletX - 10},${shellCenterY - 7}
               ${outletX},${shellCenterY}
               ${outletX - 10},${shellCenterY + 7}`
            : `${outletX + 10},${shellCenterY - 7}
               ${outletX},${shellCenterY}
               ${outletX + 10},${shellCenterY + 7}`
        }
        fill="#f4c542"
      />

      {/* =====================================================
          DRIVE MOTOR
          ===================================================== */}

      <g
        transform={`translate(
          ${shellX + shellWidth * 0.44},
          ${shellY + shellHeight + 42}
        )`}
      >
        <rect
          x={-28}
          y={-13}
          width={56}
          height={26}
          rx={5}
          fill="#111c2d"
          stroke={bodyColor}
          strokeWidth={2}
        />

        <circle
          cx={0}
          cy={0}
          r={9}
          fill="none"
          stroke={bodyColor}
          strokeWidth={3}
        />

        {running && (
          <line x1={0} y1={-7} x2={0} y2={7} stroke={bodyColor} strokeWidth={2}>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0"
              to="360"
              dur="0.7s"
              repeatCount="indefinite"
            />
          </line>
        )}

        <text x={0} y={27} textAnchor="middle" fill="#64748b" fontSize={8}>
          DRIVE
        </text>
      </g>

      {/* =====================================================
          TEMPERATURE
          ===================================================== */}

      <text
        x={shellX + shellWidth * 0.42}
        y={shellY - 8}
        textAnchor="middle"
        fill={tempColor}
        fontSize={valueSize}
        fontWeight="700"
      >
        TEMP {safeTemperature.toFixed(0)} {temperatureUnit}
      </text>

      {/* =====================================================
          PRESSURE
          ===================================================== */}

      <text
        x={shellX + shellWidth * 0.78}
        y={shellY - 8}
        textAnchor="middle"
        fill="#aab4c3"
        fontSize={valueSize}
      >
        P {safePressure.toFixed(1)} Pa
      </text>

      {/* =====================================================
          MATERIAL FLOW
          ===================================================== */}

      <text
        x={shellX + shellWidth * 0.4}
        y={shellY + shellHeight + 65}
        textAnchor="middle"
        fill={materialColor}
        fontSize={valueSize}
        fontWeight="700"
      >
        MATERIAL {safeMaterialFlow.toFixed(1)} {materialFlowUnit}
      </text>

      {/* =====================================================
          RPM
          ===================================================== */}

      {isdetail && (
        <text
          x={shellX + shellWidth * 0.73}
          y={shellY + shellHeight + 65}
          textAnchor="middle"
          fill="#aab4c3"
          fontSize={valueSize}
        >
          RPM {safeRpm.toFixed(2)}
        </text>
      )}

      {/* =====================================================
          CURRENT
          ===================================================== */}

      {isdetail && (
        <text
          x={shellX + shellWidth * 0.73}
          y={shellY + shellHeight + 80}
          textAnchor="middle"
          fill="#aab4c3"
          fontSize={valueSize}
        >
          I {safeCurrent.toFixed(1)} A
        </text>
      )}

      {/* =====================================================
          STATUS INDICATOR
          ===================================================== */}

      <circle cx={width - 18} cy={18} r={6} fill={bodyColor}>
        {running && !fault && (
          <animate
            attributeName="opacity"
            values="1;0.35;1"
            dur="1.2s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      {/* =====================================================
          ALARM BORDER
          ===================================================== */}

      {fault && (
        <rect
          x={shellX - 5}
          y={shellY - 5}
          width={shellWidth + 10}
          height={shellHeight + 10}
          rx={(shellHeight + 10) / 2}
          fill="none"
          stroke="#dc3545"
          strokeWidth={2}
          strokeDasharray="8 5"
        >
          <animate
            attributeName="opacity"
            values="1;0.25;1"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </rect>
      )}

      {/* =====================================================
          TAG
          ===================================================== */}

      <text
        x={width / 2}
        y={height - 18}
        textAnchor="middle"
        fill="#00bfff"
        fontSize={tagSize}
        fontWeight="700"
      >
        {tag}
      </text>

      {/* =====================================================
          STATUS
          ===================================================== */}

      <text
        x={width / 2}
        y={height - 4}
        textAnchor="middle"
        fill={bodyColor}
        fontSize={statusSize}
        fontWeight="700"
      >
        {statusText}
      </text>

      {/* =====================================================
          COMMAND AREA
          ===================================================== */}

      {sendCommand && (
        <rect
          x={shellX}
          y={shellY}
          width={shellWidth}
          height={shellHeight}
          rx={shellHeight / 2}
          fill="transparent"
          style={{ cursor: "pointer" }}
          onClick={handleCommand}
        />
      )}
    </g>
  );
};

export default RotaryKiln;
