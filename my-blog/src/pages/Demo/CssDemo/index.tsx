import React, { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";

const A = () => {
  const [state, setState] = useState("123");

  useEffect(() => {
    setTimeout(() => {
      setState("345");
    }, 1000);
  }, []);

  useEffect(() => {
    console.log("7");
    return () => {
      console.log("8");
    };
  }, [state]);

  return <B title={state} />;
};

const B = ({ title }) => {
  useEffect(() => {
    console.log("1");

    return () => {
      console.log("2");
    };
  }, [title]);

  useEffect(() => {
    console.log("4");
  }, []);

  useLayoutEffect(() => {
    console.log("5");
    return () => {
      console.log("6");
    };
  }, [title]);

  console.log("3");

  return <div>{title}</div>;
};

const CssDemo = () => {
  return (
    <Wrapper>
      <Triangle />
      <Circle />
      <HalfCircle />
      <Trapezoid></Trapezoid>
      <A></A>
      <Sector></Sector>
    </Wrapper>
  );
};

export default CssDemo;

const Wrapper = styled.div``;

const Triangle = styled.div`
  border-color: red transparent transparent transparent;
  border-style: solid;
  border-width: 20px;
  width: 0;
  height: 0;
`;
const Circle = styled.div`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  background-color: red;
`;
const HalfCircle = styled.div`
  height: 50px;
  width: 100px;
  background-color: blue;
  border-radius: 50px 50px 0 0;
`;

const Trapezoid = styled.div`
  width: 200px;
  height: 0;
  border-bottom: 100px solid green;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
`;

const Sector = styled.div`
  width: 0;
  height: 0;
  border-top: 100px solid yellow;
  border-right: 100px solid transparent;
  border-bottom: 100px solid transparent;
  border-left: 100px solid transparent;
  border-radius: 100px;
`;


