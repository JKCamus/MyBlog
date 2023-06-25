import { Button } from "antd";
import React, { useEffect, useState } from "react";

const ErrorComponent = () => {
  useEffect(() => {
    throw new Error("Trigger error boundary");
  }, []);
  return null;
};

const ErrorBoundary = () => {
  const [show, setShow] = useState(false);

  const triggerErrorBoundary = () => {
    setShow(pre=>!pre)
  };

  return (
    <>
      <Button onClick={triggerErrorBoundary}>Trigger error boundary</Button>
      {show && <ErrorComponent></ErrorComponent>}
    </>
  );
};

export default ErrorBoundary;
