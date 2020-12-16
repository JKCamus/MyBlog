/*
 * @Description:组件包括点击生成可拖拽，并且可resize的echarts表格，吸顶效果的控制条
  引用组件：
  react-grid-layout 可以拖拽的库
  react-sticky：吸顶效果库
 * @version:
 * @Author: camus
 * @Date: 2020-12-13 12:23:45
 * @LastEditors: camus
 * @LastEditTime: 2020-12-15 20:06:44
 */
import React, { useState, useEffect } from "react";
import { Layout, Button } from "antd";
import { WidthProvider, Responsive } from "react-grid-layout";
import { StickyContainer, Sticky } from "react-sticky";
import _ from "lodash";
import {
  getBarChart,
  getLineChart,
  getPieChart,
  pieHalfRoseOption,
} from "./chart";
import Charts from "./Charts";
import "./index.less";
import { CloseOutlined } from "@ant-design/icons";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const { Header, Content } = Layout;

const DragLayout = (props) => {
  // 画布初始配置
  const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };
  const rowHeight = 180;

  const [widgets, setWidgets] = useState([]);
  const [layouts, setLayouts] = useState({});
  const [renderType, setRenderType] = useState("");
  // 状态提升，将chart的instance保存在此，方便后续操作
  // 因为chart组件是渲染在函数里的，那么，拿到还是很难的，不能通过ref拿取
  const [chartInstance, setChartInstance] = useState({});
  /**
   * @description: 渲染对应画布内的内容
   */
  const generateDOM = (props) => {
    return _.map(widgets, (l, i) => {
      let option;
      if (l.type === "bar") {
        option = getBarChart();
      } else if (l.type === "line") {
        option = getLineChart();
      } else if (l.type === "pie") {
        option = getPieChart();
      } else if ((l.type = "rosePie")) {
        option = pieHalfRoseOption;
      }
      return (
        <div key={l.i} data-grid={l}>
          <CloseOutlined
            className="remove"
            onClick={() => onRemoveItem(i, l.i)}
          />
          <Charts
            setChartInstance={setChartInstance}
            chartInstance={chartInstance}
            chartKey={l.i}
            renderType={renderType}
            chartOptions={option}
          ></Charts>
        </div>
      );
    });
  };
  /**
   * @description: 添加一个chart容器，定制初始宽度高度位置
   */
  const addChart = (type) => {
    const addItem = {
      x: (widgets.length * 3) % 12,
      y: Infinity, // puts it at the bottom
      w: 3,
      h: 2,
      i: new Date().getTime().toString(),
      minW: 1,
      minH: 1,
      type,
    };
    const oldWidget = [...widgets];
    setWidgets([...oldWidget, addItem]);
  };
  /**
   * @description: 点击删除hover的对应的chart
   */
  const onRemoveItem = (i, key) => {
    setWidgets(widgets.filter((item, index) => index != i));
    // 勿忘删除对应的实例
    delete chartInstance[key];
  };
  /**
   * @description: 重新resize hover选中的chart图表，
   * 使用hash表类型，通过匹配对应的key来找到对应的实例
   */
  const handleResizeStop = (curr) => {
    const { i: key } = curr;
    chartInstance[key].resize();
  };
  /**
   * @description: 将layout-空白容器，保存
   */
  const onLayoutChange = (layout, layouts) => {
    setLayouts(layouts);
  };
  return (
    <Layout>
      <StickyContainer>
        <Sticky>
          {({ style }) => (
            <div style={{ ...style, zIndex: 100 }}>
              <Header className="toolBar">
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
                  onClick={() => addChart("line")}
                >
                  添加折线图
                </Button>
                <Button
                  type="primary"
                  style={{ marginRight: "7px" }}
                  onClick={() => addChart("pie")}
                >
                  添加饼图
                </Button>
              </Header>
            </div>
          )}
        </Sticky>
        <Content>
          <div style={{ background: "#fff", padding: 20, minHeight: "85vh" }}>
            <ResponsiveReactGridLayout
              cols={cols}
              rowHeight={rowHeight}
              className="layout"
              layouts={layouts}
              onLayoutChange={(layout, layouts) => {
                onLayoutChange(layout, layouts);
              }}
              onResizeStop={(op, pre, curr) => handleResizeStop(curr)}
            >
              {generateDOM()}
            </ResponsiveReactGridLayout>
          </div>
        </Content>
      </StickyContainer>
    </Layout>
  );
};

export default DragLayout;
