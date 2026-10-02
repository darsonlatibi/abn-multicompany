import React from "react";

interface RawMaterialInletProps {
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
  feederRunning?: boolean;

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

const RawMaterialInlet: React.FC<RawMaterialInletProps> = ({
  x = 0,
  y = 0,
  width = 380,
  height = 300,

  tag = "RM-IN-101",
  title = "RAW MATERIAL INLET",

  temperature = 35,
  pressure = -2500,
  flow = 125,

  materialFlow = true,
  gasFlow = false,

  running = true,
  alarm = false,

  gateOpen,
  feederRunning,

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
  const safeFeederRunning = feederRunning ?? running;

  const statusColor = alarm ? "#dc3545" : running ? "#28a745" : "#6c757d";

  const materialColor = alarm
    ? "#dc3545"
    : materialFlow
      ? "#f4c542"
      : "#64748b";

  const tempColor =
    temperature >= 120
      ? "#ff3b30"
      : temperature >= 105
        ? "#ff9500"
        : temperature >= 80
          ? "#00bfff"
          : "#94a3b8";

  const handleCommand = () => {
    if (!sendCommand) return;

    sendCommand(running ? "STOP" : "START", {
      tag,
      source: "RawMaterialInlet",
    });
  };

  /*
   * Internal coordinates
   * Designed around a vertical raw-material chute:
   *
   *       RAW MATERIAL
   *            ↓
   *      ┌──────────┐
   *      │  CHUTE   │
   *      └────┬─────┘
   *           ↓
   *       ┌───┴───┐
   *       │ FEEDER│
   *       └───┬───┘
   *           ↓
   *        OUTLET
   */

  const cx = width / 2;

  const chuteTop = 45;
  const chuteBottom = 155;

  const feederY = 165;
  const feederH = 48;

  const outletY = 215;

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
        stroke={alarm ? "#dc3545" : "#1f3b57"}
        strokeWidth={alarm ? 2 : 1.5}
      >
        {alarm && (
          <animate
            attributeName="stroke-opacity"
            values="1;0.25;1"
            dur="1s"
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
          STATUS INDICATOR
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
            values="1;0.25;1"
            dur="0.6s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      {/* =========================================================
          RAW MATERIAL SOURCE / HOPPER
         ========================================================= */}

      <path
        d={`
          M ${cx - 72} ${chuteTop}
          L ${cx + 72} ${chuteTop}
          L ${cx + 48} ${chuteBottom}
          L ${cx - 48} ${chuteBottom}
          Z
        `}
        fill="#111c2d"
        stroke="#1f3b57"
        strokeWidth={2}
      />

      {/* Hopper upper edge */}

      <rect
        x={cx - 72}
        y={chuteTop}
        width={144}
        height={10}
        rx={3}
        fill="#1f3b57"
      />

      {/* =========================================================
          RAW MATERIAL BED
         ========================================================= */}

      <path
        d={`
          M ${cx - 60} ${70}
          Q ${cx - 25} ${58} ${cx} ${70}
          Q ${cx + 30} ${58} ${cx + 60} ${70}
          L ${cx + 45} ${145}
          L ${cx - 45} ${145}
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
              M ${cx} 68
              L ${cx} 205
            `}
            stroke={materialColor}
            strokeWidth={12}
            strokeLinecap="round"
            strokeDasharray="5 12"
            opacity={0.95}
          >
            <animate
              attributeName="stroke-dashoffset"
              values="0;-34"
              dur="0.8s"
              repeatCount="indefinite"
            />
          </path>

          {/* Material particles */}

          {[82, 108, 134, 160, 188].map((py, index) => (
            <circle
              key={index}
              cx={cx + (index % 2 === 0 ? -7 : 7)}
              cy={py}
              r={3}
              fill="#f4c542"
            >
              <animate
                attributeName="cy"
                values={`${py};${py + 22};${py}`}
                dur="1.1s"
                begin={`${index * 0.15}s`}
                repeatCount="indefinite"
              />

              <animate
                attributeName="opacity"
                values="0.25;1;0.25"
                dur="1.1s"
                begin={`${index * 0.15}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </>
      )}

      {/* =========================================================
          MATERIAL LABEL
         ========================================================= */}

      <text
        x={cx}
        y={88}
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
        y={104}
        textAnchor="middle"
        fill="#94a3b8"
        fontSize={8}
        fontFamily={fontFamily}
      >
        FEED
      </text>

      {/* =========================================================
          FEEDER CHAMBER
         ========================================================= */}

      <rect
        x={cx - 78}
        y={feederY}
        width={156}
        height={feederH}
        rx={7}
        fill="#111c2d"
        stroke="#1f3b57"
        strokeWidth={2}
      />

      {/* Feeder shaft */}

      <line
        x1={cx - 58}
        y1={feederY + 24}
        x2={cx + 58}
        y2={feederY + 24}
        stroke="#64748b"
        strokeWidth={5}
      />

      {/* Feeder paddles */}

      {[-42, -14, 14, 42].map((px, index) => (
        <g key={index} transform={`translate(${cx + px}, ${feederY + 24})`}>
          <rect x={-5} y={-17} width={10} height={34} rx={2} fill="#1f3b57" />
        </g>
      ))}

      {/* Feeder animation */}

      {safeFeederRunning && !alarm && (
        <g transform={`translate(${cx}, ${feederY + 24})`}>
          <line
            x1={-55}
            y1={0}
            x2={55}
            y2={0}
            stroke="#00bfff"
            strokeWidth={2}
            strokeDasharray="4 8"
            opacity={0.7}
          >
            <animate
              attributeName="stroke-dashoffset"
              values="0;-24"
              dur="0.5s"
              repeatCount="indefinite"
            />
          </line>
        </g>
      )}

      {/* =========================================================
          GATE / SLIDE GATE
         ========================================================= */}

      <g transform={`translate(${cx}, ${outletY - 8})`}>
        <rect
          x={-55}
          y={0}
          width={110}
          height={16}
          rx={3}
          fill="#0b1220"
          stroke="#1f3b57"
        />

        <rect
          x={safeGateOpen ? -42 : -8}
          y={-5}
          width={50}
          height={26}
          rx={3}
          fill={safeGateOpen ? "#28a745" : "#64748b"}
          opacity={0.85}
        />

        <line
          x1={0}
          y1={-5}
          x2={0}
          y2={21}
          stroke="#d8dee9"
          strokeWidth={2}
          opacity={0.6}
        />
      </g>

      {/* =========================================================
          OUTLET PIPE
         ========================================================= */}

      <path
        d={`
          M ${cx - 25} ${outletY + 8}
          L ${cx - 25} ${height - 48}
          L ${cx + 25} ${height - 48}
          L ${cx + 25} ${outletY + 8}
        `}
        fill="#111c2d"
        stroke="#1f3b57"
        strokeWidth={2}
      />

      {/* Outlet material */}

      {materialFlow && (
        <line
          x1={cx}
          y1={outletY + 18}
          x2={cx}
          y2={height - 48}
          stroke={materialColor}
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray="4 10"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="0;-28"
            dur="0.7s"
            repeatCount="indefinite"
          />
        </line>
      )}

      {/* =========================================================
          GAS FLOW
         ========================================================= */}

      {gasFlow && (
        <path
          d={`
            M ${cx + 75} ${feederY + 24}
            C ${cx + 105} ${feederY + 24},
              ${cx + 105} ${feederY - 5},
              ${cx + 135} ${feederY - 5}
          `}
          fill="none"
          stroke="#00ffff"
          strokeWidth={5}
          strokeDasharray="5 10"
          opacity={0.85}
        >
          <animate
            attributeName="stroke-dashoffset"
            values="0;-30"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </path>
      )}

      {/* =========================================================
          FEEDER STATUS
         ========================================================= */}

      <circle
        cx={width - 75}
        cy={height - 26}
        r={5}
        fill={safeFeederRunning ? "#28a745" : "#6c757d"}
      >
        {safeFeederRunning && (
          <animate
            attributeName="opacity"
            values="0.45;1;0.45"
            dur="1s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      <text
        x={width - 64}
        y={height - 22}
        fill="#94a3b8"
        fontSize={statusSize}
        fontFamily={fontFamily}
      >
        FEEDER
      </text>

      {/* =========================================================
          GATE STATUS
         ========================================================= */}

      <circle
        cx={width - 75}
        cy={height - 48}
        r={5}
        fill={safeGateOpen ? "#28a745" : "#6c757d"}
      />

      <text
        x={width - 64}
        y={height - 44}
        fill="#94a3b8"
        fontSize={statusSize}
        fontFamily={fontFamily}
      >
        {safeGateOpen ? "GATE OPEN" : "GATE CLOSED"}
      </text>

      {/* =========================================================
          DETAIL PANEL
         ========================================================= */}

      {isdetail && (
        <g>
          <rect
            x={15}
            y={height - 78}
            width={width - 170}
            height={60}
            rx={6}
            fill="#111c2d"
            stroke="#1f3b57"
          />

          {/* Flow */}

          <text
            x={28}
            y={height - 58}
            fill="#64748b"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            FLOW
          </text>

          <text
            x={28}
            y={height - 39}
            fill="#f4c542"
            fontSize={valueSize + 2}
            fontWeight="bold"
            fontFamily={fontFamily}
          >
            {flow.toLocaleString()} {flowUnit}
          </text>

          {/* Temperature */}

          <text
            x={125}
            y={height - 58}
            fill="#64748b"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            TEMP
          </text>

          <text
            x={125}
            y={height - 39}
            fill={tempColor}
            fontSize={valueSize + 2}
            fontWeight="bold"
            fontFamily={fontFamily}
          >
            {temperature.toFixed(1)} {temperatureUnit}
          </text>

          {/* Pressure */}

          <text
            x={205}
            y={height - 58}
            fill="#64748b"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            PRESS
          </text>

          <text
            x={205}
            y={height - 39}
            fill="#00bfff"
            fontSize={valueSize + 2}
            fontWeight="bold"
            fontFamily={fontFamily}
          >
            {pressure.toLocaleString()} {pressureUnit}
          </text>
        </g>
      )}

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
          COMMAND AREA
         ========================================================= */}

      {sendCommand && (
        <g onClick={handleCommand} style={{ cursor: "pointer" }}>
          <rect
            x={width - 145}
            y={height - 82}
            width={125}
            height={24}
            rx={5}
            fill={running ? "#3b1820" : "#12351f"}
            stroke={running ? "#dc3545" : "#28a745"}
          />

          <text
            x={width - 82.5}
            y={height - 66}
            textAnchor="middle"
            fill={running ? "#ff6b6b" : "#5ee38b"}
            fontSize={9}
            fontWeight="bold"
            fontFamily={fontFamily}
          >
            {running ? "STOP FEED" : "START FEED"}
          </text>
        </g>
      )}

      {/* =========================================================
          FLOW DIRECTION ARROW
         ========================================================= */}

      {materialFlow && (
        <path
          d={`
            M ${cx - 8} ${height - 42}
            L ${cx} ${height - 32}
            L ${cx + 8} ${height - 42}
          `}
          fill="none"
          stroke="#f4c542"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <animate
            attributeName="opacity"
            values="0.3;1;0.3"
            dur="0.9s"
            repeatCount="indefinite"
          />
        </path>
      )}
    </g>
  );
};

export default RawMaterialInlet;
