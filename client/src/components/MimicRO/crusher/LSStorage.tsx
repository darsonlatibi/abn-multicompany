import React from "react";

interface LSStorageProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;

  tag?: string;
  title?: string;

  level?: number;
  capacity?: number;
  flow?: number;
  temperature?: number;

  materialFlow?: boolean;
  running?: boolean;
  alarm?: boolean;
  highLevel?: boolean;
  lowLevel?: boolean;

  inletOpen?: boolean;
  outletOpen?: boolean;
  gateOpen?: boolean;

  levelUnit?: string;
  flowUnit?: string;
  temperatureUnit?: string;

  bodyColor?: string;
  frameColor?: string;
  materialColor?: string;
  inactiveColor?: string;
  alarmColor?: string;
  highLevelColor?: string;
  lowLevelColor?: string;

  fontSize?: number;
  isdetail?: boolean;

  sendCommand?: (command: string, value?: unknown) => void;
}

const LSStorage: React.FC<LSStorageProps> = ({
  x = 0,
  y = 0,
  width = 300,
  height = 380,

  tag = "LS-01",
  title = "LIMESTONE STORAGE",

  level = 65,
  capacity = 100,
  flow = 0,
  temperature = 30,

  materialFlow = true,
  running = true,
  alarm = false,
  highLevel = false,
  lowLevel = false,

  inletOpen = true,
  outletOpen = true,
  gateOpen = true,

  levelUnit = "%",
  flowUnit = "t/h",
  temperatureUnit = "°C",

  bodyColor = "#182433",
  frameColor = "#64748b",
  materialColor = "#d6c9a5",
  inactiveColor = "#475569",
  alarmColor = "#dc3545",
  highLevelColor = "#f59e0b",
  lowLevelColor = "#38bdf8",

  fontSize = 12,
  isdetail = false,

  sendCommand,
}) => {
  const cx = width / 2;

  const safeLevel = Math.max(0, Math.min(100, level));

  const actualCapacity = capacity > 0 ? capacity : 100;

  const statusText = alarm
    ? "ALARM"
    : highLevel
      ? "HIGH LEVEL"
      : lowLevel
        ? "LOW LEVEL"
        : running
          ? "RUNNING"
          : "STOPPED";

  const statusColor = alarm
    ? alarmColor
    : highLevel
      ? highLevelColor
      : lowLevel
        ? lowLevelColor
        : running
          ? "#22c55e"
          : inactiveColor;

  const bodyX = width * 0.18;
  const bodyY = height * 0.2;
  const bodyW = width * 0.64;
  const bodyH = height * 0.48;

  const materialMaxHeight = bodyH - 8;

  const materialHeight = (materialMaxHeight * safeLevel) / 100;

  const materialY = bodyY + bodyH - materialHeight;

  const inletColor = inletOpen && running ? "#22c55e" : inactiveColor;

  const outletColor = outletOpen && running ? "#22c55e" : inactiveColor;

  const gateColor = gateOpen && running ? "#22c55e" : inactiveColor;

  const handleCommand = () => {
    if (!sendCommand) return;

    sendCommand(running ? "STOP" : "START", {
      tag,
      source: "LSStorage",
    });
  };

  return (
    <g transform={`translate(${x}, ${y})`}>
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
        stroke={frameColor}
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
        fontSize={fontSize + 1}
        fontWeight={700}
      >
        {title}
      </text>

      <text
        x={width - 18}
        y={29}
        textAnchor="end"
        fill="#94a3b8"
        fontSize={fontSize - 1}
      >
        {tag}
      </text>

      {/* =====================================================
      STATUS
  ===================================================== */}

      <circle cx={18} cy={58} r={5} fill={statusColor} />

      {running && !alarm && (
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
        fontSize={fontSize - 1}
        fontWeight={700}
      >
        {statusText}
      </text>

      {/* =====================================================
      STORAGE ROOF
  ===================================================== */}

      <path
        d={`
      M ${bodyX - 4} ${bodyY + 18}
      L ${cx} ${bodyY - 8}
      L ${bodyX + bodyW + 4} ${bodyY + 18}
      Z
    `}
        fill="#263548"
        stroke={frameColor}
        strokeWidth={2}
      />

      {/* =====================================================
      STORAGE BODY
  ===================================================== */}

      <rect
        x={bodyX}
        y={bodyY}
        width={bodyW}
        height={bodyH}
        rx={4}
        fill={bodyColor}
        stroke={frameColor}
        strokeWidth={2}
      />

      {/* =====================================================
      MATERIAL
  ===================================================== */}

      <clipPath id={`ls-storage-clip-${tag}`}>
        <rect
          x={bodyX + 3}
          y={bodyY + 3}
          width={bodyW - 6}
          height={bodyH - 6}
          rx={2}
        />
      </clipPath>

      <g clipPath={`url(#ls-storage-clip-${tag})`}>
        <rect
          x={bodyX + 3}
          y={materialY}
          width={bodyW - 6}
          height={materialHeight}
          fill={materialFlow ? materialColor : inactiveColor}
          opacity={0.95}
        />

        {/* Material surface */}

        <ellipse
          cx={cx}
          cy={materialY}
          rx={bodyW * 0.43}
          ry={5}
          fill={materialFlow ? materialColor : inactiveColor}
          opacity={0.8}
        />

        {/* Material particles */}

        {materialFlow &&
          running &&
          [0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <circle
              key={i}
              cx={bodyX + 18 + ((i * 31) % Math.max(30, bodyW - 36))}
              cy={materialY - 6 - (i % 3) * 6}
              r={2}
              fill={materialColor}
              opacity={0.8}
            >
              <animate
                attributeName="cy"
                values={`
                ${materialY - 8};
                ${materialY + 5};
                ${materialY - 8}
              `}
                dur={`${1.2 + i * 0.12}s`}
                begin={`${i * 0.12}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
      </g>

      {/* =====================================================
      LEVEL INDICATOR
  ===================================================== */}

      <rect
        x={bodyX + bodyW + 12}
        y={bodyY}
        width={10}
        height={bodyH}
        rx={4}
        fill="#0f172a"
        stroke="#334155"
      />

      <rect
        x={bodyX + bodyW + 14}
        y={bodyY + bodyH - ((bodyH - 4) * safeLevel) / 100 - 2}
        width={6}
        height={((bodyH - 4) * safeLevel) / 100}
        rx={3}
        fill={highLevel ? highLevelColor : lowLevel ? lowLevelColor : "#00bfff"}
      />

      <text
        x={bodyX + bodyW + 17}
        y={bodyY - 7}
        textAnchor="middle"
        fill="#94a3b8"
        fontSize={fontSize - 3}
      >
        LV
      </text>

      {/* =====================================================
      LEVEL VALUE
  ===================================================== */}

      <text
        x={cx}
        y={bodyY + bodyH + 24}
        textAnchor="middle"
        fill="#f8fafc"
        fontSize={fontSize + 2}
        fontWeight={700}
      >
        {safeLevel.toFixed(0)} {levelUnit}
      </text>

      {/* =====================================================
      INLET
  ===================================================== */}

      <path
        d={`
      M ${cx - 22} ${bodyY - 20}
      L ${cx + 22} ${bodyY - 20}
      L ${cx + 16} ${bodyY + 5}
      L ${cx - 16} ${bodyY + 5}
      Z
    `}
        fill="#263548"
        stroke={frameColor}
        strokeWidth={2}
      />

      <line
        x1={cx}
        y1={bodyY - 35}
        x2={cx}
        y2={bodyY - 12}
        stroke={inletColor}
        strokeWidth={6}
        strokeLinecap="round"
      />

      {materialFlow && running && inletOpen && (
        <g>
          {[0, 1, 2, 3].map((i) => (
            <circle
              key={i}
              cx={cx + (i % 2 === 0 ? -5 : 5)}
              cy={bodyY - 28 + i * 6}
              r={2.5}
              fill={materialColor}
            >
              <animate
                attributeName="cy"
                values={`
                  ${bodyY - 30};
                  ${bodyY + 3}
                `}
                dur="0.8s"
                begin={`${i * 0.15}s`}
                repeatCount="indefinite"
              />

              <animate
                attributeName="opacity"
                values="1;0"
                dur="0.8s"
                begin={`${i * 0.15}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>
      )}

      <text
        x={cx}
        y={bodyY - 40}
        textAnchor="middle"
        fill="#94a3b8"
        fontSize={fontSize - 3}
      >
        LIMESTONE IN
      </text>

      {/* =====================================================
      OUTLET
  ===================================================== */}

      <line
        x1={cx}
        y1={bodyY + bodyH}
        x2={cx}
        y2={bodyY + bodyH + 34}
        stroke={outletColor}
        strokeWidth={7}
        strokeLinecap="round"
      />

      {/* =====================================================
      GATE
  ===================================================== */}

      <rect
        x={cx - 22}
        y={bodyY + bodyH + 8}
        width={44}
        height={14}
        rx={3}
        fill="#1e293b"
        stroke={gateColor}
        strokeWidth={2}
      />

      <line
        x1={cx - 14}
        y1={bodyY + bodyH + 11}
        x2={cx + 14}
        y2={bodyY + bodyH + 19}
        stroke={gateColor}
        strokeWidth={2}
      />

      <text
        x={cx + 38}
        y={bodyY + bodyH + 20}
        fill={gateColor}
        fontSize={fontSize - 3}
        fontWeight={700}
      >
        {gateOpen ? "OPEN" : "CLOSED"}
      </text>

      {/* =====================================================
      OUTLET MATERIAL FLOW
  ===================================================== */}

      {materialFlow && running && outletOpen && (
        <g>
          {[0, 1, 2, 3, 4].map((i) => (
            <circle
              key={i}
              cx={cx - 8 + (i % 3) * 8}
              cy={bodyY + bodyH + 38 + i * 5}
              r={2.5}
              fill={materialColor}
            >
              <animate
                attributeName="cy"
                values={`
                  ${bodyY + bodyH + 34};
                  ${bodyY + bodyH + 65}
                `}
                dur="0.7s"
                begin={`${i * 0.1}s`}
                repeatCount="indefinite"
              />

              <animate
                attributeName="opacity"
                values="1;0"
                dur="0.7s"
                begin={`${i * 0.1}s`}
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
            x={10}
            y={height - 76}
            width={width - 20}
            height={48}
            rx={6}
            fill="#0f172a"
            stroke="#334155"
          />

          {/* FLOW */}

          <text x={24} y={height - 57} fill="#94a3b8" fontSize={fontSize - 3}>
            FLOW
          </text>

          <text
            x={24}
            y={height - 39}
            fill="#f8fafc"
            fontSize={fontSize}
            fontWeight={700}
          >
            {flow.toFixed(1)} {flowUnit}
          </text>

          {/* CAPACITY */}

          <text
            x={cx}
            y={height - 57}
            textAnchor="middle"
            fill="#94a3b8"
            fontSize={fontSize - 3}
          >
            CAPACITY
          </text>

          <text
            x={cx}
            y={height - 39}
            textAnchor="middle"
            fill="#f8fafc"
            fontSize={fontSize}
            fontWeight={700}
          >
            {actualCapacity.toFixed(0)} t
          </text>

          {/* TEMPERATURE */}

          <text
            x={width - 24}
            y={height - 57}
            textAnchor="end"
            fill="#94a3b8"
            fontSize={fontSize - 3}
          >
            TEMP
          </text>

          <text
            x={width - 24}
            y={height - 39}
            textAnchor="end"
            fill="#f8fafc"
            fontSize={fontSize}
            fontWeight={700}
          >
            {temperature.toFixed(1)} {temperatureUnit}
          </text>
        </g>
      )}

      {/* =====================================================
      COMMAND BUTTON
  ===================================================== */}

      {sendCommand && (
        <g onClick={handleCommand} style={{ cursor: "pointer" }}>
          <rect
            x={width - 88}
            y={height - 25}
            width={68}
            height={19}
            rx={4}
            fill={running ? "#172033" : "#16351f"}
            stroke={running ? "#475569" : "#22c55e"}
          />

          <text
            x={width - 54}
            y={height - 12}
            textAnchor="middle"
            fill={running ? "#cbd5e1" : "#22c55e"}
            fontSize={fontSize - 3}
            fontWeight={700}
          >
            {running ? "STOP" : "START"}
          </text>
        </g>
      )}
    </g>
  );
};

export default LSStorage;
