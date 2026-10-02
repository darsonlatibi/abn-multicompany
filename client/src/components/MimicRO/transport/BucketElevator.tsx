import React from "react";

interface BucketElevatorProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;

  tag?: string;
  title?: string;

  flow?: number;
  speed?: number;
  level?: number;

  materialFlow?: boolean;
  running?: boolean;
  alarm?: boolean;

  driveRunning?: boolean;
  inletOpen?: boolean;
  outletOpen?: boolean;

  direction?: "up" | "down";
  reverse?: boolean;

  flowUnit?: string;
  speedUnit?: string;
  levelUnit?: string;

  materialColor?: string;
  casingColor?: string;
  beltColor?: string;
  bucketColor?: string;
  frameColor?: string;
  inactiveColor?: string;
  alarmColor?: string;

  fontFamily?: string;
  tagSize?: number;
  statusSize?: number;
  valueSize?: number;

  isdetail?: boolean;

  sendCommand?: (command: string, value?: unknown) => void;
}

const BucketElevator: React.FC<BucketElevatorProps> = ({
  x = 0,
  y = 0,
  width = 360,
  height = 520,

  tag = "BE-101",
  title = "BUCKET ELEVATOR",

  flow = 125,
  speed = 1.8,
  level = 65,

  materialFlow = true,
  running = true,
  alarm = false,

  driveRunning,
  inletOpen,
  outletOpen,

  direction = "up",
  reverse = false,

  flowUnit = "t/h",
  speedUnit = "m/s",
  levelUnit = "%",

  materialColor = "#f4c542",
  casingColor = "#111c2d",
  beltColor = "#1f3b57",
  bucketColor = "#64748b",

  inactiveColor = "#475569",
  alarmColor = "#dc3545",

  fontFamily = "Arial",
  tagSize = 12,
  statusSize = 11,
  valueSize = 10,

  isdetail = true,

  sendCommand,
}) => {
  const safeDriveRunning = driveRunning ?? running;
  const safeInletOpen = inletOpen ?? running;
  const safeOutletOpen = outletOpen ?? running;

  const statusColor = alarm ? alarmColor : running ? "#28a745" : "#6c757d";

  const activeBeltColor = alarm
    ? alarmColor
    : running
      ? beltColor
      : inactiveColor;

  const actualDirection = reverse
    ? direction === "up"
      ? "down"
      : "up"
    : direction;

  const safeLevel = Math.max(0, Math.min(100, level));

  const cx = width / 2;

  const casingWidth = 105;
  const casingX = cx - casingWidth / 2;

  const elevatorTop = 75;
  const elevatorBottom = height - 125;

  const elevatorHeight = elevatorBottom - elevatorTop;

  const pulleyRadius = 30;

  const handleCommand = () => {
    if (!sendCommand) return;

    sendCommand(running ? "STOP" : "START", {
      tag,
      source: "BucketElevator",
    });
  };

  /*
   * ============================================================
   * BUCKET ELEVATOR GEOMETRY
   * ============================================================
   *
   *       ┌──────────────┐
   *       │   HEAD       │
   *       │    ○ DRIVE   │
   *       └──────┬───────┘
   *              │
   *          ↑ ↑ ↑
   *          BUCKETS
   *              │
   *              │
   *       ┌──────┴───────┐
   *       │    BOOT      │
   *       │      ○       │
   *       └──────────────┘
   *
   * Material enters boot,
   * buckets transport material upward,
   * discharge occurs at head.
   */

  const bucketCount = Math.max(7, Math.floor(elevatorHeight / 42));

  const bucketSpacing = elevatorHeight / bucketCount;

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
        stroke={alarm ? alarmColor : "#1f3b57"}
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

      {/* Status lamp */}

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
          HEAD SECTION
         ========================================================= */}

      <rect
        x={casingX - 18}
        y={elevatorTop - 15}
        width={casingWidth + 36}
        height={70}
        rx={8}
        fill={casingColor}
        stroke="#1f3b57"
        strokeWidth={2}
      />

      {/* Head top cover */}

      <rect
        x={casingX - 12}
        y={elevatorTop - 25}
        width={casingWidth + 24}
        height={18}
        rx={4}
        fill="#1f3b57"
      />

      {/* =========================================================
          DRIVE MOTOR
         ========================================================= */}

      <g
        transform={`translate(${casingX + casingWidth + 35}, ${elevatorTop + 20})`}
      >
        <rect
          x={-25}
          y={-17}
          width={50}
          height={34}
          rx={6}
          fill="#111c2d"
          stroke={safeDriveRunning ? "#28a745" : "#64748b"}
          strokeWidth={2}
        />

        <circle
          cx={0}
          cy={0}
          r={10}
          fill={safeDriveRunning ? "#28a745" : "#6c757d"}
        >
          {safeDriveRunning && !alarm && (
            <animate
              attributeName="opacity"
              values="0.45;1;0.45"
              dur="0.8s"
              repeatCount="indefinite"
            />
          )}
        </circle>

        <text
          x={0}
          y={32}
          textAnchor="middle"
          fill="#64748b"
          fontSize={8}
          fontFamily={fontFamily}
        >
          DRIVE
        </text>
      </g>

      {/* =========================================================
          HEAD PULLEY
         ========================================================= */}

      <circle
        cx={cx}
        cy={elevatorTop + 20}
        r={pulleyRadius}
        fill="#0b1220"
        stroke={activeBeltColor}
        strokeWidth={5}
      />

      <circle cx={cx} cy={elevatorTop + 20} r={9} fill="#64748b" />

      {/* Rotating head pulley */}

      {safeDriveRunning && !alarm && (
        <circle
          cx={cx}
          cy={elevatorTop + 20}
          r={21}
          fill="none"
          stroke="#00bfff"
          strokeWidth={2}
          strokeDasharray="5 8"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0"
            to="360"
            dur="1.4s"
            repeatCount="indefinite"
          />
        </circle>
      )}

      {/* =========================================================
          MAIN ELEVATOR CASING
         ========================================================= */}

      <rect
        x={casingX}
        y={elevatorTop + 48}
        width={casingWidth}
        height={elevatorHeight - 60}
        rx={5}
        fill={casingColor}
        stroke="#1f3b57"
        strokeWidth={2}
      />

      {/* Casing center highlight */}

      <line
        x1={cx}
        y1={elevatorTop + 60}
        x2={cx}
        y2={elevatorBottom - 20}
        stroke="#1f3b57"
        strokeWidth={2}
        opacity={0.7}
      />

      {/* =========================================================
          INNER BELT
         ========================================================= */}

      <rect
        x={cx - 9}
        y={elevatorTop + 52}
        width={18}
        height={elevatorHeight - 68}
        rx={8}
        fill={activeBeltColor}
      />

      {/* =========================================================
          BUCKETS
         ========================================================= */}

      {Array.from({ length: bucketCount }).map((_, index) => {
        const baseY = elevatorBottom - 20 - index * bucketSpacing;

        const bucketY =
          actualDirection === "up"
            ? baseY
            : elevatorTop + 65 + index * bucketSpacing;

        const bucketW = 38;
        const bucketH = 18;

        return (
          <g key={index}>
            <path
              d={`
                M ${cx - bucketW / 2} ${bucketY}
                L ${cx + bucketW / 2} ${bucketY}
                L ${cx + bucketW / 2 - 5} ${bucketY + bucketH}
                L ${cx - bucketW / 2 + 5} ${bucketY + bucketH}
                Z
              `}
              fill={bucketColor}
              stroke="#0b1220"
              strokeWidth={1.5}
            />

            {/* Bucket material */}

            {materialFlow && (
              <rect
                x={cx - 13}
                y={bucketY + 7}
                width={26}
                height={5}
                rx={2}
                fill={materialColor}
                opacity={0.9}
              >
                {safeDriveRunning && (
                  <animate
                    attributeName="opacity"
                    values="0.35;1;0.35"
                    dur="1s"
                    begin={`${index * 0.08}s`}
                    repeatCount="indefinite"
                  />
                )}
              </rect>
            )}
          </g>
        );
      })}

      {/* =========================================================
          BUCKET MOTION HIGHLIGHT
         ========================================================= */}

      {materialFlow && safeDriveRunning && !alarm && (
        <line
          x1={cx}
          y1={elevatorBottom - 35}
          x2={cx}
          y2={elevatorTop + 65}
          stroke={materialColor}
          strokeWidth={3}
          strokeDasharray="4 16"
          opacity={0.55}
        >
          <animate
            attributeName="stroke-dashoffset"
            values={actualDirection === "up" ? "0;-40" : "0;40"}
            dur="0.8s"
            repeatCount="indefinite"
          />
        </line>
      )}

      {/* =========================================================
          BOOT / BOTTOM SECTION
         ========================================================= */}

      <path
        d={`
          M ${casingX - 18} ${elevatorBottom - 5}
          L ${casingX - 5} ${elevatorBottom + 55}
          Q ${cx} ${elevatorBottom + 82}
            ${casingX + casingWidth + 5} ${elevatorBottom + 55}
          L ${casingX + casingWidth + 18} ${elevatorBottom - 5}
          Z
        `}
        fill={casingColor}
        stroke="#1f3b57"
        strokeWidth={2}
      />

      {/* Bottom pulley */}

      <circle
        cx={cx}
        cy={elevatorBottom + 40}
        r={pulleyRadius}
        fill="#0b1220"
        stroke={activeBeltColor}
        strokeWidth={4}
      />

      <circle cx={cx} cy={elevatorBottom + 40} r={8} fill="#64748b" />

      {/* =========================================================
          INLET
         ========================================================= */}

      <path
        d={`
          M ${casingX - 75} ${elevatorBottom + 55}
          L ${casingX - 18} ${elevatorBottom + 35}
          L ${casingX - 18} ${elevatorBottom + 70}
          L ${casingX - 75} ${elevatorBottom + 70}
          Z
        `}
        fill="#111c2d"
        stroke="#1f3b57"
        strokeWidth={2}
      />

      {/* Inlet material */}

      {materialFlow && safeInletOpen && (
        <line
          x1={casingX - 70}
          y1={elevatorBottom + 53}
          x2={casingX - 20}
          y2={elevatorBottom + 53}
          stroke={materialColor}
          strokeWidth={7}
          strokeDasharray="5 10"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="0;-30"
            dur="0.7s"
            repeatCount="indefinite"
          />
        </line>
      )}

      {/* Inlet status */}

      <circle
        cx={casingX - 58}
        cy={elevatorBottom + 82}
        r={4}
        fill={safeInletOpen ? "#28a745" : "#6c757d"}
      />

      <text
        x={casingX - 48}
        y={elevatorBottom + 86}
        fill="#94a3b8"
        fontSize={8}
        fontFamily={fontFamily}
      >
        INLET
      </text>

      {/* =========================================================
          HEAD DISCHARGE
         ========================================================= */}

      <path
        d={`
          M ${casingX + casingWidth + 18} ${elevatorTop + 5}
          L ${casingX + casingWidth + 75} ${elevatorTop - 15}
          L ${casingX + casingWidth + 75} ${elevatorTop + 18}
          L ${casingX + casingWidth + 18} ${elevatorTop + 38}
          Z
        `}
        fill="#111c2d"
        stroke="#1f3b57"
        strokeWidth={2}
      />

      {/* Discharge material */}

      {materialFlow && safeOutletOpen && (
        <line
          x1={casingX + casingWidth + 22}
          y1={elevatorTop + 20}
          x2={casingX + casingWidth + 70}
          y2={elevatorTop + 2}
          stroke={materialColor}
          strokeWidth={7}
          strokeDasharray="5 9"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="0;-28"
            dur="0.65s"
            repeatCount="indefinite"
          />
        </line>
      )}

      {/* Outlet status */}

      <circle
        cx={casingX + casingWidth + 45}
        cy={elevatorTop - 35}
        r={4}
        fill={safeOutletOpen ? "#28a745" : "#6c757d"}
      />

      <text
        x={casingX + casingWidth + 54}
        y={elevatorTop - 32}
        fill="#94a3b8"
        fontSize={8}
        fontFamily={fontFamily}
      >
        OUTLET
      </text>

      {/* =========================================================
          FLOW DIRECTION
         ========================================================= */}

      <g>
        <text
          x={cx - 85}
          y={elevatorTop + 100}
          fill={materialColor}
          fontSize={10}
          fontWeight="bold"
          fontFamily={fontFamily}
        >
          {actualDirection === "up" ? "↑ MATERIAL" : "↓ MATERIAL"}
        </text>

        <path
          d={
            actualDirection === "up"
              ? `
                M ${cx - 55} ${elevatorTop + 110}
                L ${cx - 55} ${elevatorTop + 80}
                M ${cx - 62} ${elevatorTop + 88}
                L ${cx - 55} ${elevatorTop + 80}
                L ${cx - 48} ${elevatorTop + 88}
              `
              : `
                M ${cx - 55} ${elevatorTop + 80}
                L ${cx - 55} ${elevatorTop + 110}
                M ${cx - 62} ${elevatorTop + 102}
                L ${cx - 55} ${elevatorTop + 110}
                L ${cx - 48} ${elevatorTop + 102}
              `
          }
          fill="none"
          stroke={materialColor}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <animate
            attributeName="opacity"
            values="0.25;1;0.25"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </path>
      </g>

      {/* =========================================================
          LEVEL INDICATOR
         ========================================================= */}

      <g>
        <rect
          x={width - 72}
          y={elevatorTop + 70}
          width={22}
          height={elevatorHeight - 100}
          rx={5}
          fill="#111c2d"
          stroke="#1f3b57"
        />

        <rect
          x={width - 67}
          y={elevatorTop + 75 + (elevatorHeight - 110) * (1 - safeLevel / 100)}
          width={12}
          height={(elevatorHeight - 110) * (safeLevel / 100)}
          rx={3}
          fill={
            safeLevel >= 90
              ? "#dc3545"
              : safeLevel >= 75
                ? "#ff9500"
                : "#00bfff"
          }
        />

        <text
          x={width - 61}
          y={elevatorTop + 55}
          textAnchor="middle"
          fill="#64748b"
          fontSize={8}
          fontFamily={fontFamily}
        >
          LVL
        </text>

        <text
          x={width - 61}
          y={elevatorBottom - 25}
          textAnchor="middle"
          fill="#d8dee9"
          fontSize={9}
          fontWeight="bold"
          fontFamily={fontFamily}
        >
          {safeLevel.toFixed(0)}%
        </text>
      </g>

      {/* =========================================================
          DETAIL PANEL
         ========================================================= */}

      {isdetail && (
        <g>
          <rect
            x={15}
            y={height - 78}
            width={width - 30}
            height={58}
            rx={6}
            fill="#111c2d"
            stroke="#1f3b57"
          />

          {/* FLOW */}

          <text
            x={28}
            y={height - 56}
            fill="#64748b"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            FLOW
          </text>

          <text
            x={28}
            y={height - 36}
            fill={materialColor}
            fontSize={valueSize + 2}
            fontWeight="bold"
            fontFamily={fontFamily}
          >
            {flow.toLocaleString()} {flowUnit}
          </text>

          {/* SPEED */}

          <text
            x={120}
            y={height - 56}
            fill="#64748b"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            SPEED
          </text>

          <text
            x={120}
            y={height - 36}
            fill="#00bfff"
            fontSize={valueSize + 2}
            fontWeight="bold"
            fontFamily={fontFamily}
          >
            {speed.toFixed(2)} {speedUnit}
          </text>

          {/* LEVEL */}

          <text
            x={215}
            y={height - 56}
            fill="#64748b"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            LEVEL
          </text>

          <text
            x={215}
            y={height - 36}
            fill="#00ffff"
            fontSize={valueSize + 2}
            fontWeight="bold"
            fontFamily={fontFamily}
          >
            {safeLevel.toFixed(0)} {levelUnit}
          </text>
        </g>
      )}

      {/* =========================================================
          DRIVE STATUS
         ========================================================= */}

      <circle
        cx={width - 92}
        cy={height - 12}
        r={5}
        fill={safeDriveRunning ? "#28a745" : "#6c757d"}
      />

      <text
        x={width - 80}
        y={height - 8}
        fill="#94a3b8"
        fontSize={statusSize}
        fontFamily={fontFamily}
      >
        DRIVE
      </text>

      {/* =========================================================
          MAIN STATUS
         ========================================================= */}

      <text
        x={18}
        y={height - 12}
        fill={statusColor}
        fontSize={statusSize}
        fontWeight="bold"
        fontFamily={fontFamily}
      >
        {alarm ? "● ALARM" : running ? "● RUNNING" : "● STOPPED"}
      </text>

      {/* =========================================================
          COMMAND
         ========================================================= */}

      {sendCommand && (
        <g onClick={handleCommand} style={{ cursor: "pointer" }}>
          <rect
            x={width - 180}
            y={height - 55}
            width={155}
            height={25}
            rx={5}
            fill={running ? "#3b1820" : "#12351f"}
            stroke={running ? "#dc3545" : "#28a745"}
          />

          <text
            x={width - 102.5}
            y={height - 38}
            textAnchor="middle"
            fill={running ? "#ff6b6b" : "#5ee38b"}
            fontSize={9}
            fontWeight="bold"
            fontFamily={fontFamily}
          >
            {running ? "STOP ELEVATOR" : "START ELEVATOR"}
          </text>
        </g>
      )}
    </g>
  );
};

export default BucketElevator;
