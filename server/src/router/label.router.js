/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-12-02 11:32:57
 * @LastEditors: camus
 * @LastEditTime: 2020-12-02 14:49:13
 */
const Router=require("koa-router")
const {
  verifyAuth
}=require('../middleware/auth.middleware')
const {
  create,
  getList
}=require('../controller/label.controller')
const labelRouter=new Router({prefix:'/label'})

labelRouter.post('/',verifyAuth,create)
labelRouter.get('/',getList)


module.exports = labelRouter
