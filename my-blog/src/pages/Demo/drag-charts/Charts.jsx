/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-12-12 10:38:09
 * @LastEditors: camus
 * @LastEditTime: 2020-12-14 22:41:21
 */
import React, { memo, useEffect, useState, useRef } from "react";
import * as echarts from "echarts";

const Charts = (props) => {
  let instance = undefined;
  const { renderType, handleResizeWidget } = props;
  const chartRef = useRef();

  useEffect(() => {
    renderChart(props);
  }, [renderType]);

  const renderChart = (props) => {
    const { setChartInstance, chartOptions, chartKey, chartInstance } = props;
    if (renderType === "loading") {
      return;
    }
    // 判断
    if (!instance) {
      instance = echarts.init(chartRef.current);
    } else {
      if (renderType === "rerender") {
        instance.dispose();
        instance = echarts.init(this.container, "default");
      }
      if (renderType === "clear") {
        instance.clear();
      }
    }
    instance.setOption(chartOptions);

    setChartInstance({ ...chartInstance, [chartKey]: instance });
  };
  return (
    <div id={"main"} style={{ height: "100%", width: "100%" }} ref={chartRef} />
  );
};
export default Charts;
