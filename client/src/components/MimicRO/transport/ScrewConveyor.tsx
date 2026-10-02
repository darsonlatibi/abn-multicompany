import React from "react";

interface ScrewConveyorProps {
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

  direction?: "left" | "right";
  reverse?: boolean;

  flowUnit?: string;
  speedUnit?: string;

  screwDiameter?: number;
  flightCount?: number;

  materialColor?: string;
  casingColor?: string;
  screwColor?: string;
  shaftColor?: string;
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

const ScrewConveyor: React.FC<ScrewConveyorProps> = ({
  x = 0,
  y = 0,
  width = 500,
  height = 260,

  tag = "SC-101",
  title = "SCREW CONVEYOR",

  flow = 80,
  speed = 1.2,
  angle = 0,

  materialFlow = true,
  running = true,
  alarm = false,

  driveRunning,

  direction = "right",
  reverse = false,

  flowUnit = "t/h",
  speedUnit = "rpm",

  screwDiameter = 42,
  flightCount = 9,

  materialColor = "#f4c542",
  casingColor = "#111c2d",
  screwColor = "#64748b",
  shaftColor = "#94a3b8",
  frameColor = "#64748b",
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

  const activeCasingColor = alarm
    ? "#351820"
    : running
      ? casingColor
      : "#0f172a";

  const activeScrewColor = alarm
    ? alarmColor
    : running
      ? screwColor
      : inactiveColor;

  const actualDirection = reverse
    ? direction === "right"
      ? "left"
      : "right"
    : direction;

  // Prevent extreme visual distortion.
  const conveyorAngle = Math.max(-35, Math.min(35, angle));

  const cx = width / 2;
  const conveyorY = 125;

  const leftX = 58;
  const rightX = width - 58;

  const conveyorLength = rightX - leftX;

  const casingHeight = 58;

  const handleCommand = () => {
    if (!sendCommand) return;

    sendCommand(running ? "STOP" : "START", {
      tag,
      source: "ScrewConveyor",
    });
  };

  /*
   * ============================================================
   * SCREW CONVEYOR
   * ============================================================
   *
   * Positive angle:
   *      rises toward the RIGHT
   *
   * Negative angle:
   *      rises toward the LEFT
   *
   * The entire screw assembly rotates around its center so:
   *
   *   casing
   *   screw shaft
   *   flights
   *   material
   *   drive
   *   supports
   *
   * remain aligned.
   */

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

      {/* Status */}

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
          ANGLE INFO
         ========================================================= */}

      <rect
        x={18}
        y={52}
        width={96}
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

      {/* =========================================================
          CONVEYOR ASSEMBLY
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
          x1={leftX + 35}
          y1={conveyorY + 38}
          x2={leftX + 35}
          y2={conveyorY + 78}
          stroke={frameColor}
          strokeWidth={6}
        />

        <line
          x1={rightX - 35}
          y1={conveyorY + 38}
          x2={rightX - 35}
          y2={conveyorY + 78}
          stroke={frameColor}
          strokeWidth={6}
        />

        <line
          x1={leftX + 15}
          y1={conveyorY + 78}
          x2={leftX + 55}
          y2={conveyorY + 78}
          stroke={frameColor}
          strokeWidth={5}
        />

        <line
          x1={rightX - 55}
          y1={conveyorY + 78}
          x2={rightX - 15}
          y2={conveyorY + 78}
          stroke={frameColor}
          strokeWidth={5}
        />

        {/* =======================================================
            MAIN CASING
           ======================================================= */}

        <rect
          x={leftX}
          y={conveyorY - casingHeight / 2}
          width={conveyorLength}
          height={casingHeight}
          rx={casingHeight / 2}
          fill={activeCasingColor}
          stroke="#1f3b57"
          strokeWidth={2}
        />

        {/* Casing highlight */}

        <line
          x1={leftX + 20}
          y1={conveyorY - 19}
          x2={rightX - 20}
          y2={conveyorY - 19}
          stroke="#355777"
          strokeWidth={3}
          opacity={0.75}
        />

        {/* =======================================================
            INTERNAL SHAFT
           ======================================================= */}

        <line
          x1={leftX + 15}
          y1={conveyorY}
          x2={rightX - 15}
          y2={conveyorY}
          stroke={shaftColor}
          strokeWidth={6}
        />

        {/* =======================================================
            SCREW FLIGHTS
           ======================================================= */}

        {Array.from({ length: flightCount }).map((_, index) => {
          const flightX =
            flightCount > 1
              ? leftX + 25 + index * ((conveyorLength - 50) / (flightCount - 1))
              : cx;

          return (
            <g key={index}>
              <ellipse
                cx={flightX}
                cy={conveyorY}
                rx={screwDiameter / 2}
                ry={screwDiameter / 3}
                fill="none"
                stroke={activeScrewColor}
                strokeWidth={4}
              />

              <line
                x1={flightX - screwDiameter / 2}
                y1={conveyorY + 8}
                x2={flightX + screwDiameter / 2}
                y2={conveyorY - 8}
                stroke={activeScrewColor}
                strokeWidth={3}
              />
            </g>
          );
        })}

        {/* =======================================================
            SCREW ROTATION
           ======================================================= */}

        {safeDriveRunning && !alarm && (
          <g>
            {Array.from({ length: 4 }).map((_, index) => (
              <line
                key={index}
                x1={leftX + 50 + index * ((conveyorLength - 100) / 3)}
                y1={conveyorY - 13}
                x2={leftX + 50 + index * ((conveyorLength - 100) / 3)}
                y2={conveyorY + 13}
                stroke="#00bfff"
                strokeWidth={2}
                opacity={0.7}
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values={`0 ${
                    leftX + 50 + index * ((conveyorLength - 100) / 3)
                  } ${conveyorY};
                  180 ${
                    leftX + 50 + index * ((conveyorLength - 100) / 3)
                  } ${conveyorY};
                  360 ${
                    leftX + 50 + index * ((conveyorLength - 100) / 3)
                  } ${conveyorY}`}
                  dur="1s"
                  repeatCount="indefinite"
                />
              </line>
            ))}
          </g>
        )}

        {/* =======================================================
            MATERIAL FLOW
           ======================================================= */}

        {materialFlow && (
          <>
            <line
              x1={actualDirection === "right" ? leftX + 25 : rightX - 25}
              y1={conveyorY + 18}
              x2={actualDirection === "right" ? rightX - 25 : leftX + 25}
              y2={conveyorY + 18}
              stroke={materialColor}
              strokeWidth={7}
              strokeLinecap="round"
              strokeDasharray="5 14"
              opacity={0.9}
            >
              <animate
                attributeName="stroke-dashoffset"
                values={actualDirection === "right" ? "0;-38" : "0;38"}
                dur="0.7s"
                repeatCount="indefinite"
              />
            </line>

            {/* Material particles */}

            {[0, 1, 2, 3, 4].map((index) => {
              const particleX =
                actualDirection === "right"
                  ? leftX + 55 + index * 75
                  : rightX - 55 - index * 75;

              return (
                <circle
                  key={index}
                  cx={particleX}
                  cy={conveyorY + 18}
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
                    dur="1.5s"
                    begin={`${index * 0.2}s`}
                    repeatCount="indefinite"
                  />

                  <animate
                    attributeName="opacity"
                    values="0.2;1;0.2"
                    dur="1.5s"
                    begin={`${index * 0.2}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              );
            })}
          </>
        )}

        {/* =======================================================
            INLET HOPPER
           ======================================================= */}

        <path
          d={`
            M ${leftX + 55} ${conveyorY - 29}
            L ${leftX + 80} ${conveyorY - 78}
            L ${leftX + 125} ${conveyorY - 78}
            L ${leftX + 145} ${conveyorY - 29}
            Z
          `}
          fill="#111c2d"
          stroke="#1f3b57"
          strokeWidth={2}
        />

        {/* Inlet material */}

        {materialFlow && (
          <line
            x1={leftX + 102}
            y1={conveyorY - 73}
            x2={leftX + 102}
            y2={conveyorY - 35}
            stroke={materialColor}
            strokeWidth={7}
            strokeDasharray="4 9"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="0;-26"
              dur="0.6s"
              repeatCount="indefinite"
            />
          </line>
        )}

        <text
          x={leftX + 102}
          y={conveyorY - 84}
          textAnchor="middle"
          fill="#f4c542"
          fontSize={8}
          fontWeight="bold"
          fontFamily={fontFamily}
        >
          INLET
        </text>

        {/* =======================================================
            OUTLET CHUTE
           ======================================================= */}

        <path
          d={`
            M ${rightX - 125} ${conveyorY - 29}
            L ${rightX - 105} ${conveyorY - 78}
            L ${rightX - 60} ${conveyorY - 78}
            L ${rightX - 35} ${conveyorY - 29}
            Z
          `}
          fill="#111c2d"
          stroke="#1f3b57"
          strokeWidth={2}
        />

        {/* Outlet material */}

        {materialFlow && (
          <line
            x1={rightX - 82}
            y1={conveyorY - 72}
            x2={rightX - 82}
            y2={conveyorY - 35}
            stroke={materialColor}
            strokeWidth={7}
            strokeDasharray="4 9"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="0;-26"
              dur="0.6s"
              repeatCount="indefinite"
            />
          </line>
        )}

        <text
          x={rightX - 82}
          y={conveyorY - 84}
          textAnchor="middle"
          fill="#f4c542"
          fontSize={8}
          fontWeight="bold"
          fontFamily={fontFamily}
        >
          OUTLET
        </text>

        {/* =======================================================
            DRIVE MOTOR
           ======================================================= */}

        <g
          transform={`
            translate(
              ${actualDirection === "right" ? rightX + 30 : leftX - 30},
              ${conveyorY}
            )
          `}
        >
          <rect
            x="-25"
            y="-18"
            width="50"
            height="36"
            rx="6"
            fill="#111c2d"
            stroke={safeDriveRunning ? "#28a745" : "#64748b"}
            strokeWidth={2}
          />

          <circle
            cx="0"
            cy="0"
            r="10"
            fill={safeDriveRunning ? "#28a745" : "#6c757d"}
          >
            {safeDriveRunning && !alarm && (
              <animate
                attributeName="opacity"
                values="0.4;1;0.4"
                dur="0.8s"
                repeatCount="indefinite"
              />
            )}
          </circle>

          <text
            x="0"
            y="31"
            textAnchor="middle"
            fill="#64748b"
            fontSize={8}
            fontFamily={fontFamily}
          >
            DRIVE
          </text>
        </g>

        {/* =======================================================
            FLOW ARROW
           ======================================================= */}

        <path
          d={
            actualDirection === "right"
              ? `
                M ${cx + 20} ${conveyorY - 45}
                L ${cx + 55} ${conveyorY - 45}
                M ${cx + 45} ${conveyorY - 53}
                L ${cx + 55} ${conveyorY - 45}
                L ${cx + 45} ${conveyorY - 37}
              `
              : `
                M ${cx - 20} ${conveyorY - 45}
                L ${cx - 55} ${conveyorY - 45}
                M ${cx - 45} ${conveyorY - 53}
                L ${cx - 55} ${conveyorY - 45}
                L ${cx - 45} ${conveyorY - 37}
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
          ANGLE REFERENCE
         ========================================================= */}

      <g>
        <line
          x1={width - 135}
          y1={58}
          x2={width - 35}
          y2={58}
          stroke="#475569"
          strokeWidth={1}
        />

        <line
          x1={width - 135}
          y1={58}
          x2={width - 135 + Math.cos((conveyorAngle * Math.PI) / 180) * 100}
          y2={58 - Math.sin((conveyorAngle * Math.PI) / 180) * 100}
          stroke="#00bfff"
          strokeWidth={3}
        />

        <text
          x={width - 135}
          y={76}
          fill="#64748b"
          fontSize={8}
          fontFamily={fontFamily}
        >
          ANGLE
        </text>
      </g>

      {/* =========================================================
          DETAIL PANEL
         ========================================================= */}

      {isdetail && (
        <g>
          <rect
            x={18}
            y={height - 62}
            width={width - 190}
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
            {speed.toFixed(1)} {speedUnit}
          </text>

          {/* ANGLE */}

          <text
            x={220}
            y={height - 43}
            fill="#64748b"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            ANGLE
          </text>

          <text
            x={220}
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
        cx={width - 88}
        cy={height - 39}
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
        x={width - 76}
        y={height - 35}
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
            x={width - 175}
            y={height - 82}
            width={150}
            height={25}
            rx={5}
            fill={running ? "#3b1820" : "#12351f"}
            stroke={running ? "#dc3545" : "#28a745"}
          />

          <text
            x={width - 100}
            y={height - 65}
            textAnchor="middle"
            fill={running ? "#ff6b6b" : "#5ee38b"}
            fontSize={9}
            fontWeight="bold"
            fontFamily={fontFamily}
          >
            {running ? "STOP SCREW" : "START SCREW"}
          </text>
        </g>
      )}
    </g>
  );
};

export default ScrewConveyor;
