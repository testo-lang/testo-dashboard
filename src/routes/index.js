import async from "../components/Async";

import {
  Activity
} from "react-feather";

// Dashboards
const Default = async(() => import("../pages/dashboards/Default"));

const dashboardRoutes = {
  path: "/dashboard",
  name: "JinnServer",
  icon: Activity,
  containsHome: true,
  children: [
    {
      path: "/dashboard/default",
      name: "Develop",
      component: Default
    }
  ]
};

// Dashboard specific routes
export const dashboard = [
  dashboardRoutes,
];

// All routes
export default [
  dashboardRoutes,
];
