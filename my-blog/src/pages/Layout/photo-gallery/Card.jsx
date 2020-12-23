/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-12-21 22:55:48
 * @LastEditors: camus
 * @LastEditTime: 2020-12-22 16:05:13
 */
import React from "react";
import cx from "classnames";

import "./card.less";

export default function Card({ detail, image, type }) {
  const cls = {
    "item--large": type === "large",
    "item--medium": type === "medium",
    "item--full": type === "full"
  };
  return (
    <div
      className={cx("item", cls)}
      style={{ backgroundImage: `url('${image}')` }}
    >
      <div className="item__details">{detail}</div>
    </div>
  );
}
