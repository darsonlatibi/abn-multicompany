import { useEffect, useState, type ComponentType, type ReactNode } from "react";
import { createPortal } from "react-dom";

import {
  Activity,
  AlertTriangle,
  ArrowLeftRight,
  BarChart3,
  Bell,
  BellRing,
  Boxes,
  Building2,
  CalendarCheck,
  CheckCircle2,
  CircleDollarSign,
  CircleHelp,
  ClipboardList,
  Cpu,
  CreditCard,
  Database,
  FileEdit,
  FilePlus2,
  Fuel,
  Gauge,
  History,
  Inbox,
  KeyRound,
  LayoutDashboard,
  LifeBuoy,
  LocateFixed,
  LockKeyhole,
  Mail,
  MapPinned,
  MessageCircle,
  MessageSquare,
  Network,
  Package,
  PackageCheck,
  PenLine,
  PlugZap,
  Radio,
  Receipt,
  ReceiptText,
  Route,
  ScrollText,
  Send,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Trash2,
  Truck,
  UserCog,
  UserPlus,
  UserRoundSearch,
  Users,
  UsersRound,
  Wallet,
  WalletCards,
  Warehouse,
  Wrench,
  X,
  BrainCircuit,
  FileBarChart,
  MessageSquareText,
  Factory,
  CalendarRange,
  CalendarClock,
  Cog,
  Workflow,
  BadgeCheck,
  TimerOff,
  HardDrive,
  Hammer,
  FileText,
  RotateCcw,
  Target,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import type { RootState } from "../../stores/store";

import "./Sidebar.css";
import logo from "../../assets/logo.png";

/* =========================================================
   TYPES
   ========================================================= */

interface SidebarProps {
  onClose?: () => void;
}

interface MenuItem {
  label: string;

  path?: string;

  icon: ComponentType<{
    size?: number;
    strokeWidth?: number;
  }>;

  live?: boolean;

  adminOnly?: boolean;

  children?: MenuItem[];
}

/* =========================================================
   MENU ITEMS
   ========================================================= */

const menuItems: MenuItem[] = [
  /* =======================================================
     EXECUTIVE DASHBOARD
     ======================================================= */

  {
    label: "Executive Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },

  /* =======================================================
     HUMAN RESOURCES
     ======================================================= */

  {
    label: "Human Resources",
    icon: Users,
    children: [
      {
        label: "Employees",
        path: "/hr/employees",
        icon: Users,
      },
      {
        label: "Attendance",
        path: "/hr/attendance",
        icon: CalendarCheck,
      },
      {
        label: "Organization",
        path: "/hr/organization",
        icon: Network,
      },
      {
        label: "Payroll",
        path: "/hr/payroll",
        icon: WalletCards,
        adminOnly: true,
      },
    ],
  },

  /* =======================================================
     FLEET MANAGEMENT
     ======================================================= */

  {
    label: "Fleet Management",
    icon: Truck,

    children: [
      {
        label: "Vehicles",
        path: "/fleet",
        icon: Truck,
      },
      {
        label: "Drivers",
        path: "/drivers",
        icon: Users,
      },
      {
        label: "GPS Tracking",
        path: "/tracking",
        icon: MapPinned,
        live: true,
      },
      {
        label: "Trips",
        path: "/trips",
        icon: Route,
      },
      {
        label: "Maintenance",
        path: "/fleet/maintenance",
        icon: Wrench,
      },
      {
        label: "Fuel",
        path: "/fleet/fuel",
        icon: Fuel,
      },
      {
        label: "Device",
        path: "/device",
        icon: Cpu,
        adminOnly: true,
      },
    ],
  },

  /* =======================================================
     INVENTORY & WAREHOUSE
     ======================================================= */

  {
    label: "Inventory & Warehouse",
    icon: Package,

    children: [
      {
        label: "Products",
        path: "/inventory/products",
        icon: Package,
      },
      {
        label: "Stock",
        path: "/inventory/stock",
        icon: Boxes,
      },
      {
        label: "Warehouse",
        path: "/inventory/warehouse",
        icon: Warehouse,
      },
      {
        label: "Stock Movement",
        path: "/inventory/movement",
        icon: ArrowLeftRight,
      },
    ],
  },

  /* =======================================================
     PROCUREMENT
     ======================================================= */

  {
    label: "Procurement",
    icon: ShoppingCart,

    children: [
      {
        label: "Vendors",
        path: "/procurement/vendors",
        icon: Building2,
      },
      {
        label: "Purchase Request",
        path: "/procurement/purchase-request",
        icon: FilePlus2,
      },
      {
        label: "Purchase Order",
        path: "/procurement/purchase-order",
        icon: ClipboardList,
      },
      {
        label: "Receiving",
        path: "/procurement/receiving",
        icon: PackageCheck,
      },
    ],
  },

  /* =======================================================
     SALES & DISTRIBUTION
     ======================================================= */

  {
    label: "Sales & Distribution",
    icon: ShoppingCart,

    children: [
      {
        label: "Sales Dashboard",
        path: "/sales",
        icon: LayoutDashboard,
      },

      {
        label: "Customers",
        path: "/sales/customers",
        icon: UsersRound,
      },

      {
        label: "Sales Leads",
        path: "/sales/leads",
        icon: UserPlus,
      },

      {
        label: "Quotations",
        path: "/sales/quotations",
        icon: FileText,
      },

      {
        label: "Sales Orders",
        path: "/sales/orders",
        icon: ClipboardList,
      },

      {
        label: "Delivery Orders",
        path: "/sales/delivery-orders",
        icon: Truck,
      },

      {
        label: "Shipping",
        path: "/sales/shipping",
        icon: Send,
      },

      {
        label: "Invoices",
        path: "/sales/invoices",
        icon: Receipt,
      },

      {
        label: "Payments",
        path: "/sales/payments",
        icon: CreditCard,
      },

      {
        label: "Sales Returns",
        path: "/sales/returns",
        icon: RotateCcw,
      },

      {
        label: "Sales Targets",
        path: "/sales/targets",
        icon: Target,
      },

      {
        label: "Sales Performance",
        path: "/sales/performance",
        icon: BarChart3,
      },

      {
        label: "Sales Reports",
        path: "/sales/reports",
        icon: FileBarChart,
      },
    ],
  },

  /* =======================================================
     FINANCE
     ======================================================= */

  {
    label: "Finance",
    icon: CircleDollarSign,

    children: [
      {
        label: "Invoice",
        path: "/finance/invoice",
        icon: Receipt,
      },
      {
        label: "Payment",
        path: "/finance/payment",
        icon: CreditCard,
      },
      {
        label: "Expenses",
        path: "/finance/expenses",
        icon: ReceiptText,
      },
      {
        label: "Cashflow",
        path: "/finance/cashflow",
        icon: Wallet,
      },
    ],
  },

  /* =======================================================
     PRODUCTION
     ======================================================= */

  {
    label: "Production",
    icon: Factory,

    children: [
      {
        label: "Production Dashboard",
        path: "/production",
        icon: LayoutDashboard,
      },

      {
        label: "Production Planning",
        path: "/production/planning",
        icon: CalendarRange,
      },

      {
        label: "Production Orders",
        path: "/production/orders",
        icon: ClipboardList,
      },

      {
        label: "Production Schedule",
        path: "/production/schedule",
        icon: CalendarClock,
      },

      {
        label: "Production Monitoring",
        path: "/production/monitoring",
        icon: Activity,
        live: true,
      },

      {
        label: "Machines",
        path: "/production/machines",
        icon: Cog,
      },

      {
        label: "Production Lines",
        path: "/production/lines",
        icon: Workflow,
      },

      // =====================================================
      // TONASA 4
      // =====================================================

      {
        label: "Tonasa 4",
        icon: Factory,

        children: [
          {
            label: "Crusher",
            path: "/production/tonasa-4/crusher",
            icon: Hammer,
            live: true,
          },

          {
            label: "Raw Mill",
            path: "/production/tonasa-4/rawmill",
            icon: Factory,
            live: true,
          },

          {
            label: "Kiln",
            path: "/production/tonasa-4/kiln",
            icon: Factory,
            live: true,
          },

          {
            label: "Finish Mill",
            path: "/production/tonasa-4/finish-mill",
            icon: Cog,
            live: true,
          },

          {
            label: "Packer",
            path: "/production/tonasa-4/packer",
            icon: Package,
            live: true,
          },
        ],
      },

      // =====================================================
      // TONASA 5
      // =====================================================

      {
        label: "Tonasa 5",
        icon: Factory,

        children: [
          {
            label: "Crusher",
            path: "/production/tonasa-5/crusher",
            icon: Hammer,
            live: true,
          },

          {
            label: "Raw Mill",
            path: "/production/tonasa-5/rawmill",
            icon: Factory,
            live: true,
          },

          {
            label: "Finish Mill",
            path: "/production/tonasa-5/finish-mill",
            icon: Cog,
            live: true,
          },

          {
            label: "Packer",
            path: "/production/tonasa-5/packer",
            icon: Package,
            live: true,
          },
        ],
      },

      // =====================================================
      // MATERIAL & QUALITY
      // =====================================================

      {
        label: "BOM",
        path: "/production/bom",
        icon: Boxes,
      },

      {
        label: "Raw Materials",
        path: "/production/raw-materials",
        icon: Package,
      },

      {
        label: "Quality Control",
        path: "/production/quality",
        icon: BadgeCheck,
      },

      {
        label: "Production Downtime",
        path: "/production/downtime",
        icon: TimerOff,
      },

      {
        label: "Production Reports",
        path: "/production/reports",
        icon: FileBarChart,
      },
    ],
  },

  /* =======================================================
     MAINTENANCE
     ======================================================= */

  {
    label: "Maintenance",
    icon: Wrench,

    children: [
      {
        label: "Maintenance Dashboard",
        path: "/maintenance",
        icon: LayoutDashboard,
      },
      {
        label: "Work Orders",
        path: "/maintenance/work-orders",
        icon: ClipboardList,
      },
      {
        label: "Preventive Maintenance",
        path: "/maintenance/preventive",
        icon: CalendarCheck,
      },
      {
        label: "Corrective Maintenance",
        path: "/maintenance/corrective",
        icon: Wrench,
      },
      {
        label: "Predictive Maintenance",
        path: "/maintenance/predictive",
        icon: BrainCircuit,
      },
      {
        label: "Assets",
        path: "/maintenance/assets",
        icon: HardDrive,
      },
      {
        label: "Machines",
        path: "/maintenance/machines",
        icon: Cog,
      },
      {
        label: "Spare Parts",
        path: "/maintenance/spare-parts",
        icon: Package,
      },
      {
        label: "Maintenance Schedule",
        path: "/maintenance/schedule",
        icon: CalendarClock,
      },
      {
        label: "Maintenance History",
        path: "/maintenance/history",
        icon: History,
      },
      {
        label: "Maintenance Cost",
        path: "/maintenance/cost",
        icon: CircleDollarSign,
      },
      {
        label: "Maintenance Reports",
        path: "/maintenance/reports",
        icon: FileBarChart,
      },
    ],
  },

  /* =======================================================
     CRM
     ======================================================= */

  {
    label: "CRM",
    icon: UserRoundSearch,

    children: [
      {
        label: "Customers",
        path: "/crm/customers",
        icon: UsersRound,
      },
      {
        label: "Leads",
        path: "/crm/leads",
        icon: UserPlus,
      },
      {
        label: "Activities",
        path: "/crm/activities",
        icon: Activity,
      },
    ],
  },

  /* =======================================================
     REPORTS & ANALYTICS
     ======================================================= */

  {
    label: "Reports & Analytics",
    path: "/reports",
    icon: BarChart3,
  },

  /* =======================================================
     ALERTS & APPROVAL
     ======================================================= */

  {
    label: "Alerts & Approval",
    icon: BellRing,

    children: [
      {
        label: "Alerts",
        path: "/alerts",
        icon: AlertTriangle,
      },
      {
        label: "Approvals",
        path: "/approvals",
        icon: CheckCircle2,
      },
    ],
  },

  /* =======================================================
   INDUSTRIAL INTELLIGENCE ENGINE
   CHATGPT / AI INTELLIGENCE LAYER
   ======================================================= */
  {
    label: "Industrial Intelligence",
    icon: BrainCircuit,

    children: [
      {
        label: "AI Command Center",
        path: "/ai",
        icon: BrainCircuit,
      },

      {
        label: "AI Operations",
        path: "/ai/operations",
        icon: Activity,
      },

      {
        label: "AI Production",
        path: "/ai/production",
        icon: Factory,
      },

      {
        label: "AI Clinker Intelligence",
        path: "/ai/clinker",
        icon: Boxes,
      },

      {
        label: "AI Fleet Intelligence",
        path: "/ai/fleet",
        icon: Truck,
      },

      {
        label: "AI SCADA Intelligence",
        path: "/ai/scada",
        icon: Gauge,
      },

      {
        label: "AI Maintenance",
        path: "/ai/maintenance",
        icon: Wrench,
      },

      {
        label: "AI Supply Chain",
        path: "/ai/supply-chain",
        icon: Boxes,
      },

      {
        label: "AI Finance",
        path: "/ai/finance",
        icon: CircleDollarSign,
      },

      {
        label: "AI Workforce",
        path: "/ai/workforce",
        icon: Users,
      },

      {
        label: "AI Reports",
        path: "/ai/reports",
        icon: FileBarChart,
      },

      {
        label: "AI Copilot",
        path: "/ai/copilot",
        icon: MessageSquareText,
      },
    ],
  },

  /* =======================================================
     TONASA GROUP & SUBSIDIARIES
     GROUP / EXECUTIVE LEVEL
     ======================================================= */

  {
    label: "Tonasa Group & Subsidiaries",
    icon: Building2,

    children: [
      {
        label: "Group Dashboard",
        path: "/group",
        icon: LayoutDashboard,
      },

      /* =====================================================
         PT BIRINGKASSI RAYA
         ===================================================== */

      {
        label: "Biringkassi Raya",
        icon: Factory,

        children: [
          {
            label: "Company Dashboard",
            path: "/group/biringkassi-raya",
            icon: LayoutDashboard,
          },
          {
            label: "Operations",
            path: "/group/biringkassi-raya/operations",
            icon: Activity,
          },
          {
            label: "Fleet",
            path: "/group/biringkassi-raya/fleet",
            icon: Truck,
          },
          {
            label: "Manpower",
            path: "/group/biringkassi-raya/manpower",
            icon: Users,
          },
          {
            label: "Performance",
            path: "/group/biringkassi-raya/performance",
            icon: BarChart3,
          },
        ],
      },

      /* =====================================================
         PT PELAYARAN TONASA LINES
         ===================================================== */

      {
        label: "Tonasa Lines",
        icon: Truck,

        children: [
          {
            label: "Company Dashboard",
            path: "/group/tonasa-lines",
            icon: LayoutDashboard,
          },
          {
            label: "Vessel Monitoring",
            path: "/group/tonasa-lines/vessels",
            icon: MapPinned,
            live: true,
          },
          {
            label: "Voyage Management",
            path: "/group/tonasa-lines/voyages",
            icon: Route,
          },
          {
            label: "Marine Logistics",
            path: "/group/tonasa-lines/logistics",
            icon: Package,
          },
          {
            label: "Fuel & Vessel Cost",
            path: "/group/tonasa-lines/fuel",
            icon: Fuel,
          },
          {
            label: "Performance",
            path: "/group/tonasa-lines/performance",
            icon: BarChart3,
          },
        ],
      },

      /* =====================================================
         PT PELABUHAN BIRINGKASSI INDONESIA
         ===================================================== */

      {
        label: "Pelabuhan Biringkassi Indonesia",
        icon: Warehouse,

        children: [
          {
            label: "Port Dashboard",
            path: "/group/pelabuhan-biringkassi",
            icon: LayoutDashboard,
          },
          {
            label: "Port Operations",
            path: "/group/pelabuhan-biringkassi/operations",
            icon: Activity,
          },
          {
            label: "Vessel Traffic",
            path: "/group/pelabuhan-biringkassi/vessels",
            icon: MapPinned,
            live: true,
          },
          {
            label: "Terminal",
            path: "/group/pelabuhan-biringkassi/terminal",
            icon: Warehouse,
          },
          {
            label: "Cargo",
            path: "/group/pelabuhan-biringkassi/cargo",
            icon: Package,
          },
          {
            label: "Performance",
            path: "/group/pelabuhan-biringkassi/performance",
            icon: BarChart3,
          },
        ],
      },

      /* =====================================================
         PT SEDAYA MULTI MATRA
         ===================================================== */

      {
        label: "Sedaya Multi Matra",
        icon: Building2,

        children: [
          {
            label: "Company Dashboard",
            path: "/group/sedaya-multi-matra",
            icon: LayoutDashboard,
          },
          {
            label: "Operations",
            path: "/group/sedaya-multi-matra/operations",
            icon: Activity,
          },
          {
            label: "Business",
            path: "/group/sedaya-multi-matra/business",
            icon: BarChart3,
          },
          {
            label: "Finance",
            path: "/group/sedaya-multi-matra/finance",
            icon: CircleDollarSign,
          },
          {
            label: "Performance",
            path: "/group/sedaya-multi-matra/performance",
            icon: BarChart3,
          },
        ],
      },

      /* =====================================================
         YAYASAN KESEJAHTERAAN SEMEN TONASA
         ===================================================== */

      {
        label: "Yayasan Kesejahteraan Semen Tonasa",
        icon: Users,

        children: [
          {
            label: "Foundation Dashboard",
            path: "/group/yayasan",
            icon: LayoutDashboard,
          },
          {
            label: "Programs",
            path: "/group/yayasan/programs",
            icon: ClipboardList,
          },
          {
            label: "Education",
            path: "/group/yayasan/education",
            icon: Users,
          },
          {
            label: "Facilities",
            path: "/group/yayasan/facilities",
            icon: Building2,
          },
          {
            label: "Reports",
            path: "/group/yayasan/reports",
            icon: FileBarChart,
          },
        ],
      },

      /* =====================================================
         KOPERASI KARYAWAN SEMEN TONASA
         ===================================================== */

      {
        label: "Koperasi Karyawan",
        icon: Users,

        children: [
          {
            label: "Cooperative Dashboard",
            path: "/group/koperasi",
            icon: LayoutDashboard,
          },
          {
            label: "Members",
            path: "/group/koperasi/members",
            icon: Users,
          },
          {
            label: "Products",
            path: "/group/koperasi/products",
            icon: Package,
          },
          {
            label: "Transactions",
            path: "/group/koperasi/transactions",
            icon: Receipt,
          },
          {
            label: "Reports",
            path: "/group/koperasi/reports",
            icon: FileBarChart,
          },
        ],
      },

      /* =====================================================
         GROUP CONSOLIDATED INTELLIGENCE
         ===================================================== */

      {
        label: "Group Performance",
        path: "/group/performance",
        icon: BarChart3,
      },

      {
        label: "Group Financial Overview",
        path: "/group/finance",
        icon: CircleDollarSign,
      },

      {
        label: "Group Operations",
        path: "/group/operations",
        icon: Activity,
      },

      {
        label: "Group Risk",
        path: "/group/risk",
        icon: AlertTriangle,
      },

      {
        label: "Group AI Intelligence",
        path: "/group/ai",
        icon: BrainCircuit,
      },
    ],
  },

  /* =======================================================
     ADMINISTRATION
     ADMIN / SUPER_ADMIN ONLY
     ======================================================= */

  {
    label: "Administration",
    icon: ShieldCheck,
    adminOnly: true,

    children: [
      /* =====================================================
         USERS
         ===================================================== */

      {
        label: "Users",
        icon: Users,

        children: [
          {
            label: "Users List",
            path: "/users/list",
            icon: Users,
          },
          {
            label: "User Activity",
            path: "/users/activity",
            icon: History,
          },
        ],
      },

      /* =====================================================
         ROLES
         ===================================================== */

      {
        label: "Roles",
        path: "/administration/roles",
        icon: UserCog,
      },

      /* =====================================================
         PERMISSIONS
         ===================================================== */

      {
        label: "Permissions",
        path: "/administration/permissions",
        icon: KeyRound,
      },

      /* =====================================================
         AUDIT LOG
         ===================================================== */

      {
        label: "Audit Log",
        path: "/administration/audit-log",
        icon: ScrollText,
      },

      /* =====================================================
         HELPDESK
         ===================================================== */

      {
        label: "Helpdesk",
        icon: LifeBuoy,

        children: [
          {
            label: "Helpdesk Tickets",
            path: "/helpdesk/tickets",
            icon: ClipboardList,
          },
          {
            label: "Helpdesk Messages",
            path: "/helpdesk/messages",
            icon: MessageSquare,
          },
          {
            label: "Notifications",
            path: "/helpdesk/notifications",
            icon: Bell,
          },
        ],
      },

      /* =====================================================
         MAIL
         ===================================================== */

      {
        label: "Mail",
        icon: Mail,

        children: [
          {
            label: "Inbox",
            path: "/mail/inbox",
            icon: Inbox,
          },
          {
            label: "Compose",
            path: "/mail/compose",
            icon: PenLine,
          },
          {
            label: "Sent",
            path: "/mail/sent",
            icon: Send,
          },
          {
            label: "Drafts",
            path: "/mail/drafts",
            icon: FileEdit,
          },
          {
            label: "Trash",
            path: "/mail/trash",
            icon: Trash2,
          },
        ],
      },

      /* =====================================================
         SETTINGS
         ===================================================== */

      {
        label: "Settings",
        path: "/settings",
        icon: Settings,
      },
    ],
  },

  /* =======================================================
     INTEGRATION & IoT
     ADMIN / SUPER_ADMIN ONLY
     ======================================================= */

  {
    label: "Integration & IoT",
    icon: PlugZap,
    adminOnly: true,

    children: [
      {
        label: "MQTT",
        path: "/integration/mqtt",
        icon: Radio,
        adminOnly: true,
      },
      {
        label: "ABN Tracker",
        path: "/integration/tracker",
        icon: LocateFixed,
        adminOnly: true,
      },
      {
        label: "SCADA",
        path: "/integration/scada",
        icon: Gauge,
        adminOnly: true,
      },
      {
        label: "SAP",
        path: "/integration/sap",
        icon: Database,
        adminOnly: true,
      },
      {
        label: "JTO / Hubdat",
        path: "/integration/hubdat",
        icon: ClipboardList,
        adminOnly: true,
      },
      {
        label: "Payment Gateway",
        path: "/integration/payment-gateway",
        icon: CreditCard,
        adminOnly: true,
      },
    ],
  },
];

/* =========================================================
   ROUTE ACTIVE HELPER
   ========================================================= */

const isPathActive = (pathname: string, path?: string): boolean => {
  if (!path) {
    return false;
  }

  return pathname === path || pathname.startsWith(`${path}/`);
};

/* =========================================================
   MENU ACTIVE HELPER
   RECURSIVE
   ========================================================= */

const isMenuActive = (item: MenuItem, pathname: string): boolean => {
  if (item.path && isPathActive(pathname, item.path)) {
    return true;
  }

  if (item.children?.length) {
    return item.children.some((child) => isMenuActive(child, pathname));
  }

  return false;
};

/* =========================================================
   FILTER ACCESS
   ========================================================= */
const isMenuDisabled = (item: MenuItem, canAccessAdmin: boolean): boolean => {
  return Boolean(item.adminOnly && !canAccessAdmin);
};

/* =========================================================
   SIDEBAR
   ========================================================= */

function Sidebar({ onClose }: SidebarProps) {
  const location = useLocation();

  const user = useSelector((state: RootState) => state.auth.user);

  /* =======================================================
     ROLE ACCESS
     ======================================================= */

  const canAccessAdmin = user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";

  /* =======================================================
     STATE
     ======================================================= */

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const [showSupport, setShowSupport] = useState(false);

  const [showEmailOptions, setShowEmailOptions] = useState(false);

  const [showWhatsappOptions, setShowWhatsappOptions] = useState(false);

  /* =======================================================
     TOGGLE MENU
     ======================================================= */

  const toggleMenu = (key: string) => {
    setOpenMenus((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  /* =======================================================
     EMAIL
     ======================================================= */

  const openEmail = (email: string) => {
    const subject = encodeURIComponent("ABN Fleet Support");

    const body = encodeURIComponent(
      "Halo Tim ABN,\n\n" +
        "Saya membutuhkan bantuan terkait ABN Fleet.\n\n" +
        "Masalah:\n\n" +
        "Vehicle:\n\n" +
        "Device:\n\n" +
        "Lokasi:\n\n" +
        "Waktu kejadian:\n\n" +
        "Terima kasih.",
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;

    setShowEmailOptions(false);
  };

  /* =======================================================
     WHATSAPP
     ======================================================= */

  const openWhatsApp = (phone: string) => {
    const message = encodeURIComponent(
      "Halo Teknisi ABN,\n\n" +
        "Saya membutuhkan bantuan terkait ABN Fleet.\n\n" +
        "Masalah:\n",
    );

    window.open(
      `https://wa.me/${phone}?text=${message}`,
      "_blank",
      "noopener,noreferrer",
    );

    setShowWhatsappOptions(false);
  };

  /* =======================================================
     CLOSE SUPPORT
     ======================================================= */

  const closeSupport = () => {
    setShowSupport(false);
    setShowEmailOptions(false);
    setShowWhatsappOptions(false);
  };

  /* =======================================================
     AUTO OPEN ACTIVE MENUS
     ======================================================= */

  useEffect(() => {
    const activeKeys: string[] = [];

    const collectActiveParents = (
      items: MenuItem[],
      parentKeys: string[] = [],
    ) => {
      for (const item of items) {
        const currentKey = [...parentKeys, item.label].join("/");

        if (item.children?.length && isMenuActive(item, location.pathname)) {
          activeKeys.push(currentKey);

          collectActiveParents(item.children, [...parentKeys, item.label]);
        }
      }
    };

    collectActiveParents(menuItems);

    if (!activeKeys.length) {
      return;
    }

    setOpenMenus((current) => {
      const next = { ...current };

      let changed = false;

      for (const key of activeKeys) {
        if (!next[key]) {
          next[key] = true;
          changed = true;
        }
      }

      return changed ? next : current;
    });
  }, [location.pathname]);

  /* =======================================================
     ESCAPE KEY
     ======================================================= */

  useEffect(() => {
    if (!showSupport) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSupport();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showSupport]);

  /* =======================================================
     BODY SCROLL LOCK
     ======================================================= */

  useEffect(() => {
    if (!showSupport) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showSupport]);

  /* =======================================================
     RECURSIVE MENU RENDERER
     ======================================================= */

  const renderMenuItems = (
    items: MenuItem[],
    level = 0,
    parentKeys: string[] = [],
  ): ReactNode => {
    return items.map((item) => {
      /* ===================================================
       ICON & ACCESS
       =================================================== */

      const Icon = item.icon;

      const disabled = isMenuDisabled(item, canAccessAdmin);

      /* ===================================================
       CHECK CHILDREN
       =================================================== */

      const hasChildren = Boolean(item.children?.length);

      /* ===================================================
       MENU KEY
       =================================================== */

      const menuKey = [...parentKeys, item.label].join("/");

      /* ===================================================
       PARENT MENU
       =================================================== */

      if (hasChildren) {
        const isOpen = Boolean(openMenus[menuKey]);

        const isParentActive = isMenuActive(item, location.pathname);

        const submenuId = `${menuKey
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")}-submenu`;

        /* =================================================
         ROOT LEVEL
         ================================================= */

        if (level === 0) {
          return (
            <div
              key={menuKey}
              className={`sidebar-menu-group ${
                isOpen && !disabled ? "open" : ""
              }`}
            >
              <button
                type="button"
                className={`sidebar-link sidebar-parent-link ${
                  isParentActive ? "active" : ""
                } ${disabled ? "disabled" : ""}`}
                onClick={() => {
                  if (disabled) return;

                  toggleMenu(menuKey);
                }}
                aria-expanded={disabled ? undefined : isOpen}
                aria-controls={disabled ? undefined : submenuId}
                aria-disabled={disabled}
              >
                <span className="sidebar-link-icon">
                  <Icon size={18} strokeWidth={2} />
                </span>

                <span className="sidebar-link-label">{item.label}</span>

                {disabled ? (
                  <LockKeyhole
                    size={14}
                    strokeWidth={2}
                    className="sidebar-menu-lock"
                    aria-hidden="true"
                  />
                ) : (
                  <span className={`sidebar-chevron ${isOpen ? "open" : ""}`}>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </span>
                )}
              </button>

              {!disabled && (
                <div
                  id={submenuId}
                  className={`sidebar-submenu ${isOpen ? "open" : ""}`}
                >
                  {renderMenuItems(item.children!, level + 1, [
                    ...parentKeys,
                    item.label,
                  ])}
                </div>
              )}
            </div>
          );
        }

        /* =================================================
         NESTED PARENT
         ================================================= */

        return (
          <div
            key={menuKey}
            className={`sidebar-nested-group ${
              isOpen && !disabled ? "open" : ""
            }`}
          >
            <button
              type="button"
              className={`sidebar-submenu-link sidebar-nested-parent ${
                isParentActive ? "active" : ""
              } ${disabled ? "disabled" : ""}`}
              onClick={() => {
                if (disabled) return;

                toggleMenu(menuKey);
              }}
              aria-expanded={disabled ? undefined : isOpen}
              aria-controls={disabled ? undefined : submenuId}
              aria-disabled={disabled}
            >
              <span className="sidebar-submenu-line" />

              <span className="sidebar-submenu-icon">
                <Icon size={16} strokeWidth={2} />
              </span>

              <span className="sidebar-submenu-label">{item.label}</span>

              {disabled ? (
                <LockKeyhole
                  size={13}
                  strokeWidth={2}
                  className="sidebar-menu-lock"
                  aria-hidden="true"
                />
              ) : (
                <span className={`sidebar-chevron ${isOpen ? "open" : ""}`}>
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </span>
              )}
            </button>

            {!disabled && (
              <div
                id={submenuId}
                className={`sidebar-nested-submenu ${isOpen ? "open" : ""}`}
              >
                {renderMenuItems(item.children!, level + 1, [
                  ...parentKeys,
                  item.label,
                ])}
              </div>
            )}
          </div>
        );
      }

      /* ===================================================
       NORMAL LINK
       =================================================== */

      if (!item.path) {
        return null;
      }

      const isActive = isPathActive(location.pathname, item.path);

      /* ===================================================
       ROOT LINK
       =================================================== */

      if (level === 0) {
        return (
          <NavLink
            key={item.path}
            to={disabled ? "#" : item.path}
            className={`sidebar-link${isActive ? " active" : ""}${
              item.live ? " tracking-link" : ""
            }${disabled ? " disabled" : ""}`}
            onClick={(event) => {
              if (disabled) {
                event.preventDefault();
                event.stopPropagation();
                return;
              }

              onClose?.();
            }}
            aria-disabled={disabled}
          >
            <span className="sidebar-link-icon">
              <Icon size={18} strokeWidth={2} />
            </span>

            <span className="sidebar-link-label">{item.label}</span>

            {item.live && !disabled && (
              <span className="sidebar-live">LIVE</span>
            )}

            {disabled && (
              <LockKeyhole
                size={14}
                strokeWidth={2}
                className="sidebar-menu-lock"
                aria-hidden="true"
              />
            )}
          </NavLink>
        );
      }

      /* ===================================================
       NESTED LINK
       =================================================== */

      return (
        <NavLink
          key={item.path}
          to={disabled ? "#" : item.path}
          className={`sidebar-submenu-link${
            isActive ? " active" : ""
          }${disabled ? " disabled" : ""}`}
          onClick={(event) => {
            if (disabled) {
              event.preventDefault();
              event.stopPropagation();
              return;
            }

            onClose?.();
          }}
          aria-disabled={disabled}
        >
          <span className="sidebar-submenu-line" />

          <span className="sidebar-submenu-icon">
            <Icon size={16} strokeWidth={2} />
          </span>

          <span className="sidebar-submenu-label">{item.label}</span>

          {disabled && (
            <LockKeyhole
              size={13}
              strokeWidth={2}
              className="sidebar-menu-lock"
              aria-hidden="true"
            />
          )}
        </NavLink>
      );
    });
  };

  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <>
      <aside className="sidebar">
        {/* ===================================================
            BRAND
            =================================================== */}

        <div className="sidebar-brand">
          <div className="brand-mark">
            <img src={logo} alt="ABN Tracker Logo" />
          </div>

          <div className="brand-text">
            <strong>PT. SEMEN TONASA</strong>

            <span>ABN INDUSTRIAL INTELLIGENCE</span>
          </div>

          {onClose && (
            <button
              type="button"
              className="sidebar-close"
              onClick={onClose}
              aria-label="Close navigation"
              title="Close navigation"
            >
              <X size={19} />
            </button>
          )}
        </div>

        {/* ===================================================
            LIVE SYSTEM STATUS
            =================================================== */}

        {/* <div className="sidebar-status-card">
          <div className="sidebar-status-icon">
            <Truck size={17} />
          </div>

          <div className="sidebar-status-info">
            <strong>FLEET MONITORING</strong>

            <span>
              <i />
              System Online
            </span>
          </div>
        </div> */}

        {/* ===================================================
            MAIN MENU
            =================================================== */}

        <div className="sidebar-section">
          <span className="sidebar-section-title">MAIN MENU</span>

          <nav className="sidebar-nav" aria-label="Main navigation">
            {renderMenuItems(menuItems)}
          </nav>
        </div>

        {/* ===================================================
            BOTTOM
            =================================================== */}

        <div className="sidebar-bottom">
          {/* =================================================
              ABN SUPPORT
              ================================================= */}

          <button
            type="button"
            className="sidebar-help"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();

              setShowSupport(true);
              setShowEmailOptions(false);
              setShowWhatsappOptions(false);
            }}
            aria-haspopup="dialog"
            aria-expanded={showSupport}
          >
            <CircleHelp size={18} strokeWidth={2} />

            <div>
              <strong>ABN Support</strong>

              <span>System assistance</span>
            </div>
          </button>

          {/* =================================================
              SYSTEM VERSION
              ================================================= */}

          <NavLink
            to="/about"
            className="sidebar-system"
            onClick={onClose}
            aria-label="About ABN Fleet System"
          >
            <div className="sidebar-system-top">
              <CheckCircle2 size={14} />

              <strong>ABN EMS SYSTEM</strong>
            </div>

            <div className="sidebar-system-bottom">
              <span>Version 1.0.0</span>

              <span>ONLINE</span>
            </div>
          </NavLink>
        </div>
      </aside>

      {/* =====================================================
          ABN SUPPORT MODAL
          ===================================================== */}

      {showSupport &&
        createPortal(
          <div
            className="support-modal-overlay"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeSupport();
              }
            }}
          >
            <div
              className="support-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="support-modal-title"
            >
              {/* =============================================
                  HEADER
                  ============================================= */}

              <div className="support-modal-header">
                <div className="support-modal-title">
                  <div className="support-modal-icon">
                    <CircleHelp size={21} strokeWidth={2} />
                  </div>

                  <div>
                    <h3 id="support-modal-title">ABN Support</h3>

                    <span>System assistance</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="support-modal-close"
                  onClick={closeSupport}
                  aria-label="Close support"
                  title="Close"
                >
                  <X size={19} />
                </button>
              </div>

              {/* =============================================
                  BODY
                  ============================================= */}

              <div className="support-modal-body">
                <p className="support-modal-description">
                  Hubungi teknisi ABN apabila mengalami masalah pada sistem, GPS
                  tracker, modem, kendaraan, atau monitoring fleet.
                </p>

                <div className="support-options">
                  {/* =========================================
                      EMAIL
                      ========================================= */}

                  <button
                    type="button"
                    className="support-option support-option-email"
                    onClick={() => {
                      setShowEmailOptions((current) => !current);

                      setShowWhatsappOptions(false);
                    }}
                  >
                    <div className="support-option-icon">
                      <Mail size={21} strokeWidth={2} />
                    </div>

                    <div className="support-option-content">
                      <strong>Email Teknisi ABN</strong>

                      <span>Kirim laporan masalah melalui email</span>
                    </div>
                  </button>

                  {/* =========================================
                      WHATSAPP
                      ========================================= */}

                  <button
                    type="button"
                    className="support-option support-option-whatsapp"
                    onClick={() => {
                      setShowWhatsappOptions((current) => !current);

                      setShowEmailOptions(false);
                    }}
                  >
                    <div className="support-option-icon">
                      <MessageCircle size={21} strokeWidth={2} />
                    </div>

                    <div className="support-option-content">
                      <strong>WhatsApp Teknisi ABN</strong>

                      <span>
                        Pilih teknisi untuk mendapatkan bantuan langsung
                      </span>
                    </div>
                  </button>
                </div>

                {/* =========================================
                    EMAIL OPTIONS
                    ========================================= */}

                {showEmailOptions && (
                  <div className="email-options">
                    <div className="email-options-title">
                      <Mail size={15} />

                      <span>Pilih Email Support</span>
                    </div>

                    <button
                      type="button"
                      className="email-contact"
                      onClick={() => openEmail("support@abn.web.id")}
                    >
                      <div className="email-contact-icon">
                        <Mail size={18} />
                      </div>

                      <div className="email-contact-content">
                        <strong>ABN Support</strong>

                        <span>support@abn.web.id</span>
                      </div>
                    </button>
                  </div>
                )}

                {/* =========================================
                    WHATSAPP OPTIONS
                    ========================================= */}

                {showWhatsappOptions && (
                  <div className="whatsapp-options">
                    <div className="whatsapp-options-title">
                      <MessageCircle size={15} />

                      <span>Pilih WhatsApp Teknisi</span>
                    </div>
                    <button
                      type="button"
                      className="whatsapp-contact"
                      onClick={() => openWhatsApp("62811447622")}
                    >
                      <div className="whatsapp-contact-icon">
                        <MessageCircle size={18} />
                      </div>

                      <div className="whatsapp-contact-content">
                        <strong>Teknisi ABN 2</strong>

                        <span>+62 811-4476-22</span>
                      </div>
                    </button>
                  </div>
                )}

                {/* =========================================
                    SUPPORT NOTE
                    ========================================= */}

                <div className="support-modal-note">
                  <CheckCircle2 size={15} />

                  <span>
                    Tim support ABN siap membantu masalah operasional dan
                    perangkat tracker.
                  </span>
                </div>
              </div>

              {/* =============================================
                  FOOTER
                  ============================================= */}

              <div className="support-modal-footer">
                <button
                  type="button"
                  className="support-modal-cancel"
                  onClick={closeSupport}
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

export default Sidebar;
