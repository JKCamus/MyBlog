/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2021-01-21 13:45:42
 * @LastEditors: camus
 * @LastEditTime: 2021-01-21 13:45:56
 */
export const disableReactDevTools = (): void => {
  const noop = (): void => undefined;
  const DEV_TOOLS = (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__;

  if (typeof DEV_TOOLS === 'object') {
      for (const [key, value] of (<any>Object).entries(DEV_TOOLS)) {
          DEV_TOOLS[key] = typeof value === 'function' ? noop : null;
      }
  }
};
