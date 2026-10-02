import React from "react";

interface CrusherMainDriveProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;

  tag?: string;
  title?: string;

  rpm?: number;
  current?: number;
  power?: number;
  load?: number;
  temperature?: number;

  running?: boolean;
  alarm?: boolean;
  trip?: boolean;

  motorRunning?: boolean;
  gearboxRunning?: boolean;

  rpmUnit?: string;
  currentUnit?: string;
  powerUnit?: string;
  loadUnit?: string;
  temperatureUnit?: string;

  motorColor?: string;
  gearboxColor?: string;
  shaftColor?: string;
  inactiveColor?: string;
  alarmColor?: string;

  fontFamily?: string;
  tagSize?: number;
  statusSize?: number;
  valueSize?: number;

  isdetail?: boolean;

  sendCommand?: (command: string, value?: unknown) => void;
}

const CrusherMainDrive: React.FC<CrusherMainDriveProps> = ({
  x = 0,
  y = 0,
  width = 420,
  height = 300,

  tag = "M-CR-101",
  title = "CRUSHER MAIN DRIVE",

  rpm = 980,
  current = 145,
  power = 185,
  load = 72,
  temperature = 68,

  running = true,
  alarm = false,
  trip = false,

  motorRunning,
  gearboxRunning,

  rpmUnit = "RPM",
  currentUnit = "A",
  powerUnit = "kW",
  loadUnit = "%",
  temperatureUnit = "°C",

  motorColor = "#1f3b57",
  gearboxColor = "#64748b",
  shaftColor = "#94a3b8",
  inactiveColor = "#475569",
  alarmColor = "#dc3545",

  fontFamily = "Arial",
  tagSize = 12,
  statusSize = 11,
  valueSize = 10,

  isdetail = true,

  sendCommand,
}) => {
  const safeMotorRunning = motorRunning ?? running;
  const safeGearboxRunning = gearboxRunning ?? running;

  const statusColor =
    trip || alarm ? alarmColor : running ? "#28a745" : "#6c757d";

  const activeMotorColor =
    trip || alarm ? alarmColor : running ? motorColor : inactiveColor;

  const safeLoad = Math.max(0, Math.min(100, load));

  const tempColor =
    temperature >= 90
      ? "#dc3545"
      : temperature >= 80
        ? "#ff9500"
        : temperature >= 65
          ? "#00bfff"
          : "#94a3b8";

  const loadColor =
    safeLoad >= 90 ? "#dc3545" : safeLoad >= 75 ? "#ff9500" : "#28a745";

  const handleCommand = () => {
    if (!sendCommand) return;

    sendCommand(running ? "STOP" : "START", {
      tag,
      source: "CrusherMainDrive",
    });
  };

  const motorX = 65;
  const motorY = 72;

  const motorW = 145;
  const motorH = 120;

  const gearboxX = 230;
  const gearboxY = 82;

  const gearboxW = 105;
  const gearboxH = 100;

  const shaftY = motorY + motorH / 2;

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
        stroke={alarm || trip ? alarmColor : "#1f3b57"}
        strokeWidth={alarm || trip ? 2 : 1.5}
      >
        {(alarm || trip) && (
          <animate
            attributeName="stroke-opacity"
            values="1;0.2;1"
            dur="0.6s"
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
        x={cx(width)}
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
        {running && !alarm && !trip && (
          <animate
            attributeName="r"
            values="5;7;5"
            dur="1.2s"
            repeatCount="indefinite"
          />
        )}

        {(alarm || trip) && (
          <animate
            attributeName="opacity"
            values="1;0.15;1"
            dur="0.45s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      {/* =========================================================
          MOTOR BODY
         ========================================================= */}

      <g>
        {/* Motor rear cap */}

        <rect
          x={motorX - 18}
          y={motorY + 15}
          width={22}
          height={motorH - 30}
          rx={5}
          fill="#111c2d"
          stroke="#1f3b57"
          strokeWidth={2}
        />

        {/* Motor housing */}

        <rect
          x={motorX}
          y={motorY}
          width={motorW}
          height={motorH}
          rx={12}
          fill={activeMotorColor}
          stroke={running ? "#00bfff" : "#1f3b57"}
          strokeWidth={2}
        />

        {/* Motor cooling ribs */}

        {[20, 38, 56, 74, 92].map((offset, index) => (
          <line
            key={index}
            x1={motorX + offset}
            y1={motorY + 12}
            x2={motorX + offset}
            y2={motorY + motorH - 12}
            stroke="#0b1220"
            strokeWidth={4}
            opacity={0.45}
          />
        ))}

        {/* Motor center */}

        <circle
          cx={motorX + motorW / 2}
          cy={motorY + motorH / 2}
          r={28}
          fill="#0b1220"
          stroke="#64748b"
          strokeWidth={3}
        />

        <circle
          cx={motorX + motorW / 2}
          cy={motorY + motorH / 2}
          r={8}
          fill={safeMotorRunning ? "#28a745" : "#6c757d"}
        />

        {/* Rotation indicator */}

        {safeMotorRunning && !alarm && !trip && (
          <circle
            cx={motorX + motorW / 2}
            cy={motorY + motorH / 2}
            r={20}
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
              dur="1.1s"
              repeatCount="indefinite"
            />
          </circle>
        )}

        <text
          x={motorX + motorW / 2}
          y={motorY + motorH + 17}
          textAnchor="middle"
          fill="#64748b"
          fontSize={8}
          fontFamily={fontFamily}
        >
          MAIN MOTOR
        </text>
      </g>

      {/* =========================================================
          SHAFT
         ========================================================= */}

      <line
        x1={motorX + motorW}
        y1={shaftY}
        x2={gearboxX}
        y2={shaftY}
        stroke={shaftColor}
        strokeWidth={12}
        opacity={0.8}
      />

      {safeMotorRunning && !alarm && !trip && (
        <line
          x1={motorX + motorW}
          y1={shaftY}
          x2={gearboxX}
          y2={shaftY}
          stroke="#00bfff"
          strokeWidth={3}
          strokeDasharray="7 10"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="0;-34"
            dur="0.45s"
            repeatCount="indefinite"
          />
        </line>
      )}

      {/* =========================================================
          GEARBOX
         ========================================================= */}

      <g>
        <rect
          x={gearboxX}
          y={gearboxY}
          width={gearboxW}
          height={gearboxH}
          rx={10}
          fill={safeGearboxRunning ? gearboxColor : inactiveColor}
          stroke="#1f3b57"
          strokeWidth={2}
        />

        {/* Gearbox gears */}

        <circle
          cx={gearboxX + 35}
          cy={gearboxY + 50}
          r={25}
          fill="#0b1220"
          stroke="#94a3b8"
          strokeWidth={3}
        />

        <circle
          cx={gearboxX + 70}
          cy={gearboxY + 50}
          r={17}
          fill="#111c2d"
          stroke="#94a3b8"
          strokeWidth={3}
        />

        {safeGearboxRunning && !alarm && !trip && (
          <>
            <circle
              cx={gearboxX + 35}
              cy={gearboxY + 50}
              r={18}
              fill="none"
              stroke="#00bfff"
              strokeWidth={2}
              strokeDasharray="4 7"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0"
                to="360"
                dur="1.6s"
                repeatCount="indefinite"
              />
            </circle>

            <circle
              cx={gearboxX + 70}
              cy={gearboxY + 50}
              r={12}
              fill="none"
              stroke="#28a745"
              strokeWidth={2}
              strokeDasharray="3 6"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="360"
                to="0"
                dur="1s"
                repeatCount="indefinite"
              />
            </circle>
          </>
        )}

        <text
          x={gearboxX + gearboxW / 2}
          y={gearboxY + gearboxH + 17}
          textAnchor="middle"
          fill="#64748b"
          fontSize={8}
          fontFamily={fontFamily}
        >
          GEARBOX
        </text>
      </g>

      {/* =========================================================
          OUTPUT SHAFT
         ========================================================= */}

      <line
        x1={gearboxX + gearboxW}
        y1={shaftY}
        x2={width - 35}
        y2={shaftY}
        stroke={shaftColor}
        strokeWidth={10}
        opacity={0.75}
      />

      {safeGearboxRunning && !alarm && !trip && (
        <line
          x1={gearboxX + gearboxW}
          y1={shaftY}
          x2={width - 35}
          y2={shaftY}
          stroke="#00bfff"
          strokeWidth={3}
          strokeDasharray="6 9"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="0;-30"
            dur="0.5s"
            repeatCount="indefinite"
          />
        </line>
      )}

      {/* Crusher coupling */}

      <circle
        cx={width - 30}
        cy={shaftY}
        r={18}
        fill="#111c2d"
        stroke={safeGearboxRunning ? "#28a745" : "#64748b"}
        strokeWidth={3}
      />

      <circle cx={width - 30} cy={shaftY} r={6} fill="#64748b" />

      <text
        x={width - 30}
        y={shaftY + 38}
        textAnchor="middle"
        fill="#64748b"
        fontSize={8}
        fontFamily={fontFamily}
      >
        CRUSHER
      </text>

      {/* =========================================================
          RPM DISPLAY
         ========================================================= */}

      <g>
        <rect
          x={15}
          y={height - 125}
          width={85}
          height={48}
          rx={5}
          fill="#111c2d"
          stroke="#1f3b57"
        />

        <text
          x={27}
          y={height - 106}
          fill="#64748b"
          fontSize={valueSize}
          fontFamily={fontFamily}
        >
          SPEED
        </text>

        <text
          x={27}
          y={height - 87}
          fill="#00bfff"
          fontSize={valueSize + 2}
          fontWeight="bold"
          fontFamily={fontFamily}
        >
          {rpm.toLocaleString()} {rpmUnit}
        </text>
      </g>

      {/* =========================================================
          LOAD DISPLAY
         ========================================================= */}

      <g>
        <rect
          x={110}
          y={height - 125}
          width={85}
          height={48}
          rx={5}
          fill="#111c2d"
          stroke="#1f3b57"
        />

        <text
          x={122}
          y={height - 106}
          fill="#64748b"
          fontSize={valueSize}
          fontFamily={fontFamily}
        >
          LOAD
        </text>

        <text
          x={122}
          y={height - 87}
          fill={loadColor}
          fontSize={valueSize + 2}
          fontWeight="bold"
          fontFamily={fontFamily}
        >
          {safeLoad.toFixed(0)} {loadUnit}
        </text>
      </g>

      {/* =========================================================
          TEMPERATURE
         ========================================================= */}

      <g>
        <rect
          x={205}
          y={height - 125}
          width={90}
          height={48}
          rx={5}
          fill="#111c2d"
          stroke="#1f3b57"
        />

        <text
          x={217}
          y={height - 106}
          fill="#64748b"
          fontSize={valueSize}
          fontFamily={fontFamily}
        >
          TEMP
        </text>

        <text
          x={217}
          y={height - 87}
          fill={tempColor}
          fontSize={valueSize + 2}
          fontWeight="bold"
          fontFamily={fontFamily}
        >
          {temperature.toFixed(1)} {temperatureUnit}
        </text>
      </g>

      {/* =========================================================
          CURRENT / POWER
         ========================================================= */}

      {isdetail && (
        <g>
          <text
            x={315}
            y={height - 111}
            fill="#64748b"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            CURRENT
          </text>

          <text
            x={315}
            y={height - 92}
            fill="#00ffff"
            fontSize={valueSize + 1}
            fontWeight="bold"
            fontFamily={fontFamily}
          >
            {current.toFixed(1)} {currentUnit}
          </text>

          <text
            x={315}
            y={height - 70}
            fill="#64748b"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            POWER
          </text>

          <text
            x={315}
            y={height - 51}
            fill="#f4c542"
            fontSize={valueSize + 1}
            fontWeight="bold"
            fontFamily={fontFamily}
          >
            {power.toFixed(1)} {powerUnit}
          </text>
        </g>
      )}

      {/* =========================================================
          STATUS
         ========================================================= */}

      <text
        x={18}
        y={height - 15}
        fill={statusColor}
        fontSize={statusSize}
        fontWeight="bold"
        fontFamily={fontFamily}
      >
        {trip
          ? "● TRIPPED"
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
            y={height - 38}
            width={125}
            height={24}
            rx={5}
            fill={running ? "#3b1820" : "#12351f"}
            stroke={running ? "#dc3545" : "#28a745"}
          />

          <text
            x={width - 82.5}
            y={height - 22}
            textAnchor="middle"
            fill={running ? "#ff6b6b" : "#5ee38b"}
            fontSize={9}
            fontWeight="bold"
            fontFamily={fontFamily}
          >
            {running ? "STOP DRIVE" : "START DRIVE"}
          </text>
        </g>
      )}
    </g>
  );
};

function cx(width: number): number {
  return width / 2;
}

export default CrusherMainDrive;
