
import React from "react";

import { Button, Result } from "antd";

const ErrorFallback = ({ error, resetErrorBoundary }: { error: any; resetErrorBoundary: any }) => {
  return (
    <Result
      status="warning"
      title={`Something error width ${error.message}`}
      extra={
        <Button onClick={resetErrorBoundary} type="primary" key="console">
          Try again
        </Button>
      }
    />
  );
};
export default ErrorFallback;
