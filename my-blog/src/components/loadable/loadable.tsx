/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2021-02-26 13:29:58
 * @LastEditors: camus
 * @LastEditTime: 2021-02-26 14:06:41
 */
import React, { lazy, Suspense } from "react";

function loadable<P>(
  importFunc: () => Promise<{ default: React.ComponentType<P> }>,
  { fallback = null } = { fallback: null }
) {
  const LazyComponent = lazy<React.ComponentType<P>>(importFunc);
  return (props: React.ComponentPropsWithRef<React.ComponentClass<P>>) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
}

export default loadable;
