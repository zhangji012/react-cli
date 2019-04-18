import Home from "../pages/home";
import FirstFirst from "../pages/1/1-1";
import FirstSecond from "../pages/1/1-2";
import FirstThird from "../pages/1/1-3";
import FirstFourFirst from "../pages/1/1-4/1-4-1";
const routes = [
  {
    path: "/",
    exact: true,
    component: Home,
    parent: null,
    showMenu: true,
    animated: false,
    title: "首页"
  },
  {
    path: "/1/1",
    exact: true,
    component: FirstFirst,
    parent: null,
    showMenu: true,
    animated: false,
    title: "1_1"
  },
  {
    path: "/1/2",
    exact: true,
    component: FirstSecond,
    parent: null,
    showMenu: true,
    animated: false,
    title: "1_2"
  },
  {
    path: "/1/3",
    exact: true,
    component: FirstThird,
    parent: null,
    showMenu: true,
    animated: false,
    title: "1_3"
  },
  {
    path: "/1/4/1",
    exact: true,
    component: FirstFourFirst,
    parent: null,
    showMenu: true,
    animated: false,
    title: "1_4_1"
  }
];

export default routes;
