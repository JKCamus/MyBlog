
export interface IWaterFallProps {
  gap: number;
  bottom: number;
  pageSize: number;
  request: (page: number, pageSize: number) => Promise<ICardItem[]>;
  children:(item: ICardItem) => React.ReactNode;

}

export interface ICardItem {
  id: string | number;
  url: string;
  width: number;
  height: number;
  [key: string]: any;
}

export interface ICardPos {
  width: number;
  height: number;
  x: number;
  y: number;
}

export interface IBookCardPos {
  width: number;
  imageHeight: number;
  cardHeight: number;
  x: number;
  y: number;
}
