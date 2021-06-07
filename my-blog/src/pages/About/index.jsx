import React, { memo } from "react";
import Parent from "./test-memo/Parent";
const About = (props) => {
  return (
    <>
      <Parent></Parent>
    </>
  );
};
export default memo(About);
