import { Image } from 'antd'
import React, { useMemo, useRef, useState } from 'react'

import { useMount, useReactive } from 'ahooks'
import styled from 'styled-components'
import data1 from './data1.json'
import data2 from './data2.json'
import { ICardItem, ICardPos, IWaterFallProps } from './types'

interface ImgUrl {
  src: string
  width?: string
  height?: string
}
interface CardItem {
  id: string
  src: string // Assuming the image source is in src.
  width: number
  height: number
}

interface CardPosition {
  width: number
  height: number
  x: number
  y: number
}

export function rafThrottle(fn: Function) {
  let lock = false
  return function (this: any, ...args: any[]) {
    if (lock) return
    lock = true
    window.requestAnimationFrame(() => {
      fn.apply(this, args)
      lock = false
    })
  }
}

export function debounce(fn: Function, delay = 200) {
  let timer: any = null
  return function (this: any, ...args: any[]) {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

const Waterfall: React.FC<IWaterFallProps> = ({ gap, pageSize, request, column, children }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [page, setPage] = useState(1)
  const [columnHeight, setColumnHeight] = useState(new Array(column).fill(0) as number[])
  const [cardList, setCardList] = useState<ICardItem[]>([])
  const cardState = useReactive({
    isFinish: false,
    loading: false,
    page: 1,
    cardWidth: 0,
    cardList: [] as ICardItem[],
    cardPos: [] as ICardPos[],
    columnHeight: new Array(column).fill(0) as number[],
  })

  useMount(() => {
    init()
    console.log('----', cardState.cardList)

  })

  // const resizeObserver = new ResizeObserver(() => {
  //   handleResize()
  // })

  const minColumn = useMemo(() => {
    let minHeight = Infinity
    let minIndex = -1

    cardState.columnHeight.forEach((height, index) => {
      if (height < minHeight) {
        minHeight = height
        minIndex = index
      }
    })

    return { minIndex, minHeight }
  }, [cardState.columnHeight])

  const init = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth
      cardState.cardWidth = (containerWidth - gap * (column - 1)) / column
      getCardList(cardState.page, pageSize)

      // resizeObserver.observe(containerRef)
    }
  }

  const getCardList = async (page: number, pageSize: number) => {
    if (cardState.isFinish) return
    cardState.loading = true
    const list = await request(page, pageSize)
    cardState.page++
    if (!list.length) {
      cardState.isFinish = true
      return
    }
    setCardList([...cardList,...list])
    computedCardPos(list)
    cardState.loading = false
  }


  const computedCardPos = (list: ICardItem[]) => {
    list.forEach((item, index) => {
      const cardHeight = Math.floor((item.height * cardState.cardWidth) / item.width)
      if (index < column && cardState.cardList.length <= pageSize) {
        cardState.cardPos.push({
          width: cardState.cardWidth,
          height: cardHeight,
          x: index % column !== 0 ? index * (cardState.cardWidth + gap) : 0,
          y: 0,
        })
        cardState.columnHeight[index] = cardHeight + gap
      } else {
        const { minIndex, minHeight } = minColumn
        cardState.cardPos.push({
          width: cardState.cardWidth,
          height: cardHeight,
          x: minIndex % column !== 0 ? minIndex * (cardState.cardWidth + gap) : 0,
          y: minHeight,
        })
        cardState.columnHeight[minIndex] += cardHeight + gap
      }
    })
  }

  // const handleScroll = rafThrottle(() => {
  //   const { scrollTop, clientHeight, scrollHeight } = containerRef
  //   const bottom = scrollHeight - clientHeight - scrollTop
  //   if (bottom <= bottom) {
  //     !cardState.loading && getCardList(cardState.page, cardState.pageSize)
  //   }
  // })

  return (
    <GalleryContainer>
      <div className="fs-waterfall-container" ref={containerRef}>
        <div className="fs-waterfall-list">
          {cardList.map((item, index) => (
            <div
              key={item.id}
              className="fs-waterfall-item"
              style={{
                width: `${cardState.cardPos[index]?.width}px`,
                height: `${cardState.cardPos[index]?.height}px`,
                transform: `translate3d(${cardState.cardPos[index]?.x}px, ${cardState.cardPos[index]?.y}px, 0)`,
              }}
            >
              {children(item, index)}
            </div>
          ))}
        </div>
      </div>
    </GalleryContainer>
  )
}
const Picture: React.FC = () => {
  const list1: ICardItem[] = data1.data.items.map((i) => ({
    id: i.id,
    url: i.note_card.cover.url_pre,
    width: i.note_card.cover.width,
    height: i.note_card.cover.height,
  }))
  const list2: ICardItem[] = data2.data.items.map((i) => ({
    id: i.id,
    url: i.note_card.cover.url_pre,
    width: i.note_card.cover.width,
    height: i.note_card.cover.height,
  }))
  const list = [...list1, ...list2]

  const colorArr = ['#409eff', '#67c23a', '#e6a23c', '#f56c6c', '#909399']

  const getData = (page: number, pageSize: number) => {
    return new Promise<ICardItem[]>((resolve) => {
      setTimeout(() => {
        resolve(list.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize))
      }, 1000)
    })
  }
  const randomColor = colorArr[Math.floor(Math.random() * colorArr.length)]

  return (
    <PictureContainer>
      <Image.PreviewGroup>
        {/* {imgInfo.map((item, index) => (
          <Image key={index} width={item.width / 10} src={item.src} />
          // <div className="pic-waterfall-list">
          //   <div className="pic-waterfall-item"></div>
          // </div>
        ))} */}

        <Waterfall bottom={20} gap={10} column={4} pageSize={20} request={getData}>
          {(item, index) => (
            <CardBox style={{ background: colorArr[index % (colorArr.length - 1)] }} />
          )}
        </Waterfall>
      </Image.PreviewGroup>
    </PictureContainer>
  )
}

export default Picture

const CardBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 10px;
`
const PictureContainer = styled.div`
  width: 1400px;
  height: 600px;
  border: 1px solid red;
`

const GalleryContainer = styled.div`
  height: 100%;
  .fs-waterfall {
    &-container {
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      overflow-x: hidden;
    }

    &-list {
      width: 100%;
      position: relative;
    }
    &-item {
      position: absolute;
      left: 0;
      top: 0;
      box-sizing: border-box;
      transition: all 0.3s;
    }
  }
`
