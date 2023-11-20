
import Index from "views/Index.js";
import Profile from "views/admin/Profile.js";
import Notes from "views/admin/Notes.js";
import Tables from "views/admin/Tables.js";
import Messaging from "views/admin/Messaging.js";
import DataForm from "views/admin/DataForm.js";

import Executive from "views/executive/Executive";
import Cabinet from "views/cabinet/Cabinet";

const adminRoutes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/adddata",
    name: "Add Data",
    icon: "ni ni-tv-2 text-primary",
    component: <DataForm />,
    layout: "/admin",
  },
  {
    path: "/govnrnotes",
    name: "Governor's Notes",
    icon: "ni ni-tv-2 text-primary",
    component: <Notes />,
    layout: "/admin",
  },
  {
    path: "/Messaging",
    name: "Messages",
    icon: "ni ni-planet text-blue",
    component: <Messaging />,
    layout: "/admin",
  },
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
    path: "/executive",
    name: "Executive",
    icon: "ni ni-tv-2 text-primary",
    component: <Executive />,
    layout: "/executive",
  },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: <Profile />,
  //   layout: "/executive",
  // },
  // {
  //   path: "/adddata",
  //   name: "Add Data",
  //   icon: "ni ni-tv-2 text-primary",
  //   component: <DataForm />,
  //   layout: "/executive",
  // },
];

// Cabinet-specific routes
const cabinetRoutes = [
  {
    path: "/cabinet",
    name: "Cabinet",
    icon: "ni ni-tv-2 text-primary",
    component: <Cabinet />,
    layout: "/cabinet",
  },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: <Profile />,
  //   layout: "/cabinet",
  // },
  // {
  //   path: "/adddata",
  //   name: "Add Data",
  //   icon: "ni ni-tv-2 text-primary",
  //   component: <DataForm />,
  //   layout: "/cabinet",
  // },
];
export   { adminRoutes, executiveRoutes, cabinetRoutes };
