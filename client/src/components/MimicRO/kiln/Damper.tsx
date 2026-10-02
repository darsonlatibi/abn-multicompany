import React from "react";

type DamperDirection = "left" | "right";

interface DamperProps {
  x?: number;
  y?: number;

  width?: number;
  height?: number;

  tag?: string;

  open?: boolean;
  fault?: boolean;

  opening?: number;
  position?: number;

  direction?: DamperDirection;

  fontFamily?: string;

  tagSize?: number;
  statusSize?: number;
  valueSize?: number;

  isdetail?: boolean;

  sendCommand?: (command: string, value?: unknown) => void;
}

const Damper: React.FC<DamperProps> = ({
  x = 0,
  y = 0,

  width = 180,
  height = 100,

  tag = "D-101",

  open = false,
  fault = false,

  opening = 0,
  position = 0,

  direction = "right",

  fontFamily = "Arial",

  tagSize = 12,
  statusSize = 11,
  valueSize = 10,

  isdetail = true,

  sendCommand,
}) => {
  // =========================
  // DAMper COLOR
  // =========================

  const bodyColor = fault ? "#dc3545" : open ? "#28a745" : "#6c757d";

  const bladeColor = fault ? "#dc3545" : open ? "#00bfff" : "#64748b";

  // =========================
  // SAFE VALUES
  // =========================

  const safeOpening = Number.isFinite(Number(opening))
    ? Math.max(0, Math.min(100, Number(opening)))
    : open
      ? 100
      : 0;

  const safePosition = Number.isFinite(Number(position))
    ? Math.max(0, Math.min(100, Number(position)))
    : safeOpening;

  // =========================
  // DIMENSIONS
  // =========================

  const pipeWidth = Math.max(6, height * 0.12);

  const pipeLength = width * 0.3;

  const damperWidth = width * 0.25;
  const damperHeight = height * 0.55;

  const bodyX = -damperWidth / 2;
  const bodyY = -damperHeight / 2;

  const isLeft = direction === "left";

  // =========================
  // BLADE ANGLE
  // =========================

  const bladeAngle = safePosition >= 50 ? 55 : 0;

  // =========================
  // COMMAND HANDLER
  // =========================

  const handleCommand = () => {
    if (sendCommand) {
      sendCommand(open ? "CLOSE" : "OPEN");
    }
  };

  return (
    <g
      transform={`
        translate(${x},${y})
        ${isLeft ? "scale(-1,1)" : ""}
      `}
      onClick={handleCommand}
      style={{
        cursor: sendCommand ? "pointer" : "default",
      }}
    >
      {/* =========================
          LEFT PIPE
      ========================= */}

      <line
        x1={-damperWidth / 2 - pipeLength}
        y1={0}
        x2={-damperWidth / 2}
        y2={0}
        stroke="#d8dee9"
        strokeWidth={pipeWidth}
        strokeLinecap="square"
      />

      {/* =========================
          LEFT FLOW
      ========================= */}

      {open && !fault && (
        <line
          x1={-damperWidth / 2 - pipeLength + 8}
          y1={0}
          x2={-damperWidth / 2 - 8}
          y2={0}
          stroke="#00ffff"
          strokeWidth={Math.max(2, pipeWidth * 0.35)}
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

      {/* =========================
          RIGHT PIPE
      ========================= */}

      <line
        x1={damperWidth / 2}
        y1={0}
        x2={damperWidth / 2 + pipeLength}
        y2={0}
        stroke="#d8dee9"
        strokeWidth={pipeWidth}
        strokeLinecap="square"
      />

      {/* =========================
          RIGHT FLOW
      ========================= */}

      {open && !fault && (
        <line
          x1={damperWidth / 2 + 8}
          y1={0}
          x2={damperWidth / 2 + pipeLength - 8}
          y2={0}
          stroke="#00ffff"
          strokeWidth={Math.max(2, pipeWidth * 0.35)}
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

      {/* =========================
          DAMPER BODY
      ========================= */}

      <rect
        x={bodyX}
        y={bodyY}
        width={damperWidth}
        height={damperHeight}
        rx={6}
        fill="#0b1220"
        stroke={bodyColor}
        strokeWidth={3}
      >
        {fault && (
          <animate
            attributeName="opacity"
            values="1;0.25;1"
            dur="0.5s"
            repeatCount="indefinite"
          />
        )}
      </rect>

      {/* =========================
          INNER BODY
      ========================= */}

      <rect
        x={bodyX + 5}
        y={bodyY + 5}
        width={damperWidth - 10}
        height={damperHeight - 10}
        rx={4}
        fill="#111c2d"
        stroke="#1f3b57"
        strokeWidth={1}
      />

      {/* =========================
          DAMPER BLADE
      ========================= */}

      <g
        transform={`
          rotate(${bladeAngle})
        `}
      >
        <rect
          x={-damperWidth * 0.38}
          y={-damperHeight * 0.075}
          width={damperWidth * 0.76}
          height={damperHeight * 0.15}
          rx={2}
          fill={bladeColor}
          stroke="#222"
          strokeWidth={2}
        />

        {/* =========================
            BLADE CENTER
        ========================= */}

        <circle
          cx={0}
          cy={0}
          r={Math.max(4, damperHeight * 0.08)}
          fill="#d8dee9"
          stroke="#222"
          strokeWidth={2}
        />
      </g>

      {/* =========================
          DAMPER SHAFT
      ========================= */}

      <line
        x1={0}
        y1={-damperHeight * 0.32}
        x2={0}
        y2={damperHeight * 0.32}
        stroke="#94a3b8"
        strokeWidth={4}
      />

      {/* =========================
          ACTUATOR
      ========================= */}

      <rect
        x={-damperWidth * 0.32}
        y={-damperHeight * 0.5 - 18}
        width={damperWidth * 0.64}
        height={18}
        rx={4}
        fill="#495057"
        stroke="#222"
        strokeWidth={2}
      />

      {/* =========================
          ACTUATOR INDICATOR
      ========================= */}

      <circle cx={0} cy={-damperHeight * 0.5 - 9} r={4} fill={bodyColor}>
        {!fault && (
          <animate
            attributeName="opacity"
            values="1;0.45;1"
            dur="1.2s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      {/* =========================
          FLOW ARROW LEFT
      ========================= */}

      <polygon
        points={`
          ${-damperWidth / 2 - pipeLength * 0.55},-6
          ${-damperWidth / 2 - pipeLength * 0.42},0
          ${-damperWidth / 2 - pipeLength * 0.55},6
        `}
        fill="#00bfff"
      />

      {/* =========================
          FLOW ARROW RIGHT
      ========================= */}

      <polygon
        points={`
          ${damperWidth / 2 + pipeLength * 0.55},-6
          ${damperWidth / 2 + pipeLength * 0.68},0
          ${damperWidth / 2 + pipeLength * 0.55},6
        `}
        fill="#00bfff"
      />

      {/* =========================
          POSITION INDICATOR
      ========================= */}

      <text
        x={0}
        y={damperHeight * 0.08}
        textAnchor="middle"
        fill={bladeColor}
        fontWeight="bold"
        fontSize={Math.max(9, valueSize)}
        fontFamily={fontFamily}
      >
        {safePosition.toFixed(0)}%
      </text>

      {/* =========================
          TAG
      ========================= */}

      <text
        x={0}
        y={damperHeight / 2 + 25}
        textAnchor="middle"
        fill="#00ffff"
        fontWeight="bold"
        fontSize={tagSize}
        fontFamily={fontFamily}
      >
        {tag}
      </text>

      {/* =========================
          DETAIL
      ========================= */}

      {isdetail && (
        <>
          {/* STATUS */}

          <text
            x={0}
            y={damperHeight / 2 + 42}
            textAnchor="middle"
            fill={bodyColor}
            fontWeight="bold"
            fontSize={statusSize}
            fontFamily={fontFamily}
          >
            {fault ? "FAULT" : open ? "OPEN" : "CLOSED"}
          </text>

          {/* OPENING */}

          <text
            x={0}
            y={damperHeight / 2 + 58}
            textAnchor="middle"
            fill="#ffc107"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            OPENING {safeOpening.toFixed(0)}%
          </text>

          {/* POSITION */}

          <text
            x={0}
            y={damperHeight / 2 + 74}
            textAnchor="middle"
            fill="#00bfff"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            POSITION {safePosition.toFixed(0)}%
          </text>
        </>
      )}

      {/* =========================
          FAULT BORDER
      ========================= */}

      {fault && (
        <rect
          x={bodyX - 5}
          y={bodyY - 5}
          width={damperWidth + 10}
          height={damperHeight + 10}
          rx={8}
          fill="none"
          stroke="#dc3545"
          strokeWidth={3}
        >
          <animate
            attributeName="opacity"
            values="1;0.2;1"
            dur="0.5s"
            repeatCount="indefinite"
          />
        </rect>
      )}
    </g>
  );
};

export default Damper;

/*
<Damper
  x={500}
  y={400}
  tag="D-101"
  open={true}
  fault={false}
  opening={100}
  position={100}
/>
*/
