import React from "react";

interface CycloneProps {
  x?: number;
  y?: number;

  width?: number;
  height?: number;

  tag?: string;
  title?: string;

  temperature?: number;
  pressure?: number;

  materialFlow?: boolean;
  running?: boolean;
  alarm?: boolean;

  temperatureUnit?: string;
}

const Cyclone: React.FC<CycloneProps> = ({
  x = 0,
  y = 0,

  width = 120,
  height = 220,

  tag = "CY-101",
  title = "CYCLONE 1",

  temperature = 850,
  pressure = -120,

  materialFlow = true,
  running = true,
  alarm = false,

  temperatureUnit = "°C",
}) => {
  /* =========================================================
     STATUS
     ========================================================= */

  const safeTemperature = Number.isFinite(Number(temperature))
    ? Number(temperature)
    : 0;

  const safePressure = Number.isFinite(Number(pressure)) ? Number(pressure) : 0;

  const statusColor = alarm ? "#dc3545" : running ? "#00ff88" : "#64748b";

  const temperatureColor =
    safeTemperature >= 900
      ? "#ff3b30"
      : safeTemperature >= 700
        ? "#ff9500"
        : "#00bfff";

  /* =========================================================
     DIMENSIONS
     ========================================================= */

  const bodyHeight = height * 0.52;
  const coneHeight = height * 0.32;

  const bodyTop = 28;

  const coneTop = bodyTop + bodyHeight;

  const centerX = width / 2;

  const coneBottom = coneTop + coneHeight;

  const outletWidth = width * 0.18;

  const outletX = centerX - outletWidth / 2;

  /* =========================================================
     SVG
     ========================================================= */

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* =====================================================
          TITLE
          ===================================================== */}

      <text
        x={centerX}
        y={8}
        textAnchor="middle"
        fill="#00bfff"
        fontSize="12"
        fontWeight="bold"
      >
        {title}
      </text>

      {/* =====================================================
          OUTER CYCLONE BODY
          ===================================================== */}

      <rect
        x="10"
        y={bodyTop}
        width={width - 20}
        height={bodyHeight}
        rx="8"
        fill="#0b1220"
        stroke={statusColor}
        strokeWidth="2"
      />

      {/* =====================================================
          INNER BODY
          ===================================================== */}

      <rect
        x="14"
        y={bodyTop + 4}
        width={width - 28}
        height={bodyHeight - 8}
        rx="5"
        fill="#111c2d"
        stroke="#1f3b57"
        strokeWidth="1"
      />

      {/* =====================================================
          HOT ZONE
          ===================================================== */}

      <rect
        x="15"
        y={bodyTop + bodyHeight * 0.55}
        width={width - 30}
        height={bodyHeight * 0.41}
        fill={temperatureColor}
        opacity="0.10"
      >
        <animate
          attributeName="opacity"
          values="0.08;0.16;0.08"
          dur="2s"
          repeatCount="indefinite"
        />
      </rect>

      {/* =====================================================
          CYCLONE CONE
          ===================================================== */}

      <path
        d={`
          M 10 ${coneTop}
          L ${width - 10} ${coneTop}
          L ${centerX + outletWidth / 2} ${coneBottom}
          L ${centerX - outletWidth / 2} ${coneBottom}
          Z
        `}
        fill="#0b1220"
        stroke={statusColor}
        strokeWidth="2"
      />

      {/* =====================================================
          CONE INNER
          ===================================================== */}

      <path
        d={`
          M 15 ${coneTop + 4}
          L ${width - 15} ${coneTop + 4}
          L ${centerX + outletWidth / 2 - 2} ${coneBottom - 4}
          L ${centerX - outletWidth / 2 + 2} ${coneBottom - 4}
          Z
        `}
        fill="#111c2d"
        stroke="#1f3b57"
        strokeWidth="1"
      />

      {/* =====================================================
          TOP GAS OUTLET
          ===================================================== */}

      <rect
        x={centerX - width * 0.13}
        y="0"
        width={width * 0.26}
        height={bodyTop}
        fill="#0b1220"
        stroke={statusColor}
        strokeWidth="2"
      />

      {/* =====================================================
          GAS FLOW
          ===================================================== */}

      {running && (
        <path
          d={`
            M ${centerX} ${bodyTop - 4}
            L ${centerX} 4
          `}
          fill="none"
          stroke="#00ffff"
          strokeWidth="2"
          strokeDasharray="6 4"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-20"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </path>
      )}

      {/* =====================================================
          RAW MEAL INLET
          ===================================================== */}

      <path
        d={`
          M -18 ${bodyTop + bodyHeight * 0.25}
          L 10 ${bodyTop + bodyHeight * 0.25}
        `}
        fill="none"
        stroke="#d8dee9"
        strokeWidth="8"
      />

      {/* =====================================================
          RAW MEAL FLOW
          ===================================================== */}

      {materialFlow && (
        <path
          d={`
            M -16 ${bodyTop + bodyHeight * 0.25}
            L 8 ${bodyTop + bodyHeight * 0.25}
          `}
          fill="none"
          stroke="#f4c542"
          strokeWidth="3"
          strokeDasharray="7 5"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-24"
            dur="0.7s"
            repeatCount="indefinite"
          />
        </path>
      )}

      {/* =====================================================
          MATERIAL FALL
          ===================================================== */}

      {materialFlow && (
        <path
          d={`
            M ${centerX} ${bodyTop + 45}
            C ${centerX + 28} ${bodyTop + 65},
              ${centerX + 25} ${coneTop - 15},
              ${centerX} ${coneTop + 10}
          `}
          fill="none"
          stroke="#f4c542"
          strokeWidth="3"
          strokeDasharray="5 5"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="20"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </path>
      )}

      {/* =====================================================
          DIPLEG / MATERIAL OUTLET
          ===================================================== */}

      <rect
        x={outletX}
        y={coneBottom}
        width={outletWidth}
        height="32"
        fill="#0b1220"
        stroke={statusColor}
        strokeWidth="2"
      />

      {/* =====================================================
          MATERIAL OUTLET FLOW
          ===================================================== */}

      {materialFlow && (
        <line
          x1={centerX}
          y1={coneBottom + 4}
          x2={centerX}
          y2={coneBottom + 28}
          stroke="#f4c542"
          strokeWidth="3"
          strokeDasharray="6 4"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="20"
            dur="0.7s"
            repeatCount="indefinite"
          />
        </line>
      )}

      {/* =====================================================
          TEMPERATURE
          ===================================================== */}

      <text
        x={centerX}
        y={bodyTop + bodyHeight * 0.48}
        textAnchor="middle"
        fill={temperatureColor}
        fontSize="14"
        fontWeight="bold"
      >
        {safeTemperature.toFixed(0)}
        {temperatureUnit}
      </text>

      {/* =====================================================
          PRESSURE
          ===================================================== */}

      <text
        x={centerX}
        y={bodyTop + bodyHeight * 0.6}
        textAnchor="middle"
        fill="#aab4c3"
        fontSize="11"
      >
        {safePressure.toFixed(0)} Pa
      </text>

      {/* =====================================================
          STATUS
          ===================================================== */}

      <circle cx={width - 14} cy={bodyTop + 14} r="5" fill={statusColor}>
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
          ALARM BORDER
          ===================================================== */}

      {alarm && (
        <rect
          x="5"
          y={bodyTop - 5}
          width={width - 10}
          height={height - bodyTop + 5}
          fill="none"
          stroke="#dc3545"
          strokeWidth="3"
          rx="10"
        >
          <animate
            attributeName="opacity"
            values="1;0.2;1"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </rect>
      )}

      {/* =====================================================
          TAG
          ===================================================== */}

      <text
        x={centerX}
        y={height + 12}
        textAnchor="middle"
        fill="#94a3b8"
        fontSize="11"
      >
        {tag}
      </text>

      {/* =====================================================
          STATUS TEXT
          ===================================================== */}

      <text
        x={centerX}
        y={height + 28}
        textAnchor="middle"
        fill={statusColor}
        fontSize="10"
        fontWeight="bold"
      >
        {alarm ? "ALARM" : running ? "RUN" : "STOP"}
      </text>
    </g>
  );
};

export default Cyclone;
