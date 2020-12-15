export function getBarChart() {
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: ["2014", "2015", "2016", "2017", "2018", "2019"],
        axisLine: {
          lineStyle: {
            color: "#8FA3B7", //y轴颜色
          },
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: "#6D6D6D",
          },
        },
        axisTick: { show: false },
      },
    ],
    yAxis: [
      {
        type: "value",
        splitLine: { show: false },
        //max: 700,
        splitNumber: 3,
        axisTick: { show: false },
        axisLine: {
          lineStyle: {
            color: "#8FA3B7", //y轴颜色
          },
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: "#6D6D6D",
          },
        },
      },
    ],
    series: [
      {
        name: "a",
        type: "bar",
        barWidth: "40%",
        itemStyle: {
          normal: {
            color: "#FAD610",
          },
        },
        stack: "信息",
        data: [320, 132, 101, 134, 90, 30],
      },
      {
        name: "b",
        type: "bar",
        itemStyle: {
          normal: {
            color: "#27ECCE",
          },
        },
        stack: "信息",
        data: [220, 182, 191, 234, 290, 230],
      },
      {
        name: "c",
        type: "bar",
        itemStyle: {
          normal: {
            color: "#4DB3F5",
          },
        },
        stack: "信息",
        data: [150, 132, 201, 154, 90, 130],
      },
    ],
  };
  return option;
}

export function getLineChart() {
  //option
  const option = {
    color: ["#D53A35"],
    tooltip: {
      trigger: "axis",
      //formatter: "{b} <br> 合格率: {c}%"
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      name: "",
      boundaryGap: false,
      axisLine: {
        show: false,
        lineStyle: {
          color: "#525252",
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "#525252",
      },
      data: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
      ],
    },
    yAxis: {
      type: "value",
      name: "",
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "#525252",
      },
      splitLine: {
        lineStyle: {
          type: "dotted",
          color: "#AAA", //F3F3F3
        },
      },
    },
    series: [
      {
        name: "a",
        type: "line",
        symbol: "circle",
        data: [
          100,
          120,
          132,
          101,
          134,
          90,
          230,
          210,
          80,
          20,
          90,
          210,
          200,
          100,
          120,
          132,
          101,
          134,
          90,
          230,
          210,
          80,
          20,
          90,
        ],
      },
    ],
  };
  return option;
}

export function getPieChart() {
  //option
  const option = {
    color: ["#3AA1FF", "#36CBCB", "#4ECB73", "#FBD338"],
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: ["50%", "70%"],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: "center",
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: 30,
              fontWeight: "bold",
            },
          },
        },
        labelLine: {
          normal: {
            show: false,
          },
        },
        data: [
          { value: 300, name: "直接访问" },
          { value: 310, name: "邮件营销" },
          { value: 234, name: "联盟广告" },
          { value: 135, name: "视频广告" },
          { value: 1548, name: "搜索引擎" },
        ],
      },
    ],
  };
  return option;
}
const pieHalfRoseData = [
  {
    value: 600.58,
    name: "Data Point 1",
    itemStyle: {
      normal: {
        color: "#f845f1",
      },
    },
  },
  {
    value: 1100.58,
    name: "Data Point 2",
    itemStyle: {
      normal: {
        color: "#ad46f3",
      },
    },
  },
  {
    value: 1200.58,
    name: "Data Point 3",
    itemStyle: {
      normal: {
        color: "#5045f6",
      },
    },
  },
  {
    value: 1300.58,
    name: "Data Point 4",
    itemStyle: {
      normal: {
        color: "#4777f5",
      },
    },
  },
  {
    value: 1400.58,
    name: "Data Point 5",
    itemStyle: {
      normal: {
        color: "#44aff0",
      },
    },
  },
  {
    value: 1500.58,
    name: "Data Point 6",
    itemStyle: {
      normal: {
        color: "#45dbf7",
      },
    },
  },
  {
    value: 1500.58,
    name: "Data Point 7",
    itemStyle: {
      normal: {
        color: "#f6d54a",
      },
    },
  },
  {
    value: 1600.58,
    name: "Data Point 8",
    itemStyle: {
      normal: {
        color: "#f69846",
      },
    },
  },
  {
    value: 1800,
    name: "Data Point 9",
    itemStyle: {
      normal: {
        color: "#ff4343",
      },
    },
  },
];
const dataNames = pieHalfRoseData.map(i => i.name);
export const pieHalfRoseOption = {
  backgroundColor: "rgb(43, 51, 59)",
  // toolbox: {
  //   show: true,
  //   feature: {
  //     mark: {
  //       show: true,
  //     },
  //     magicType: {
  //       show: true,
  //       type: ["pie", "funnel"],
  //     },
  //     restore: {
  //       show: true,
  //       title: "Restore",
  //     },
  //     saveAsImage: {
  //       show: true,
  //       title: "Save Image",
  //     },
  //   },
  // },
  // 用于添加表层信息
  // graphic: [
  //   {
  //     type: "group",
  //     rotation: Math.PI / 4,
  //     bounding: "raw",
  //     right: 200,
  //     bottom: 100,
  //     z: 100,
  //     children: [
  //       {
  //         type: "rect",
  //         left: "center",
  //         top: "center",
  //         z: 100,
  //         shape: {
  //           width: 600,
  //           height: 50,
  //         },
  //         style: {
  //           fill: "rgba(0,0,0,0.3)",
  //         },
  //       },
  //       {
  //         type: "text",
  //         left: "center",
  //         top: "center",
  //         z: 100,
  //         style: {
  //           fill: "#fff",
  //           text: "jkdhskfls",
  //           font: "bold 26px Microsoft YaHei",
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     type: "group",
  //     left: "0",
  //     top: "bottom",
  //     children: [
  //       {
  //         type: "rect",
  //         z: 100,
  //         left: "center",
  //         top: "middle",
  //         shape: {
  //           width: 190,
  //           height: 90,
  //         },
  //         style: {
  //           fill: "#fff",
  //           stroke: "#555",
  //           lineWidth: 2,
  //           shadowBlur: 8,
  //           shadowOffsetX: 3,
  //           shadowOffsetY: 3,
  //           shadowColor: "rgba(0,0,0,0.3)",
  //         },
  //       },
  //       {
  //         type: "text",
  //         z: 100,
  //         left: "center",
  //         top: "middle",
  //         style: {
  //           fill: "#333",
  //           text: ["This is a note.", "With multiple lines."].join("\n"),
  //           font: "14px Arial",
  //         },
  //       },
  //     ],
  //   },
  // ],
  // Hover Tooltip
  // {a} = series:[{name:}]
  // {b} = series:[{data: [{name:}]}]
  // {c} = series:[{data: [{value:}]
  tooltip: {
    trigger: "item",
    formatter: "{a}<br/><strong>{b}</strong>: {c} Suffix",
  },
  title: {
    text: "PieHalfRose",
    left: "center",
    top: 20,
    textStyle: {
      color: "#ccc",
    },
  },
  calculable: true,
  // legend: {
  //   icon: "circle",
  //   x: "center",
  //   y: "50px",
  //   data: dataNames,
  //   textStyle: {
  //     color: "#fff",
  //   },
  // },
  series: [
    {
      name: "Series Name",
      type: "pie",
      animationDuration: 2000,
      animationEasing: "quarticInOut",
      // radius: [10, 150],
      avoidLabelOverlap: false,
      // startAngle: 90,
      hoverOffset: 5,
      // center: ["50%", "50%"],
      roseType: "area",
      selectedMode: "multiple",
      label: {
        normal: {
          show: true,
          formatter: "{c} Suffix", // {c} data: [{value:},]
        },
        emphasis: {
          show: true,
        },
      },
      labelLine: {
        normal: {
          show: true,
          smooth: false,
          length: 5,
          length2: 10,
        },
        emphasis: {
          show: true,
        },
      },
      data: pieHalfRoseData,
    },
  ],
};
