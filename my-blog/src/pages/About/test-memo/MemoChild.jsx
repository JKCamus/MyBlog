import React, { memo } from "react";

const isEqual = (prevProps, nextProps) => {
  if (prevProps.number !== nextProps.number) {
    return false;
  }
  return true;
};

const MemoChild = ({ step, number }) => {
  console.log("---MemoChild  reRender------");

  return (
    <div>
      MemoChild
      <p>step is {step}</p>
      <p>number is {number}</p>
    </div>
  );
};
export default memo(MemoChild, isEqual);
