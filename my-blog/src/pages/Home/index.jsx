import React, { memo } from "react";
import Banner from "./Banner";
import Footer from "components/app-footer/Footer";
import PictureGallery from './picture-gallery'
const Home = (props) => {
  return (
    <>
      <Banner></Banner>
      <PictureGallery></PictureGallery>
      <Footer></Footer>
    </>
  );
};
export default memo(Home);
