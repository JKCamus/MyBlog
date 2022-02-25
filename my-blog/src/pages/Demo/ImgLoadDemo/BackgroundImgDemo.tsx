import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
const BackgroundImgDemo: React.FC = (props) => {
  const node = (
    <div id="test" style={{ width: '100px', height: '100px', backgroundColor: 'blue' }}>
      wocao
    </div>
  );
  const onClick = () => {
    ReactDOM.createPortal(node, document.body);
  };

  console.log('ddddd', document.getElementById('test'));
  return (
    <BgImgWrapper id="bg-img">
      <button onClick={onClick}>@@@@</button>
    </BgImgWrapper>
  );
};
export default BackgroundImgDemo;

const BgImgWrapper = styled.div`
  width: 100px;
  height: 200px;
  background-repeat: no-repeat;
  background-size: cover;
  /* background-image: url('https://imglf5.lf127.net/img/1d9b55a9a5e024b8/ZDlYQzFrdDhybmRiZHA4ZXUwakJVUVA3OW5nclNmQndNY3NHQ1ZSdHFJND0.jpg?imageView&thumbnail=500x0&quality=96&stripmeta=0&type=jpg'); */
`;
