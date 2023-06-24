import { NavLink, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import React, { memo, useState } from "react";
import routes from "./demoRoutes";
import { Button, Card } from "antd";


const About = () => {
  const [count, setCount] = useState(1);


  const Task = ({mess}) => {
    const [count, setCount] = useState(1);

    return <div>{count}</div>;
  };

  return (
    <Container>
      <Button
        onClick={() => {
          setCount(count + 1);
          setTimeout(() => {
            console.log("技术", count);
          }, 1000);
        }}
        type="primary"
      >
        type
      </Button>
      <Task mess='12'></Task>
      <CardWrapper>
        {routes.map((route) => (
          <NavLink key={route.path} to={route.path}>
            <Card>
              <div>{route.label}</div>
            </Card>
          </NavLink>
        ))}
      </CardWrapper>
      <Switch>
        {routes.map((route) => (
          <Route exact key={route.path} path={route.path} component={route.component} />
        ))}
      </Switch>
    </Container>
  );
};

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(304px, 1fr));
  grid-column-gap: 25px;
  row-gap: 24px;
  margin-bottom: 10px;
  /* grid-auto-rows: 200px; */
`;

const Container = styled.div`
  margin: 10px;
`;

export default memo(About);
