/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2021-09-13 16:36:57
 * @LastEditors: camus
 * @LastEditTime: 2021-09-13 17:36:43
 */
import React from 'react';

interface IProps {
  name: string;
  voice: string;
  avatar: string;
}

const Pets: React.FC<IProps> = ({ name, voice, avatar }) => {
  return (
    <div>
      <h2>{name}</h2>
      <div>{`Voice - ${voice}`}</div>
      <div>{avatar}</div>
    </div>
  );
};

export default Pets;
