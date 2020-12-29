import React, { memo, useState, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import TweenOne from "rc-tween-one";
import { NavLink } from "react-router-dom";
import "./index.less";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import checkLogin from "utils/checkLogin";

const Header = (props) => {
  const { isMobile } = useSelector((state) => ({
    isMobile: state.getIn(["global", "isMobile"]),
    shallowEqual,
  }));

  const [phoneOpen, setPhoneOpen] = useState(false);
  const moment = phoneOpen === undefined ? 300 : null;

  const handleLogin = () => {
    const { setShowLogin } = props;
    setShowLogin(true);
    // console.log('setShowLogin',login )
  };

  return (
    <TweenOne
      component="header"
      animation={{ opacity: 0, type: "from" }}
      className={"header2 home-page-wrapper"}
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

        {/* {!isMobile && (
          <div className={"avatar"}>
            <Avatar size={36} icon={<UserOutlined />} />
          </div>
        )} */}
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
          {!checkLogin() ? (
            <span className={"menu-item"} onClick={handleLogin}>
              Login
            </span>
          ) : (
            <span className={"menu-item"}>
              <Avatar size={36} icon={<UserOutlined />} />
            </span>
          )}
          <NavLink to={"/demo"} className={"menu-item"}>
            Demo
          </NavLink>
          <NavLink to={"/charts"} className={"menu-item"}>
            Charts
          </NavLink>
          <NavLink to={"/profile"} className={"menu-item"}>
            Profile
          </NavLink>
        </TweenOne>
      </div>
    </TweenOne>
  );
};

export default memo(Header);
