import React from 'react'
import { Routes, Route } from 'react-router-dom'

import ArticleListPage from '../article-list-page'
import ArticlePage from '../article-page'
import './app.scss'
import SignUp from '../forms/sign-up'
import SignIn from '../forms/sign-in'
import Header from '../header'
import EditProfile from '../forms/edit-profile'

const limitArticleOnPage = 5

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<ArticleListPage limitArticleOnPage={limitArticleOnPage} />} />
          <Route path="/article/:slug" element={<ArticlePage />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/profile" element={<EditProfile />} />
        </Routes>
      </main>
    </>
  )
}
