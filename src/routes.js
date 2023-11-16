
import Index from "views/Index.js";
import Profile from "views/admin/Profile.js";
import Register from "views/admin/Register.js";
import Login from "views/admin/Login.js";
import Notes from "views/admin/Notes.js";
import Tables from "views/admin/Tables.js";
import Departments from "views/admin/Departments.js";
import DataForm from "views/admin/DataForm.js";
var routes = [
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
    path: "/departments",
    name: "Departments",
    icon: "ni ni-planet text-blue",
    component: <Departments />,
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

  // {
  //   path: "/login",
  //   name: "Login",
  //   icon: "ni ni-key-25 text-info",
  //   component: <Login />,
  //   layout: "/auth",
  // },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: <Register />,
  //   layout: "/auth",
  // },
];
export default routes;
