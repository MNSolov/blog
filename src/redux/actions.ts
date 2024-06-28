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
