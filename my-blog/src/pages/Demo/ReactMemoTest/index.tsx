import React, { memo, useState } from "react";
import { Button } from "antd";
import MemoChild from "./MemoChild";
import NormalChild from "./NormalChild";

const ReactMemoTest = memo((props) => {
  const [step, setStep] = useState(0);
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(0);
  const handleSetStep = () => {
    setStep(step + 1);
  };
  const handleSetCount = () => {
    setCount(count + 1);
  };
  const handleCalNumber = () => {
    setNumber(count + step);
  };

  return (
    <>
      Parent
      <Button onClick={handleSetStep}>step is : {step}</Button>
      <Button onClick={handleSetCount}>count is : {count}</Button>
      <Button onClick={handleCalNumber}>number is : {number} </Button>
      <hr />
      <MemoChild step={step} number={number}></MemoChild>
      <hr />
      <NormalChild step={step} number={number}></NormalChild>
    </>
  );
});
ReactMemoTest.displayName = "ReactMemoTest";

export default ReactMemoTest;
