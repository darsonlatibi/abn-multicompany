import React from "react";

interface HotGasInletProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;

  tag?: string;
  title?: string;

  temperature?: number;
  pressure?: number;
  flow?: number;

  gasFlow?: boolean;
  running?: boolean;
  alarm?: boolean;

  fanRunning?: boolean;
  damperOpen?: boolean;

  direction?: "up" | "down" | "left" | "right";
  reverse?: boolean;

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

const HotGasInlet: React.FC<HotGasInletProps> = ({
  x = 0,
  y = 0,
  width = 320,
  height = 220,

  tag = "HG-101",
  title = "HOT GAS INLET",

  temperature = 285,
  pressure = -6500,
  flow = 125000,

  gasFlow = true,
  running = true,
  alarm = false,

  fanRunning,
  damperOpen,

  direction = "up",
  reverse = false,

  temperatureUnit = "°C",
  pressureUnit = "Pa",
  flowUnit = "Nm³/h",

  fontFamily = "Arial",
  tagSize = 12,
  statusSize = 11,
  valueSize = 10,

  isdetail = true,

  sendCommand,
}) => {
  const safeFanRunning = fanRunning ?? running;
  const safeDamperOpen = damperOpen ?? running;

  const actualDirection = reverse
    ? direction === "up"
      ? "down"
      : direction === "down"
        ? "up"
        : direction === "left"
          ? "right"
          : "left"
    : direction;

  const statusColor = alarm ? "#dc3545" : running ? "#28a745" : "#6c757d";

  const gasColor = alarm ? "#dc3545" : gasFlow ? "#00bfff" : "#475569";

  const temperatureColor =
    temperature >= 320
      ? "#dc3545"
      : temperature >= 300
        ? "#ff9500"
        : temperature >= 180
          ? "#00bfff"
          : "#94a3b8";

  const handleCommand = () => {
    if (!sendCommand) return;

    sendCommand(running ? "STOP" : "START", {
      tag,
      source: "HotGasInlet",
    });
  };

  const centerX = width / 2;
  const pipeX = centerX;

  return (
    <g transform={`translate(${x}, ${y})`} fontFamily={fontFamily}>
      {/* =========================================================
          PANEL
         ========================================================= */}

      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        rx={10}
        fill="#0b1220"
        stroke={alarm ? "#dc3545" : "#1f3b57"}
        strokeWidth={alarm ? 2 : 1.5}
      >
        {alarm && (
          <animate
            attributeName="stroke-opacity"
            values="1;0.2;1"
            dur="0.7s"
            repeatCount="indefinite"
          />
        )}
      </rect>

      {/* =========================================================
          HEADER
         ========================================================= */}

      <rect
        x={12}
        y={10}
        width={width - 24}
        height={31}
        rx={6}
        fill="#111c2d"
        stroke="#1f3b57"
      />

      <text x={24} y={30} fill="#00bfff" fontSize={tagSize} fontWeight="bold">
        {tag}
      </text>

      <text
        x={centerX}
        y={30}
        textAnchor="middle"
        fill="#d8dee9"
        fontSize={tagSize}
        fontWeight="bold"
      >
        {title}
      </text>

      <circle cx={width - 28} cy={25} r={6} fill={statusColor}>
        {running && !alarm && (
          <animate
            attributeName="r"
            values="5;7;5"
            dur="1.2s"
            repeatCount="indefinite"
          />
        )}

        {alarm && (
          <animate
            attributeName="opacity"
            values="1;0.2;1"
            dur="0.5s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      {/* =========================================================
          GAS PIPE
         ========================================================= */}

      <g>
        {/* Outer pipe */}

        <rect
          x={pipeX - 30}
          y={52}
          width={60}
          height={90}
          rx={8}
          fill="#111c2d"
          stroke="#1f3b57"
          strokeWidth={3}
        />

        {/* Inner hot gas */}

        <rect
          x={pipeX - 17}
          y={58}
          width={34}
          height={78}
          rx={8}
          fill="#07101c"
        />

        {gasFlow && (
          <>
            <line
              x1={pipeX}
              y1={actualDirection === "up" ? 130 : 64}
              x2={pipeX}
              y2={actualDirection === "up" ? 64 : 130}
              stroke={gasColor}
              strokeWidth={9}
              strokeLinecap="round"
              strokeDasharray="5 14"
            >
              <animate
                attributeName="stroke-dashoffset"
                values={actualDirection === "up" ? "0;38" : "0;-38"}
                dur="0.7s"
                repeatCount="indefinite"
              />
            </line>

            {/* Gas glow */}

            <line
              x1={pipeX}
              y1={actualDirection === "up" ? 130 : 64}
              x2={pipeX}
              y2={actualDirection === "up" ? 64 : 130}
              stroke="#00ffff"
              strokeWidth={3}
              strokeLinecap="round"
              opacity={0.85}
            >
              <animate
                attributeName="opacity"
                values="0.3;1;0.3"
                dur="0.9s"
                repeatCount="indefinite"
              />
            </line>
          </>
        )}

        {/* Direction arrow */}

        <path
          d={
            actualDirection === "up"
              ? `
                M ${pipeX - 9} 78
                L ${pipeX} 65
                L ${pipeX + 9} 78
              `
              : `
                M ${pipeX - 9} 117
                L ${pipeX} 130
                L ${pipeX + 9} 117
              `
          }
          fill="none"
          stroke={gasColor}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* =========================================================
          DAMPER
         ========================================================= */}

      <g transform={`translate(${pipeX}, 145)`}>
        <rect
          x={-30}
          y={-7}
          width={60}
          height={14}
          rx={4}
          fill="#0b1220"
          stroke="#1f3b57"
        />

        <line
          x1={-21}
          y1={safeDamperOpen ? 7 : -7}
          x2={21}
          y2={safeDamperOpen ? -7 : 7}
          stroke={safeDamperOpen ? "#28a745" : "#dc3545"}
          strokeWidth={4}
        />

        <circle
          cx={0}
          cy={0}
          r={5}
          fill={safeDamperOpen ? "#28a745" : "#dc3545"}
        />

        <text x={42} y={4} fill="#64748b" fontSize={8}>
          DAMPER
        </text>

        <text
          x={42}
          y={17}
          fill={safeDamperOpen ? "#28a745" : "#dc3545"}
          fontSize={8}
          fontWeight="bold"
        >
          {safeDamperOpen ? "OPEN" : "CLOSED"}
        </text>
      </g>

      {/* =========================================================
          FAN INDICATOR
         ========================================================= */}

      <g transform={`translate(48, 120)`}>
        <circle
          cx={0}
          cy={0}
          r={20}
          fill="#111c2d"
          stroke={safeFanRunning ? "#28a745" : "#475569"}
          strokeWidth={2}
        />

        <g>
          <path
            d="
              M 0 -5
              C 14 -18, 17 -4, 5 2
              C 12 7, 5 18, -2 6
              C -11 15, -17 4, -5 -2
              C -12 -8, -5 -18, 0 -5
            "
            fill={safeFanRunning ? "#00bfff" : "#475569"}
          >
            {safeFanRunning && !alarm && (
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 0 0"
                to="360 0 0"
                dur="1s"
                repeatCount="indefinite"
              />
            )}
          </path>
        </g>

        <circle cx={0} cy={0} r={4} fill="#d8dee9" />

        <text x={0} y={34} textAnchor="middle" fill="#64748b" fontSize={8}>
          FAN
        </text>

        <circle
          cx={0}
          cy={-31}
          r={4}
          fill={safeFanRunning ? "#28a745" : "#6c757d"}
        />
      </g>

      {/* =========================================================
          HOT GAS LABEL
         ========================================================= */}

      <text
        x={centerX}
        y={173}
        textAnchor="middle"
        fill={gasColor}
        fontSize={11}
        fontWeight="bold"
      >
        HOT GAS
      </text>

      <text x={centerX} y={188} textAnchor="middle" fill="#64748b" fontSize={8}>
        {actualDirection.toUpperCase()} FLOW
      </text>

      {/* =========================================================
          DETAIL PANEL
         ========================================================= */}

      {isdetail && (
        <g>
          <rect
            x={12}
            y={196}
            width={width - 24}
            height={height - 208}
            rx={6}
            fill="#111c2d"
            stroke="#1f3b57"
          />

          {/* Temperature */}

          <text x={24} y={height - 9} fill="#64748b" fontSize={valueSize}>
            T
          </text>

          <text
            x={39}
            y={height - 9}
            fill={temperatureColor}
            fontSize={valueSize + 1}
            fontWeight="bold"
          >
            {temperature}
            {temperatureUnit}
          </text>

          {/* Pressure */}

          <text x={105} y={height - 9} fill="#64748b" fontSize={valueSize}>
            P
          </text>

          <text
            x={120}
            y={height - 9}
            fill="#94a3b8"
            fontSize={valueSize + 1}
            fontWeight="bold"
          >
            {pressure.toLocaleString()}
            {pressureUnit}
          </text>

          {/* Flow */}

          <text x={205} y={height - 9} fill="#64748b" fontSize={valueSize}>
            F
          </text>

          <text
            x={220}
            y={height - 9}
            fill="#00bfff"
            fontSize={valueSize + 1}
            fontWeight="bold"
          >
            {flow.toLocaleString()}
            {flowUnit}
          </text>
        </g>
      )}

      {/* =========================================================
          STATUS
         ========================================================= */}

      <text
        x={14}
        y={height + 16}
        fill={statusColor}
        fontSize={statusSize}
        fontWeight="bold"
      >
        {alarm ? "● ALARM" : running ? "● RUNNING" : "● STOPPED"}
      </text>

      {/* =========================================================
          COMMAND
         ========================================================= */}

      {sendCommand && (
        <g
          onClick={handleCommand}
          style={{
            cursor: "pointer",
          }}
        >
          <rect
            x={width - 140}
            y={height + 2}
            width={126}
            height={24}
            rx={5}
            fill={running ? "#3b1820" : "#12351f"}
            stroke={running ? "#dc3545" : "#28a745"}
          />

          <text
            x={width - 77}
            y={height + 18}
            textAnchor="middle"
            fill={running ? "#ff6b6b" : "#5ee38b"}
            fontSize={9}
            fontWeight="bold"
          >
            {running ? "STOP HOT GAS" : "START HOT GAS"}
          </text>
        </g>
      )}
    </g>
  );
};

export default HotGasInlet;
