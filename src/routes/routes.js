
import Index from "views/Index.js";
import Profile from "views/admin/Profile.js";
import Notes from "views/admin/Notes.js";
import Tables from "views/admin/Tables.js";
import Messaging from "views/admin/Messaging.js";
import DataForm from "views/admin/DataForm.js";

import Executive from "views/executive/Executive";
import Cabinet from "views/cabinet/Cabinet";
import ExcNotes from "views/executive/ExcNotes";
import CabinetTable from "views/cabinet/CabinetTable";
import MinTable from "views/ministry/MinTable";
import Ministry from "views/ministry/Ministry"

const adminRoutes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  
  {
    path: "/govnrnotes",
    name: "Governor's Notes",
    icon: "ni ni-note-03",
    component: <Notes />,
    layout: "/admin",
  },
  {
    path: "/remarks",
    name: "Remarks",
    icon: "ni ni-chat-round",
    component: <Messaging />,
    layout: "/admin",
  },
  // {
  //   path: "/adddata",
  //   name: "Add Data",
  //   icon: "ni ni-fat-add",
  //   component: <DataForm />,
  //   layout: "/admin",
  // },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Tables />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
];

// Executive-specific routes
const executiveRoutes = [
  {
    path: "/",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Executive />,
    layout: "/executive",
  },
  {
    path: "/remarks",
    name: "Remarks",
    icon: "ni ni-chat-round",
    component: <Messaging />,
    layout: "/executive",
  },
  {
    path: "/notes",
    name: "Governor's Notes",
    icon: "ni ni-note-03",
    component: <ExcNotes />,
    layout: "/executive",
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Tables />,
    layout: "/executive",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/executive",
  },
];

// Cabinet-specific routes
const cabinetRoutes = [
  {
    path: "/",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Cabinet />,
    layout: "/cabinet",
  },
  {
    path: "/remarks",
    name: "Remarks",
    icon: "ni ni-chat-round",
    component: <Messaging />,
    layout: "/cabinet",
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: <CabinetTable />,
    layout: "/cabinet",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/cabinet",
  },
];

const ministryRoutes = [ 
  {
    path: "/",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Ministry />,
    layout: "/ministry",
  },
  {
    path: "/remarks",
    name: "Remarks",
    icon: "ni ni-chat-round",
    component: <Messaging />,
    layout: "/ministry",
  },
  {
    path: "/adddata",
    name: "Add Data",
    icon: "ni ni-fat-add",
    component: <DataForm />,
    layout: "/ministry",
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: <MinTable />,
    layout: "/ministry",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/ministry",
  },
];

export   { adminRoutes, executiveRoutes, cabinetRoutes , ministryRoutes};
