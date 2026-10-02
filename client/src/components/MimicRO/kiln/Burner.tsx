import React from "react";

interface BurnerProps {
  x?: number;
  y?: number;

  width?: number;
  height?: number;

  tag?: string;
  title?: string;

  temperature?: number;
  pressure?: number;
  fuelFlow?: number;

  fuelFlowActive?: boolean;
  flame?: boolean;
  running?: boolean;
  alarm?: boolean;

  temperatureUnit?: string;
  fuelFlowUnit?: string;
}

const Burner: React.FC<BurnerProps> = ({
  x = 0,
  y = 0,

  width = 220,
  height = 110,

  tag = "BR-101",
  title = "KILN BURNER",

  temperature = 1050,
  pressure = -35,
  fuelFlow = 2.5,

  fuelFlowActive = true,
  flame = true,
  running = true,
  alarm = false,

  temperatureUnit = "°C",
  fuelFlowUnit = "Nm³/h",
}) => {
  /* =========================================================
     STATUS
     ========================================================= */

  const safeTemperature = Number.isFinite(Number(temperature))
    ? Number(temperature)
    : 0;

  const safePressure = Number.isFinite(Number(pressure)) ? Number(pressure) : 0;

  const safeFuelFlow = Number.isFinite(Number(fuelFlow)) ? Number(fuelFlow) : 0;

  const statusColor = alarm ? "#dc3545" : running ? "#00ff88" : "#64748b";

  const temperatureColor =
    safeTemperature >= 1200
      ? "#ff3b30"
      : safeTemperature >= 900
        ? "#ff9500"
        : safeTemperature >= 500
          ? "#00bfff"
          : "#94a3b8";

  /* =========================================================
     DIMENSIONS
     ========================================================= */

  const centerY = height / 2;

  const bodyX = width * 0.3;
  const bodyWidth = width * 0.43;

  const bodyY = height * 0.28;
  const bodyHeight = height * 0.44;

  const nozzleX = bodyX + bodyWidth;
  const nozzleWidth = width * 0.12;

  const flameStartX = nozzleX + nozzleWidth;

  const flameLength = width * 0.3;

  const airInletY = bodyY + bodyHeight * 0.28;
  const fuelInletY = bodyY + bodyHeight * 0.72;

  /* =========================================================
     SVG
     ========================================================= */

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* =====================================================
          TITLE
          ===================================================== */}

      <text
        x={width / 2}
        y={8}
        textAnchor="middle"
        fill="#00bfff"
        fontSize="12"
        fontWeight="bold"
      >
        {title}
      </text>

      {/* =====================================================
          BURNER BODY
          ===================================================== */}

      <rect
        x={bodyX}
        y={bodyY}
        width={bodyWidth}
        height={bodyHeight}
        rx="8"
        fill="#0b1220"
        stroke={statusColor}
        strokeWidth="2"
      />

      {/* =====================================================
          INNER BURNER BODY
          ===================================================== */}

      <rect
        x={bodyX + 5}
        y={bodyY + 5}
        width={bodyWidth - 10}
        height={bodyHeight - 10}
        rx="5"
        fill="#111c2d"
        stroke="#1f3b57"
        strokeWidth="1"
      />

      {/* =====================================================
          HOT ZONE
          ===================================================== */}

      <rect
        x={bodyX + 8}
        y={bodyY + 8}
        width={bodyWidth - 16}
        height={bodyHeight - 16}
        rx="4"
        fill={temperatureColor}
        opacity="0.08"
      >
        {running && (
          <animate
            attributeName="opacity"
            values="0.05;0.14;0.05"
            dur="1.5s"
            repeatCount="indefinite"
          />
        )}
      </rect>

      {/* =====================================================
          BURNER REAR CAP
          ===================================================== */}

      <ellipse
        cx={bodyX}
        cy={centerY}
        rx="9"
        ry={bodyHeight * 0.48}
        fill="#0b1220"
        stroke={statusColor}
        strokeWidth="2"
      />

      {/* =====================================================
          COMBUSTION AIR INLET
          ===================================================== */}

      <path
        d={`
          M ${bodyX - 48} ${airInletY}
          L ${bodyX} ${airInletY}
        `}
        fill="none"
        stroke="#d8dee9"
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* =====================================================
          COMBUSTION AIR FLOW
          ===================================================== */}

      {running && (
        <path
          d={`
            M ${bodyX - 45} ${airInletY}
            L ${bodyX - 3} ${airInletY}
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
            dur="0.6s"
            repeatCount="indefinite"
          />
        </path>
      )}

      {/* =====================================================
          FUEL INLET
          ===================================================== */}

      <path
        d={`
          M ${bodyX - 48} ${fuelInletY}
          L ${bodyX} ${fuelInletY}
        `}
        fill="none"
        stroke="#d8dee9"
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* =====================================================
          FUEL FLOW
          ===================================================== */}

      {fuelFlowActive && safeFuelFlow > 0 && (
        <path
          d={`
            M ${bodyX - 45} ${fuelInletY}
            L ${bodyX - 3} ${fuelInletY}
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
            dur="0.5s"
            repeatCount="indefinite"
          />
        </path>
      )}

      {/* =====================================================
          NOZZLE
          ===================================================== */}

      <path
        d={`
          M ${nozzleX} ${bodyY + 8}
          L ${nozzleX + nozzleWidth} ${centerY}
          L ${nozzleX} ${bodyY + bodyHeight - 8}
          Z
        `}
        fill="#0b1220"
        stroke={statusColor}
        strokeWidth="2"
      />

      {/* =====================================================
          NOZZLE INNER
          ===================================================== */}

      <path
        d={`
          M ${nozzleX + 5} ${bodyY + 14}
          L ${nozzleX + nozzleWidth - 4} ${centerY}
          L ${nozzleX + 5} ${bodyY + bodyHeight - 14}
          Z
        `}
        fill="#111c2d"
        stroke="#1f3b57"
        strokeWidth="1"
      />

      {/* =====================================================
          FLAME BASE
          ===================================================== */}

      {flame && running && (
        <>
          <ellipse
            cx={flameStartX + flameLength * 0.12}
            cy={centerY}
            rx={flameLength * 0.1}
            ry={height * 0.18}
            fill="#ff3b30"
            opacity="0.30"
          >
            <animate
              attributeName="rx"
              values={`${flameLength * 0.08};${flameLength * 0.13};${flameLength * 0.08}`}
              dur="0.45s"
              repeatCount="indefinite"
            />

            <animate
              attributeName="opacity"
              values="0.20;0.38;0.20"
              dur="0.45s"
              repeatCount="indefinite"
            />
          </ellipse>

          {/* =================================================
              OUTER FLAME
              ================================================= */}

          <path
            d={`
              M ${flameStartX} ${centerY}
              C ${flameStartX + flameLength * 0.1}
                ${centerY - height * 0.2},
                ${flameStartX + flameLength * 0.38}
                ${centerY - height * 0.32},
                ${flameStartX + flameLength}
                ${centerY - height * 0.05}

              C ${flameStartX + flameLength * 0.72}
                ${centerY + height * 0.08},
                ${flameStartX + flameLength * 0.38}
                ${centerY + height * 0.3},
                ${flameStartX + flameLength * 0.1}
                ${centerY + height * 0.18}

              Z
            `}
            fill="#ff3b30"
            opacity="0.85"
          >
            <animate
              attributeName="opacity"
              values="0.65;0.95;0.65"
              dur="0.55s"
              repeatCount="indefinite"
            />
          </path>

          {/* =================================================
              INNER FLAME
              ================================================= */}

          <path
            d={`
              M ${flameStartX + 4} ${centerY}
              C ${flameStartX + flameLength * 0.12}
                ${centerY - height * 0.12},
                ${flameStartX + flameLength * 0.3}
                ${centerY - height * 0.18},
                ${flameStartX + flameLength * 0.7}
                ${centerY}

              C ${flameStartX + flameLength * 0.4}
                ${centerY + height * 0.13},
                ${flameStartX + flameLength * 0.18}
                ${centerY + height * 0.12},
                ${flameStartX + 4}
                ${centerY}

              Z
            `}
            fill="#ff9500"
            opacity="0.95"
          >
            <animate
              attributeName="opacity"
              values="0.75;1;0.75"
              dur="0.35s"
              repeatCount="indefinite"
            />
          </path>

          {/* =================================================
              FLAME CORE
              ================================================= */}

          <path
            d={`
              M ${flameStartX + 5} ${centerY}
              C ${flameStartX + flameLength * 0.15}
                ${centerY - height * 0.07},
                ${flameStartX + flameLength * 0.32}
                ${centerY - height * 0.09},
                ${flameStartX + flameLength * 0.52}
                ${centerY}

              C ${flameStartX + flameLength * 0.32}
                ${centerY + height * 0.08},
                ${flameStartX + flameLength * 0.15}
                ${centerY + height * 0.07},
                ${flameStartX + 5}
                ${centerY}

              Z
            `}
            fill="#ffe066"
            opacity="0.95"
          >
            <animate
              attributeName="opacity"
              values="0.70;1;0.70"
              dur="0.30s"
              repeatCount="indefinite"
            />
          </path>
        </>
      )}

      {/* =====================================================
          TEMPERATURE
          ===================================================== */}

      <text
        x={bodyX + bodyWidth / 2}
        y={bodyY + bodyHeight * 0.43}
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
        x={bodyX + bodyWidth / 2}
        y={bodyY + bodyHeight * 0.65}
        textAnchor="middle"
        fill="#aab4c3"
        fontSize="10"
      >
        {safePressure.toFixed(0)} Pa
      </text>

      {/* =====================================================
          FUEL FLOW VALUE
          ===================================================== */}

      <text
        x={bodyX + bodyWidth / 2}
        y={bodyY + bodyHeight + 18}
        textAnchor="middle"
        fill="#f4c542"
        fontSize="10"
      >
        FUEL {safeFuelFlow.toFixed(1)} {fuelFlowUnit}
      </text>

      {/* =====================================================
          STATUS
          ===================================================== */}

      <circle cx={width - 14} cy={bodyY + 12} r="5" fill={statusColor}>
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
        cx={flameStartX + flameLength * 0.55}
        cy={centerY}
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
          y="14"
          width={width - 10}
          height={height - 14}
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
        x={width / 2}
        y={height + 30}
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
        x={width / 2}
        y={height + 46}
        textAnchor="middle"
        fill={statusColor}
        fontSize="10"
        fontWeight="bold"
      >
        {alarm ? "ALARM" : running ? (flame ? "FLAME ON" : "RUN") : "STOP"}
      </text>
    </g>
  );
};

export default Burner;

{
  /* <Burner
  x={780}
  y={320}
  width={220}
  height={110}
  tag="BR-101"
  title="KILN BURNER"
  temperature={1050}
  pressure={-35}
  fuelFlow={2.5}
  fuelFlowActive={true}
  flame={true}
  running={true}
  alarm={false}
/>;

<Burner
  tag="BR-102"
  title="CALCINER BURNER"
  temperature={920}
  fuelFlow={1.8}
/>; */
}
