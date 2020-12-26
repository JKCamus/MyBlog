import React, { useRef, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import * as Components from "./Components.js";

import useForm from "./useForm";
import { login } from "services/login.js";
import { loginAction } from "store/global/actionCreators";

const Login = (props) => {
  const toggleLogin = useRef(null);
  const toggleSignUp = useRef(null);
  const signUpForm = useRef(null);
  const loginForm = useRef(null);
  const [slideUp, toggle] = useState(true);
  const dispatch = useDispatch();
  const { setShowLogin } = props;
  const { isMobile } = useSelector((state) => ({
    isMobile: state.getIn(["global", "isMobile"]),
    shallowEqual,
  }));

  const [signUpValues, signUpFormChange, resetSignUpForm] = useForm({
    name: "",
    email: "",
    password: "",
  });

  const [signInValues, signInFormChange, resetSignInForm] = useForm({
    name: "",
    password: "",
  });

  const handleSignUp = () => {
    // console.log(signUpValues);
    resetSignUpForm();
  };

  const handleSignIn = async () => {
    try {
   const a=  await dispatch(loginAction(signInValues));
   console.log('sss', a)
      // resetSignInForm();
    } catch (error) {
      message.error(error);
    }
  };

  const handleCancel = () => {
    setShowLogin(false);
  };
  return (
    <React.Fragment>
      <Components.BLayout>
        <Components.Root isMobile={isMobile}>
          <CloseOutlined className={"closeLogin"} onClick={handleCancel} />
          <Components.SignupContainer signUp ref={signUpForm} slideUp={slideUp}>
            <Components.SignupFormTitle
              ref={toggleSignUp}
              onClick={() => {
                toggle(false);
                resetSignUpForm();
              }}
              slideUp={slideUp}
            >
              Sign Up
            </Components.SignupFormTitle>
            <Components.SignupForm slideUp={slideUp}>
              <Components.SignupInput
                type="text"
                placeholder="Name"
                name="name"
                value={signUpValues.name}
                onChange={signUpFormChange}
              />
              <Components.SignupInput
                type="email"
                placeholder="Email"
                name="email"
                value={signUpValues.email}
                onChange={signUpFormChange}
              />
              <Components.SignupInput
                type="password"
                placeholder="Password"
                name="password"
                value={signUpValues.password}
                onChange={signUpFormChange}
              />
            </Components.SignupForm>
            <Components.SignupButton
              slideUp={slideUp}
              onClick={() => handleSignUp()}
            >
              Sign Up
            </Components.SignupButton>
          </Components.SignupContainer>
          <Components.LoginContainer ref={loginForm} slideUp={slideUp}>
            <Components.CenterWrapper slideUp={slideUp}>
              <Components.LoginTitle
                ref={toggleLogin}
                slideUp={slideUp}
                onClick={() => {
                  toggle(true);
                  resetSignInForm();
                }}
              >
                Login
              </Components.LoginTitle>
              <Components.LoginFormContainer slideUp={slideUp}>
                <Components.LoginInput
                  type="name"
                  placeholder="name"
                  name="name"
                  value={signInValues.name}
                  onChange={signInFormChange}
                />
                <Components.LoginInput
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={signInValues.password}
                  onChange={signInFormChange}
                />
              </Components.LoginFormContainer>
              <Components.LoginButton
                slideUp={slideUp}
                onClick={() => handleSignIn()}
              >
                Login
              </Components.LoginButton>
            </Components.CenterWrapper>
          </Components.LoginContainer>
        </Components.Root>
      </Components.BLayout>
    </React.Fragment>
  );
};

export default Login;
