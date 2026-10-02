import React from "react";

interface CrusherHopperProps {
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

const CrusherHopper: React.FC<CrusherHopperProps> = ({
  x = 0,
  y = 0,
  width = 380,
  height = 320,

  tag = "CH-101",
  title = "CRUSHER HOPPER",

  level = 65,
  flow = 125,
  temperature = 35,

  materialFlow = true,
  running = true,
  alarm = false,
  highLevel = false,

  gateOpen,
  feederRunning,

  levelUnit = "%",
  flowUnit = "t/h",
  temperatureUnit = "°C",

  materialColor = "#f4c542",
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

  const statusColor = effectiveAlarm
    ? alarmColor
    : running
      ? "#28a745"
      : "#6c757d";

  const safeLevel = Math.max(0, Math.min(100, level));

  const levelColor =
    safeLevel >= 90 ? alarmColor : safeLevel >= 75 ? "#ff9500" : "#00bfff";

  const activeMaterialColor = effectiveAlarm
    ? alarmColor
    : materialFlow
      ? materialColor
      : inactiveColor;

  const handleCommand = () => {
    if (!sendCommand) return;

    sendCommand(running ? "STOP" : "START", {
      tag,
      source: "CrusherHopper",
    });
  };

  const cx = width / 2;

  const hopperTop = 62;
  const hopperBottom = 205;

  const hopperTopWidth = 250;
  const hopperBottomWidth = 105;

  const gateY = hopperBottom + 5;

  const feederY = gateY + 38;

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* =========================================================
          OUTER PANEL
         ========================================================= */}

      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        rx={10}
        fill="#0b1220"
        stroke={effectiveAlarm ? alarmColor : "#1f3b57"}
        strokeWidth={effectiveAlarm ? 2 : 1.5}
      >
        {effectiveAlarm && (
          <animate
            attributeName="stroke-opacity"
            values="1;0.2;1"
            dur="0.65s"
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
        height={30}
        rx={6}
        fill="#111c2d"
        stroke="#1f3b57"
      />

      <text
        x={24}
        y={30}
        fill="#00bfff"
        fontSize={tagSize}
        fontWeight="bold"
        fontFamily={fontFamily}
      >
        {tag}
      </text>

      <text
        x={cx}
        y={30}
        textAnchor="middle"
        fill="#d8dee9"
        fontSize={tagSize}
        fontWeight="bold"
        fontFamily={fontFamily}
      >
        {title}
      </text>

      <circle cx={width - 28} cy={25} r={6} fill={statusColor}>
        {running && !effectiveAlarm && (
          <animate
            attributeName="r"
            values="5;7;5"
            dur="1.2s"
            repeatCount="indefinite"
          />
        )}

        {effectiveAlarm && (
          <animate
            attributeName="opacity"
            values="1;0.15;1"
            dur="0.5s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      {/* =========================================================
          INLET CHUTE
         ========================================================= */}

      <path
        d={`
          M ${cx - 100} 48
          L ${cx + 100} 48
          L ${cx + 78} ${hopperTop}
          L ${cx - 78} ${hopperTop}
          Z
        `}
        fill="#111c2d"
        stroke="#1f3b57"
        strokeWidth={2}
      />

      <rect x={cx - 100} y={48} width={200} height={10} rx={3} fill="#1f3b57" />

      <text
        x={cx}
        y={42}
        textAnchor="middle"
        fill="#64748b"
        fontSize={8}
        fontFamily={fontFamily}
      >
        RAW MATERIAL INLET
      </text>

      {/* =========================================================
          HOPPER BODY
         ========================================================= */}

      <path
        d={`
          M ${cx - hopperTopWidth / 2} ${hopperTop}
          L ${cx + hopperTopWidth / 2} ${hopperTop}
          L ${cx + hopperBottomWidth / 2} ${hopperBottom}
          L ${cx - hopperBottomWidth / 2} ${hopperBottom}
          Z
        `}
        fill={hopperColor}
        stroke="#1f3b57"
        strokeWidth={3}
      />

      {/* Hopper reinforcement */}

      <line
        x1={cx - 125}
        y1={hopperTop + 8}
        x2={cx - 53}
        y2={hopperBottom - 5}
        stroke="#1f3b57"
        strokeWidth={3}
      />

      <line
        x1={cx + 125}
        y1={hopperTop + 8}
        x2={cx + 53}
        y2={hopperBottom - 5}
        stroke="#1f3b57"
        strokeWidth={3}
      />

      {/* =========================================================
          MATERIAL BED
         ========================================================= */}

      <path
        d={`
          M ${cx - 104} ${hopperTop + 65}
          Q ${cx - 55} ${hopperTop + 48}
            ${cx} ${hopperTop + 65}
          Q ${cx + 55} ${hopperTop + 48}
            ${cx + 104} ${hopperTop + 65}
          L ${cx + 68} ${hopperBottom - 12}
          L ${cx - 68} ${hopperBottom - 12}
          Z
        `}
        fill={materialFlow ? "#3d3215" : "#172235"}
        opacity={materialFlow ? 1 : 0.6}
      />

      {/* =========================================================
          MATERIAL FLOW
         ========================================================= */}

      {materialFlow && (
        <>
          <path
            d={`
              M ${cx} ${hopperTop + 55}
              L ${cx} ${hopperBottom + 35}
            `}
            stroke={activeMaterialColor}
            strokeWidth={13}
            strokeLinecap="round"
            strokeDasharray="5 12"
            opacity={0.9}
          >
            {running && (
              <animate
                attributeName="stroke-dashoffset"
                values="0;-34"
                dur="0.75s"
                repeatCount="indefinite"
              />
            )}
          </path>

          {[85, 112, 140, 168].map((py, index) => (
            <circle
              key={index}
              cx={cx + (index % 2 === 0 ? -10 : 10)}
              cy={py}
              r={3}
              fill={materialColor}
            >
              {running && (
                <>
                  <animate
                    attributeName="cy"
                    values={`${py};${py + 20};${py}`}
                    dur="1.1s"
                    begin={`${index * 0.16}s`}
                    repeatCount="indefinite"
                  />

                  <animate
                    attributeName="opacity"
                    values="0.25;1;0.25"
                    dur="1.1s"
                    begin={`${index * 0.16}s`}
                    repeatCount="indefinite"
                  />
                </>
              )}
            </circle>
          ))}
        </>
      )}

      {/* =========================================================
          HOPPER LABEL
         ========================================================= */}

      <text
        x={cx}
        y={hopperTop + 32}
        textAnchor="middle"
        fill="#f4c542"
        fontSize={10}
        fontWeight="bold"
        fontFamily={fontFamily}
      >
        RAW MATERIAL
      </text>

      <text
        x={cx}
        y={hopperTop + 47}
        textAnchor="middle"
        fill="#94a3b8"
        fontSize={8}
        fontFamily={fontFamily}
      >
        CRUSHER FEED
      </text>

      {/* =========================================================
          LEVEL INDICATOR
         ========================================================= */}

      <g>
        <rect
          x={width - 55}
          y={hopperTop + 10}
          width={20}
          height={125}
          rx={5}
          fill="#111c2d"
          stroke="#1f3b57"
        />

        <rect
          x={width - 50}
          y={hopperTop + 15 + 115 * (1 - safeLevel / 100)}
          width={10}
          height={115 * (safeLevel / 100)}
          rx={3}
          fill={levelColor}
        />

        <text
          x={width - 45}
          y={hopperTop - 2}
          textAnchor="middle"
          fill="#64748b"
          fontSize={8}
          fontFamily={fontFamily}
        >
          LVL
        </text>

        <text
          x={width - 45}
          y={hopperBottom - 2}
          textAnchor="middle"
          fill="#d8dee9"
          fontSize={8}
          fontWeight="bold"
          fontFamily={fontFamily}
        >
          {safeLevel.toFixed(0)}%
        </text>
      </g>

      {/* High level marker */}

      <line
        x1={cx - 110}
        y1={hopperTop + 30}
        x2={cx + 110}
        y2={hopperTop + 30}
        stroke={safeLevel >= 90 ? alarmColor : "#475569"}
        strokeWidth={safeLevel >= 90 ? 2 : 1}
        strokeDasharray="5 5"
      />

      <text
        x={cx + 115}
        y={hopperTop + 33}
        fill={safeLevel >= 90 ? alarmColor : "#64748b"}
        fontSize={7}
        fontFamily={fontFamily}
      >
        HH
      </text>

      {/* =========================================================
          DISCHARGE GATE
         ========================================================= */}

      <g transform={`translate(${cx}, ${gateY})`}>
        <rect
          x={-65}
          y={0}
          width={130}
          height={18}
          rx={4}
          fill="#0b1220"
          stroke="#1f3b57"
          strokeWidth={2}
        />

        <rect
          x={safeGateOpen ? -45 : -8}
          y={-5}
          width={53}
          height={28}
          rx={3}
          fill={safeGateOpen ? "#28a745" : gateColor}
          opacity={0.9}
        />

        <line
          x1={0}
          y1={-5}
          x2={0}
          y2={23}
          stroke="#d8dee9"
          strokeWidth={2}
          opacity={0.65}
        />
      </g>

      <text
        x={cx}
        y={gateY + 31}
        textAnchor="middle"
        fill={safeGateOpen ? "#28a745" : "#94a3b8"}
        fontSize={8}
        fontWeight="bold"
        fontFamily={fontFamily}
      >
        {safeGateOpen ? "GATE OPEN" : "GATE CLOSED"}
      </text>

      {/* =========================================================
          FEEDER
         ========================================================= */}

      <g>
        <rect
          x={cx - 82}
          y={feederY}
          width={164}
          height={42}
          rx={7}
          fill="#111c2d"
          stroke="#1f3b57"
          strokeWidth={2}
        />

        <line
          x1={cx - 62}
          y1={feederY + 21}
          x2={cx + 62}
          y2={feederY + 21}
          stroke="#64748b"
          strokeWidth={6}
        />

        {[-45, -15, 15, 45].map((px, index) => (
          <rect
            key={index}
            x={cx + px - 5}
            y={feederY + 5}
            width={10}
            height={32}
            rx={2}
            fill="#1f3b57"
          />
        ))}

        {safeFeederRunning && !effectiveAlarm && (
          <line
            x1={cx - 60}
            y1={feederY + 21}
            x2={cx + 60}
            y2={feederY + 21}
            stroke="#00bfff"
            strokeWidth={2}
            strokeDasharray="4 8"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="0;-24"
              dur="0.5s"
              repeatCount="indefinite"
            />
          </line>
        )}
      </g>

      <text
        x={cx}
        y={feederY + 57}
        textAnchor="middle"
        fill="#64748b"
        fontSize={8}
        fontFamily={fontFamily}
      >
        FEEDER TO CRUSHER
      </text>

      {/* =========================================================
          OUTLET MATERIAL
         ========================================================= */}

      {materialFlow && safeGateOpen && (
        <line
          x1={cx}
          y1={feederY + 64}
          x2={cx}
          y2={height - 92}
          stroke={materialColor}
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray="4 10"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="0;-28"
            dur="0.65s"
            repeatCount="indefinite"
          />
        </line>
      )}

      <text
        x={cx}
        y={height - 82}
        textAnchor="middle"
        fill="#64748b"
        fontSize={8}
        fontFamily={fontFamily}
      >
        TO CRUSHER
      </text>

      {/* =========================================================
          DETAIL PANEL
         ========================================================= */}

      {isdetail && (
        <g>
          <rect
            x={15}
            y={height - 70}
            width={width - 30}
            height={50}
            rx={6}
            fill="#111c2d"
            stroke="#1f3b57"
          />

          {/* FLOW */}

          <text
            x={28}
            y={height - 50}
            fill="#64748b"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            FLOW
          </text>

          <text
            x={28}
            y={height - 31}
            fill={materialColor}
            fontSize={valueSize + 2}
            fontWeight="bold"
            fontFamily={fontFamily}
          >
            {flow.toLocaleString()} {flowUnit}
          </text>

          {/* LEVEL */}

          <text
            x={135}
            y={height - 50}
            fill="#64748b"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            LEVEL
          </text>

          <text
            x={135}
            y={height - 31}
            fill={levelColor}
            fontSize={valueSize + 2}
            fontWeight="bold"
            fontFamily={fontFamily}
          >
            {safeLevel.toFixed(0)} {levelUnit}
          </text>

          {/* TEMPERATURE */}

          <text
            x={230}
            y={height - 50}
            fill="#64748b"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            TEMP
          </text>

          <text
            x={230}
            y={height - 31}
            fill="#00bfff"
            fontSize={valueSize + 2}
            fontWeight="bold"
            fontFamily={fontFamily}
          >
            {temperature.toFixed(1)} {temperatureUnit}
          </text>
        </g>
      )}

      {/* =========================================================
          STATUS
         ========================================================= */}

      <text
        x={18}
        y={height - 7}
        fill={statusColor}
        fontSize={statusSize}
        fontWeight="bold"
        fontFamily={fontFamily}
      >
        {highLevel
          ? "● HIGH LEVEL"
          : alarm
            ? "● ALARM"
            : running
              ? "● RUNNING"
              : "● STOPPED"}
      </text>

      {/* =========================================================
          COMMAND
         ========================================================= */}

      {sendCommand && (
        <g onClick={handleCommand} style={{ cursor: "pointer" }}>
          <rect
            x={width - 145}
            y={height - 17}
            width={125}
            height={24}
            rx={5}
            fill={running ? "#3b1820" : "#12351f"}
            stroke={running ? "#dc3545" : "#28a745"}
          />

          <text
            x={width - 82.5}
            y={height}
            textAnchor="middle"
            fill={running ? "#ff6b6b" : "#5ee38b"}
            fontSize={9}
            fontWeight="bold"
            fontFamily={fontFamily}
          >
            {running ? "STOP HOPPER" : "START HOPPER"}
          </text>
        </g>
      )}
    </g>
  );
};

export default CrusherHopper;
