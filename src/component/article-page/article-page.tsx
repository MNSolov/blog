import React from 'react'
import { useParams } from 'react-router-dom'

import Loader from '../loader'
import { ArticleProps } from '../../redux/reducer'
import Article from '../article'
import { useAppSelector } from '../../redux/hooks'
import { RootState } from '../../redux/store'
import { getArticleBySlug } from '../../redux/actions'
import Error from '../error'

import './article-page.scss'

// interface Props {
//   articles: Array<ArticleProps>
// }

export default function ArticlePage() {
  const { slug } = useParams()
  const { isLoading, error } = useAppSelector((state: RootState) => state.state)
  const { articlesArray } = useAppSelector((state: RootState) => state.state.articles)

  let result: null | JSX.Element = isLoading ? <Loader /> : null

  try {
    const number = articlesArray.findIndex((item: ArticleProps) => item.slug === slug)
    if (number > -1) {
      result = <Article article={articlesArray[number]} isLarge />
    } else {
      if (slug && isLoading === false && error.from !== 'getArticlesBySlug') {
        getArticleBySlug(slug)
      }
      if (isLoading === false && error.from === 'getArticlesBySlug' && error.status === '404') {
        result = <Error message="Запрашиваемая статья не найдена" />
      }
    }
  } catch {
    result = <Error message="Что-то пошло не так!" />
  }

  return result
}
