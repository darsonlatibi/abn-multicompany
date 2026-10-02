import React from "react";

interface CrusherProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;

  tag?: string;
  title?: string;

  feedFlow?: number;
  productFlow?: number;
  rpm?: number;
  load?: number;
  vibration?: number;
  bearingTemperature?: number;

  running?: boolean;
  alarm?: boolean;
  trip?: boolean;

  materialFlow?: boolean;
  inletOpen?: boolean;
  outletOpen?: boolean;

  direction?: "left" | "right";
  reverse?: boolean;

  feedFlowUnit?: string;
  productFlowUnit?: string;
  rpmUnit?: string;
  loadUnit?: string;
  vibrationUnit?: string;
  temperatureUnit?: string;

  casingColor?: string;
  rotorColor?: string;
  materialColor?: string;
  inactiveColor?: string;
  alarmColor?: string;

  fontFamily?: string;
  tagSize?: number;
  statusSize?: number;
  valueSize?: number;

  isdetail?: boolean;

  sendCommand?: (command: string, value?: unknown) => void;
}

const Crusher: React.FC<CrusherProps> = ({
  x = 0,
  y = 0,
  width = 500,
  height = 340,

  tag = "CR-101",
  title = "CRUSHER",

  feedFlow = 125,
  productFlow = 122,
  rpm = 980,
  load = 72,
  vibration = 2.8,
  bearingTemperature = 68,

  running = true,
  alarm = false,
  trip = false,

  materialFlow = true,
  inletOpen,
  outletOpen,

  direction = "right",
  reverse = false,

  feedFlowUnit = "t/h",
  productFlowUnit = "t/h",
  rpmUnit = "RPM",
  loadUnit = "%",
  vibrationUnit = "mm/s",
  temperatureUnit = "°C",

  casingColor = "#111c2d",
  rotorColor = "#64748b",
  materialColor = "#f4c542",
  inactiveColor = "#475569",
  alarmColor = "#dc3545",

  fontFamily = "Arial",
  tagSize = 12,
  statusSize = 11,
  valueSize = 10,

  isdetail = true,

  sendCommand,
}) => {
  const safeInletOpen = inletOpen ?? running;
  const safeOutletOpen = outletOpen ?? running;

  const effectiveAlarm = alarm || trip;

  const statusColor = effectiveAlarm
    ? alarmColor
    : running
      ? "#28a745"
      : "#6c757d";

  const activeRotorColor = effectiveAlarm
    ? alarmColor
    : running
      ? rotorColor
      : inactiveColor;

  const safeLoad = Math.max(0, Math.min(100, load));

  const loadColor =
    safeLoad >= 90 ? alarmColor : safeLoad >= 75 ? "#ff9500" : "#28a745";

  const vibrationColor =
    vibration >= 7 ? alarmColor : vibration >= 4.5 ? "#ff9500" : "#28a745";

  const temperatureColor =
    bearingTemperature >= 90
      ? alarmColor
      : bearingTemperature >= 80
        ? "#ff9500"
        : "#00bfff";

  const actualDirection = reverse
    ? direction === "left"
      ? "right"
      : "left"
    : direction;

  const handleCommand = () => {
    if (!sendCommand) return;

    sendCommand(running ? "STOP" : "START", {
      tag,
      source: "Crusher",
    });
  };

  const cx = width / 2;

  const crusherX = 90;
  const crusherY = 78;

  const crusherW = width - 180;
  const crusherH = 145;

  const rotorCX = cx;
  const rotorCY = crusherY + crusherH / 2;
  const rotorRadius = 57;

  const inletX = 25;

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
        stroke={effectiveAlarm ? alarmColor : "#1f3b57"}
        strokeWidth={effectiveAlarm ? 2 : 1.5}
      >
        {effectiveAlarm && (
          <animate
            attributeName="stroke-opacity"
            values="1;0.2;1"
            dur="0.55s"
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

      <circle cx={width - 28} cy={25} r={6} fill={statusColor}>
        {running && !effectiveAlarm && (
          <animate
            attributeName="r"
            values="5;7;5"
            dur="1.1s"
            repeatCount="indefinite"
          />
        )}

        {effectiveAlarm && (
          <animate
            attributeName="opacity"
            values="1;0.15;1"
            dur="0.45s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      {/* =========================================================
      INLET CHUTE
     ========================================================= */}

      <path
        d={`
      M ${inletX} ${crusherY + 48}
      L ${crusherX} ${crusherY + 48}
      L ${crusherX} ${crusherY + 92}
      L ${inletX} ${crusherY + 92}
      Z
    `}
        fill="#111c2d"
        stroke="#1f3b57"
        strokeWidth={2}
      />

      <text
        x={inletX + 10}
        y={crusherY + 38}
        fill="#64748b"
        fontSize={8}
        fontFamily={fontFamily}
      >
        FEED
      </text>

      {materialFlow && safeInletOpen && (
        <line
          x1={inletX + 5}
          y1={crusherY + 70}
          x2={crusherX - 5}
          y2={crusherY + 70}
          stroke={materialColor}
          strokeWidth={9}
          strokeLinecap="round"
          strokeDasharray="5 10"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="0;-30"
            dur="0.65s"
            repeatCount="indefinite"
          />
        </line>
      )}

      {/* Inlet indicator */}

      <circle
        cx={inletX + 12}
        cy={crusherY + 108}
        r={4}
        fill={safeInletOpen ? "#28a745" : "#6c757d"}
      />

      <text
        x={inletX + 22}
        y={crusherY + 112}
        fill="#94a3b8"
        fontSize={8}
        fontFamily={fontFamily}
      >
        INLET
      </text>

      {/* =========================================================
      CRUSHER BODY
     ========================================================= */}

      <path
        d={`
      M ${crusherX} ${crusherY + 20}
      Q ${cx} ${crusherY - 15}
        ${crusherX + crusherW} ${crusherY + 20}
      L ${crusherX + crusherW}
        ${crusherY + crusherH - 20}
      Q ${cx}
        ${crusherY + crusherH + 15}
        ${crusherX}
        ${crusherY + crusherH - 20}
      Z
    `}
        fill={casingColor}
        stroke={effectiveAlarm ? alarmColor : "#1f3b57"}
        strokeWidth={3}
      />

      {/* Crusher top cover */}

      <path
        d={`
      M ${crusherX + 15}
        ${crusherY + 20}
      Q ${cx}
        ${crusherY - 3}
        ${crusherX + crusherW - 15}
        ${crusherY + 20}
      L ${crusherX + crusherW - 25}
        ${crusherY + 45}
      L ${crusherX + 25}
        ${crusherY + 45}
      Z
    `}
        fill="#172235"
        stroke="#1f3b57"
        strokeWidth={2}
      />

      {/* Crusher bottom section */}

      <path
        d={`
      M ${crusherX + 20}
        ${crusherY + crusherH - 45}
      L ${crusherX + crusherW - 20}
        ${crusherY + crusherH - 45}
      L ${crusherX + crusherW - 32}
        ${crusherY + crusherH - 15}
      L ${crusherX + 32}
        ${crusherY + crusherH - 15}
      Z
    `}
        fill="#172235"
        stroke="#1f3b57"
        strokeWidth={2}
      />

      {/* =========================================================
      ROTOR
     ========================================================= */}

      <g>
        <circle
          cx={rotorCX}
          cy={rotorCY}
          r={rotorRadius}
          fill="#0b1220"
          stroke={activeRotorColor}
          strokeWidth={7}
        />

        <circle
          cx={rotorCX}
          cy={rotorCY}
          r={38}
          fill="#111c2d"
          stroke="#64748b"
          strokeWidth={3}
        />

        {/* Rotor shaft */}

        <circle cx={rotorCX} cy={rotorCY} r={10} fill="#94a3b8" />

        {/* Crusher hammers / teeth */}

        <g
          transform={`rotate(
        ${actualDirection === "right" ? 0 : 180}
        ${rotorCX}
        ${rotorCY}
      )`}
        >
          {Array.from({ length: 8 }).map((_, index) => {
            const angle = index * 45;

            return (
              <g
                key={index}
                transform={`rotate(
                ${angle}
                ${rotorCX}
                ${rotorCY}
              )`}
              >
                <rect
                  x={rotorCX - 7}
                  y={rotorCY - rotorRadius + 4}
                  width={14}
                  height={27}
                  rx={2}
                  fill={activeRotorColor}
                  stroke="#0b1220"
                  strokeWidth={1.5}
                />

                <path
                  d={`
                  M ${rotorCX - 7}
                    ${rotorCY - rotorRadius + 4}
                  L ${rotorCX}
                    ${rotorCY - rotorRadius - 4}
                  L ${rotorCX + 7}
                    ${rotorCY - rotorRadius + 4}
                `}
                  fill="#94a3b8"
                />
              </g>
            );
          })}
        </g>

        {/* Rotation animation */}

        {running && !effectiveAlarm && (
          <g>
            <circle
              cx={rotorCX}
              cy={rotorCY}
              r={48}
              fill="none"
              stroke="#00bfff"
              strokeWidth={2}
              strokeDasharray="5 9"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0"
                to={actualDirection === "right" ? "360" : "-360"}
                dur="1.1s"
                repeatCount="indefinite"
              />
            </circle>

            <circle
              cx={rotorCX}
              cy={rotorCY}
              r={29}
              fill="none"
              stroke="#28a745"
              strokeWidth={2}
              strokeDasharray="3 8"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="360"
                to={actualDirection === "right" ? "0" : "720"}
                dur="0.75s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        )}
      </g>

      {/* =========================================================
      CRUSHING MATERIAL
     ========================================================= */}

      {materialFlow && running && !effectiveAlarm && (
        <g>
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <circle
              key={index}
              cx={rotorCX - 30 + ((index * 17) % 60)}
              cy={rotorCY + 10 + ((index * 13) % 35)}
              r={index % 2 === 0 ? 3 : 2}
              fill={materialColor}
            >
              <animate
                attributeName="cy"
                values={`
                  ${rotorCY + 5};
                  ${rotorCY + 35};
                  ${rotorCY + 5}
                `}
                dur={`${0.65 + index * 0.08}s`}
                begin={`${index * 0.1}s`}
                repeatCount="indefinite"
              />

              <animate
                attributeName="opacity"
                values="0.2;1;0.2"
                dur={`${0.65 + index * 0.08}s`}
                begin={`${index * 0.1}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>
      )}

      {/* =========================================================
      OUTLET CHUTE
     ========================================================= */}

      <path
        d={`
      M ${crusherX + crusherW}
        ${crusherY + 48}
      L ${width - inletX}
        ${crusherY + 48}
      L ${width - inletX}
        ${crusherY + 92}
      L ${crusherX + crusherW}
        ${crusherY + 92}
      Z
    `}
        fill="#111c2d"
        stroke="#1f3b57"
        strokeWidth={2}
      />

      {materialFlow && safeOutletOpen && (
        <line
          x1={crusherX + crusherW + 5}
          y1={crusherY + 70}
          x2={width - inletX - 5}
          y2={crusherY + 70}
          stroke={materialColor}
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray="4 9"
        >
          <animate
            attributeName="stroke-dashoffset"
            values={actualDirection === "right" ? "0;-30" : "0;30"}
            dur="0.55s"
            repeatCount="indefinite"
          />
        </line>
      )}

      <circle
        cx={width - inletX - 12}
        cy={crusherY + 108}
        r={4}
        fill={safeOutletOpen ? "#28a745" : "#6c757d"}
      />

      <text
        x={width - inletX - 52}
        y={crusherY + 112}
        fill="#94a3b8"
        fontSize={8}
        fontFamily={fontFamily}
      >
        OUTLET
      </text>

      {/* =========================================================
      DIRECTION
     ========================================================= */}

      <text
        x={cx}
        y={crusherY + crusherH - 2}
        textAnchor="middle"
        fill={materialColor}
        fontSize={9}
        fontWeight="bold"
        fontFamily={fontFamily}
      >
        {actualDirection === "right"
          ? "MATERIAL → CRUSHING →"
          : "← CRUSHING ← MATERIAL"}
      </text>

      {/* =========================================================
      DETAIL PANEL
     ========================================================= */}

      {isdetail && (
        <g>
          <rect
            x={15}
            y={height - 76}
            width={width - 30}
            height={56}
            rx={6}
            fill="#111c2d"
            stroke="#1f3b57"
          />

          {/* FEED */}

          <text
            x={27}
            y={height - 54}
            fill="#64748b"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            FEED
          </text>

          <text
            x={27}
            y={height - 34}
            fill={materialColor}
            fontSize={valueSize + 2}
            fontWeight="bold"
            fontFamily={fontFamily}
          >
            {feedFlow.toLocaleString()} {feedFlowUnit}
          </text>

          {/* PRODUCT */}

          <text
            x={112}
            y={height - 54}
            fill="#64748b"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            PRODUCT
          </text>

          <text
            x={112}
            y={height - 34}
            fill="#f4c542"
            fontSize={valueSize + 2}
            fontWeight="bold"
            fontFamily={fontFamily}
          >
            {productFlow.toLocaleString()} {productFlowUnit}
          </text>

          {/* RPM */}

          <text
            x={220}
            y={height - 54}
            fill="#64748b"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            SPEED
          </text>

          <text
            x={220}
            y={height - 34}
            fill="#00bfff"
            fontSize={valueSize + 2}
            fontWeight="bold"
            fontFamily={fontFamily}
          >
            {rpm.toLocaleString()} {rpmUnit}
          </text>

          {/* LOAD */}

          <text
            x={310}
            y={height - 54}
            fill="#64748b"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            LOAD
          </text>

          <text
            x={310}
            y={height - 34}
            fill={loadColor}
            fontSize={valueSize + 2}
            fontWeight="bold"
            fontFamily={fontFamily}
          >
            {safeLoad.toFixed(0)} {loadUnit}
          </text>

          {/* VIBRATION */}

          <text
            x={385}
            y={height - 54}
            fill="#64748b"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            VIB
          </text>

          <text
            x={385}
            y={height - 34}
            fill={vibrationColor}
            fontSize={valueSize + 2}
            fontWeight="bold"
            fontFamily={fontFamily}
          >
            {vibration.toFixed(1)} {vibrationUnit}
          </text>

          {/* TEMP */}

          <text
            x={width - 75}
            y={height - 54}
            fill="#64748b"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            TEMP
          </text>

          <text
            x={width - 75}
            y={height - 34}
            fill={temperatureColor}
            fontSize={valueSize + 2}
            fontWeight="bold"
            fontFamily={fontFamily}
          >
            {bearingTemperature.toFixed(1)} {temperatureUnit}
          </text>
        </g>
      )}

      {/* =========================================================
      STATUS
     ========================================================= */}

      <text
        x={18}
        y={height - 8}
        fill={statusColor}
        fontSize={statusSize}
        fontWeight="bold"
        fontFamily={fontFamily}
      >
        {trip
          ? "● TRIPPED"
          : alarm
            ? "● ALARM"
            : running
              ? "● RUNNING"
              : "● STOPPED"}
      </text>

      {/* =========================================================
      COMMAND
     ========================================================= */}

      {sendCommand && (
        <g onClick={handleCommand} style={{ cursor: "pointer" }}>
          <rect
            x={width - 150}
            y={height - 35}
            width={130}
            height={24}
            rx={5}
            fill={running ? "#3b1820" : "#12351f"}
            stroke={running ? "#dc3545" : "#28a745"}
          />

          <text
            x={width - 85}
            y={height - 19}
            textAnchor="middle"
            fill={running ? "#ff6b6b" : "#5ee38b"}
            fontSize={9}
            fontWeight="bold"
            fontFamily={fontFamily}
          >
            {running ? "STOP CRUSHER" : "START CRUSHER"}
          </text>
        </g>
      )}
    </g>
  );
};

export default Crusher;
