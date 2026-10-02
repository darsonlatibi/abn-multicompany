import React from "react";

interface GrindingMillProps {
  x?: number;
  y?: number;

  width?: number;
  height?: number;

  tag?: string;
  title?: string;

  temperature?: number;
  pressure?: number;

  materialFlow?: boolean;
  gasFlow?: boolean;
  rawMealFlow?: boolean;
  rejectFlow?: boolean;

  running?: boolean;
  alarm?: boolean;

  fanRunning?: boolean;
  separatorRunning?: boolean;

  temperatureUnit?: string;
  pressureUnit?: string;

  fontFamily?: string;

  tagSize?: number;
  statusSize?: number;
  valueSize?: number;

  isdetail?: boolean;

  sendCommand?: (command: string, value?: unknown) => void;
}

const GrindingMill: React.FC<GrindingMillProps> = ({
  x = 0,
  y = 0,

  width = 420,
  height = 520,

  tag = "RM-101",
  title = "RAW GRINDING MILL",

  temperature = 95,
  pressure = -6500,

  materialFlow = true,
  gasFlow = true,
  rawMealFlow = true,
  rejectFlow = true,

  running = true,
  alarm = false,

  fanRunning,
  separatorRunning,

  temperatureUnit = "°C",
  pressureUnit = "Pa",

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

  const safeFanRunning = fanRunning ?? running;
  const safeSeparatorRunning = separatorRunning ?? running;

  /* =========================================================
     STATUS
     ========================================================= */

  const statusColor = alarm ? "#dc3545" : running ? "#28a745" : "#6c757d";

  const temperatureColor =
    safeTemperature >= 120
      ? "#ff3b30"
      : safeTemperature >= 105
        ? "#ff9500"
        : safeTemperature >= 80
          ? "#00bfff"
          : "#94a3b8";

  /* =========================================================
     DIMENSIONS
     ========================================================= */

  const centerX = width / 2;

  const millWidth = width * 0.48;
  const millX = (width - millWidth) / 2;

  const millTop = 145;
  const millHeight = height * 0.47;
  const millBottom = millTop + millHeight;

  const bodyRadius = Math.min(24, millWidth * 0.08);

  const tableY = millTop + millHeight * 0.7;

  const separatorWidth = millWidth * 0.52;
  const separatorHeight = 72;

  const separatorX = centerX - separatorWidth / 2;
  const separatorY = millTop - 55;

  const rollerRadiusX = millWidth * 0.13;
  const rollerRadiusY = millHeight * 0.13;

  /* =========================================================
     COMMAND HANDLER
     ========================================================= */

  const handleCommand = () => {
    if (sendCommand) {
      sendCommand(running ? "STOP" : "START");
    }
  };

  /* =========================================================
     SVG
     ========================================================= */

  return (
    <g
      transform={`translate(${x},${y})`}
      onClick={handleCommand}
      style={{
        cursor: sendCommand ? "pointer" : "default",
      }}
    >
      {/* =====================================================
          TITLE
          ===================================================== */}

      <text
        x={centerX}
        y={16}
        textAnchor="middle"
        fill="#00bfff"
        fontSize={14}
        fontWeight="bold"
        fontFamily={fontFamily}
      >
        {title}
      </text>

      {/* =====================================================
          PROCESS FEED LABEL
          ===================================================== */}

      <text
        x={centerX}
        y={37}
        textAnchor="middle"
        fill="#94a3b8"
        fontSize={8}
        fontFamily={fontFamily}
      >
        RAW MATERIAL FEED
      </text>

      {/* =====================================================
          RAW MATERIAL INLET PIPE
          ===================================================== */}

      <line
        x1={centerX}
        y1={48}
        x2={centerX}
        y2={separatorY}
        stroke="#d8dee9"
        strokeWidth={10}
        strokeLinecap="round"
      />

      {/* =====================================================
          RAW MATERIAL FLOW
          ===================================================== */}

      {materialFlow && running && (
        <line
          x1={centerX}
          y1={52}
          x2={centerX}
          y2={separatorY + 5}
          stroke="#f4c542"
          strokeWidth={4}
          strokeDasharray="8 6"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="28"
            dur="0.65s"
            repeatCount="indefinite"
          />
        </line>
      )}

      {/* =====================================================
          SEPARATOR
          ===================================================== */}

      <g>
        {/* SEPARATOR OUTER */}

        <rect
          x={separatorX}
          y={separatorY}
          width={separatorWidth}
          height={separatorHeight}
          rx={14}
          fill="#0b1220"
          stroke={safeSeparatorRunning ? "#28a745" : "#64748b"}
          strokeWidth={3}
        />

        {/* SEPARATOR INNER */}

        <rect
          x={separatorX + 8}
          y={separatorY + 8}
          width={separatorWidth - 16}
          height={separatorHeight - 16}
          rx={9}
          fill="#111c2d"
          stroke="#1f3b57"
          strokeWidth={1}
        />

        {/* SEPARATOR ROTOR */}

        <g
          transform={`translate(${centerX},${separatorY + separatorHeight / 2})`}
        >
          <circle
            cx={0}
            cy={0}
            r={20}
            fill="#0b1220"
            stroke="#00bfff"
            strokeWidth={2}
          />

          <circle cx={0} cy={0} r={5} fill="#00bfff" />

          {safeSeparatorRunning && (
            <g>
              <line
                x1={-25}
                y1={0}
                x2={25}
                y2={0}
                stroke="#00bfff"
                strokeWidth={2}
              />

              <line
                x1={0}
                y1={-25}
                x2={0}
                y2={25}
                stroke="#00bfff"
                strokeWidth={2}
              />

              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0"
                to="360"
                dur="2s"
                repeatCount="indefinite"
              />
            </g>
          )}
        </g>

        {/* SEPARATOR LABEL */}

        <text
          x={centerX}
          y={separatorY + 15}
          textAnchor="middle"
          fill="#00bfff"
          fontSize={8}
          fontWeight="bold"
          fontFamily={fontFamily}
        >
          SEPARATOR
        </text>
      </g>

      {/* =====================================================
          MAIN MILL BODY
          ===================================================== */}

      <rect
        x={millX}
        y={millTop}
        width={millWidth}
        height={millHeight}
        rx={bodyRadius}
        fill="#0b1220"
        stroke={statusColor}
        strokeWidth={3}
      />

      {/* =====================================================
          INNER MILL BODY
          ===================================================== */}

      <rect
        x={millX + 8}
        y={millTop + 8}
        width={millWidth - 16}
        height={millHeight - 16}
        rx={bodyRadius - 5}
        fill="#111c2d"
        stroke="#1f3b57"
        strokeWidth={1}
      />

      {/* =====================================================
          MILL TOP DOME
          ===================================================== */}

      <ellipse
        cx={centerX}
        cy={millTop + 10}
        rx={millWidth * 0.32}
        ry={24}
        fill="#0b1220"
        stroke="#1f3b57"
        strokeWidth={2}
      />

      {/* =====================================================
          HOT GAS INLET
          ===================================================== */}

      <line
        x1={millX - 65}
        y1={millTop + millHeight * 0.68}
        x2={millX}
        y2={millTop + millHeight * 0.68}
        stroke="#d8dee9"
        strokeWidth={10}
        strokeLinecap="round"
      />

      <text
        x={millX - 8}
        y={millTop + millHeight * 0.68 - 14}
        textAnchor="end"
        fill="#00ffff"
        fontSize={8}
        fontWeight="bold"
        fontFamily={fontFamily}
      >
        HOT GAS
      </text>

      {/* =====================================================
          HOT GAS FLOW
          ===================================================== */}

      {gasFlow && safeFanRunning && (
        <line
          x1={millX - 58}
          y1={millTop + millHeight * 0.68}
          x2={millX - 5}
          y2={millTop + millHeight * 0.68}
          stroke="#00ffff"
          strokeWidth={4}
          strokeDasharray="8 6"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-28"
            dur="0.55s"
            repeatCount="indefinite"
          />
        </line>
      )}

      {/* =====================================================
          HOT GAS RISING
          ===================================================== */}

      {gasFlow && running && (
        <path
          d={`
            M ${millX + millWidth * 0.25} ${millBottom - 25}
            C ${millX + millWidth * 0.18} ${millBottom - 100},
              ${millX + millWidth * 0.18} ${millTop + 110},
              ${millX + millWidth * 0.32} ${millTop + 35}
          `}
          fill="none"
          stroke="#00ffff"
          strokeWidth={3}
          strokeDasharray="8 7"
          opacity={0.8}
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-35"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </path>
      )}

      {/* =====================================================
          GRINDING TABLE
          ===================================================== */}

      <g transform={`translate(${centerX},${tableY})`}>
        {/* TABLE OUTER */}

        <ellipse
          cx={0}
          cy={0}
          rx={millWidth * 0.31}
          ry={25}
          fill="#0b1220"
          stroke="#64748b"
          strokeWidth={3}
        />

        {/* TABLE INNER */}

        <ellipse
          cx={0}
          cy={-3}
          rx={millWidth * 0.25}
          ry={16}
          fill="#1a2638"
          stroke="#1f3b57"
          strokeWidth={2}
        />

        {/* TABLE MATERIAL */}

        {materialFlow && running && (
          <ellipse
            cx={0}
            cy={-3}
            rx={millWidth * 0.19}
            ry={10}
            fill="#f4c542"
            opacity={0.35}
          >
            <animate
              attributeName="opacity"
              values="0.20;0.45;0.20"
              dur="1.2s"
              repeatCount="indefinite"
            />
          </ellipse>
        )}

        {/* TABLE ROTATION */}

        {running && (
          <g>
            <line
              x1={-millWidth * 0.22}
              y1={0}
              x2={millWidth * 0.22}
              y2={0}
              stroke="#00bfff"
              strokeWidth={2}
              opacity={0.7}
            />

            <line
              x1={0}
              y1={-12}
              x2={0}
              y2={12}
              stroke="#00bfff"
              strokeWidth={2}
              opacity={0.7}
            />

            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0"
              to="360"
              dur="3s"
              repeatCount="indefinite"
            />
          </g>
        )}
      </g>

      {/* =====================================================
          GRINDING ROLLERS
          ===================================================== */}

      {/* LEFT ROLLER */}

      <g
        transform={`
          translate(
            ${centerX - millWidth * 0.25},
            ${tableY - 32}
          )
          rotate(-18)
        `}
      >
        <ellipse
          cx={0}
          cy={0}
          rx={rollerRadiusX}
          ry={rollerRadiusY}
          fill="#0b1220"
          stroke={running ? "#00bfff" : "#64748b"}
          strokeWidth={3}
        />

        <ellipse
          cx={0}
          cy={0}
          rx={rollerRadiusX - 6}
          ry={rollerRadiusY - 6}
          fill="#1a2638"
          stroke="#1f3b57"
          strokeWidth={1}
        />

        <line
          x1={-rollerRadiusX * 0.6}
          y1={0}
          x2={rollerRadiusX * 0.6}
          y2={0}
          stroke="#94a3b8"
          strokeWidth={2}
        />

        {running && (
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0"
            to="-360"
            dur="2.2s"
            repeatCount="indefinite"
          />
        )}
      </g>

      {/* RIGHT ROLLER */}

      <g
        transform={`
          translate(
            ${centerX + millWidth * 0.25},
            ${tableY - 32}
          )
          rotate(18)
        `}
      >
        <ellipse
          cx={0}
          cy={0}
          rx={rollerRadiusX}
          ry={rollerRadiusY}
          fill="#0b1220"
          stroke={running ? "#00bfff" : "#64748b"}
          strokeWidth={3}
        />

        <ellipse
          cx={0}
          cy={0}
          rx={rollerRadiusX - 6}
          ry={rollerRadiusY - 6}
          fill="#1a2638"
          stroke="#1f3b57"
          strokeWidth={1}
        />

        <line
          x1={-rollerRadiusX * 0.6}
          y1={0}
          x2={rollerRadiusX * 0.6}
          y2={0}
          stroke="#94a3b8"
          strokeWidth={2}
        />

        {running && (
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0"
            to="360"
            dur="2.2s"
            repeatCount="indefinite"
          />
        )}
      </g>

      {/* BOTTOM ROLLER */}

      <g
        transform={`
          translate(
            ${centerX},
            ${tableY + 28}
          )
        `}
      >
        <ellipse
          cx={0}
          cy={0}
          rx={rollerRadiusX * 0.85}
          ry={rollerRadiusY * 0.72}
          fill="#0b1220"
          stroke={running ? "#00bfff" : "#64748b"}
          strokeWidth={3}
        />

        <ellipse
          cx={0}
          cy={0}
          rx={rollerRadiusX * 0.65}
          ry={rollerRadiusY * 0.53}
          fill="#1a2638"
          stroke="#1f3b57"
          strokeWidth={1}
        />

        {running && (
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0"
            to="-360"
            dur="2.2s"
            repeatCount="indefinite"
          />
        )}
      </g>

      {/* =====================================================
          MATERIAL GRINDING FLOW
          ===================================================== */}

      {materialFlow && running && (
        <path
          d={`
            M ${centerX} ${separatorY + separatorHeight}
            L ${centerX} ${tableY - 45}
          `}
          fill="none"
          stroke="#f4c542"
          strokeWidth={4}
          strokeDasharray="8 6"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="28"
            dur="0.65s"
            repeatCount="indefinite"
          />
        </path>
      )}

      {/* =====================================================
          RAW MEAL RISING TO SEPARATOR
          ===================================================== */}

      {rawMealFlow && running && (
        <path
          d={`
            M ${centerX + millWidth * 0.2} ${tableY - 5}
            C ${centerX + millWidth * 0.34} ${tableY - 80},
              ${centerX + millWidth * 0.3} ${millTop + 90},
              ${centerX + millWidth * 0.12} ${separatorY + separatorHeight}
          `}
          fill="none"
          stroke="#f4c542"
          strokeWidth={3}
          strokeDasharray="7 5"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-30"
            dur="0.7s"
            repeatCount="indefinite"
          />
        </path>
      )}

      {/* =====================================================
          RAW MEAL OUTLET
          ===================================================== */}

      <line
        x1={separatorX + separatorWidth}
        y1={separatorY + separatorHeight / 2}
        x2={width - 15}
        y2={separatorY + separatorHeight / 2}
        stroke="#d8dee9"
        strokeWidth={9}
        strokeLinecap="round"
      />

      <text
        x={width - 15}
        y={separatorY + separatorHeight / 2 - 15}
        textAnchor="end"
        fill="#f4c542"
        fontSize={8}
        fontWeight="bold"
        fontFamily={fontFamily}
      >
        RAW MEAL
      </text>

      {/* RAW MEAL OUTLET FLOW */}

      {rawMealFlow && running && (
        <line
          x1={separatorX + separatorWidth + 5}
          y1={separatorY + separatorHeight / 2}
          x2={width - 20}
          y2={separatorY + separatorHeight / 2}
          stroke="#f4c542"
          strokeWidth={4}
          strokeDasharray="8 6"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-28"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </line>
      )}

      {/* =====================================================
          REJECT OUTLET
          ===================================================== */}

      <line
        x1={millX + millWidth * 0.25}
        y1={millBottom}
        x2={millX + millWidth * 0.25}
        y2={millBottom + 55}
        stroke="#d8dee9"
        strokeWidth={9}
        strokeLinecap="round"
      />

      <text
        x={millX + millWidth * 0.25 - 10}
        y={millBottom + 48}
        textAnchor="end"
        fill="#94a3b8"
        fontSize={8}
        fontWeight="bold"
        fontFamily={fontFamily}
      >
        REJECT
      </text>

      {/* REJECT FLOW */}

      {rejectFlow && running && (
        <line
          x1={millX + millWidth * 0.25}
          y1={millBottom + 5}
          x2={millX + millWidth * 0.25}
          y2={millBottom + 50}
          stroke="#f4c542"
          strokeWidth={3}
          strokeDasharray="7 5"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="24"
            dur="0.7s"
            repeatCount="indefinite"
          />
        </line>
      )}

      {/* =====================================================
          MILL MOTOR
          ===================================================== */}

      <g
        transform={`
          translate(
            ${millX + millWidth * 0.7},
            ${millBottom + 15}
          )
        `}
      >
        <rect
          x={0}
          y={0}
          width={65}
          height={38}
          rx={5}
          fill="#0b1220"
          stroke={running ? "#28a745" : "#64748b"}
          strokeWidth={2}
        />

        <circle
          cx={18}
          cy={19}
          r={10}
          fill="#111c2d"
          stroke={running ? "#28a745" : "#64748b"}
          strokeWidth={2}
        />

        {running && (
          <circle cx={18} cy={19} r={5} fill="#28a745">
            <animate
              attributeName="opacity"
              values="1;0.35;1"
              dur="0.8s"
              repeatCount="indefinite"
            />
          </circle>
        )}

        <text
          x={42}
          y={16}
          textAnchor="middle"
          fill="#94a3b8"
          fontSize={7}
          fontWeight="bold"
          fontFamily={fontFamily}
        >
          MILL
        </text>

        <text
          x={42}
          y={27}
          textAnchor="middle"
          fill={running ? "#28a745" : "#64748b"}
          fontSize={7}
          fontFamily={fontFamily}
        >
          MOTOR
        </text>
      </g>

      {/* =====================================================
          MILL INTERNAL PRESSURE / TEMPERATURE ZONE
          ===================================================== */}

      {running && (
        <rect
          x={millX + 12}
          y={millTop + 15}
          width={millWidth - 24}
          height={millHeight - 30}
          rx={18}
          fill={temperatureColor}
          opacity={0.025}
        >
          <animate
            attributeName="opacity"
            values="0.02;0.06;0.02"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </rect>
      )}

      {/* =====================================================
          MAIN TEMPERATURE
          ===================================================== */}

      {isdetail && (
        <text
          x={millX + 18}
          y={millTop + 28}
          fill={temperatureColor}
          fontSize={valueSize}
          fontWeight="bold"
          fontFamily={fontFamily}
        >
          TEMP {safeTemperature.toFixed(0)}
          {temperatureUnit}
        </text>
      )}

      {/* =====================================================
          MAIN PRESSURE
          ===================================================== */}

      {isdetail && (
        <text
          x={millX + millWidth - 18}
          y={millTop + 28}
          textAnchor="end"
          fill="#aab4c3"
          fontSize={valueSize}
          fontFamily={fontFamily}
        >
          {safePressure.toFixed(0)} {pressureUnit}
        </text>
      )}

      {/* =====================================================
          FAN STATUS
          ===================================================== */}

      {isdetail && (
        <text
          x={millX + 18}
          y={millBottom - 18}
          fill={safeFanRunning ? "#28a745" : "#64748b"}
          fontSize={Math.max(8, valueSize - 1)}
          fontWeight="bold"
          fontFamily={fontFamily}
        >
          FAN {safeFanRunning ? "RUN" : "STOP"}
        </text>
      )}

      {/* =====================================================
          SEPARATOR STATUS
          ===================================================== */}

      {isdetail && (
        <text
          x={millX + millWidth - 18}
          y={millBottom - 18}
          textAnchor="end"
          fill={safeSeparatorRunning ? "#28a745" : "#64748b"}
          fontSize={Math.max(8, valueSize - 1)}
          fontWeight="bold"
          fontFamily={fontFamily}
        >
          SEP {safeSeparatorRunning ? "RUN" : "STOP"}
        </text>
      )}

      {/* =====================================================
          STATUS INDICATOR
          ===================================================== */}

      <circle
        cx={millX + millWidth - 14}
        cy={millTop + 14}
        r={5}
        fill={statusColor}
      >
        {running && !alarm && (
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur="1.2s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      {/* =====================================================
          ALARM BORDER
          ===================================================== */}

      {alarm && (
        <rect
          x={millX - 7}
          y={millTop - 7}
          width={millWidth + 14}
          height={millHeight + 14}
          rx={bodyRadius + 4}
          fill="none"
          stroke="#dc3545"
          strokeWidth={3}
        >
          <animate
            attributeName="opacity"
            values="1;0.15;1"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </rect>
      )}

      {/* =====================================================
          TAG
          ===================================================== */}

      <text
        x={centerX}
        y={height + 12}
        textAnchor="middle"
        fill="#00ffff"
        fontWeight="bold"
        fontSize={tagSize}
        fontFamily={fontFamily}
      >
        {tag}
      </text>

      {/* =====================================================
          STATUS
          ===================================================== */}

      <text
        x={centerX}
        y={height + 28}
        textAnchor="middle"
        fill={statusColor}
        fontWeight="bold"
        fontSize={statusSize}
        fontFamily={fontFamily}
      >
        {alarm ? "ALARM" : running ? "RUNNING" : "STOP"}
      </text>
    </g>
  );
};

export default GrindingMill;

/*
<GrindingMill
  x={900}
  y={120}
  width={420}
  height={520}

  tag="RM-101"
  title="RAW GRINDING MILL"

  temperature={95}
  pressure={-6500}

  materialFlow={true}
  gasFlow={true}
  rawMealFlow={true}
  rejectFlow={true}

  running={true}
  alarm={false}

  fanRunning={true}
  separatorRunning={true}

  temperatureUnit="°C"
  pressureUnit="Pa"

  valueSize={10}
  isdetail={true}
/>
*/
