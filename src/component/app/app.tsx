import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import ArticleListPage from '../article-list-page'
import ArticlePage from '../article-page'
import { useAppSelector } from '../../redux/hooks'
import { RootState } from '../../redux/store'
import getArticles from '../../redux/actions'

import './app.scss'

const limitArticleOnPage = 5

export default function App() {
  const { articles, isLoading, error } = useAppSelector((state: RootState) => state.state)

  useEffect(() => {
    if (articles.articlesCount === 0 && isLoading === false && error === '') getArticles(0, limitArticleOnPage)
  })

  return (
    <>
      <header className="header">
        <p className="header__title">Realworld Blog</p>
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
          <Route path="/" element={<ArticleListPage articles={articles} limitArticleOnPage={limitArticleOnPage} />} />
        </Routes>
        <Routes>
          <Route path="/article/:slug" element={<ArticlePage articles={articles.articlesArray} />} />
        </Routes>
      </main>
    </>
  )
}
