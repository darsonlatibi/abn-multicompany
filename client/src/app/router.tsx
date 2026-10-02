import { Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import ProtectedRoute from "../components/auth/ProtectedRoute";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Register from "../pages/Login/Register";
import ForgotPassword from "../pages/Login/ForgotPassword";
import ResetPassword from "../pages/Login/ResetPassword";
import Tracking from "../pages/Tracking/Tracking";
//import GeofencePage from "../pages/Geofence/Geofence";
import Drivers from "../pages/Drivers/Drivers";
import Fleet from "../pages/Fleet/Fleet";
import Alerts from "../pages/Alerts/Alerts";
import Reports from "../pages/Reports/Reports";
//import History from "../pages/History/History";
import Trips from "../pages/Trips/Trips";
import Settings from "../pages/Settings/Settings";
import HelpdeskTicket from "../pages/helpdesk/HelpdeskTicket";
import HelpdeskMessage from "../pages/helpdesk/HelpdeskMessage";
import Notification from "../pages/helpdesk/Notification";
import Users from "../pages/users/Users";
import UsersActivity from "../pages/users/UsersActivity";
import Contact from "../pages/contact/Contact";
import Devices from "../pages/device/Devices";
import SAP from "../pages/integration/SAP";
import About from "../pages/about/About";
import SendEmail from "../pages/contact/SendEmail";
import Inbox from "../pages/mail/Inbox";
import Compose from "../pages/mail/Compose";
import Sent from "../pages/mail/Sent";
import Drafts from "../pages/mail/Drafts";
import Trash from "../pages/mail/Trash";
import Perhubungan from "../pages/perhubungan/Perhubungan";
import Employees from "../pages/hr/Employees";
import Attendance from "../pages/hr/Attendance";
import Organization from "../pages/hr/Organization";
import Payroll from "../pages/hr/Payroll";
import FleetMaintenance from "../pages/Fleet/FleetMaintenance";
import Fuel from "../pages/Fleet/Fuel";
import Products from "../pages/Inventory/Products";
import Stock from "../pages/Inventory/Stock";
import Warehouse from "../pages/Inventory/Warehouse";
import StockMovement from "../pages/Inventory/StockMovement";
import Vendors from "../pages/procurement/Vendors";
import PurchaseRequest from "../pages/procurement/PurchaseRequest";
import PurchaseOrder from "../pages/procurement/PurchaseOrder";
import Receiving from "../pages/procurement/Receiving";
import Invoice from "../pages/finance/Invoice";
import Payment from "../pages/finance/Payment";
import Expenses from "../pages/finance/Expenses";
import Cashflow from "../pages/finance/Cashflow";
import Customers from "../pages/crm/Customers";
import Leads from "../pages/crm/Leads";
import CRMActivities from "../pages/crm/CRMActivities";
import Approvals from "../pages/approval/Approvals";
import MQTT from "../pages/integration/MQTT";
import TrackerIntegration from "../pages/integration/TrackerIntegration";
import SCADA from "../pages/integration/SCADA";
import PaymentGateway from "../pages/integration/PaymentGateway";
import Roles from "../pages/administration/Roles";
import Permissions from "../pages/administration/Permissions";
import AuditLog from "../pages/administration/AuditLog";
import AIOperations from "../pages/ai/AIOperations";
import AIFleet from "../pages/ai/AIFleet";
import AIScada from "../pages/ai/AIScada";
import AIMaintenance from "../pages/ai/AIMaintenance";
import AISupplyChain from "../pages/ai/AISupplyChain";
import AIFinance from "../pages/ai/AIFinance";
import AIWorkforce from "../pages/ai/AIWorkforce";
import AIReports from "../pages/ai/AIReports";
import AICopilot from "../pages/ai/AICopilot";
import AICommandCenter from "../pages/ai/AICommandCenter";
import Production from "../pages/production/Production";
import Maintenance from "../pages/maintenance/Maintenance";
import BRDashboard from "../pages/Subsidiaries/BR/BRDashboard";
import TLDashboard from "../pages/Subsidiaries/TL/TLDashboard";
import PBIDashboard from "../pages/Subsidiaries/PBI/PBIDashboard";
import SMMDashboard from "../pages/Subsidiaries/SMM/SMMDashboard";
import KOPKARDashboard from "../pages/Subsidiaries/KOPKAR/KOPKARDashboard";
import YKSTDashboard from "../pages/Subsidiaries/YKST/YKSTDashboard";
import GroupDashboard from "../pages/Subsidiaries/GroupDashboard";
import KilnDashboard from "../pages/production/kiln/KilnDashboard";
import RawMillDashboard from "../pages/production/rawmill/RawMillDashboard";
import CrusherDashboard from "../pages/production/crusher/CrusherDashboard";
import FinishMillDashboard from "../pages/production/finishmill/FinishMillDashboard";
import T4FinishMillDashboard from "../pages/production/tonasa-4/finishmill/T4FinishMillDashboard";
import R4RawMillDashboard from "../pages/production/tonasa-4/rawmill/R4RawMillDashboard";
import T4KilnDashboard from "../pages/production/tonasa-4/kiln/T4KilnDashboard";
import T4CrusherDashboard from "../pages/production/tonasa-4/crusher/T4CrusherDashboard";
import T5PackerDashboard from "../pages/production/tonasa-5/packer/T5PackerDashboard";
import SalesDashboard from "../pages/SalesAndDistribution/SalesDashboard";
import Shipping from "../pages/SalesAndDistribution/Shipping";

function AppRouter() {
  return (
    <Routes>
      {/* =====================================================
          AUTH
          PUBLIC ROUTES
          ===================================================== */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/contact/send-email" element={<SendEmail />} />
      {/* =====================================================
          APPLICATION
          PROTECTED ROUTES
          ===================================================== */}
      {/* <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/history" element={<History />} />
          <Route path="/geofence" element={<GeofencePage />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/hubdat" element={<Perhubungan />} />
          <Route path="/sap" element={<SAP />} />
          <Route path="/device" element={<Devices />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/users/list" element={<Users />} />
          <Route path="/users/activity" element={<UsersActivity />} />
          <Route path="/helpdesk/tickets" element={<HelpdeskTicket />} />
          <Route path="/helpdesk/messages" element={<HelpdeskMessage />} />
          <Route path="/helpdesk/notifications" element={<Notification />} />
          <Route path="/sap" element={<SAP />} />
          <Route path="/about" element={<About />} />
          <Route path="/mail/inbox" element={<Inbox />} />
          <Route path="/mail/compose" element={<Compose />} />
          <Route path="/mail/sent" element={<Sent />} />
          <Route path="/mail/drafts" element={<Drafts />} />
          <Route path="/mail/trash" element={<Trash />} />
        </Route>
      </Route> */}

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          {/* =====================================================
        EXECUTIVE DASHBOARD
        ===================================================== */}
          <Route path="/dashboard" element={<Dashboard />} />
          {/* =====================================================
        HUMAN RESOURCES
        ===================================================== */}
          <Route path="/hr/employees" element={<Employees />} />
          <Route path="/hr/attendance" element={<Attendance />} />
          <Route path="/hr/organization" element={<Organization />} />
          <Route path="/hr/payroll" element={<Payroll />} />
          {/* =====================================================
        FLEET MANAGEMENT
        ===================================================== */}
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/fleet/maintenance" element={<FleetMaintenance />} />
          <Route path="/fleet/fuel" element={<Fuel />} />
          <Route path="/device" element={<Devices />} />
          {/* =====================================================
        INVENTORY & WAREHOUSE
        ===================================================== */}
          <Route path="/inventory/products" element={<Products />} />
          <Route path="/inventory/stock" element={<Stock />} />
          <Route path="/inventory/warehouse" element={<Warehouse />} />
          <Route path="/inventory/movement" element={<StockMovement />} />
          {/* =====================================================
        PROCUREMENT
        ===================================================== */}
          <Route path="/procurement/vendors" element={<Vendors />} />
          <Route
            path="/procurement/purchase-request"
            element={<PurchaseRequest />}
          />
          <Route
            path="/procurement/purchase-order"
            element={<PurchaseOrder />}
          />
          <Route path="/procurement/receiving" element={<Receiving />} />
          {/* =====================================================
        FINANCE
        ===================================================== */}
          <Route path="/finance/invoice" element={<Invoice />} />
          <Route path="/finance/payment" element={<Payment />} />
          <Route path="/finance/expenses" element={<Expenses />} />
          <Route path="/finance/cashflow" element={<Cashflow />} />
          {/* =====================================================
        CRM
        ===================================================== */}
          <Route path="/crm/customers" element={<Customers />} />
          <Route path="/crm/leads" element={<Leads />} />
          <Route path="/crm/activities" element={<CRMActivities />} />
          {/* =====================================================
        REPORTS & ANALYTICS
        ===================================================== */}
          <Route path="/reports" element={<Reports />} />
          {/* =====================================================
        ALERTS & APPROVAL
        ===================================================== */}
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/approvals" element={<Approvals />} />
          {/* =====================================================
        ADMINISTRATION
        ===================================================== */}
          <Route path="/users/list" element={<Users />} />
          <Route path="/users/activity" element={<UsersActivity />} />
          <Route path="/administration/roles" element={<Roles />} />
          <Route path="/administration/permissions" element={<Permissions />} />
          <Route path="/administration/audit-log" element={<AuditLog />} />
          {/* =====================================================
        HELPDESK
        ===================================================== */}
          <Route path="/helpdesk/tickets" element={<HelpdeskTicket />} />
          <Route path="/helpdesk/messages" element={<HelpdeskMessage />} />
          <Route path="/helpdesk/notifications" element={<Notification />} />
          {/* =====================================================
        MAIL
        ===================================================== */}
          <Route path="/mail/inbox" element={<Inbox />} />
          <Route path="/mail/compose" element={<Compose />} />
          <Route path="/mail/sent" element={<Sent />} />
          <Route path="/mail/drafts" element={<Drafts />} />
          <Route path="/mail/trash" element={<Trash />} />
          {/* =====================================================
        SETTINGS
        ===================================================== */}
          <Route path="/settings" element={<Settings />} />
          {/* =====================================================
        INTEGRATION & IoT
        ===================================================== */}
          <Route path="/integration/mqtt" element={<MQTT />} />
          <Route path="/integration/tracker" element={<TrackerIntegration />} />
          <Route path="/integration/scada" element={<SCADA />} />
          <Route path="/integration/sap" element={<SAP />} />
          <Route path="/integration/hubdat" element={<Perhubungan />} />
          <Route
            path="/integration/payment-gateway"
            element={<PaymentGateway />}
          />
          {/* =====================================================
        ABOUT
        ===================================================== */}
          <Route path="/about" element={<About />} />
          {/* =====================================================
        PRODUCTION
        ===================================================== */}
          {/* =====================================================
        Tonasa 4
        ===================================================== */}
          <Route
            path="/production/tonasa-4/crusher"
            element={<T4CrusherDashboard />}
          />
          <Route
            path="/production/tonasa-4/rawmill"
            element={<R4RawMillDashboard />}
          />
          <Route
            path="/production/tonasa-4/kiln"
            element={<T4KilnDashboard />}
          />
          <Route
            path="/production/tonasa-4/finish-mill"
            element={<T4FinishMillDashboard />}
          />

          {/* =====================================================
        Sales & Distribution
        ===================================================== */}
          <Route path="/sales" element={<SalesDashboard />} />
          <Route path="/sales/shipping" element={<Shipping />} />
          {/* =====================================================
        Tonasa 5
        ===================================================== */}
          <Route
            path="/production/tonasa-5/packer"
            element={<T5PackerDashboard />}
          />
          <Route path="/production" element={<Production />} />
          <Route path="/production/crusher" element={<CrusherDashboard />} />
          <Route path="/production/rawmill" element={<RawMillDashboard />} />
          <Route path="/production/kiln" element={<KilnDashboard />} />
          <Route
            path="/production/cement-mill"
            element={<FinishMillDashboard />}
          />
          {/* =====================================================
        PRODUCTION
        ===================================================== */}
          <Route path="/maintenance" element={<Maintenance />} />
          {/* =====================================================
        Group
        ===================================================== */}
          <Route path="/group" element={<GroupDashboard />} />
          {/* =====================================================
        Biringkassi Raya
        ===================================================== */}
          <Route path="/group/biringkassi-raya" element={<BRDashboard />} />
          {/* =====================================================
        Tonasa Line
        ===================================================== */}
          <Route path="/group/tonasa-lines" element={<TLDashboard />} />
          {/* =====================================================
        Pelabuhan Biringkassi Indonesia
        ===================================================== */}
          <Route
            path="/group/pelabuhan-biringkassi"
            element={<PBIDashboard />}
          />
          {/* =====================================================
        Sedaya Multi Matra
        ===================================================== */}
          <Route path="/group/sedaya-multi-matra" element={<SMMDashboard />} />
          {/* =====================================================
        Yayasan Kesejahteraan Semen Tonasa
        ===================================================== */}
          <Route path="/group/yayasan" element={<YKSTDashboard />} />
          {/* =====================================================
        Koperasi Karyawan
        ===================================================== */}
          <Route path="/group/koperasi" element={<KOPKARDashboard />} />
          {/* =====================================================
        AI
        ===================================================== */}
          <Route path="/ai" element={<AICommandCenter />} />
          <Route path="/ai/operations" element={<AIOperations />} />
          <Route path="/ai/fleet" element={<AIFleet />} />
          <Route path="/ai/scada" element={<AIScada />} />
          <Route path="/ai/maintenance" element={<AIMaintenance />} />
          <Route path="/ai/supply-chain" element={<AISupplyChain />} />
          <Route path="/ai/finance" element={<AIFinance />} />
          <Route path="/ai/workforce" element={<AIWorkforce />} />
          <Route path="/ai/reports" element={<AIReports />} />
          <Route path="/ai/copilot" element={<AICopilot />} />
        </Route>
      </Route>

      {/* =====================================================
          DEFAULT
          ===================================================== */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      {/* =====================================================
          404
          ===================================================== */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default AppRouter;
