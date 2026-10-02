import React from "react";

type DuctDirection = "left" | "right";

interface DuctProps {
  x?: number;
  y?: number;

  width?: number;
  height?: number;

  tag?: string;

  running?: boolean;
  fault?: boolean;

  flow?: number;
  pressure?: number;

  direction?: DuctDirection;

  fontFamily?: string;

  tagSize?: number;
  statusSize?: number;
  valueSize?: number;

  isdetail?: boolean;

  sendCommand?: (command: string, value?: unknown) => void;
}

const Duct: React.FC<DuctProps> = ({
  x = 0,
  y = 0,

  width = 220,
  height = 80,

  tag = "DUCT-101",

  running = false,
  fault = false,

  flow = 0,
  pressure = 0,

  direction = "right",

  fontFamily = "Arial",

  tagSize = 12,
  statusSize = 11,
  valueSize = 10,

  isdetail = true,

  sendCommand,
}) => {
  // =========================
  // DUCT COLOR
  // =========================

  const bodyColor = fault ? "#dc3545" : running ? "#28a745" : "#6c757d";

  const flowColor = fault ? "#dc3545" : running ? "#00ffff" : "#64748b";

  // =========================
  // SAFE VALUES
  // =========================

  const safeFlow = Number.isFinite(Number(flow)) ? Number(flow) : 0;

  const safePressure = Number.isFinite(Number(pressure)) ? Number(pressure) : 0;

  // =========================
  // DIMENSIONS
  // =========================

  const ductHeight = Math.max(18, height * 0.38);

  const ductWidth = width * 0.58;

  const pipeLength = width * 0.21;

  const bodyX = -ductWidth / 2;
  const bodyY = -ductHeight / 2;

  const pipeWidth = ductHeight;

  const isLeft = direction === "left";

  // =========================
  // COMMAND HANDLER
  // =========================

  const handleCommand = () => {
    if (sendCommand) {
      sendCommand(running ? "STOP" : "START");
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
          LEFT DUCT
      ========================= */}

      <line
        x1={bodyX - pipeLength}
        y1={0}
        x2={bodyX}
        y2={0}
        stroke="#d8dee9"
        strokeWidth={pipeWidth}
        strokeLinecap="square"
      />

      {/* =========================
          LEFT FLOW
      ========================= */}

      {running && !fault && safeFlow > 0 && (
        <line
          x1={bodyX - pipeLength + 5}
          y1={0}
          x2={bodyX - 5}
          y2={0}
          stroke="#00ffff"
          strokeWidth={Math.max(2, ductHeight * 0.28)}
          strokeDasharray="9 6"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-30"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </line>
      )}

      {/* =========================
          RIGHT DUCT
      ========================= */}

      <line
        x1={ductWidth / 2}
        y1={0}
        x2={ductWidth / 2 + pipeLength}
        y2={0}
        stroke="#d8dee9"
        strokeWidth={pipeWidth}
        strokeLinecap="square"
      />

      {/* =========================
          RIGHT FLOW
      ========================= */}

      {running && !fault && safeFlow > 0 && (
        <line
          x1={ductWidth / 2 + 5}
          y1={0}
          x2={ductWidth / 2 + pipeLength - 5}
          y2={0}
          stroke="#00ffff"
          strokeWidth={Math.max(2, ductHeight * 0.28)}
          strokeDasharray="9 6"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-30"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </line>
      )}

      {/* =========================
          OUTER DUCT BODY
      ========================= */}

      <rect
        x={bodyX}
        y={bodyY}
        width={ductWidth}
        height={ductHeight}
        rx={5}
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
          INNER DUCT
      ========================= */}

      <rect
        x={bodyX + 5}
        y={bodyY + 5}
        width={ductWidth - 10}
        height={ductHeight - 10}
        rx={3}
        fill="#111c2d"
        stroke="#1f3b57"
        strokeWidth={1}
      />

      {/* =========================
          PROCESS FLOW
      ========================= */}

      {running && !fault && safeFlow > 0 && (
        <line
          x1={bodyX + 8}
          y1={0}
          x2={bodyX + ductWidth - 8}
          y2={0}
          stroke={flowColor}
          strokeWidth={Math.max(2, ductHeight * 0.22)}
          strokeDasharray="10 7"
          opacity="0.9"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-34"
            dur="0.55s"
            repeatCount="indefinite"
          />
        </line>
      )}

      {/* =========================
          FLOW ARROW LEFT
      ========================= */}

      <polygon
        points={`
          ${bodyX - pipeLength * 0.55},-6
          ${bodyX - pipeLength * 0.4},0
          ${bodyX - pipeLength * 0.55},6
        `}
        fill="#00bfff"
      />

      {/* =========================
          FLOW ARROW RIGHT
      ========================= */}

      <polygon
        points={`
          ${ductWidth / 2 + pipeLength * 0.55},-6
          ${ductWidth / 2 + pipeLength * 0.7},0
          ${ductWidth / 2 + pipeLength * 0.55},6
        `}
        fill="#00bfff"
      />

      {/* =========================
          DUCT JOINT LEFT
      ========================= */}

      <line
        x1={bodyX + ductWidth * 0.12}
        y1={bodyY + 4}
        x2={bodyX + ductWidth * 0.12}
        y2={bodyY + ductHeight - 4}
        stroke="#1f3b57"
        strokeWidth={2}
      />

      {/* =========================
          DUCT JOINT RIGHT
      ========================= */}

      <line
        x1={bodyX + ductWidth * 0.88}
        y1={bodyY + 4}
        x2={bodyX + ductWidth * 0.88}
        y2={bodyY + ductHeight - 4}
        stroke="#1f3b57"
        strokeWidth={2}
      />

      {/* =========================
          STATUS INDICATOR
      ========================= */}

      <circle
        cx={bodyX + ductWidth - 10}
        cy={bodyY + 10}
        r={4}
        fill={bodyColor}
      >
        {running && !fault && (
          <animate
            attributeName="opacity"
            values="1;0.35;1"
            dur="1.2s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      {/* =========================
          FLOW VALUE
      ========================= */}

      <text
        x={0}
        y={-4}
        textAnchor="middle"
        fill={flowColor}
        fontWeight="bold"
        fontSize={Math.max(9, valueSize)}
        fontFamily={fontFamily}
      >
        FLOW {safeFlow.toFixed(1)}
      </text>

      {/* =========================
          TAG
      ========================= */}

      <text
        x={0}
        y={ductHeight / 2 + 25}
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
            y={ductHeight / 2 + 42}
            textAnchor="middle"
            fill={bodyColor}
            fontWeight="bold"
            fontSize={statusSize}
            fontFamily={fontFamily}
          >
            {fault ? "FAULT" : running ? "RUNNING" : "STOP"}
          </text>

          {/* FLOW */}

          <text
            x={0}
            y={ductHeight / 2 + 58}
            textAnchor="middle"
            fill="#00bfff"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            FLOW {safeFlow.toFixed(1)}
          </text>

          {/* PRESSURE */}

          <text
            x={0}
            y={ductHeight / 2 + 74}
            textAnchor="middle"
            fill="#aab4c3"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            PRESS {safePressure.toFixed(0)} Pa
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
          width={ductWidth + 10}
          height={ductHeight + 10}
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

export default Duct;

/*
<Duct
  x={500}
  y={400}
  tag="DUCT-101"
  running={true}
  fault={false}
  flow={45000}
  pressure={-120}
/>
*/
