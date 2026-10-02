import React from "react";

interface FinishMillMainDriveProps {
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

const FinishMillMainDrive: React.FC<FinishMillMainDriveProps> = ({
  x = 0,
  y = 0,
  width = 380,
  height = 300,

  tag = "FM-MD-01",
  title = "FINISH MILL MAIN DRIVE",

  rpm = 1485,
  current = 420,
  power = 3150,
  load = 72,
  temperature = 57,

  running = true,
  alarm = false,
  trip = false,

  motorRunning,
  gearboxRunning,

  rpmUnit = "rpm",
  currentUnit = "A",
  powerUnit = "kW",
  loadUnit = "%",
  temperatureUnit = "°C",

  motorColor = "#334155",
  gearboxColor = "#475569",
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

  const effectiveAlarm = alarm || trip;

  const statusColor = effectiveAlarm
    ? alarmColor
    : running
      ? "#28a745"
      : "#6c757d";

  //const cx = width / 2;

  const motorX = 22;
  const motorY = 86;
  const motorW = 105;
  const motorH = 86;

  const gearboxX = 155;
  const gearboxY = 78;
  const gearboxW = 90;
  const gearboxH = 102;

  const shaftY = motorY + motorH / 2;

  const handleCommand = () => {
    if (!sendCommand) return;

    sendCommand(running ? "STOP" : "START", {
      tag,
      source: "FinishMillMainDrive",
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
          MOTOR
      ===================================================== */}

      <rect
        x={motorX}
        y={motorY}
        width={motorW}
        height={motorH}
        rx={10}
        fill={motorColor}
        stroke={safeMotorRunning ? "#22c55e" : inactiveColor}
        strokeWidth={2}
      />

      <text
        x={motorX + motorW / 2}
        y={motorY + 22}
        textAnchor="middle"
        fill="#e2e8f0"
        fontSize={11}
        fontWeight={700}
        fontFamily={fontFamily}
      >
        MOTOR
      </text>

      <circle
        cx={motorX + motorW / 2}
        cy={motorY + 50}
        r={21}
        fill="#172033"
        stroke={safeMotorRunning ? "#22c55e" : inactiveColor}
        strokeWidth={2}
      />

      {safeMotorRunning && (
        <circle
          cx={motorX + motorW / 2}
          cy={motorY + 50}
          r={13}
          fill="none"
          stroke="#94a3b8"
          strokeWidth={3}
          strokeDasharray="5 5"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 ${motorX + motorW / 2} ${motorY + 50}`}
            to={`360 ${motorX + motorW / 2} ${motorY + 50}`}
            dur="0.8s"
            repeatCount="indefinite"
          />
        </circle>
      )}

      <text
        x={motorX + motorW / 2}
        y={motorY + 77}
        textAnchor="middle"
        fill={safeMotorRunning ? "#22c55e" : "#64748b"}
        fontSize={9}
        fontWeight={700}
        fontFamily={fontFamily}
      >
        {safeMotorRunning ? "RUN" : "STOP"}
      </text>

      {/* =====================================================
          SHAFT
      ===================================================== */}

      <line
        x1={motorX + motorW}
        y1={shaftY}
        x2={gearboxX}
        y2={shaftY}
        stroke={safeMotorRunning ? shaftColor : inactiveColor}
        strokeWidth={10}
      />

      <circle
        cx={motorX + motorW + 14}
        cy={shaftY}
        r={7}
        fill="#172033"
        stroke={shaftColor}
      />

      {/* =====================================================
          GEARBOX
      ===================================================== */}

      <rect
        x={gearboxX}
        y={gearboxY}
        width={gearboxW}
        height={gearboxH}
        rx={8}
        fill={gearboxColor}
        stroke={safeGearboxRunning ? "#22c55e" : inactiveColor}
        strokeWidth={2}
      />

      <text
        x={gearboxX + gearboxW / 2}
        y={gearboxY + 23}
        textAnchor="middle"
        fill="#e2e8f0"
        fontSize={10}
        fontWeight={700}
        fontFamily={fontFamily}
      >
        GEARBOX
      </text>

      <circle
        cx={gearboxX + gearboxW / 2}
        cy={gearboxY + 57}
        r={25}
        fill="#172033"
        stroke={safeGearboxRunning ? "#22c55e" : inactiveColor}
        strokeWidth={2}
      />

      <circle
        cx={gearboxX + gearboxW / 2}
        cy={gearboxY + 57}
        r={12}
        fill="none"
        stroke="#94a3b8"
        strokeWidth={4}
      />

      {safeGearboxRunning && (
        <circle
          cx={gearboxX + gearboxW / 2}
          cy={gearboxY + 57}
          r={18}
          fill="none"
          stroke="#64748b"
          strokeWidth={2}
          strokeDasharray="4 4"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 ${gearboxX + gearboxW / 2} ${gearboxY + 57}`}
            to={`360 ${gearboxX + gearboxW / 2} ${gearboxY + 57}`}
            dur="1.6s"
            repeatCount="indefinite"
          />
        </circle>
      )}

      <text
        x={gearboxX + gearboxW / 2}
        y={gearboxY + 90}
        textAnchor="middle"
        fill={safeGearboxRunning ? "#22c55e" : "#64748b"}
        fontSize={9}
        fontWeight={700}
        fontFamily={fontFamily}
      >
        {safeGearboxRunning ? "RUN" : "STOP"}
      </text>

      {/* =====================================================
          OUTPUT COUPLING
      ===================================================== */}

      <line
        x1={gearboxX + gearboxW}
        y1={shaftY}
        x2={width - 35}
        y2={shaftY}
        stroke={safeGearboxRunning ? shaftColor : inactiveColor}
        strokeWidth={10}
      />

      <circle
        cx={width - 28}
        cy={shaftY}
        r={13}
        fill="#172033"
        stroke={safeGearboxRunning ? "#22c55e" : inactiveColor}
        strokeWidth={2}
      />

      <text
        x={width - 28}
        y={shaftY + 4}
        textAnchor="middle"
        fill="#94a3b8"
        fontSize={8}
        fontWeight={700}
      >
        OUT
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

          <text
            x={25}
            y={height - 70}
            fill="#64748b"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            SPEED
          </text>

          <text
            x={25}
            y={height - 48}
            fill="#f8fafc"
            fontSize={valueSize + 2}
            fontWeight={700}
            fontFamily={fontFamily}
          >
            {rpm.toFixed(0)} {rpmUnit}
          </text>

          <text
            x={115}
            y={height - 70}
            fill="#64748b"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            CURRENT
          </text>

          <text
            x={115}
            y={height - 48}
            fill="#f8fafc"
            fontSize={valueSize + 2}
            fontWeight={700}
            fontFamily={fontFamily}
          >
            {current.toFixed(0)} {currentUnit}
          </text>

          <text
            x={205}
            y={height - 70}
            fill="#64748b"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            POWER
          </text>

          <text
            x={205}
            y={height - 48}
            fill="#f8fafc"
            fontSize={valueSize + 2}
            fontWeight={700}
            fontFamily={fontFamily}
          >
            {power.toFixed(0)} {powerUnit}
          </text>

          <text
            x={295}
            y={height - 70}
            fill="#64748b"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            LOAD
          </text>

          <text
            x={295}
            y={height - 48}
            fill="#f8fafc"
            fontSize={valueSize + 2}
            fontWeight={700}
            fontFamily={fontFamily}
          >
            {load.toFixed(1)} {loadUnit}
          </text>

          <text
            x={width - 25}
            y={height - 70}
            textAnchor="end"
            fill="#64748b"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            TEMP
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
            {temperature.toFixed(1)} {temperatureUnit}
          </text>

          <text
            x={25}
            y={height - 29}
            fill="#64748b"
            fontSize={valueSize - 1}
            fontFamily={fontFamily}
          >
            MOTOR / GEARBOX
          </text>

          <text
            x={width - 25}
            y={height - 29}
            textAnchor="end"
            fill="#64748b"
            fontSize={valueSize - 1}
            fontFamily={fontFamily}
          >
            {safeMotorRunning && safeGearboxRunning
              ? "DRIVE HEALTHY"
              : "DRIVE STOPPED"}
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

export default FinishMillMainDrive;
