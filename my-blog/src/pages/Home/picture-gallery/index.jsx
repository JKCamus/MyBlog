import React, { memo, useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import QueueAnim from "rc-queue-anim";
import { getPhotosListAction } from "../store/actionCreators";

import { photos as images } from "./data";

const PictureGallery = (props) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { photoList:photos } = useSelector((state) => ({
    photoList: state.getIn(["home", "photoList"]),
    shallowEqual,
  }));
  const styleInit = {
    header: (base, state) => ({
      //头部样式
      position: "absolute",
      top: 20,
      right: 90,
      zIndex: 9999,
    }),
    view: (base, state) => ({
      textAlign: "center",
      height: state.isFullscreen ? "100%" : 900, //当点击全屏的时候图片样式
    }),
  };
  useEffect(() => {
    dispatch(getPhotosListAction(1, 12));
  }, [dispatch]);

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
    <div>
      <QueueAnim type="bottom" className={`pic-details-demo-title`}>
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
          <Modal onClose={closeLightBox}>
            <Carousel
              currentIndex={currentImage}
              styles={styleInit}
              views={
                photos.length
                  ? photos
                  : images.map((x) => ({
                      ...x,
                      srcset: x.srcSet,
                      caption: x.title,
                    }))
              }
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
};
export default memo(PictureGallery);
