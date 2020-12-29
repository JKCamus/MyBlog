/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-12-27 14:30:08
 * @LastEditors: camus
 * @LastEditTime: 2020-12-28 20:20:02
 */
import Profile from "pages/Profile";
const privateRoutes = [
  {
    path: "/profile",
    component: Profile,
    exact: true,
    role: "user",
    backUrl: "/",
  },
];

export default privateRoutes;
