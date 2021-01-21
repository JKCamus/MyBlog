/*
 * @Description:photoGallery
  1.当前photo放于redux中
  2.需要优化img加载，样式
 * @version:
 * @Author: camus
 * @Date: 2020-12-23 21:49:09
 * @LastEditors: camus
 * @LastEditTime: 2021-01-21 22:28:53
 */
import React, { memo, useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import QueueAnim from "rc-queue-anim";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import styled from "styled-components";

import { getPhotosListAction } from "../store/actionCreators";
import { photos as images } from "./data";

const PictureGallery = (props) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const dispatch = useDispatch();

  const { photoList: photos, isMobile,shouldPhotoRender } = useSelector((state) => ({
    photoList: state.getIn(["home", "photoList"]),
    isMobile: state.getIn(["global", "isMobile"]),
    shouldPhotoRender:state.getIn(["home", "shouldPhotoRender"]),
    shallowEqual,
  }));

  const styleInit = {
    header: (base, state) => ({
      //头部样式
      position: "absolute",
      top: 20,
      right: 80,
      zIndex: 9999,
    }),
    view: (base, state) => ({
      textAlign: "center",
      height: state.isFullscreen ? "100%" : 900, //当点击全屏的时候图片样式
    }),
  };

  useEffect(() => {
    shouldPhotoRender&&dispatch(getPhotosListAction(1, 20));
  }, [shouldPhotoRender]);

  const columns = (containerWidth) => {
    let columns = 1;
    if (containerWidth >= 500) columns = 2;
    if (containerWidth >= 900) columns = 3;
    if (containerWidth >= 1500) columns = 3;
    return columns;
  };
  const openLightBox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);
  const closeLightBox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };
  return (
    <GalleryWrapper>
      <QueueAnim
        type="bottom"
        className={`pic-details-demo-title`}
        className={"galleryHeader"}
      >
        <h1 key="h1">All In Life </h1>
        <p key="p">
          I love you not for who you are, but for who I am with you.
        </p>
      </QueueAnim>
      <Gallery
        photos={photos.length ? photos : images}
        onClick={openLightBox}
        direction="column"
        margin={6}
        columns={columns}
      />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightBox} allowFullscreen={false}>
            <Carousel
              currentIndex={currentImage}
              styles={isMobile ? "" : styleInit}
              views={photos.map((item) => {
                return {
                  ...item,
                  src: item.src.split("?")[0],
                };
              })}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </GalleryWrapper>
  );
};

const GalleryWrapper = styled.div`
  /* @import url("https://fonts.googleapis.com/css?family=Arvo"); */
  margin: auto;
  max-width: 1600px;
  .galleryHeader {
    font-size: 1.5rem;
    text-align: center;
    margin: 1rem 0;
  }
`;

export default (PictureGallery);
