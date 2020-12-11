import React, { memo } from 'react'
import Banner from './Banner'
import PictureWall from './picture-wall'
import Footer from 'components/app-footer/Footer';
const CLayout = (props) => {
    return (
        <>
          <Banner></Banner>
          <PictureWall></PictureWall>
          <Footer></Footer>
        </>
    )
}
export default memo(CLayout);
