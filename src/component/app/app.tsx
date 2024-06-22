import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { RootState } from '../../redux/store'
import { ArticleProps } from '../../redux/reducer'
import Article from '../article'
import ApiService from '../api-service'
import './app.scss'

export default function App() {
  const { articles, isLoading, error } = useAppSelector((state: RootState) => state.state)

  const api = new ApiService()
  const dispatch = useAppDispatch()

  const getArticles = () =>
    dispatch(async () => {
      dispatch({ type: 'SEND_REQUEST' })
      api
        .getArticles()
        .then((responce) => {
          dispatch({ type: 'GET_RESPONSE', articles: responce.articles, articlesCount: responce.articlesCount })
        })
        .catch((errorResponce) => ({ type: 'GET_RESPONSE', error: errorResponce }))
    })

  useEffect(() => {
    if (articles.articlesCount === 0 && isLoading === false && error === '') getArticles()
  })

  const articleList =
    articles.articlesArray.length > 0
      ? articles.articlesArray.map((item: ArticleProps) => <Article key={Math.random()} article={item} />)
      : null

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
      <main>{articleList}</main>
    </>
  )
}
