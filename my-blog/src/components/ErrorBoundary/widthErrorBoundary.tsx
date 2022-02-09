/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2021-10-14 17:41:30
 * @LastEditors: camus
 * @LastEditTime: 2022-02-08 19:13:37
 */
import React from "react";
import { withErrorBoundary as withErrorBoundaryComponent } from "react-error-boundary";
import ErrorFallbackComponent from "./ErrorFallback";

const withErrorBoundary = (ComponentThatMayError: React.ComponentType) =>
  withErrorBoundaryComponent(ComponentThatMayError, {
    FallbackComponent: ErrorFallbackComponent,
    onError(error, info) {
      // Do something with the error
      // E.g. log to an error logging client here
    },
  });

export default withErrorBoundary;
