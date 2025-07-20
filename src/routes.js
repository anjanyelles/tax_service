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
import Addemployees from "components/Addemployees/Addemployees";
import GetLeads from "components/Leads/GetLeads";
import Bulkupload from "components/Bulkupload/Bulkupload";
import ManagerEmployeePage from "components/Addemployees/ManagerEmployeePage";
import GetLeadsManagerView from "components/Leads/GetLeadsManagerView";
import EmployeeProfile from "views/Employess/EmployeeProfile";
import GetLeadsEmployeeView from "views/Employess/GetLeadsEmployeeView";
import ChangePassword from "views/Authentication/ChangePassword";


export function getRoutesByRole(userRole) {
  switch (userRole) {
    case "admin":
      return [
        {
          path: "/dashboard",
          name: "Dashboard",
          icon: Dashboard,
          component: DashboardPage,
          layout: "/admin",
        },
        // {
        //   path: "/leads",
        //   name: "Lead Management",
        //   icon: People,
        //   component: LeadsPage,
        //   layout: "/admin",
        // },
        // {
        //   path: "/clients",
        //   name: "Client Information",
        //   icon: People,
        //   component: ClientsPage,
        //   layout: "/admin",
        // },
        {
          path: "/addemployees",
          name: "Add Employees",
          icon: Event,
          component: Addemployees,
          layout: "/admin",
        },
        {
          path: "/bulkupload",
          name: "Bulk Upload",
          icon: Event,
          component: Bulkupload,
          layout: "/admin",
        },
        {
          path: "/GetLeads",
          name: "All Leads",
          icon: Event,
          component: GetLeads,
          layout: "/admin",
        },
        {
          path: "/change-password",
          name: "Change Password",
          icon: Description,
          component: ChangePassword,
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

    case "manager":
      return [
        {
          path: "/dashboard",
          name: "Dashboard",
          icon: Dashboard,
          component: DashboardPage,
          layout: "/admin",
        },

        {
          path: "/team-management",
          name: "Team Management",
          icon: People,
          component: ManagerEmployeePage,
          layout: "/admin",
        },
        {
          path: "/mnager-leads",
          name: "Manager Lead Management",
          icon: People,
          component: GetLeadsManagerView,
          layout: "/admin",
        },
        // {
        //   path: "/bulkupload",
        //   name: "Bulk Upload",
        //   icon: Event,
        //   component: Bulkupload,
        //   layout: "/admin",
        // },
        {
          path: "/documents",
          name: "Documents & Files",
          icon: Description,
          component: DocumentsPage,
          layout: "/admin",
        },
      ];

    case "employee":
    default:
      return [
        {
          path: "/dashboard",
          name: "Dashboard",
          icon: Dashboard,
          component: DashboardPage,
          layout: "/admin",
        },
        {
          path: "/employee-profile",
          name: "Employee Profile",
          icon: Person,
          component: EmployeeProfile,
          layout: "/admin",
        },
        {
          path: "/employee-leads",
          name: "Employee Leads",
          icon: People,
          component: GetLeadsEmployeeView,
          layout: "/admin",
        }
      ];
  }
}