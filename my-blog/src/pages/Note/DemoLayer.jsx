/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-12-11 14:06:30
 * @LastEditors: camus
 * @LastEditTime: 2021-04-09 11:16:39
 */
// React
import React, { Component } from "react";

// Components
// Styled components
import styled from "styled-components";

class Home extends React.PureComponent {
  render() {
    return (
      <Container className="Home">
        <Title>
          <Span>N</Span>otes<Span>.</Span>
        </Title>
      </Container>
    );
  }
}

/* STYLE */
const Container = styled.div`
  width: 100vw;
`;
const Title = styled.h1`
  font-family: "Abril Fatface", cursive;
  font-size: 6rem;
  text-align: center;
  color: #212121;
  /* padding: 10%; */
`;

const Span = styled.span`
  color: #212121;
  font-size: 1em;
  text-shadow: -10px -10px #fff9c4, 10px -10px #f48fb1, -10px 10px #90caf9;
`;

export default Home;
