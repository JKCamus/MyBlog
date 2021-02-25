/*
 * @Description:用于放在主程序入口文件，配置当为生产环境的时候，关闭dev_tool
 * @version:
 * @Author: camus
 * @Date: 2021-01-21 13:45:42
 * @LastEditors: camus
 * @LastEditTime: 2021-02-24 22:14:43
 */
/**
 * @description: 开发模式关闭devTool
 * @param {*} void
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
