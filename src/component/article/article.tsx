import React from 'react'
import { HeartOutlined } from '@ant-design/icons'
import { format } from 'date-fns'

import Tag from '../tag'

import './article.scss'

interface ArticleProps {
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

interface Props {
  article: ArticleProps
}

export default function Article({ article }: Props) {
  return (
    <section className="article-card">
      <section className="article-card__info">
        <div className="article-card__header">
          <h2 className="article-card__title">{article.title}</h2>
          <HeartOutlined className="article-card__like" />
          <span className="article-card__likes-number">{article.favorited}</span>
        </div>
        <Tag />
        <p className="article-card__text">{article.description}</p>
      </section>
      <section className="article-card__author-info">
        <div className="article-card__author-header">
          <p className="article-card__author-name">{article.author.username}</p>
          <p className="article-card__author-date">{format(new Date(article.createdAt), 'MMMM d, yyyy')}</p>
        </div>
        <img className="article-card__author-avatar" src={article.author.image} alt="Аватар автора" />
      </section>
    </section>
  )
}
