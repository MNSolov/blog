import { NavigateFunction } from 'react-router-dom'

import ApiService from '../component/api-service'

import store from './store'

const { dispatch } = store

const api = new ApiService()

export function ErrorClear() {
  dispatch({ type: 'ERROR_CLEAR' })
}

export function LogOut() {
  dispatch({ type: 'LOGOUT' })
  sessionStorage.removeItem('token')
}

export function LogIn() {
  dispatch({ type: 'LOGIN' })
}

export function clearArticles() {
  dispatch({ type: 'CLEAR_ARTICLES' })
}

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

export function createNewUser(user: User, navigate: NavigateFunction, route: string) {
  dispatch(async () => {
    dispatch({ type: 'SEND_REQUEST' })
    api
      .createNewUser(user)
      .then((responce: ResponseCreateUser) => {
        dispatch({
          type: 'SIGN_UP',
          email: responce.user.email,
          image: responce.user.image,
          username: responce.user.username,
        })
        dispatch({ type: 'ERROR_CLEAR' })
        sessionStorage.setItem('token', responce.user.token)
        navigate(route)
      })
      .catch((errorResponce) => {
        dispatch({ type: 'GET_ERROR', error: errorResponce.message, from: 'createNewUser' })
      })
  })
}

export function loginUser(user: LoginUser, navigate: NavigateFunction, route: string) {
  dispatch(async () => {
    dispatch({ type: 'SEND_REQUEST' })
    api
      .loginUser(user)
      .then((responce: ResponseCreateUser) => {
        dispatch({
          type: 'SIGN_UP',
          email: responce.user.email,
          image: responce.user.image,
          username: responce.user.username,
        })
        dispatch({ type: 'ERROR_CLEAR' })
        sessionStorage.setItem('token', responce.user.token)
        navigate(route)
      })
      .catch((errorResponce) => {
        dispatch({ type: 'GET_ERROR', error: errorResponce.message, from: 'loginUser' })
      })
  })
}

export function editUser(user: string, navigate: NavigateFunction, route: string) {
  dispatch(async () => {
    dispatch({ type: 'SEND_REQUEST' })
    api
      .editUser(user)
      .then((responce: ResponseCreateUser) => {
        dispatch({
          type: 'EDIT_USER',
          email: responce.user.email,
          image: responce.user.image,
          username: responce.user.username,
        })
        dispatch({ type: 'ERROR_CLEAR' })
        sessionStorage.setItem('token', responce.user.token)
        navigate(route)
      })
      .catch((errorResponce) => {
        if (errorResponce.message === '401') {
          LogOut()
          dispatch({ type: 'GET_ERROR', error: 'Ошибка авторизации', from: 'editUser' })
          navigate(route)
        } else {
          dispatch({ type: 'GET_ERROR', error: errorResponce.message, from: 'editUser' })
        }
      })
  })
}

export function createArticle(article: Article, navigate: NavigateFunction, route: string) {
  dispatch(async () => {
    dispatch({ type: 'SEND_REQUEST' })
    api
      .createArticle(article)
      .then(() => {
        dispatch({ type: 'ERROR_CLEAR' })
        dispatch({ type: 'GET_RESPONSE' })
        clearArticles()
        navigate(route)
      })
      .catch((errorResponce) => {
        if (errorResponce.message === '401') {
          LogOut()
          dispatch({ type: 'GET_ERROR', error: 'Ошибка авторизации', from: 'createArticle' })
          navigate(route)
        } else {
          dispatch({ type: 'GET_ERROR', error: errorResponce.message, from: 'createArticle' })
        }
      })
  })
}

export function deleteArticle(slug: string, navigate: NavigateFunction, route: string) {
  dispatch(async () => {
    dispatch({ type: 'SEND_REQUEST' })
    api
      .deleteArticle(slug)
      .then(() => {
        dispatch({ type: 'ERROR_CLEAR' })
        dispatch({ type: 'GET_RESPONSE' })
        clearArticles()
        navigate(route)
      })
      .catch((errorResponce) => {
        if (errorResponce.message === '401') {
          LogOut()
          dispatch({ type: 'GET_ERROR', error: 'Ошибка авторизации', from: 'deleteArticle' })
          navigate(route)
        } else {
          dispatch({ type: 'GET_ERROR', error: errorResponce.message, from: 'deleteArticle' })
        }
      })
  })
}

export function updateArticle(article: Article, slug: string | undefined, navigate: NavigateFunction, route: string) {
  dispatch(async () => {
    dispatch({ type: 'SEND_REQUEST' })
    api
      .updateArticle(article, slug)
      .then(() => {
        dispatch({ type: 'ERROR_CLEAR' })
        dispatch({ type: 'GET_RESPONSE' })
        clearArticles()
        navigate(route)
      })
      .catch((errorResponce) => {
        if (errorResponce.message === '401') {
          LogOut()
          dispatch({ type: 'GET_ERROR', error: 'Ошибка авторизации', from: 'updateArticle' })
          navigate(route)
        } else {
          dispatch({ type: 'GET_ERROR', error: errorResponce.message, from: 'updateArticle' })
        }
      })
  })
}

export function setLike(slug: string, navigate: NavigateFunction, route: string) {
  dispatch(async () => {
    dispatch({ type: 'SEND_REQUEST' })
    api
      .setLike(slug)
      .then((response) => {
        dispatch({ type: 'ERROR_CLEAR' })
        dispatch({ type: 'GET_RESPONSE' })
        dispatch({
          type: 'UPDATE',
          article: response.article,
        })
      })
      .catch((errorResponce) => {
        if (errorResponce.message === '401') {
          LogOut()
          dispatch({ type: 'GET_ERROR', error: 'Ошибка авторизации', from: 'setLike' })
          navigate(route)
        } else {
          dispatch({ type: 'GET_ERROR', error: errorResponce.message, from: 'setLike' })
        }
      })
  })
}

export function deleteLike(slug: string, navigate: NavigateFunction, route: string) {
  dispatch(async () => {
    dispatch({ type: 'SEND_REQUEST' })
    api
      .deleteLike(slug)
      .then((response) => {
        dispatch({ type: 'ERROR_CLEAR' })
        dispatch({ type: 'GET_RESPONSE' })
        dispatch({
          type: 'UPDATE',
          article: response.article,
        })
      })
      .catch((errorResponce) => {
        if (errorResponce.message === '401') {
          LogOut()
          dispatch({ type: 'GET_ERROR', error: 'Ошибка авторизации', from: 'deleteLike' })
          navigate(route)
        } else {
          dispatch({ type: 'GET_ERROR', error: errorResponce.message, from: 'deleteLike' })
        }
      })
  })
}
