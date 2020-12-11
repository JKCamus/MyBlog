import React, { memo, useState, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { Layout, Menu } from "antd";
import styled, { keyframes } from "styled-components";
import { fadeIn, fadeInLeft } from "react-animations";

import DemoLayer from "./DemoLayer";
import ExplorerElement from "./ExplorerElement";
import Article from "./Article";

export default memo(function CamusDemo() {
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
  const [isSearch, setIsSearch] = useState(false);
  // const [changeView, setChangeView] = useState(false)
  useEffect(() => {
    const testArticle = [
      {
        article: "Secrets of the JavaScript Ninja",
        date: ["Lundi", 4, "Décembre", 2017],
        htmlContent: "<p>Editez ici...</p>",
        img:
          "https://images-na.ssl-images-amazon.com/images/I/51tQ%2BJAczgL.jpg",
        keywords: "javascript ninja book livre secret article",
        preview:
          "Secrets of the Javascript Ninja takes you on a journey towards mastering modern JavaScript development in three phases: design, construction, and maintenance. Written for JavaScript developers with intermediate-level skills, this book will give you the knowledge you need to create a cross-browser JavaScript library from the ground up.",
        visible: true,
      },
      {
        article: "TypeScript",
        date: ["Lundi", 4, "Décembre", 2017],
        htmlContent: "<p>Editez ici...</p>",
        img:
          "https://raw.githubusercontent.com/remojansen/logo.ts/master/ts.png",
        keywords: "typescript javascript article",
        preview:
          "TypeScript est un langage de programmation libre et open source développé par Microsoft qui a pour but d'améliorer et de sécuriser la production de code JavaScript.",
        visible: true,
      },
    ];
    setArticlesData(testArticle);
  }, []);

  const scrollToArticle = () => {
    console.log("scrollToArticle");
  };
  const changeView = (index) => {
    if (view.type === "grid") {
      setView({
        type: "article",
        selected: index,
      });
    } else {
      setView({
        type: "article",
        selected: null,
      });
    }
  };

  // 文章preview
  const articles = articlesData
    ? Object.keys(articlesData).map((key) => (
        <ArticleContainer key={key}>
          <Article
            key={key}
            index={key}
            login={login}
            details={articlesData[key]}
            changeView={() => changeView}
          />
        </ArticleContainer>
      ))
    : null;
  let viewRender =
    view.type === "grid" ? (
      <ContainerGrid className="articlesGrid">{articles}</ContainerGrid>
    ) : (
      article
    );
  // view =
  //   isSearch === true ? (
  //     <SearchContainer>{searchedArticles}</SearchContainer>
  //   ) : (
  //     view
  //   );
  // 侧栏
  const explorer = articlesData
    ? Object.keys(articles).map((key, index) => {
        // console.log(articles);
        if (true) {
          return (
            <ExplorerElement
              key={key}
              index={key}
              login={login}
              details={articlesData[key]}
              scrollToArticle={() => scrollToArticle}
            />
          );
        } else {
          return null;
        }
      })
    : null;
  // 侧栏标题
  const lastArticlesTitle = articlesData ? (
    <ExplorerTitle>Derniers Articles</ExplorerTitle>
  ) : null;
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
      {viewRender}
    </ContainerApp>
  );
});

const fadeInAnimation = keyframes`${fadeIn}`;

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

const fadeInLeftAnimation = keyframes`${fadeInLeft}`;

const ExplorerTitle = styled.h4`
  font-size: 1.2em;
  font-style: italic;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  padding-bottom: 10px;
`;

const ExplorerPanel = styled.div`
  height: 100vh;
  width: 260px;
  border-right: 1px solid rgba(230, 230, 230);
  position: fixed;
  top: 0px;
  left: -10px;

  display: flex;
  justify-content: center;
  flex-direction: column-reverse;

  padding-left: 20px;
  padding-right: 40px;
  animation: 0.5s ${fadeInLeftAnimation};
  transition: 0.5s;
`;
