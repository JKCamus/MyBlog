'use client'
import { createGlobalStyle } from 'styled-components'
import Banner from '../components/home/Banner'
import PictureWaterFall from '../components/home/PictureWaterFall'
export default function Page() {
  return (
    <>
      <GlobalStyle></GlobalStyle>
      <Banner></Banner>
      <PictureWaterFall></PictureWaterFall>
    </>
  )
}

const GlobalStyle = createGlobalStyle`
.root-container{
  max-width:100vw !important;
}

header{
  margin: 0 1rem !important;
}

@media (min-width: 640px) and (max-width: 1280px) {
  header{
    margin: 0 1.5rem !important;
  }
}

@media (min-width: 1280px) {
  header{
    margin: 0 5vw !important;
  }
}

@media (max-width: 1280px) {
  .root-container {
    padding: 0;
  }
}

`
