/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-12-12 10:31:52
 * @LastEditors: camus
 * @LastEditTime: 2020-12-12 10:34:52
 */
export type RenderType =
  | "rerender"
  | "clear"
  | "refresh"
  | "resize"
  | "loading"
  | "select"
  | "flush";

export interface IWidgetProps {
  renderType?: RenderType;
}
