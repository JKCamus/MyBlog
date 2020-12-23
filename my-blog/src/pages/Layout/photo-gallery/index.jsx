/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-12-21 22:54:52
 * @LastEditors: camus
 * @LastEditTime: 2020-12-22 15:51:10
 */
import React, { memo } from "react";
import Layout from "./Layout";
import Card from './Card';

const PhotoGallery = (props) => {
  return (
    <Layout>
      {/* <Card detail="jelly-o brownie sweet" />
      <Card detail="Muffin jelly gingerbread" type="large" />
      <Card detail="sesame snaps chocolate" type="medium" />
      <Card detail="Oat cake" type="large" />
      <Card detail="jujubes cheesecake" type="full" />
      <Card detail="Dragée pudding brownie" type="medium" />
      <Card detail="Oat cake" type="large" />
      <Card detail="powder toffee" />
      <Card detail="pudding cheesecake" type="medium" />
      <Card detail="toffee bear claw" type="large" />
      <Card detail="cake cookie croissant" />
      <Card detail="liquorice sweet roll" type="medium" />
      <Card detail="chocolate marzipan" type="medium" />
      <Card detail="danish dessert lollipop" type="large" />
      <Card detail="sugar plum dragée" /> */}
    </Layout>
  );
};
export default memo(PhotoGallery);
