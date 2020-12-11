/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-12-11 14:15:50
 * @LastEditors: camus
 * @LastEditTime: 2020-12-11 22:15:08
 */
// React
import React, { Component } from "react";

// Styled components
import styled from "styled-components";

class ExplorerElement extends Component {
  render() {
    if (this.props.login) {
      this.login = true;
    } else {
      this.login = false;
    }
    let indicator = this.props.details.visible ? (
      <i
        className="fa fa-circle"
        style={{ color: "#81C784", marginRight: "5px" }}
      ></i>
    ) : (
      <i
        className="fa fa-circle"
        style={{ color: "#FF8A80", marginRight: "5px" }}
      ></i>
    );

    indicator = this.login ? indicator : null;

    if (this.props.details.visible || this.login) {
      return (
        <Element
          className="explorerElement"
          onClick={() =>
           {
             this.props.scrollToArticle(
              this.props.details.article,
              this.props.index
            )}
          }
        >
          {indicator} {this.props.details.article}
        </Element>
      );
    } else {
      return null;
    }
  }
}


const Element = styled.div`
  padding: 5px;
  transition: 0.4s;
  color: #212121;
  z-index: 1;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 1em;
  font-style: italic;

  &:hover {
    cursor: pointer;
    color: #212121;
    transition: 0.4s;
    transform: translateX(20px);
  }
`;

export default ExplorerElement;
