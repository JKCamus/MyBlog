// React
import React, { Component, useRef, useState } from "react";
// import PlainTextEditor from "./PlainTextEditor";
// import ReadTextEditor from "./ReadTextEditor";
import styled from "styled-components";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
const ArticleView = (props) => {
  const { isMobile } = useSelector((state) => ({
    isMobile: state.getIn(["global", "isMobile"]),
    shallowEqual,
  }));
  return (
    <Container className="articleView" isMobile={isMobile}>
      {!isMobile && (
        <Button onClick={props.changeView}>
          <i className="fa fa-angle-left"></i> Back
        </Button>
      )}
      {/* <EditDate>
      </EditDate> */}
      {/* <Title isMobile={isMobile}> {props.content.article} </Title> */}
      {/* <div dangerouslySetInnerHTML={{ __html: this.state.content.htmlContent }}></div> */}
      {/* <ReadTextEditor content={props.content} /> */}
      <iframe
        id={"iframe"}
        title={"notes"}
        style={{
          width: "100%",
          overflow: "visible",
          // height: "100%",
          minHeight: "100vh",
        }}
        onLoad={() => {
          // console.log('sss', document.getElementById("iframe").contentWindow)
          document.getElementById("iframe").height = document.getElementById(
            "iframe"
          ).contentWindow.document.body.scrollHeight;
          // console.log(
          //   "height",
          //   document.getElementById("iframe").contentWindow.document.body
          //     .scrollHeight
          // );
          // const obj = ReactDOM.findDOMNode(this);
          // this.setState({
          //   iFrameHeight: obj.contentWindow.document.body.scrollHeight + "px",
          // });
        }}
        srcDoc={`${props.content.htmlContent}`}
        // src={`${props.content.htmlContent}`}
        width="100%"
        height={"100%"}
        scrolling="no"
        frameBorder="0"
      />
    </Container>
  );
};

/* STYLE */
const Container = styled.div`
  ${(props) =>
    props.isMobile
      ? `
      width: 100vw;
    `
      : `width: 60vw;`}
  height: 100vh;
  background-color: white;
`;

// const EditDate = styled.p`
//   text-align: center;
//   font-style: italic;
// `;

// const Title = styled.h3`
//   color: #212121;
//   text-align: center;
//   ${(props) =>
//     props.isMobile
//       ? `
//       font-size: 2rem;
//     `
//       : `font-size: 4rem;`}
//   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
//     Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
//   padding: 10%;
// `;

const Button = styled.button`
  position: fixed;
  top: 10rem;
  right: 20px;
  z-index: 1;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";

  width: 150px;
  height: 50px;
  font-size: 20px;
  border: 1px solid #f5f5f5;
  border-radius: 20px;
  transition: 0.3s;
  &:hover {
    cursor: pointer;
    /* background-color: #f5f5f5; */
    background-color: #fff;
    transition: 0.3s;
  }

  &:focus {
    outline: none;
  }
`;

// const DeleteButton = Button.extend`
//   background-color: #ff8a80;
//   color: white;
//   top: 80px;

//   &:hover {
//     cursor: pointer;
//     background-color: #ff5252;
//     transition: 0.3s;
//   }
// `;

export default ArticleView;
