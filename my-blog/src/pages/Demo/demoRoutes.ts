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
