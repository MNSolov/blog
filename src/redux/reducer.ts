import { UnknownAction } from '@reduxjs/toolkit'

export interface ArticleProps {
  author: {
    following: boolean
    image: string
    username: string
  }
  body: string
  createdAt: string
  description: string
  favorited: boolean
  favoritesCount: number
  slug: string
  tagList: Array<string>
  title: string
  updatedAt: string
}

export interface State {
  pageNumber: number
  isAuthority: boolean
  isLoading: boolean
  error: {
    is: boolean
    from: string
    status: string
  }
  articles: {
    articlesArray: Array<ArticleProps>
    articlesCount: number
    currentPage: number
  }
}

export const initState: State = {
  pageNumber: 1,
  isAuthority: false,
  articles: {
    articlesArray: [],
    articlesCount: 0,
    currentPage: 0,
  },
  isLoading: false,
  error: {
    is: false,
    from: '',
    status: '',
  },
}

type Actions = UnknownAction & State['articles']

export default function mainReducer(state: State, actions: Actions) {
  if (typeof state === 'undefined') return initState

  const result = structuredClone(state)

  if (actions.type === 'SEND_REQUEST') {
    result.isLoading = true
  }

  if (actions.type === 'GET_ARTICLES') {
    result.isLoading = false
    result.articles.articlesArray = actions.articles
    result.articles.articlesCount = actions.articlesCount
    result.articles.currentPage = actions.currentPage
  }

  if (actions.type === 'GET_ARTICLE_BY_SLUG') {
    result.isLoading = false
    result.articles.articlesArray.push(actions.article)
  }

  if (actions.type === 'GET_ERROR') {
    result.isLoading = false
    result.error.status = actions.error as string
    result.error.is = true
    result.error.from = actions.from as string
  }

  if (actions.type === 'ERROR_CLEAR') {
    result.error.status = ''
    result.error.is = false
    result.error.from = ''
  }

  return result
}
