import React, { useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import TweenOne from "rc-tween-one";
import { NavLink } from "react-router-dom";
import "./index.less";
import { Avatar, Menu, Dropdown, Popconfirm } from "antd";
import { getUerInfo, removeToken } from "utils/token";
import { UserOutlined } from "@ant-design/icons";
import checkLogin from "utils/checkLogin";
import { BASE_URL } from "services/config";
import checkRouterPermission from "utils/checkRouterPermission";

const Header = (props) => {
  const history = useHistory();
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
  };

  const handleLoginOut = (params) => {
    removeToken();
    checkRouterPermission(props.location) && history.push("/home");
    setPhoneOpen(!phoneOpen);
  };
  // const _getUserAvatar = async (userId) => {
  //   try {
  //     const avatarUrl = await getUserAvatar(userId);
  //     console.log("avatar", avatarUrl);
  //   } catch (error) {
  //     console.log("", error);
  //   }
  // };
  const renderMenu = (params) => {
    const userInfo = getUerInfo();
    const menu = (
      // pc
      <Menu theme="dark" className="menuD">
        <Menu.Item className={"dropDownMenu"}>
          <NavLink to={"/profile"}>Profile</NavLink>
        </Menu.Item>
        <Menu.Item className={"dropDownMenu"}>
          <Popconfirm
            title="Are you sure to logout ?"
            onConfirm={handleLoginOut}
            okText="Yes"
            cancelText="No"
          >
            <span>Logout</span>
          </Popconfirm>
        </Menu.Item>
      </Menu>
    );
    return isMobile ? (
      <Menu mode={"inline"} theme={"dark"}>
        <SubMenu icon={<UserOutlined />} title={userInfo.name} style={{ color: "#fff" }}>
          <Menu.Item className={"dropDownMenu"} onClick={() => setPhoneOpen(!phoneOpen)}>
            <NavLink to={"/profile"}>Profile</NavLink>
          </Menu.Item>
          <Menu.Item className={"dropDownMenu"}>
            <Popconfirm
              title="Are you sure to logout ?"
              onConfirm={handleLoginOut}
              okText="Yes"
              cancelText="No"
            >
              <span>Logout</span>
            </Popconfirm>
          </Menu.Item>
        </SubMenu>
      </Menu>
    ) : (
      <Dropdown overlay={menu} theme="dark" trigger={["click"]} className={"menu-item"}>
        <div>
          <Avatar
            src={`${BASE_URL}/users/${userInfo.id}/avatar`}
            size={36}
            onClick={(e) => e.preventDefault()}
          />
        </div>
      </Dropdown>
    );
  };

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
              padding: 0,
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            {/* CamusBlog */}
            DemoTest
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
            renderMenu()
          )}
          <NavLink to={"/notes"} className={"menu-item"} onClick={() => setPhoneOpen(!phoneOpen)}>
            Notes
          </NavLink>
          <NavLink to={"/charts"} className={"menu-item"} onClick={() => setPhoneOpen(!phoneOpen)}>
            Charts
          </NavLink>
          <NavLink to={"/demo"} className={"menu-item"} onClick={() => setPhoneOpen(!phoneOpen)}>
            Demo
          </NavLink>
        </TweenOne>
      </div>
    </TweenOne>
  );
};

export default withRouter(Header);
