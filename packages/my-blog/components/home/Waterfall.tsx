import { useDebounceFn, useLatest, useReactive, useSize } from "ahooks"
import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import rafThrottle from "utils/rafThrottle"
import { ICardItem, ICardPos, IWaterFallProps } from "./types"


const Waterfall: React.FC<IWaterFallProps> = ({ gap, pageSize, request, bottom, children }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [page, setPage] = useState(1)
  const [column, setColumn] = useState(4)
  const [columnHeight, setColumnHeight] = useState(new Array(column).fill(0) as number[])
  const [cardList, setCardList] = useState<ICardItem[]>([])
  const [cardPos, setCardPos] = useState<ICardPos[]>([])

  const pageRef = useLatest(page)
  const containerSize = useSize(containerRef)

  const cardState = useReactive({
    isFinish: false,
    loading: false,
    page: 1,
    cardWidth: 0,
    cardList: [] as ICardItem[],
    cardPos: [] as ICardPos[],
    columnHeight: new Array(column).fill(0) as number[],
  })

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    if (containerSize?.width) {
      changeColumn(containerSize?.width)
    }
  }, [containerSize?.width])

  useEffect(() => {
    handleResize()
  }, [containerSize?.width])

  const changeColumn = (width: number) => {
    if (width > 960) {
      setColumn(4)
    } else if (width >= 690 && width < 960) {
      setColumn(3)
    } else if (width >= 500 && width < 690) {
      setColumn(2)
    } else {
      setColumn(1)
    }
  }

  const { run: handleResize } = useDebounceFn(
    () => {
      if (!containerRef.current) return
      const containerWidth = containerRef.current.clientWidth
      cardState.cardWidth = (containerWidth - gap * (column - 1)) / column
      const currentColumnHeight = new Array(column).fill(0)
      computedCardPos(cardList, cardList.length, [], currentColumnHeight)
    },
    {
      wait: 300,
    }
  )

  const init = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth
      cardState.cardWidth = (containerWidth - gap * (column - 1)) / column
      getCardList(page, pageSize)
    }
  }

  const getCardList = async (page: number, pageSize: number) => {
    if (cardState.isFinish) return
    cardState.loading = true
    const list = await request(page, pageSize)
    setPage(page + 1)
    if (!list.length) {
      cardState.isFinish = true
      return
    }
    const currentList = [...cardList, ...list]
    const currentCardPos = [...cardPos]
    const currentColumnHeight = [...columnHeight]
    setCardList(currentList)
    computedCardPos(list, currentList.length, currentCardPos, currentColumnHeight)
    cardState.loading = false
  }

  const computedCardPos = (
    list: ICardItem[],
    currentLength,
    currentCardPos,
    currentColumnHeight
  ) => {
    list.forEach((item, index) => {
      const cardHeight = Math.floor((item.height * cardState.cardWidth) / item.width)
      let minHeight = Infinity
      let minIndex = -1
      currentColumnHeight.forEach((height, idx) => {
        if (height < minHeight) {
          minHeight = height
          minIndex = idx
        }
      })

      if (index < column && currentLength <= pageSize) {
        currentCardPos.push({
          width: cardState.cardWidth,
          height: cardHeight,
          x: index % column !== 0 ? index * (cardState.cardWidth + gap) : 0,
          y: 0,
        })
        currentColumnHeight[index] = cardHeight + gap
      } else {
        currentCardPos.push({
          width: cardState.cardWidth,
          height: cardHeight,
          x: minIndex % column !== 0 ? minIndex * (cardState.cardWidth + gap) : 0,
          y: minHeight,
        })
        currentColumnHeight[minIndex] += cardHeight + gap
      }
    })
    setCardPos(currentCardPos)
    setColumnHeight(currentColumnHeight)
  }

  const handleScroll = rafThrottle(() => {
    if (!containerRef.current) return
    const { scrollTop, clientHeight, scrollHeight } = containerRef.current
    const currentBottom = scrollHeight - clientHeight - scrollTop

    if (currentBottom <= bottom) {
      !cardState.loading && getCardList(pageRef.current, pageSize)
    }
  })

  return (
    <GalleryContainer ref={containerRef} onScroll={handleScroll}>
      <div className="pic-waterfall-list">
        {cardList.map((item, index) => (
          <div
            key={item.id}
            className="pic-waterfall-item"
            style={{
              width: `${cardPos[index]?.width}px`,
              height: `${cardPos[index]?.height}px`,
              transform: `translate3d(${cardPos[index]?.x}px, ${cardPos[index]?.y}px, 0)`,
            }}
          >
            {children(item)}
          </div>
        ))}
      </div>
    </GalleryContainer>
  )
}


export default Waterfall

const GalleryContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  .pic-waterfall {
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
