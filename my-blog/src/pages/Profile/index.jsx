import React, { memo,useState } from "react";
import { Menu,Button } from "antd";
import {
  NavLink,
  HashRouter,
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import AuthorizedRoute from "@/router/AuthorizedRoute";
import UploadDemo from "@/pages/Profile/pictureManage/upload";
import GeneralList from "./pictureManage/General";
import { ProfileWrapper } from "./styles";

const Profile = (props) => {
  const [collapsed, setCollapsed] = useState(false)
  // console.log("props", props);
  const { SubMenu } = Menu;
  const handleClick = (e) => {
    // console.log("sss", e);
  };
const handleCollapse = (params) => {
  setCollapsed(!collapsed)
}
  return (
    <ProfileWrapper>
      <div className={"sideMenu"}>
        <Menu
          onClick={handleClick}
          style={{ width:'256px', height: "100%" }}
          defaultSelectedKeys={["2"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          inlineCollapsed={collapsed}
        >
          <SubMenu key="sub1" icon={<MailOutlined />} title="管理">
            <Menu.ItemGroup key="g1" title="照片管理">
              <Menu.Item key="2">
                <NavLink to={"/profile/general"}>图片概览</NavLink>
              </Menu.Item>
              <Menu.Item key="1">
                <NavLink to={"/profile/upload"}>上传，废弃</NavLink>
              </Menu.Item>
            </Menu.ItemGroup>
            {/* <Menu.ItemGroup key="g2" title="Item 2">
              <Menu.Item key="3">Option 3</Menu.Item>
              <Menu.Item key="4">Option 4</Menu.Item>
            </Menu.ItemGroup> */}
          </SubMenu>
          {/* <SubMenu
            key="sub2"
            icon={<AppstoreOutlined />}
            title="Navigation Two"
          >
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu
            key="sub4"
            icon={<SettingOutlined />}
            title="Navigation Three"
          >
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu> */}
        </Menu>
      </div>
      <div className="content">
        <Switch>
          <AuthorizedRoute
            path="/profile/upload"
            exact
            key={"/profile/upload"}
            component={UploadDemo}
            user={{ role: ["user"] }}
          ></AuthorizedRoute>
          <AuthorizedRoute
            path="/profile/general"
            exact
            key={"/profile/general"}
            component={GeneralList}
            user={{ role: ["user"] }}
          ></AuthorizedRoute>
        </Switch>
      </div>
    </ProfileWrapper>
  );
};
export default memo(Profile);
