/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-12-13 12:23:45
 * @LastEditors: camus
 * @LastEditTime: 2020-12-14 13:27:04
 */
import React, { useState, useEffect, useRef } from "react";
import { Layout, Button } from "antd";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import ReactEcharts from "echarts-for-react";
import { getBarChart, getLineChart, getPieChart } from "./chart";
import Charts from "../Charts";
import "./index.less";
import Test from "./Test";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const { Header, Content } = Layout;

const DragLayout = (props) => {
  const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };
  const rowHeight = 180;
  const [widgets, setWidgets] = useState([]);
  const [layouts, setLayouts] = useState({});
  const [renderType, setRenderType] = useState("");
  const [chartInstance, setChartInstance] = useState(undefined);

  useEffect(() => {
    setLayouts(getFromLS() || {});
  }, []);

  const getFromLS = (key) => {
    let ls = {};
    if (global.localStorage) {
      try {
        ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
      } catch (e) {
        /*Ignore*/
      }
    }
    return ls[key];
  };

  const saveToLS = (key, value) => {
    if (global.localStorage) {
      global.localStorage.setItem(
        "rgl-8",
        JSON.stringify({
          [key]: value,
        })
      );
    }
  };
  const generateDOM = (props) => {
    return _.map(widgets, (l, i) => {
      let option;
      if (l.type === "bar") {
        option = getBarChart();
      } else if (l.type === "line") {
        option = getLineChart();
      } else if (l.type === "pie") {
        option = getPieChart();
      }
      return (
        <div key={l.i} data-grid={l}>
          <span className="remove" onClick={onRemoveItem(i)}>
            x
          </span>
          <Charts setChartInstance={setChartInstance} renderType={renderType}
          chartOptions={option}
          ></Charts>
        </div>
      );
    });
  };
  const addChart = (type) => {
    const addItem = {
      x: (widgets.length * 3) % 12,
      y: Infinity, // puts it at the bottom
      w: 3,
      h: 2,
      i: new Date().getTime().toString(),
      type,
    };

    const oldWidget = [...widgets];
    setWidgets([...oldWidget, addItem]);
  };

  const onRemoveItem = (i) => {
    console.log('i', i)
    // setWidgets(widgets.filter((item, index) => index != i));
    // // this.setState({
    // //   widgets: widgets.filter((item, index) => index != i),
    // // });
  };
  const handleResizeStop = () => {
    chartInstance.resize()
  };
  const onLayoutChange = (layout, layouts) => {
    setRenderType("resize");
    saveToLS("layouts", layouts);
    setLayouts(layouts);
  };
  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          padding: "0 30px",
        }}
      >
        <Button
          type="primary"
          style={{ marginRight: "7px" }}
          onClick={() => addChart("bar")}
        >
          添加柱状图
        </Button>
        <Button
          type="primary"
          style={{ marginRight: "7px" }}
          onClick={()=>addChart( "line")}
        >
          添加折线图
        </Button>
        <Button
          type="primary"
          style={{ marginRight: "7px" }}
          onClick={()=>addChart("pie")}
        >
          添加饼图
        </Button>
      </Header>
      <Content style={{ marginTop: 44 }}>
        <div style={{ background: "#fff", padding: 20, minHeight: 800 }}>
          <ResponsiveReactGridLayout
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={180}
            className="layout"
            layouts={layouts}
            onLayoutChange={(layout, layouts) => {
              onLayoutChange(layout, layouts);
            }}
            // onResize={() => handleResizeWidget()}
            onResizeStop={() => handleResizeStop()}
            // isResizable={true}
          >
            {generateDOM()}
          </ResponsiveReactGridLayout>
        </div>
      </Content>
    </Layout>
  );
};

export default DragLayout;
