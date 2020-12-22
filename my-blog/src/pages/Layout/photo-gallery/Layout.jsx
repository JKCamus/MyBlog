import React, { memo } from "react";
import QueueAnim from "rc-queue-anim";

import "./index.less";
const images = [
  "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?dpr=2&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=",
  "https://images.unsplash.com/photo-1422255198496-21531f12a6e8?dpr=2&auto=format&fit=crop&w=1500&h=996&q=80&cs=tinysrgb&crop=",
  "https://images.unsplash.com/photo-1490914327627-9fe8d52f4d90?dpr=2&auto=format&fit=crop&w=1500&h=2250&q=80&cs=tinysrgb&crop=",
  "https://images.unsplash.com/photo-1476097297040-79e9e1603142?dpr=2&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=",
  "https://images.unsplash.com/photo-1464652149449-f3b8538144aa?dpr=2&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=",
];
const Layout = ({ children }) => {
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
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, {
            image: images[index % 5],
          });
        })}
      </div>
    </div>
  );
};
export default memo(Layout);
