import React, { memo, useCallback, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import QueueAnim from "rc-queue-anim";
import Carousel, { Modal, ModalGateway } from "react-images";
import Gallery, { RenderImageProps } from "react-photo-gallery";

import styled from "styled-components";

import { getPhotosListAction } from "../store/actionCreators";
import { photos as images } from "./data";

interface Photo {
  src: string;
  width: number;
  height: number;
  key: string;
}

const ImageComponent: React.FC<RenderImageProps<Photo>> = ({
  index,
  onClick,
  photo,
  direction,
  top,
  left,
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setLoaded(true);
    img.src = photo.src;
  }, [photo.src]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    onClick(event, { index });
  };

  return (
    <StyledImg
      {...photo}
      key={photo.key}
      photo={photo}
      loaded={loaded}
      direction={direction}
      left={left}
      top={top}
      src={loaded ? photo.src : photo.src.replace("=middle", "=small")}
      onClick={handleClick}
    />
  );
};

const CarouselImage: React.FC<{ src: string; otherProps: any }> = ({ src, ...otherProps }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setLoaded(true);
    img.src = src;
  }, [src]);

  // 请替换 "Loading..." 为你的实际加载指示器
  return loaded ? <img src={src} {...otherProps} /> : <p>Loading...</p>;
};

const PictureGallery: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const dispatch = useDispatch();

  const {
    photoList: photos,
    isMobile,
    shouldPhotoRender,
  } = useSelector(
    (state: any) => ({
      photoList: state.getIn(["home", "photoList"]),
      isMobile: state.getIn(["global", "isMobile"]),
      shouldPhotoRender: state.getIn(["home", "shouldPhotoRender"]),
    }),
    shallowEqual
  );

  const styleInit = {
    header: (base: any, state: any) => ({
      position: "absolute",
      top: 20,
      right: 80,
      zIndex: 9999,
    }),
    view: (base: any, state: any) => ({
      textAlign: "center",
      height: state.isFullscreen ? "100%" : "90vh",
      display: "flex !important",
      justifyContent: "center !important",
      alignItem: "center !important",
    }),
  };

  useEffect(() => {
    shouldPhotoRender && dispatch(getPhotosListAction(1, 20));
  }, [shouldPhotoRender, dispatch]);

  // useEffect(() => {
  //   handleRightClick;
  //   window.addEventListener("contextmenu", handleRightClick);

  //   return () => {
  //     window.removeEventListener("contextmenu", handleRightClick);
  //   };
  // }, []);

  const handleRightClick = (event) => {
    event.preventDefault();
  };

  const columns = (containerWidth: number) => {
    let columns = 1;
    if (containerWidth >= 500) columns = 2;
    if (containerWidth >= 900) columns = 3;
    if (containerWidth >= 1500) columns = 3;
    return columns;
  };

  const openLightBox = useCallback(
    (
      event: React.MouseEvent<Element>,
      {
        photo,
        index,
      }: {
        photo: Photo;
        index: number;
      }
    ) => {
      setCurrentImage(index);
      setViewerIsOpen(true);
    },
    [setCurrentImage, setViewerIsOpen]
  );

  const closeLightBox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  return (
    <GalleryWrapper>
      <QueueAnim type="bottom" className="galleryHeader">
        <h1 key="h1">All In Life </h1>
        {/* <p key="p">I love you not for who you are, but for who I am with you.</p> */}
        <p key="p">The future belongs to those who believe in the beauty of their dreams.</p>
      </QueueAnim>
      <Gallery
        photos={photos.length ? photos : images}
        renderImage={(props) => <ImageComponent {...props} />}
        onClick={openLightBox}
        direction="column"
        margin={6}
        columns={columns}
      />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal
          styles={{blanket:(base)=>({
            ...base,
            backgroundColor:'rgba(0,0,0,.93)'
          })}}
          onClose={closeLightBox} allowFullscreen={false}>
            <Carousel
              currentIndex={currentImage}
              styles={isMobile ? "" : styleInit}
              views={photos.map((item) => ({
                ...item,
                src: isMobile ? item.src : item.src.split("?")[0],
                // component: <CarouselImage src={isMobile ? item.src : item.src.split("?")[0]} />,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </GalleryWrapper>
  );
};

const GalleryWrapper = styled.div`
  margin: auto;
  max-width: 1600px;
  .galleryHeader {
    font-size: 1.5rem;
    text-align: center;
    margin: 1rem 0;
  }
`;

interface ImageProps {
  photo: Photo;
  loaded: boolean;
  direction?: string;
  top?: number;
  left?: number;
}
const StyledImg = styled.img<ImageProps>`
  transition: 0.5s filter ease-in-out, 0.5s transform ease;
  position: ${({ direction }) => (direction === "column" ? "absolute" : "static")};
  left: ${({ left }) => left}px;
  top: ${({ top }) => top}px;
  filter: ${({ loaded }) => (loaded ? "none" : "blur(20px)")};
`;

export default memo(PictureGallery);
