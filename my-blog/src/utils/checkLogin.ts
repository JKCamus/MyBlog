/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-12-28 21:07:15
 * @LastEditors: camus
 * @LastEditTime: 2020-12-31 15:49:38
 */
import { removeToken } from './token'

export default function () {
  const userInfoString = localStorage.getItem("USER");
  if (userInfoString) {
    const expire = localStorage.getItem('TOKEN_EXPIRE')
    const timestamp = new Date().getTime()
    if (Number(expire) > timestamp) {
      return true
    } else {
      removeToken()
      return false
    }
  } else {
    return false
  }
}
