import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import * as Components from "./Components.js";

import useForm from "./useForm";
import { loginAction } from "store/global/actionCreators";
import QueueAnim from "rc-queue-anim";

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

  // useEffect(() => {
  //   document.body.addEventListener("keyup", (e) => {
  //     if (window.event) {
  //       e = window.event;
  //     }
  //     e.key === "Enter" && handleSignIn();
  //     // console.log('sss', e)
  //   });
  //   return () => {
  //     document.body.removeEventListener("keyup", () => {});
  //   };
  // }, []);

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
    message.warn('抱歉，暂不开发注册')
    resetSignUpForm();
  };
  const handleSignIn = () => {
    dispatch(
      loginAction(signInValues, (status) => {
        setShowLogin(status);
      })
    );
  };

  const handleCancel = () => {
    setShowLogin(false);
  };
  return (
    <React.Fragment>
      <Components.BLayout>
        <QueueAnim
          className="demo-content"
          key="demo"
          animConfig={[
            { opacity: [1, 0], translateY: [0, 50] },
            { opacity: [1, 0], translateY: [0, -50] },
          ]}
        >
          <Components.Root key="root" isMobile={isMobile}>
            <CloseOutlined className={"closeLogin"} onClick={handleCancel} />
            <Components.SignupContainer
              signUp
              ref={signUpForm}
              slideUp={slideUp}
            >
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
        </QueueAnim>
      </Components.BLayout>
    </React.Fragment>
  );
};

export default Login;
