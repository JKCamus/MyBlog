import React, { memo, useState, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import TweenOne from "rc-tween-one";
import { NavLink } from "react-router-dom";
import "./index.less";

const Header = (props) => {
  const { isMobile } = useSelector((state) => ({
    isMobile: state.getIn(["global", "isMobile"]),
    shallowEqual,
  }));
  const [phoneOpen, setPhoneOpen] = useState(false);
  const moment = phoneOpen === undefined ? 300 : null;
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
            style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}
          >
            CamusBlog
          </NavLink>
        </TweenOne>
        {isMobile && (
          <div
            // {...dataSource.mobileMenu}
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
          <a to={"#"} className={"menu-item"}>
            Login
          </a>
          <NavLink to={"/demo"} className={"menu-item"}>
            Demo
          </NavLink>
          <a to={"#"} className={"menu-item"}>
            About
          </a>
        </TweenOne>
      </div>
    </TweenOne>
  );
};

export default Header;
