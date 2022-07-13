import React from "react";
import { Msg } from "../type";
import { Button } from "antd";

interface IProps {
  className?: string;
  msgData: Msg; // 单卡片数据
  currentMsg: Msg;
  msgDatum: Msg[]; // 全卡片数据
  closeCard: (id: number) => void;
  moveTop?: (id: number) => void;
  replaceTop: (id: number) => void;
}

const NoticeCardContainer: React.FC<IProps> = ({ msgData, closeCard, children }) => {
  const msgId = msgData?.id;

  const handleCloseCard = () => {
    closeCard(msgId);
  };
  return (
    <div>
      <Button onClick={handleCloseCard}>close</Button>
      {children}
    </div>
  );
};

const NoticeCard: React.FC<IProps> = (props) => {
  const { msgData } = props;

  return (
    <NoticeCardContainer {...props}>
      <div>
        <p>{msgData.name}</p>
        <p>{msgData.id}</p>
        <p>{msgData.count}</p>
      </div>
    </NoticeCardContainer>
  );
};

export default NoticeCard;
