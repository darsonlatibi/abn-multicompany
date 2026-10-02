import React from "react";

interface FinishMillHopperProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;

  tag?: string;
  title?: string;

  level?: number;
  flow?: number;
  temperature?: number;

  materialFlow?: boolean;
  running?: boolean;
  alarm?: boolean;
  highLevel?: boolean;
  lowLevel?: boolean;

  gateOpen?: boolean;
  feederRunning?: boolean;

  levelUnit?: string;
  flowUnit?: string;
  temperatureUnit?: string;

  materialColor?: string;
  hopperColor?: string;
  gateColor?: string;
  inactiveColor?: string;
  alarmColor?: string;

  fontFamily?: string;
  tagSize?: number;
  statusSize?: number;
  valueSize?: number;

  isdetail?: boolean;

  sendCommand?: (command: string, value?: unknown) => void;
}

const FinishMillHopper: React.FC<FinishMillHopperProps> = ({
  x = 0,
  y = 0,
  width = 380,
  height = 320,

  tag = "FM-HOP-01",
  title = "FINISH MILL FEED HOPPER",

  level = 68,
  flow = 185,
  temperature = 35,

  materialFlow = true,
  running = true,
  alarm = false,
  highLevel = false,
  lowLevel = false,

  gateOpen,
  feederRunning,

  levelUnit = "%",
  flowUnit = "t/h",
  temperatureUnit = "°C",

  materialColor = "#d8b26e",
  hopperColor = "#111c2d",
  gateColor = "#64748b",
  inactiveColor = "#475569",
  alarmColor = "#dc3545",

  fontFamily = "Arial",
  tagSize = 12,
  statusSize = 11,
  valueSize = 10,

  isdetail = true,
  sendCommand,
}) => {
  const safeGateOpen = gateOpen ?? running;
  const safeFeederRunning = feederRunning ?? running;

  const effectiveAlarm = alarm || highLevel;

  const safeLevel = Math.max(0, Math.min(100, level));

  const statusColor = effectiveAlarm
    ? alarmColor
    : running
      ? "#28a745"
      : "#6c757d";

  const levelColor = highLevel ? alarmColor : lowLevel ? "#ff9500" : "#00bfff";

  const activeMaterialColor = effectiveAlarm
    ? alarmColor
    : materialFlow
      ? materialColor
      : inactiveColor;

  const cx = width / 2;

  const hopperTop = 62;
  const hopperBottom = 205;

  const hopperTopWidth = Math.min(250, width - 70);
  const hopperBottomWidth = 105;

  const gateY = hopperBottom + 5;
  const feederY = gateY + 38;

  const materialHeight = ((hopperBottom - hopperTop - 10) * safeLevel) / 100;

  const handleCommand = () => {
    if (!sendCommand) return;

    sendCommand(running ? "STOP" : "START", {
      tag,
      source: "FinishMillHopper",
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
        {effectiveAlarm ? "ALARM" : running ? "RUNNING" : "STOPPED"}
      </text>

      {/* =====================================================
          MATERIAL INLET
      ===================================================== */}

      <path
        d={`
          M ${cx - 42} ${hopperTop - 20}
          L ${cx + 42} ${hopperTop - 20}
          L ${cx + 28} ${hopperTop}
          L ${cx - 28} ${hopperTop}
          Z
        `}
        fill="#26384c"
        stroke="#64748b"
        strokeWidth={2}
      />

      <text
        x={cx}
        y={hopperTop - 27}
        textAnchor="middle"
        fill="#94a3b8"
        fontSize={valueSize}
        fontFamily={fontFamily}
      >
        CLINKER / ADDITIVES
      </text>

      {/* =====================================================
          INCOMING MATERIAL
      ===================================================== */}

      {materialFlow && running && (
        <g>
          {Array.from({ length: 10 }).map((_, index) => (
            <circle
              key={index}
              cx={cx + ((index % 5) - 2) * 7}
              cy={hopperTop - 17 + (index % 4) * 5}
              r={1.8 + (index % 2)}
              fill={activeMaterialColor}
            >
              <animate
                attributeName="cy"
                values={`${hopperTop - 22};${hopperTop + 6}`}
                dur="0.9s"
                begin={`${index * 0.09}s`}
                repeatCount="indefinite"
              />

              <animate
                attributeName="opacity"
                values="1;0"
                dur="0.9s"
                begin={`${index * 0.09}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>
      )}

      {/* =====================================================
          HOPPER BODY
      ===================================================== */}

      <path
        d={`
          M ${cx - hopperTopWidth / 2} ${hopperTop}
          L ${cx + hopperTopWidth / 2} ${hopperTop}
          L ${cx + hopperBottomWidth / 2} ${hopperBottom}
          L ${cx - hopperBottomWidth / 2} ${hopperBottom}
          Z
        `}
        fill={hopperColor}
        stroke="#52667d"
        strokeWidth={2}
      />

      {/* =====================================================
          MATERIAL LEVEL
      ===================================================== */}

      <clipPath id={`fm-hopper-${tag}`}>
        <path
          d={`
            M ${cx - hopperTopWidth / 2 + 3} ${hopperTop + 3}
            L ${cx + hopperTopWidth / 2 - 3} ${hopperTop + 3}
            L ${cx + hopperBottomWidth / 2 - 3} ${hopperBottom - 3}
            L ${cx - hopperBottomWidth / 2 + 3} ${hopperBottom - 3}
            Z
          `}
        />
      </clipPath>

      <g clipPath={`url(#fm-hopper-${tag})`}>
        <rect
          x={cx - hopperTopWidth / 2}
          y={hopperBottom - materialHeight}
          width={hopperTopWidth}
          height={materialHeight + 5}
          fill={activeMaterialColor}
          opacity={0.82}
        />

        {Array.from({ length: 28 }).map((_, index) => {
          const px =
            cx -
            hopperTopWidth / 2 +
            8 +
            ((index * 31) % Math.max(20, hopperTopWidth - 16));

          const py =
            hopperBottom -
            5 -
            ((index * 19) % Math.max(10, materialHeight + 1));

          return (
            <circle
              key={index}
              cx={px}
              cy={py}
              r={1.2 + (index % 3) * 0.5}
              fill="#8f8062"
              opacity={0.65}
            />
          );
        })}
      </g>

      {/* =====================================================
          LEVEL INDICATOR
      ===================================================== */}

      <rect
        x={cx - 48}
        y={hopperTop + 18}
        width={96}
        height={38}
        rx={5}
        fill="#020617"
        opacity={0.92}
      />

      <text
        x={cx}
        y={hopperTop + 34}
        textAnchor="middle"
        fill="#94a3b8"
        fontSize={valueSize - 1}
        fontFamily={fontFamily}
      >
        LEVEL
      </text>

      <text
        x={cx}
        y={hopperTop + 50}
        textAnchor="middle"
        fill={levelColor}
        fontSize={valueSize + 3}
        fontWeight={700}
        fontFamily={fontFamily}
      >
        {safeLevel.toFixed(1)}
        {levelUnit}
      </text>

      {/* =====================================================
          DISCHARGE GATE
      ===================================================== */}

      <rect
        x={cx - 31}
        y={gateY}
        width={62}
        height={14}
        rx={3}
        fill={safeGateOpen ? "#334155" : "#111827"}
        stroke={safeGateOpen ? "#22c55e" : gateColor}
        strokeWidth={2}
      />

      <line
        x1={cx - 22}
        y1={gateY + 7}
        x2={cx + 22}
        y2={gateY + 7}
        stroke={safeGateOpen ? "#22c55e" : inactiveColor}
        strokeWidth={3}
      />

      <text
        x={cx}
        y={gateY + 28}
        textAnchor="middle"
        fill={safeGateOpen ? "#22c55e" : "#64748b"}
        fontSize={valueSize - 1}
        fontWeight={600}
        fontFamily={fontFamily}
      >
        GATE {safeGateOpen ? "OPEN" : "CLOSED"}
      </text>

      {/* =====================================================
          FEEDER
      ===================================================== */}

      <rect
        x={cx - 58}
        y={feederY}
        width={116}
        height={24}
        rx={4}
        fill="#172033"
        stroke={safeFeederRunning ? "#22c55e" : inactiveColor}
        strokeWidth={2}
      />

      <line
        x1={cx - 45}
        y1={feederY + 12}
        x2={cx + 45}
        y2={feederY + 12}
        stroke={safeFeederRunning ? "#22c55e" : inactiveColor}
        strokeWidth={4}
      />

      {safeFeederRunning && (
        <line
          x1={cx - 35}
          y1={feederY + 5}
          x2={cx - 15}
          y2={feederY + 19}
          stroke="#94a3b8"
          strokeWidth={2}
        />
      )}

      <text
        x={cx}
        y={feederY + 42}
        textAnchor="middle"
        fill={safeFeederRunning ? "#22c55e" : "#64748b"}
        fontSize={valueSize - 1}
        fontWeight={600}
        fontFamily={fontFamily}
      >
        FEEDER {safeFeederRunning ? "RUN" : "STOP"}
      </text>

      {/* =====================================================
          PRODUCT FLOW
      ===================================================== */}

      {materialFlow && safeGateOpen && safeFeederRunning && (
        <g>
          {Array.from({ length: 9 }).map((_, index) => (
            <circle
              key={index}
              cx={cx + ((index % 5) - 2) * 7}
              cy={feederY + 27}
              r={1.8}
              fill={activeMaterialColor}
            >
              <animate
                attributeName="cy"
                values={`${feederY + 24};${feederY + 58}`}
                dur="0.8s"
                begin={`${index * 0.1}s`}
                repeatCount="indefinite"
              />

              <animate
                attributeName="opacity"
                values="1;0"
                dur="0.8s"
                begin={`${index * 0.1}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>
      )}

      {/* =====================================================
          DETAIL PANEL
      ===================================================== */}

      {isdetail && (
        <g>
          <rect
            x={12}
            y={height - 76}
            width={width - 24}
            height={56}
            rx={6}
            fill="#111c2d"
            stroke="#1f3b57"
          />

          <text
            x={24}
            y={height - 54}
            fill="#64748b"
            fontSize={valueSize - 1}
            fontFamily={fontFamily}
          >
            FEED
          </text>

          <text
            x={24}
            y={height - 34}
            fill={materialColor}
            fontSize={valueSize + 2}
            fontWeight={700}
            fontFamily={fontFamily}
          >
            {flow.toFixed(1)} {flowUnit}
          </text>

          <text
            x={width / 2}
            y={height - 54}
            textAnchor="middle"
            fill="#64748b"
            fontSize={valueSize - 1}
            fontFamily={fontFamily}
          >
            LEVEL
          </text>

          <text
            x={width / 2}
            y={height - 34}
            textAnchor="middle"
            fill={levelColor}
            fontSize={valueSize + 2}
            fontWeight={700}
            fontFamily={fontFamily}
          >
            {safeLevel.toFixed(1)} {levelUnit}
          </text>

          <text
            x={width - 24}
            y={height - 54}
            textAnchor="end"
            fill="#64748b"
            fontSize={valueSize - 1}
            fontFamily={fontFamily}
          >
            TEMP
          </text>

          <text
            x={width - 24}
            y={height - 34}
            textAnchor="end"
            fill="#f8fafc"
            fontSize={valueSize + 2}
            fontWeight={700}
            fontFamily={fontFamily}
          >
            {temperature.toFixed(1)} {temperatureUnit}
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
            y={height - 28}
            width={68}
            height={20}
            rx={4}
            fill={running ? "#172033" : "#16351f"}
            stroke={running ? "#475569" : "#22c55e"}
          />

          <text
            x={width - 54}
            y={height - 14}
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

export default FinishMillHopper;
