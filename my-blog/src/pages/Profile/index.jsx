import React, { memo, useState } from "react";
import { Menu, Button } from "antd";
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
import NotesGeneral from "@/pages/Profile/pictureManage/NotesGeneral";
import GeneralList from "./pictureManage/General";
import { ProfileWrapper } from "./styles";

const Profile = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const { SubMenu } = Menu;
  const handleClick = (e) => {

  };
  const handleCollapse = (params) => {
    setCollapsed(!collapsed);
  };
  return (
    <ProfileWrapper>
      <div className={"sideMenu"}>
        <Menu
          onClick={handleClick}
          style={{ width: "256px", height: "100%" }}
          defaultSelectedKeys={["/profile/general"]}
          defaultOpenKeys={["manage"]}
          mode="inline"
          inlineCollapsed={collapsed}
          selectedKeys={props.location.pathname}
        >
          <SubMenu key="manage" icon={<MailOutlined />} title="管理">
              <Menu.Item key="/profile/general">
                <NavLink to={"/profile/general"}>图片概览</NavLink>
              </Menu.Item>
              <Menu.Item key="/profile/notes-general">
                <NavLink to={"/profile/notes-general"}>笔记概览</NavLink>
              </Menu.Item>
            {/* <Menu.ItemGroup key="g2" title="Item 2">
              <Menu.Item key="3">Option 3</Menu.Item>
              <Menu.Item key="4">Option 4</Menu.Item>
            </Menu.ItemGroup> */}
          </SubMenu>
        </Menu>
      </div>
      <div className="content">
        <Switch>
          <Redirect from="/profile" to="/profile/general" exact />
          <AuthorizedRoute
            path="/profile/notes-general"
            exact
            key={"/profile/notes-general"}
            component={NotesGeneral}
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
