import React from "react";
import RawMaterialInlet from "../../../components/MimicRO/rawmill/RawMaterialInlet";
import BeltConveyor from "../../../components/MimicRO/transport/BeltConveyor";
import GrindingMill from "../../../components/MimicRO/rawmill/GrindingMill";
import GrindingTable from "../../../components/MimicRO/rawmill/GrindingTable";

import Separator from "../../../components/MimicRO/rawmill/Separator";
import Outlet from "../../../components/MimicRO/rawmill/Outlet";
import BucketElevator from "../../../components/MimicRO/transport/BucketElevator";
import ScrewConveyor from "../../../components/MimicRO/transport/ScrewConveyor";
import Reject from "../../../components/MimicRO/rawmill/Reject";
import HotGasInlet from "../../../components/MimicRO/rawmill/HotGasInlet";

interface RawMillDashboardProps {
  width?: number;
  height?: number;

  title?: string;
  plantName?: string;

  running?: boolean;
  alarm?: boolean;

  feedFlow?: number;
  rawMealFlow?: number;
  rejectFlow?: number;

  millTemperature?: number;
  millPressure?: number;

  separatorTemperature?: number;
  separatorPressure?: number;
  separatorRPM?: number;

  hotGasTemperature?: number;
  hotGasPressure?: number;
  hotGasFlow?: number;

  beltFlow?: number;
  beltSpeed?: number;
  beltAngle?: number;

  elevatorFlow?: number;
  elevatorSpeed?: number;

  screwFlow?: number;
  screwSpeed?: number;
  screwAngle?: number;

  materialFlow?: boolean;
  gasFlow?: boolean;

  fanRunning?: boolean;
  separatorRunning?: boolean;
  feederRunning?: boolean;
  beltRunning?: boolean;
  elevatorRunning?: boolean;
  screwRunning?: boolean;

  sendCommand?: (command: string, value?: unknown) => void;
}

const RawMillDashboard: React.FC<RawMillDashboardProps> = ({
  width = 1600,
  height = 950,

  title = "RAW MILL PROCESS",
  plantName = "RAW MILL AREA",

  running = true,
  alarm = false,

  feedFlow = 125,
  rawMealFlow = 118,
  rejectFlow = 12,

  millTemperature = 95,
  millPressure = -6500,

  separatorTemperature = 82,
  separatorPressure = -6200,
  separatorRPM = 850,

  hotGasTemperature = 285,
  hotGasPressure = -6500,
  hotGasFlow = 125000,

  beltFlow = 125,
  beltSpeed = 1.2,
  beltAngle = 8,

  elevatorFlow = 118,
  elevatorSpeed = 1.8,

  screwFlow = 12,
  screwSpeed = 35,
  screwAngle = -8,

  materialFlow = true,
  gasFlow = true,

  fanRunning,
  separatorRunning,
  feederRunning,
  beltRunning,
  elevatorRunning,
  screwRunning,

  sendCommand,
}) => {
  const safeFanRunning = fanRunning ?? running;
  const safeSeparatorRunning = separatorRunning ?? running;
  const safeFeederRunning = feederRunning ?? running;
  const safeBeltRunning = beltRunning ?? running;
  const safeElevatorRunning = elevatorRunning ?? running;
  const safeScrewRunning = screwRunning ?? running;

  const statusColor = alarm ? "#dc3545" : running ? "#28a745" : "#6c757d";

  const handleCommand = (command: string, value?: unknown) => {
    sendCommand?.(command, value);
  };

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      style={{
        display: "block",
        background: "#07101c",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* =========================================================
          BACKGROUND
         ========================================================= */}

      <rect x={0} y={0} width={width} height={height} fill="#07101c" />

      <defs>
        <linearGradient id="rawMillBgGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0b1624" />
          <stop offset="100%" stopColor="#07101c" />
        </linearGradient>

        <filter id="rawMillGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill="url(#rawMillBgGradient)"
      />

      {/* =========================================================
          HEADER
         ========================================================= */}

      <rect
        x={20}
        y={18}
        width={width - 40}
        height={70}
        rx={10}
        fill="#0b1220"
        stroke={alarm ? "#dc3545" : "#1f3b57"}
        strokeWidth={2}
      />

      <text x={42} y={47} fill="#00bfff" fontSize={13} fontWeight="bold">
        ABN • INDUSTRIAL EMS
      </text>

      <text x={42} y={72} fill="#d8dee9" fontSize={21} fontWeight="bold">
        {title}
      </text>

      <text x={width - 300} y={43} fill="#64748b" fontSize={10}>
        AREA
      </text>

      <text
        x={width - 300}
        y={63}
        fill="#94a3b8"
        fontSize={13}
        fontWeight="bold"
      >
        {plantName}
      </text>

      {/* Main status */}

      <circle
        cx={width - 75}
        cy={52}
        r={9}
        fill={statusColor}
        filter={running && !alarm ? "url(#rawMillGlow)" : undefined}
      >
        {running && !alarm && (
          <animate
            attributeName="r"
            values="7;11;7"
            dur="1.2s"
            repeatCount="indefinite"
          />
        )}

        {alarm && (
          <animate
            attributeName="opacity"
            values="1;0.2;1"
            dur="0.5s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      <text
        x={width - 55}
        y={48}
        fill={statusColor}
        fontSize={11}
        fontWeight="bold"
      >
        {alarm ? "ALARM" : running ? "RUNNING" : "STOPPED"}
      </text>

      <text x={width - 55} y={65} fill="#64748b" fontSize={8}>
        PROCESS STATUS
      </text>

      {/* =========================================================
          PROCESS FLOW LINES
         ========================================================= */}

      {/* Raw material main route */}

      <path
        d="
          M 170 340
          L 430 340
          L 570 420
          L 760 420
          L 900 340
          L 1120 340
          L 1290 450
        "
        fill="none"
        stroke="#1f3b57"
        strokeWidth={12}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Material animation */}

      {materialFlow && (
        <path
          d="
            M 170 340
            L 430 340
            L 570 420
            L 760 420
            L 900 340
            L 1120 340
            L 1290 450
          "
          fill="none"
          stroke="#f4c542"
          strokeWidth={5}
          strokeDasharray="8 18"
          strokeLinecap="round"
          opacity={0.9}
        >
          <animate
            attributeName="stroke-dashoffset"
            values="0;-52"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </path>
      )}

      {/* Hot gas route */}

      <path
        d="
          M 730 790
          L 730 650
          L 730 530
          L 730 430
        "
        fill="none"
        stroke="#1f3b57"
        strokeWidth={14}
        strokeLinecap="round"
      />

      {gasFlow && (
        <path
          d="
            M 730 790
            L 730 650
            L 730 530
            L 730 430
          "
          fill="none"
          stroke="#00bfff"
          strokeWidth={6}
          strokeDasharray="7 17"
          strokeLinecap="round"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="0;48"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </path>
      )}

      {/* =========================================================
          RAW MATERIAL INLET
         ========================================================= */}

      <RawMaterialInlet
        x={40}
        y={170}
        width={300}
        height={300}
        tag="RM-IN-101"
        title="RAW MATERIAL INLET"
        temperature={35}
        pressure={-2500}
        flow={feedFlow}
        materialFlow={materialFlow}
        gasFlow={false}
        running={running}
        alarm={alarm}
        feederRunning={safeFeederRunning}
        sendCommand={handleCommand}
      />

      {/* =========================================================
          BELT CONVEYOR
         ========================================================= */}

      <BeltConveyor
        x={270}
        y={225}
        width={430}
        height={250}
        tag="BC-101"
        title="RAW MATERIAL CONVEYOR"
        flow={beltFlow}
        speed={beltSpeed}
        angle={beltAngle}
        materialFlow={materialFlow}
        running={safeBeltRunning}
        alarm={alarm}
        driveRunning={safeBeltRunning}
        direction="right"
        sendCommand={handleCommand}
      />

      {/* =========================================================
          GRINDING MILL
         ========================================================= */}

      <GrindingMill
        x={520}
        y={310}
        width={390}
        height={500}
        tag="RM-101"
        title="RAW GRINDING MILL"
        temperature={millTemperature}
        pressure={millPressure}
        materialFlow={materialFlow}
        gasFlow={gasFlow}
        rawMealFlow={materialFlow}
        rejectFlow={materialFlow}
        running={running}
        alarm={alarm}
        fanRunning={safeFanRunning}
        separatorRunning={safeSeparatorRunning}
        sendCommand={handleCommand}
      />

      {/* =========================================================
          GRINDING TABLE
         ========================================================= */}

      <GrindingTable
        x={590}
        y={555}
        width={260}
        height={210}
        tag="GT-101"
        title="GRINDING TABLE"
        temperature={millTemperature}
        pressure={millPressure}
        materialFlow={materialFlow}
        gasFlow={gasFlow}
        running={running}
        alarm={alarm}
        fanRunning={safeFanRunning}
        separatorRunning={safeSeparatorRunning}
        sendCommand={handleCommand}
      />

      {/* =========================================================
          HOT GAS INLET
         ========================================================= */}

      <HotGasInlet
        x={570}
        y={720}
        width={320}
        height={190}
        tag="HG-101"
        title="HOT GAS INLET"
        temperature={hotGasTemperature}
        pressure={hotGasPressure}
        flow={hotGasFlow}
        gasFlow={gasFlow}
        running={safeFanRunning}
        alarm={alarm}
        fanRunning={safeFanRunning}
        sendCommand={handleCommand}
      />

      {/* =========================================================
          SEPARATOR
         ========================================================= */}

      <Separator
        x={890}
        y={175}
        width={300}
        height={470}
        tag="SEP-101"
        title="DYNAMIC SEPARATOR"
        temperature={separatorTemperature}
        pressure={separatorPressure}
        rpm={separatorRPM}
        materialFlow={materialFlow}
        gasFlow={gasFlow}
        running={safeSeparatorRunning}
        alarm={alarm}
        fanRunning={safeFanRunning}
        millRunning={running}
        sendCommand={handleCommand}
      />

      {/* =========================================================
          RAW MEAL OUTLET
         ========================================================= */}

      <Outlet
        x={1110}
        y={245}
        width={350}
        height={260}
        tag="OUT-101"
        title="RAW MEAL OUTLET"
        temperature={82}
        pressure={-6200}
        flow={rawMealFlow}
        materialFlow={materialFlow}
        gasFlow={gasFlow}
        running={running}
        alarm={alarm}
        damperOpen={running}
        fanRunning={safeFanRunning}
        sendCommand={handleCommand}
      />

      {/* =========================================================
          BUCKET ELEVATOR
         ========================================================= */}

      <BucketElevator
        x={1220}
        y={430}
        width={250}
        height={430}
        tag="BE-101"
        title="RAW MEAL ELEVATOR"
        flow={elevatorFlow}
        speed={elevatorSpeed}
        level={65}
        materialFlow={materialFlow}
        running={safeElevatorRunning}
        alarm={alarm}
        driveRunning={safeElevatorRunning}
        inletOpen={running}
        outletOpen={running}
        direction="up"
        sendCommand={handleCommand}
      />

      {/* =========================================================
          REJECT SCREW
         ========================================================= */}

      <ScrewConveyor
        x={870}
        y={640}
        width={400}
        height={230}
        tag="SC-101"
        title="REJECT SCREW"
        flow={screwFlow}
        speed={screwSpeed}
        angle={screwAngle}
        materialFlow={materialFlow}
        running={safeScrewRunning}
        alarm={alarm}
        driveRunning={safeScrewRunning}
        direction="right"
        sendCommand={handleCommand}
      />

      {/* =========================================================
          REJECT ROUTE
         ========================================================= */}

      <Reject
        x={930}
        y={730}
        width={260}
        height={190}
        tag="RJ-101"
        title="MILL REJECT"
        temperature={85}
        pressure={-6800}
        flow={rejectFlow}
        materialFlow={materialFlow}
        gasFlow={false}
        running={running}
        alarm={alarm}
        gateOpen={running}
        conveyorRunning={safeScrewRunning}
        sendCommand={handleCommand}
      />

      {/* =========================================================
          GAS FLOW LABEL
         ========================================================= */}

      <g>
        <rect
          x={620}
          y={825}
          width={220}
          height={48}
          rx={7}
          fill="#0b1220"
          stroke="#1f3b57"
        />

        <circle cx={640} cy={849} r={6} fill={gasFlow ? "#00bfff" : "#475569"}>
          {gasFlow && (
            <animate
              attributeName="opacity"
              values="0.3;1;0.3"
              dur="0.8s"
              repeatCount="indefinite"
            />
          )}
        </circle>

        <text x={654} y={846} fill="#94a3b8" fontSize={9}>
          HOT GAS
        </text>

        <text x={654} y={861} fill="#00bfff" fontSize={11} fontWeight="bold">
          {hotGasFlow.toLocaleString()} Nm³/h
        </text>
      </g>

      {/* =========================================================
          PROCESS KPI PANEL
         ========================================================= */}

      <g>
        <rect
          x={20}
          y={720}
          width={430}
          height={190}
          rx={10}
          fill="#0b1220"
          stroke="#1f3b57"
        />

        <text x={40} y={748} fill="#00bfff" fontSize={12} fontWeight="bold">
          RAW MILL PROCESS KPI
        </text>

        {/* Feed */}

        <text x={40} y={775} fill="#64748b" fontSize={9}>
          FEED
        </text>

        <text x={40} y={795} fill="#f4c542" fontSize={15} fontWeight="bold">
          {feedFlow.toLocaleString()} t/h
        </text>

        {/* Raw meal */}

        <text x={180} y={775} fill="#64748b" fontSize={9}>
          RAW MEAL
        </text>

        <text x={180} y={795} fill="#00ffff" fontSize={15} fontWeight="bold">
          {rawMealFlow.toLocaleString()} t/h
        </text>

        {/* Reject */}

        <text x={330} y={775} fill="#64748b" fontSize={9}>
          REJECT
        </text>

        <text x={330} y={795} fill="#ff9500" fontSize={15} fontWeight="bold">
          {rejectFlow.toLocaleString()} t/h
        </text>

        {/* Mill temperature */}

        <text x={40} y={825} fill="#64748b" fontSize={9}>
          MILL TEMP
        </text>

        <text
          x={40}
          y={845}
          fill={millTemperature >= 120 ? "#dc3545" : "#00bfff"}
          fontSize={14}
          fontWeight="bold"
        >
          {millTemperature} °C
        </text>

        {/* Mill pressure */}

        <text x={180} y={825} fill="#64748b" fontSize={9}>
          MILL PRESSURE
        </text>

        <text x={180} y={845} fill="#94a3b8" fontSize={14} fontWeight="bold">
          {millPressure.toLocaleString()} Pa
        </text>

        {/* Separator */}

        <text x={330} y={825} fill="#64748b" fontSize={9}>
          SEPARATOR
        </text>

        <text x={330} y={845} fill="#00bfff" fontSize={14} fontWeight="bold">
          {separatorRPM} RPM
        </text>

        {/* Fan */}

        <circle
          cx={47}
          cy={875}
          r={5}
          fill={safeFanRunning ? "#28a745" : "#6c757d"}
        />

        <text x={60} y={879} fill="#94a3b8" fontSize={9}>
          FAN
        </text>

        {/* Separator */}

        <circle
          cx={140}
          cy={875}
          r={5}
          fill={safeSeparatorRunning ? "#28a745" : "#6c757d"}
        />

        <text x={153} y={879} fill="#94a3b8" fontSize={9}>
          SEPARATOR
        </text>

        {/* Conveyor */}

        <circle
          cx={260}
          cy={875}
          r={5}
          fill={safeBeltRunning ? "#28a745" : "#6c757d"}
        />

        <text x={273} y={879} fill="#94a3b8" fontSize={9}>
          CONVEYOR
        </text>

        {/* Alarm */}

        <circle cx={380} cy={875} r={5} fill={alarm ? "#dc3545" : "#28a745"} />

        <text x={393} y={879} fill="#94a3b8" fontSize={9}>
          ALARM
        </text>
      </g>

      {/* =========================================================
          PROCESS LEGEND
         ========================================================= */}

      <g transform={`translate(${width - 420}, ${height - 45})`}>
        <circle cx={0} cy={0} r={5} fill="#f4c542" />

        <text x={12} y={4} fill="#94a3b8" fontSize={9}>
          MATERIAL
        </text>

        <circle cx={105} cy={0} r={5} fill="#00bfff" />

        <text x={117} y={4} fill="#94a3b8" fontSize={9}>
          GAS
        </text>

        <circle cx={175} cy={0} r={5} fill="#28a745" />

        <text x={187} y={4} fill="#94a3b8" fontSize={9}>
          RUN
        </text>

        <circle cx={245} cy={0} r={5} fill="#dc3545" />

        <text x={257} y={4} fill="#94a3b8" fontSize={9}>
          ALARM
        </text>

        <text x={325} y={4} fill="#64748b" fontSize={9}>
          REALTIME
        </text>
      </g>

      {/* =========================================================
          COMMAND FOOTER
         ========================================================= */}

      {sendCommand && (
        <g
          onClick={() =>
            handleCommand(running ? "STOP_RAW_MILL" : "START_RAW_MILL", {
              area: "RAW_MILL",
            })
          }
          style={{
            cursor: "pointer",
          }}
        >
          <rect
            x={width - 190}
            y={height - 90}
            width={150}
            height={32}
            rx={6}
            fill={running ? "#3b1820" : "#12351f"}
            stroke={running ? "#dc3545" : "#28a745"}
          />

          <text
            x={width - 115}
            y={height - 69}
            textAnchor="middle"
            fill={running ? "#ff6b6b" : "#5ee38b"}
            fontSize={10}
            fontWeight="bold"
          >
            {running ? "STOP RAW MILL" : "START RAW MILL"}
          </text>
        </g>
      )}
    </svg>
  );
};

export default RawMillDashboard;
