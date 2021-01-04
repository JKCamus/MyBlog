/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-12-27 14:30:08
 * @LastEditors: camus
 * @LastEditTime: 2021-01-03 13:47:39
 */
import Profile from "pages/Profile";
import UploadDemo from "pages/Profile/upload";
const privateRoutes = [
  {
    path: "/profile",
    component: Profile,
    // exact: true,
    role: "user",
    backUrl: "/",
    // children: [
    //   {
    //     path: "/profile/upload",
    //     exact: true,
    //     role: "user",
    //     backUrl: "/",
    //     component: UploadDemo,
    //   },
    // ],
  },
];

export default privateRoutes;
