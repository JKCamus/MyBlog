/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-12-12 10:31:52
 * @LastEditors: camus
 * @LastEditTime: 2021-02-26 11:02:51
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

export const pictureHeightType = {
  4: 3,
  3: 4,
  1: 1,
};
