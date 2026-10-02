import Cyclone from "../../../components/MimicRO/kiln/cyclone";

<svg viewBox="0 0 900 700">
  {/* Cyclone 1 */}
  <Cyclone
    x={100}
    y={100}
    width={120}
    height={220}
    title="CYCLONE 1"
    tag="CY-101"
    temperature={850}
    pressure={-120}
    materialFlow
    running
  />

  {/* Cyclone 2 */}
  <Cyclone
    x={260}
    y={100}
    width={120}
    height={220}
    title="CYCLONE 2"
    tag="CY-102"
    temperature={760}
    pressure={-180}
    materialFlow
    running
  />

  {/* Cyclone 3 */}
  <Cyclone
    x={420}
    y={100}
    width={120}
    height={220}
    title="CYCLONE 3"
    tag="CY-103"
    temperature={680}
    pressure={-240}
    materialFlow
    running
  />
</svg>;
