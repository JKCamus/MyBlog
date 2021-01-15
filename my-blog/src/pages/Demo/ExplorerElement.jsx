/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-12-11 14:15:50
 * @LastEditors: camus
 * @LastEditTime: 2021-01-15 22:52:40
 */
// React
import React, { Component, memo } from "react";
// Styled components
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const ExplorerElement = (props) => {
  const {details}=props
  return (
    <Element
      className="explorerElement"
      onClick={() => {
        props.scrollToArticle(details.article, props.index);
      }}
    >
      {props.details.article}
    </Element>
  );
};

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

export default memo(ExplorerElement);
