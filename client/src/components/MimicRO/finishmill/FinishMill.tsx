import React from "react";

interface FinishMillProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;

  tag?: string;
  title?: string;

  feedFlow?: number;
  productFlow?: number;

  rpm?: number;
  load?: number;
  vibration?: number;
  bearingTemperature?: number;

  running?: boolean;
  alarm?: boolean;
  trip?: boolean;

  materialFlow?: boolean;
  inletOpen?: boolean;
  outletOpen?: boolean;

  direction?: "left" | "right";
  reverse?: boolean;

  feedFlowUnit?: string;
  productFlowUnit?: string;
  rpmUnit?: string;
  loadUnit?: string;
  vibrationUnit?: string;
  temperatureUnit?: string;

  casingColor?: string;
  shellColor?: string;
  rotorColor?: string;
  materialColor?: string;
  inactiveColor?: string;
  alarmColor?: string;

  fontFamily?: string;
  tagSize?: number;
  statusSize?: number;
  valueSize?: number;

  isdetail?: boolean;

  sendCommand?: (command: string, value?: unknown) => void;
}

const FinishMill: React.FC<FinishMillProps> = ({
  x = 0,
  y = 0,
  width = 440,
  height = 340,

  tag = "FM-01",
  title = "FINISH MILL",

  feedFlow = 185,
  productFlow = 178,

  rpm = 14.8,
  load = 72,
  vibration = 2.2,
  bearingTemperature = 61,

  running = true,
  alarm = false,
  trip = false,

  materialFlow = true,
  inletOpen,
  outletOpen,

  direction = "right",
  reverse = false,

  feedFlowUnit = "t/h",
  productFlowUnit = "t/h",
  rpmUnit = "rpm",
  loadUnit = "%",
  vibrationUnit = "mm/s",
  temperatureUnit = "°C",

  casingColor = "#26384c",
  shellColor = "#334155",
  rotorColor = "#64748b",
  materialColor = "#d8b26e",
  inactiveColor = "#475569",
  alarmColor = "#dc3545",

  fontFamily = "Arial",
  tagSize = 12,
  statusSize = 11,
  valueSize = 10,

  isdetail = true,
  sendCommand,
}) => {
  const safeInletOpen = inletOpen ?? running;
  const safeOutletOpen = outletOpen ?? running;

  const effectiveAlarm = alarm || trip;

  const actualDirection = reverse
    ? direction === "right"
      ? "left"
      : "right"
    : direction;

  const statusColor = effectiveAlarm
    ? alarmColor
    : running
      ? "#28a745"
      : "#6c757d";

  const cx = width / 2;

  const millX = 78;
  const millY = 75;
  const millW = width - 156;
  const millH = 118;

  const shellCX = cx;
  const shellCY = millY + millH / 2;

  const shellRX = millW / 2;
  const shellRY = millH / 2;

  const handleCommand = (command: string) => {
    if (!sendCommand) return;

    sendCommand(command, {
      tag,
      source: "FinishMill",
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
        stroke={casingColor}
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
          INLET
      ===================================================== */}

      <line
        x1={18}
        y1={shellCY}
        x2={millX}
        y2={shellCY}
        stroke={safeInletOpen ? "#22c55e" : inactiveColor}
        strokeWidth={7}
      />

      <text
        x={30}
        y={shellCY - 16}
        textAnchor="middle"
        fill="#94a3b8"
        fontSize={8}
        fontFamily={fontFamily}
      >
        FEED
      </text>

      {materialFlow && safeInletOpen && (
        <g>
          {Array.from({ length: 8 }).map((_, index) => (
            <circle
              key={index}
              cx={25}
              cy={shellCY + ((index % 4) - 2) * 5}
              r={2}
              fill={materialColor}
            >
              <animate
                attributeName="cx"
                values={`15;${millX + 5}`}
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
          MILL SHELL
      ===================================================== */}

      <ellipse
        cx={shellCX}
        cy={shellCY}
        rx={shellRX}
        ry={shellRY}
        fill={shellColor}
        stroke="#94a3b8"
        strokeWidth={2}
      />

      <ellipse
        cx={shellCX}
        cy={shellCY}
        rx={shellRX - 12}
        ry={shellRY - 12}
        fill="#172033"
        stroke="#475569"
        strokeWidth={1.5}
      />

      {/* =====================================================
          INTERNAL MILL / CHAMBERS
      ===================================================== */}

      <line
        x1={cx - 48}
        y1={millY + 18}
        x2={cx - 48}
        y2={millY + millH - 18}
        stroke="#64748b"
        strokeWidth={3}
      />

      <line
        x1={cx + 48}
        y1={millY + 18}
        x2={cx + 48}
        y2={millY + millH - 18}
        stroke="#64748b"
        strokeWidth={3}
      />

      {/* Grinding media */}

      {Array.from({ length: 22 }).map((_, index) => {
        const angle = (index / 22) * Math.PI * 2;

        const px = shellCX + Math.cos(angle) * Math.max(15, shellRX - 30);

        const py = shellCY + Math.sin(angle) * Math.max(12, shellRY - 30);

        return (
          <circle
            key={index}
            cx={px}
            cy={py}
            r={index % 3 === 0 ? 4 : 3}
            fill={rotorColor}
            opacity={0.8}
          />
        );
      })}

      {/* =====================================================
          ROTATION
      ===================================================== */}

      {running && (
        <g>
          <circle
            cx={shellCX}
            cy={shellCY}
            r={24}
            fill="none"
            stroke={rotorColor}
            strokeWidth={2}
            strokeDasharray="5 5"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`0 ${shellCX} ${shellCY}`}
              to={`360 ${shellCX} ${shellCY}`}
              dur="2.5s"
              repeatCount="indefinite"
            />
          </circle>

          <line
            x1={shellCX - 18}
            y1={shellCY}
            x2={shellCX + 18}
            y2={shellCY}
            stroke={rotorColor}
            strokeWidth={3}
          />
        </g>
      )}

      {/* =====================================================
          DIRECTION
      ===================================================== */}

      <text
        x={cx}
        y={millY + millH + 24}
        textAnchor="middle"
        fill={materialColor}
        fontSize={9}
        fontWeight="bold"
        fontFamily={fontFamily}
      >
        {actualDirection === "right"
          ? "MATERIAL → GRINDING →"
          : "← GRINDING ← MATERIAL"}
      </text>

      {/* =====================================================
          OUTLET
      ===================================================== */}

      <line
        x1={width - 18}
        y1={shellCY}
        x2={width - 78}
        y2={shellCY}
        stroke={safeOutletOpen ? "#22c55e" : inactiveColor}
        strokeWidth={7}
      />

      <text
        x={width - 30}
        y={shellCY - 16}
        textAnchor="middle"
        fill="#94a3b8"
        fontSize={8}
        fontFamily={fontFamily}
      >
        CEMENT
      </text>

      {materialFlow && safeOutletOpen && (
        <g>
          {Array.from({ length: 8 }).map((_, index) => (
            <circle
              key={index}
              cx={width - 25}
              cy={shellCY + ((index % 4) - 2) * 5}
              r={2}
              fill={materialColor}
            >
              <animate
                attributeName="cx"
                values={`${width - 15};${width - 82}`}
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
            y={height - 78}
            width={width - 24}
            height={58}
            rx={6}
            fill="#111c2d"
            stroke="#1f3b57"
          />

          <text
            x={24}
            y={height - 56}
            fill="#64748b"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            FEED
          </text>

          <text
            x={24}
            y={height - 36}
            fill={materialColor}
            fontSize={valueSize + 2}
            fontWeight={700}
            fontFamily={fontFamily}
          >
            {feedFlow.toFixed(1)} {feedFlowUnit}
          </text>

          <text
            x={125}
            y={height - 56}
            fill="#64748b"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            PRODUCT
          </text>

          <text
            x={125}
            y={height - 36}
            fill={materialColor}
            fontSize={valueSize + 2}
            fontWeight={700}
            fontFamily={fontFamily}
          >
            {productFlow.toFixed(1)} {productFlowUnit}
          </text>

          <text
            x={240}
            y={height - 56}
            fill="#64748b"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            RPM
          </text>

          <text
            x={240}
            y={height - 36}
            fill="#f8fafc"
            fontSize={valueSize + 2}
            fontWeight={700}
            fontFamily={fontFamily}
          >
            {rpm.toFixed(1)} {rpmUnit}
          </text>

          <text
            x={width - 24}
            y={height - 56}
            textAnchor="end"
            fill="#64748b"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            LOAD
          </text>

          <text
            x={width - 24}
            y={height - 36}
            textAnchor="end"
            fill="#f8fafc"
            fontSize={valueSize + 2}
            fontWeight={700}
            fontFamily={fontFamily}
          >
            {load.toFixed(1)} {loadUnit}
          </text>
        </g>
      )}

      {/* =====================================================
          COMMAND BUTTONS
      ===================================================== */}

      {sendCommand && (
        <g>
          <rect
            x={width - 176}
            y={height - 28}
            width={70}
            height={20}
            rx={4}
            fill="#172033"
            stroke="#475569"
            style={{ cursor: "pointer" }}
            onClick={() => handleCommand(running ? "STOP" : "START")}
          />

          <text
            x={width - 141}
            y={height - 14}
            textAnchor="middle"
            fill="#cbd5e1"
            fontSize={valueSize - 1}
            fontWeight={700}
            fontFamily={fontFamily}
          >
            {running ? "STOP" : "START"}
          </text>

          <rect
            x={width - 98}
            y={height - 28}
            width={78}
            height={20}
            rx={4}
            fill="#172033"
            stroke="#475569"
            style={{ cursor: "pointer" }}
            onClick={() =>
              handleCommand(actualDirection === "right" ? "REVERSE" : "FORWARD")
            }
          />

          <text
            x={width - 59}
            y={height - 14}
            textAnchor="middle"
            fill="#cbd5e1"
            fontSize={valueSize - 1}
            fontWeight={700}
            fontFamily={fontFamily}
          >
            DIR
          </text>
        </g>
      )}

      {/* =====================================================
          EXTRA MONITORING
      ===================================================== */}

      <text
        x={18}
        y={height - 92}
        fill="#64748b"
        fontSize={valueSize - 1}
        fontFamily={fontFamily}
      >
        VIB {vibration.toFixed(1)} {vibrationUnit}
      </text>

      <text
        x={width - 18}
        y={height - 92}
        textAnchor="end"
        fill="#64748b"
        fontSize={valueSize - 1}
        fontFamily={fontFamily}
      >
        BRG {bearingTemperature.toFixed(1)} {temperatureUnit}
      </text>
    </g>
  );
};

export default FinishMill;
