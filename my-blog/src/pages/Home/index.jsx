import React, { memo } from "react";
import Banner from "./Banner";
import Footer from "components/app-footer/Footer";
import PictureGallery from "./picture-gallery";
import { Button } from "antd";
import { authTest } from "services/home";

const Home = (props) => {
  const handleAuth = () => {
    authTest();
  };
  const handleRemove = (params) => {

  }
  return (
    <>
      <Button onClick={handleAuth}>验证权限</Button>
      <Button onClick={handleRemove}>移除权限</Button>
      <Banner></Banner>
      <PictureGallery></PictureGallery>
      <Footer></Footer>
    </>
  );
};
export default memo(Home);
