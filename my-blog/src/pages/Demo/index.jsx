/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-12-09 12:13:18
 * @LastEditors: camus
 * @LastEditTime: 2021-01-10 22:38:24
 */
import React, { memo, useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { Layout, Menu } from "antd";
import styled, { keyframes } from "styled-components";
import { fadeIn, fadeInLeft } from "react-animations";

import DemoLayer from "./DemoLayer";
import ExplorerElement from "./ExplorerElement";
import Article from "./Article";
import ArticleView from "./ArticleView";
import { RenderType } from "./constants";

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
  // const [renderType, setRenderType] = useState('')
  const [isSearch, setIsSearch] = useState(false);
  // const [changeView, setChangeView] = useState(false)

  // article数据
  useEffect(() => {
    const testArticle = [
      {
        article: "Secrets of the JavaScript Ninja",
        date: ["Lundi", 4, "Décembre", 2017],
        htmlContent: `<html>
        <head>
        <meta charset='UTF-8'><meta name='viewport' content='width=device-width initial-scale=1'>
        <style type='text/css'>html {overflow-x: initial !important;}:root { --bg-color:#ffffff; --text-color:#333333; --select-text-bg-color:#B5D6FC; --select-text-font-color:auto; --monospace:"Lucida Console",Consolas,"Courier",monospace; }
        html { font-size: 14px; background-color: var(--bg-color); color: var(--text-color); font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; }
        body { margin: 0px; padding: 0px; height: auto; bottom: 0px; top: 0px; left: 0px; right: 0px; font-size: 1rem; line-height: 1.42857; overflow-x: hidden; background: inherit; tab-size: 4; }
        iframe { margin: auto; }
        a.url { word-break: break-all; }
        a:active, a:hover { outline: 0px; }
        .in-text-selection, ::selection { text-shadow: none; background: var(--select-text-bg-color); color: var(--select-text-font-color); }
        #write { margin: 0px auto; height: auto; width: inherit; word-break: normal; overflow-wrap: break-word; position: relative; white-space: normal; overflow-x: visible; padding-top: 40px; }
        #write.first-line-indent p { text-indent: 2em; }
        #write.first-line-indent li p, #write.first-line-indent p * { text-indent: 0px; }
        #write.first-line-indent li { margin-left: 2em; }
        .for-image #write { padding-left: 8px; padding-right: 8px; }
        body.typora-export { padding-left: 30px; padding-right: 30px; }
        .typora-export .footnote-line, .typora-export li, .typora-export p { white-space: pre-wrap; }
        @media screen and (max-width: 500px) {
          body.typora-export { padding-left: 0px; padding-right: 0px; }
          #write { padding-left: 20px; padding-right: 20px; }
          .CodeMirror-sizer { margin-left: 0px !important; }
          .CodeMirror-gutters { display: none !important; }
        }
        #write li > figure:last-child { margin-bottom: 0.5rem; }
        #write ol, #write ul { position: relative; }
        img { max-width: 100%; vertical-align: middle; image-orientation: from-image; }
        button, input, select, textarea { color: inherit; font: inherit; }
        input[type="checkbox"], input[type="radio"] { line-height: normal; padding: 0px; }
        *, ::after, ::before { box-sizing: border-box; }
        #write h1, #write h2, #write h3, #write h4, #write h5, #write h6, #write p, #write pre { width: inherit; }
        #write h1, #write h2, #write h3, #write h4, #write h5, #write h6, #write p { position: relative; }
        p { line-height: inherit; }
        h1, h2, h3, h4, h5, h6 { break-after: avoid-page; break-inside: avoid; orphans: 4; }
        p { orphans: 4; }
        h1 { font-size: 2rem; }
        h2 { font-size: 1.8rem; }
        h3 { font-size: 1.6rem; }
        h4 { font-size: 1.4rem; }
        h5 { font-size: 1.2rem; }
        h6 { font-size: 1rem; }
        .md-math-block, .md-rawblock, h1, h2, h3, h4, h5, h6, p { margin-top: 1rem; margin-bottom: 1rem; }
        .hidden { display: none; }
        .md-blockmeta { color: rgb(204, 204, 204); font-weight: 700; font-style: italic; }
        a { cursor: pointer; }
        sup.md-footnote { padding: 2px 4px; background-color: rgba(238, 238, 238, 0.7); color: rgb(85, 85, 85); border-radius: 4px; cursor: pointer; }
        sup.md-footnote a, sup.md-footnote a:hover { color: inherit; text-transform: inherit; text-decoration: inherit; }
        #write input[type="checkbox"] { cursor: pointer; width: inherit; height: inherit; }
        figure { overflow-x: auto; margin: 1.2em 0px; max-width: calc(100% + 16px); padding: 0px; }
        figure > table { margin: 0px; }
        tr { break-inside: avoid; break-after: auto; }
        thead { display: table-header-group; }
        table { border-collapse: collapse; border-spacing: 0px; width: 100%; overflow: auto; break-inside: auto; text-align: left; }
        table.md-table td { min-width: 32px; }
        .CodeMirror-gutters { border-right: 0px; background-color: inherit; }
        .CodeMirror-linenumber { user-select: none; }
        .CodeMirror { text-align: left; }
        .CodeMirror-placeholder { opacity: 0.3; }
        .CodeMirror pre { padding: 0px 4px; }
        .CodeMirror-lines { padding: 0px; }
        div.hr:focus { cursor: none; }
        #write pre { white-space: pre-wrap; }
        #write.fences-no-line-wrapping pre { white-space: pre; }
        #write pre.ty-contain-cm { white-space: normal; }
        .CodeMirror-gutters { margin-right: 4px; }
        .md-fences { font-size: 0.9rem; display: block; break-inside: avoid; text-align: left; overflow: visible; white-space: pre; background: inherit; position: relative !important; }
        .md-diagram-panel { width: 100%; margin-top: 10px; text-align: center; padding-top: 0px; padding-bottom: 8px; overflow-x: auto; }
        #write .md-fences.mock-cm { white-space: pre-wrap; }
        .md-fences.md-fences-with-lineno { padding-left: 0px; }
        #write.fences-no-line-wrapping .md-fences.mock-cm { white-space: pre; overflow-x: auto; }
        .md-fences.mock-cm.md-fences-with-lineno { padding-left: 8px; }
        .CodeMirror-line, twitterwidget { break-inside: avoid; }
        .footnotes { opacity: 0.8; font-size: 0.9rem; margin-top: 1em; margin-bottom: 1em; }
        .footnotes + .footnotes { margin-top: 0px; }
        .md-reset { margin: 0px; padding: 0px; border: 0px; outline: 0px; vertical-align: top; background: 0px 0px; text-decoration: none; text-shadow: none; float: none; position: static; width: auto; height: auto; white-space: nowrap; cursor: inherit; -webkit-tap-highlight-color: transparent; line-height: normal; font-weight: 400; text-align: left; box-sizing: content-box; direction: ltr; }
        li div { padding-top: 0px; }
        blockquote { margin: 1rem 0px; }
        li .mathjax-block, li p { margin: 0.5rem 0px; }
        li { margin: 0px; position: relative; }
        blockquote > :last-child { margin-bottom: 0px; }
        blockquote > :first-child, li > :first-child { margin-top: 0px; }
        .footnotes-area { color: rgb(136, 136, 136); margin-top: 0.714rem; padding-bottom: 0.143rem; white-space: normal; }
        #write .footnote-line { white-space: pre-wrap; }
        @media print {
          body, html { border: 1px solid transparent; height: 99%; break-after: avoid; break-before: avoid; font-variant-ligatures: no-common-ligatures; }
          #write { margin-top: 0px; padding-top: 0px; border-color: transparent !important; }
          .typora-export * { -webkit-print-color-adjust: exact; }
          html.blink-to-pdf { font-size: 13px; }
          .typora-export #write { padding-left: 32px; padding-right: 32px; padding-bottom: 0px; break-after: avoid; }
          .typora-export #write::after { height: 0px; }
          .is-mac table { break-inside: avoid; }
        }
        .footnote-line { margin-top: 0.714em; font-size: 0.7em; }
        a img, img a { cursor: pointer; }
        pre.md-meta-block { font-size: 0.8rem; min-height: 0.8rem; white-space: pre-wrap; background: rgb(204, 204, 204); display: block; overflow-x: hidden; }
        p > .md-image:only-child:not(.md-img-error) img, p > img:only-child { display: block; margin: auto; }
        #write.first-line-indent p > .md-image:only-child:not(.md-img-error) img { left: -2em; position: relative; }
        p > .md-image:only-child { display: inline-block; width: 100%; }
        #write .MathJax_Display { margin: 0.8em 0px 0px; }
        .md-math-block { width: 100%; }
        .md-math-block:not(:empty)::after { display: none; }
        [contenteditable="true"]:active, [contenteditable="true"]:focus, [contenteditable="false"]:active, [contenteditable="false"]:focus { outline: 0px; box-shadow: none; }
        .md-task-list-item { position: relative; list-style-type: none; }
        .task-list-item.md-task-list-item { padding-left: 0px; }
        .md-task-list-item > input { position: absolute; top: 0px; left: 0px; margin-left: -1.2em; margin-top: calc(1em - 10px); border: none; }
        .math { font-size: 1rem; }
        .md-toc { min-height: 3.58rem; position: relative; font-size: 0.9rem; border-radius: 10px; }
        .md-toc-content { position: relative; margin-left: 0px; }
        .md-toc-content::after, .md-toc::after { display: none; }
        .md-toc-item { display: block; color: rgb(65, 131, 196); }
        .md-toc-item a { text-decoration: none; }
        .md-toc-inner:hover { text-decoration: underline; }
        .md-toc-inner { display: inline-block; cursor: pointer; }
        .md-toc-h1 .md-toc-inner { margin-left: 0px; font-weight: 700; }
        .md-toc-h2 .md-toc-inner { margin-left: 2em; }
        .md-toc-h3 .md-toc-inner { margin-left: 4em; }
        .md-toc-h4 .md-toc-inner { margin-left: 6em; }
        .md-toc-h5 .md-toc-inner { margin-left: 8em; }
        .md-toc-h6 .md-toc-inner { margin-left: 10em; }
        @media screen and (max-width: 48em) {
          .md-toc-h3 .md-toc-inner { margin-left: 3.5em; }
          .md-toc-h4 .md-toc-inner { margin-left: 5em; }
          .md-toc-h5 .md-toc-inner { margin-left: 6.5em; }
          .md-toc-h6 .md-toc-inner { margin-left: 8em; }
        }
        a.md-toc-inner { font-size: inherit; font-style: inherit; font-weight: inherit; line-height: inherit; }
        .footnote-line a:not(.reversefootnote) { color: inherit; }
        .md-attr { display: none; }
        .md-fn-count::after { content: "."; }
        code, pre, samp, tt { font-family: var(--monospace); }
        kbd { margin: 0px 0.1em; padding: 0.1em 0.6em; font-size: 0.8em; color: rgb(36, 39, 41); background: rgb(255, 255, 255); border: 1px solid rgb(173, 179, 185); border-radius: 3px; box-shadow: rgba(12, 13, 14, 0.2) 0px 1px 0px, rgb(255, 255, 255) 0px 0px 0px 2px inset; white-space: nowrap; vertical-align: middle; }
        .md-comment { color: rgb(162, 127, 3); opacity: 0.8; font-family: var(--monospace); }
        code { text-align: left; vertical-align: initial; }
        a.md-print-anchor { white-space: pre !important; border-width: initial !important; border-style: none !important; border-color: initial !important; display: inline-block !important; position: absolute !important; width: 1px !important; right: 0px !important; outline: 0px !important; background: 0px 0px !important; text-decoration: initial !important; text-shadow: initial !important; }
        .md-inline-math .MathJax_SVG .noError { display: none !important; }
        .html-for-mac .inline-math-svg .MathJax_SVG { vertical-align: 0.2px; }
        .md-math-block .MathJax_SVG_Display { text-align: center; margin: 0px; position: relative; text-indent: 0px; max-width: none; max-height: none; min-height: 0px; min-width: 100%; width: auto; overflow-y: hidden; display: block !important; }
        .MathJax_SVG_Display, .md-inline-math .MathJax_SVG_Display { width: auto; margin: inherit; display: inline-block !important; }
        .MathJax_SVG .MJX-monospace { font-family: var(--monospace); }
        .MathJax_SVG .MJX-sans-serif { font-family: sans-serif; }
        .MathJax_SVG { display: inline; font-style: normal; font-weight: 400; line-height: normal; zoom: 90%; text-indent: 0px; text-align: left; text-transform: none; letter-spacing: normal; word-spacing: normal; overflow-wrap: normal; white-space: nowrap; float: none; direction: ltr; max-width: none; max-height: none; min-width: 0px; min-height: 0px; border: 0px; padding: 0px; margin: 0px; }
        .MathJax_SVG * { transition: none 0s ease 0s; }
        .MathJax_SVG_Display svg { vertical-align: middle !important; margin-bottom: 0px !important; margin-top: 0px !important; }
        .os-windows.monocolor-emoji .md-emoji { font-family: "Segoe UI Symbol", sans-serif; }
        .md-diagram-panel > svg { max-width: 100%; }
        [lang="flow"] svg, [lang="mermaid"] svg { max-width: 100%; height: auto; }
        [lang="mermaid"] .node text { font-size: 1rem; }
        table tr th { border-bottom: 0px; }
        video { max-width: 100%; display: block; margin: 0px auto; }
        iframe { max-width: 100%; width: 100%; border: none; }
        .highlight td, .highlight tr { border: 0px; }
        svg[id^="mermaidChart"] { line-height: 1em; }
        mark { background: rgb(255, 255, 0); color: rgb(0, 0, 0); }
        .md-html-inline .md-plain, .md-html-inline strong, mark .md-inline-math, mark strong { color: inherit; }
        mark .md-meta { color: rgb(0, 0, 0); opacity: 0.3 !important; }


        .CodeMirror { height: auto; }
        .CodeMirror.cm-s-inner { background: inherit; }
        .CodeMirror-scroll { overflow: auto hidden; z-index: 3; }
        .CodeMirror-gutter-filler, .CodeMirror-scrollbar-filler { background-color: rgb(255, 255, 255); }
        .CodeMirror-gutters { border-right: 1px solid rgb(221, 221, 221); background: inherit; white-space: nowrap; }
        .CodeMirror-linenumber { padding: 0px 3px 0px 5px; text-align: right; color: rgb(153, 153, 153); }
        .cm-s-inner .cm-keyword { color: rgb(119, 0, 136); }
        .cm-s-inner .cm-atom, .cm-s-inner.cm-atom { color: rgb(34, 17, 153); }
        .cm-s-inner .cm-number { color: rgb(17, 102, 68); }
        .cm-s-inner .cm-def { color: rgb(0, 0, 255); }
        .cm-s-inner .cm-variable { color: rgb(0, 0, 0); }
        .cm-s-inner .cm-variable-2 { color: rgb(0, 85, 170); }
        .cm-s-inner .cm-variable-3 { color: rgb(0, 136, 85); }
        .cm-s-inner .cm-string { color: rgb(170, 17, 17); }
        .cm-s-inner .cm-property { color: rgb(0, 0, 0); }
        .cm-s-inner .cm-operator { color: rgb(152, 26, 26); }
        .cm-s-inner .cm-comment, .cm-s-inner.cm-comment { color: rgb(170, 85, 0); }
        .cm-s-inner .cm-string-2 { color: rgb(255, 85, 0); }
        .cm-s-inner .cm-meta { color: rgb(85, 85, 85); }
        .cm-s-inner .cm-qualifier { color: rgb(85, 85, 85); }
        .cm-s-inner .cm-builtin { color: rgb(51, 0, 170); }
        .cm-s-inner .cm-bracket { color: rgb(153, 153, 119); }
        .cm-s-inner .cm-tag { color: rgb(17, 119, 0); }
        .cm-s-inner .cm-attribute { color: rgb(0, 0, 204); }
        .cm-s-inner .cm-header, .cm-s-inner.cm-header { color: rgb(0, 0, 255); }
        .cm-s-inner .cm-quote, .cm-s-inner.cm-quote { color: rgb(0, 153, 0); }
        .cm-s-inner .cm-hr, .cm-s-inner.cm-hr { color: rgb(153, 153, 153); }
        .cm-s-inner .cm-link, .cm-s-inner.cm-link { color: rgb(0, 0, 204); }
        .cm-negative { color: rgb(221, 68, 68); }
        .cm-positive { color: rgb(34, 153, 34); }
        .cm-header, .cm-strong { font-weight: 700; }
        .cm-del { text-decoration: line-through; }
        .cm-em { font-style: italic; }
        .cm-link { text-decoration: underline; }
        .cm-error { color: red; }
        .cm-invalidchar { color: red; }
        .cm-constant { color: rgb(38, 139, 210); }
        .cm-defined { color: rgb(181, 137, 0); }
        div.CodeMirror span.CodeMirror-matchingbracket { color: rgb(0, 255, 0); }
        div.CodeMirror span.CodeMirror-nonmatchingbracket { color: rgb(255, 34, 34); }
        .cm-s-inner .CodeMirror-activeline-background { background: inherit; }
        .CodeMirror { position: relative; overflow: hidden; }
        .CodeMirror-scroll { height: 100%; outline: 0px; position: relative; box-sizing: content-box; background: inherit; }
        .CodeMirror-sizer { position: relative; }
        .CodeMirror-gutter-filler, .CodeMirror-hscrollbar, .CodeMirror-scrollbar-filler, .CodeMirror-vscrollbar { position: absolute; z-index: 6; display: none; }
        .CodeMirror-vscrollbar { right: 0px; top: 0px; overflow: hidden; }
        .CodeMirror-hscrollbar { bottom: 0px; left: 0px; overflow: hidden; }
        .CodeMirror-scrollbar-filler { right: 0px; bottom: 0px; }
        .CodeMirror-gutter-filler { left: 0px; bottom: 0px; }
        .CodeMirror-gutters { position: absolute; left: 0px; top: 0px; padding-bottom: 30px; z-index: 3; }
        .CodeMirror-gutter { white-space: normal; height: 100%; box-sizing: content-box; padding-bottom: 30px; margin-bottom: -32px; display: inline-block; }
        .CodeMirror-gutter-wrapper { position: absolute; z-index: 4; background: 0px 0px !important; border: none !important; }
        .CodeMirror-gutter-background { position: absolute; top: 0px; bottom: 0px; z-index: 4; }
        .CodeMirror-gutter-elt { position: absolute; cursor: default; z-index: 4; }
        .CodeMirror-lines { cursor: text; }
        .CodeMirror pre { border-radius: 0px; border-width: 0px; background: 0px 0px; font-family: inherit; font-size: inherit; margin: 0px; white-space: pre; overflow-wrap: normal; color: inherit; z-index: 2; position: relative; overflow: visible; }
        .CodeMirror-wrap pre { overflow-wrap: break-word; white-space: pre-wrap; word-break: normal; }
        .CodeMirror-code pre { border-right: 30px solid transparent; width: fit-content; }
        .CodeMirror-wrap .CodeMirror-code pre { border-right: none; width: auto; }
        .CodeMirror-linebackground { position: absolute; left: 0px; right: 0px; top: 0px; bottom: 0px; z-index: 0; }
        .CodeMirror-linewidget { position: relative; z-index: 2; overflow: auto; }
        .CodeMirror-wrap .CodeMirror-scroll { overflow-x: hidden; }
        .CodeMirror-measure { position: absolute; width: 100%; height: 0px; overflow: hidden; visibility: hidden; }
        .CodeMirror-measure pre { position: static; }
        .CodeMirror div.CodeMirror-cursor { position: absolute; visibility: hidden; border-right: none; width: 0px; }
        .CodeMirror div.CodeMirror-cursor { visibility: hidden; }
        .CodeMirror-focused div.CodeMirror-cursor { visibility: inherit; }
        .cm-searching { background: rgba(255, 255, 0, 0.4); }
        @media print {
          .CodeMirror div.CodeMirror-cursor { visibility: hidden; }
        }


        /* cyrillic-ext */
        /* cyrillic */
        /* greek-ext */
        /* greek */
        /* vietnamese */
        /* latin-ext */
        /* latin */
        /* cyrillic-ext */
        /* cyrillic */
        /* greek-ext */
        /* greek */
        /* vietnamese */
        /* latin-ext */
        /* latin */
        /* cyrillic-ext */
        /* cyrillic */
        /* greek-ext */
        /* greek */
        /* vietnamese */
        /* latin-ext */
        /* latin */
        /* cyrillic-ext */
        /* cyrillic */
        /* greek-ext */
        /* greek */
        /* vietnamese */
        /* latin-ext */
        /* latin */
        @font-face {
            font-family: 'Source Sans Pro';
            font-style: normal;
            font-weight: 600;
            src: local('Source Sans Pro SemiBold'), local('SourceSansPro-SemiBold'), url('file:///C://Users//Camus//AppData//Roaming//Typora/themes/vue/6xKydSBYKcSV-LCoeQqfX1RYOo3i54rwlxdu.woff2') format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }@import '';

        :root {
            --side-bar-bg-color: #fff;
            --control-text-color: #777;
            --font-sans-serif: 'Ubuntu', 'Source Sans Pro', sans-serif !important;

            --font-monospace: 'Fira Code', 'Roboto Mono', monospace !important;
        }

        html {
            font-size: 16px;
        }

        body {
            font-family: var(--font-sans-serif);
            color: #34495e;
            -webkit-font-smoothing: antialiased;
            line-height: 1.6rem;
            letter-spacing: 0;
            margin: 0;
            overflow-x: hidden;
        }

        #write {
            max-width: 860px;
            margin: 0 auto;
            padding: 20px 30px 100px;
        }

        #write p {
            line-height: 1.6rem;
            word-spacing: .05rem;
        }

        #write ol li {
            padding-left: 0.5rem;
        }

        #write > ul:first-child,
        #write > ol:first-child {
            margin-top: 30px;
        }

        body > *:first-child {
            margin-top: 0 !important;
        }

        body > *:last-child {
            margin-bottom: 0 !important;
        }

        a {
            color: #42b983;
            font-weight: 600;
            padding: 0 2px;
            text-decoration: none;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            position: relative;
            margin-top: 1rem;
            margin-bottom: 1rem;
            font-weight: bold;
            line-height: 1.4;
            cursor: text;
        }

        h1:hover a.anchor,
        h2:hover a.anchor,
        h3:hover a.anchor,
        h4:hover a.anchor,
        h5:hover a.anchor,
        h6:hover a.anchor {
            text-decoration: none;
        }

        h1 tt,
        h1 code {
            font-size: inherit !important;
        }

        h2 tt,
        h2 code {
            font-size: inherit !important;
        }

        h3 tt,
        h3 code {
            font-size: inherit !important;
        }

        h4 tt,
        h4 code {
            font-size: inherit !important;
        }

        h5 tt,
        h5 code {
            font-size: inherit !important;
        }

        h6 tt,
        h6 code {
            font-size: inherit !important;
        }

        h2 a,
        h3 a {
            color: #34495e;
        }

        h1 {
            padding-bottom: .4rem;
            font-size: 2.2rem;
            line-height: 1.3;
        }

        h2 {
            font-size: 1.75rem;
            line-height: 1.225;
            margin: 35px 0 15px;
            padding-bottom: 0.5em;
            border-bottom: 1px solid #ddd;
        }

        h3 {
            font-size: 1.4rem;
            line-height: 1.43;
            margin: 20px 0 7px;
        }

        h4 {
            font-size: 1.2rem;
        }

        h5 {
            font-size: 1rem;
        }

        h6 {
            font-size: 1rem;
            color: #777;
        }

        p,
        blockquote,
        ul,
        ol,
        dl,
        table {
            margin: 0.8em 0;
        }

        li > ol,
        li > ul {
            margin: 0 0;
        }

        hr {
            height: 2px;
            padding: 0;
            margin: 16px 0;
            background-color: #e7e7e7;
            border: 0 none;
            overflow: hidden;
            box-sizing: content-box;
        }

        body > h2:first-child {
            margin-top: 0;
            padding-top: 0;
        }

        body > h1:first-child {
            margin-top: 0;
            padding-top: 0;
        }

        body > h1:first-child + h2 {
            margin-top: 0;
            padding-top: 0;
        }

        body > h3:first-child,
        body > h4:first-child,
        body > h5:first-child,
        body > h6:first-child {
            margin-top: 0;
            padding-top: 0;
        }

        a:first-child h1,
        a:first-child h2,
        a:first-child h3,
        a:first-child h4,
        a:first-child h5,
        a:first-child h6 {
            margin-top: 0;
            padding-top: 0;
        }

        h1 p,
        h2 p,
        h3 p,
        h4 p,
        h5 p,
        h6 p {
            margin-top: 0;
        }

        li p.first {
            display: inline-block;
        }

        ul,
        ol {
            padding-left: 30px;
        }

        ul:first-child,
        ol:first-child {
            margin-top: 0;
        }

        ul:last-child,
        ol:last-child {
            margin-bottom: 0;
        }

        blockquote {
            border-left: 4px solid #42b983;
            padding: 10px 15px;
            color: #777;
            background-color: rgba(66, 185, 131, .1);
        }

        table {
            padding: 0;
            word-break: initial;
        }

        table tr {
            border-top: 1px solid #dfe2e5;
            margin: 0;
            padding: 0;
        }

        table tr:nth-child(2n),
        thead {
            background-color: #fafafa;
        }

        table tr th {
            font-weight: bold;
            border: 1px solid #dfe2e5;
            border-bottom: 0;
            text-align: left;
            margin: 0;
            padding: 6px 13px;
        }

        table tr td {
            border: 1px solid #dfe2e5;
            text-align: left;
            margin: 0;
            padding: 6px 13px;
        }

        table tr th:first-child,
        table tr td:first-child {
            margin-top: 0;
        }

        table tr th:last-child,
        table tr td:last-child {
            margin-bottom: 0;
        }

        #write strong {
            padding: 0 1px;
        }

        #write em {
            padding: 0 5px 0 2px;
        }

        #write table thead th {
            background-color: #f2f2f2;
        }

        #write .CodeMirror-gutters {
            border-right: none;
        }

        #write .md-fences {
            border: 1px solid #F4F4F4;
            -webkit-font-smoothing: initial;
            margin: 0.8rem 0 !important;
            padding: 0.3rem 0 !important;
            line-height: 1.43rem;
            background-color: #F8F8F8 !important;
            border-radius: 2px;
            font-family: var(--font-monospace);
            font-size: 0.85rem;
            word-wrap: normal;
        }

        #write .CodeMirror-wrap .CodeMirror-code pre {
            padding-left: 12px;
        }

        #write code, tt {
            padding: 2px 4px;
            border-radius: 2px;
            font-family: var(--font-monospace);
            font-size: 0.92rem;
            color: #e96900;
            background-color: #f8f8f8;
        }

        tt {
            margin: 0 2px;
        }

        #write .md-footnote {
            background-color: #f8f8f8;
            color: #e96900;
        }

        /* heighlight. */
        #write mark {
            background-color: #fff5f5;
            /* background-color: #EBFFEB; */
            border-radius: 2px;
            padding: 2px 4px;
            margin: 0 2px;
            color: rgb(255, 80, 44);
            font-weight: 500;
        }

        #write del {
            padding: 1px 2px;
        }

        .cm-s-inner .cm-link,
        .cm-s-inner.cm-link {
            color: #22a2c9;
        }

        .cm-s-inner .cm-string {
            color: #22a2c9;
        }

        .md-task-list-item > input {
            margin-left: -1.3em;
        }

        @media print {
            html {
                font-size: 13px;
            }

            table,
            pre {
                page-break-inside: avoid;
            }

            pre {
                word-wrap: break-word;
            }
        }

        .md-fences {
            background-color: #f8f8f8;
        }

        #write pre.md-meta-block {
            padding: 1rem;
            font-size: 85%;
            line-height: 1.45;
            background-color: #f7f7f7;
            border: 0;
            border-radius: 3px;
            color: #777777;
            margin-top: 0 !important;
        }

        .mathjax-block > .code-tooltip {
            bottom: .375rem;
        }

        #write > h3.md-focus:before {
            left: -1.5625rem;
            top: .375rem;
        }

        #write > h4.md-focus:before {
            left: -1.5625rem;
            top: .285714286rem;
        }

        #write > h5.md-focus:before {
            left: -1.5625rem;
            top: .285714286rem;
        }

        #write > h6.md-focus:before {
            left: -1.5625rem;
            top: .285714286rem;
        }

        .md-image > .md-meta {
            border-radius: 3px;
            font-family: var(--font-monospace);
            padding: 2px 0 0 4px;
            font-size: 0.9em;
            color: inherit;
        }

        .md-tag {
            color: inherit;
        }

        .md-toc {
            margin-top: 20px;
            padding-bottom: 20px;
        }

        .sidebar-tabs {
            border-bottom: none;
        }

        #typora-quick-open {
            border: 1px solid #ddd;
            background-color: #f8f8f8;
        }

        #typora-quick-open-item {
            background-color: #FAFAFA;
            border-color: #FEFEFE #e5e5e5 #e5e5e5 #eee;
            border-style: solid;
            border-width: 1px;
        }

        #md-notification:before {
            top: 10px;
        }

        /** focus mode */

        .on-focus-mode blockquote {
            border-left-color: rgba(85, 85, 85, 0.12);
        }

        header,
        .context-menu,
        .megamenu-content,
        footer {
            font-family: var(--font-sans-serif);
        }

        .file-node-content:hover .file-node-icon,
        .file-node-content:hover .file-node-open-state {
            visibility: visible;
        }

        .mac-seamless-mode #typora-sidebar {
            background-color: var(--side-bar-bg-color);
        }

        .md-lang {
            color: #b4654d;
        }

        .html-for-mac .context-menu {
            --item-hover-bg-color: #E6F0FE;
        }



        </style>
        </head>
        <body class='typora-export os-windows' >
        <div  id='write'  class = ''><h1><a name="antd样式覆盖" class="md-header-anchor"></a><span>antD样式覆盖</span></h1><p>&nbsp;</p><h3><a name="通常情况下" class="md-header-anchor"></a><span>通常情况下：</span></h3><p>&nbsp;</p><p><span>当需要改变单独样式且不影响全局，结合lees、sass实现。</span></p><p>&nbsp;</p><p><span>首先找到需要覆盖的antD样式的类，如</span><code>.ant-menu-submenu-arrow::before</code><span>，将该类声明到全局。需要注意，有些必须添加</span><code>!important</code><span>修改样式如下：</span></p><pre spellcheck="false" class="md-fences md-end-block ty-contain-cm modeLoaded" lang="less {.class1 .class}"><div class="CodeMirror cm-s-inner CodeMirror-wrap" lang="less {.class1 .class}"><div style="overflow: hidden; position: relative; width: 3px; height: 0px; top: 0px; left: 12px;"><textarea autocorrect="off" autocapitalize="off" spellcheck="false" tabindex="0" style="position: absolute; bottom: -1em; padding: 0px; width: 1000px; height: 1em; outline: none;"></textarea></div><div class="CodeMirror-scrollbar-filler" cm-not-content="true"></div><div class="CodeMirror-gutter-filler" cm-not-content="true"></div><div class="CodeMirror-scroll" tabindex="-1"><div class="CodeMirror-sizer" style="margin-left: 0px; margin-bottom: 0px; border-right-width: 0px; padding-right: 0px; padding-bottom: 0px;"><div style="position: relative; top: 0px;"><div class="CodeMirror-lines" role="presentation"><div role="presentation" style="position: relative; outline: none;"><div class="CodeMirror-measure"></div><div class="CodeMirror-measure"></div><div style="position: relative; z-index: 1;"></div><div class="CodeMirror-code" role="presentation" style=""><div class="CodeMirror-activeline" style="position: relative;"><div class="CodeMirror-activeline-background CodeMirror-linebackground"></div><div class="CodeMirror-gutter-background CodeMirror-activeline-gutter" style="left: 0px; width: 0px;"></div><pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;"><span class="cm-qualifier">.antArrow</span>&nbsp;{</span></pre></div><pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">&nbsp;&nbsp;:<span class="cm-variable-3">global</span>(<span class="cm-qualifier">.ant-menu-submenu-arrow</span>::<span class="cm-variable">before</span>&nbsp;&nbsp;)&nbsp;{</span></pre><pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">&nbsp;&nbsp;&nbsp;&nbsp;<span class="cm-property">display</span>:&nbsp;<span class="cm-atom">none</span>&nbsp;<span class="cm-keyword">!important</span>;</span></pre><pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">&nbsp;&nbsp;}</span></pre><pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">&nbsp;&nbsp;:<span class="cm-variable-3">global</span>(<span class="cm-qualifier">.ant-menu-submenu-arrow</span>::<span class="cm-variable">after</span>&nbsp;&nbsp;)&nbsp;{</span></pre><pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">&nbsp;&nbsp;&nbsp;&nbsp;<span class="cm-property">display</span>:&nbsp;<span class="cm-atom">none</span>&nbsp;<span class="cm-keyword">!important</span>;</span></pre><pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">&nbsp;&nbsp;}</span></pre><pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">}</span></pre></div></div></div></div></div><div style="position: absolute; height: 0px; width: 1px; border-bottom: 0px solid transparent; top: 176px;"></div><div class="CodeMirror-gutters" style="display: none; height: 176px;"></div></div></div></pre><p>&nbsp;</p><p><span>在需要覆盖样式的文件内引入。</span></p><p><code>const utilStyles = require(&#39;assets/less/util.less&#39;)</code></p><p><span>或者</span></p><p><code>import utilStyles from &#39;assets/less/util.less&#39;</code></p><p><span>之后在对应的组件写上</span><code>className={utilStyles.antArrow}</code></p><h3><a name="覆盖全局" class="md-header-anchor"></a><span>覆盖全局</span></h3><p>&nbsp;</p><pre spellcheck="false" class="md-fences md-end-block ty-contain-cm modeLoaded" lang="js"><div class="CodeMirror cm-s-inner CodeMirror-wrap" lang="js"><div style="overflow: hidden; position: relative; width: 3px; height: 0px; top: 0px; left: 12px;"><textarea autocorrect="off" autocapitalize="off" spellcheck="false" tabindex="0" style="position: absolute; bottom: -1em; padding: 0px; width: 1000px; height: 1em; outline: none;"></textarea></div><div class="CodeMirror-scrollbar-filler" cm-not-content="true"></div><div class="CodeMirror-gutter-filler" cm-not-content="true"></div><div class="CodeMirror-scroll" tabindex="-1"><div class="CodeMirror-sizer" style="margin-left: 0px; margin-bottom: 0px; border-right-width: 0px; padding-right: 0px; padding-bottom: 0px;"><div style="position: relative; top: 0px;"><div class="CodeMirror-lines" role="presentation"><div role="presentation" style="position: relative; outline: none;"><div class="CodeMirror-measure"><pre><span>xxxxxxxxxx</span></pre></div><div class="CodeMirror-measure"></div><div style="position: relative; z-index: 1;"></div><div class="CodeMirror-code" role="presentation"><div class="CodeMirror-activeline" style="position: relative;"><div class="CodeMirror-activeline-background CodeMirror-linebackground"></div><div class="CodeMirror-gutter-background CodeMirror-activeline-gutter" style="left: 0px; width: 0px;"></div><pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">:<span class="cm-variable">global</span>(.<span class="cm-variable">ant</span><span class="cm-operator">-</span><span class="cm-variable">menu</span><span class="cm-operator">-</span><span class="cm-variable">submenu</span><span class="cm-operator">-</span><span class="cm-variable">arrow</span>::<span class="cm-variable">before</span>  ) {</span></pre></div><pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;"> &nbsp; &nbsp;<span class="cm-variable">display</span>: <span class="cm-variable">none</span> <span class="cm-operator">!</span><span class="cm-variable">important</span>;</span></pre><pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;">  }</span></pre></div></div></div></div></div><div style="position: absolute; height: 0px; width: 1px; border-bottom: 0px solid transparent; top: 66px;"></div><div class="CodeMirror-gutters" style="display: none; height: 66px;"></div></div></div></pre><p><span>覆盖全局的情况，会使全局内使用到这类组件的样式全都更改。</span></p><h3><a name="特殊的如select中的ant-select-dropdown-menu相关组件" class="md-header-anchor"></a><span>特殊的，如</span><code>Select</code><span>中的</span><code>ant-select-dropdown-menu</code><span>相关组件</span></h3><p>&nbsp;</p><p><span>特殊的原因就在于，</span><code>ant-select-dropdown-menu</code><span>是动态创建的，挂载在了别处。诚然，修改Select组件的样式，antD给了几个api，用于细化调整这些组件。</span></p><p>&nbsp;</p><p><span>如：在Select组件下</span></p><ol start='' ><li><code>dropdownClassName?: string;</code></li><li><code>dropdownStyle?: React.CSSProperties;</code></li><li><code>dropdownMenuStyle?: React.CSSProperties;</code></li></ol><p><span>但是这几个只能修改menu相关，如果想改item的样式，还得在Option上更改样式。</span></p><p>&nbsp;</p><p><span>这里提供另外一个方式：</span></p><p><span>将</span><code>ant-select-dropdown-menu</code><span>的modal挂载到当前父级：</span></p><p><span>        </span><code>getPopupContainer={e =&gt; e.parentNode}</code></p><p><span>之后便可以直接使用之前的覆盖样式方式：</span></p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p></div>
        </body>
        </html>`,
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
  // 滚动到对应的card
  const scrollToArticle = (element, selected) => {
    if (view.type === "grid") {
      const selectedChildren = login === true ? 1 : 0;
      if (element) {
        const articles = document.querySelectorAll(".article");
        articles.forEach((currentElement, index) => {
          if (
            currentElement.children[selectedChildren].textContent === element
          ) {
            window.scroll({
              top: currentElement.offsetTop - 100,
              left: 0,
              behavior: "smooth",
            });
          }
        });
      }
    } else if (view.type === "article") {
      const articles = articlesData;
      Object.keys(articles).forEach((key) => {
        if (articles[key].article === element) {
          setView({
            type: "article",
            selected: key,
          });
        }
      });
    }
  };

  const changeView = (index) => {
    if (view.type === "grid") {
      setView({
        type: "article",
        selected: index,
      });
    } else {
      console.log("-------");
      setView({
        type: "grid",
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
            changeView={() => changeView(key)}
          />
        </ArticleContainer>
      ))
    : null;
  let viewRender =
    view.type === "grid" ? (
      <ContainerGrid className="articlesGrid">{articles}</ContainerGrid>
    ) : (
      <ArticleView
        content={articlesData[0]}
        changeView={changeView}
      ></ArticleView>
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
              scrollToArticle={(element, selected) =>
                scrollToArticle(element, selected)
              }
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
      {view.type === "grid" ? (
        <ContainerGrid className="articlesGrid">{articles}</ContainerGrid>
      ) : (
        <ArticleView
          content={articlesData[view.selected]}
          changeView={changeView}
        ></ArticleView>
      )}
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
