/*
 * @Description:动态路由生成
 * 规则：优先引用导出的displayName，之后是组件名。注：需要注意memo后的导出方式
 * @version:
 * @Author: camus
 * @Date: 2022-02-08 19:08:12
 * @LastEditors: JKcamus 924850758@qq.com
 * @LastEditTime: 2023-06-25 16:30:18
 */
import { widthErrorBoundary } from "@/components/ErrorBoundary";
import React from "react";

interface RoutesType {
  label: string;
  component: React.ComponentType;
  path: string;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Demo = import.meta.globEager("./*/index.tsx");

const components = Object.keys(Demo).map((demo) => {
  console.log('Demo', Demo)
  return {
    name: Demo[demo].default.displayName || Demo[demo].default.name,
    component: widthErrorBoundary(Demo[demo].default),
  };
});

const routes: RoutesType[] = components.map((cpn) => ({
  label: cpn.name,
  component: cpn.component,
  path: `/demo/${cpn.name}`,
}));

export default routes;
