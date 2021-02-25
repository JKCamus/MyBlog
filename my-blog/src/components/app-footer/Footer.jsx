import React from "react";
import TweenOne from "rc-tween-one";
import OverPack from "rc-scroll-anim/lib/ScrollOverPack";
import "./index.less";
class Footer extends React.PureComponent {
  render() {
    return (
      <div className={"home-page-wrapper footer-wrapper"}>
        <OverPack className={"home-page footer"} playScale={0.01}>
          <TweenOne
            animation={{ y: "+=30", opacity: 0, type: "from" }}
            key="footer"
            className={"copyright"}
          >
            <span>
              ©{new Date().getFullYear()}
              {"  "}
              <a style={{ color: "rgb(50, 166, 194)" }} >Camus</a>
              {"  "}• 闽ICP备2021001952号
              {"  "}• 友情链接:{" "}
              <a href="https://www.windypath.com/"  target="_blank" rel="noreferrer"   style={{ color: "#999" }}>
                风萧古道
              </a>
            </span>
          </TweenOne>
        </OverPack>
      </div>
    );
  }
}

export default Footer;
