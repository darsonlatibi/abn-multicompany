import React from "react";

interface RejectProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;

  tag?: string;
  title?: string;

  temperature?: number;
  pressure?: number;
  flow?: number;

  materialFlow?: boolean;
  gasFlow?: boolean;

  running?: boolean;
  alarm?: boolean;

  gateOpen?: boolean;
  conveyorRunning?: boolean;

  temperatureUnit?: string;
  pressureUnit?: string;
  flowUnit?: string;

  fontFamily?: string;
  tagSize?: number;
  statusSize?: number;
  valueSize?: number;

  isdetail?: boolean;

  sendCommand?: (command: string, value?: unknown) => void;
}

const Reject: React.FC<RejectProps> = ({
  x = 0,
  y = 0,
  width = 300,
  height = 300,

  tag = "RJ-101",
  title = "REJECT",

  temperature = 85,
  pressure = -6800,
  flow = 12,

  materialFlow = true,
  gasFlow = false,

  running = true,
  alarm = false,

  gateOpen,
  conveyorRunning,

  temperatureUnit = "°C",
  pressureUnit = "Pa",
  flowUnit = "t/h",

  fontFamily = "Arial",
  tagSize = 12,
  statusSize = 11,
  valueSize = 10,

  isdetail = true,

  sendCommand,
}) => {
  const safeGateOpen = gateOpen ?? running;
  const safeConveyorRunning = conveyorRunning ?? running;

  const statusColor = alarm ? "#dc3545" : running ? "#28a745" : "#6c757d";

  const temperatureColor =
    temperature >= 120
      ? "#ff3b30"
      : temperature >= 105
        ? "#ff9500"
        : temperature >= 80
          ? "#00bfff"
          : "#94a3b8";

  const materialColor = materialFlow ? "#f4c542" : "#64748b";

  const centerX = width / 2;

  const bodyX = 42;
  const bodyY = 70;
  const bodyWidth = width - 84;
  const bodyHeight = 118;

  const hopperTop = bodyY + bodyHeight;
  const hopperBottom = hopperTop + 55;

  const outletY = hopperBottom + 30;

  const handleCommand = () => {
    if (!sendCommand) return;

    sendCommand(running ? "STOP" : "START", {
      tag,
      component: "REJECT",
    });
  };

  return (
    <g
      transform={`translate(${x},${y})`}
      style={{
        cursor: sendCommand ? "pointer" : "default",
      }}
      onClick={handleCommand}
    >
      {/* =====================================================
          TITLE
          ===================================================== */}
      <text
        x={centerX}
        y={25}
        textAnchor="middle"
        fill="#d8dee9"
        fontSize={tagSize + 1}
        fontFamily={fontFamily}
        fontWeight="700"
        letterSpacing="1"
      >
        {title}
      </text>

      {/* =====================================================
          ALARM BORDER
          ===================================================== */}
      <rect
        x={bodyX - 10}
        y={bodyY - 10}
        width={bodyWidth + 20}
        height={bodyHeight + 125}
        rx={14}
        fill="none"
        stroke={statusColor}
        strokeWidth={alarm ? 3 : 1.5}
        opacity={alarm ? 1 : 0.55}
      >
        {alarm && (
          <animate
            attributeName="opacity"
            values="1;0.25;1"
            dur="1s"
            repeatCount="indefinite"
          />
        )}
      </rect>

      {/* =====================================================
          MAIN REJECT CHAMBER
          ===================================================== */}
      <rect
        x={bodyX}
        y={bodyY}
        width={bodyWidth}
        height={bodyHeight}
        rx={12}
        fill="#0b1220"
        stroke={statusColor}
        strokeWidth={2}
      />

      {/* =====================================================
          INNER CHAMBER
          ===================================================== */}
      <rect
        x={bodyX + 14}
        y={bodyY + 14}
        width={bodyWidth - 28}
        height={bodyHeight - 28}
        rx={8}
        fill="#111c2d"
        stroke="#1f3b57"
        strokeWidth={1}
      />

      {/* =====================================================
          MATERIAL BED
          ===================================================== */}
      <path
        d={`
          M ${bodyX + 20} ${bodyY + 84}
          Q ${centerX} ${bodyY + 58}
            ${bodyX + bodyWidth - 20} ${bodyY + 84}
          V ${bodyY + 104}
          H ${bodyX + 20}
          Z
        `}
        fill="#3b2f16"
        opacity={materialFlow ? 1 : 0.35}
      />

      <path
        d={`
          M ${bodyX + 24} ${bodyY + 82}
          Q ${centerX} ${bodyY + 61}
            ${bodyX + bodyWidth - 24} ${bodyY + 82}
        `}
        fill="none"
        stroke={materialColor}
        strokeWidth={3}
        strokeDasharray={materialFlow ? "7 6" : "0"}
      >
        {materialFlow && (
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-26"
            dur="0.8s"
            repeatCount="indefinite"
          />
        )}
      </path>

      {/* =====================================================
          REJECT MATERIAL ENTERING
          ===================================================== */}
      <path
        d={`
          M ${centerX} ${bodyY - 48}
          V ${bodyY + 12}
        `}
        fill="none"
        stroke={materialColor}
        strokeWidth={6}
        strokeLinecap="round"
        strokeDasharray={materialFlow ? "8 6" : "0"}
      >
        {materialFlow && (
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-28"
            dur="0.7s"
            repeatCount="indefinite"
          />
        )}
      </path>

      <polygon
        points={`
          ${centerX - 7},${bodyY + 8}
          ${centerX + 7},${bodyY + 8}
          ${centerX},${bodyY + 22}
        `}
        fill={materialColor}
      />

      {/* =====================================================
          HOPPER / FUNNEL
          ===================================================== */}
      <path
        d={`
          M ${bodyX + 32} ${hopperTop - 4}
          H ${bodyX + bodyWidth - 32} ${hopperTop - 4}

          L ${centerX + 30} ${hopperBottom}
          H ${centerX - 30}
          Z
        `}
        fill="#111c2d"
        stroke={statusColor}
        strokeWidth={2}
      />

      {/* =====================================================
          REJECT FLOW INSIDE HOPPER
          ===================================================== */}
      <path
        d={`
          M ${centerX - 15} ${hopperTop + 2}
          L ${centerX - 5} ${hopperBottom - 8}

          M ${centerX + 5} ${hopperTop + 2}
          L ${centerX + 15} ${hopperBottom - 8}
        `}
        fill="none"
        stroke={materialColor}
        strokeWidth={4}
        strokeLinecap="round"
        strokeDasharray={materialFlow ? "6 5" : "0"}
      >
        {materialFlow && (
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="22"
            dur="0.6s"
            repeatCount="indefinite"
          />
        )}
      </path>

      {/* =====================================================
          ROTARY GATE / AIRLOCK
          ===================================================== */}
      <g transform={`translate(${centerX},${hopperBottom + 13})`}>
        <rect
          x="-32"
          y="-14"
          width="64"
          height="28"
          rx="6"
          fill="#0b1220"
          stroke={safeGateOpen ? "#28a745" : "#6c757d"}
          strokeWidth={2}
        />

        <g>
          <circle
            cx={0}
            cy={0}
            r={10}
            fill="#18263a"
            stroke={safeGateOpen ? "#f4c542" : "#64748b"}
            strokeWidth={2}
          />

          <line
            x1="-7"
            y1="-7"
            x2="7"
            y2="7"
            stroke={safeGateOpen ? "#f4c542" : "#64748b"}
            strokeWidth={3}
            strokeLinecap="round"
          />

          <line
            x1="7"
            y1="-7"
            x2="-7"
            y2="7"
            stroke={safeGateOpen ? "#f4c542" : "#64748b"}
            strokeWidth={3}
            strokeLinecap="round"
          />

          {safeGateOpen && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0"
              to="360"
              dur="1.2s"
              repeatCount="indefinite"
            />
          )}
        </g>
      </g>

      {/* =====================================================
          DISCHARGE PIPE
          ===================================================== */}
      <rect
        x={centerX - 18}
        y={hopperBottom + 27}
        width={36}
        height={42}
        rx={5}
        fill="#111c2d"
        stroke="#1f3b57"
        strokeWidth={2}
      />

      {/* =====================================================
          MATERIAL DISCHARGE FLOW
          ===================================================== */}
      <path
        d={`
          M ${centerX} ${hopperBottom + 30}
          V ${outletY + 8}
        `}
        fill="none"
        stroke={materialColor}
        strokeWidth={7}
        strokeLinecap="round"
        strokeDasharray={materialFlow ? "8 6" : "0"}
      >
        {materialFlow && (
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="28"
            dur="0.65s"
            repeatCount="indefinite"
          />
        )}
      </path>

      <polygon
        points={`
          ${centerX - 7},${outletY}
          ${centerX + 7},${outletY}
          ${centerX},${outletY + 14}
        `}
        fill={materialColor}
      />

      {/* =====================================================
          CONVEYOR / REJECT TRANSPORT
          ===================================================== */}
      <path
        d={`
          M ${centerX - 95} ${outletY + 18}
          H ${centerX + 95}
        `}
        fill="none"
        stroke="#64748b"
        strokeWidth={14}
        strokeLinecap="round"
      />

      <path
        d={`
          M ${centerX - 88} ${outletY + 18}
          H ${centerX + 88}
        `}
        fill="none"
        stroke="#18263a"
        strokeWidth={9}
        strokeLinecap="round"
      />

      {safeConveyorRunning && materialFlow && (
        <path
          d={`
            M ${centerX - 82} ${outletY + 18}
            H ${centerX + 82}
          `}
          fill="none"
          stroke="#f4c542"
          strokeWidth={3}
          strokeDasharray="9 8"
          strokeLinecap="round"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-34"
            dur="0.7s"
            repeatCount="indefinite"
          />
        </path>
      )}

      {/* =====================================================
          CONVEYOR ROLLERS
          ===================================================== */}
      {[-70, 0, 70].map((offset) => (
        <circle
          key={offset}
          cx={centerX + offset}
          cy={outletY + 18}
          r={8}
          fill="#0b1220"
          stroke="#64748b"
          strokeWidth={2}
        />
      ))}

      {/* =====================================================
          GAS / AIR CONNECTION
          ===================================================== */}
      <path
        d={`
          M ${bodyX + bodyWidth} ${bodyY + 38}
          H ${width - 12}
        `}
        fill="none"
        stroke={gasFlow ? "#00ffff" : "#64748b"}
        strokeWidth={4}
        strokeDasharray={gasFlow ? "7 6" : "0"}
        strokeLinecap="round"
      >
        {gasFlow && (
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-26"
            dur="0.8s"
            repeatCount="indefinite"
          />
        )}
      </path>

      {/* =====================================================
          GAS LABEL
          ===================================================== */}
      {gasFlow && (
        <text
          x={width - 12}
          y={bodyY + 29}
          textAnchor="end"
          fill="#00ffff"
          fontSize={valueSize}
          fontFamily={fontFamily}
        >
          AIR / GAS
        </text>
      )}

      {/* =====================================================
          DETAIL PANEL
          ===================================================== */}
      {isdetail && (
        <g>
          <rect
            x={bodyX + 8}
            y={height - 82}
            width={bodyWidth - 16}
            height={58}
            rx={8}
            fill="#0b1220"
            stroke="#1f3b57"
            strokeWidth={1}
          />

          {/* Temperature */}
          <text
            x={bodyX + 18}
            y={height - 59}
            fill="#94a3b8"
            fontSize={valueSize - 1}
            fontFamily={fontFamily}
          >
            TEMP
          </text>

          <text
            x={bodyX + 18}
            y={height - 39}
            fill={temperatureColor}
            fontSize={valueSize}
            fontFamily={fontFamily}
            fontWeight="700"
          >
            {temperature}
            {temperatureUnit}
          </text>

          {/* Pressure */}
          <text
            x={centerX}
            y={height - 59}
            textAnchor="middle"
            fill="#94a3b8"
            fontSize={valueSize - 1}
            fontFamily={fontFamily}
          >
            PRESS
          </text>

          <text
            x={centerX}
            y={height - 39}
            textAnchor="middle"
            fill="#aab4c3"
            fontSize={valueSize}
            fontFamily={fontFamily}
            fontWeight="700"
          >
            {pressure}
            {pressureUnit}
          </text>

          {/* Flow */}
          <text
            x={bodyX + bodyWidth - 18}
            y={height - 59}
            textAnchor="end"
            fill="#94a3b8"
            fontSize={valueSize - 1}
            fontFamily={fontFamily}
          >
            FLOW
          </text>

          <text
            x={bodyX + bodyWidth - 18}
            y={height - 39}
            textAnchor="end"
            fill={materialColor}
            fontSize={valueSize}
            fontFamily={fontFamily}
            fontWeight="700"
          >
            {flow} {flowUnit}
          </text>
        </g>
      )}

      {/* =====================================================
          GATE STATUS
          ===================================================== */}
      {isdetail && (
        <text
          x={centerX}
          y={outletY - 5}
          textAnchor="middle"
          fill={safeGateOpen ? "#28a745" : "#6c757d"}
          fontSize={valueSize - 1}
          fontFamily={fontFamily}
          fontWeight="700"
        >
          GATE {safeGateOpen ? "OPEN" : "CLOSED"}
        </text>
      )}

      {/* =====================================================
          STATUS INDICATOR
          ===================================================== */}
      <circle cx={bodyX + 10} cy={height - 10} r={6} fill={statusColor}>
        {running && !alarm && (
          <animate
            attributeName="opacity"
            values="1;0.35;1"
            dur="1.2s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      {/* =====================================================
          TAG
          ===================================================== */}
      <text
        x={bodyX + 25}
        y={height - 6}
        fill="#d8dee9"
        fontSize={tagSize}
        fontFamily={fontFamily}
        fontWeight="700"
      >
        {tag}
      </text>

      {/* =====================================================
          STATUS
          ===================================================== */}
      <text
        x={width - 10}
        y={height - 6}
        textAnchor="end"
        fill={statusColor}
        fontSize={statusSize}
        fontFamily={fontFamily}
        fontWeight="700"
      >
        {alarm ? "ALARM" : running ? "RUNNING" : "STOPPED"}
      </text>
    </g>
  );
};

export default Reject;
