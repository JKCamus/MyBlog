/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2021-09-15 19:17:29
 * @LastEditors: camus
 * @LastEditTime: 2021-10-14 17:43:04
 */
import React from 'react';
import SlotDemo from './SlotDemo';

const TestHeader = () => {
  return <div>TestHeader Slot Consumer</div>;
};
const TestFooter = () => {
  return <div>TestFooter Slot Consumer</div>;
};

const SlotConsumer: React.FC = (props) => {
  return (
    <div>
      <SlotDemo header={<TestHeader />} footer={<TestFooter />} />
    </div>
  );
};
export default SlotConsumer;
