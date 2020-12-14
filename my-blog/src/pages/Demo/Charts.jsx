/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-12-12 10:38:09
 * @LastEditors: camus
 * @LastEditTime: 2020-12-14 10:34:23
 */
import React, { memo, useEffect, useState, useRef } from "react";
import * as echarts from "echarts";
import { Button } from "antd";

const Charts = (props) => {
  const { renderType, handleResizeWidget } = props;
  // const [container, setContainer] = useState(undefined);
  // const [container, setContainer] = useState(undefined);
  const [instance, setInstance] = useState(undefined);
  const chartRef = useRef();
  // let instance=undefined
  // let container=undefined
  useEffect(() => {
    // console.log('ssssss',renderType )
    renderChart(props);
  }, [renderType]);

  useEffect(() => {
    handleResizeWidget = (params) => {
      instance.resize();
    };
  }, []);

  const renderChart = (props) => {
    if (renderType === "loading") {
      return;
    }
    // 判断
    let chartInstance = undefined;
    if (!chartInstance) {
      chartInstance = echarts.init(chartRef.current);
      setInstance(chartInstance);
    } else {
      console.log("sss111s", renderType);
      if (renderType === "rerender") {
        instance.dispose();
        instance = echarts.init(this.container, "default");
      }
      if (renderType === "clear") {
        instance.clear();
      }
      if (renderType === "resize") {
        console.log("sss222ssss");
        instance.resize();
      }
    }
    // console.log("instance", chartInstance);
    chartInstance.setOption({
      title: {
        text: "ECharts 实例",
      },
      tooltip: {},
      legend: {
        data: ["销量"],
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    });
    // window.onresize = () => chart.resize()
  };
  return (
    <div>
      <Button onClick={handleC}>sssss</Button>
      <div
        id={"main"}
        style={{ height: "100%", width: "100%" }}
        ref={chartRef}
      />
    </div>
  );
};
export default Charts;
