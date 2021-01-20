import styled, { createGlobalStyle } from "styled-components";

export const BLayout = styled.div`
  background-color: rgba(232, 232, 232, 0.3);
  width: 100vw;
  height: 100vh;
  z-index: 5;
  position: fixed;
`;

export const Root = styled.div`
  z-index: 5;
  /* background-color: #222; */
  background-color: #001529;
  border-radius: 15px;
  height: 550px;
  width: 330px;
  position: fixed;
  overflow: hidden;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 25%;
  /* 手机端缩小登录 */
  ${(props) =>
    props.isMobile
      ? `
      position:relative;
      transform: scale(0.8) translate(-62.5%,0);
      top: 0;

    `
      : null}
  &::after {
    content: "";
    opacity: 0.8;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-repeat: no-repeat;
    background-position: left bottom;
    background-size: 500px;
    /* background-image: url("https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bf884ad570b50659c5fa2dc2cfb20ecf&auto=format&fit=crop&w=1000&q=100"); */
  }

  .closeLogin {
    z-index: 6;
    color: #fff;
    right: 13px;
    top: 13px;
    position: absolute;
    font-size: 16px;
    &:hover {
      background-color: #43a3ef;
      border-radius: 8px;
      padding: 1px;
    }
  }
`;

export const SignupContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 65%;
  z-index: 5;
  transition: all 0.3s ease;
  ${(props) =>
    props.slideUp === true
      ? `top: 5%;
      -webkit-transform: translate(-50%, 0%);
      -webkit-transition: all 0.3s ease;`
      : null};
`;

export const SignupForm = styled.div`
  border-radius: 15px;
  background-color: #fff;
  overflow: hidden;
  margin-top: 50px;
  opacity: 1;
  visibility: visible;
  transition: all 0.3s ease;

  ${(props) =>
    props.slideUp === true
      ? `
    opacity: 0;
    visibility: hidden;
  `
      : null}
`;

export const SignupButton = styled.button`
  background-color: rgba(0, 0, 0, 0.4);
  color: rgba(256, 256, 256, 0.7);
  border: 0;
  border-radius: 15px;
  display: block;
  margin: 30px auto;
  padding: 15px 45px;
  width: 100%;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  opacity: 1;
  visibility: visible;
  transition: all 0.3s ease;

  &:hover {
    transition: all 0.3s ease;
    /* background-color: rgba(0, 0, 0, 0.8); */
    color: #fff;
    background-color: #43a3ef;
  }

  ${(props) =>
    props.slideUp === true
      ? `
    opacity: 0;
    visibility: hidden;
    `
      : null}
`;

export const SignupFormTitle = styled.h2`
  color: #fff;
  font-size: 1.7em;
  text-align: center;
  ${(props) =>
    props.slideUp === true
      ? `
    font-size: 1em;
    cursor: pointer;
  `
      : null}
`;

export const SignupInput = styled.input`
  border: 0;
  outline: none;
  box-shadow: none;
  display: block;
  height: 40px;
  line-height: 30px;
  padding: 8px 15px;
  border-bottom: 1px solid #eee;
  width: 100%;
  font-size: 12px;

  &:last-child {
    border-bottom: 0;
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
  }
`;

// ===================================================== //
export const LoginContainer = styled.div`
  position: absolute;
  top: 20%;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 5;
  transition: all 0.3s ease;

  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: -20px;
    transform: translate(-50%, 0);
    background-color: #fff;
    width: 200%;
    height: 250px;
    border-radius: 50%;
    z-index: 4;
    transition: all 0.3s ease;
  }

  ${(props) =>
    props.slideUp === false
      ? `top: 90%;
   -webkit-transition: all 0.3s ease;`
      : null}
`;

export const CenterWrapper = styled.div`
  position: absolute;
  top: calc(50% - 10%);
  left: 50%;
  transform: translate(-50%, -50%);
  width: 65%;
  z-index: 5;
  transition: all 0.3s ease;

  ${(props) =>
    props.slideUp === false
      ? `top: 10%;
   transform: translate(-50%, 0%);
   transition: all 0.3s ease;`
      : null}
`;

export const LoginTitle = styled.h2`
  color: #000;
  font-size: 1.7em;
  text-align: center;

  ${(props) =>
    props.slideUp === false
      ? `font-size: 1em;
   margin: 0;
   padding: 0;
   cursor: pointer;
   transition: all 0.3s ease;`
      : null}
`;

export const LoginFormContainer = styled.div`
  border-radius: 15px;
  background-color: #fff;
  border: 1px solid #eee;
  overflow: hidden;
  margin-top: 50px;
  opacity: 1;
  visibility: visible;
  transition: all 0.3s ease;

  ${(props) =>
    props.slideUp === false
      ? `opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;`
      : null}
`;

export const LoginInput = styled.input`
  border: 0;
  outline: none;
  box-shadow: none;
  display: block;
  height: 40px;
  line-height: 30px;
  padding: 8px 15px;
  border-bottom: 1px solid #eee;
  width: 100%;
  font-size: 12px;
  &:last-child {
    border-bottom: 0;
  }
  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
  }
`;

export const LoginButton = styled.button`
  /* background-color: #6b92a4; */
  background-color: #6b92ca;

  /* color: rgba(256, 256, 256, 0.7); */

  color: #ccc;
  border: 0;
  border-radius: 15px;
  display: block;
  margin: 30px auto;
  padding: 15px 45px;
  width: 100%;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  opacity: 1;
  visibility: visible;
  transition: all 0.3s ease;
  &:hover {
    transition: all 0.3s ease;
    /* background-color: rgba(0, 0, 0, 0.8); */
    background-color: #43a3ef;
    color: #fff;
  }

  ${(props) =>
    props.slideUp === false
      ? `opacity: 0;
   visibility: hidden;
   transition: all 0.3s ease;`
      : null}
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
