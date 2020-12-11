import React from "react";
import TweenOne from "rc-tween-one";
import OverPack from "rc-scroll-anim/lib/ScrollOverPack";

class Footer extends React.PureComponent {
  render() {
    const { ...props } = this.props;
    const { dataSource } = props;
    delete props.dataSource;
    delete props.isMobile;
    return (
      <div className={"home-page-wrapper footer0-wrapper"}>
        <OverPack className={"home-page footer0"} playScale={0.01}>
          <TweenOne
            animation={{ y: "+=30", opacity: 0, type: "from" }}
            key="footer"
            className={"copyright"}
          >
            <span>
              ©2020{"  "}
              <a href="#" style={{ color: "rgb(50, 166, 194)" }}>
                Camus
              </a>
              {"  "}
              All Rights Reserved
            </span>
          </TweenOne>
        </OverPack>
      </div>
    );
  }
}

export default Footer;
