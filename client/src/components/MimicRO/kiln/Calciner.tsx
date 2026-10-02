import React from "react";

interface CalcinerProps {
  x?: number;
  y?: number;

  width?: number;
  height?: number;

  tag?: string;
  title?: string;

  temperature?: number;
  pressure?: number;
  materialFlow?: number;
  fuelFlow?: number;

  materialFlowActive?: boolean;
  fuelFlowActive?: boolean;
  flame?: boolean;

  running?: boolean;
  alarm?: boolean;

  temperatureUnit?: string;
  materialFlowUnit?: string;
  fuelFlowUnit?: string;
}

const Calciner: React.FC<CalcinerProps> = ({
  x = 0,
  y = 0,

  width = 150,
  height = 280,

  tag = "CL-101",
  title = "CALCINER",

  temperature = 900,
  pressure = -80,
  materialFlow = 120,
  fuelFlow = 3.5,

  materialFlowActive = true,
  fuelFlowActive = true,
  flame = true,

  running = true,
  alarm = false,

  temperatureUnit = "°C",
  materialFlowUnit = "t/h",
  fuelFlowUnit = "Nm³/h",
}) => {
  /* =========================================================
     STATUS
     ========================================================= */

  const safeTemperature = Number.isFinite(Number(temperature))
    ? Number(temperature)
    : 0;

  const safePressure = Number.isFinite(Number(pressure)) ? Number(pressure) : 0;

  const safeMaterialFlow = Number.isFinite(Number(materialFlow))
    ? Number(materialFlow)
    : 0;

  const safeFuelFlow = Number.isFinite(Number(fuelFlow)) ? Number(fuelFlow) : 0;

  const statusColor = alarm ? "#dc3545" : running ? "#00ff88" : "#64748b";

  const temperatureColor =
    safeTemperature >= 1000
      ? "#ff3b30"
      : safeTemperature >= 800
        ? "#ff9500"
        : safeTemperature >= 500
          ? "#00bfff"
          : "#94a3b8";

  /* =========================================================
     DIMENSIONS
     ========================================================= */

  const centerX = width / 2;

  const bodyTop = 34;
  const bodyHeight = height * 0.64;

  const bodyX = width * 0.18;
  const bodyWidth = width * 0.64;

  const coneHeight = height * 0.14;

  const coneTop = bodyTop + bodyHeight;
  const coneBottom = coneTop + coneHeight;

  const inletWidth = width * 0.2;
  const inletX = centerX - inletWidth / 2;

  const gasOutletWidth = width * 0.26;
  const gasOutletX = centerX - gasOutletWidth / 2;

  const burnerY = bodyTop + bodyHeight * 0.7;

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
        y={10}
        textAnchor="middle"
        fill="#00bfff"
        fontSize="12"
        fontWeight="bold"
      >
        {title}
      </text>

      {/* =====================================================
          TOP GAS OUTLET
          ===================================================== */}

      <rect
        x={gasOutletX}
        y="14"
        width={gasOutletWidth}
        height={bodyTop - 14}
        fill="#0b1220"
        stroke={statusColor}
        strokeWidth="2"
      />

      {/* =====================================================
          GAS FLOW OUTLET
          ===================================================== */}

      {running && (
        <line
          x1={centerX}
          y1={bodyTop - 2}
          x2={centerX}
          y2="16"
          stroke="#00ffff"
          strokeWidth="3"
          strokeDasharray="7 5"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-24"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </line>
      )}

      {/* =====================================================
          OUTER CALCINER BODY
          ===================================================== */}

      <rect
        x={bodyX}
        y={bodyTop}
        width={bodyWidth}
        height={bodyHeight}
        rx="10"
        fill="#0b1220"
        stroke={statusColor}
        strokeWidth="2"
      />

      {/* =====================================================
          INNER CALCINER BODY
          ===================================================== */}

      <rect
        x={bodyX + 5}
        y={bodyTop + 5}
        width={bodyWidth - 10}
        height={bodyHeight - 10}
        rx="7"
        fill="#111c2d"
        stroke="#1f3b57"
        strokeWidth="1"
      />

      {/* =====================================================
          HOT ZONE
          ===================================================== */}

      <rect
        x={bodyX + 8}
        y={bodyTop + bodyHeight * 0.38}
        width={bodyWidth - 16}
        height={bodyHeight * 0.56}
        rx="5"
        fill={temperatureColor}
        opacity="0.08"
      >
        {running && (
          <animate
            attributeName="opacity"
            values="0.05;0.16;0.05"
            dur="1.6s"
            repeatCount="indefinite"
          />
        )}
      </rect>

      {/* =====================================================
          MATERIAL INLET
          ===================================================== */}

      <rect
        x={inletX}
        y={coneBottom}
        width={inletWidth}
        height="28"
        fill="#0b1220"
        stroke={statusColor}
        strokeWidth="2"
      />

      {/* =====================================================
          MATERIAL INLET FLOW
          ===================================================== */}

      {materialFlowActive && safeMaterialFlow > 0 && (
        <line
          x1={centerX}
          y1={coneBottom + 4}
          x2={centerX}
          y2={coneBottom + 24}
          stroke="#f4c542"
          strokeWidth="4"
          strokeDasharray="7 5"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="24"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </line>
      )}

      {/* =====================================================
          CALCINER CONE
          ===================================================== */}

      <path
        d={`
          M ${bodyX} ${coneTop}
          L ${bodyX + bodyWidth} ${coneTop}
          L ${centerX + inletWidth / 2} ${coneBottom}
          L ${centerX - inletWidth / 2} ${coneBottom}
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
          M ${bodyX + 5} ${coneTop + 4}
          L ${bodyX + bodyWidth - 5} ${coneTop + 4}
          L ${centerX + inletWidth / 2 - 3} ${coneBottom - 4}
          L ${centerX - inletWidth / 2 + 3} ${coneBottom - 4}
          Z
        `}
        fill="#111c2d"
        stroke="#1f3b57"
        strokeWidth="1"
      />

      {/* =====================================================
          MATERIAL FALL
          ===================================================== */}

      {materialFlowActive && safeMaterialFlow > 0 && (
        <path
          d={`
            M ${centerX} ${bodyTop + 15}
            C ${centerX - 20} ${bodyTop + 45},
              ${centerX + 18} ${bodyTop + 85},
              ${centerX} ${bodyTop + 120}

            C ${centerX - 18} ${bodyTop + 155},
              ${centerX + 20} ${bodyTop + 185},
              ${centerX} ${coneTop}
          `}
          fill="none"
          stroke="#f4c542"
          strokeWidth="3"
          strokeDasharray="7 6"
          opacity="0.85"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="26"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </path>
      )}

      {/* =====================================================
          SECONDARY AIR INLET
          ===================================================== */}

      <path
        d={`
          M ${bodyX - 35} ${bodyTop + bodyHeight * 0.52}
          L ${bodyX} ${bodyTop + bodyHeight * 0.52}
        `}
        fill="none"
        stroke="#d8dee9"
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* =====================================================
          SECONDARY AIR FLOW
          ===================================================== */}

      {running && (
        <path
          d={`
            M ${bodyX - 32} ${bodyTop + bodyHeight * 0.52}
            L ${bodyX - 3} ${bodyTop + bodyHeight * 0.52}
          `}
          fill="none"
          stroke="#00ffff"
          strokeWidth="3"
          strokeDasharray="7 5"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-24"
            dur="0.55s"
            repeatCount="indefinite"
          />
        </path>
      )}

      {/* =====================================================
          CALCINER BURNER
          ===================================================== */}

      <rect
        x={bodyX - 10}
        y={burnerY - 10}
        width="34"
        height="20"
        rx="5"
        fill="#0b1220"
        stroke={statusColor}
        strokeWidth="2"
      />

      {/* =====================================================
          FUEL FLOW
          ===================================================== */}

      {fuelFlowActive && safeFuelFlow > 0 && (
        <line
          x1={bodyX - 38}
          y1={burnerY}
          x2={bodyX - 8}
          y2={burnerY}
          stroke="#f4c542"
          strokeWidth="3"
          strokeDasharray="7 5"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-24"
            dur="0.5s"
            repeatCount="indefinite"
          />
        </line>
      )}

      {/* =====================================================
          CALCINER FLAME
          ===================================================== */}

      {flame && running && (
        <>
          {/* OUTER FLAME */}

          <path
            d={`
              M ${bodyX + 22} ${burnerY}

              C ${bodyX + 38} ${burnerY - 18},
                ${bodyX + 58} ${burnerY - 22},
                ${bodyX + 72} ${burnerY - 4}

              C ${bodyX + 62} ${burnerY + 8},
                ${bodyX + 42} ${burnerY + 18},
                ${bodyX + 22} ${burnerY}

              Z
            `}
            fill="#ff3b30"
            opacity="0.80"
          >
            <animate
              attributeName="opacity"
              values="0.60;0.90;0.60"
              dur="0.5s"
              repeatCount="indefinite"
            />
          </path>

          {/* INNER FLAME */}

          <path
            d={`
              M ${bodyX + 24} ${burnerY}

              C ${bodyX + 40} ${burnerY - 11},
                ${bodyX + 52} ${burnerY - 13},
                ${bodyX + 62} ${burnerY}

              C ${bodyX + 50} ${burnerY + 10},
                ${bodyX + 37} ${burnerY + 9},
                ${bodyX + 24} ${burnerY}

              Z
            `}
            fill="#ff9500"
            opacity="0.95"
          >
            <animate
              attributeName="opacity"
              values="0.70;1;0.70"
              dur="0.35s"
              repeatCount="indefinite"
            />
          </path>

          {/* FLAME CORE */}

          <ellipse
            cx={bodyX + 30}
            cy={burnerY}
            rx="10"
            ry="5"
            fill="#ffe066"
            opacity="0.95"
          >
            <animate
              attributeName="rx"
              values="7;12;7"
              dur="0.3s"
              repeatCount="indefinite"
            />
          </ellipse>
        </>
      )}

      {/* =====================================================
          TEMPERATURE
          ===================================================== */}

      <text
        x={centerX}
        y={bodyTop + bodyHeight * 0.35}
        textAnchor="middle"
        fill={temperatureColor}
        fontSize="15"
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
        y={bodyTop + bodyHeight * 0.43}
        textAnchor="middle"
        fill="#aab4c3"
        fontSize="10"
      >
        {safePressure.toFixed(0)} Pa
      </text>

      {/* =====================================================
          MATERIAL FLOW VALUE
          ===================================================== */}

      <text
        x={centerX}
        y={bodyTop + bodyHeight * 0.5}
        textAnchor="middle"
        fill="#f4c542"
        fontSize="10"
      >
        MATERIAL {safeMaterialFlow.toFixed(1)} {materialFlowUnit}
      </text>

      {/* =====================================================
          FUEL FLOW VALUE
          ===================================================== */}

      <text
        x={centerX}
        y={bodyTop + bodyHeight * 0.57}
        textAnchor="middle"
        fill="#f4c542"
        fontSize="10"
      >
        FUEL {safeFuelFlow.toFixed(1)} {fuelFlowUnit}
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
          FLAME STATUS
          ===================================================== */}

      <circle
        cx={bodyX + 24}
        cy={burnerY}
        r="3"
        fill={flame && running ? "#ff9500" : "#475569"}
      >
        {flame && running && (
          <animate
            attributeName="r"
            values="2;4;2"
            dur="0.4s"
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
          y="18"
          width={width - 10}
          height={height - 18}
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
        y={height + 14}
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
        y={height + 30}
        textAnchor="middle"
        fill={statusColor}
        fontSize="10"
        fontWeight="bold"
      >
        {alarm ? "ALARM" : running ? (flame ? "CALCINING" : "RUN") : "STOP"}
      </text>
    </g>
  );
};

export default Calciner;
