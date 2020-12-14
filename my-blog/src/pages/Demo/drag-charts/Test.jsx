import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);
const MyFirstGrid = (props) => {
  const layout = [
    { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
    { i: "b", x: 1, y: 0, w: 2, h: 2, minW: 2, maxW: 4 },
    { i: "c", x: 0, y: 2, w: 1, h: 2 },
  ];
  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={{ lg: layout }}
      rowHeight={30}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      margin={{ lg: [30, 30], md: [20, 20], sm: [10, 10], xs: [5, 5] }}
    >
      <div key="a" style={{ background: "red" }}>
        a
      </div>
      <div key="b" style={{ background: "red" }}>
        b
      </div>
      <div key="c" style={{ background: "red" }}>
        c
      </div>
    </ResponsiveGridLayout>
  );
};

export default MyFirstGrid;
