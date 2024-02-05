import { Image } from 'antd'
import React from 'react'

import styled, { createGlobalStyle } from 'styled-components'
import Waterfall from './Waterfall'
import { imgInfo } from './data'
import data1 from './data1.json'
import data2 from './data2.json'
import { ICardItem } from './types'


const PictureWaterFall: React.FC = () => {
  const list1: ICardItem[] = data1.data.items.map((i) => ({
    id: i.id,
    url: i.note_card.user.avatar,
    width: i.note_card.cover.width,
    height: i.note_card.cover.height,
  }))
  const list2: ICardItem[] = data2.data.items.map((i) => ({
    id: i.id,
    url: i.note_card.user.avatar,
    width: i.note_card.cover.width,
    height: i.note_card.cover.height,
  }))

  const list3: ICardItem[] = imgInfo.map((item, index) => ({
    ...item,
    id: index,
    url: item.src,
  }))

  const list = [...list3, ...list1, ...list2]

  const getData = (page: number, pageSize: number) => {
    return new Promise<ICardItem[]>((resolve) => {
      setTimeout(() => {
        resolve(list.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize))
      }, 1000)
    })
  }

  return (
    <div>
      <GlobalStyle></GlobalStyle>
      <PictureTitle>
        <h1>All In Life </h1>
        <p>The future belongs to those who believe in the beauty of their dreams.</p>
      </PictureTitle>
      <PictureWaterfallContainer>
        <Image.PreviewGroup
          preview={{
            rootClassName: 'previewCls',
          }}
        >
          <Waterfall bottom={20} gap={10} pageSize={20} request={getData}>
            {(img) => (
              <Image
                key={img.id}
                className='imageItem'
                src={img.url}
                width={'100%'}
                preview={{
                  mask: null,
                }}
              />
            )}
          </Waterfall>
        </Image.PreviewGroup>
      </PictureWaterfallContainer>
    </div>
  )
}

export default PictureWaterFall

const GlobalStyle = createGlobalStyle`
  .previewCls{
    .ant-image-preview-img{
    max-height: 90vh !important;
    }
  }
`

const PictureTitle = styled.div`
  font-size: 1.5rem;
  text-align: center;
  margin: 1rem 0;
  font-family: Arial, Helvetica, sans-serif;
  & > h1 {
    font-weight: bold;
    font-size: 3rem;
  }
`

const PictureWaterfallContainer = styled.div`
  margin: auto;
  width: 92%;
  height: 800px;
  .imageItem{
    border-radius:6px;
  }
`

