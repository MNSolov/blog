import ApiService from '../component/api-service'

import store from './store'

const { dispatch } = store

const api = new ApiService()

export function getArticles(numberPage: number, limit: number) {
  dispatch(async () => {
    dispatch({ type: 'SEND_REQUEST' })
    api
      .getArticles(numberPage, limit)
      .then((responce) => {
        dispatch({
          type: 'GET_ARTICLES',
          currentPage: numberPage,
          articles: responce.articles,
          articlesCount: responce.articlesCount,
        })
      })
      .catch((errorResponce) => dispatch({ type: 'GET_ERROR', error: errorResponce.message, from: 'getArticles' }))
  })
}

export function getArticleBySlug(slug: string) {
  dispatch(async () => {
    dispatch({ type: 'SEND_REQUEST' })
    api
      .getArticleBySlug(slug)
      .then((responce) => {
        dispatch({
          type: 'GET_ARTICLE_BY_SLUG',
          article: responce.article,
        })
      })
      .catch((errorResponce) => {
        dispatch({ type: 'GET_ERROR', error: errorResponce.message, from: 'getArticlesBySlug' })
      })
  })
}

export function ErrorClear() {
  dispatch({ type: 'ERROR_CLEAR' })
}
