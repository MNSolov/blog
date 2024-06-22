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
  error: string
  articles: {
    articlesArray: Array<ArticleProps>
    articlesCount: number
  }
}

export const initState: State = {
  pageNumber: 1,
  isAuthority: false,
  articles: {
    articlesArray: [],
    articlesCount: 0,
  },
  isLoading: false,
  error: '',
}

type Actions = UnknownAction & State['articles']

export default function mainReducer(state: State, actions: Actions) {
  if (typeof state === 'undefined') return initState

  const result = structuredClone(state)

  if (actions.type === 'SEND_REQUEST') {
    result.isLoading = true
  }

  if (actions.type === 'GET_RESPONSE') {
    result.isLoading = false
    if (actions.error) {
      result.error = actions.error as string
    } else {
      result.articles.articlesArray = actions.articles
      result.articles.articlesCount = actions.articlesCount
    }
  }

  return result
}
