import React from "react";

export default function NormalChild({ step, number }) {
  console.log("---NormalChild  reRender------");
  return (
    <div>
      normal
      <p>step is {step}</p>
      <p>number is {number}</p>
    </div>
  );
}
