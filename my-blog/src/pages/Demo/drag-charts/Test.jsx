/*
 * @Description:吸顶组件demo
 * @version:
 * @Author: camus
 * @Date: 2020-12-15 11:13:39
 * @LastEditors: camus
 * @LastEditTime: 2020-12-15 12:33:59
 */
import React from "react";
import { StickyContainer, Sticky } from "react-sticky";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

export class Header extends React.Component {
  static defaultProps = {
    className: ""
  };
  render() {
    const { style, renderCount, className } = this.props;
    return (
      <div className={"header " + className} style={style}>
        <h2>
          <span className="pull-left">
            {"<Sticky /> "}
            {renderCount ? <small>(invocation: #{renderCount})</small> : null}
          </span>
        </h2>
      </div>
    );
  }
}

let renderCount = 0;
 class Relative extends React.PureComponent {
  render() {
    return (
      <div>
        <StickyContainer
          style={{ height: "200px", background: "grey", overflowY: "auto" }}
        >
          <div
            style={{
              height: "1000px",
              background: "linear-gradient(#aaa, #fff)"
            }}
          >
            <div style={{ height: "30px" }} />
            <Sticky relative>
              {({ style }) => (
                <div
                  style={{ background: "red", ...style }}
                  renderCount={renderCount++}
                >
                  Count {renderCount}
                </div>
              )}
            </Sticky>
            <div style={{ height: "30px" }} />
            <h2>scrolling container</h2>
          </div>
        </StickyContainer>
      </div>
    );
  }
}

export default Relative
