/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2021-02-08 13:49:17
 * @LastEditors: camus
 * @LastEditTime: 2021-02-08 13:53:36
 */
export default function checkRouterPermission(routerLocation) {
  const { pathname } = routerLocation;
  return pathname.indexOf("profile")>0;
}
