import React from "react";
import TweenOne from "rc-tween-one";
import { NavLink } from "react-router-dom";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneOpen: false,
    };
  }

  phoneClick = () => {
    const phoneOpen = !this.state.phoneOpen;
    this.setState({
      phoneOpen,
    });
  };

  render() {
    const { dataSource, isMobile, ...props } = this.props;

    const { phoneOpen } = this.state;
    const moment = phoneOpen === undefined ? 300 : null;
    return (
      <TweenOne
        component="header"
        animation={{ opacity: 0, type: "from" }}
        {...dataSource.wrapper}
        {...props}
      >
        <div
          {...dataSource.page}
          className={`${dataSource.page.className}${phoneOpen ? " open" : ""}`}
        >
          <TweenOne
            animation={{ x: -30, type: "from", ease: "easeOutQuad" }}
            {...dataSource.logo}
          >
            <div
              style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}
            >
              CamusBlog
            </div>
            {/* <img width="100%" src={dataSource.logo.children} alt="img" /> */}
            {/* <img width="50%" src={require('@/assets/img/miao.png').default} alt="img" /> */}
          </TweenOne>
          {isMobile && (
            <div
              {...dataSource.mobileMenu}
              onClick={() => {
                this.phoneClick();
              }}
            >
              <em />
              <em />
              <em />
            </div>
          )}
          <TweenOne
            // {...LinkMenu}
            className={"header2-menu"}
            animation={
              isMobile
                ? {
                    height: 0,
                    duration: 300,
                    onComplete: (e) => {
                      if (this.state.phoneOpen) {
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
            {/* {navChildren} */}
          </TweenOne>
        </div>
      </TweenOne>
    );
  }
}

export default Header;
