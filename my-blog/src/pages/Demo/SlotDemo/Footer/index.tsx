import React from 'react';

import styled from 'styled-components';

interface IProps {
  className?: string;
}
const Footer: React.FC<IProps> = ({ children }) => {
  return (
    <FooterWrapper>
      <div>footer</div>
      {children}
    </FooterWrapper>
  );
};
export default Footer;

const FooterWrapper = styled.div`
  background-color: lightpink;
`;
