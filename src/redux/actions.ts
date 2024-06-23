import ApiService from '../component/api-service'

import store from './store'

const { dispatch } = store

const api = new ApiService()

export default function getArticles(numberPage: number, limit: number) {
  dispatch(async () => {
    dispatch({ type: 'SEND_REQUEST' })
    api
      .getArticles(numberPage, limit)
      .then((responce) => {
        dispatch({
          type: 'GET_RESPONSE',
          currentPage: numberPage,
          articles: responce.articles,
          articlesCount: responce.articlesCount,
        })
      })
      .catch((errorResponce) => ({ type: 'GET_RESPONSE', error: errorResponce }))
  })
}
