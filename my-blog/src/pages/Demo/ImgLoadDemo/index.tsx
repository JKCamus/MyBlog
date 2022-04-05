import "react-app-polyfill/ie11";
import React from "react";
import CacheDemo from "./useImage.cache";
import SrcListDemo from "./useImage.srcList";
import ImageDemo from "./img";
import BackgroundImgDemo from "./BackgroundImgDemo";
import { Button } from "antd";

type DemoType = "ImageDemo" | "srcListDemo" | "cacheDemo" | "";

const Divider = () => <div style={{ height: "10px" }} />;

const ImgLoadDemo: React.FC = () => {
  const [demoType, showDemo] = React.useState<DemoType>("");

  React.useEffect(() => {
    console.log("0000");
  });
  return (
    <div>
      <h2>cache demo </h2>
      <Divider />
      <Button onClick={() => showDemo("cacheDemo")}>show cache demo</Button>
      {demoType === "cacheDemo" && <CacheDemo />}
      <Divider />
      <h2>srcList demo </h2>
      <Button onClick={() => showDemo("srcListDemo")}>show srcList demo</Button>
      <Divider />
      {demoType === "srcListDemo" && <SrcListDemo />}
      <Divider />
      <h2>Img demo </h2>
      <Button onClick={() => showDemo("ImageDemo")}>show Img demo</Button>
      <Divider />
      {demoType === "ImageDemo" && <ImageDemo />}
      <Divider />
      <BackgroundImgDemo />
    </div>
  );
};

export default ImgLoadDemo;
