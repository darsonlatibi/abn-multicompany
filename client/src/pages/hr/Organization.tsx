import React, { useMemo, useState } from "react";
import {
  Building2,
  ChevronDown,
  ChevronRight,
  Download,
  Eye,
  Maximize2,
  Minus,
  Plus,
  Search,
  Users,
} from "lucide-react";

import "./Organization.css";

interface OrgNode {
  id: string;
  title: string;
  subtitle: string;
  head: string;
  employees: number;
  type: "BOARD" | "DIRECTOR" | "DIVISION" | "DEPARTMENT";
  status?: "ACTIVE" | "VACANT";
  children?: OrgNode[];
}

const organizationData: OrgNode = {
  id: "root",
  title: "PT Semen Tonasa",
  subtitle: "Tonasa Group",
  head: "Direktur Utama",
  employees: 2840,
  type: "BOARD",
  status: "ACTIVE",
  children: [
    {
      id: "production",
      title: "Production",
      subtitle: "Plant Operations",
      head: "General Manager",
      employees: 860,
      type: "DIVISION",
      status: "ACTIVE",
      children: [
        {
          id: "prod-ops",
          title: "Production Operations",
          subtitle: "Plant & Kiln",
          head: "Manager",
          employees: 420,
          type: "DEPARTMENT",
          status: "ACTIVE",
        },
        {
          id: "quality",
          title: "Quality Control",
          subtitle: "Laboratory",
          head: "Manager",
          employees: 145,
          type: "DEPARTMENT",
          status: "ACTIVE",
        },
        {
          id: "process",
          title: "Process Engineering",
          subtitle: "Process Optimization",
          head: "Manager",
          employees: 110,
          type: "DEPARTMENT",
          status: "ACTIVE",
        },
        {
          id: "production-support",
          title: "Production Support",
          subtitle: "Operations Support",
          head: "Manager",
          employees: 185,
          type: "DEPARTMENT",
          status: "ACTIVE",
        },
      ],
    },
    {
      id: "maintenance",
      title: "Maintenance",
      subtitle: "Asset Reliability",
      head: "General Manager",
      employees: 640,
      type: "DIVISION",
      status: "ACTIVE",
      children: [
        {
          id: "mechanical",
          title: "Mechanical",
          subtitle: "Mechanical Reliability",
          head: "Manager",
          employees: 250,
          type: "DEPARTMENT",
          status: "ACTIVE",
        },
        {
          id: "electrical",
          title: "Electrical",
          subtitle: "Electrical Systems",
          head: "Manager",
          employees: 170,
          type: "DEPARTMENT",
          status: "ACTIVE",
        },
        {
          id: "instrument",
          title: "Instrumentation",
          subtitle: "Control & Instrument",
          head: "Manager",
          employees: 105,
          type: "DEPARTMENT",
          status: "ACTIVE",
        },
        {
          id: "planning",
          title: "Maintenance Planning",
          subtitle: "Planning & Scheduling",
          head: "Manager",
          employees: 115,
          type: "DEPARTMENT",
          status: "ACTIVE",
        },
      ],
    },
    {
      id: "commercial",
      title: "Commercial",
      subtitle: "Sales & Distribution",
      head: "General Manager",
      employees: 310,
      type: "DIVISION",
      status: "ACTIVE",
      children: [
        {
          id: "sales",
          title: "Sales",
          subtitle: "Domestic Sales",
          head: "Manager",
          employees: 120,
          type: "DEPARTMENT",
          status: "ACTIVE",
        },
        {
          id: "distribution",
          title: "Distribution",
          subtitle: "Logistics",
          head: "Manager",
          employees: 95,
          type: "DEPARTMENT",
          status: "ACTIVE",
        },
        {
          id: "customer",
          title: "Customer Management",
          subtitle: "Customer Relations",
          head: "Manager",
          employees: 95,
          type: "DEPARTMENT",
          status: "ACTIVE",
        },
      ],
    },
    {
      id: "finance",
      title: "Finance",
      subtitle: "Finance & Accounting",
      head: "General Manager",
      employees: 240,
      type: "DIVISION",
      status: "ACTIVE",
      children: [
        {
          id: "accounting",
          title: "Accounting",
          subtitle: "Financial Accounting",
          head: "Manager",
          employees: 95,
          type: "DEPARTMENT",
          status: "ACTIVE",
        },
        {
          id: "treasury",
          title: "Treasury",
          subtitle: "Cash Management",
          head: "Manager",
          employees: 65,
          type: "DEPARTMENT",
          status: "ACTIVE",
        },
        {
          id: "finance-control",
          title: "Financial Control",
          subtitle: "Budget & Control",
          head: "Manager",
          employees: 80,
          type: "DEPARTMENT",
          status: "ACTIVE",
        },
      ],
    },
    {
      id: "hr",
      title: "Human Resources",
      subtitle: "People & Organization",
      head: "General Manager",
      employees: 215,
      type: "DIVISION",
      status: "ACTIVE",
      children: [
        {
          id: "hr-services",
          title: "HR Services",
          subtitle: "Employee Services",
          head: "Manager",
          employees: 75,
          type: "DEPARTMENT",
          status: "ACTIVE",
        },
        {
          id: "talent",
          title: "Talent Management",
          subtitle: "Learning & Development",
          head: "Manager",
          employees: 65,
          type: "DEPARTMENT",
          status: "ACTIVE",
        },
        {
          id: "organization",
          title: "Organization Development",
          subtitle: "Organization Planning",
          head: "Manager",
          employees: 75,
          type: "DEPARTMENT",
          status: "ACTIVE",
        },
      ],
    },
    {
      id: "support",
      title: "Corporate Support",
      subtitle: "Corporate Services",
      head: "General Manager",
      employees: 575,
      type: "DIVISION",
      status: "ACTIVE",
      children: [
        {
          id: "procurement",
          title: "Procurement",
          subtitle: "Strategic Procurement",
          head: "Manager",
          employees: 120,
          type: "DEPARTMENT",
          status: "ACTIVE",
        },
        {
          id: "it",
          title: "Information Technology",
          subtitle: "Digital & IT",
          head: "Manager",
          employees: 105,
          type: "DEPARTMENT",
          status: "ACTIVE",
        },
        {
          id: "legal",
          title: "Legal & Compliance",
          subtitle: "Legal Affairs",
          head: "Manager",
          employees: 80,
          type: "DEPARTMENT",
          status: "ACTIVE",
        },
        {
          id: "corporate",
          title: "Corporate Affairs",
          subtitle: "Corporate Relations",
          head: "Manager",
          employees: 95,
          type: "DEPARTMENT",
          status: "ACTIVE",
        },
        {
          id: "general",
          title: "General Services",
          subtitle: "General Affairs",
          head: "Manager",
          employees: 175,
          type: "DEPARTMENT",
          status: "ACTIVE",
        },
      ],
    },
  ],
};

/* =========================================================
 * HELPERS
 * ========================================================= */

const collectNodes = (node: OrgNode): OrgNode[] => {
  const result: OrgNode[] = [node];

  node.children?.forEach((child) => {
    result.push(...collectNodes(child));
  });

  return result;
};

const getTypeLabel = (type: OrgNode["type"]) => {
  switch (type) {
    case "BOARD":
      return "CORPORATE";
    case "DIRECTOR":
      return "DIRECTORATE";
    case "DIVISION":
      return "DIVISION";
    case "DEPARTMENT":
      return "DEPARTMENT";
    default:
      return "";
  }
};

const getNodeClass = (type: OrgNode["type"]) => {
  switch (type) {
    case "BOARD":
      return "org-svg-node board";
    case "DIRECTOR":
      return "org-svg-node director";
    case "DIVISION":
      return "org-svg-node division";
    default:
      return "org-svg-node department";
  }
};

/* =========================================================
 * SVG NODE
 * ========================================================= */

interface SvgNodeProps {
  node: OrgNode;
  x: number;
  y: number;
  width: number;
  height: number;
  selected: boolean;
  onSelect: (node: OrgNode) => void;
}

const SvgOrgNode: React.FC<SvgNodeProps> = ({
  node,
  x,
  y,
  width,
  height,
  selected,
  onSelect,
}) => {
  const nodeClass = getNodeClass(node.type);

  return (
    <g
      className={`${nodeClass} ${selected ? "selected" : ""}`}
      onClick={() => onSelect(node)}
      style={{ cursor: "pointer" }}
    >
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={12}
        className="svg-node-background"
      />

      <rect
        x={x}
        y={y}
        width={5}
        height={height}
        rx={3}
        className="svg-node-accent"
      />

      <circle cx={x + 28} cy={y + 28} r={16} className="svg-node-icon-bg" />

      <text x={x + 28} y={y + 33} textAnchor="middle" className="svg-node-icon">
        {node.type === "BOARD" ? "HQ" : node.type === "DIVISION" ? "D" : "•"}
      </text>

      <text x={x + 53} y={y + 24} className="svg-node-type">
        {getTypeLabel(node.type)}
      </text>

      <text x={x + 53} y={y + 44} className="svg-node-title">
        {node.title.length > 22 ? `${node.title.slice(0, 21)}…` : node.title}
      </text>

      <text x={x + 53} y={y + 61} className="svg-node-subtitle">
        {node.subtitle}
      </text>

      <line
        x1={x + 15}
        y1={y + height - 31}
        x2={x + width - 15}
        y2={y + height - 31}
        className="svg-node-divider"
      />

      <text x={x + 15} y={y + height - 12} className="svg-node-head">
        {node.head}
      </text>

      <text
        x={x + width - 15}
        y={y + height - 12}
        textAnchor="end"
        className="svg-node-employees"
      >
        {node.employees.toLocaleString()} emp
      </text>

      {node.status === "ACTIVE" && (
        <>
          <circle
            cx={x + width - 15}
            cy={y + 15}
            r={4}
            className="svg-status-dot"
          />

          <text
            x={x + width - 24}
            y={y + 19}
            textAnchor="end"
            className="svg-status-text"
          >
            ACTIVE
          </text>
        </>
      )}
    </g>
  );
};

/* =========================================================
 * ORGANIZATION
 * ========================================================= */

const Organization: React.FC = () => {
  const [search, setSearch] = useState("");
  const [zoom, setZoom] = useState(0.78);
  const [selectedNode, setSelectedNode] = useState<OrgNode>(organizationData);
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const allNodes = useMemo(() => collectNodes(organizationData), []);

  const filteredNodes = useMemo(() => {
    if (!search.trim()) return allNodes;

    const keyword = search.toLowerCase();

    return allNodes.filter(
      (node) =>
        node.title.toLowerCase().includes(keyword) ||
        node.subtitle.toLowerCase().includes(keyword) ||
        node.head.toLowerCase().includes(keyword),
    );
  }, [allNodes, search]);

  const totalDepartments = allNodes.filter(
    (node) => node.type === "DEPARTMENT",
  ).length;

  const totalDivisions = allNodes.filter(
    (node) => node.type === "DIVISION",
  ).length;

  const toggleCollapse = (id: string) => {
    setCollapsed((current) => {
      const next = new Set(current);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  const resetView = () => {
    setZoom(0.78);
    setCollapsed(new Set());
    setSelectedNode(organizationData);
  };

  const renderConnectors = (
    parent: OrgNode,
    parentX: number,
    parentY: number,
    parentWidth: number,
    parentHeight: number,
    childCount: number,
    childWidth: number,
    gap: number,
  ) => {
    const parentCenterX = parentX + parentWidth / 2;
    const startY = parentY + parentHeight;

    const totalWidth = childCount * childWidth + (childCount - 1) * gap;

    const firstChildX = parentCenterX - totalWidth / 2;

    const childCenterY = startY + 60;

    const horizontalStart = firstChildX + childWidth / 2;
    const horizontalEnd = firstChildX + totalWidth - childWidth / 2;

    return (
      <g className="svg-connectors">
        <line
          x1={parentCenterX}
          y1={startY}
          x2={parentCenterX}
          y2={childCenterY - 30}
        />

        {childCount > 1 && (
          <line
            x1={horizontalStart}
            y1={childCenterY - 30}
            x2={horizontalEnd}
            y2={childCenterY - 30}
          />
        )}

        {Array.from({ length: childCount }).map((_, index) => {
          const childX = firstChildX + index * (childWidth + gap);

          const childCenter = childX + childWidth / 2;

          return (
            <line
              key={`${parent.id}-connector-${index}`}
              x1={childCenter}
              y1={childCenterY - 30}
              x2={childCenter}
              y2={childCenterY}
            />
          );
        })}
      </g>
    );
  };

  const renderTree = () => {
    const rootWidth = 285;
    const divisionWidth = 235;
    const departmentWidth = 205;

    const divisionGap = 24;
    const departmentGap = 16;

    const rootX = 1050;
    const rootY = 50;

    // const visibleDivisions =
    //   organizationData.children?.filter(
    //     (division) => !collapsed.has(division.id),
    //   ) || [];

    const divisionCount = organizationData.children?.length || 0;

    const totalDivisionWidth =
      divisionCount * divisionWidth + (divisionCount - 1) * divisionGap;

    const divisionStartX = rootX + rootWidth / 2 - totalDivisionWidth / 2;

    const divisionY = 205;

    const elements: React.ReactNode[] = [];

    elements.push(
      <SvgOrgNode
        key={organizationData.id}
        node={organizationData}
        x={rootX}
        y={rootY}
        width={rootWidth}
        height={115}
        selected={selectedNode.id === organizationData.id}
        onSelect={setSelectedNode}
      />,
    );

    if (organizationData.children) {
      elements.push(
        <line
          key="root-line"
          x1={rootX + rootWidth / 2}
          y1={rootY + 115}
          x2={rootX + rootWidth / 2}
          y2={divisionY - 55}
          className="svg-connectors"
        />,
      );

      if (divisionCount > 1) {
        elements.push(
          <line
            key="root-horizontal"
            x1={divisionStartX + divisionWidth / 2}
            y1={divisionY - 55}
            x2={divisionStartX + totalDivisionWidth - divisionWidth / 2}
            y2={divisionY - 55}
            className="svg-connectors"
          />,
        );
      }

      organizationData.children.forEach((division, divisionIndex) => {
        const divisionX =
          divisionStartX + divisionIndex * (divisionWidth + divisionGap);

        elements.push(
          <line
            key={`${division.id}-top`}
            x1={divisionX + divisionWidth / 2}
            y1={divisionY - 55}
            x2={divisionX + divisionWidth / 2}
            y2={divisionY}
            className="svg-connectors"
          />,
        );

        elements.push(
          <SvgOrgNode
            key={division.id}
            node={division}
            x={divisionX}
            y={divisionY}
            width={divisionWidth}
            height={110}
            selected={selectedNode.id === division.id}
            onSelect={setSelectedNode}
          />,
        );

        if (division.children && !collapsed.has(division.id)) {
          const departments = division.children;

          const departmentCount = departments.length;

          const totalDepartmentWidth =
            departmentCount * departmentWidth +
            (departmentCount - 1) * departmentGap;

          const departmentStartX =
            divisionX + divisionWidth / 2 - totalDepartmentWidth / 2;

          const departmentY = 390;

          elements.push(
            renderConnectors(
              division,
              divisionX,
              divisionY,
              divisionWidth,
              110,
              departmentCount,
              departmentWidth,
              departmentGap,
            ),
          );

          departments.forEach((department, departmentIndex) => {
            const departmentX =
              departmentStartX +
              departmentIndex * (departmentWidth + departmentGap);

            elements.push(
              <SvgOrgNode
                key={department.id}
                node={department}
                x={departmentX}
                y={departmentY}
                width={departmentWidth}
                height={110}
                selected={selectedNode.id === department.id}
                onSelect={setSelectedNode}
              />,
            );
          });
        }
      });
    }

    return elements;
  };

  return (
    <div className="organization-page">
      {/* =====================================================
       * HEADER
       * ===================================================== */}

      <div className="organization-header">
        <div>
          <div className="organization-eyebrow">
            <Building2 size={15} />
            HUMAN RESOURCES
          </div>

          <h1>Organization Structure</h1>

          <p>
            Interactive organizational structure of PT Semen Tonasa and its
            operational divisions.
          </p>
        </div>

        <div className="organization-actions">
          <button className="organization-btn secondary">
            <Download size={17} />
            Export
          </button>

          <button className="organization-btn primary">
            <Users size={17} />
            Manage Organization
          </button>
        </div>
      </div>

      {/* =====================================================
       * KPI
       * ===================================================== */}

      <div className="organization-kpi-grid">
        <div className="organization-kpi">
          <div className="organization-kpi-icon blue">
            <Users size={20} />
          </div>

          <div>
            <span>Total Employees</span>
            <strong>2,840</strong>
            <small>Current workforce</small>
          </div>
        </div>

        <div className="organization-kpi">
          <div className="organization-kpi-icon green">
            <Building2 size={20} />
          </div>

          <div>
            <span>Divisions</span>
            <strong>{totalDivisions}</strong>
            <small>Operational divisions</small>
          </div>
        </div>

        <div className="organization-kpi">
          <div className="organization-kpi-icon purple">
            <Users size={20} />
          </div>

          <div>
            <span>Departments</span>
            <strong>{totalDepartments}</strong>
            <small>Active departments</small>
          </div>
        </div>

        <div className="organization-kpi">
          <div className="organization-kpi-icon orange">
            <Eye size={20} />
          </div>

          <div>
            <span>Organization Health</span>
            <strong>98.2%</strong>
            <small className="positive">Structure optimized</small>
          </div>
        </div>
      </div>

      {/* =====================================================
       * TOOLBAR
       * ===================================================== */}

      <div className="organization-toolbar">
        <div className="organization-search">
          <Search size={17} />

          <input
            type="text"
            placeholder="Search organization, division, department..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          {search && (
            <span className="search-count">{filteredNodes.length}</span>
          )}
        </div>

        <div className="organization-toolbar-actions">
          <button
            title="Zoom out"
            onClick={() => setZoom((value) => Math.max(0.45, value - 0.1))}
          >
            <Minus size={17} />
          </button>

          <span>{Math.round(zoom * 100)}%</span>

          <button
            title="Zoom in"
            onClick={() => setZoom((value) => Math.min(1.35, value + 0.1))}
          >
            <Plus size={17} />
          </button>

          <button title="Reset view" onClick={resetView}>
            <Maximize2 size={16} />
          </button>
        </div>
      </div>

      {/* =====================================================
       * LEGEND
       * ===================================================== */}

      <div className="organization-legend">
        <span>
          <i className="legend-dot corporate" />
          Corporate
        </span>

        <span>
          <i className="legend-dot division" />
          Division
        </span>

        <span>
          <i className="legend-dot department" />
          Department
        </span>

        <span>
          <i className="legend-status" />
          Active
        </span>

        <div className="legend-info">
          <Users size={14} />
          Click any node for details
        </div>
      </div>

      {/* =====================================================
       * SVG ORGANIZATION CHART
       * ===================================================== */}

      <section className="organization-chart-card">
        <div className="organization-chart-title">
          <div>
            <h2>Organization Chart</h2>
            <p>PT Semen Tonasa — Corporate organizational hierarchy</p>
          </div>

          <div className="chart-title-right">
            <span>
              <i />
              Live Structure
            </span>
          </div>
        </div>

        <div className="organization-svg-wrapper">
          <svg
            className="organization-svg"
            viewBox="0 0 2400 560"
            preserveAspectRatio="xMidYMid meet"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "center top",
            }}
          >
            <defs>
              <filter
                id="orgShadow"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feDropShadow
                  dx="0"
                  dy="2"
                  stdDeviation="3"
                  floodOpacity="0.08"
                />
              </filter>

              <linearGradient id="boardGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>

              <linearGradient id="divisionGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0f766e" />
                <stop offset="100%" stopColor="#0d9488" />
              </linearGradient>
            </defs>

            <g filter="url(#orgShadow)">{renderTree()}</g>
          </svg>
        </div>
      </section>

      {/* =====================================================
       * SELECTED NODE
       * ===================================================== */}

      <section className="organization-detail-card">
        <div className="organization-detail-icon">
          <Building2 size={21} />
        </div>

        <div className="organization-detail-main">
          <div className="detail-breadcrumb">
            ORGANIZATION / {getTypeLabel(selectedNode.type)}
          </div>

          <h3>{selectedNode.title}</h3>

          <p>{selectedNode.subtitle}</p>
        </div>

        <div className="organization-detail-stat">
          <span>Head</span>
          <strong>{selectedNode.head}</strong>
        </div>

        <div className="organization-detail-stat">
          <span>Employees</span>
          <strong>{selectedNode.employees.toLocaleString()}</strong>
        </div>

        <div className="organization-detail-stat">
          <span>Status</span>
          <strong className="detail-active">● Active</strong>
        </div>

        {selectedNode.children && selectedNode.children.length > 0 && (
          <button
            className="detail-expand-btn"
            onClick={() => toggleCollapse(selectedNode.id)}
          >
            {collapsed.has(selectedNode.id) ? (
              <>
                <ChevronRight size={16} />
                Expand
              </>
            ) : (
              <>
                <ChevronDown size={16} />
                Collapse
              </>
            )}
          </button>
        )}
      </section>

      {/* =====================================================
       * FOOTER
       * ===================================================== */}

      <div className="organization-footer">
        <span>ABN Human Resources Management System</span>

        <span>Designed by ABN</span>
      </div>
    </div>
  );
};

export default Organization;
