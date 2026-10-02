import React from "react";

/* =========================================================
   KILN MIMIC
   CEMENT PLANT KILN PROCESS OVERVIEW
   PREHEATER → CALCINER → ROTARY KILN → CLINKER COOLER
   ========================================================= */

interface KilnMimicProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;

  tag?: string;
  title?: string;

  running?: boolean;
  fault?: boolean;

  kilnTemperature?: number;
  kilnPressure?: number;
  kilnRpm?: number;
  kilnCurrent?: number;

  calcinerTemperature?: number;
  preheaterTemperature?: number;

  materialFlow?: number;
  fuelFlow?: number;

  coolerTemperature?: number;

  materialFlowActive?: boolean;
  gasFlowActive?: boolean;
  flame?: boolean;

  temperatureUnit?: string;
  materialFlowUnit?: string;
  fuelFlowUnit?: string;

  fontFamily?: string;

  tagSize?: number;
  statusSize?: number;
  valueSize?: number;

  isdetail?: boolean;

  sendCommand?: (command: string, value?: unknown) => void;
}

const KilnMimic: React.FC<KilnMimicProps> = ({
  x = 0,
  y = 0,

  width = 900,
  height = 500,

  tag = "KILN-AREA-101",
  title = "KILN PROCESS",

  running = false,
  fault = false,

  kilnTemperature = 1450,
  kilnPressure = -5,
  kilnRpm = 3.2,
  kilnCurrent = 120,

  calcinerTemperature = 900,
  preheaterTemperature = 850,

  materialFlow = 100,
  fuelFlow = 3.5,

  coolerTemperature = 120,

  materialFlowActive = true,
  gasFlowActive = true,
  flame = true,

  temperatureUnit = "°C",
  materialFlowUnit = "t/h",
  fuelFlowUnit = "Nm³/h",

  fontFamily = "Arial",

  tagSize = 12,
  statusSize = 11,
  valueSize = 10,

  isdetail = true,

  sendCommand,
}) => {
  /* =========================================================
     SAFE VALUES
     ========================================================= */

  const safeKilnTemperature = Number.isFinite(Number(kilnTemperature))
    ? Number(kilnTemperature)
    : 0;

  const safeKilnPressure = Number.isFinite(Number(kilnPressure))
    ? Number(kilnPressure)
    : 0;

  const safeKilnRpm = Number.isFinite(Number(kilnRpm)) ? Number(kilnRpm) : 0;

  const safeKilnCurrent = Number.isFinite(Number(kilnCurrent))
    ? Number(kilnCurrent)
    : 0;

  const safeCalcinerTemperature = Number.isFinite(Number(calcinerTemperature))
    ? Number(calcinerTemperature)
    : 0;

  const safePreheaterTemperature = Number.isFinite(Number(preheaterTemperature))
    ? Number(preheaterTemperature)
    : 0;

  const safeMaterialFlow = Number.isFinite(Number(materialFlow))
    ? Number(materialFlow)
    : 0;

  const safeFuelFlow = Number.isFinite(Number(fuelFlow)) ? Number(fuelFlow) : 0;

  const safeCoolerTemperature = Number.isFinite(Number(coolerTemperature))
    ? Number(coolerTemperature)
    : 0;

  /* =========================================================
     COLORS
     ========================================================= */

  const statusColor = fault ? "#dc3545" : running ? "#28a745" : "#6c757d";

  const materialColor = fault ? "#dc3545" : running ? "#f4c542" : "#64748b";

  const gasColor = fault ? "#dc3545" : running ? "#00ffff" : "#475569";

  const tempColor = (temp: number) =>
    temp >= 1300 ? "#ff3b30" : temp >= 900 ? "#ff9500" : "#00bfff";

  const statusText = fault ? "FAULT" : running ? "RUNNING" : "STOP";

  /* =========================================================
     COMMAND
     ========================================================= */

  const handleCommand = () => {
    if (!sendCommand) return;

    sendCommand(running ? "STOP" : "START");
  };

  /* =========================================================
     PROCESS GEOMETRY
     ========================================================= */

  const preheaterX = width * 0.06;
  const preheaterY = height * 0.16;
  const preheaterW = width * 0.18;
  const preheaterH = height * 0.62;

  const calcinerX = width * 0.28;
  const calcinerY = height * 0.25;
  const calcinerW = width * 0.1;
  const calcinerH = height * 0.48;

  const kilnX = width * 0.4;
  const kilnY = height * 0.39;
  const kilnW = width * 0.4;
  const kilnH = height * 0.17;

  const coolerX = width * 0.83;
  const coolerY = height * 0.33;
  const coolerW = width * 0.12;
  const coolerH = height * 0.31;

  const kilnCenterY = kilnY + kilnH / 2;

  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <g transform={`translate(${x}, ${y})`} fontFamily={fontFamily}>
      {/* =====================================================
          TITLE
          ===================================================== */}

      <text
        x={width / 2}
        y={20}
        textAnchor="middle"
        fill="#00bfff"
        fontSize={tagSize + 2}
        fontWeight="700"
        letterSpacing="1.5"
      >
        {title}
      </text>

      {/* =====================================================
          PROCESS BACKGROUND
          ===================================================== */}

      <rect
        x={5}
        y={32}
        width={width - 10}
        height={height - 62}
        rx={12}
        fill="#07101c"
        stroke="#1f3b57"
        strokeWidth={1.5}
      />

      {/* =====================================================
          PREHEATER TOWER
          ===================================================== */}

      <g>
        <text
          x={preheaterX + preheaterW / 2}
          y={preheaterY - 10}
          textAnchor="middle"
          fill="#00bfff"
          fontSize={valueSize + 1}
          fontWeight="700"
        >
          PREHEATER
        </text>

        <path
          d={`
            M ${preheaterX + 15} ${preheaterY}
            L ${preheaterX + preheaterW - 15} ${preheaterY}
            L ${preheaterX + preheaterW - 28} ${preheaterY + preheaterH}
            L ${preheaterX + 28} ${preheaterY + preheaterH}
            Z
          `}
          fill="#0b1220"
          stroke={statusColor}
          strokeWidth={2}
        />

        {/* Stage separators */}

        {[0.18, 0.36, 0.54, 0.72].map((ratio, index) => {
          const cy = preheaterY + preheaterH * ratio;

          return (
            <g key={index}>
              <line
                x1={preheaterX + 25}
                y1={cy}
                x2={preheaterX + preheaterW - 25}
                y2={cy}
                stroke="#1f3b57"
                strokeWidth={2}
              />

              <circle
                cx={preheaterX + preheaterW / 2}
                cy={cy - 14}
                r={18}
                fill="#111c2d"
                stroke="#64748b"
                strokeWidth={1.5}
              />

              <path
                d={`
                  M ${preheaterX + preheaterW / 2 - 10} ${cy - 14}
                  C ${preheaterX + preheaterW / 2 - 5} ${cy - 26},
                    ${preheaterX + preheaterW / 2 + 10} ${cy - 24},
                    ${preheaterX + preheaterW / 2 + 9} ${cy - 10}
                `}
                fill="none"
                stroke="#00bfff"
                strokeWidth={2}
              />

              <text x={preheaterX + 9} y={cy - 5} fill="#94a3b8" fontSize={8}>
                CY-{101 + index}
              </text>
            </g>
          );
        })}

        {/* Raw meal inlet */}

        <line
          x1={preheaterX + preheaterW / 2}
          y1={preheaterY - 28}
          x2={preheaterX + preheaterW / 2}
          y2={preheaterY}
          stroke="#d8dee9"
          strokeWidth={6}
        />

        <polygon
          points={`
            ${preheaterX + preheaterW / 2 - 7},${preheaterY - 5}
            ${preheaterX + preheaterW / 2},${preheaterY + 5}
            ${preheaterX + preheaterW / 2 + 7},${preheaterY - 5}
          `}
          fill={materialColor}
        />

        {/* Material falling */}

        {materialFlowActive && running && (
          <line
            x1={preheaterX + preheaterW / 2}
            y1={preheaterY + 15}
            x2={preheaterX + preheaterW / 2}
            y2={preheaterY + preheaterH - 15}
            stroke={materialColor}
            strokeWidth={4}
            strokeDasharray="10 8"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="36"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </line>
        )}

        <text
          x={preheaterX + preheaterW / 2}
          y={preheaterY + preheaterH + 18}
          textAnchor="middle"
          fill={tempColor(safePreheaterTemperature)}
          fontSize={valueSize}
          fontWeight="700"
        >
          {safePreheaterTemperature.toFixed(0)} {temperatureUnit}
        </text>

        <text
          x={preheaterX + preheaterW / 2}
          y={preheaterY + preheaterH + 32}
          textAnchor="middle"
          fill="#94a3b8"
          fontSize={8}
        >
          PH-101
        </text>
      </g>

      {/* =====================================================
          CALCINER
          ===================================================== */}

      <g>
        <text
          x={calcinerX + calcinerW / 2}
          y={calcinerY - 10}
          textAnchor="middle"
          fill="#00bfff"
          fontSize={valueSize + 1}
          fontWeight="700"
        >
          CALCINER
        </text>

        <rect
          x={calcinerX}
          y={calcinerY}
          width={calcinerW}
          height={calcinerH}
          rx={calcinerW * 0.2}
          fill="#0b1220"
          stroke={statusColor}
          strokeWidth={2}
        />

        <path
          d={`
            M ${calcinerX + 8} ${calcinerY + calcinerH * 0.25}
            Q ${calcinerX + calcinerW / 2}
              ${calcinerY + calcinerH * 0.1}
              ${calcinerX + calcinerW - 8}
              ${calcinerY + calcinerH * 0.25}
          `}
          fill="none"
          stroke="#1f3b57"
          strokeWidth={3}
        />

        {/* Flame */}

        {flame && running && (
          <g
            transform={`
              translate(
                ${calcinerX + calcinerW / 2},
                ${calcinerY + calcinerH * 0.66}
              )
            `}
          >
            <path
              d="M0 28 C-24 10 -13 -15 0 -30 C8 -13 25 0 0 28Z"
              fill="#ff9500"
            >
              <animate
                attributeName="opacity"
                values="0.45;1;0.55;1;0.45"
                dur="0.8s"
                repeatCount="indefinite"
              />
            </path>

            <path
              d="M0 17 C-10 7 -6 -6 0 -16 C6 -6 11 5 0 17Z"
              fill="#ffe066"
            />
          </g>
        )}

        {materialFlowActive && running && (
          <line
            x1={calcinerX + calcinerW / 2}
            y1={calcinerY + 20}
            x2={calcinerX + calcinerW / 2}
            y2={calcinerY + calcinerH - 20}
            stroke={materialColor}
            strokeWidth={3}
            strokeDasharray="8 7"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="30"
              dur="0.8s"
              repeatCount="indefinite"
            />
          </line>
        )}

        <text
          x={calcinerX + calcinerW / 2}
          y={calcinerY + calcinerH + 18}
          textAnchor="middle"
          fill={tempColor(safeCalcinerTemperature)}
          fontSize={valueSize}
          fontWeight="700"
        >
          {safeCalcinerTemperature.toFixed(0)} {temperatureUnit}
        </text>

        <text
          x={calcinerX + calcinerW / 2}
          y={calcinerY + calcinerH + 32}
          textAnchor="middle"
          fill="#94a3b8"
          fontSize={8}
        >
          CL-101
        </text>
      </g>

      {/* =====================================================
          GAS PATH PREHEATER → CALCINER
          ===================================================== */}

      {gasFlowActive && running && (
        <path
          d={`
            M ${calcinerX + calcinerW / 2}
              ${calcinerY + calcinerH}
            L ${calcinerX + calcinerW / 2}
              ${preheaterY + preheaterH + 45}
            L ${preheaterX + preheaterW + 35}
              ${preheaterY + preheaterH + 45}
            L ${preheaterX + preheaterW}
              ${preheaterY + preheaterH * 0.82}
          `}
          fill="none"
          stroke={gasColor}
          strokeWidth={3}
          strokeDasharray="10 7"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-50"
            dur="1s"
            repeatCount="indefinite"
          />
        </path>
      )}

      {/* =====================================================
          MATERIAL TRANSFER → KILN
          ===================================================== */}

      <path
        d={`
          M ${preheaterX + preheaterW}
            ${preheaterY + preheaterH * 0.82}
          L ${calcinerX + calcinerW}
            ${calcinerY + calcinerH * 0.82}
          L ${kilnX}
            ${kilnCenterY}
        `}
        fill="none"
        stroke="#d8dee9"
        strokeWidth={5}
      />

      {materialFlowActive && running && (
        <path
          d={`
            M ${preheaterX + preheaterW}
              ${preheaterY + preheaterH * 0.82}
            L ${calcinerX + calcinerW}
              ${calcinerY + calcinerH * 0.82}
            L ${kilnX}
              ${kilnCenterY}
          `}
          fill="none"
          stroke={materialColor}
          strokeWidth={4}
          strokeDasharray="10 8"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-50"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </path>
      )}

      {/* =====================================================
          ROTARY KILN
          ===================================================== */}

      <g>
        <text
          x={kilnX + kilnW / 2}
          y={kilnY - 16}
          textAnchor="middle"
          fill="#00bfff"
          fontSize={valueSize + 2}
          fontWeight="700"
        >
          ROTARY KILN
        </text>

        {/* Shell */}

        <rect
          x={kilnX}
          y={kilnY}
          width={kilnW}
          height={kilnH}
          rx={kilnH / 2}
          fill="#0b1220"
          stroke={statusColor}
          strokeWidth={2.5}
        />

        {/* Refractory */}

        <rect
          x={kilnX + 12}
          y={kilnY + 9}
          width={kilnW - 24}
          height={kilnH - 18}
          rx={(kilnH - 18) / 2}
          fill={running ? "#291712" : "#111c2d"}
          stroke="#1f3b57"
          strokeWidth={1}
        />

        {/* Hot zone */}

        {running && (
          <rect
            x={kilnX + kilnW * 0.45}
            y={kilnY + 14}
            width={kilnW * 0.35}
            height={kilnH - 28}
            rx={(kilnH - 28) / 2}
            fill="none"
            stroke="#ff3b30"
            strokeWidth={3}
          >
            <animate
              attributeName="opacity"
              values="0.25;0.9;0.25"
              dur="1.3s"
              repeatCount="indefinite"
            />
          </rect>
        )}

        {/* Tyres */}

        <ellipse
          cx={kilnX + kilnW * 0.25}
          cy={kilnCenterY}
          rx={8}
          ry={kilnH * 0.65}
          fill="none"
          stroke="#64748b"
          strokeWidth={4}
        />

        <ellipse
          cx={kilnX + kilnW * 0.72}
          cy={kilnCenterY}
          rx={8}
          ry={kilnH * 0.65}
          fill="none"
          stroke="#64748b"
          strokeWidth={4}
        />

        {/* Material */}

        {materialFlowActive && running && (
          <path
            d={`
              M ${kilnX + 20} ${kilnCenterY + 8}
              L ${kilnX + kilnW - 25} ${kilnCenterY + 8}
            `}
            fill="none"
            stroke={materialColor}
            strokeWidth={5}
            strokeDasharray="12 8"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-40"
              dur="0.8s"
              repeatCount="indefinite"
            />
          </path>
        )}

        {/* Gas */}

        {gasFlowActive && running && (
          <path
            d={`
              M ${kilnX + kilnW - 25} ${kilnCenterY - 10}
              L ${kilnX + 25} ${kilnCenterY - 10}
            `}
            fill="none"
            stroke={gasColor}
            strokeWidth={3}
            strokeDasharray="10 7"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="35"
              dur="0.8s"
              repeatCount="indefinite"
            />
          </path>
        )}

        {/* Burner */}

        <rect
          x={kilnX + kilnW - 4}
          y={kilnCenterY - 11}
          width={38}
          height={22}
          rx={4}
          fill="#1f2937"
          stroke="#64748b"
          strokeWidth={2}
        />

        {flame && running && (
          <path
            d={`
              M ${kilnX + kilnW + 32} ${kilnCenterY}
              C ${kilnX + kilnW + 48} ${kilnCenterY - 18},
                ${kilnX + kilnW + 65} ${kilnCenterY - 8},
                ${kilnX + kilnW + 72} ${kilnCenterY}
              C ${kilnX + kilnW + 64} ${kilnCenterY + 12},
                ${kilnX + kilnW + 48} ${kilnCenterY + 18},
                ${kilnX + kilnW + 32} ${kilnCenterY}
              Z
            `}
            fill="#ff9500"
          >
            <animate
              attributeName="opacity"
              values="0.4;1;0.5;1;0.4"
              dur="0.8s"
              repeatCount="indefinite"
            />
          </path>
        )}

        {/* Drive */}

        <g
          transform={`
            translate(
              ${kilnX + kilnW * 0.48},
              ${kilnY + kilnH + 25}
            )
          `}
        >
          <rect
            x={-25}
            y={-9}
            width={50}
            height={18}
            rx={4}
            fill="#111c2d"
            stroke={statusColor}
            strokeWidth={2}
          />

          <circle
            cx={0}
            cy={0}
            r={6}
            fill="none"
            stroke={statusColor}
            strokeWidth={2}
          />

          {running && (
            <line
              x1={0}
              y1={-5}
              x2={0}
              y2={5}
              stroke={statusColor}
              strokeWidth={2}
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0"
                to="360"
                dur="0.7s"
                repeatCount="indefinite"
              />
            </line>
          )}
        </g>

        {/* Kiln telemetry */}

        <text
          x={kilnX + kilnW * 0.25}
          y={kilnY - 3}
          textAnchor="middle"
          fill={tempColor(safeKilnTemperature)}
          fontSize={valueSize}
          fontWeight="700"
        >
          {safeKilnTemperature.toFixed(0)} {temperatureUnit}
        </text>

        {isdetail && (
          <>
            <text
              x={kilnX + kilnW * 0.5}
              y={kilnY + kilnH + 48}
              textAnchor="middle"
              fill="#aab4c3"
              fontSize={valueSize}
            >
              RPM {safeKilnRpm.toFixed(2)}
            </text>

            <text
              x={kilnX + kilnW * 0.7}
              y={kilnY + kilnH + 48}
              textAnchor="middle"
              fill="#aab4c3"
              fontSize={valueSize}
            >
              I {safeKilnCurrent.toFixed(1)} A
            </text>

            <text
              x={kilnX + kilnW * 0.9}
              y={kilnY + kilnH + 48}
              textAnchor="middle"
              fill="#aab4c3"
              fontSize={valueSize}
            >
              P {safeKilnPressure.toFixed(1)}
            </text>
          </>
        )}

        <text
          x={kilnX + kilnW / 2}
          y={kilnY + kilnH + 65}
          textAnchor="middle"
          fill="#00bfff"
          fontSize={8}
        >
          KILN-101
        </text>
      </g>

      {/* =====================================================
          CLINKER COOLER
          ===================================================== */}

      <g>
        <text
          x={coolerX + coolerW / 2}
          y={coolerY - 12}
          textAnchor="middle"
          fill="#00bfff"
          fontSize={valueSize + 1}
          fontWeight="700"
        >
          COOLER
        </text>

        <path
          d={`
            M ${coolerX} ${coolerY + 10}
            L ${coolerX + coolerW} ${coolerY + 10}
            L ${coolerX + coolerW - 10}
              ${coolerY + coolerH}
            L ${coolerX + 10}
              ${coolerY + coolerH}
            Z
          `}
          fill="#0b1220"
          stroke={statusColor}
          strokeWidth={2}
        />

        {/* Cooler grate */}

        {[0.2, 0.4, 0.6, 0.8].map((ratio, index) => {
          const cx = coolerX + coolerW * ratio;

          return (
            <line
              key={index}
              x1={cx}
              y1={coolerY + 20}
              x2={cx - 5}
              y2={coolerY + coolerH - 10}
              stroke="#1f3b57"
              strokeWidth={2}
            />
          );
        })}

        {/* Clinker */}

        {materialFlowActive && running && (
          <rect
            x={coolerX + 10}
            y={coolerY + coolerH * 0.55}
            width={coolerW - 20}
            height={10}
            fill={materialColor}
          >
            <animate
              attributeName="x"
              values={`
                ${coolerX + 8};
                ${coolerX + 18};
                ${coolerX + 8}
              `}
              dur="1s"
              repeatCount="indefinite"
            />
          </rect>
        )}

        {/* Cooling air */}

        {running && (
          <g stroke={gasColor} strokeWidth={2} strokeDasharray="7 5">
            <line
              x1={coolerX + 25}
              y1={coolerY + coolerH}
              x2={coolerX + 25}
              y2={coolerY + coolerH - 35}
            />

            <line
              x1={coolerX + coolerW / 2}
              y1={coolerY + coolerH}
              x2={coolerX + coolerW / 2}
              y2={coolerY + coolerH - 40}
            />

            <line
              x1={coolerX + coolerW - 25}
              y1={coolerY + coolerH}
              x2={coolerX + coolerW - 25}
              y2={coolerY + coolerH - 35}
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-24"
                dur="0.7s"
                repeatCount="indefinite"
              />
            </line>
          </g>
        )}

        <text
          x={coolerX + coolerW / 2}
          y={coolerY + coolerH + 17}
          textAnchor="middle"
          fill={tempColor(safeCoolerTemperature)}
          fontSize={valueSize}
          fontWeight="700"
        >
          {safeCoolerTemperature.toFixed(0)} {temperatureUnit}
        </text>

        <text
          x={coolerX + coolerW / 2}
          y={coolerY + coolerH + 31}
          textAnchor="middle"
          fill="#94a3b8"
          fontSize={8}
        >
          CC-101
        </text>
      </g>

      {/* =====================================================
          KILN → COOLER MATERIAL FLOW
          ===================================================== */}

      <line
        x1={kilnX + kilnW}
        y1={kilnCenterY}
        x2={coolerX}
        y2={coolerY + coolerH * 0.55}
        stroke="#d8dee9"
        strokeWidth={5}
      />

      {materialFlowActive && running && (
        <line
          x1={kilnX + kilnW}
          y1={kilnCenterY}
          x2={coolerX}
          y2={coolerY + coolerH * 0.55}
          stroke={materialColor}
          strokeWidth={4}
          strokeDasharray="10 8"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-45"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </line>
      )}

      {/* =====================================================
          FUEL LINE
          ===================================================== */}

      <line
        x1={width * 0.96}
        y1={kilnCenterY - 65}
        x2={kilnX + kilnW * 0.85}
        y2={kilnCenterY - 15}
        stroke="#ff9500"
        strokeWidth={3}
        strokeDasharray="7 5"
      />

      <text
        x={width * 0.91}
        y={kilnCenterY - 70}
        textAnchor="middle"
        fill="#ff9500"
        fontSize={valueSize}
        fontWeight="700"
      >
        FUEL
      </text>

      <text
        x={width * 0.91}
        y={kilnCenterY - 55}
        textAnchor="middle"
        fill="#ff9500"
        fontSize={valueSize}
      >
        {safeFuelFlow.toFixed(2)} {fuelFlowUnit}
      </text>

      {/* =====================================================
          MATERIAL FLOW TOTAL
          ===================================================== */}

      <text
        x={width / 2}
        y={height - 42}
        textAnchor="middle"
        fill={materialColor}
        fontSize={valueSize + 1}
        fontWeight="700"
      >
        MATERIAL FEED {safeMaterialFlow.toFixed(1)} {materialFlowUnit}
      </text>

      {/* =====================================================
          STATUS INDICATOR
          ===================================================== */}

      <circle cx={width - 22} cy={52} r={7} fill={statusColor}>
        {running && !fault && (
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur="1.2s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      {/* =====================================================
          ALARM BORDER
          ===================================================== */}

      {fault && (
        <rect
          x={8}
          y={35}
          width={width - 16}
          height={height - 68}
          rx={12}
          fill="none"
          stroke="#dc3545"
          strokeWidth={2}
          strokeDasharray="9 6"
        >
          <animate
            attributeName="opacity"
            values="1;0.25;1"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </rect>
      )}

      {/* =====================================================
          TAG
          ===================================================== */}

      <text
        x={width / 2}
        y={height - 22}
        textAnchor="middle"
        fill="#00bfff"
        fontSize={tagSize}
        fontWeight="700"
      >
        {tag}
      </text>

      {/* =====================================================
          STATUS
          ===================================================== */}

      <text
        x={width - 70}
        y={height - 22}
        textAnchor="middle"
        fill={statusColor}
        fontSize={statusSize}
        fontWeight="700"
      >
        {statusText}
      </text>

      {/* =====================================================
          COMMAND OVERLAY
          ===================================================== */}

      {sendCommand && (
        <rect
          x={5}
          y={32}
          width={width - 10}
          height={height - 62}
          rx={12}
          fill="transparent"
          style={{ cursor: "pointer" }}
          onClick={handleCommand}
        />
      )}
    </g>
  );
};

export default KilnMimic;
