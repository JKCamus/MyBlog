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
