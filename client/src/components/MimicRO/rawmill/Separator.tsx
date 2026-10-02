import React from "react";

interface SeparatorProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;

  tag?: string;
  title?: string;

  temperature?: number;
  pressure?: number;
  rpm?: number;

  materialFlow?: boolean;
  gasFlow?: boolean;
  rawMealFlow?: boolean;
  rejectFlow?: boolean;

  running?: boolean;
  alarm?: boolean;

  fanRunning?: boolean;
  millRunning?: boolean;

  temperatureUnit?: string;
  pressureUnit?: string;
  rpmUnit?: string;

  fontFamily?: string;
  tagSize?: number;
  statusSize?: number;
  valueSize?: number;

  isdetail?: boolean;

  sendCommand?: (command: string, value?: unknown) => void;
}

const Separator: React.FC<SeparatorProps> = ({
  x = 0,
  y = 0,
  width = 300,
  height = 440,

  tag = "SEP-101",
  title = "SEPARATOR",

  temperature = 82,
  pressure = -7200,
  rpm = 850,

  materialFlow = true,
  gasFlow = true,
  rawMealFlow = true,
  rejectFlow = true,

  running = true,
  alarm = false,

  fanRunning,
  millRunning,

  temperatureUnit = "°C",
  pressureUnit = "Pa",
  rpmUnit = "RPM",

  fontFamily = "Arial",
  tagSize = 12,
  statusSize = 11,
  valueSize = 10,

  isdetail = true,

  sendCommand,
}) => {
  const safeFanRunning = fanRunning ?? running;
  const safeMillRunning = millRunning ?? running;

  const statusColor = alarm ? "#dc3545" : running ? "#28a745" : "#6c757d";

  const temperatureColor =
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
      component: "SEPARATOR",
    });
  };

  const centerX = width / 2;

  const bodyTop = 72;
  const bodyBottom = height - 78;

  const bodyWidth = width * 0.58;
  const bodyX = centerX - bodyWidth / 2;

  const cycloneTop = bodyTop + 18;
  const cycloneHeight = height * 0.4;

  const coneTop = cycloneTop + cycloneHeight - 20;
  const coneBottom = coneTop + height * 0.17;

  const rotorY = cycloneTop + cycloneHeight * 0.42;
  const rotorRx = bodyWidth * 0.36;
  const rotorRy = 18;

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
        y={24}
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
          OUTER ALARM BORDER
          ===================================================== */}
      <rect
        x={bodyX - 10}
        y={bodyTop - 10}
        width={bodyWidth + 20}
        height={coneBottom - bodyTop + 20}
        rx={18}
        fill="none"
        stroke={statusColor}
        strokeWidth={alarm ? 3 : 1.5}
        opacity={alarm ? 0.95 : 0.65}
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
          MAIN SEPARATOR BODY
          ===================================================== */}
      <path
        d={`
          M ${bodyX + 18} ${bodyTop}
          H ${bodyX + bodyWidth - 18}
          Q ${bodyX + bodyWidth} ${bodyTop}
            ${bodyX + bodyWidth} ${bodyTop + 18}

          V ${coneTop}

          L ${centerX + bodyWidth * 0.18} ${coneBottom}
          H ${centerX - bodyWidth * 0.18}
          L ${bodyX} ${coneTop}

          V ${bodyTop + 18}
          Q ${bodyX} ${bodyTop}
            ${bodyX + 18} ${bodyTop}
          Z
        `}
        fill="#0b1220"
        stroke={statusColor}
        strokeWidth={2}
      />

      {/* =====================================================
          INNER CYCLONE BODY
          ===================================================== */}
      <path
        d={`
          M ${bodyX + 30} ${bodyTop + 18}
          H ${bodyX + bodyWidth - 30}

          V ${coneTop - 12}

          L ${centerX + bodyWidth * 0.12} ${coneBottom - 12}
          H ${centerX - bodyWidth * 0.12}
          L ${bodyX + 30} ${coneTop - 12}
          Z
        `}
        fill="#111c2d"
        stroke="#1f3b57"
        strokeWidth={1}
      />

      {/* =====================================================
          TOP MOTOR / ROTOR DRIVE
          ===================================================== */}
      <rect
        x={centerX - 34}
        y={bodyTop - 34}
        width={68}
        height={28}
        rx={7}
        fill="#111c2d"
        stroke="#64748b"
        strokeWidth={1.5}
      />

      <rect
        x={centerX - 20}
        y={bodyTop - 28}
        width={40}
        height={16}
        rx={4}
        fill={safeFanRunning ? "#183d32" : "#1b2635"}
        stroke={safeFanRunning ? "#28a745" : "#64748b"}
        strokeWidth={1}
      />

      <circle
        cx={centerX}
        cy={bodyTop - 20}
        r={4}
        fill={safeFanRunning ? "#28a745" : "#6c757d"}
      >
        {safeFanRunning && (
          <animate
            attributeName="opacity"
            values="1;0.35;1"
            dur="0.8s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      {/* =====================================================
          CENTRAL SHAFT
          ===================================================== */}
      <rect
        x={centerX - 4}
        y={bodyTop - 6}
        width={8}
        height={coneBottom - bodyTop + 4}
        fill="#64748b"
      />

      {/* =====================================================
          ROTOR / CAGE
          ===================================================== */}
      <g transform={`translate(${centerX},${rotorY})`}>
        <ellipse
          cx={0}
          cy={0}
          rx={rotorRx}
          ry={rotorRy}
          fill="#18263a"
          stroke="#00bfff"
          strokeWidth={2}
        />

        {[-0.8, -0.4, 0, 0.4, 0.8].map((factor, index) => (
          <line
            key={index}
            x1={factor * rotorRx}
            y1={-rotorRy + 3}
            x2={factor * rotorRx}
            y2={rotorRy - 3}
            stroke="#00bfff"
            strokeWidth={1.5}
            opacity={0.8}
          />
        ))}

        <circle
          cx={0}
          cy={0}
          r={8}
          fill="#0b1220"
          stroke="#00ffff"
          strokeWidth={2}
        />

        {running && (
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0"
            to="360"
            dur="1.8s"
            repeatCount="indefinite"
          />
        )}
      </g>

      {/* =====================================================
          MATERIAL BED / CLASSIFICATION ZONE
          ===================================================== */}
      <ellipse
        cx={centerX}
        cy={rotorY + 48}
        rx={bodyWidth * 0.34}
        ry={17}
        fill="#3b2f16"
        stroke="#f4c542"
        strokeWidth={1.5}
        opacity={materialFlow ? 0.95 : 0.35}
      />

      {materialFlow && (
        <ellipse
          cx={centerX}
          cy={rotorY + 48}
          rx={bodyWidth * 0.29}
          ry={10}
          fill="none"
          stroke="#f4c542"
          strokeWidth={2}
          strokeDasharray="5 5"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-20"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </ellipse>
      )}

      {/* =====================================================
          RAW MATERIAL FEED
          ===================================================== */}
      <path
        d={`
          M ${centerX} ${bodyTop - 55}
          V ${rotorY - 20}
        `}
        fill="none"
        stroke={materialFlow ? "#f4c542" : "#64748b"}
        strokeWidth={5}
        strokeLinecap="round"
        strokeDasharray={materialFlow ? "7 6" : "0"}
      >
        {materialFlow && (
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-26"
            dur="0.7s"
            repeatCount="indefinite"
          />
        )}
      </path>

      <polygon
        points={`
          ${centerX - 6},${rotorY - 25}
          ${centerX + 6},${rotorY - 25}
          ${centerX},${rotorY - 12}
        `}
        fill={materialFlow ? "#f4c542" : "#64748b"}
      />

      {/* =====================================================
          HOT GAS INLET
          ===================================================== */}
      <path
        d={`
          M ${bodyX - 42} ${rotorY + 75}
          H ${bodyX + 12}
          Q ${bodyX + 28} ${rotorY + 75}
            ${bodyX + 35} ${rotorY + 58}
        `}
        fill="none"
        stroke={gasFlow ? "#00ffff" : "#64748b"}
        strokeWidth={5}
        strokeLinecap="round"
        strokeDasharray={gasFlow ? "8 6" : "0"}
      >
        {gasFlow && (
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-28"
            dur="0.8s"
            repeatCount="indefinite"
          />
        )}
      </path>

      <text
        x={bodyX - 38}
        y={rotorY + 103}
        fill="#00ffff"
        fontSize={valueSize}
        fontFamily={fontFamily}
      >
        HOT GAS
      </text>

      {/* =====================================================
          FINE RAW MEAL OUTLET
          ===================================================== */}
      <path
        d={`
          M ${bodyX + bodyWidth - 10} ${rotorY - 5}
          H ${width - 12}
        `}
        fill="none"
        stroke={rawMealFlow ? "#f4c542" : "#64748b"}
        strokeWidth={5}
        strokeLinecap="round"
        strokeDasharray={rawMealFlow ? "8 6" : "0"}
      >
        {rawMealFlow && (
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
          ${width - 18},${rotorY - 11}
          ${width - 5},${rotorY}
          ${width - 18},${rotorY + 11}
        `}
        fill={rawMealFlow ? "#f4c542" : "#64748b"}
      />

      <text
        x={width - 12}
        y={rotorY - 17}
        textAnchor="end"
        fill="#f4c542"
        fontSize={valueSize}
        fontFamily={fontFamily}
      >
        RAW MEAL
      </text>

      {/* =====================================================
          REJECT / COARSE MATERIAL
          ===================================================== */}
      <path
        d={`
          M ${centerX} ${coneBottom}
          V ${height - 48}
        `}
        fill="none"
        stroke={rejectFlow ? "#f4c542" : "#64748b"}
        strokeWidth={5}
        strokeLinecap="round"
        strokeDasharray={rejectFlow ? "8 6" : "0"}
      >
        {rejectFlow && (
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="28"
            dur="0.7s"
            repeatCount="indefinite"
          />
        )}
      </path>

      <polygon
        points={`
          ${centerX - 7},${height - 56}
          ${centerX + 7},${height - 56}
          ${centerX},${height - 42}
        `}
        fill={rejectFlow ? "#f4c542" : "#64748b"}
      />

      <text
        x={centerX + 16}
        y={height - 53}
        fill="#f4c542"
        fontSize={valueSize}
        fontFamily={fontFamily}
      >
        REJECT
      </text>

      {/* =====================================================
          INTERNAL AIR / GAS RISING
          ===================================================== */}
      <g opacity={gasFlow ? 0.9 : 0.25}>
        {[0, 1, 2].map((index) => {
          const offset = (index - 1) * 26;

          return (
            <path
              key={index}
              d={`
                M ${centerX + offset} ${coneBottom - 15}
                C ${centerX + offset - 15} ${rotorY + 80},
                  ${centerX + offset + 15} ${rotorY + 35},
                  ${centerX + offset} ${rotorY - 25}
              `}
              fill="none"
              stroke="#00bfff"
              strokeWidth={2}
              strokeDasharray="5 7"
            >
              {gasFlow && (
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-24"
                  dur={`${1 + index * 0.15}s`}
                  repeatCount="indefinite"
                />
              )}
            </path>
          );
        })}
      </g>

      {/* =====================================================
          DETAIL PANEL
          ===================================================== */}
      {isdetail && (
        <g>
          <rect
            x={bodyX + 16}
            y={bodyBottom - 55}
            width={bodyWidth - 32}
            height={54}
            rx={8}
            fill="#0b1220"
            stroke="#1f3b57"
            strokeWidth={1}
          />

          {/* Temperature */}
          <text
            x={bodyX + 28}
            y={bodyBottom - 36}
            fill="#94a3b8"
            fontSize={valueSize - 1}
            fontFamily={fontFamily}
          >
            TEMP
          </text>

          <text
            x={bodyX + 28}
            y={bodyBottom - 18}
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
            y={bodyBottom - 36}
            textAnchor="middle"
            fill="#94a3b8"
            fontSize={valueSize - 1}
            fontFamily={fontFamily}
          >
            PRESS
          </text>

          <text
            x={centerX}
            y={bodyBottom - 18}
            textAnchor="middle"
            fill="#aab4c3"
            fontSize={valueSize}
            fontFamily={fontFamily}
            fontWeight="700"
          >
            {pressure}
            {pressureUnit}
          </text>

          {/* RPM */}
          <text
            x={bodyX + bodyWidth - 28}
            y={bodyBottom - 36}
            textAnchor="end"
            fill="#94a3b8"
            fontSize={valueSize - 1}
            fontFamily={fontFamily}
          >
            SPEED
          </text>

          <text
            x={bodyX + bodyWidth - 28}
            y={bodyBottom - 18}
            textAnchor="end"
            fill={running ? "#00bfff" : "#94a3b8"}
            fontSize={valueSize}
            fontFamily={fontFamily}
            fontWeight="700"
          >
            {rpm} {rpmUnit}
          </text>
        </g>
      )}

      {/* =====================================================
          STATUS INDICATOR
          ===================================================== */}
      <circle cx={bodyX + 18} cy={height - 20} r={6} fill={statusColor}>
        {running && !alarm && (
          <animate
            attributeName="opacity"
            values="1;0.4;1"
            dur="1.2s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      {/* =====================================================
          TAG
          ===================================================== */}
      <text
        x={bodyX + 32}
        y={height - 16}
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
        y={height - 16}
        textAnchor="end"
        fill={statusColor}
        fontSize={statusSize}
        fontFamily={fontFamily}
        fontWeight="700"
      >
        {alarm ? "ALARM" : running ? "RUNNING" : "STOPPED"}
      </text>

      {/* =====================================================
          MOTOR / MILL STATUS
          ===================================================== */}
      {isdetail && (
        <text
          x={width - 10}
          y={height - 38}
          textAnchor="end"
          fill={safeMillRunning ? "#28a745" : "#6c757d"}
          fontSize={valueSize - 1}
          fontFamily={fontFamily}
        >
          MILL {safeMillRunning ? "ON" : "OFF"} • FAN{" "}
          {safeFanRunning ? "ON" : "OFF"}
        </text>
      )}
    </g>
  );
};

export default Separator;
