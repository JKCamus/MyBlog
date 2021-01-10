// React
import React, { Component } from "react";
// import PlainTextEditor from "./PlainTextEditor";
import ReadTextEditor from "./ReadTextEditor";
import styled from "styled-components";

const ArticleView = (props) => {
  return (
    <Container className="articleView">
      <Button onClick={props.changeView}>
        <i className="fa fa-angle-left"></i> Retour
      </Button>
      {/* <EditDate>
      </EditDate> */}
      <Title> {props.content.article} </Title>
      {/* <div dangerouslySetInnerHTML={{ __html: this.state.content.htmlContent }}></div> */}
      <ReadTextEditor content={props.content} />
    </Container>
  );
};

/* STYLE */
const Container = styled.div`
  width: 60vw;
  height: 100vh;
  background-color: white;
`;

const EditDate = styled.p`
  text-align: center;
  font-style: italic;
`;

const Title = styled.h3`
  color: #212121;
  text-align: center;
  font-size: 5em;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  padding: 10%;
`;

const Button = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;

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
