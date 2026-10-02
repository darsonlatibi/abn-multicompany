import React from "react";

interface PreheaterStage {
  tag?: string;
  title?: string;

  temperature?: number;
  pressure?: number;

  materialFlow?: boolean;
  running?: boolean;
  alarm?: boolean;
}

interface PreheaterTowerProps {
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

  stages?: PreheaterStage[];

  temperatureUnit?: string;

  fontFamily?: string;

  tagSize?: number;
  statusSize?: number;
  valueSize?: number;

  isdetail?: boolean;

  sendCommand?: (command: string, value?: unknown) => void;
}

const PreheaterTower: React.FC<PreheaterTowerProps> = ({
  x = 0,
  y = 0,

  width = 360,
  height = 620,

  tag = "PH-101",
  title = "PREHEATER TOWER",

  temperature = 850,
  pressure = -120,

  materialFlow = true,
  gasFlow = true,

  running = true,
  alarm = false,

  stages = [
    {
      tag: "CY-101",
      title: "STAGE 1",
      temperature: 850,
      pressure: -120,
      materialFlow: true,
      running: true,
      alarm: false,
    },
    {
      tag: "CY-102",
      title: "STAGE 2",
      temperature: 700,
      pressure: -100,
      materialFlow: true,
      running: true,
      alarm: false,
    },
    {
      tag: "CY-103",
      title: "STAGE 3",
      temperature: 550,
      pressure: -80,
      materialFlow: true,
      running: true,
      alarm: false,
    },
    {
      tag: "CY-104",
      title: "STAGE 4",
      temperature: 400,
      pressure: -60,
      materialFlow: true,
      running: true,
      alarm: false,
    },
  ],

  temperatureUnit = "°C",

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

  const safeTemperature = Number.isFinite(Number(temperature))
    ? Number(temperature)
    : 0;

  const safePressure = Number.isFinite(Number(pressure)) ? Number(pressure) : 0;

  /* =========================================================
     STATUS
     ========================================================= */

  const statusColor = alarm ? "#dc3545" : running ? "#28a745" : "#6c757d";

  const temperatureColor =
    safeTemperature >= 900
      ? "#ff3b30"
      : safeTemperature >= 700
        ? "#ff9500"
        : safeTemperature >= 500
          ? "#00bfff"
          : "#94a3b8";

  /* =========================================================
     DIMENSIONS
     ========================================================= */

  const towerWidth = width * 0.42;
  const towerX = (width - towerWidth) / 2;

  const towerTop = 42;
  const towerHeight = height * 0.76;

  const towerBottom = towerTop + towerHeight;

  const stageCount = Math.max(1, stages.length);
  const stageHeight = towerHeight / stageCount;

  const centerX = width / 2;

  const cycloneWidth = towerWidth * 0.82;

  /* =========================================================
     COMMAND HANDLER
     ========================================================= */

  const handleCommand = () => {
    if (sendCommand) {
      sendCommand(running ? "STOP" : "START");
    }
  };

  /* =========================================================
     SVG
     ========================================================= */

  return (
    <g
      transform={`translate(${x},${y})`}
      onClick={handleCommand}
      style={{
        cursor: sendCommand ? "pointer" : "default",
      }}
    >
      {/* =====================================================
          TITLE
          ===================================================== */}

      <text
        x={centerX}
        y={14}
        textAnchor="middle"
        fill="#00bfff"
        fontSize={14}
        fontWeight="bold"
        fontFamily={fontFamily}
      >
        {title}
      </text>

      {/* =====================================================
          MAIN TOWER BODY
          ===================================================== */}

      <rect
        x={towerX}
        y={towerTop}
        width={towerWidth}
        height={towerHeight}
        rx={8}
        fill="#0b1220"
        stroke={statusColor}
        strokeWidth={3}
      />

      {/* =====================================================
          INNER TOWER
          ===================================================== */}

      <rect
        x={towerX + 7}
        y={towerTop + 7}
        width={towerWidth - 14}
        height={towerHeight - 14}
        rx={5}
        fill="#111c2d"
        stroke="#1f3b57"
        strokeWidth={1}
      />

      {/* =====================================================
          STAGE ZONES
          ===================================================== */}

      {stages.map((stage, index) => {
        const stageY = towerTop + index * stageHeight;

        const stageTemperature = Number.isFinite(Number(stage.temperature))
          ? Number(stage.temperature)
          : 0;

        const stagePressure = Number.isFinite(Number(stage.pressure))
          ? Number(stage.pressure)
          : 0;

        const stageTemperatureColor =
          stageTemperature >= 900
            ? "#ff3b30"
            : stageTemperature >= 700
              ? "#ff9500"
              : stageTemperature >= 500
                ? "#00bfff"
                : "#94a3b8";

        const stageStatusColor = stage.alarm
          ? "#dc3545"
          : stage.running
            ? "#28a745"
            : "#64748b";

        return (
          <g key={`${stage.tag || "stage"}-${index}`}>
            {/* =================================================
                STAGE SEPARATOR
            ================================================= */}

            {index > 0 && (
              <line
                x1={towerX + 8}
                y1={stageY}
                x2={towerX + towerWidth - 8}
                y2={stageY}
                stroke="#1f3b57"
                strokeWidth={2}
              />
            )}

            {/* =================================================
                STAGE HOT ZONE
            ================================================= */}

            <rect
              x={towerX + 10}
              y={stageY + 8}
              width={towerWidth - 20}
              height={stageHeight - 16}
              fill={stageTemperatureColor}
              opacity={0.04}
            >
              {running && stage.running && (
                <animate
                  attributeName="opacity"
                  values="0.03;0.10;0.03"
                  dur="2s"
                  repeatCount="indefinite"
                />
              )}
            </rect>

            {/* =================================================
                STAGE CYCLONE SYMBOL
            ================================================= */}

            <g
              transform={`
                translate(
                  ${centerX},
                  ${stageY + stageHeight * 0.48}
                )
                scale(
                  ${Math.min(1, cycloneWidth / 120)}
                )
              `}
            >
              {/* CYCLONE BODY */}

              <ellipse
                cx={0}
                cy={-8}
                rx={cycloneWidth * 0.25}
                ry={stageHeight * 0.2}
                fill="#0b1220"
                stroke={stageStatusColor}
                strokeWidth={2}
              />

              {/* CYCLONE INNER */}

              <ellipse
                cx={0}
                cy={-8}
                rx={cycloneWidth * 0.21}
                ry={stageHeight * 0.16}
                fill="#111c2d"
                stroke="#1f3b57"
                strokeWidth={1}
              />

              {/* CONE */}

              <path
                d={`
                  M ${-cycloneWidth * 0.25} ${stageHeight * 0.02}
                  L ${cycloneWidth * 0.25} ${stageHeight * 0.02}
                  L ${cycloneWidth * 0.06} ${stageHeight * 0.3}
                  L ${-cycloneWidth * 0.06} ${stageHeight * 0.3}
                  Z
                `}
                fill="#0b1220"
                stroke={stageStatusColor}
                strokeWidth={2}
              />

              {/* MATERIAL FLOW */}

              {materialFlow && stage.materialFlow && stage.running && (
                <path
                  d={`
                      M ${-cycloneWidth * 0.03} ${-stageHeight * 0.18}
                      C ${cycloneWidth * 0.18} ${-stageHeight * 0.05},
                        ${cycloneWidth * 0.15} ${stageHeight * 0.12},
                        0 ${stageHeight * 0.24}
                    `}
                  fill="none"
                  stroke="#f4c542"
                  strokeWidth={3}
                  strokeDasharray="6 5"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="20"
                    dur="0.7s"
                    repeatCount="indefinite"
                  />
                </path>
              )}

              {/* =================================================
                  STAGE TEMPERATURE
                  valueSize DIPAKAI DI SINI
              ================================================= */}

              <text
                x={0}
                y={-5}
                textAnchor="middle"
                fill={stageTemperatureColor}
                fontSize={valueSize}
                fontWeight="bold"
                fontFamily={fontFamily}
              >
                {stageTemperature.toFixed(0)}
                {temperatureUnit}
              </text>
            </g>

            {/* =================================================
                STAGE TITLE
            ================================================= */}

            <text
              x={towerX + 15}
              y={stageY + 18}
              fill="#00bfff"
              fontSize={9}
              fontWeight="bold"
              fontFamily={fontFamily}
            >
              {stage.title || `STAGE ${index + 1}`}
            </text>

            {/* =================================================
                STAGE TAG
            ================================================= */}

            <text
              x={towerX + towerWidth - 15}
              y={stageY + 18}
              textAnchor="end"
              fill="#94a3b8"
              fontSize={8}
              fontFamily={fontFamily}
            >
              {stage.tag || `CY-${101 + index}`}
            </text>

            {/* =================================================
                STAGE PRESSURE
            ================================================= */}

            {isdetail && (
              <text
                x={towerX + 15}
                y={stageY + stageHeight - 12}
                fill="#64748b"
                fontSize={Math.max(8, valueSize - 2)}
                fontFamily={fontFamily}
              >
                {stagePressure.toFixed(0)} Pa
              </text>
            )}
          </g>
        );
      })}

      {/* =====================================================
          RAW MEAL INLET
          ===================================================== */}

      <line
        x1={centerX}
        y1={towerTop - 30}
        x2={centerX}
        y2={towerTop}
        stroke="#d8dee9"
        strokeWidth={8}
      />

      {/* =====================================================
          RAW MEAL FLOW DOWN
          ===================================================== */}

      {materialFlow && running && (
        <line
          x1={centerX}
          y1={towerTop - 25}
          x2={centerX}
          y2={towerTop - 4}
          stroke="#f4c542"
          strokeWidth={3}
          strokeDasharray="7 5"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="20"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </line>
      )}

      {/* =====================================================
          HOT GAS OUTLET
          ===================================================== */}

      <line
        x1={towerX + towerWidth}
        y1={towerTop + 18}
        x2={towerX + towerWidth + 42}
        y2={towerTop + 18}
        stroke="#d8dee9"
        strokeWidth={8}
      />

      {/* =====================================================
          GAS FLOW
          ===================================================== */}

      {gasFlow && running && (
        <line
          x1={towerX + towerWidth + 5}
          y1={towerTop + 18}
          x2={towerX + towerWidth + 36}
          y2={towerTop + 18}
          stroke="#00ffff"
          strokeWidth={3}
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
          GAS RISING THROUGH TOWER
          ===================================================== */}

      {gasFlow && running && (
        <line
          x1={towerX + towerWidth * 0.28}
          y1={towerBottom - 10}
          x2={towerX + towerWidth * 0.28}
          y2={towerTop + 25}
          stroke="#00ffff"
          strokeWidth={2}
          strokeDasharray="7 6"
          opacity={0.75}
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-30"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </line>
      )}

      {/* =====================================================
          MATERIAL FALLING THROUGH TOWER
          ===================================================== */}

      {materialFlow && running && (
        <line
          x1={towerX + towerWidth * 0.72}
          y1={towerTop + 25}
          x2={towerX + towerWidth * 0.72}
          y2={towerBottom - 15}
          stroke="#f4c542"
          strokeWidth={2}
          strokeDasharray="6 5"
          opacity={0.75}
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="24"
            dur="0.7s"
            repeatCount="indefinite"
          />
        </line>
      )}

      {/* =====================================================
          MATERIAL OUTLET
          ===================================================== */}

      <line
        x1={centerX}
        y1={towerBottom}
        x2={centerX}
        y2={towerBottom + 35}
        stroke="#d8dee9"
        strokeWidth={8}
      />

      {/* =====================================================
          MATERIAL OUTLET FLOW
          ===================================================== */}

      {materialFlow && running && (
        <line
          x1={centerX}
          y1={towerBottom + 5}
          x2={centerX}
          y2={towerBottom + 30}
          stroke="#f4c542"
          strokeWidth={3}
          strokeDasharray="7 5"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="20"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </line>
      )}

      {/* =====================================================
          MAIN TEMPERATURE
          valueSize DIPAKAI
      ===================================================== */}

      {isdetail && (
        <text
          x={centerX}
          y={towerBottom + 55}
          textAnchor="middle"
          fill={temperatureColor}
          fontSize={valueSize}
          fontWeight="bold"
          fontFamily={fontFamily}
        >
          {safeTemperature.toFixed(0)}
          {temperatureUnit}
        </text>
      )}

      {/* =====================================================
          MAIN PRESSURE
          valueSize DIPAKAI
      ===================================================== */}

      {isdetail && (
        <text
          x={centerX}
          y={towerBottom + 70}
          textAnchor="middle"
          fill="#aab4c3"
          fontSize={valueSize}
          fontFamily={fontFamily}
        >
          {safePressure.toFixed(0)} Pa
        </text>
      )}

      {/* =====================================================
          STATUS INDICATOR
          ===================================================== */}

      <circle
        cx={towerX + towerWidth - 12}
        cy={towerTop + 12}
        r={5}
        fill={statusColor}
      >
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
          x={towerX - 6}
          y={towerTop - 6}
          width={towerWidth + 12}
          height={towerHeight + 12}
          rx={10}
          fill="none"
          stroke="#dc3545"
          strokeWidth={3}
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
        fill="#00ffff"
        fontWeight="bold"
        fontSize={tagSize}
        fontFamily={fontFamily}
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
        fontWeight="bold"
        fontSize={statusSize}
        fontFamily={fontFamily}
      >
        {alarm ? "ALARM" : running ? "RUNNING" : "STOP"}
      </text>
    </g>
  );
};

export default PreheaterTower;

/*
<PreheaterTower
  x={500}
  y={100}
  width={360}
  height={620}
  tag="PH-101"
  title="PREHEATER TOWER"
  temperature={850}
  pressure={-120}
  materialFlow={true}
  gasFlow={true}
  running={true}
  alarm={false}
  valueSize={10}
/>
*/
