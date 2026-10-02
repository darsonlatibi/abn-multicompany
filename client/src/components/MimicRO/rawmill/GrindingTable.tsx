import React from "react";

interface GrindingTableProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;

  tag?: string;
  title?: string;

  temperature?: number;
  pressure?: number;

  materialFlow?: boolean;
  gasFlow?: boolean;

  running?: boolean;
  alarm?: boolean;

  fanRunning?: boolean;
  separatorRunning?: boolean;

  temperatureUnit?: string;
  pressureUnit?: string;

  fontFamily?: string;
  tagSize?: number;
  statusSize?: number;
  valueSize?: number;

  isdetail?: boolean;

  sendCommand?: (command: string, value?: unknown) => void;
}

const GrindingTable: React.FC<GrindingTableProps> = ({
  x = 0,
  y = 0,
  width = 300,
  height = 220,

  tag = "GT-101",
  title = "GRINDING TABLE",

  temperature = 95,
  pressure = -6500,

  materialFlow = true,
  gasFlow = true,

  running = true,
  alarm = false,

  fanRunning,
  separatorRunning,

  temperatureUnit = "°C",
  pressureUnit = "Pa",

  fontFamily = "Arial",
  tagSize = 12,
  statusSize = 11,
  valueSize = 10,

  isdetail = true,

  sendCommand,
}) => {
  const safeFanRunning = fanRunning ?? running;
  const safeSeparatorRunning = separatorRunning ?? running;

  const statusColor = alarm ? "#dc3545" : running ? "#28a745" : "#6c757d";

  const temperatureColor =
    temperature >= 120
      ? "#dc3545"
      : temperature >= 105
        ? "#ff9500"
        : temperature >= 80
          ? "#00bfff"
          : "#94a3b8";

  const handleCommand = () => {
    if (!sendCommand) return;

    sendCommand(running ? "STOP" : "START", {
      tag,
      source: "GrindingTable",
    });
  };

  const cx = width / 2;
  const cy = 105;

  return (
    <g transform={`translate(${x}, ${y})`} fontFamily={fontFamily}>
      {/* =========================================================
          PANEL
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
      />

      {alarm && (
        <animate
          attributeName="stroke-opacity"
          values="1;0.2;1"
          dur="0.7s"
          repeatCount="indefinite"
        />
      )}

      {/* =========================================================
          HEADER
         ========================================================= */}

      <rect
        x={10}
        y={10}
        width={width - 20}
        height={30}
        rx={6}
        fill="#111c2d"
        stroke="#1f3b57"
      />

      <text x={20} y={30} fill="#00bfff" fontSize={tagSize} fontWeight="bold">
        {tag}
      </text>

      <text
        x={cx}
        y={30}
        textAnchor="middle"
        fill="#d8dee9"
        fontSize={tagSize}
        fontWeight="bold"
      >
        {title}
      </text>

      <circle cx={width - 25} cy={25} r={6} fill={statusColor}>
        {running && !alarm && (
          <animate
            attributeName="r"
            values="5;7;5"
            dur="1.2s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      {/* =========================================================
          GAS FLOW
         ========================================================= */}

      {gasFlow && (
        <path
          d={`
            M ${cx} 190
            L ${cx} 145
            L ${cx} 125
          `}
          fill="none"
          stroke="#00bfff"
          strokeWidth={5}
          strokeDasharray="6 12"
          strokeLinecap="round"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="0;-36"
            dur="0.7s"
            repeatCount="indefinite"
          />
        </path>
      )}

      {/* =========================================================
          TABLE BODY
         ========================================================= */}

      <ellipse
        cx={cx}
        cy={cy}
        rx={width * 0.34}
        ry={height * 0.18}
        fill="#111c2d"
        stroke="#1f3b57"
        strokeWidth={3}
      />

      {/* Table upper surface */}

      <ellipse
        cx={cx}
        cy={cy - 5}
        rx={width * 0.3}
        ry={height * 0.13}
        fill="#1f3b57"
        stroke="#64748b"
        strokeWidth={2}
      />

      {/* =========================================================
          MATERIAL BED
         ========================================================= */}

      {materialFlow && (
        <ellipse
          cx={cx}
          cy={cy - 8}
          rx={width * 0.24}
          ry={height * 0.085}
          fill="#f4c542"
          opacity={0.75}
        >
          <animate
            attributeName="opacity"
            values="0.45;0.9;0.45"
            dur="1s"
            repeatCount="indefinite"
          />
        </ellipse>
      )}

      {/* =========================================================
          ROLLERS
         ========================================================= */}

      {[0, 1, 2, 3].map((index) => {
        const angle = (index * Math.PI) / 2;

        const rx = width * 0.22;
        const ry = height * 0.055;

        const rollerX = cx + Math.cos(angle) * rx;

        const rollerY = cy - 5 + Math.sin(angle) * ry;

        return (
          <g
            key={index}
            transform={`
              translate(${rollerX}, ${rollerY})
              rotate(${index * 90})
            `}
          >
            <rect
              x={-24}
              y={-7}
              width={48}
              height={14}
              rx={5}
              fill="#64748b"
              stroke="#94a3b8"
            />

            {running && (
              <animateTransform
                attributeName="transform"
                type="rotate"
                from={`${index * 90} 0 0`}
                to={`${index * 90 + 360} 0 0`}
                dur="2s"
                repeatCount="indefinite"
              />
            )}
          </g>
        );
      })}

      {/* =========================================================
          CENTRAL SHAFT
         ========================================================= */}

      <circle
        cx={cx}
        cy={cy - 5}
        r={18}
        fill="#0b1220"
        stroke="#94a3b8"
        strokeWidth={3}
      />

      <circle
        cx={cx}
        cy={cy - 5}
        r={7}
        fill={running ? "#28a745" : "#6c757d"}
      />

      {running && !alarm && (
        <circle
          cx={cx}
          cy={cy - 5}
          r={24}
          fill="none"
          stroke="#00bfff"
          strokeWidth={2}
          strokeDasharray="4 8"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 ${cx} ${cy - 5}`}
            to={`360 ${cx} ${cy - 5}`}
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      )}

      {/* =========================================================
          MATERIAL FLOW PARTICLES
         ========================================================= */}

      {materialFlow &&
        [0, 1, 2, 3, 4, 5].map((index) => (
          <circle
            key={index}
            cx={cx - 65 + index * 26}
            cy={cy - 8}
            r={3}
            fill="#f4c542"
          >
            <animate
              attributeName="cy"
              values={`${cy - 8};${cy + 5};${cy - 8}`}
              dur="1.4s"
              begin={`${index * 0.15}s`}
              repeatCount="indefinite"
            />

            <animate
              attributeName="opacity"
              values="0.2;1;0.2"
              dur="1.4s"
              begin={`${index * 0.15}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

      {/* =========================================================
          RAW MATERIAL FEED
         ========================================================= */}

      {materialFlow && (
        <line
          x1={cx}
          y1={48}
          x2={cx}
          y2={75}
          stroke="#f4c542"
          strokeWidth={7}
          strokeDasharray="5 10"
          strokeLinecap="round"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="0;-30"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </line>
      )}

      <text
        x={cx}
        y={55}
        textAnchor="middle"
        fill="#f4c542"
        fontSize={8}
        fontWeight="bold"
      >
        RAW MATERIAL
      </text>

      {/* =========================================================
          GAS LABEL
         ========================================================= */}

      {gasFlow && (
        <text
          x={cx}
          y={202}
          textAnchor="middle"
          fill="#00bfff"
          fontSize={8}
          fontWeight="bold"
        >
          HOT GAS ↑
        </text>
      )}

      {/* =========================================================
          DETAIL PANEL
         ========================================================= */}

      {isdetail && (
        <g>
          <rect
            x={12}
            y={height - 42}
            width={width - 24}
            height={30}
            rx={5}
            fill="#111c2d"
            stroke="#1f3b57"
          />

          <text x={22} y={height - 23} fill="#64748b" fontSize={valueSize}>
            TEMP
          </text>

          <text
            x={57}
            y={height - 23}
            fill={temperatureColor}
            fontSize={valueSize + 1}
            fontWeight="bold"
          >
            {temperature}
            {temperatureUnit}
          </text>

          <text x={125} y={height - 23} fill="#64748b" fontSize={valueSize}>
            PRESS
          </text>

          <text
            x={165}
            y={height - 23}
            fill="#94a3b8"
            fontSize={valueSize + 1}
            fontWeight="bold"
          >
            {pressure.toLocaleString()}
            {pressureUnit}
          </text>

          <circle
            cx={width - 65}
            cy={height - 27}
            r={5}
            fill={safeFanRunning ? "#28a745" : "#6c757d"}
          />

          <text
            x={width - 55}
            y={height - 23}
            fill="#94a3b8"
            fontSize={valueSize}
          >
            FAN
          </text>
        </g>
      )}

      {/* =========================================================
          EQUIPMENT STATUS
         ========================================================= */}

      <text
        x={14}
        y={height + 16}
        fill={statusColor}
        fontSize={statusSize}
        fontWeight="bold"
      >
        {alarm ? "● ALARM" : running ? "● RUNNING" : "● STOPPED"}
      </text>

      <text
        x={110}
        y={height + 16}
        fill={safeSeparatorRunning ? "#28a745" : "#6c757d"}
        fontSize={statusSize}
      >
        SEP {safeSeparatorRunning ? "RUN" : "STOP"}
      </text>

      {/* =========================================================
          COMMAND
         ========================================================= */}

      {sendCommand && (
        <g
          onClick={handleCommand}
          style={{
            cursor: "pointer",
          }}
        >
          <rect
            x={width - 125}
            y={height + 1}
            width={110}
            height={23}
            rx={5}
            fill={running ? "#3b1820" : "#12351f"}
            stroke={running ? "#dc3545" : "#28a745"}
          />

          <text
            x={width - 70}
            y={height + 17}
            textAnchor="middle"
            fill={running ? "#ff6b6b" : "#5ee38b"}
            fontSize={8}
            fontWeight="bold"
          >
            {running ? "STOP TABLE" : "START TABLE"}
          </text>
        </g>
      )}
    </g>
  );
};

export default GrindingTable;
