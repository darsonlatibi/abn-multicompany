import React from "react";

interface AirSliceProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;

  tag?: string;
  title?: string;

  pressure?: number;
  flow?: number;
  temperature?: number;
  opening?: number;

  running?: boolean;
  alarm?: boolean;
  trip?: boolean;

  fanRunning?: boolean;
  damperOpen?: boolean;
  filterRunning?: boolean;

  pressureUnit?: string;
  flowUnit?: string;
  temperatureUnit?: string;
  openingUnit?: string;

  bodyColor?: string;
  pipeColor?: string;
  fanColor?: string;
  filterColor?: string;
  damperColor?: string;
  inactiveColor?: string;
  alarmColor?: string;

  fontFamily?: string;
  tagSize?: number;
  statusSize?: number;
  valueSize?: number;

  isdetail?: boolean;

  sendCommand?: (command: string, value?: unknown) => void;
}

const AirSlice: React.FC<AirSliceProps> = ({
  x = 0,
  y = 0,
  width = 380,
  height = 300,

  tag = "AS-01",
  title = "AIR SLIDE",

  pressure = 0.35,
  flow = 1850,
  temperature = 42,
  opening = 78,

  running = true,
  alarm = false,
  trip = false,

  fanRunning,
  damperOpen,
  filterRunning,

  pressureUnit = "bar",
  flowUnit = "Nm³/h",
  temperatureUnit = "°C",
  openingUnit = "%",

  bodyColor = "#334155",
  pipeColor = "#94a3b8",
  fanColor = "#475569",
  filterColor = "#3f4d61",
  damperColor = "#64748b",
  inactiveColor = "#475569",
  alarmColor = "#dc3545",

  fontFamily = "Arial",
  tagSize = 12,
  statusSize = 11,
  valueSize = 10,

  isdetail = true,
  sendCommand,
}) => {
  const safeFanRunning = fanRunning ?? running;
  const safeDamperOpen = damperOpen ?? running;
  const safeFilterRunning = filterRunning ?? running;

  const effectiveAlarm = alarm || trip;

  const statusColor = effectiveAlarm
    ? alarmColor
    : running
      ? "#28a745"
      : "#6c757d";

  //const centerX = width / 2;

  const fanX = 28;
  const fanY = 91;
  const fanW = 82;
  const fanH = 82;

  const filterX = 140;
  const filterY = 77;
  const filterW = 72;
  const filterH = 110;

  const damperX = 252;
  const damperY = 105;
  const damperW = 56;
  const damperH = 58;

  const airY = fanY + fanH / 2;

  const handleCommand = () => {
    if (!sendCommand) return;

    sendCommand(running ? "STOP" : "START", {
      tag,
      source: "AirSlice",
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
          AIR FLOW DIRECTION
      ===================================================== */}

      <text
        x={width - 18}
        y={62}
        textAnchor="end"
        fill="#64748b"
        fontSize={8}
        fontWeight={700}
        fontFamily={fontFamily}
      >
        AIR FLOW →
      </text>

      {/* =====================================================
          INLET AIR PIPE
      ===================================================== */}

      <line
        x1={8}
        y1={airY}
        x2={fanX}
        y2={airY}
        stroke={running ? pipeColor : inactiveColor}
        strokeWidth={12}
      />

      {running && (
        <g>
          <circle cx={18} cy={airY} r={2} fill="#e2e8f0">
            <animate
              attributeName="cx"
              values="12;30;12"
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>

          <circle cx={32} cy={airY} r={2} fill="#e2e8f0">
            <animate
              attributeName="cx"
              values="26;44;26"
              dur="1s"
              begin="0.3s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      )}

      {/* =====================================================
          FAN / AIR SOURCE
      ===================================================== */}

      <rect
        x={fanX}
        y={fanY}
        width={fanW}
        height={fanH}
        rx={10}
        fill={fanColor}
        stroke={safeFanRunning ? "#22c55e" : inactiveColor}
        strokeWidth={2}
      />

      <text
        x={fanX + fanW / 2}
        y={fanY + 19}
        textAnchor="middle"
        fill="#e2e8f0"
        fontSize={10}
        fontWeight={700}
        fontFamily={fontFamily}
      >
        AIR FAN
      </text>

      <circle
        cx={fanX + fanW / 2}
        cy={fanY + 48}
        r={22}
        fill="#172033"
        stroke={safeFanRunning ? "#22c55e" : inactiveColor}
        strokeWidth={2}
      />

      {safeFanRunning && (
        <g>
          <circle
            cx={fanX + fanW / 2}
            cy={fanY + 48}
            r={14}
            fill="none"
            stroke="#94a3b8"
            strokeWidth={4}
            strokeDasharray="6 4"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`0 ${fanX + fanW / 2} ${fanY + 48}`}
              to={`360 ${fanX + fanW / 2} ${fanY + 48}`}
              dur="0.8s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      )}

      <text
        x={fanX + fanW / 2}
        y={fanY + 77}
        textAnchor="middle"
        fill={safeFanRunning ? "#22c55e" : "#64748b"}
        fontSize={8}
        fontWeight={700}
        fontFamily={fontFamily}
      >
        {safeFanRunning ? "RUN" : "STOP"}
      </text>

      {/* =====================================================
          PIPE FAN → FILTER
      ===================================================== */}

      <line
        x1={fanX + fanW}
        y1={airY}
        x2={filterX}
        y2={airY}
        stroke={safeFanRunning ? pipeColor : inactiveColor}
        strokeWidth={12}
      />

      {/* =====================================================
          FILTER / AIR CLEANING
      ===================================================== */}

      <rect
        x={filterX}
        y={filterY}
        width={filterW}
        height={filterH}
        rx={8}
        fill={filterColor}
        stroke={safeFilterRunning ? "#22c55e" : inactiveColor}
        strokeWidth={2}
      />

      <text
        x={filterX + filterW / 2}
        y={filterY + 19}
        textAnchor="middle"
        fill="#e2e8f0"
        fontSize={8}
        fontWeight={700}
        fontFamily={fontFamily}
      >
        FILTER
      </text>

      {[0, 1, 2, 3].map((index) => {
        const lineY = filterY + 34 + index * 17;

        return (
          <line
            key={index}
            x1={filterX + 13}
            y1={lineY}
            x2={filterX + filterW - 13}
            y2={lineY}
            stroke="#94a3b8"
            strokeWidth={2}
            strokeDasharray="3 3"
          />
        );
      })}

      <circle
        cx={filterX + filterW / 2}
        cy={filterY + 91}
        r={5}
        fill={safeFilterRunning ? "#22c55e" : "#64748b"}
      />

      <text
        x={filterX + filterW / 2}
        y={filterY + 105}
        textAnchor="middle"
        fill={safeFilterRunning ? "#22c55e" : "#64748b"}
        fontSize={7}
        fontWeight={700}
        fontFamily={fontFamily}
      >
        {safeFilterRunning ? "ACTIVE" : "STOP"}
      </text>

      {/* =====================================================
          PIPE FILTER → DAMPER
      ===================================================== */}

      <line
        x1={filterX + filterW}
        y1={airY}
        x2={damperX}
        y2={airY}
        stroke={safeFilterRunning ? pipeColor : inactiveColor}
        strokeWidth={12}
      />

      {/* =====================================================
          DAMPER
      ===================================================== */}

      <rect
        x={damperX}
        y={damperY}
        width={damperW}
        height={damperH}
        rx={6}
        fill={bodyColor}
        stroke={safeDamperOpen ? "#22c55e" : inactiveColor}
        strokeWidth={2}
      />

      <line
        x1={damperX + 10}
        y1={damperY + damperH - 10}
        x2={damperX + damperW - 10}
        y2={damperY + 10}
        stroke={damperColor}
        strokeWidth={6}
      />

      <text
        x={damperX + damperW / 2}
        y={damperY - 8}
        textAnchor="middle"
        fill="#64748b"
        fontSize={8}
        fontWeight={700}
        fontFamily={fontFamily}
      >
        DAMPER
      </text>

      <text
        x={damperX + damperW / 2}
        y={damperY + damperH + 14}
        textAnchor="middle"
        fill={safeDamperOpen ? "#22c55e" : "#64748b"}
        fontSize={8}
        fontWeight={700}
        fontFamily={fontFamily}
      >
        {safeDamperOpen ? "OPEN" : "CLOSED"}
      </text>

      {/* =====================================================
          OUTLET AIR PIPE
      ===================================================== */}

      <line
        x1={damperX + damperW}
        y1={airY}
        x2={width - 8}
        y2={airY}
        stroke={safeDamperOpen ? pipeColor : inactiveColor}
        strokeWidth={12}
      />

      {safeDamperOpen && (
        <g>
          <circle cx={width - 32} cy={airY} r={2} fill="#e2e8f0">
            <animate
              attributeName="cx"
              values={`${width - 45};${width - 12};${width - 45}`}
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      )}

      {/* =====================================================
          AIR SLIDE SYMBOL
      ===================================================== */}

      <path
        d={`
          M ${width - 110} ${airY + 27}
          L ${width - 32} ${airY + 27}
          L ${width - 48} ${airY + 8}
          L ${width - 94} ${airY + 8}
          Z
        `}
        fill="#172033"
        stroke={running ? "#22c55e" : inactiveColor}
        strokeWidth={2}
      />

      <line
        x1={width - 85}
        y1={airY + 18}
        x2={width - 45}
        y2={airY + 18}
        stroke="#94a3b8"
        strokeWidth={2}
        strokeDasharray="4 3"
      />

      <text
        x={width - 72}
        y={airY + 43}
        textAnchor="middle"
        fill="#64748b"
        fontSize={7}
        fontWeight={700}
        fontFamily={fontFamily}
      >
        AIR SLIDE
      </text>

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

          {/* PRESSURE */}

          <text
            x={25}
            y={height - 70}
            fill="#64748b"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            PRESSURE
          </text>

          <text
            x={25}
            y={height - 48}
            fill="#f8fafc"
            fontSize={valueSize + 2}
            fontWeight={700}
            fontFamily={fontFamily}
          >
            {pressure.toFixed(2)} {pressureUnit}
          </text>

          {/* FLOW */}

          <text
            x={105}
            y={height - 70}
            fill="#64748b"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            FLOW
          </text>

          <text
            x={105}
            y={height - 48}
            fill="#f8fafc"
            fontSize={valueSize + 2}
            fontWeight={700}
            fontFamily={fontFamily}
          >
            {flow.toFixed(0)} {flowUnit}
          </text>

          {/* TEMPERATURE */}

          <text
            x={205}
            y={height - 70}
            fill="#64748b"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            TEMP
          </text>

          <text
            x={205}
            y={height - 48}
            fill="#f8fafc"
            fontSize={valueSize + 2}
            fontWeight={700}
            fontFamily={fontFamily}
          >
            {temperature.toFixed(1)} {temperatureUnit}
          </text>

          {/* OPENING */}

          <text
            x={295}
            y={height - 70}
            fill="#64748b"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            OPENING
          </text>

          <text
            x={295}
            y={height - 48}
            fill="#f8fafc"
            fontSize={valueSize + 2}
            fontWeight={700}
            fontFamily={fontFamily}
          >
            {opening.toFixed(0)} {openingUnit}
          </text>

          {/* EQUIPMENT */}

          <text
            x={25}
            y={height - 29}
            fill="#64748b"
            fontSize={valueSize - 1}
            fontFamily={fontFamily}
          >
            FAN / FILTER / DAMPER
          </text>

          <text
            x={width - 25}
            y={height - 29}
            textAnchor="end"
            fill="#64748b"
            fontSize={valueSize - 1}
            fontFamily={fontFamily}
          >
            {safeFanRunning && safeFilterRunning && safeDamperOpen
              ? "AIR SYSTEM HEALTHY"
              : "AIR SYSTEM PARTIAL"}
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

export default AirSlice;
