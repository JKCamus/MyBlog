import React, { memo, useState, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import TweenOne from "rc-tween-one";
import { NavLink } from "react-router-dom";
import "./index.less";
import { Avatar, Menu, Dropdown } from "antd";

import { UserOutlined } from "@ant-design/icons";
import checkLogin from "utils/checkLogin";

const Header = (props) => {
  const { Item, SubMenu } = Menu;

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

  const menu = (
    <Menu theme="dark">
      <Menu.Item className={"dropDownMenu"}>
        <NavLink
          to={"/profile"}
          // onClick={() => setPhoneOpen(!phoneOpen)}
        >
          Profile
        </NavLink>
      </Menu.Item>
      <Menu.Item className={"dropDownMenu"}>
        <span>Logout</span>
      </Menu.Item>
    </Menu>
  );
  return (
    <TweenOne
      component="header"
      animation={{ opacity: 0, type: "from" }}
      className={"header home-page-wrapper"}
    >
      <div className={`home-page${phoneOpen ? " open" : ""}`}>
        <TweenOne
          animation={{ x: -30, type: "from", ease: "easeOutQuad" }}
          className={"header-logo"}
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
            className={"header-mobile-menu"}
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
          className={"header-menu"}
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
            // <Dropdown
            //   overlay={menu}
            //   // overlayClassName={"avatarStyle"}
            //   theme="dark"
            //   trigger={["click"]}
            //   className={"menu-item"}
            //   // overlayStyle={{backgroundColor:'red'}}
            // >
            //   <div>
            //     <Avatar size={36} onClick={(e) => e.preventDefault()} />
            //   </div>
            // </Dropdown>
            <Menu
              theme="dark"
              className={`${isMobile ? "" : "menu-item"}`}
              mode={isMobile ? "inline" : "horizontal"}
              // overflowedIndicator={<UserOutlined />}
            >
              <SubMenu
                key="sub1"
                // title="Navigation One"
                icon={<UserOutlined />}
              >
                <Menu.Item key="1">Option 1</Menu.Item>
                <Menu.Item key="2">Option 2</Menu.Item>
              </SubMenu>
            </Menu>
          )}

          <NavLink
            to={"/demo"}
            className={"menu-item"}
            onClick={() => setPhoneOpen(!phoneOpen)}
          >
            Demo
          </NavLink>
          <NavLink
            to={"/charts"}
            className={"menu-item"}
            onClick={() => setPhoneOpen(!phoneOpen)}
          >
            Charts
          </NavLink>
          <NavLink
            to={"/profile"}
            className={"menu-item"}
            onClick={() => setPhoneOpen(!phoneOpen)}
          >
            Profile
          </NavLink>

          {/* {!checkLogin() ? (
            <span className={"menu-item"} onClick={handleLogin}>
              Login
            </span>
          ) : (
            <span className={"menu-item"}>
              <Avatar size={36} icon={<UserOutlined />} />
            </span>
          )}

          <NavLink
            to={"/demo"}
            className={"menu-item"}
            onClick={() => setPhoneOpen(!phoneOpen)}
          >
            Demo
          </NavLink>
          <NavLink
            to={"/charts"}
            className={"menu-item"}
            onClick={() => setPhoneOpen(!phoneOpen)}
          >
            Charts
          </NavLink>
          <NavLink
            to={"/profile"}
            className={"menu-item"}
            onClick={() => setPhoneOpen(!phoneOpen)}
          >
            Profile
          </NavLink> */}
        </TweenOne>
      </div>
    </TweenOne>
  );
};

export default memo(Header);
