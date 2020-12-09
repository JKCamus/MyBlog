import React from "react";
import QueueAnim from "rc-queue-anim";
import PropTypes from "prop-types";
import TweenOne, { TweenOneGroup } from "rc-tween-one";
import { CloseOutlined } from "@ant-design/icons";
import { getPhotoList } from "services/home";
import { Skeleton, message } from "antd";

import "./index.less";
const textData = {
  content:
    "Taiwan called motorcycle, motor bike [1] or a motorcycle," +
    " the motorcycle referred to in the mainland, Hong Kong and Southeast" +
    " Asia known as motorcycles.",
  title: "Motorcycle",
};
let dataArray = [
  { url: "https://zos.alipayobjects.com/rmsportal/DGOtoWASeguMJgV.png" },
  { url: "https://zos.alipayobjects.com/rmsportal/BXJNKCeUSkhQoSS.png" },
  { url: "https://zos.alipayobjects.com/rmsportal/TDIbcrKdLWVeWJM.png" },
  { url: "https://zos.alipayobjects.com/rmsportal/SDLiKqyfBvnKMrA.png" },
  { url: "https://zos.alipayobjects.com/rmsportal/UcVbOrSDHCLPqLG.png" },
  { url: "https://zos.alipayobjects.com/rmsportal/QJmGZYJBRLkxFSy.png" },
  { url: "https://zos.alipayobjects.com/rmsportal/PDiTkHViQNVHddN.png" },
  { url: "https://zos.alipayobjects.com/rmsportal/beHtidyjUMOXbkI.png" },
  { url: "https://zos.alipayobjects.com/rmsportal/vJcpMCTaSKSVWyH.png" },
  { url: "https://zos.alipayobjects.com/rmsportal/dvQuFtUoRmvWLsZ.png" },
  { url: "https://zos.alipayobjects.com/rmsportal/QqWQKvgLSJaYbpr.png" },
  { url: "https://zos.alipayobjects.com/rmsportal/pTfNdthdsUpLPLJ.png" },
];
dataArray = dataArray.map((item) => ({ ...item, ...textData }));
class PhotoView extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: "pic-details-demo",
  };

  constructor(props) {
    super(props);
    this.state = {
      picOpen: {},
      imgArray: [],
      loadImgWall: false,
    };
  }
  componentDidMount() {
    this._getPhotoList();
  }
  async _getPhotoList() {
    try {
      this.setState({ loadImgWall: true });
      await getPhotoList(1, 12).then((res) => {
        Array.isArray(res) && this.setState({ imgArray: res });
      });
      this.setState({ loadImgWall: false });
    } catch (error) {
      message.error("图片请求失败！");
    }
  }
  onImgClick = (e, i) => {
    const { picOpen } = this.state;
    Object.keys(picOpen).forEach((key) => {
      if (key !== i && picOpen[key]) {
        picOpen[key] = false;
      }
    });
    picOpen[i] = true;
    this.setState({
      picOpen,
    });
  };

  onClose = (e, i) => {
    const { picOpen } = this.state;
    picOpen[i] = false;
    this.setState({
      picOpen,
    });
  };

  onTweenEnd = (i) => {
    const { picOpen } = this.state;
    delete picOpen[i];
    this.setState({
      picOpen,
    });
  };

  getDelay = (e) => {
    const i = e.index + (this.state.imgArray.length % 4);
    return (i % 4) * 100 + Math.floor(i / 4) * 100 + 200;
  };

  getLiChildren = () => {
    const imgWidth = 110;
    const imgHeight = 76;
    const imgBoxWidth = 130;
    const imgBoxHeight = 96;
    const { imgArray } = this.state;
    // const imgWidth = 200;
    // const imgHeight = 76;
    // const imgBoxWidth = 130;
    // const imgBoxHeight = 96;
    const toShowArray = imgArray.length === 0 ? dataArray : imgArray;
    return imgArray.map((item, i) => {
      const { url, title, content } = item;
      const isEnter = typeof this.state.picOpen[i] === "boolean";
      const isOpen = this.state.picOpen[i];
      const left = isEnter ? 0 : imgBoxWidth * (i % 4);
      const imgLeft = isEnter ? imgBoxWidth * (i % 4) : 0;
      const isRight = Math.floor((i % 4) / 2);
      const isTop = Math.floor(i / 4);
      let top = isTop ? (isTop - 1) * imgBoxHeight : 0;
      top = isEnter ? top : imgBoxHeight * isTop;
      let imgTop = isTop ? imgBoxHeight : 0;
      imgTop = isEnter ? imgTop : 0;

      const liStyle = isEnter
        ? { width: "100%", height: 300, zIndex: 1 }
        : null;
      const liAnimation = isOpen
        ? { boxShadow: "0 2px 8px rgba(140, 140, 140, .35)" }
        : { boxShadow: "0 0px 0px rgba(140, 140, 140, 0)" };
      let aAnimation = isEnter
        ? {
            delay: 400,
            ease: "easeInOutCubic",
            width: imgWidth,
            height: imgHeight,
            onComplete: this.onTweenEnd.bind(this, i),
            left: imgBoxWidth * (i % 4),
            top: isTop ? imgBoxHeight : 0,
          }
        : null;
      aAnimation = isOpen
        ? {
            ease: "easeInOutCubic",
            left: isRight ? imgBoxWidth * 2 - 10 : 0,
            // left: isRight ? 600: 0,
            // left: 600,
            width: "50%",
            height: 175,
            top: 0,
          }
        : aAnimation;
      // 位置 js 控制；
      return (
        <TweenOne
          key={i}
          style={{
            left,
            top,
            ...liStyle,
          }}
          component="li"
          className={isOpen ? "open" : ""}
          animation={liAnimation}
        >
          <Skeleton loading={this.state.loadImgWall}>
            <TweenOne
              component="a"
              onClick={(e) => this.onImgClick(e, i)}
              style={{
                left: imgLeft,
                top: imgTop,
              }}
              animation={aAnimation}
            >
              <img src={url} width="100%" height="100%" />
            </TweenOne>
          </Skeleton>
          <TweenOneGroup
            enter={[
              {
                opacity: 0,
                duration: 0,
                type: "from",
                delay: 400,
              },
              {
                ease: "easeOutCubic",
                type: "from",
                left: isRight ? "50%" : "0%",
              },
            ]}
            leave={{ ease: "easeInOutCubic", left: isRight ? "50%" : "0%" }}
            component=""
          >
            {isOpen && (
              <div
                className={`${this.props.className}-text-wrapper`}
                key="text"
                style={{
                  left: isRight ? "0%" : "50%",
                }}
              >
                <h1>{title}</h1>
                <CloseOutlined
                  className={"closeStyle"}
                  onClick={(e) => this.onClose(e, i)}
                />
                <em />
                <p>{content}</p>
              </div>
            )}
          </TweenOneGroup>
        </TweenOne>
      );
    });
  };

  render() {
    return (
      <div>
        <div className={`${this.props.className}-wrapper`}>
          <div className={this.props.className}>
            <div className={`${this.props.className}-header`}>
              <ul>
                <li />
                <li />
                <li />
                <li />
                <li />
              </ul>
            </div>
            <QueueAnim
              type="bottom"
              className={`${this.props.className}-title`}
            >
              <h1 key="h1">Travel Around </h1>
              <p key="p">
                I love you not for who you are, but for who I am with you.
              </p>
            </QueueAnim>
            <Skeleton loading={this.state.loadImgWall}>
              <QueueAnim
                delay={this.getDelay}
                component="ul"
                className={`${this.props.className}-image-wrapper`}
                interval={0}
                type="bottom"
              >
                {this.getLiChildren()}
              </QueueAnim>
            </Skeleton>
            <Skeleton loading={this.state.loadImgWall}></Skeleton>
            <Skeleton loading={this.state.loadImgWall}></Skeleton>
          </div>
        </div>
      </div>
    );
  }
}
export default PhotoView;
