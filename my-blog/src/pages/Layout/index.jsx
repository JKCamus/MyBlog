import React, { memo } from "react";
import Banner from "./Banner";
// import PictureWall from "./picture-wall";
import Footer from "components/app-footer/Footer";
import PhotoGallery from "./photo-gallery";
import PictureGallery from './picture-gallery'
const CLayout = (props) => {
  return (
    <>
      <Banner></Banner>
      {/* <PictureWall></PictureWall> */}
      {/* <PhotoGallery></PhotoGallery> */}
      <PictureGallery></PictureGallery>
      <Footer></Footer>
    </>
  );
};
export default memo(CLayout);
