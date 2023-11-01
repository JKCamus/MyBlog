import React, { useEffect, useState } from "react";
import styled from "styled-components";

// panorama 全景
const VRPreview: React.FC = (props) => {
  const [isPANOLENSLoaded, setPANOLENSLoaded] = useState(false);
  const [isThreeLoaded, setIsThreeLoaded] = useState(false);
  useEffect(() => {
    const loadSource = async () => {
      await import("./three.min.js");
      setIsThreeLoaded(true);
      await import("./panolens.min.js");
      setPANOLENSLoaded(true);
    };
    loadSource();
  }, []);

  useEffect(() => {
    if (isPANOLENSLoaded && isThreeLoaded) {
      const container = document.getElementById("container");
      // console.log('three', THREE)
      const viewer = new PANOLENS.Viewer({
        container: container,
        controlButtons: ["fullscreen", "setting", "video"],
        autoRotate: false, //自动播放
        autoRotateActivationDuration: 2000, //时长
        autoRotateSpeed: 0.2, //速度
      });

      //   const panorama = new PANOLENS.ImageLittlePlanet(
      //     "src/assets/img/Photo_6553761_DJI_161_pano_12007956_0_2023719574_photo_original.JPG"
      // );
      const panorama = new PANOLENS.ImagePanorama(
        "src/assets/img/Photo_6553761_DJI_161_pano_12007956_0_2023719574_photo_original.JPG"
      );
      // console.log('viwer', viewer)
      viewer.add(panorama);
    }
  }, [isPANOLENSLoaded, isThreeLoaded]);

  return (
    <div>
      360
      <Container id="container" style={{ width: "100vw", height: "100vh" }}></Container>
    </div>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export default VRPreview;
