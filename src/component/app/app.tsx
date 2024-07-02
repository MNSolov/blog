import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { useAppSelector } from '../../redux/hooks'
import { RootState } from '../../redux/store'
import ArticleListPage from '../article-list-page'
import ArticlePage from '../article-page'
import './app.scss'
import SignUp from '../forms/sign-up'
import SignIn from '../forms/sign-in'
import Header from '../header'
import EditProfile from '../forms/edit-profile'
import FormArticle from '../forms/form-article'
import Error from '../error'

export default function App() {
  const { isAuthority } = useAppSelector((state: RootState) => state.state)

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="*" element={<Error message="Страница не найдена" />} />
          <Route path="/" element={<ArticleListPage />} />
          <Route path="/article/:slug" element={<ArticlePage />} />
          <Route path="/sign-up" element={!isAuthority && <SignUp />} />
          <Route path="/sign-in" element={!isAuthority && <SignIn />} />
          <Route path="/profile" element={<EditProfile />} />
          <Route path="/new-article" element={<FormArticle createNewArticle />} />
          <Route path="/articles/:slug/edit" element={<FormArticle createNewArticle={false} />} />
        </Routes>
      </main>
    </>
  )
}
