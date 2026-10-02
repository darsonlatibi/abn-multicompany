import React from "react";

interface OutletProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;

  tag?: string;
  title?: string;

  temperature?: number;
  pressure?: number;
  flow?: number;

  materialFlow?: boolean;
  gasFlow?: boolean;

  running?: boolean;
  alarm?: boolean;

  damperOpen?: boolean;
  fanRunning?: boolean;

  temperatureUnit?: string;
  pressureUnit?: string;
  flowUnit?: string;

  fontFamily?: string;
  tagSize?: number;
  statusSize?: number;
  valueSize?: number;

  isdetail?: boolean;

  sendCommand?: (command: string, value?: unknown) => void;
}

const Outlet: React.FC<OutletProps> = ({
  x = 0,
  y = 0,
  width = 360,
  height = 260,

  tag = "OUT-101",
  title = "RAW MEAL OUTLET",

  temperature = 82,
  pressure = -6200,
  flow = 125,

  materialFlow = true,
  gasFlow = true,

  running = true,
  alarm = false,

  damperOpen,
  fanRunning,

  temperatureUnit = "°C",
  pressureUnit = "Pa",
  flowUnit = "t/h",

  fontFamily = "Arial",
  tagSize = 12,
  statusSize = 11,
  valueSize = 10,

  isdetail = true,

  sendCommand,
}) => {
  const safeDamperOpen = damperOpen ?? running;
  const safeFanRunning = fanRunning ?? running;

  const statusColor = alarm ? "#dc3545" : running ? "#28a745" : "#6c757d";

  const temperatureColor =
    temperature >= 120
      ? "#ff3b30"
      : temperature >= 105
        ? "#ff9500"
        : temperature >= 80
          ? "#00bfff"
          : "#94a3b8";

  const materialColor = materialFlow ? "#f4c542" : "#64748b";
  const gasColor = gasFlow ? "#00ffff" : "#64748b";

  const centerX = width / 2;
  const centerY = height / 2;

  const chamberX = 48;
  const chamberY = 58;
  const chamberWidth = width * 0.34;
  const chamberHeight = 105;

  const outletX = chamberX + chamberWidth;
  const pipeY = centerY + 5;

  const handleCommand = () => {
    if (!sendCommand) return;

    sendCommand(running ? "STOP" : "START", {
      tag,
      component: "OUTLET",
    });
  };

  return (
    <g
      transform={`translate(${x},${y})`}
      style={{
        cursor: sendCommand ? "pointer" : "default",
      }}
      onClick={handleCommand}
    >
      {/* =====================================================
          TITLE
          ===================================================== */}
      <text
        x={width / 2}
        y={25}
        textAnchor="middle"
        fill="#d8dee9"
        fontSize={tagSize + 1}
        fontFamily={fontFamily}
        fontWeight="700"
        letterSpacing="1"
      >
        {title}
      </text>

      {/* =====================================================
          ALARM BORDER
          ===================================================== */}
      <rect
        x={chamberX - 10}
        y={chamberY - 10}
        width={width - chamberX * 2 + 20}
        height={chamberHeight + 20}
        rx={15}
        fill="none"
        stroke={statusColor}
        strokeWidth={alarm ? 3 : 1.5}
        opacity={alarm ? 1 : 0.55}
      >
        {alarm && (
          <animate
            attributeName="opacity"
            values="1;0.25;1"
            dur="1s"
            repeatCount="indefinite"
          />
        )}
      </rect>

      {/* =====================================================
          OUTLET CHAMBER
          ===================================================== */}
      <rect
        x={chamberX}
        y={chamberY}
        width={chamberWidth}
        height={chamberHeight}
        rx={12}
        fill="#0b1220"
        stroke={statusColor}
        strokeWidth={2}
      />

      <rect
        x={chamberX + 12}
        y={chamberY + 12}
        width={chamberWidth - 24}
        height={chamberHeight - 24}
        rx={8}
        fill="#111c2d"
        stroke="#1f3b57"
        strokeWidth={1}
      />

      {/* =====================================================
          INTERNAL MATERIAL FLOW
          ===================================================== */}
      <path
        d={`
          M ${chamberX + 24} ${centerY}
          H ${outletX - 18}
        `}
        fill="none"
        stroke={materialColor}
        strokeWidth={12}
        strokeLinecap="round"
        strokeDasharray={materialFlow ? "10 8" : "0"}
        opacity={materialFlow ? 0.9 : 0.3}
      >
        {materialFlow && (
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-36"
            dur="0.7s"
            repeatCount="indefinite"
          />
        )}
      </path>

      {/* =====================================================
          PRODUCT OUTLET PIPE
          ===================================================== */}
      <rect
        x={outletX - 2}
        y={pipeY - 24}
        width={width - outletX - 35}
        height={48}
        rx={10}
        fill="#111c2d"
        stroke={statusColor}
        strokeWidth={2}
      />

      {/* =====================================================
          MATERIAL FLOW IN PIPE
          ===================================================== */}
      <path
        d={`
          M ${outletX + 10} ${pipeY}
          H ${width - 24}
        `}
        fill="none"
        stroke={materialColor}
        strokeWidth={8}
        strokeLinecap="round"
        strokeDasharray={materialFlow ? "9 7" : "0"}
      >
        {materialFlow && (
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-32"
            dur="0.65s"
            repeatCount="indefinite"
          />
        )}
      </path>

      {/* =====================================================
          OUTLET ARROW
          ===================================================== */}
      <polygon
        points={`
          ${width - 30},${pipeY - 10}
          ${width - 10},${pipeY}
          ${width - 30},${pipeY + 10}
        `}
        fill={materialColor}
      />

      {/* =====================================================
          DAMPER
          ===================================================== */}
      <g transform={`translate(${outletX + 20},${pipeY})`}>
        <rect
          x="-12"
          y="-34"
          width="24"
          height="68"
          rx="5"
          fill="#0b1220"
          stroke={safeDamperOpen ? "#28a745" : "#6c757d"}
          strokeWidth={2}
        />

        <line
          x1="-8"
          y1={safeDamperOpen ? -24 : 24}
          x2="8"
          y2={safeDamperOpen ? 24 : -24}
          stroke={safeDamperOpen ? "#f4c542" : "#64748b"}
          strokeWidth={5}
          strokeLinecap="round"
        />

        <circle
          cx="0"
          cy="0"
          r="5"
          fill={safeDamperOpen ? "#28a745" : "#6c757d"}
        />
      </g>

      {/* =====================================================
          GAS FLOW
          ===================================================== */}
      <path
        d={`
          M ${chamberX + chamberWidth * 0.45} ${chamberY - 34}
          V ${chamberY + 5}
        `}
        fill="none"
        stroke={gasColor}
        strokeWidth={4}
        strokeLinecap="round"
        strokeDasharray={gasFlow ? "7 6" : "0"}
      >
        {gasFlow && (
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="26"
            dur="0.8s"
            repeatCount="indefinite"
          />
        )}
      </path>

      {/* =====================================================
          GAS ARROW
          ===================================================== */}
      {gasFlow && (
        <polygon
          points={`
            ${chamberX + chamberWidth * 0.45 - 7},${chamberY + 2}
            ${chamberX + chamberWidth * 0.45 + 7},${chamberY + 2}
            ${chamberX + chamberWidth * 0.45},${chamberY + 14}
          `}
          fill={gasColor}
        />
      )}

      <text
        x={chamberX + chamberWidth * 0.45}
        y={chamberY - 42}
        textAnchor="middle"
        fill="#00ffff"
        fontSize={valueSize}
        fontFamily={fontFamily}
      >
        GAS
      </text>

      {/* =====================================================
          FAN INDICATOR
          ===================================================== */}
      <g
        transform={`translate(${chamberX + chamberWidth / 2},${chamberY + 35})`}
      >
        <circle
          cx="0"
          cy="0"
          r="17"
          fill="#0b1220"
          stroke={safeFanRunning ? "#00bfff" : "#64748b"}
          strokeWidth={2}
        />

        <g>
          <path
            d="M 0 -4 C 12 -16 16 -5 5 2 C 3 4 1 1 0 -4"
            fill={safeFanRunning ? "#00bfff" : "#64748b"}
          />

          <path
            d="M 4 0 C 16 12 5 16 -2 5 C -4 3 -1 1 4 0"
            fill={safeFanRunning ? "#00bfff" : "#64748b"}
          />

          <path
            d="M -4 0 C -16 -12 -5 -16 2 -5 C 4 -3 1 -1 -4 0"
            fill={safeFanRunning ? "#00bfff" : "#64748b"}
          />

          <circle cx="0" cy="0" r="4" fill="#0b1220" />

          {safeFanRunning && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0"
              to="360"
              dur="1s"
              repeatCount="indefinite"
            />
          )}
        </g>
      </g>

      {/* =====================================================
          FLOW LABEL
          ===================================================== */}
      <text
        x={outletX + (width - outletX) / 2}
        y={pipeY - 35}
        textAnchor="middle"
        fill="#f4c542"
        fontSize={valueSize}
        fontFamily={fontFamily}
        fontWeight="700"
      >
        RAW MEAL
      </text>

      {/* =====================================================
          DETAIL PANEL
          ===================================================== */}
      {isdetail && (
        <g>
          <rect
            x={chamberX}
            y={height - 74}
            width={width - chamberX * 2}
            height={52}
            rx={8}
            fill="#0b1220"
            stroke="#1f3b57"
            strokeWidth={1}
          />

          {/* Temperature */}
          <text
            x={chamberX + 15}
            y={height - 51}
            fill="#94a3b8"
            fontSize={valueSize - 1}
            fontFamily={fontFamily}
          >
            TEMP
          </text>

          <text
            x={chamberX + 15}
            y={height - 32}
            fill={temperatureColor}
            fontSize={valueSize}
            fontFamily={fontFamily}
            fontWeight="700"
          >
            {temperature}
            {temperatureUnit}
          </text>

          {/* Pressure */}
          <text
            x={centerX}
            y={height - 51}
            textAnchor="middle"
            fill="#94a3b8"
            fontSize={valueSize - 1}
            fontFamily={fontFamily}
          >
            PRESS
          </text>

          <text
            x={centerX}
            y={height - 32}
            textAnchor="middle"
            fill="#aab4c3"
            fontSize={valueSize}
            fontFamily={fontFamily}
            fontWeight="700"
          >
            {pressure}
            {pressureUnit}
          </text>

          {/* Flow */}
          <text
            x={width - chamberX - 15}
            y={height - 51}
            textAnchor="end"
            fill="#94a3b8"
            fontSize={valueSize - 1}
            fontFamily={fontFamily}
          >
            FLOW
          </text>

          <text
            x={width - chamberX - 15}
            y={height - 32}
            textAnchor="end"
            fill={materialColor}
            fontSize={valueSize}
            fontFamily={fontFamily}
            fontWeight="700"
          >
            {flow} {flowUnit}
          </text>
        </g>
      )}

      {/* =====================================================
          DAMPER STATUS
          ===================================================== */}
      {isdetail && (
        <text
          x={outletX + 20}
          y={pipeY + 48}
          textAnchor="middle"
          fill={safeDamperOpen ? "#28a745" : "#6c757d"}
          fontSize={valueSize - 1}
          fontFamily={fontFamily}
          fontWeight="700"
        >
          {safeDamperOpen ? "OPEN" : "CLOSED"}
        </text>
      )}

      {/* =====================================================
          STATUS INDICATOR
          ===================================================== */}
      <circle cx={chamberX + 8} cy={height - 9} r={6} fill={statusColor}>
        {running && !alarm && (
          <animate
            attributeName="opacity"
            values="1;0.35;1"
            dur="1.2s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      {/* =====================================================
          TAG
          ===================================================== */}
      <text
        x={chamberX + 23}
        y={height - 5}
        fill="#d8dee9"
        fontSize={tagSize}
        fontFamily={fontFamily}
        fontWeight="700"
      >
        {tag}
      </text>

      {/* =====================================================
          STATUS
          ===================================================== */}
      <text
        x={width - 10}
        y={height - 5}
        textAnchor="end"
        fill={statusColor}
        fontSize={statusSize}
        fontFamily={fontFamily}
        fontWeight="700"
      >
        {alarm ? "ALARM" : running ? "RUNNING" : "STOPPED"}
      </text>
    </g>
  );
};

export default Outlet;
