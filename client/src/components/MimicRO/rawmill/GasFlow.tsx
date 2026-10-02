import React from "react";

interface GasFlowProps {
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

  direction?: "left" | "right" | "up" | "down";
  reverse?: boolean;

  pipeWidth?: number;
  flowWidth?: number;
  arrowSize?: number;

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

const GasFlow: React.FC<GasFlowProps> = ({
  x = 0,
  y = 0,
  width = 360,
  height = 110,

  tag = "GF-101",
  title = "HOT GAS FLOW",

  temperature = 280,
  pressure = -6500,
  flow = 125000,

  gasFlow = true,

  running = true,
  alarm = false,

  fanRunning,
  damperOpen,

  direction = "right",
  reverse = false,

  pipeWidth = 18,
  flowWidth = 5,
  arrowSize = 12,

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

  const statusColor = alarm ? "#dc3545" : running ? "#28a745" : "#6c757d";

  const activeGasColor = alarm
    ? "#dc3545"
    : gasFlow && running
      ? "#00ffff"
      : "#64748b";

  const temperatureColor =
    temperature >= 400
      ? "#ff3b30"
      : temperature >= 300
        ? "#ff9500"
        : temperature >= 150
          ? "#00ffff"
          : "#94a3b8";

  const centerX = width / 2;
  const centerY = height / 2;

  const isHorizontal = direction === "left" || direction === "right";

  const pipeStart = 28;
  const pipeEnd = isHorizontal ? width - 28 : height - 28;

  const startX =
    direction === "right"
      ? pipeStart
      : direction === "left"
        ? pipeEnd
        : centerX;

  const startY =
    direction === "down" ? 25 : direction === "up" ? pipeEnd : centerY;

  const endX =
    direction === "right"
      ? pipeEnd
      : direction === "left"
        ? pipeStart
        : centerX;

  const endY =
    direction === "down" ? pipeEnd : direction === "up" ? pipeStart : centerY;

  const flowFrom = reverse ? 36 : 0;
  const flowTo = reverse ? 0 : -36;

  const handleCommand = () => {
    if (!sendCommand) return;

    sendCommand(running ? "STOP" : "START", {
      tag,
      component: "GAS_FLOW",
    });
  };

  const arrowPoints = (() => {
    switch (direction) {
      case "right":
        return `
          ${endX - arrowSize},${endY - arrowSize * 0.65}
          ${endX + arrowSize * 0.2},${endY}
          ${endX - arrowSize},${endY + arrowSize * 0.65}
        `;

      case "left":
        return `
          ${endX + arrowSize},${endY - arrowSize * 0.65}
          ${endX - arrowSize * 0.2},${endY}
          ${endX + arrowSize},${endY + arrowSize * 0.65}
        `;

      case "down":
        return `
          ${endX - arrowSize * 0.65},${endY - arrowSize}
          ${endX},${endY + arrowSize * 0.2}
          ${endX + arrowSize * 0.65},${endY - arrowSize}
        `;

      case "up":
        return `
          ${endX - arrowSize * 0.65},${endY + arrowSize}
          ${endX},${endY - arrowSize * 0.2}
          ${endX + arrowSize * 0.65},${endY + arrowSize}
        `;

      default:
        return "";
    }
  })();

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
      {title && (
        <text
          x={centerX}
          y={15}
          textAnchor="middle"
          fill="#d8dee9"
          fontSize={tagSize}
          fontFamily={fontFamily}
          fontWeight="700"
          letterSpacing="0.8"
        >
          {title}
        </text>
      )}

      {/* =====================================================
          OUTER PIPE
          ===================================================== */}
      <line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke="#0b1220"
        strokeWidth={pipeWidth + 6}
        strokeLinecap="round"
      />

      {/* =====================================================
          MAIN PIPE
          ===================================================== */}
      <line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke="#1f3b57"
        strokeWidth={pipeWidth}
        strokeLinecap="round"
      />

      {/* =====================================================
          INNER GAS FLOW
          ===================================================== */}
      <line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke={activeGasColor}
        strokeWidth={flowWidth}
        strokeLinecap="round"
        strokeDasharray={gasFlow && running ? "9 8" : "0"}
      >
        {gasFlow && running && (
          <animate
            attributeName="stroke-dashoffset"
            from={flowFrom}
            to={flowTo}
            dur="0.65s"
            repeatCount="indefinite"
          />
        )}
      </line>

      {/* =====================================================
          GAS GLOW CORE
          ===================================================== */}
      {gasFlow && running && (
        <line
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          stroke="#00bfff"
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray="4 10"
          opacity={0.8}
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-28"
            dur="0.45s"
            repeatCount="indefinite"
          />
        </line>
      )}

      {/* =====================================================
          FLOW ARROW
          ===================================================== */}
      <polygon
        points={arrowPoints}
        fill={activeGasColor}
        opacity={gasFlow && running ? 1 : 0.4}
      />

      {/* =====================================================
          GAS PARTICLES
          ===================================================== */}
      {gasFlow && running && (
        <g fill="#00ffff">
          {isHorizontal ? (
            <>
              <circle r="2.5">
                <animate
                  attributeName="cx"
                  from={reverse ? endX : startX}
                  to={reverse ? startX : endX}
                  dur="1.1s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="cy"
                  values={`${centerY - 3};${centerY + 3};${centerY - 3}`}
                  dur="0.35s"
                  repeatCount="indefinite"
                />
              </circle>

              <circle r="2">
                <animate
                  attributeName="cx"
                  from={reverse ? endX + 45 : startX - 45}
                  to={reverse ? startX - 45 : endX + 45}
                  dur="1.1s"
                  begin="0.35s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="cy"
                  values={`${centerY + 3};${centerY - 2};${centerY + 3}`}
                  dur="0.4s"
                  repeatCount="indefinite"
                />
              </circle>

              <circle r="1.8">
                <animate
                  attributeName="cx"
                  from={reverse ? endX + 90 : startX - 90}
                  to={reverse ? startX - 90 : endX + 90}
                  dur="1.1s"
                  begin="0.7s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="cy"
                  values={`${centerY - 2};${centerY + 3};${centerY - 2}`}
                  dur="0.45s"
                  repeatCount="indefinite"
                />
              </circle>
            </>
          ) : (
            <>
              <circle r="2.5">
                <animate
                  attributeName="cy"
                  from={reverse ? endY : startY}
                  to={reverse ? startY : endY}
                  dur="1.1s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="cx"
                  values={`${centerX - 3};${centerX + 3};${centerX - 3}`}
                  dur="0.35s"
                  repeatCount="indefinite"
                />
              </circle>

              <circle r="2">
                <animate
                  attributeName="cy"
                  from={reverse ? endY + 45 : startY - 45}
                  to={reverse ? startY - 45 : endY + 45}
                  dur="1.1s"
                  begin="0.35s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="cx"
                  values={`${centerX + 3};${centerX - 2};${centerX + 3}`}
                  dur="0.4s"
                  repeatCount="indefinite"
                />
              </circle>

              <circle r="1.8">
                <animate
                  attributeName="cy"
                  from={reverse ? endY + 90 : startY - 90}
                  to={reverse ? startY - 90 : endY + 90}
                  dur="1.1s"
                  begin="0.7s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="cx"
                  values={`${centerX - 2};${centerX + 3};${centerX - 2}`}
                  dur="0.45s"
                  repeatCount="indefinite"
                />
              </circle>
            </>
          )}
        </g>
      )}

      {/* =====================================================
          FAN INDICATOR
          ===================================================== */}
      {isdetail && (
        <g
          transform={
            isHorizontal
              ? `translate(${centerX},${centerY - 29})`
              : `translate(${centerX + 30},${centerY})`
          }
        >
          <circle
            cx="0"
            cy="0"
            r="12"
            fill="#0b1220"
            stroke={safeFanRunning ? "#00bfff" : "#64748b"}
            strokeWidth={1.5}
          />

          <g>
            <path
              d="M 0 -3 C 8 -11 11 -4 4 2 C 2 4 1 1 0 -3"
              fill={safeFanRunning ? "#00bfff" : "#64748b"}
            />

            <path
              d="M 3 0 C 11 8 4 11 -2 4 C -4 2 -1 1 3 0"
              fill={safeFanRunning ? "#00bfff" : "#64748b"}
            />

            <path
              d="M -3 0 C -11 -8 -4 -11 2 -4 C 4 -2 1 -1 -3 0"
              fill={safeFanRunning ? "#00bfff" : "#64748b"}
            />

            <circle cx="0" cy="0" r="3" fill="#0b1220" />

            {safeFanRunning && (
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0"
                to="360"
                dur="0.9s"
                repeatCount="indefinite"
              />
            )}
          </g>
        </g>
      )}

      {/* =====================================================
          DAMPER
          ===================================================== */}
      {isdetail && (
        <g
          transform={
            isHorizontal
              ? `translate(${centerX},${centerY + 29})`
              : `translate(${centerX + 30},${centerY})`
          }
        >
          <rect
            x="-17"
            y="-7"
            width="34"
            height="14"
            rx="4"
            fill="#0b1220"
            stroke={safeDamperOpen ? "#28a745" : "#6c757d"}
            strokeWidth={1.5}
          />

          <line
            x1={safeDamperOpen ? "-12" : "-6"}
            y1="5"
            x2={safeDamperOpen ? "12" : "6"}
            y2="-5"
            stroke={safeDamperOpen ? "#f4c542" : "#64748b"}
            strokeWidth={3}
            strokeLinecap="round"
          />
        </g>
      )}

      {/* =====================================================
          DETAIL VALUE PANEL
          ===================================================== */}
      {isdetail && (
        <g>
          <rect
            x={centerX - 104}
            y={height - 38}
            width={208}
            height={27}
            rx={7}
            fill="#0b1220"
            stroke="#1f3b57"
            strokeWidth={1}
          />

          {/* Temperature */}
          <text
            x={centerX - 88}
            y={height - 20}
            fill={temperatureColor}
            fontSize={valueSize}
            fontFamily={fontFamily}
            fontWeight="700"
          >
            T:{temperature}
            {temperatureUnit}
          </text>

          {/* Pressure */}
          <text
            x={centerX}
            y={height - 20}
            textAnchor="middle"
            fill="#aab4c3"
            fontSize={valueSize}
            fontFamily={fontFamily}
            fontWeight="700"
          >
            P:{pressure}
            {pressureUnit}
          </text>

          {/* Flow */}
          <text
            x={centerX + 88}
            y={height - 20}
            textAnchor="end"
            fill={activeGasColor}
            fontSize={valueSize}
            fontFamily={fontFamily}
            fontWeight="700"
          >
            F:{flow} {flowUnit}
          </text>
        </g>
      )}

      {/* =====================================================
          GAS LABEL
          ===================================================== */}
      {isdetail && (
        <text
          x={centerX}
          y={centerY + 7}
          textAnchor="middle"
          fill="#00ffff"
          fontSize={valueSize}
          fontFamily={fontFamily}
          fontWeight="700"
          opacity={gasFlow ? 1 : 0.45}
        >
          HOT GAS
        </text>
      )}

      {/* =====================================================
          STATUS INDICATOR
          ===================================================== */}
      <circle cx={18} cy={height - 9} r={5} fill={statusColor}>
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
        x={30}
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
        {alarm ? "ALARM" : running ? "FLOW" : "STOPPED"}
      </text>
    </g>
  );
};

export default GasFlow;
