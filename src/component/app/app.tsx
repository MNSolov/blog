import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import ArticleListPage from '../article-list-page'
import ArticlePage from '../article-page'
import './app.scss'
import SignUp from '../sign-up'

const limitArticleOnPage = 5

export default function App() {
  return (
    <>
      <header className="header">
        <Link className="header__link" to="/">
          <p className="header__title">Realworld Blog</p>
        </Link>
        <div>
          <button className="header-button__sing-in" type="button">
            Sing In
          </button>
          <Link to="/sign-up">
            <button className="header-button__sing-up" type="button">
              Sing Up
            </button>
          </Link>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<ArticleListPage limitArticleOnPage={limitArticleOnPage} />} />
          <Route path="/article/:slug" element={<ArticlePage />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </main>
    </>
  )
}
