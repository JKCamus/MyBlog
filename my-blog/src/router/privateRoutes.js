/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-12-27 14:30:08
 * @LastEditors: camus
 * @LastEditTime: 2021-01-07 20:31:12
 */
import Profile from "pages/Profile";
// import UploadDemo from "@/pages/Profile/pictureManage/upload";
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
