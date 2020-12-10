import React from "react";
export const Nav00DataSource = {
  wrapper: { className: "header0 home-page-wrapper" },
  page: { className: "home-page" },
  logo: {
    className: "header0-logo",
    children: "https://os.alipayobjects.com/rmsportal/mlcYmsRilwraoAe.svg",
  },
  Menu: {
    className: "header0-menu",
    children: [
      {
        name: "item0",
        className: "header0-item",
        children: {
          href: "#",
          children: [{ children: "导航一", name: "text" }],
        },
        subItem: [
          {
            name: "sub0",
            className: "item-sub",
            children: {
              className: "item-sub-item",
              children: [
                {
                  name: "image0",
                  className: "item-image",
                  children:
                    "https://gw.alipayobjects.com/zos/rmsportal/ruHbkzzMKShUpDYMEmHM.svg",
                },
                {
                  name: "title",
                  className: "item-title",
                  children: "Ant Design",
                },
                {
                  name: "content",
                  className: "item-content",
                  children: "企业级 UI 设计体系",
                },
              ],
            },
          },
          {
            name: "sub1",
            className: "item-sub",
            children: {
              className: "item-sub-item",
              children: [
                {
                  name: "image0",
                  className: "item-image",
                  children:
                    "https://gw.alipayobjects.com/zos/rmsportal/ruHbkzzMKShUpDYMEmHM.svg",
                },
                {
                  name: "title",
                  className: "item-title",
                  children: "Ant Design",
                },
                {
                  name: "content",
                  className: "item-content",
                  children: "企业级 UI 设计体系",
                },
              ],
            },
          },
        ],
      },
      {
        name: "item1",
        className: "header0-item",
        children: {
          href: "#",
          children: [{ children: "导航二", name: "text" }],
        },
      },
      {
        name: "item2",
        className: "header0-item",
        children: {
          href: "#",
          children: [{ children: "导航三", name: "text" }],
        },
      },
      {
        name: "item3",
        className: "header0-item",
        children: {
          href: "#",
          children: [{ children: "导航四", name: "text" }],
        },
      },
    ],
  },
  mobileMenu: { className: "header0-mobile-menu" },
};
export const Nav20DataSource = {
  isScrollLink: true,
  wrapper: { className: "header2 home-page-wrapper" },
  page: { className: "home-page" },
  logo: {
    className: "header2-logo",
    children: `${require("../../assets/img/miao.png")}`,
    // children: 'https://os.alipayobjects.com/rmsportal/mlcYmsRilwraoAe.svg',
  },
  LinkMenu: {
    className: "header2-menu",
    children: [
      {
        name: "linkNav",
        to: "当前页面 ID 地址，参考如上",
        children: "Login",
        className: "menu-item",
      },
      {
        name: "linkNav",
        to: "/demo",
        children: "Demo",
        className: "menu-item",
      },
      {
        name: "linkNav",
        to: "当前页面 ID 地址，参考如上",
        children: "About",
        className: "menu-item",
      },
    ],
  },
  mobileMenu: { className: "header2-mobile-menu" },
};
export const Banner01DataSource = {
  wrapper: { className: "banner0 kibhofepzkt-editor_css" },
  textWrapper: { className: "banner0-text-wrapper" },
  title: {
    className: "banner0-title",
    children: "https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png",
  },
  content: {
    className: "banner0-content",
    children: "一个高效的页面动画解决方案",
  },
  button: { className: "banner0-button", children: "Learn More" },
};
export const Banner30DataSource = {
  wrapper: { className: "banner3" },
  textWrapper: {
    className: "banner3-text-wrapper",
    children: [
      {
        name: "nameEn",
        className: "banner3-name-en",
        children: "Seeking Experience & Engineering Conference",
      },
      {
        name: "slogan",
        className: "banner3-slogan",
        children: "首届蚂蚁金服体验科技大会",
        texty: true,
      },
      {
        name: "name",
        className: "banner3-name",
        children: "探索极致用户体验与最佳工程实践探索",
      },
      { name: "button", className: "banner3-button", children: "立即报名" },
      {
        name: "time",
        className: "banner3-time",
        children: "2018.01.06 / 中国·杭州",
      },
    ],
  },
};
export const Banner50DataSource = {
  wrapper: { className: "home-page-wrapper banner5" },
  page: { className: "home-page banner5-page" },
  childWrapper: {
    className: "banner5-title-wrapper",
    children: [
      { name: "title", children: "产品名", className: "banner5-title" },
      {
        name: "explain",
        className: "banner5-explain",
        children: "产品标语介绍",
      },
      {
        name: "content",
        className: "banner5-content",
        children: "产品的详细说明，如是什么东西之类的文字",
      },
      {
        name: "button",
        className: "banner5-button-wrapper",
        children: {
          href: "#",
          className: "banner5-button",
          type: "primary",
          children: "开始使用",
        },
      },
    ],
  },
  image: {
    className: "banner5-image",
    children:
      "https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*-wAhRYnWQscAAAAAAAAAAABkARQnAQ",
  },
};
export const Banner10DataSource = {
  wrapper: { className: "banner1" },
  BannerAnim: {
    children: [
      {
        name: "elem0",
        BannerElement: { className: "banner-user-elem" },
        textWrapper: { className: "banner1-text-wrapper" },
        bg: { className: "bg bg0" },
        title: {
          className: "banner1-title",
          children:
            "https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png",
        },
        content: {
          className: "banner1-content",
          children: "一个高效的页面动画解决方案",
        },
        button: { className: "banner1-button", children: "Learn More" },
      },
      {
        name: "elem1",
        BannerElement: { className: "banner-user-elem" },
        textWrapper: { className: "banner1-text-wrapper" },
        bg: { className: "bg bg1" },
        title: {
          className: "banner1-title",
          children:
            "https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png",
        },
        content: {
          className: "banner1-content",
          children: "一个高效的页面动画解决方案",
        },
        button: { className: "banner1-button", children: "Learn More" },
      },
      {
        name: "elem2",
        BannerElement: { className: "banner-user-elem" },
        textWrapper: { className: "banner1-text-wrapper" },
        bg: { className: "bg bg1" },
        title: {
          className: "banner1-title",
          children:
            "https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png",
        },
        content: {
          className: "banner1-content",
          children: "一个高效的页面动画解决方案",
        },
        button: { className: "banner1-button", children: "Learn More" },
      },
    ],
  },
};
export const Contact00DataSource = {
  wrapper: { className: "home-page-wrapper content10-wrapper" },
  Content: {
    className: "icon-wrapper",
    children: {
      icon: {
        className: "icon",
        children:
          "https://gw.alipayobjects.com/zos/rmsportal/zIUVomgdcKEKcnnQdOzw.svg",
        name: "主要图标",
      },
      iconShadow: {
        className: "icon-shadow",
        children:
          "https://gw.alipayobjects.com/zos/rmsportal/WIePwurYppfVvDNASZRN.svg",
        name: "图标影阴",
      },
      url: { children: "https://gaode.com/place/B0FFH3KPBX", name: "跳转地址" },
      title: { children: "大会地址", name: "弹框标题" },
      content: {
        children: "蚂蚁 Z 空间  浙江省杭州市西湖区西溪路556号",
        name: "弹框内容",
      },
    },
  },
};
export const Content40DataSource = {
  wrapper: { className: "home-page-wrapper content4-wrapper" },
  page: { className: "home-page content4" },
  OverPack: { playScale: 0.3, className: "" },
  titleWrapper: {
    className: "title-wrapper",
    children: [
      {
        name: "title",
        children: "蚂蚁金融云提供专业的服务",
        className: "title-h1",
      },
      {
        name: "content",
        className: "title-content content4-title-content",
        children: "科技想象力，金融创造力",
      },
    ],
  },
  video: {
    className: "content4-video",
    children: {
      video: "https://os.alipayobjects.com/rmsportal/EejaUGsyExkXyXr.mp4",
      image: "https://zos.alipayobjects.com/rmsportal/HZgzhugQZkqUwBVeNyfz.jpg",
    },
  },
};
export const Content00DataSource = {
  wrapper: { className: "home-page-wrapper content0-wrapper" },
  page: { className: "home-page content0" },
  OverPack: { playScale: 0.3, className: "" },
  titleWrapper: {
    className: "title-wrapper",
    children: [{ name: "title", children: "产品与服务" }],
  },
  childWrapper: {
    className: "content0-block-wrapper",
    children: [
      {
        name: "block0",
        className: "content0-block",
        md: 8,
        xs: 24,
        children: {
          className: "content0-block-item",
          children: [
            {
              name: "image",
              className: "content0-block-icon",
              children:
                "https://zos.alipayobjects.com/rmsportal/WBnVOjtIlGWbzyQivuyq.png",
            },
            {
              name: "title",
              className: "content0-block-title",
              children: "一站式业务接入",
            },
            { name: "content", children: "支付、结算、核算接入产品效率翻四倍" },
          ],
        },
      },
      {
        name: "block1",
        className: "content0-block",
        md: 8,
        xs: 24,
        children: {
          className: "content0-block-item",
          children: [
            {
              name: "image",
              className: "content0-block-icon",
              children:
                "https://zos.alipayobjects.com/rmsportal/YPMsLQuCEXtuEkmXTTdk.png",
            },
            {
              name: "title",
              className: "content0-block-title",
              children: "一站式事中风险监控",
            },
            {
              name: "content",
              children: "在所有需求配置环节事前风险控制和质量控制能力",
            },
          ],
        },
      },
      {
        name: "block2",
        className: "content0-block",
        md: 8,
        xs: 24,
        children: {
          className: "content0-block-item",
          children: [
            {
              name: "image",
              className: "content0-block-icon",
              children:
                "https://zos.alipayobjects.com/rmsportal/EkXWVvAaFJKCzhMmQYiX.png",
            },
            {
              name: "title",
              className: "content0-block-title",
              children: "一站式数据运营",
            },
            {
              name: "content",
              children: "沉淀产品接入效率和运营小二工作效率数据",
            },
          ],
        },
      },
    ],
  },
};

export const Content50DataSource = {
  wrapper: { className: "home-page-wrapper content5-wrapper" },
  page: { className: "home-page content5" },
  OverPack: { playScale: 0.3, className: "" },
  titleWrapper: {
    className: "title-wrapper",
    children: [
      { name: "title", children: "客户案例", className: "title-h1" },
      {
        name: "content",
        className: "title-content",
        children: "在这里用一段话介绍服务的案例情况",
      },
    ],
  },
  block: {
    className: "content5-img-wrapper",
    gutter: 16,
    children: [
      {
        name: "block0",
        className: "block",
        md: 6,
        xs: 24,
        children: {
          wrapper: { className: "content5-block-content" },
          img: {
            children:
              "https://t.alipayobjects.com/images/rmsweb/T11aVgXc4eXXXXXXXX.svg",
          },
          content: { children: "Ant Design" },
        },
      },
      {
        name: "block1",
        className: "block",
        md: 6,
        xs: 24,
        children: {
          wrapper: { className: "content5-block-content" },
          img: {
            children:
              "https://zos.alipayobjects.com/rmsportal/faKjZtrmIbwJvVR.svg",
          },
          content: { children: "Ant Motion" },
        },
      },
      {
        name: "block2",
        className: "block",
        md: 6,
        xs: 24,
        children: {
          wrapper: { className: "content5-block-content" },
          img: {
            children:
              "https://t.alipayobjects.com/images/rmsweb/T11aVgXc4eXXXXXXXX.svg",
          },
          content: { children: "Ant Design" },
        },
      },
      {
        name: "block3",
        className: "block",
        md: 6,
        xs: 24,
        children: {
          wrapper: { className: "content5-block-content" },
          img: {
            children:
              "https://zos.alipayobjects.com/rmsportal/faKjZtrmIbwJvVR.svg",
          },
          content: { children: "Ant Motion" },
        },
      },
      {
        name: "block4",
        className: "block",
        md: 6,
        xs: 24,
        children: {
          wrapper: { className: "content5-block-content" },
          img: {
            children:
              "https://t.alipayobjects.com/images/rmsweb/T11aVgXc4eXXXXXXXX.svg",
          },
          content: { children: "Ant Design" },
        },
      },
      {
        name: "block5",
        className: "block",
        md: 6,
        xs: 24,
        children: {
          wrapper: { className: "content5-block-content" },
          img: {
            children:
              "https://zos.alipayobjects.com/rmsportal/faKjZtrmIbwJvVR.svg",
          },
          content: { children: "Ant Motion" },
        },
      },
      {
        name: "block6",
        className: "block",
        md: 6,
        xs: 24,
        children: {
          wrapper: { className: "content5-block-content" },
          img: {
            children:
              "https://t.alipayobjects.com/images/rmsweb/T11aVgXc4eXXXXXXXX.svg",
          },
          content: { children: "Ant Design" },
        },
      },
      {
        name: "block7",
        className: "block",
        md: 6,
        xs: 24,
        children: {
          wrapper: { className: "content5-block-content" },
          img: {
            children:
              "https://zos.alipayobjects.com/rmsportal/faKjZtrmIbwJvVR.svg",
          },
          content: { children: "Ant Motion" },
        },
      },
    ],
  },
};
export const Content30DataSource = {
  wrapper: { className: "home-page-wrapper content3-wrapper" },
  page: { className: "home-page content3" },
  OverPack: { playScale: 0.3 },
  titleWrapper: {
    className: "title-wrapper",
    children: [
      {
        name: "title",
        children: "蚂蚁金融云提供专业的服务",
        className: "title-h1",
      },
      {
        name: "content",
        className: "title-content",
        children: "基于阿里云强大的基础资源",
      },
    ],
  },
  block: {
    className: "content3-block-wrapper",
    children: [
      {
        name: "block0",
        className: "content3-block",
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: "content3-icon",
            children:
              "https://zos.alipayobjects.com/rmsportal/ScHBSdwpTkAHZkJ.png",
          },
          textWrapper: { className: "content3-text" },
          title: { className: "content3-title", children: "企业资源管理" },
          content: {
            className: "content3-content",
            children:
              "云资源集中编排、弹性伸缩、持续发布和部署，高可用及容灾。",
          },
        },
      },
      {
        name: "block1",
        className: "content3-block",
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: "content3-icon",
            children:
              "https://zos.alipayobjects.com/rmsportal/NKBELAOuuKbofDD.png",
          },
          textWrapper: { className: "content3-text" },
          title: { className: "content3-title", children: "云安全" },
          content: {
            className: "content3-content",
            children:
              "按金融企业安全要求打造的完整云上安全体系，全方位保障金融应用及数据安全。",
          },
        },
      },
      {
        name: "block2",
        className: "content3-block",
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: "content3-icon",
            children:
              "https://zos.alipayobjects.com/rmsportal/xMSBjgxBhKfyMWX.png",
          },
          textWrapper: { className: "content3-text" },
          title: { className: "content3-title", children: "云监控" },
          content: {
            className: "content3-content",
            children:
              "分布式云环境集中监控，统一资源及应用状态视图，智能分析及故障定位。",
          },
        },
      },
      {
        name: "block3",
        className: "content3-block",
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: "content3-icon",
            children:
              "https://zos.alipayobjects.com/rmsportal/MNdlBNhmDBLuzqp.png",
          },
          textWrapper: { className: "content3-text" },
          title: { className: "content3-title", children: "移动" },
          content: {
            className: "content3-content",
            children:
              "一站式移动金融APP开发及全面监控；丰富可用组件，动态发布和故障热修复。",
          },
        },
      },
      {
        name: "block4",
        className: "content3-block",
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: "content3-icon",
            children:
              "https://zos.alipayobjects.com/rmsportal/UsUmoBRyLvkIQeO.png",
          },
          textWrapper: { className: "content3-text" },
          title: { className: "content3-title", children: "分布式中间件" },
          content: {
            className: "content3-content",
            children:
              "金融级联机交易处理中间件，大规模分布式计算机，数万笔/秒级并发能力，严格保证交易数据统一性。",
          },
        },
      },
      {
        name: "block5",
        className: "content3-block",
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: "content3-icon",
            children:
              "https://zos.alipayobjects.com/rmsportal/ipwaQLBLflRfUrg.png",
          },
          textWrapper: { className: "content3-text" },
          title: { className: "content3-title", children: "大数据" },
          content: {
            className: "content3-content",
            children:
              "一站式、全周期大数据协同工作平台，PB级数据处理、毫秒级数据分析工具。",
          },
        },
      },
    ],
  },
};
export const Footer10DataSource = {
  wrapper: { className: "home-page-wrapper footer1-wrapper" },
  OverPack: { className: "footer1", playScale: 0.2 },
  block: {
    className: "home-page",
    gutter: 0,
    children: [
      {
        name: "block0",
        xs: 24,
        md: 6,
        className: "block",
        title: {
          className: "logo",
          children:
            "https://zos.alipayobjects.com/rmsportal/qqaimmXZVSwAhpL.svg",
        },
        childWrapper: {
          className: "slogan",
          children: [
            {
              name: "content0",
              children: "Animation specification and components of Ant Design.",
            },
          ],
        },
      },
      {
        name: "block1",
        xs: 24,
        md: 6,
        className: "block",
        title: { children: "产品" },
        childWrapper: {
          children: [
            { name: "link0", href: "#", children: "产品更新记录" },
            { name: "link1", href: "#", children: "API文档" },
            { name: "link2", href: "#", children: "快速入门" },
            { name: "link3", href: "#", children: "参考指南" },
          ],
        },
      },
      {
        name: "block2",
        xs: 24,
        md: 6,
        className: "block",
        title: { children: "关于" },
        childWrapper: {
          children: [
            { href: "#", name: "link0", children: "FAQ" },
            { href: "#", name: "link1", children: "联系我们" },
          ],
        },
      },
      {
        name: "block3",
        xs: 24,
        md: 6,
        className: "block",
        title: { children: "资源" },
        childWrapper: {
          children: [
            { href: "#", name: "link0", children: "Ant Design" },
            { href: "#", name: "link1", children: "Ant Motion" },
          ],
        },
      },
    ],
  },
  copyrightWrapper: { className: "copyright-wrapper" },
  copyrightPage: { className: "home-page" },
  copyright: {
    className: "copyright",
    children: (
      <span>
        {/* ©2020 by <a href="https://motion.ant.design">Ant Motion</a> All Rights
        Reserved */}
        ©2020 by Camus All Rights Reserved
      </span>
    ),
  },
};
