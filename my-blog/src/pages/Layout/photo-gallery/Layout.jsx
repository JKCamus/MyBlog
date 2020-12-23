import React, { memo, useEffect, useState } from "react";
import QueueAnim from "rc-queue-anim";
import { getPhotoList } from "services/home";
import { message } from "antd";
import "./index.less";
import Card from "./Card";

const Layout = (props) => {
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    _getPhotoList();
  }, []);

  const _getPhotoList = async () => {
    try {
      await getPhotoList(1, 12).then((res) => {
        setPhotos(res);
      });
    } catch (error) {
      message.error("图片请求失败！");
    }
  };
  return (
    <div className="Layout">
      {/* <h1>Travel Around</h1> */}
      <QueueAnim type="bottom" className={`pic-details-demo-title`}>
        <h1 key="h1">Travel Around </h1>
        <p key="p">
          I love you not for who you are, but for who I am with you.
        </p>
      </QueueAnim>
      <div className="grid">
        {photos &&
          photos.map((item, index) => {
            return (
              <Card
                detail={item.title}
                image={item.url}
                key={index}
                type={['medium'][parseInt((3-0)*Math.random())]}
              ></Card>
            );
          })}
      </div>
    </div>
  );
};
export default memo(Layout);
