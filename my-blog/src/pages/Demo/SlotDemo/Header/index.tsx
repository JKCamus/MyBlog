import React from "react";
import styled from "styled-components";

interface IProps {
  className?: string;
}
const Header: React.FC<IProps> = ({ children }) => {
  return (
    <HeaderWrapper>
      <div>
        <div>header</div>
        {children}
      </div>
    </HeaderWrapper>
  );
};
export default Header;

const HeaderWrapper = styled.div`
  background-color: lightblue;
`;
