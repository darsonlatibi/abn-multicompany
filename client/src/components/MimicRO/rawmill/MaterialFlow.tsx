import React from "react";

interface MaterialFlowProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;

  tag?: string;
  title?: string;

  flow?: number;
  running?: boolean;
  alarm?: boolean;

  materialFlow?: boolean;

  direction?: "left" | "right" | "up" | "down";
  reverse?: boolean;

  pipeWidth?: number;
  flowWidth?: number;
  arrowSize?: number;

  flowUnit?: string;

  materialColor?: string;
  pipeColor?: string;
  inactiveColor?: string;
  alarmColor?: string;

  fontFamily?: string;
  tagSize?: number;
  statusSize?: number;
  valueSize?: number;

  isdetail?: boolean;

  sendCommand?: (command: string, value?: unknown) => void;
}

const MaterialFlow: React.FC<MaterialFlowProps> = ({
  x = 0,
  y = 0,
  width = 360,
  height = 100,

  tag = "MF-101",
  title = "MATERIAL FLOW",

  flow = 125,
  running = true,
  alarm = false,

  materialFlow = true,

  direction = "right",
  reverse = false,

  pipeWidth = 18,
  flowWidth = 7,
  arrowSize = 12,

  flowUnit = "t/h",

  materialColor = "#f4c542",
  pipeColor = "#1f3b57",
  inactiveColor = "#64748b",
  alarmColor = "#dc3545",

  fontFamily = "Arial",
  tagSize = 12,
  statusSize = 11,
  valueSize = 10,

  isdetail = true,

  sendCommand,
}) => {
  const statusColor = alarm ? alarmColor : running ? "#28a745" : inactiveColor;

  const activeColor = alarm
    ? alarmColor
    : materialFlow && running
      ? materialColor
      : inactiveColor;

  const centerX = width / 2;
  const centerY = height / 2;

  const pipeStart = 25;
  const pipeEnd =
    direction === "left" || direction === "right" ? width - 25 : height - 25;

  const handleCommand = () => {
    if (!sendCommand) return;

    sendCommand(running ? "STOP" : "START", {
      tag,
      component: "MATERIAL_FLOW",
    });
  };

  const isHorizontal = direction === "left" || direction === "right";

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

  const animationFrom = reverse ? 0 : 36;
  const animationTo = reverse ? 36 : 0;

  const arrowPoints = (() => {
    const size = arrowSize;

    switch (direction) {
      case "right":
        return `
          ${endX - size},${endY - size * 0.65}
          ${endX + size * 0.2},${endY}
          ${endX - size},${endY + size * 0.65}
        `;

      case "left":
        return `
          ${endX + size},${endY - size * 0.65}
          ${endX - size * 0.2},${endY}
          ${endX + size},${endY + size * 0.65}
        `;

      case "down":
        return `
          ${endX - size * 0.65},${endY - size}
          ${endX},${endY + size * 0.2}
          ${endX + size * 0.65},${endY - size}
        `;

      case "up":
        return `
          ${endX - size * 0.65},${endY + size}
          ${endX},${endY - size * 0.2}
          ${endX + size * 0.65},${endY + size}
        `;
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
          y={16}
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
          PIPE
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

      <line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke={pipeColor}
        strokeWidth={pipeWidth}
        strokeLinecap="round"
      />

      {/* =====================================================
          INNER MATERIAL FLOW
          ===================================================== */}
      <line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke={activeColor}
        strokeWidth={flowWidth}
        strokeLinecap="round"
        strokeDasharray={materialFlow && running ? "10 8" : "0"}
      >
        {materialFlow && running && (
          <animate
            attributeName="stroke-dashoffset"
            from={animationFrom}
            to={animationTo}
            dur="0.65s"
            repeatCount="indefinite"
          />
        )}
      </line>

      {/* =====================================================
          FLOW ARROW
          ===================================================== */}
      <polygon
        points={arrowPoints}
        fill={activeColor}
        opacity={materialFlow && running ? 1 : 0.45}
      />

      {/* =====================================================
          MATERIAL PARTICLES
          ===================================================== */}
      {materialFlow && running && (
        <g fill={materialColor}>
          {isHorizontal ? (
            <>
              <circle r="3">
                <animate
                  attributeName="cx"
                  from={reverse ? endX : startX}
                  to={reverse ? startX : endX}
                  dur="1.4s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="cy"
                  values={`${centerY - 2};${centerY + 2};${centerY - 2}`}
                  dur="0.45s"
                  repeatCount="indefinite"
                />
              </circle>

              <circle r="2.5">
                <animate
                  attributeName="cx"
                  from={reverse ? endX + 45 : startX - 45}
                  to={reverse ? startX - 45 : endX + 45}
                  dur="1.4s"
                  begin="0.45s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="cy"
                  values={`${centerY + 3};${centerY - 2};${centerY + 3}`}
                  dur="0.5s"
                  repeatCount="indefinite"
                />
              </circle>

              <circle r="2">
                <animate
                  attributeName="cx"
                  from={reverse ? endX + 90 : startX - 90}
                  to={reverse ? startX - 90 : endX + 90}
                  dur="1.4s"
                  begin="0.9s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="cy"
                  values={`${centerY - 3};${centerY + 2};${centerY - 3}`}
                  dur="0.55s"
                  repeatCount="indefinite"
                />
              </circle>
            </>
          ) : (
            <>
              <circle r="3">
                <animate
                  attributeName="cy"
                  from={reverse ? endY : startY}
                  to={reverse ? startY : endY}
                  dur="1.4s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="cx"
                  values={`${centerX - 2};${centerX + 2};${centerX - 2}`}
                  dur="0.45s"
                  repeatCount="indefinite"
                />
              </circle>

              <circle r="2.5">
                <animate
                  attributeName="cy"
                  from={reverse ? endY + 45 : startY - 45}
                  to={reverse ? startY - 45 : endY + 45}
                  dur="1.4s"
                  begin="0.45s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="cx"
                  values={`${centerX + 3};${centerX - 2};${centerX + 3}`}
                  dur="0.5s"
                  repeatCount="indefinite"
                />
              </circle>

              <circle r="2">
                <animate
                  attributeName="cy"
                  from={reverse ? endY + 90 : startY - 90}
                  to={reverse ? startY - 90 : endY + 90}
                  dur="1.4s"
                  begin="0.9s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="cx"
                  values={`${centerX - 3};${centerX + 2};${centerX - 3}`}
                  dur="0.55s"
                  repeatCount="indefinite"
                />
              </circle>
            </>
          )}
        </g>
      )}

      {/* =====================================================
          FLOW VALUE
          ===================================================== */}
      {isdetail && (
        <g>
          <rect
            x={centerX - 48}
            y={centerY - 39}
            width={96}
            height={30}
            rx={7}
            fill="#0b1220"
            stroke="#1f3b57"
            strokeWidth={1}
          />

          <text
            x={centerX}
            y={centerY - 19}
            textAnchor="middle"
            fill={activeColor}
            fontSize={valueSize + 1}
            fontFamily={fontFamily}
            fontWeight="700"
          >
            {flow} {flowUnit}
          </text>
        </g>
      )}

      {/* =====================================================
          STATUS
          ===================================================== */}
      {isdetail && (
        <g>
          <circle cx={centerX - 38} cy={height - 13} r={5} fill={statusColor}>
            {running && !alarm && (
              <animate
                attributeName="opacity"
                values="1;0.35;1"
                dur="1.2s"
                repeatCount="indefinite"
              />
            )}
          </circle>

          <text
            x={centerX - 27}
            y={height - 9}
            fill="#d8dee9"
            fontSize={tagSize}
            fontFamily={fontFamily}
            fontWeight="700"
          >
            {tag}
          </text>

          <text
            x={centerX + 55}
            y={height - 9}
            textAnchor="end"
            fill={statusColor}
            fontSize={statusSize}
            fontFamily={fontFamily}
            fontWeight="700"
          >
            {alarm ? "ALARM" : running ? "FLOW" : "STOPPED"}
          </text>
        </g>
      )}

      {/* =====================================================
          FLOW DIRECTION LABEL
          ===================================================== */}
      {isdetail && (
        <text
          x={centerX}
          y={height - 30}
          textAnchor="middle"
          fill="#94a3b8"
          fontSize={valueSize - 1}
          fontFamily={fontFamily}
        >
          {direction === "right"
            ? "→"
            : direction === "left"
              ? "←"
              : direction === "up"
                ? "↑"
                : "↓"}
        </text>
      )}
    </g>
  );
};

export default MaterialFlow;
