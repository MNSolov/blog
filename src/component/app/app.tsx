import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import ArticleListPage from '../article-list-page'
import ArticlePage from '../article-page'

import './app.scss'

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
          <button className="header-button__sing-up" type="button">
            Sing Up
          </button>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<ArticleListPage limitArticleOnPage={limitArticleOnPage} />} />
          <Route path="/article/:slug" element={<ArticlePage />} />
        </Routes>
      </main>
    </>
  )
}
