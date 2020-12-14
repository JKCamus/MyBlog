/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-12-12 10:38:09
 * @LastEditors: camus
 * @LastEditTime: 2020-12-14 13:27:33
 */
import React, { memo, useEffect, useState, useRef } from "react";
import * as echarts from "echarts";
import { Button } from "antd";

const Charts = (props) => {
  let chartInstance = undefined;
  const { renderType, handleResizeWidget } = props;
  // const [container, setContainer] = useState(undefined);
  const chartRef = useRef();

  useEffect(() => {
    renderChart(props);
  }, [renderType]);

  const renderChart = (props) => {
    const { setChartInstance,chartOptions} = props;
    if (renderType === "loading") {
      return;
    }
    // 判断
    if (!chartInstance) {
      chartInstance = echarts.init(chartRef.current);
    } else {
      if (renderType === "rerender") {
        instance.dispose();
        instance = echarts.init(this.container, "default");
      }
      if (renderType === "clear") {
        instance.clear();
      }
    }
    chartInstance.setOption(chartOptions);
    setChartInstance(chartInstance);
  };
  return (
    <div id={"main"} style={{ height: "100%", width: "100%" }} ref={chartRef} />
  );
};
export default Charts;
