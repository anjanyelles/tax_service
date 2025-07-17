import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";

// New icons for added menu items
import People from "@material-ui/icons/People";        // for Leads, Clients
import Build from "@material-ui/icons/Build";          // Services
import Payment from "@material-ui/icons/Payment";      // Billing
import Event from "@material-ui/icons/Event";          // Calendar
import Description from "@material-ui/icons/Description"; // Documents
import BarChart from "@material-ui/icons/BarChart";    // Reports
import Settings from "@material-ui/icons/Settings";    // Settings

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";

// New components you need to create for these pages
import LeadsPage from "views/Leads/Leads.js";
import ClientsPage from "views/Clients/Clients.js";
import ServicesPage from "views/Services/Services.js";
import BillingPage from "views/Billing/Billing.js";
import CalendarPage from "views/Calendar/Calendar.js";
import DocumentsPage from "views/Documents/Documents.js";
import ReportsPage from "views/Reports/Reports.js";
import SettingsPage from "views/Settings/Settings.js";
import Communication from "views/Communication/Communication";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  // {
  //   path: "/user",
  //   name: "User Profile",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: Person,
  //   component: UserProfile,
  //   layout: "/admin",
  // },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   rtlName: "قائمة الجدول",
  //   icon: "content_paste",
  //   component: TableList,
  //   layout: "/admin",
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   rtlName: "طباعة",
  //   icon: LibraryBooks,
  //   component: Typography,
  //   layout: "/admin",
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   rtlName: "الرموز",
  //   icon: BubbleChart,
  //   component: Icons,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   rtlName: "خرائط",
  //   icon: LocationOn,
  //   component: Maps,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   rtlName: "إخطارات",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "/admin",
  // },
  // {
  //   path: "/rtl-page",
  //   name: "RTL Support",
  //   rtlName: "پشتیبانی از راست به چپ",
  //   icon: Language,
  //   component: RTLPage,
  //   layout: "/rtl",
  // },
  // {
  //   path: "/upgrade-to-pro",
  //   name: "Upgrade To PRO",
  //   rtlName: "التطور للاحترافية",
  //   icon: Unarchive,
  //   component: UpgradeToPro,
  //   layout: "/admin",
  // },

  // --- New menu items added below ---
  {
    path: "/leads",
    name: "Lead Management",
    icon: People,
    component: LeadsPage,
    layout: "/admin",
  },
  {
    path: "/clients",
    name: "Client Information",
    icon: People,
    component: ClientsPage,
    layout: "/admin",
  },
  {
    path: "/services",
    name: "Services & Compliance",
    icon: Build,
    component: ServicesPage,
    layout: "/admin",
  },
  {
    path: "/billing",
    name: "Billing & Payment",
    icon: Payment,
    component: BillingPage,
    layout: "/admin",
  },
  {
    path: "/communication",
    name: "Communication & Follow",
    icon: Event,
    component: Communication,
    layout: "/admin",
  },
  {
    path: "/documents",
    name: "Documents & Files",
    icon: Description,
    component: DocumentsPage,
    layout: "/admin",
  },
  {
    path: "/reports",
    name: "Client Portal Access Suggestion",
    icon: BarChart,
    component: ReportsPage,
    layout: "/admin",
  },

];

export default dashboardRoutes;
