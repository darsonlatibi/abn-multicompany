import React from "react";

interface ClinkerCoolerProps {
  x?: number;
  y?: number;

  width?: number;
  height?: number;

  tag?: string;
  title?: string;

  temperature?: number;
  pressure?: number;
  clinkerFlow?: number;
  airFlow?: number;

  clinkerFlowActive?: boolean;
  airFlowActive?: boolean;

  running?: boolean;
  alarm?: boolean;

  temperatureUnit?: string;
  clinkerFlowUnit?: string;
  airFlowUnit?: string;
}

const ClinkerCooler: React.FC<ClinkerCoolerProps> = ({
  x = 0,
  y = 0,

  width = 260,
  height = 180,

  tag = "CC-101",
  title = "CLINKER COOLER",

  temperature = 120,
  pressure = -15,
  clinkerFlow = 120,
  airFlow = 85000,

  clinkerFlowActive = true,
  airFlowActive = true,

  running = true,
  alarm = false,

  temperatureUnit = "°C",
  clinkerFlowUnit = "t/h",
  airFlowUnit = "Nm³/h",
}) => {
  /* =========================================================
     STATUS
     ========================================================= */

  const safeTemperature = Number.isFinite(Number(temperature))
    ? Number(temperature)
    : 0;

  const safePressure = Number.isFinite(Number(pressure)) ? Number(pressure) : 0;

  const safeClinkerFlow = Number.isFinite(Number(clinkerFlow))
    ? Number(clinkerFlow)
    : 0;

  const safeAirFlow = Number.isFinite(Number(airFlow)) ? Number(airFlow) : 0;

  const statusColor = alarm ? "#dc3545" : running ? "#00ff88" : "#64748b";

  const temperatureColor =
    safeTemperature >= 250
      ? "#ff3b30"
      : safeTemperature >= 150
        ? "#ff9500"
        : safeTemperature >= 80
          ? "#00bfff"
          : "#94a3b8";

  /* =========================================================
     DIMENSIONS
     ========================================================= */

  const centerX = width / 2;

  const bodyTop = 32;
  const bodyHeight = height * 0.58;

  const bodyX = width * 0.08;
  const bodyWidth = width * 0.84;

  const outletHeight = height * 0.16;

  const outletTop = bodyTop + bodyHeight;

  const clinkerOutletWidth = width * 0.24;
  const clinkerOutletX = centerX - clinkerOutletWidth / 2;

  const airHeaderY = bodyTop + bodyHeight + outletHeight * 0.5;

  const grateTop = bodyTop + bodyHeight * 0.58;
  const grateHeight = bodyHeight * 0.28;

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
          CLINKER INLET
          ===================================================== */}

      <rect
        x={centerX - width * 0.12}
        y="14"
        width={width * 0.24}
        height={bodyTop - 14}
        fill="#0b1220"
        stroke={statusColor}
        strokeWidth="2"
      />

      {/* =====================================================
          CLINKER INLET FLOW
          ===================================================== */}

      {clinkerFlowActive && safeClinkerFlow > 0 && (
        <line
          x1={centerX}
          y1={16}
          x2={centerX}
          y2={bodyTop + 4}
          stroke="#f4c542"
          strokeWidth="4"
          strokeDasharray="7 5"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="24"
            dur="0.55s"
            repeatCount="indefinite"
          />
        </line>
      )}

      {/* =====================================================
          OUTER COOLER BODY
          ===================================================== */}

      <path
        d={`
          M ${bodyX + 10} ${bodyTop}
          L ${bodyX + bodyWidth - 10} ${bodyTop}

          L ${bodyX + bodyWidth} ${bodyTop + 12}

          L ${bodyX + bodyWidth} ${outletTop}

          L ${bodyX} ${outletTop}

          L ${bodyX} ${bodyTop + 12}

          Z
        `}
        fill="#0b1220"
        stroke={statusColor}
        strokeWidth="2"
      />

      {/* =====================================================
          INNER COOLER BODY
          ===================================================== */}

      <path
        d={`
          M ${bodyX + 14} ${bodyTop + 5}
          L ${bodyX + bodyWidth - 14} ${bodyTop + 5}

          L ${bodyX + bodyWidth - 6} ${bodyTop + 16}

          L ${bodyX + bodyWidth - 6} ${outletTop - 5}

          L ${bodyX + 6} ${outletTop - 5}

          L ${bodyX + 6} ${bodyTop + 16}

          Z
        `}
        fill="#111c2d"
        stroke="#1f3b57"
        strokeWidth="1"
      />

      {/* =====================================================
          HOT CLINKER ZONE
          ===================================================== */}

      <rect
        x={bodyX + 10}
        y={bodyTop + 12}
        width={bodyWidth - 20}
        height={bodyHeight * 0.32}
        rx="5"
        fill={temperatureColor}
        opacity="0.08"
      >
        {running && (
          <animate
            attributeName="opacity"
            values="0.05;0.16;0.05"
            dur="1.4s"
            repeatCount="indefinite"
          />
        )}
      </rect>

      {/* =====================================================
          CLINKER BED
          ===================================================== */}

      <path
        d={`
          M ${bodyX + 12} ${bodyTop + bodyHeight * 0.48}

          C ${bodyX + 40} ${bodyTop + bodyHeight * 0.42},
            ${bodyX + 65} ${bodyTop + bodyHeight * 0.52},
            ${bodyX + 92} ${bodyTop + bodyHeight * 0.47}

          C ${bodyX + 125} ${bodyTop + bodyHeight * 0.41},
            ${bodyX + 150} ${bodyTop + bodyHeight * 0.52},
            ${bodyX + bodyWidth - 12} ${bodyTop + bodyHeight * 0.46}

          L ${bodyX + bodyWidth - 12} ${outletTop - 8}

          L ${bodyX + 12} ${outletTop - 8}

          Z
        `}
        fill="#3a3020"
        opacity="0.9"
      />

      {/* =====================================================
          CLINKER PARTICLES
          ===================================================== */}

      {clinkerFlowActive && safeClinkerFlow > 0 && (
        <>
          <circle
            cx={bodyX + bodyWidth * 0.25}
            cy={bodyTop + bodyHeight * 0.52}
            r="3"
            fill="#f4c542"
          >
            <animate
              attributeName="cy"
              values={`${bodyTop + bodyHeight * 0.38};${
                bodyTop + bodyHeight * 0.62
              };${bodyTop + bodyHeight * 0.38}`}
              dur="0.8s"
              repeatCount="indefinite"
            />
          </circle>

          <circle
            cx={bodyX + bodyWidth * 0.5}
            cy={bodyTop + bodyHeight * 0.48}
            r="4"
            fill="#ff9500"
          >
            <animate
              attributeName="cy"
              values={`${bodyTop + bodyHeight * 0.34};${
                bodyTop + bodyHeight * 0.6
              };${bodyTop + bodyHeight * 0.34}`}
              dur="0.7s"
              repeatCount="indefinite"
            />
          </circle>

          <circle
            cx={bodyX + bodyWidth * 0.74}
            cy={bodyTop + bodyHeight * 0.5}
            r="3"
            fill="#f4c542"
          >
            <animate
              attributeName="cy"
              values={`${bodyTop + bodyHeight * 0.4};${
                bodyTop + bodyHeight * 0.63
              };${bodyTop + bodyHeight * 0.4}`}
              dur="0.9s"
              repeatCount="indefinite"
            />
          </circle>
        </>
      )}

      {/* =====================================================
          COOLING AIR HEADER
          ===================================================== */}

      <rect
        x={bodyX + 12}
        y={airHeaderY}
        width={bodyWidth - 24}
        height="18"
        rx="5"
        fill="#0b1220"
        stroke="#1f3b57"
        strokeWidth="1"
      />

      {/* =====================================================
          GRATE PLATES
          ===================================================== */}

      {Array.from({ length: 8 }).map((_, index) => {
        const grateX = bodyX + 18 + index * ((bodyWidth - 36) / 8);

        return (
          <line
            key={`grate-${index}`}
            x1={grateX}
            y1={grateTop}
            x2={grateX + 8}
            y2={grateTop + grateHeight}
            stroke="#64748b"
            strokeWidth="2"
          />
        );
      })}

      {/* =====================================================
          COOLING AIR INLETS
          ===================================================== */}

      <path
        d={`
          M ${bodyX - 32} ${bodyTop + bodyHeight * 0.72}
          L ${bodyX} ${bodyTop + bodyHeight * 0.72}
        `}
        fill="none"
        stroke="#d8dee9"
        strokeWidth="8"
        strokeLinecap="round"
      />

      <path
        d={`
          M ${bodyX + bodyWidth} ${bodyTop + bodyHeight * 0.72}
          L ${bodyX + bodyWidth + 32} ${bodyTop + bodyHeight * 0.72}
        `}
        fill="none"
        stroke="#d8dee9"
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* =====================================================
          COOLING AIR FLOW LEFT
          ===================================================== */}

      {airFlowActive && safeAirFlow > 0 && running && (
        <path
          d={`
            M ${bodyX - 30} ${bodyTop + bodyHeight * 0.72}
            L ${bodyX + 2} ${bodyTop + bodyHeight * 0.72}
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
            dur="0.45s"
            repeatCount="indefinite"
          />
        </path>
      )}

      {/* =====================================================
          COOLING AIR FLOW RIGHT
          ===================================================== */}

      {airFlowActive && safeAirFlow > 0 && running && (
        <path
          d={`
            M ${bodyX + bodyWidth - 2} ${bodyTop + bodyHeight * 0.72}
            L ${bodyX + bodyWidth + 30} ${bodyTop + bodyHeight * 0.72}
          `}
          fill="none"
          stroke="#00ffff"
          strokeWidth="3"
          strokeDasharray="7 5"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="24"
            dur="0.45s"
            repeatCount="indefinite"
          />
        </path>
      )}

      {/* =====================================================
          AIR BUBBLE / FLOW THROUGH GRATE
          ===================================================== */}

      {airFlowActive && safeAirFlow > 0 && running && (
        <>
          <line
            x1={bodyX + bodyWidth * 0.28}
            y1={outletTop - 10}
            x2={bodyX + bodyWidth * 0.28}
            y2={grateTop + 8}
            stroke="#00ffff"
            strokeWidth="2"
            strokeDasharray="5 6"
            opacity="0.8"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-22"
              dur="0.5s"
              repeatCount="indefinite"
            />
          </line>

          <line
            x1={bodyX + bodyWidth * 0.5}
            y1={outletTop - 10}
            x2={bodyX + bodyWidth * 0.5}
            y2={grateTop + 8}
            stroke="#00ffff"
            strokeWidth="2"
            strokeDasharray="5 6"
            opacity="0.8"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-22"
              dur="0.55s"
              repeatCount="indefinite"
            />
          </line>

          <line
            x1={bodyX + bodyWidth * 0.72}
            y1={outletTop - 10}
            x2={bodyX + bodyWidth * 0.72}
            y2={grateTop + 8}
            stroke="#00ffff"
            strokeWidth="2"
            strokeDasharray="5 6"
            opacity="0.8"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-22"
              dur="0.6s"
              repeatCount="indefinite"
            />
          </line>
        </>
      )}

      {/* =====================================================
          CLINKER OUTLET
          ===================================================== */}

      <path
        d={`
          M ${bodyX + 15} ${outletTop}
          L ${clinkerOutletX} ${outletTop}

          L ${clinkerOutletX} ${outletTop + outletHeight}

          L ${clinkerOutletX + clinkerOutletWidth}
            ${outletTop + outletHeight}

          L ${clinkerOutletX + clinkerOutletWidth}
            ${outletTop}

          L ${bodyX + bodyWidth - 15} ${outletTop}

          Z
        `}
        fill="#0b1220"
        stroke={statusColor}
        strokeWidth="2"
      />

      {/* =====================================================
          CLINKER OUTLET FLOW
          ===================================================== */}

      {clinkerFlowActive && safeClinkerFlow > 0 && (
        <line
          x1={centerX}
          y1={outletTop + 4}
          x2={centerX}
          y2={outletTop + outletHeight - 4}
          stroke="#f4c542"
          strokeWidth="5"
          strokeDasharray="7 5"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="24"
            dur="0.55s"
            repeatCount="indefinite"
          />
        </line>
      )}

      {/* =====================================================
          COOLING AIR HOT GAS OUTLET
          ===================================================== */}

      <path
        d={`
          M ${bodyX + bodyWidth * 0.25} ${bodyTop}
          L ${bodyX + bodyWidth * 0.25} ${bodyTop - 18}
        `}
        fill="none"
        stroke="#00ffff"
        strokeWidth="7"
        strokeLinecap="round"
      />

      <path
        d={`
          M ${bodyX + bodyWidth * 0.75} ${bodyTop}
          L ${bodyX + bodyWidth * 0.75} ${bodyTop - 18}
        `}
        fill="none"
        stroke="#00ffff"
        strokeWidth="7"
        strokeLinecap="round"
      />

      {/* =====================================================
          HOT AIR FLOW OUTLET
          ===================================================== */}

      {running && (
        <>
          <line
            x1={bodyX + bodyWidth * 0.25}
            y1={bodyTop - 2}
            x2={bodyX + bodyWidth * 0.25}
            y2={bodyTop - 16}
            stroke="#00ffff"
            strokeWidth="3"
            strokeDasharray="6 5"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-20"
              dur="0.5s"
              repeatCount="indefinite"
            />
          </line>

          <line
            x1={bodyX + bodyWidth * 0.75}
            y1={bodyTop - 2}
            x2={bodyX + bodyWidth * 0.75}
            y2={bodyTop - 16}
            stroke="#00ffff"
            strokeWidth="3"
            strokeDasharray="6 5"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-20"
              dur="0.5s"
              repeatCount="indefinite"
            />
          </line>
        </>
      )}

      {/* =====================================================
          TEMPERATURE
          ===================================================== */}

      <text
        x={centerX}
        y={bodyTop + bodyHeight * 0.22}
        textAnchor="middle"
        fill={temperatureColor}
        fontSize="16"
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
        y={bodyTop + bodyHeight * 0.31}
        textAnchor="middle"
        fill="#aab4c3"
        fontSize="10"
      >
        {safePressure.toFixed(0)} Pa
      </text>

      {/* =====================================================
          CLINKER FLOW VALUE
          ===================================================== */}

      <text
        x={centerX}
        y={bodyTop + bodyHeight * 0.39}
        textAnchor="middle"
        fill="#f4c542"
        fontSize="10"
      >
        CLINKER {safeClinkerFlow.toFixed(1)} {clinkerFlowUnit}
      </text>

      {/* =====================================================
          AIR FLOW VALUE
          ===================================================== */}

      <text
        x={centerX}
        y={bodyTop + bodyHeight * 0.46}
        textAnchor="middle"
        fill="#00ffff"
        fontSize="10"
      >
        AIR {safeAirFlow.toFixed(0)} {airFlowUnit}
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
          AIR FLOW STATUS
          ===================================================== */}

      <circle
        cx={bodyX + bodyWidth * 0.5}
        cy={bodyTop + bodyHeight * 0.72}
        r="4"
        fill={
          airFlowActive && safeAirFlow > 0 && running ? "#00ffff" : "#475569"
        }
      >
        {airFlowActive && safeAirFlow > 0 && running && (
          <animate
            attributeName="r"
            values="3;5;3"
            dur="0.5s"
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
        {alarm
          ? "ALARM"
          : running
            ? clinkerFlowActive
              ? "COOLING"
              : "RUN"
            : "STOP"}
      </text>
    </g>
  );
};

export default ClinkerCooler;
