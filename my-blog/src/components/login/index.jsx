import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import * as Components from "./Components.js";
import useForm from "./useForm";

const Login = () => {
  const toggleLogin = React.useRef(null);
  const toggleSignup = React.useRef(null);
  const signupForm = React.useRef(null);
  const loginForm = React.useRef(null);
  const [slideUp, toggle] = React.useState(false);

  const { isMobile } = useSelector((state) => ({
    isMobile: state.getIn(["global", "isMobile"]),
    shallowEqual,
  }));

  const [signupValues, signupFormChange, resetSignupForm] = useForm({
    name: "",
    email: "",
    password: "",
  });

  const [signinValues, signinFormChange, resetSigninForm] = useForm({
    email: "",
    password: "",
  });

  const handleSignup = () => {
    // console.log(signupValues);
    resetSignupForm();
  };

  const handleSignin = () => {
    // console.log(signinValues);
    resetSigninForm();
  };

  return (
    <React.Fragment>
      <Components.BLayout >
        <Components.Root isMobile={isMobile}>
          <Components.SignupContainer signUp ref={signupForm} slideUp={slideUp}>
            <Components.SignupFormTitle
              ref={toggleSignup}
              onClick={() => {
                toggle(false);
                resetSignupForm();
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
                value={signupValues.name}
                onChange={signupFormChange}
              />
              <Components.SignupInput
                type="email"
                placeholder="Email"
                name="email"
                value={signupValues.email}
                onChange={signupFormChange}
              />
              <Components.SignupInput
                type="password"
                placeholder="Password"
                name="password"
                value={signupValues.password}
                onChange={signupFormChange}
              />
            </Components.SignupForm>
            <Components.SignupButton
              slideUp={slideUp}
              onClick={() => handleSignup()}
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
                  resetSigninForm();
                }}
              >
                Login
              </Components.LoginTitle>
              <Components.LoginFormContainer slideUp={slideUp}>
                <Components.LoginInput
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={signinValues.email}
                  onChange={signinFormChange}
                />
                <Components.LoginInput
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={signinValues.password}
                  onChange={signinFormChange}
                />
              </Components.LoginFormContainer>
              <Components.LoginButton
                slideUp={slideUp}
                onClick={() => handleSignin()}
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
