import React from "react";

interface CementSiloProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;

  tag?: string;
  title?: string;
  cementType?: string;

  level?: number;
  capacity?: number;
  weight?: number;
  temperature?: number;
  pressure?: number;

  running?: boolean;
  alarm?: boolean;
  trip?: boolean;

  inletRunning?: boolean;
  outletRunning?: boolean;
  aerationRunning?: boolean;

  levelUnit?: string;
  capacityUnit?: string;
  weightUnit?: string;
  temperatureUnit?: string;
  pressureUnit?: string;

  siloColor?: string;
  cementColor?: string;
  frameColor?: string;
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

const CementSilo: React.FC<CementSiloProps> = ({
  x = 0,
  y = 0,
  width = 380,
  height = 340,

  tag = "CS-01",
  title = "CEMENT SILO",
  cementType = "OPC",

  level = 72,
  capacity = 5000,
  weight = 3600,
  temperature = 38.5,
  pressure = 0.12,

  running = true,
  alarm = false,
  trip = false,

  inletRunning,
  outletRunning,
  aerationRunning,

  levelUnit = "%",
  capacityUnit = "t",
  weightUnit = "t",
  temperatureUnit = "°C",
  pressureUnit = "bar",

  siloColor = "#334155",
  cementColor = "#94a3b8",
  frameColor = "#64748b",
  pipeColor = "#94a3b8",
  inactiveColor = "#475569",
  alarmColor = "#dc3545",

  fontFamily = "Arial",
  tagSize = 12,
  statusSize = 11,
  valueSize = 10,

  isdetail = true,
  sendCommand,
}) => {
  const safeInletRunning = inletRunning ?? running;
  const safeOutletRunning = outletRunning ?? running;
  const safeAerationRunning = aerationRunning ?? running;

  const effectiveAlarm = alarm || trip;

  const statusColor = effectiveAlarm
    ? alarmColor
    : running
      ? "#28a745"
      : "#6c757d";

  const safeLevel = Math.max(0, Math.min(100, level));

  const siloX = width * 0.23;
  const siloY = 78;
  const siloW = width * 0.54;
  const siloH = 150;

  const coneTopY = siloY + siloH;
  const coneBottomY = coneTopY + 48;

  const siloCenterX = siloX + siloW / 2;

  const inletX = siloCenterX;
  const outletX = siloCenterX;

  const fillHeight = siloH * (safeLevel / 100);
  const fillY = siloY + siloH - fillHeight;

  const handleCommand = () => {
    if (!sendCommand) return;

    sendCommand(running ? "STOP" : "START", {
      tag,
      source: "CementSilo",
    });
  };

  return (
    <g transform={`translate(${x},${y})`}>
      {/* =====================================================
          OUTER PANEL
      ===================================================== */}

      <rect
        x={1}
        y={1}
        width={width - 2}
        height={height - 2}
        rx={10}
        fill="#0b1220"
        stroke="#263b52"
        strokeWidth={1.5}
      />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <rect
        x={8}
        y={8}
        width={width - 16}
        height={34}
        rx={6}
        fill="#111c2d"
        stroke="#334155"
      />

      <text
        x={18}
        y={29}
        fill="#e2e8f0"
        fontSize={tagSize + 1}
        fontWeight={700}
        fontFamily={fontFamily}
      >
        {title}
      </text>

      <text
        x={width - 18}
        y={29}
        textAnchor="end"
        fill="#94a3b8"
        fontSize={tagSize - 1}
        fontFamily={fontFamily}
      >
        {tag}
      </text>

      {/* =====================================================
          STATUS
      ===================================================== */}

      <circle cx={18} cy={58} r={5} fill={statusColor} />

      {running && !effectiveAlarm && (
        <circle
          cx={18}
          cy={58}
          r={8}
          fill="none"
          stroke={statusColor}
          strokeWidth={1}
          opacity={0.35}
        >
          <animate
            attributeName="r"
            values="6;10;6"
            dur="1.4s"
            repeatCount="indefinite"
          />

          <animate
            attributeName="opacity"
            values="0.5;0;0.5"
            dur="1.4s"
            repeatCount="indefinite"
          />
        </circle>
      )}

      <text
        x={29}
        y={62}
        fill={statusColor}
        fontSize={statusSize}
        fontWeight={700}
        fontFamily={fontFamily}
      >
        {trip ? "TRIP" : alarm ? "ALARM" : running ? "RUNNING" : "STOPPED"}
      </text>

      {/* =====================================================
          CEMENT TYPE
      ===================================================== */}

      <rect
        x={width - 105}
        y={48}
        width={87}
        height={20}
        rx={4}
        fill="#172033"
        stroke="#334155"
      />

      <text
        x={width - 61}
        y={62}
        textAnchor="middle"
        fill="#cbd5e1"
        fontSize={9}
        fontWeight={700}
        fontFamily={fontFamily}
      >
        {cementType}
      </text>

      {/* =====================================================
          INLET PIPE
      ===================================================== */}

      <line
        x1={inletX}
        y1={58}
        x2={inletX}
        y2={siloY}
        stroke={safeInletRunning ? pipeColor : inactiveColor}
        strokeWidth={10}
      />

      <polygon
        points={`
          ${inletX - 7},${siloY - 13}
          ${inletX + 7},${siloY - 13}
          ${inletX},${siloY}
        `}
        fill={safeInletRunning ? "#22c55e" : inactiveColor}
      />

      <text
        x={inletX + 15}
        y={siloY - 7}
        fill={safeInletRunning ? "#22c55e" : "#64748b"}
        fontSize={8}
        fontWeight={700}
        fontFamily={fontFamily}
      >
        INLET
      </text>

      {/* =====================================================
          SILO BODY
      ===================================================== */}

      <defs>
        <clipPath id={`siloClip-${tag}`}>
          <rect x={siloX} y={siloY} width={siloW} height={siloH} rx={14} />
        </clipPath>
      </defs>

      <rect
        x={siloX}
        y={siloY}
        width={siloW}
        height={siloH}
        rx={14}
        fill={siloColor}
        stroke={effectiveAlarm ? alarmColor : frameColor}
        strokeWidth={2}
      />

      {/* =====================================================
          CEMENT LEVEL
      ===================================================== */}

      <g clipPath={`url(#siloClip-${tag})`}>
        <rect
          x={siloX}
          y={fillY}
          width={siloW}
          height={fillHeight}
          fill={cementColor}
          opacity={0.85}
        />

        <line
          x1={siloX}
          y1={fillY}
          x2={siloX + siloW}
          y2={fillY}
          stroke="#e2e8f0"
          strokeWidth={1}
          strokeDasharray="4 4"
          opacity={0.7}
        />
      </g>

      {/* =====================================================
          LEVEL DISPLAY
      ===================================================== */}

      <circle
        cx={siloCenterX}
        cy={siloY + 67}
        r={38}
        fill="#111827"
        stroke={
          effectiveAlarm ? alarmColor : safeLevel >= 90 ? "#f59e0b" : "#22c55e"
        }
        strokeWidth={2}
      />

      <text
        x={siloCenterX}
        y={siloY + 67}
        textAnchor="middle"
        fill="#f8fafc"
        fontSize={22}
        fontWeight={700}
        fontFamily={fontFamily}
      >
        {safeLevel.toFixed(0)}
      </text>

      <text
        x={siloCenterX}
        y={siloY + 84}
        textAnchor="middle"
        fill="#94a3b8"
        fontSize={9}
        fontWeight={700}
        fontFamily={fontFamily}
      >
        {levelUnit}
      </text>

      {/* =====================================================
          LEVEL SCALE
      ===================================================== */}

      <line
        x1={siloX - 15}
        y1={siloY + 5}
        x2={siloX - 15}
        y2={siloY + siloH - 5}
        stroke="#475569"
        strokeWidth={2}
      />

      {[0, 25, 50, 75, 100].map((value) => {
        const lineY = siloY + siloH - (siloH * value) / 100;

        return (
          <g key={value}>
            <line
              x1={siloX - 20}
              y1={lineY}
              x2={siloX - 10}
              y2={lineY}
              stroke="#64748b"
              strokeWidth={1}
            />

            <text
              x={siloX - 25}
              y={lineY + 3}
              textAnchor="end"
              fill="#64748b"
              fontSize={7}
              fontFamily={fontFamily}
            >
              {value}
            </text>
          </g>
        );
      })}

      {/* =====================================================
          SILO CONE
      ===================================================== */}

      <polygon
        points={`
          ${siloX + 8},${coneTopY}
          ${siloX + siloW - 8},${coneTopY}
          ${siloCenterX + 18},${coneBottomY}
          ${siloCenterX - 18},${coneBottomY}
        `}
        fill={siloColor}
        stroke={frameColor}
        strokeWidth={2}
      />

      {/* =====================================================
          OUTLET PIPE
      ===================================================== */}

      <line
        x1={outletX}
        y1={coneBottomY}
        x2={outletX}
        y2={height - 116}
        stroke={safeOutletRunning ? pipeColor : inactiveColor}
        strokeWidth={10}
      />

      <polygon
        points={`
          ${outletX - 7},${height - 116}
          ${outletX + 7},${height - 116}
          ${outletX},${height - 103}
        `}
        fill={safeOutletRunning ? "#22c55e" : inactiveColor}
      />

      <text
        x={outletX + 16}
        y={height - 106}
        fill={safeOutletRunning ? "#22c55e" : "#64748b"}
        fontSize={8}
        fontWeight={700}
        fontFamily={fontFamily}
      >
        OUTLET
      </text>

      {/* =====================================================
          AERATION
      ===================================================== */}

      <g>
        <rect
          x={siloX + 18}
          y={siloY + siloH - 31}
          width={siloW - 36}
          height={20}
          rx={5}
          fill="#111827"
          stroke={safeAerationRunning ? "#22c55e" : inactiveColor}
        />

        <text
          x={siloCenterX}
          y={siloY + siloH - 17}
          textAnchor="middle"
          fill={safeAerationRunning ? "#22c55e" : "#64748b"}
          fontSize={8}
          fontWeight={700}
          fontFamily={fontFamily}
        >
          AERATION {safeAerationRunning ? "RUN" : "STOP"}
        </text>
      </g>

      {/* =====================================================
          DETAIL PANEL
      ===================================================== */}

      {isdetail && (
        <g>
          <rect
            x={12}
            y={height - 92}
            width={width - 24}
            height={70}
            rx={6}
            fill="#111c2d"
            stroke="#1f3b57"
          />

          {/* LEVEL */}

          <text
            x={25}
            y={height - 70}
            fill="#64748b"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            LEVEL
          </text>

          <text
            x={25}
            y={height - 48}
            fill="#f8fafc"
            fontSize={valueSize + 2}
            fontWeight={700}
            fontFamily={fontFamily}
          >
            {safeLevel.toFixed(1)} {levelUnit}
          </text>

          {/* WEIGHT */}

          <text
            x={105}
            y={height - 70}
            fill="#64748b"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            STOCK
          </text>

          <text
            x={105}
            y={height - 48}
            fill="#f8fafc"
            fontSize={valueSize + 2}
            fontWeight={700}
            fontFamily={fontFamily}
          >
            {weight.toFixed(0)} {weightUnit}
          </text>

          {/* CAPACITY */}

          <text
            x={185}
            y={height - 70}
            fill="#64748b"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            CAPACITY
          </text>

          <text
            x={185}
            y={height - 48}
            fill="#f8fafc"
            fontSize={valueSize + 2}
            fontWeight={700}
            fontFamily={fontFamily}
          >
            {capacity.toFixed(0)} {capacityUnit}
          </text>

          {/* TEMPERATURE */}

          <text
            x={275}
            y={height - 70}
            fill="#64748b"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            TEMP
          </text>

          <text
            x={275}
            y={height - 48}
            fill="#f8fafc"
            fontSize={valueSize + 2}
            fontWeight={700}
            fontFamily={fontFamily}
          >
            {temperature.toFixed(1)} {temperatureUnit}
          </text>

          {/* PRESSURE */}

          <text
            x={width - 25}
            y={height - 70}
            textAnchor="end"
            fill="#64748b"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            PRESS
          </text>

          <text
            x={width - 25}
            y={height - 48}
            textAnchor="end"
            fill="#f8fafc"
            fontSize={valueSize + 2}
            fontWeight={700}
            fontFamily={fontFamily}
          >
            {pressure.toFixed(2)} {pressureUnit}
          </text>

          {/* EQUIPMENT STATUS */}

          <text
            x={25}
            y={height - 29}
            fill="#64748b"
            fontSize={valueSize - 1}
            fontFamily={fontFamily}
          >
            INLET / OUTLET / AERATION
          </text>

          <text
            x={width - 25}
            y={height - 29}
            textAnchor="end"
            fill="#64748b"
            fontSize={valueSize - 1}
            fontFamily={fontFamily}
          >
            {safeInletRunning && safeOutletRunning && safeAerationRunning
              ? "SYSTEM HEALTHY"
              : "SYSTEM PARTIAL"}
          </text>
        </g>
      )}

      {/* =====================================================
          COMMAND
      ===================================================== */}

      {sendCommand && (
        <g onClick={handleCommand} style={{ cursor: "pointer" }}>
          <rect
            x={width - 88}
            y={height - 20}
            width={68}
            height={18}
            rx={4}
            fill={running ? "#172033" : "#16351f"}
            stroke={running ? "#475569" : "#22c55e"}
          />

          <text
            x={width - 54}
            y={height - 8}
            textAnchor="middle"
            fill={running ? "#cbd5e1" : "#22c55e"}
            fontSize={valueSize - 1}
            fontWeight={700}
            fontFamily={fontFamily}
          >
            {running ? "STOP" : "START"}
          </text>
        </g>
      )}
    </g>
  );
};

export default CementSilo;
