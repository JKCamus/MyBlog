/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-12-11 15:41:29
 * @LastEditors: camus
 * @LastEditTime: 2020-12-11 16:26:00
 */
// React
import React, { Component } from 'react'

// Firebase
import * as firebase from 'firebase'
import firebaseConfig from '../firebase'

// Components
import Home from './Home'
import ArticleView from './ArticleView'
import Article from './Article'
import LoginButton from './LoginButton'
import LoginScreen from './LoginScreen'
import ControlPanel from './ControlPanel'
import CreateArticlePanel from './CreateArticlePanel'
import ExplorerElement from './ExplorerElement'
import SearchBar from './SearchBar'
import SearchResult from './SearchResult'
import Loader from './Loader'

// Styled components
import styled, { keyframes } from 'styled-components'
import { fadeIn, fadeInLeft } from 'react-animations'


class App extends Component {
  constructor() {
    super()

    this.state = {
      login: false,
      owner: null,
      uid: null,
      user: null,
      loginScreen: false,
      createArticlePanelScreen: false,
      search: false,
      articles: {},
      view: {
        type: 'grid',
        selected: undefined
      },
      loading: false
    }

    firebase.initializeApp(firebaseConfig)

    this.initializeArticles = this.initializeArticles.bind(this)
    this.changeView = this.changeView.bind(this)
    this.displayLoginScreen = this.displayLoginScreen.bind(this)
    this.login = this.login.bind(this)
    this.saveArticleHtmlToBase = this.saveArticleHtmlToBase.bind(this)
    this.updateTitle = this.updateTitle.bind(this)
    this.displayCreateArticlePanel = this.displayCreateArticlePanel.bind(this)
    this.quitCreateArticlePanel = this.quitCreateArticlePanel.bind(this)
    this.deleteArticle = this.deleteArticle.bind(this)
    this.scrollToArticle = this.scrollToArticle.bind(this)
    this.autoClosePanel = this.autoClosePanel.bind(this)
    this.changeViewFromSearch = this.changeViewFromSearch.bind(this)
    this.authenticate = this.authenticate.bind(this)
    this.authHandler = this.authHandler.bind(this)
  }

  componentWillMount() {
    this.initializeArticles()
  }

  componentDidUpdate() {
    this.scrollToArticle()
    this.autoClosePanel()
  }

  autoClosePanel = () => {
    if (this.state.loading === false) {
      const app = document.querySelector('.app')
      app.addEventListener('click', event => {
        if (this.state.loginScreen === true && event.target.classList.contains('loginElement') === false) {
          this.setState({ loginScreen: false })
        } else if (this.state.createArticlePanelScreen === true && event.target.classList.contains('createPanelElement') === false) {
          this.setState({ createArticlePanelScreen: false })
        }
      })
    }
  }

  scrollToArticle = (element, selected) => {
    if (this.state.view.type === 'grid') {
      const selectedChildren = this.state.login === true ? 1 : 0
      if (this.state.loading === false && element) {
        const articles = document.querySelectorAll('.article')
        articles.forEach((currentElement, index) => {
          if (currentElement.children[selectedChildren].textContent === element) {
            window.scroll({
              top: currentElement.offsetTop - 100,
              left: 0,
              behavior: 'smooth'
            })
          }
        })
      }
    } else if (this.state.view.type === 'article') {
      const articles = this.state.articles
      Object.keys(articles).forEach(key => {
        if (articles[key].article === element) {
          this.setState({
            view: {
              type: 'article',
              selected: selected
            }
          })
        }
      })
    }
  }

  initializeArticles = () => {
    const articleRef = firebase.database().ref('articles')
    articleRef.on('value', snapshot => {
      this.setState({
        articles: snapshot.val()
      }, () => {
        setTimeout(() => {
          this.setState({
            loading: false
          })
        }, 3000)
      })
    })
  }

  saveArticleHtmlToBase = (index, htmlContent) => {
    // const htmlContentRef = firebase.database().ref('articles').child(index)
    // htmlContentRef.set({
    //   htmlContent: article,
    // }, () => {
    //   this.initializeArticles
    // })
    const articleRef = firebase.database().ref('articles').child(index).key
    const contentRef = firebase.database().ref('articles').child(index).child('htmlContent').key
    const updates = {}

    updates['/articles/' + articleRef + '/' + contentRef] = htmlContent
    firebase.database().ref().update(updates)

    this.uploadArticle(index, true)
  }

  uploadArticle = (index, visible) => {
    visible = visible === true ? false : true
    const articleRef = firebase.database().ref('articles').child(index).key
    const visibleRef = firebase.database().ref('articles').child(index).child('visible').key
    const updates = {}

    updates['/articles/' + articleRef + '/' + visibleRef] = visible
    firebase.database().ref().update(updates)
  }

  updateTitle = (index, title) => {
    const articleRef = firebase.database().ref('articles').child(index).key
    const titleRef = firebase.database().ref('articles').child(index).child('article').key
    const updates = {}

    updates['/articles/' + articleRef + '/' + titleRef] = title
    firebase.database().ref().update(updates)
  }

  updateImage = (index, image) => {
    const articleRef = firebase.database().ref('articles').child(index).key
    const imageRef = firebase.database().ref('articles').child(index).child('img').key
    const updates = {}

    updates['/articles/' + articleRef + '/' + imageRef] = image
    firebase.database().ref().update(updates)
  }

  updatePresentation = (index, presentation) => {
    const articleRef = firebase.database().ref('articles').child(index).key
    const presentationRef = firebase.database().ref('articles').child(index).child('preview').key
    const updates = {}

    updates['/articles/' + articleRef + '/' + presentationRef] = presentation
    firebase.database().ref().update(updates)
  }

  updateKeywords = (index, keywords) => {
    const articleRef = firebase.database().ref('articles').child(index).key
    const keywordsRef = firebase.database().ref('articles').child(index).child('keywords').key
    const updates = {}

    updates['/articles/' + articleRef + '/' + keywordsRef] = keywords
    firebase.database().ref().update(updates)
  }

  login = event => {
    event.preventDefault()
    event.stopPropagation()

    const idRef = firebase.database().ref('administrator')
    const inputId = document.querySelector('.id').value
    const inputPassword = document.querySelector('.password').value

    idRef.on('value', snapshot => {
      if (inputId === snapshot.val().id && inputPassword === snapshot.val().password) {
        this.setState({
          login: true,
          loginScreen: false,
          username: snapshot.val().id
        })
      } else {
        this.setState({
          login: false
        }, () => {
          alert("erreur d'authentification")
        })
      }
    })
  }

  disconnect = () => {
    this.setState({
      login: false
    })
  }

  changeView = index => {
    if (this.state.view.type === 'grid') {
      this.setState({
        view: {
          type: 'article',
          selected: index
        }
      })
    } else {
      this.setState({
        view: {
          type: 'grid',
          selected: null
        }
      })
    }
  }

  changeViewFromSearch = index => {
    this.setState({
      search: false,
      view: {
        type: 'article',
        selected: index
      }
    }, () => {
      const searchInput = document.querySelector('.searchInput')
      searchInput.value = ''
    })
  }

  displayLoginScreen = () => {
    if (!this.state.loginScreen) {
      this.setState({
        loginScreen: true,
      }, () => {
        const formId = document.querySelector('.id')
        formId.focus()
      })
    } else {
      this.setState({ loginScreen: false })
    }
  }

  quitEditor = () => {
    this.setState({
      view: {
        type: 'grid'
      }
    })
  }

  displayCreateArticlePanel = () => {
    this.setState({
      createArticlePanelScreen: true
    })
  }
  quitCreateArticlePanel = () => {
    this.setState({
      createArticlePanelScreen: false
    })
  }

  setDate = date => {
    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    const d = [days[date.getDay() - 1], date.getDate(), months[date.getMonth()], date.getFullYear()]

    return d
  }

  addArticle = (event, name, image, preview) => {
    event.preventDefault()
    const articleRef = firebase.database().ref('articles')
    const date = new Date()
    // this.setDate(date)

    articleRef.push({
      article: name,
      img: image,
      htmlContent: '',
      preview: preview,
      sortDate: date.getTime(),
      visible: false,
      date: this.setDate(date)
    })

    this.quitCreateArticlePanel()
  }

  deleteArticle = index => {
    const verif = prompt('Voulez vous vraiment supprimer cet article ? Si oui, entrez : "supprimer"')
    if (verif === 'supprimer') {
      this.setState({
        view: {
          type: 'grid'
        }
      }, () => {
        const article = firebase.database().ref('articles').child(index)
        article.remove()
      })
    }
  }

  searchView = (search, value) => {
    if (search) {
      this.setState({
        search: false
      }, () => {
        this.setState({ currentSearch: undefined })
      })
    } else {
      this.setState({
        search: true
      }, () => {
        this.setState({ currentSearch: value })
      })
    }
  }

  authenticate = (type) => {
    let provider = null

    if (type === 'facebook') {
      provider = new firebase.auth.FacebookAuthProvider()
      provider.addScope('user_birthday')
      provider.setCustomParameters({
        'display': 'popup'
      })
    } else if (type === 'google') {
      provider = new firebase.auth.GoogleAuthProvider()
      provider.addScope('https://www.googleapis.com/auth/plus.login')
      provider.setCustomParameters({
        'display': 'popup'
      })
    }

    firebase.auth().signInWithPopup(provider)
      .then(authData => this.authHandler(authData))
      .catch(error => console.log(error))
  }

  authHandler = (authData) => {
    console.log(authData)
    const usersRef = firebase.database().ref('users')

    usersRef.on('value', snapshot => {
      const data = snapshot.val() || {}
      console.log(data)
      console.log(data.user)

      if (!data.owner) {
        usersRef.set({
          uid: authData.user.uid,
          owner: data.owner || authData.user.uid,
          user: data.additionalUserInfo.name
        })
      }

      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      })
    })
  }


  render() {
    const home = this.state.view.type !== 'grid' ? <Home /> : <Home />

    const lastArticlesTitle = this.state.articles ? <ExplorerTitle>Derniers Articles</ExplorerTitle> : null

    const loginButton = this.state.login ? null : <LoginButton displayLoginScreen={this.displayLoginScreen} />

    const loginScreen = this.state.loginScreen ? <LoginScreen displayLoginScreen={this.displayLoginScreen}
      login={this.login}
      authenticate={this.authenticate} /> : null

    const controlPanel = this.state.login ? <ControlPanel disconnect={this.disconnect}
      displayCreateArticlePanel={this.displayCreateArticlePanel}
      quitCreateArticlePanel={this.quitCreateArticlePanel} /> : null

    const createArticlePanelScreen = this.state.createArticlePanelScreen ? <CreateArticlePanel addArticle={this.addArticle}
      quitCreateArticlePanel={this.quitCreateArticlePanel}
      selected={this.state.view.selected}
      saveArticleHtmlToBase={this.saveArticleHtmlToBase}
      saveArticleTitle={this.saveArticleTitle}
      updateTitle={this.updateTitle}
      updateImage={this.updateImage}
      updatePresentation={this.updatePresentation} /> : null

    const explorer = this.state.articles ? Object.keys(this.state.articles).map((key, index) => {
      console.log(this.state.articles)
      if (true) {
        return (
          <ExplorerElement key={key}
            index={key}
            login={this.state.login}
            details={this.state.articles[key]}
            scrollToArticle={this.scrollToArticle} />
        )
      } else {
        return null
      }
    }
    ) : null

    const articles = this.state.articles ? Object.keys(this.state.articles).map(key =>
      <ArticleContainer key={key}>
        <Article key={key}
          index={key}
          login={this.state.login}
          details={this.state.articles[key]}
          changeView={this.changeView} />
      </ArticleContainer>) : null

    const article = this.state.articles ? <ArticleView content={this.state.articles[this.state.view.selected]}
      selected={this.state.view.selected}
      changeView={this.changeView}
      login={this.state.login}
      saveArticleHtmlToBase={this.saveArticleHtmlToBase}
      saveArticleTitle={this.saveArticleTitle}
      deleteArticle={this.deleteArticle}
      quitEditor={this.quitEditor}
      updateTitle={this.updateTitle}
      updateImage={this.updateImage}
      updatePresentation={this.updatePresentation}
      uploadArticle={this.uploadArticle}
      updateKeywords={this.updateKeywords} /> : null

    const searchedArticles = this.state.articles ? Object.keys(this.state.articles).map(key =>
      <SearchResult key={key}
        index={key}
        details={this.state.articles[key]}
        currentSearch={this.state.currentSearch}
        changeViewFromSearch={this.changeViewFromSearch} />) : null

    let view = this.state.view.type === 'grid' ? <ContainerGrid className="articlesGrid">{articles}</ContainerGrid> : article
    view = this.state.search === true ? <SearchContainer>{searchedArticles}</SearchContainer> : view

    if (this.state.loading === false) {
      return (
        <div>
          <ContainerApp className="app">
            <SearchBar searchView={this.searchView} />
            {controlPanel}
            {loginButton}
            {loginScreen}
            {createArticlePanelScreen}
            <ExplorerPanel>
              {explorer}
              {lastArticlesTitle}
            </ExplorerPanel>
            {home}
            {view}
          </ContainerApp>
        </div>
      )
    } else {
      return (
        <Loader />
      )
    }
  }
}

/* STYLE */

const fadeInAnimation = keyframes`${fadeIn}`

const ContainerApp = styled.div`
  position: absolute;
  /* top: 0px; */
  left: 0px;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;

  animation: 2s ${fadeInAnimation}
`

const ContainerGrid = styled.div`
  width: 60vw;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const ArticleContainer = styled.div`
  padding: 5%;
`

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
`

const fadeInLeftAnimation = keyframes`${fadeInLeft}`

const ExplorerTitle = styled.h4`
  font-size: 1.2em;
  font-style: italic;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  padding-bottom: 10px;
`

const ExplorerPanel = styled.div`
  height: 100vh;
  width: 260px;
  border-right: 1px solid #F5F5F5;
  position: fixed;
  top: 0px;
  left: -10px;

  display: flex;
  justify-content: center;
  flex-direction: column-reverse;

  padding-left: 20px;
  padding-right: 40px;
  animation: .5s ${fadeInLeftAnimation};
  transition: .5s;
`

export default App
