/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-12-12 10:38:09
 * @LastEditors: JKcamus 924850758@qq.com
 * @LastEditTime: 2022-11-04 22:06:14
 */
import React, { memo, useEffect, useRef } from "react";
// import * as echarts from "echarts";
import echarts from '@/common/eCharts.js';


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
  return <div id={"main"} style={{ height: "100%", width: "100%" }} ref={chartRef} />;
};
export default memo(Charts);
