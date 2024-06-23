import React from 'react'
import { useParams } from 'react-router-dom'

import { ArticleProps } from '../../redux/reducer'
import Article from '../article'

interface Props {
  articles: Array<ArticleProps>
}

export default function ArticlePage({ articles }: Props) {
  const { slug } = useParams()

  let result = null

  if (articles.length > 0) {
    const number = articles.findIndex((item: ArticleProps) => item.slug === slug)
    result = <Article article={articles[number]} isLarge />
  }
  return result
}
