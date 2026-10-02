import React from "react";

interface BeltConveyorProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;

  tag?: string;
  title?: string;

  flow?: number;
  speed?: number;
  angle?: number;

  materialFlow?: boolean;
  running?: boolean;
  alarm?: boolean;

  driveRunning?: boolean;

  flowUnit?: string;
  speedUnit?: string;

  direction?: "left" | "right";
  reverse?: boolean;

  beltWidth?: number;
  rollerCount?: number;

  materialColor?: string;
  beltColor?: string;
  frameColor?: string;
  rollerColor?: string;
  inactiveColor?: string;
  alarmColor?: string;

  fontFamily?: string;
  tagSize?: number;
  statusSize?: number;
  valueSize?: number;

  isdetail?: boolean;

  sendCommand?: (command: string, value?: unknown) => void;
}

const BeltConveyor: React.FC<BeltConveyorProps> = ({
  x = 0,
  y = 0,
  width = 500,
  height = 260,

  tag = "BC-101",
  title = "BELT CONVEYOR",

  flow = 125,
  speed = 1.2,
  angle = 0,

  materialFlow = true,
  running = true,
  alarm = false,

  driveRunning,

  flowUnit = "t/h",
  speedUnit = "m/s",

  direction = "right",
  reverse = false,

  beltWidth = 22,
  rollerCount = 7,

  materialColor = "#f4c542",
  beltColor = "#1f3b57",
  frameColor = "#64748b",
  rollerColor = "#94a3b8",
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

  const statusColor = alarm ? alarmColor : running ? "#28a745" : "#6c757d";

  const activeBeltColor = alarm
    ? alarmColor
    : running
      ? beltColor
      : inactiveColor;

  const actualDirection = reverse
    ? direction === "right"
      ? "left"
      : "right"
    : direction;

  const conveyorAngle = Math.max(-35, Math.min(35, angle));

  const handleCommand = () => {
    if (!sendCommand) return;

    sendCommand(running ? "STOP" : "START", {
      tag,
      source: "BeltConveyor",
    });
  };

  /*
   * ============================================================
   * DYNAMIC CONVEYOR GEOMETRY
   * ============================================================
   *
   * The conveyor is constructed horizontally around its center.
   * The complete equipment group is then rotated by `angle`.
   *
   * Positive angle  = rises toward right
   * Negative angle  = rises toward left
   *
   * This keeps the belt, rollers, material and frame synchronized.
   */

  const cx = width / 2;
  const conveyorY = 125;

  const leftX = 55;
  const rightX = width - 55;

  const beltTop = conveyorY - beltWidth / 2;
  const beltBottom = conveyorY + beltWidth / 2;

  const rollerRadius = 8;

  const rollerStep =
    rollerCount > 1 ? (rightX - leftX) / (rollerCount - 1) : rightX - leftX;

  const beltPath =
    actualDirection === "right"
      ? `M ${leftX} ${conveyorY}
         L ${rightX} ${conveyorY}`
      : `M ${rightX} ${conveyorY}
         L ${leftX} ${conveyorY}`;

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
            values="1;0.25;1"
            dur="0.8s"
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

      {/* =========================================================
          RUNNING INDICATOR
         ========================================================= */}

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
          CONVEYOR EQUIPMENT
         ========================================================= */}

      <g
        transform={`
          translate(${cx}, ${conveyorY})
          rotate(${conveyorAngle})
          translate(${-cx}, ${-conveyorY})
        `}
      >
        {/* =======================================================
            SUPPORT FRAME
           ======================================================= */}

        <line
          x1={leftX + 20}
          y1={beltBottom + 18}
          x2={leftX + 20}
          y2={beltBottom + 48}
          stroke={frameColor}
          strokeWidth={6}
        />

        <line
          x1={rightX - 20}
          y1={beltBottom + 18}
          x2={rightX - 20}
          y2={beltBottom + 48}
          stroke={frameColor}
          strokeWidth={6}
        />

        <line
          x1={leftX + 5}
          y1={beltBottom + 48}
          x2={leftX + 35}
          y2={beltBottom + 48}
          stroke={frameColor}
          strokeWidth={5}
        />

        <line
          x1={rightX - 35}
          y1={beltBottom + 48}
          x2={rightX - 5}
          y2={beltBottom + 48}
          stroke={frameColor}
          strokeWidth={5}
        />

        {/* Main frame */}

        <line
          x1={leftX}
          y1={beltBottom + 10}
          x2={rightX}
          y2={beltBottom + 10}
          stroke={frameColor}
          strokeWidth={6}
        />

        {/* =======================================================
            BELT BODY
           ======================================================= */}

        <rect
          x={leftX}
          y={beltTop}
          width={rightX - leftX}
          height={beltWidth}
          rx={beltWidth / 2}
          fill={activeBeltColor}
          stroke="#0b1220"
          strokeWidth={2}
        />

        {/* Belt top surface */}

        <line
          x1={leftX + 8}
          y1={beltTop + 5}
          x2={rightX - 8}
          y2={beltTop + 5}
          stroke="#355777"
          strokeWidth={3}
          opacity={0.8}
        />

        {/* =======================================================
            MATERIAL FLOW
           ======================================================= */}

        {materialFlow && (
          <>
            <path
              d={beltPath}
              fill="none"
              stroke={materialColor}
              strokeWidth={7}
              strokeLinecap="round"
              strokeDasharray="5 13"
            >
              <animate
                attributeName="stroke-dashoffset"
                values={actualDirection === "right" ? "0;-36" : "0;36"}
                dur="0.65s"
                repeatCount="indefinite"
              />
            </path>

            {/* Material particles */}

            {[0, 1, 2, 3, 4, 5].map((index) => {
              const particleX =
                actualDirection === "right"
                  ? leftX + 35 + index * 65
                  : rightX - 35 - index * 65;

              return (
                <circle
                  key={index}
                  cx={particleX}
                  cy={conveyorY - 6}
                  r={3}
                  fill={materialColor}
                >
                  <animate
                    attributeName="cx"
                    values={
                      actualDirection === "right"
                        ? `${particleX};${particleX + 45};${particleX + 90}`
                        : `${particleX};${particleX - 45};${particleX - 90}`
                    }
                    dur="1.4s"
                    begin={`${index * 0.18}s`}
                    repeatCount="indefinite"
                  />

                  <animate
                    attributeName="opacity"
                    values="0.2;1;0.2"
                    dur="1.4s"
                    begin={`${index * 0.18}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              );
            })}
          </>
        )}

        {/* =======================================================
            ROLLERS
           ======================================================= */}

        {Array.from({ length: rollerCount }).map((_, index) => {
          const rollerX = rollerCount > 1 ? leftX + index * rollerStep : cx;

          return (
            <g key={index}>
              <circle
                cx={rollerX}
                cy={beltBottom + 5}
                r={rollerRadius}
                fill="#111c2d"
                stroke={rollerColor}
                strokeWidth={2}
              />

              <circle
                cx={rollerX}
                cy={beltBottom + 5}
                r={3}
                fill={safeDriveRunning ? "#00bfff" : "#475569"}
              >
                {safeDriveRunning && !alarm && (
                  <animate
                    attributeName="opacity"
                    values="0.4;1;0.4"
                    dur="0.9s"
                    begin={`${index * 0.08}s`}
                    repeatCount="indefinite"
                  />
                )}
              </circle>
            </g>
          );
        })}

        {/* =======================================================
            DRIVE PULLEY
           ======================================================= */}

        <circle
          cx={actualDirection === "right" ? rightX : leftX}
          cy={conveyorY}
          r={18}
          fill="#111c2d"
          stroke={activeBeltColor}
          strokeWidth={4}
        />

        <circle
          cx={actualDirection === "right" ? rightX : leftX}
          cy={conveyorY}
          r={7}
          fill={safeDriveRunning ? "#28a745" : "#6c757d"}
        />

        {/* Drive rotation */}

        {safeDriveRunning && !alarm && (
          <circle
            cx={actualDirection === "right" ? rightX : leftX}
            cy={conveyorY}
            r={13}
            fill="none"
            stroke="#00bfff"
            strokeWidth={2}
            strokeDasharray="4 6"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0"
              to="360"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </circle>
        )}

        {/* =======================================================
            TAIL PULLEY
           ======================================================= */}

        <circle
          cx={actualDirection === "right" ? leftX : rightX}
          cy={conveyorY}
          r={14}
          fill="#111c2d"
          stroke={activeBeltColor}
          strokeWidth={3}
        />

        {/* =======================================================
            FLOW ARROW
           ======================================================= */}

        {materialFlow && (
          <path
            d={
              actualDirection === "right"
                ? `M ${rightX - 35} ${conveyorY - 25}
                   L ${rightX - 15} ${conveyorY - 25}
                   L ${rightX - 22} ${conveyorY - 32}
                   M ${rightX - 15} ${conveyorY - 25}
                   L ${rightX - 22} ${conveyorY - 18}`
                : `M ${leftX + 35} ${conveyorY - 25}
                   L ${leftX + 15} ${conveyorY - 25}
                   L ${leftX + 22} ${conveyorY - 32}
                   M ${leftX + 15} ${conveyorY - 25}
                   L ${leftX + 22} ${conveyorY - 18}`
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
        )}
      </g>

      {/* =========================================================
          ANGLE DISPLAY
         ========================================================= */}

      <g>
        <rect
          x={18}
          y={52}
          width={92}
          height={42}
          rx={6}
          fill="#111c2d"
          stroke="#1f3b57"
        />

        <text x={30} y={69} fill="#64748b" fontSize={9} fontFamily={fontFamily}>
          INCLINATION
        </text>

        <text
          x={30}
          y={85}
          fill="#00bfff"
          fontSize={14}
          fontWeight="bold"
          fontFamily={fontFamily}
        >
          {conveyorAngle.toFixed(1)}°
        </text>
      </g>

      {/* =========================================================
          DIRECTION
         ========================================================= */}

      <text
        x={cx}
        y={75}
        textAnchor="middle"
        fill="#94a3b8"
        fontSize={9}
        fontFamily={fontFamily}
      >
        MATERIAL →
      </text>

      {/* =========================================================
          DETAIL PANEL
         ========================================================= */}

      {isdetail && (
        <g>
          <rect
            x={18}
            y={height - 62}
            width={width - 170}
            height={46}
            rx={6}
            fill="#111c2d"
            stroke="#1f3b57"
          />

          {/* FLOW */}

          <text
            x={30}
            y={height - 43}
            fill="#64748b"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            FLOW
          </text>

          <text
            x={30}
            y={height - 25}
            fill={materialColor}
            fontSize={valueSize + 2}
            fontWeight="bold"
            fontFamily={fontFamily}
          >
            {flow.toLocaleString()} {flowUnit}
          </text>

          {/* SPEED */}

          <text
            x={125}
            y={height - 43}
            fill="#64748b"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            SPEED
          </text>

          <text
            x={125}
            y={height - 25}
            fill="#00bfff"
            fontSize={valueSize + 2}
            fontWeight="bold"
            fontFamily={fontFamily}
          >
            {speed.toFixed(2)} {speedUnit}
          </text>

          {/* ANGLE */}

          <text
            x={215}
            y={height - 43}
            fill="#64748b"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            ANGLE
          </text>

          <text
            x={215}
            y={height - 25}
            fill="#00ffff"
            fontSize={valueSize + 2}
            fontWeight="bold"
            fontFamily={fontFamily}
          >
            {conveyorAngle.toFixed(1)}°
          </text>
        </g>
      )}

      {/* =========================================================
          DRIVE STATUS
         ========================================================= */}

      <circle
        cx={width - 85}
        cy={height - 38}
        r={5}
        fill={safeDriveRunning ? "#28a745" : "#6c757d"}
      >
        {safeDriveRunning && !alarm && (
          <animate
            attributeName="opacity"
            values="0.4;1;0.4"
            dur="1s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      <text
        x={width - 73}
        y={height - 34}
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
        y={height - 8}
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
            x={width - 145}
            y={height - 82}
            width={125}
            height={25}
            rx={5}
            fill={running ? "#3b1820" : "#12351f"}
            stroke={running ? "#dc3545" : "#28a745"}
          />

          <text
            x={width - 82.5}
            y={height - 65}
            textAnchor="middle"
            fill={running ? "#ff6b6b" : "#5ee38b"}
            fontSize={9}
            fontWeight="bold"
            fontFamily={fontFamily}
          >
            {running ? "STOP CONVEYOR" : "START CONVEYOR"}
          </text>
        </g>
      )}

      {/* =========================================================
          ANGLE REFERENCE LINE
         ========================================================= */}

      <line
        x1={width - 135}
        y1={55}
        x2={width - 35}
        y2={55}
        stroke="#64748b"
        strokeWidth={1}
      />

      <line
        x1={width - 135}
        y1={55}
        x2={width - 135 + Math.cos((conveyorAngle * Math.PI) / 180) * 100}
        y2={55 - Math.sin((conveyorAngle * Math.PI) / 180) * 100}
        stroke="#00bfff"
        strokeWidth={3}
      />

      <text
        x={width - 135}
        y={72}
        fill="#64748b"
        fontSize={8}
        fontFamily={fontFamily}
      >
        ANGLE
      </text>
    </g>
  );
};

export default BeltConveyor;
