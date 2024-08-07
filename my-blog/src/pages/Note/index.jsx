/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-12-09 12:13:18
 * @LastEditors: camus
 * @LastEditTime: 2022-02-08 17:33:23
 */
import React, { memo, useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

// import { Layout, Menu } from "antd";
import styled, { keyframes } from "styled-components";
import { fadeIn, fadeInLeft } from "react-animations";

import DemoLayer from "./DemoLayer";
import ExplorerElement from "./ExplorerElement";
import Article from "./Article";
import ArticleView from "./ArticleView";
// import { RenderType } from "./constants";
import { getDemoList } from "services/demo";
import { Route } from "react-router-dom";
import SelectAll from "./SelectAll/SelectAll";

export default memo(function CamusDemo(props) {
  const { isMobile } = useSelector((state) => ({
    isMobile: state.getIn(["global", "isMobile"]),
    shallowEqual,
  }));
  const [login, setLogin] = useState(true);
  const [articlesData, setArticlesData] = useState({});
  const [view, setView] = useState({
    type: "grid",
    selected: undefined,
  });
  // const [renderType, setRenderType] = useState('')
  // const [isSearch, setIsSearch] = useState(false);
  // const [changeView, setChangeView] = useState(false)
  // article数据
  useEffect(() => {
    _getDemoList();
  }, []);

  useEffect(() => {
    if (props.location.pathname === "/notes") {
      setView({
        type: "grid",
        selected: null,
      });
    }
  }, [props.location.pathname]);
  /**
   * @description: 获取notes列表请求
   * @param {*} _getDemoList
   */
  const _getDemoList = async () => {
    try {
      const data = await getDemoList(1, 20);
      const articles = data.map((item) => {
        return {
          ...item,
          visible: item.status === 1,
          article: item.title,
        };
      });
      setArticlesData(articles);
    } catch (error) {
      console.log("error", error);
    }
  };

  // 滚动到对应的card
  const scrollToArticle = (element, selected) => {
    if (view.type === "grid") {
      const selectedChildren = login === true ? 0 : 0;
      if (element) {
        const articles = document.querySelectorAll(".article");
        articles.forEach((currentElement, index) => {
          if (currentElement.children[selectedChildren].textContent === element) {
            window.scroll({
              top: currentElement.offsetTop - 100,
              left: 0,
              behavior: "smooth",
            });
          }
        });
      }
    } else if (view.type === "article") {
      Object.keys(articlesData).forEach((key) => {
        if (articlesData[key].article === element) {
          props.history.push(`/notes/${articlesData[key].id}`);
          setView({
            type: "article",
            selected: key,
          });
        }
      });
    }
  };
  /**
   * @description: 根据index打开对应的note
   * @param {*} index
   */
  const changeView = (index) => {
    if (view.type === "grid") {
      setView({
        type: "article",
        selected: index,
      });
      props.history.push(`/notes/${articlesData[index].id}`);
    } else {
      props.history.push(`/notes`);
      setView({
        type: "grid",
        selected: null,
      });
    }
  };

  /**
   * @description: 渲染文章preview
   */
  const articles = articlesData
    ? Object.keys(articlesData).map((key) => (
        <ArticleContainer key={key}>
          <Article
            key={key}
            index={key}
            login={login}
            details={articlesData[key]}
            changeView={() => changeView(key)}
          />
        </ArticleContainer>
      ))
    : null;
  // 侧栏
  const explorer = articlesData
    ? Object.keys(articles).map((key, index) => {
        return (
          <ExplorerElement
            key={key}
            index={key}
            login={login}
            details={articlesData[key]}
            scrollToArticle={(element, selected) => scrollToArticle(element, selected)}
          />
        );
      })
    : null;
  // 侧栏标题
  const lastArticlesTitle = articlesData ? <ExplorerTitle>Camus Notes</ExplorerTitle> : null;
  // const disconnect = () => {
  //   this.setState({
  //     login: false,
  //   });
  // };
  return (
    <ContainerApp>
      <DemoLayer></DemoLayer>
      {/* <SearchResult></SearchResult> */}
      {isMobile ? null : (
        <ExplorerPanel>
          {explorer}
          {lastArticlesTitle}
        </ExplorerPanel>
      )}
      {view.type === "grid" ? (
        <ContainerGrid className="articlesGrid">{articles}</ContainerGrid>
      ) : (
        <DemoRouterWrapper>
          {articlesData[view.selected].status === 2 && (
            <SelectAllWrapper>
              <p className="selectAllTitle">{articlesData[view.selected].title}</p>
              <div className="selectAllDemo">
                <span className={"label"}>Demo实例:</span>
                <Route path={`/notes/${articlesData[view.selected].id}`} component={SelectAll} />
              </div>
            </SelectAllWrapper>
          )}
          <ArticleView content={articlesData[view.selected]} changeView={changeView}></ArticleView>
        </DemoRouterWrapper>
      )}
    </ContainerApp>
  );
});

const fadeInAnimation = keyframes`${fadeIn}`;

const DemoRouterWrapper = styled.div`
  background-color: #fff;
`;

const ContainerApp = styled.div`
  position: absolute;
  /* top: 0px; */
  left: 0px;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;

  animation: 2s ${fadeInAnimation};
`;

const ContainerGrid = styled.div`
  /* width: 60vw; */
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ArticleContainer = styled.div`
  padding: 5%;
`;

const SearchContainer = styled.div`
  position: absolute;
  background-color: white;
  left: 250px;
  top: 500px;
  padding-bottom: 100px;
  width: 70%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`;
const SelectAllWrapper = styled.div`
  .selectAllTitle {
    /* font-family: "Abril Fatface", cursive; */
    font-size: 2rem;
    text-align: center;
    color: #212121;
    font-weight: bold;
    padding: 40px 0;
  }
  .selectAllDemo {
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color:#001529; */
    .label {
      /* color:#fff; */
      font-weight: bold;
      font-size: 24px;
      margin-right: 20px;
    }
  }
`;

const fadeInLeftAnimation = keyframes`${fadeInLeft}`;

const ExplorerTitle = styled.h4`
  font-size: 1.2em;
  font-style: italic;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  padding-bottom: 10px;
`;

const ExplorerPanel = styled.div`
  height: 100vh;
  width: 260px;
  /* margin-top:64px; */
  border-right: 1px solid rgba(230, 230, 230);
  position: fixed;
  top: 0;
  left: -10px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  flex-direction: column-reverse;
  line-height: 1.5715;
  padding-left: 20px;
  padding-right: 40px;
  animation: 0.5s ${fadeInLeftAnimation};
  transition: 0.5s;
  h4 {
    margin: 0;
    font-weight: 500;
  }
`;
