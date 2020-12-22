import React, { memo, useState, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {changeShowLoginAction} from '../../store/global/actionCreators'
import TweenOne from "rc-tween-one";
import { NavLink } from "react-router-dom";
import "./index.less";

const Header = (props) => {
  const dispatch=useDispatch()
  const { isMobile } = useSelector((state) => ({
    isMobile: state.getIn(["global", "isMobile"]),
    shallowEqual,
  }));

  const [phoneOpen, setPhoneOpen] = useState(false);
  const moment = phoneOpen === undefined ? 300 : null;

  const handleLogin = () => {
    dispatch(changeShowLoginAction(true))
    // console.log('setShowLogin',login )
  };

  return (
    <TweenOne
      component="header"
      animation={{ opacity: 0, type: "from" }}
      className={"header2 home-page-wrapper"}
      {...props}
    >
      <div className={`home-page${phoneOpen ? " open" : ""}`}>
        <TweenOne
          animation={{ x: -30, type: "from", ease: "easeOutQuad" }}
          className={"header2-logo"}
        >
          <NavLink
            to={"/"}
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "20px",
              textDecoration: "none",
            }}
          >
            CamusBlog
          </NavLink>
        </TweenOne>
        {isMobile && (
          <div
            className={"header2-mobile-menu"}
            onClick={() => {
              setPhoneOpen(!phoneOpen);
            }}
          >
            <em />
            <em />
            <em />
          </div>
        )}
        <TweenOne
          className={"header2-menu"}
          animation={
            isMobile
              ? {
                  height: 0,
                  duration: 300,
                  onComplete: (e) => {
                    if (phoneOpen) {
                      e.target.style.height = "auto";
                    }
                  },
                  ease: "easeInOutQuad",
                }
              : null
          }
          moment={moment}
          reverse={!!phoneOpen}
        >
          <span className={"menu-item"} onClick={() => handleLogin()}>
            Login
          </span>
          <NavLink to={"/demo"} className={"menu-item"}>
            Demo
          </NavLink>
          <NavLink to={"/charts"} className={"menu-item"}>
            Charts
          </NavLink>
        </TweenOne>
      </div>
    </TweenOne>
  );
};

export default memo(Header);
