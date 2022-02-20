/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2021-09-11 09:48:14
 * @LastEditors: camus
 * @LastEditTime: 2021-09-13 17:39:10
 */
import React, { useState } from 'react';
import SelectPets from './SelectPets';

const AsyncUnMount: React.FC = (props) => {
  const [showPets, setShowPets] = useState(true);

  return (
    <div>
      <button onClick={() => setShowPets((state) => !state)}>{showPets ? 'Unmounted' : 'Mounted'}</button>
      {showPets && <SelectPets />}
    </div>
  );
};
export default AsyncUnMount;
