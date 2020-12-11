import React from "react";
import { Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import QueueAnim from "rc-queue-anim";
import TweenOne from "rc-tween-one";
import "./banner0.less";
// import { isImg } from './utils';

class Banner extends React.PureComponent {
  render() {
    return (
      <div className={"banner0 kibhofepzkt-editor_css"}>
        <QueueAnim
          key="QueueAnim"
          type={["bottom", "top"]}
          delay={200}
          className={"banner0-text-wrapper"}
        >
          <section className={"mockup-section paint-area"}>
            <div className={"mockup-content"}>
              <blockquote className={"mockup-blockquote"}>
                <p className={"paint-area paint-area--text"}>
                  There are two types of people who will tell you that you
                  cannot make a difference in this world: those who are afraid
                  to try and those who are afraid you will succeed.
                </p>
                <footer className={"paint-area paint-area--text"}>Ray Goforth</footer>
              </blockquote>
            </div>
          </section>
        </QueueAnim>
        <TweenOne
          animation={{
            y: "-=20",
            yoyo: true,
            repeat: -1,
            duration: 1000,
          }}
          className="banner0-icon"
          key="icon"
        >
          <DownOutlined />
        </TweenOne>
      </div>
    );
  }
}
export default Banner;
