/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2021-09-29 17:35:51
 * @LastEditors: camus
 * @LastEditTime: 2021-09-29 17:50:13
 */
import { Button } from 'antd';
import React, { useReducer } from 'react';

enum OrderEnum {
  order = 'order',
  random = 'random',
  loop = 'loop',
}

const reducer = (state: OrderEnum) => {
  switch (state) {
    case OrderEnum.order:
      console.log('切换到顺序模式');
      return OrderEnum.random;
    case OrderEnum.random:
      console.log('切换到循环模式');
      return OrderEnum.loop;
    case OrderEnum.loop:
      console.log('切换到随机模式');
      return OrderEnum.order;
  }
};

const ReducerDemo: React.FC = (props) => {
  const [mode, dispatch] = useReducer(reducer, OrderEnum.order);

  return (
    <div>
      <Button onClick={dispatch}>切换模式</Button>
      <div>{mode}</div>
    </div>
  );
};
export default ReducerDemo;
