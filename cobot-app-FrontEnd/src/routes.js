import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import Visualisation from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import Connect from "views/admin/connexionRobot/Connect"
import RTLDefault from "views/rtl/default";
import { BiRobot } from 'react-icons/bi';

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
  MdShowChart,
  MdSettings,
  MdDataUsage,
} from "react-icons/md";

const routes = [
  {
    name: "Tableau de Borad",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Connexion aux Robots",
    layout: "/admin",
    path: "cnxRobots",
    icon:  <MdDataUsage className="h-6 w-6" />,
    component: <Connect />,
  },
  {
    name: "Visualisation",
    layout: "/admin",
    path: "visualisation",
    icon: <MdShowChart className="h-6 w-6" />,
    component: <Visualisation />,
    secondary: true,
  },
  {
    name: "Indicateur de Performance",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "indicateurPer",
    component: <DataTables />,
  },
  {
    name: "Configuration",
    layout: "/admin",
    path: "configuration",
    icon: <MdSettings className="h-6 w-6" />,
    component: <Profile />,
  },

  {
    name: "Déconnexion",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },

  // {
  //   name: "RTL Admin",
  //   layout: "/rtl",
  //   path: "rtl",
  //   icon: <MdHome className="h-6 w-6" />,
  //   component: <RTLDefault />,
  // },
];
export default routes;
